import mongoose from "mongoose";

const connection = {};

export async function connect() {
  if (connection.isConnected) {
    // If already connected, do not connect again and just return
    console.log("Already connected");
    console.log("isConnected: ", connection.isConnected); // test
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      // Code 1 means connected, 0 - not connected, 2 - connecting, 3 - disconnecting
      console.log("Use previous connection instead");
      console.log("isConnected: ", connection.isConnected); // test
      return;
    }
    // If not connected, just disconnect
    await mongoose.disconnect();
  }
  // Establish connection to the database
  const db = await mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      autoIndex: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) {
        return console.log("Unable to connect to database:\n" + error.message);
      }
      console.log(
        `Connection to ${process.env.DATABASE_NAME.toUpperCase()} database successful`
      );
    }
  );
  // Current connection state
  console.log("isConnected: ", connection.isConnected); // test
  console.log(mongoose.STATES[mongoose.connection.readyState] + "...");
  // Assign connection.isConnected a new status code (namely 1)
  connection.isConnected = db.connections[0].readyState;
}

export async function disconnect() {
  console.log("isConnected from disconnect outer: ", connection.isConnected); // test
  if (connection.isConnected) {
    console.log("isConnected from disconnect inner: ", connection.isConnected); // test
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // Keeping connection alive in development for convenience
      console.log("Keeping alive in development mode. Not disconnected");
    }
  }
}
