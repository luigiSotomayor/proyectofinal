import fs from "fs";
import csv from "csv-parser";
import Match from "../api/models/match.js";

const parseDate = (value) => {
  if (!value) return null;

  const [day, month, year] = value.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export const seedMatches = async (teamsMap) => {
  const matchesMap = new Map();
  const matches = [];

  return new Promise((resolve) => {
    fs.createReadStream("./src/seeds/matches.csv")
      .pipe(
        csv({
          separator: ";",
          mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, ""),
        }),
      )
      .on("data", (row) => {
        matches.push({
          team: teamsMap.get(row.team),
          rival: row.rival,
          date: parseDate(row.date),
          home: row.home,
          jornada: row.jornada,
          championship: row.championship,
          stats: [],
        });
        matchesMap.set(row.id, null);
      })
      .on("end", async () => {
        const created = await Match.insertMany(matches);

        let i = 0;
        for (const key of matchesMap.keys()) {
          matchesMap.set(key, created[i]._id);
          i++;
        }

        resolve(matchesMap);
      });
  });
};
