import fs from "fs";
import csv from "csv-parser";
import Team from "../api/models/team.js";

export const seedTeams = async (usersMap) => {
  const teamsMap = new Map();
  const teams = [];

  return new Promise((resolve) => {
    fs.createReadStream("./src/seeds/teams.csv")
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        teams.push({
          name: row.name,
          players: row.players.split(",").map(_id => usersMap.get(_id)),
          coach: row.coach//usersMap.get(row._id)
        });
        teamsMap.set(row.id, null);
        console.log("row: ", row);
      })
      .on("end", async () => {
        const created = await Team.insertMany(teams);

        let i = 0;
        for (const key of teamsMap.keys()) {
          teamsMap.set(key, created[i]._id);
          i++;
        }

        resolve(teamsMap);
      });
  });
};
