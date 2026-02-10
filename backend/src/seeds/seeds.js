import "dotenv/config";
import mongoose from "mongoose";

import { seedUsers } from "./seedUsers.js";
import { seedTeams } from "./seedTeams.js";
import { seedMatches } from "./seedMatches.js";
import { seedStats } from "./seedStats.js";

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conexión a la base de datos establecida.");

    await mongoose.connection.dropDatabase();
    console.log("Base de datos borrada.");

    const usersMap = await seedUsers();
    //const teamsMap = await seedTeams(usersMap);
    //const matchesMap = await seedMatches(teamsMap);
    //await seedStats(matchesMap, usersMap);

    console.log("Seed cargada con éxito.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
