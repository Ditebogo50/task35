const Division = require("../models/division");
const Credential = require("../models/credential");

exports.getCredentials = async (req, res) => {
  try {
    const divisionId = req.params.divisionId;

    // Check if user has permission to view this division
    const user = req.user;
    if (!user?.divisions.includes(divisionId)) {
      return res.status(403).json({
        error: "You don't have permission to view this division's credentials",
      });
    }

    // Get the credential repository for the division and populate the credentials field
    const division = await Division.findById(divisionId)
      .populate({ path: "credentialRepo", populate: { path: "credentials" } })
      .exec();

    if (!division) {
      return res.status(404).json({ error: "Division not found" });
    }

    res.json(division.credentialRepo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createCredential = async (req, res) => {
  try {
    const divisionId = req.params.divisionId;

    const { username, password } = req.body;

    const user = req.user;
    // Check if the user has access to the specified division
    if (!user.divisions.includes(divisionId)) {
      return res.status(403).json({
        error:
          "You don't have permission to create a credential for this division",
      });
    }

    // Create the new credential
    const newCredential = new Credential({
      username,
      password,
    });

    // Save the new credential and add it to the credentialRepo of the specified division
    const createdCredential = await newCredential.save();
    const division = await Division.findById(divisionId).populate({
      path: "credentialRepo",
      populate: { path: "credentials" },
    });
    division.credentialRepo.credentials.push(createdCredential._id.toString());
    await division.credentialRepo.save();
    await division.save();

    res.json(createdCredential);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateCredential = async (req, res) => {
  try {
    const credentialId = req.params.credentialId;

    const user = req.user;
    // Find all credentials that belong to a the divisions that the user has access to
    const divisions = await Division.find({ _id: { $in: user.divisions } })
      .populate({
        path: "credentialRepo",
        populate: { path: "credentials", match: { _id: credentialId } },
      })
      .exec();

    // Gather all the valid credentialIDs for the divisions
    let credentialIds = [];
    divisions.forEach((div) => {
      credentialIds.push(
        div.credentialRepo.credentials.map((credential) =>
          credential._id.toString()
        )
      );
    });
    credentialIds = credentialIds.flat();

    // Check if the user has permission to update this credential
    if (
      !["admin", "management"].includes(user.role) ||
      !credentialIds.includes(credentialId)
    ) {
      return res
        .status(403)
        .json({ error: "You don't have permission to update this credential" });
    }

    // Find the credential by ID and update its properties
    const updatedCredential = await Credential.findOneAndUpdate(
      {
        _id: credentialId,
      },
      {
        username: req.body.username,
        password: req.body.password,
      }
    );

    if (!updatedCredential) {
      return res.status(404).json({ error: "Credential not found" });
    }

    res.json(updatedCredential);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
