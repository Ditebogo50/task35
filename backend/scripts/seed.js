const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const mongo_config = require('../mongo_config');
const User = require('../models/user');
const OU = require('../models/ou');
const Division = require('../models/division');
const CredentialRepo = require('../models/credential_repo');
const Credential = require('../models/credential');

// Add sample data
const createUser = async () => {
  const user = new User({
    username: "john_doe",
    password: "password123",
    role: "admin",
    oUs: [],
    divisions: [],
  });

  await user.save();
  console.log("User created:", user);
};

const createOUs = async () => {
  const ouList = [
    { name: "News management", divisions: [] },
    { name: "Software reviews", divisions: [] },
    { name: "Hardware reviews", divisions: [] },
    { name: "Opinion publishing", divisions: [] }
  ];

  for (const ouData of ouList) {
    const ou = new OU(ouData);
    await ou.save();
    console.log("OU created:", ou);
  }
};

const createDivision = async () => {
  const division = new Division({
    name: "Finance",
    credentialRepo: [],
  });

  await division.save();
  console.log("Division created:", division);
};

const createCredentialRepo = async () => {
  const credentialRepo = new CredentialRepo({
    name: "Finance Cedential Repository",
    credentials: [],
  });

  await credentialRepo.save();
  console.log("Credential repository created:", credentialRepo);
};

const createCredential = async () => {
  const credential = new Credential({
    username: "john_doe",
    password: "examplepassword",
  });

  await credential.save();
  console.log("Credential created:", credential);
};

// Connect to MongoDB database using mongoose
mongoose.connect(mongo_config.connectionString, mongo_config.config);

// Call the functions to add sample data
createOUs();
createDivision();
createCredentialRepo();
createCredential();
createUser();