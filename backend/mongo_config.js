require("dotenv").config(); // Load environment variables from .env file
// Get MongoDB connection details from environment variables
const mongoUser = process.env.MONGO_USER; // MongoDB username
const mongoPass = process.env.MONGO_PASS; // MongoDB password
const mongoClusterName = process.env.MONGO_CLUSTER_NAME; // MongoDB cluster name
const mongoDB = process.env.MONGO_DB; // MongoDB database name

const connectionString = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoClusterName}/${mongoDB}?retryWrites=true&w=majority`;
module.exports = {
  connectionString: connectionString,
  config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
