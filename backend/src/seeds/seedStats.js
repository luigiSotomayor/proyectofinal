import fs from "fs";
import csv from "csv-parser";
import path from "path";
import Match from "../api/models/match.js";

export const seedStats = async (matchesMap, usersMap) => {
  const statsByMatch = {};

  return new Promise((resolve, reject) => {
    const statsPath = path.resolve("./src/seeds/stats.csv");

    fs.createReadStream(statsPath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        const mongoMatchId = matchesMap.get(row.matchId);
        const playerId = usersMap.get(row.player);

        if (!mongoMatchId || !playerId) return;

        if (!statsByMatch[row.match]) {
          statsByMatch[row.match] = [];
        }

        statsByMatch[row.matchId].push({
          player: playerId,
          minutes: Number(row.minutes),
          titular: Boolean(row.titular),
          yellowCards: Boolean(row.yellowCards),
          doubleYellowCards: Boolean(row.doubleYellowCards),
          redCards: Boolean(row.redCards),
          goalsScored: Number(row.goalsScored),
          goalsConceded: Number(row.goalsConceded),
          rating: Number(row.rating)
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", async () => {
        try {
          // Actualizamos cada partido en la DB con sus stats
          for (const csvMatchId of Object.keys(statsByMatch)) {
            const mongoMatchId = matchesMap.get(csvMatchId);

            await Match.findByIdAndUpdate(mongoMatchId, { $set: { stats: statsByMatch[csvMatchId] } });
          }
          console.log("Seed de stats cargada con éxito.");
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};
