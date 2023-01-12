import { connect, disconnect } from "../../app/utils/db";
import User from "../../app/models/User";
import { data } from "../../auxillary/data";

// eslint-disable-next-line no-unused-vars
export default async function handler(req, res) {
  try {
    await connect();
    // Delete all previous Users
    await User.deleteMany();
    // And recreate a new collection
    await User.insertMany(data.users);
    await disconnect();
    res.json({ message: "Seeded successfully" });
  } catch (error) {
    res.json({ message: "Something went wrong..." });
  }
}
