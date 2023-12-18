const mongoose = require("mongoose"); // Mongoose for MongoDB object modeling
const mongo_config = require("../mongo_config");
const User = require("../models/user");
const OU = require("../models/ou");
const Division = require("../models/division");
const CredentialRepo = require("../models/credential_repo");
const Credential = require("../models/credential");

const createCredential = async (username, password) => {
  const credential = new Credential({
    username,
    password,
  });

  await credential.save();
  console.log("Credential created:", credential);
  return credential;
};

const createCredentialRepo = async (name, credentials = []) => {
  const credentialRepo = new CredentialRepo({
    name,
    credentials,
  });

  await credentialRepo.save();
  console.log("Credential repository created:", credentialRepo);
  return credentialRepo;
};

const createDivision = async (name, credentialRepo) => {
  const division = new Division({
    name,
    credentialRepo,
  });

  await division.save();
  console.log("Division created:", division);
  return division;
};

const createOUs = async () => {
  const divisionList = ["Finance", "IT", "Writing", "Development"];
  const credentialDatas = [
    { username: "john", password: "password" },
    { username: "james", password: "pass" },
  ];
  const ouList = [
    { name: "News management", divisions: [] },
    { name: "Software reviews", divisions: [] },
    { name: "Hardware reviews", divisions: [] },
    { name: "Opinion publishing", divisions: [] },
  ];

  for (const ouData of ouList) {
    const ou = new OU(ouData);
    for (const divisionName of divisionList) {
      let credentials = [];
      for (const credentialData of credentialDatas) {
        const credential = await createCredential(
          credentialData.username,
          credentialData.password
        );
        credentials.push(credential._id);
      }
      const credentialRepo = await createCredentialRepo(
        divisionName,
        credentials
      );
      const division = await createDivision(divisionName, credentialRepo._id);
      ou.divisions.push(division._id);
    }
    await ou.save();
    console.log("OU created:", ou);
  }
};

const createAdminUser = async () => {
  const user = new User({
    username: "john_admin",
    password: "password123",
    role: "admin",
    oUs: (await OU.find().exec()).map((ou) => ou._id),
    divisions: (await Division.find().exec()).map((division) => division._id),
  });

  await user.save();
  console.log("User created:", user);
};

const createMangementUser = async () => {
  const user = new User({
    username: "john_manager",
    password: "password123",
    role: "management",
    oUs: (await OU.find().exec()).map((ou) => ou._id),
    divisions: (await Division.find().exec()).map((division) => division._id),
  });

  console.log((await OU.find().exec()).map((ou) => ou._id));
  console.log(await Division.find().exec());
  await user.save();
  console.log("User created:", user);
};

const createNormalUser = async () => {
  const user = new User({
    username: "john_normal",
    password: "password123",
    role: "normal",
    oUs: (await OU.find().exec()).map((ou) => ou._id),
    divisions: (await Division.find().exec()).map((division) => division._id),
  });

  await user.save();
  console.log("User created:", user);
};

// Connect to MongoDB database using mongoose
mongoose.connect(mongo_config.connectionString, mongo_config.config);

// Call the functions to add sample data
const seed = async () => {
  await createOUs();
  createAdminUser();
  createNormalUser();
  createMangementUser();
};

seed();