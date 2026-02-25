import fs from "fs";
import csv from "csv-parser";
import Team from "../api/models/team.js";

export const seedTeams = async (usersMap) => {
  const teamsMap = new Map();
  const teams = [];

  return new Promise((resolve) => {
    fs.createReadStream("./src/seeds/teams.csv")
      .pipe(
        csv({
          separator: ";",
          mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, ""),
        }),
      )
      .on("data", (row) => {
        teams.push({
          teamCode: row.teamCode,
          name: row.name,
          players: row.players
            .split(",")
            .map((playerCode) => playerCode.trim())
            .map((_id) => usersMap.get(_id)),
          coach: usersMap.get(row.coach),
        });
        teamsMap.set(row.teamCode, null);
      })
      .on("end", async () => {
        const created = await Team.insertMany(teams);

        let i = 0;
        for (const key of teamsMap.keys()) {
          teamsMap.set(key, created[i]._id);
          i++;
        }
        console.log("CLAVES REALES DEL teamsMap:");
        console.log([...teamsMap.keys()]);
        resolve(teamsMap);
      });
  });
};
