import fs from "fs";
import csv from "csv-parser";
import Match from "../api/models/match.js";
import { parseDate } from "../utils/parseDate.js";

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
          csvId: row._id,
          team: teamsMap.get(row.team),
          rival: row.rival,
          date: parseDate(row.date),
          home: row.home,
          jornada: row.jornada,
          championship: row.championship,
          stats: [],
        });
      })
      .on("end", async () => {
        const created = await Match.insertMany(matches);

        created.forEach((match, index) => {
          const csvId = matches[index].csvId;
          matchesMap.set(csvId, match._id);
        });
        resolve(matchesMap);
      });
  });
};
