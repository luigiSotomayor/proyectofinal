import fs from "fs";
import csv from "csv-parser";
import path from "path";
import Match from "../api/models/match.js";

export const seedStats = async (matchesMap, usersMap) => {
  const statsByMatch = {};

  return new Promise((resolve, reject) => {
    const statsPath = path.resolve("./src/seeds/stats.csv");

    fs.createReadStream(statsPath)
      .pipe(
        csv({
          separator: ";",
          mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, ""),
        }),
      )
      .on("data", (row) => {
        const mongoMatchId = matchesMap.get(row.match);
        const playerId = usersMap.get(row.player);

        if (!mongoMatchId || !playerId) return;

        if (!statsByMatch[row.match]) {
          statsByMatch[row.match] = [];
        }

        statsByMatch[row.match].push({
          player: playerId,
          minutes: Number(row.minutes),
          titular: row.titular === 'true',
          yellowCards: row.yellowCards === 'true',
          doubleYellowCards: row.doubleYellowCards === 'true',
          redCards: row.redCards === 'true',
          goalsScored: Number(row.goalsScored),
          goalsConceded: Number(row.goalsConceded),
          rating: Number(row.rating),
        });
      })
      .on("error", (err) => {
        reject(err);
      })

      .on("end", async () => {
        try {
          for (const csvMatchId of Object.keys(statsByMatch)) {
            const mongoMatchId = matchesMap.get(csvMatchId);

            if (!mongoMatchId) {
              console.warn(
                `No se encontró matchId en matchesMap: ${csvMatchId}`,
              );
              continue;
            }

            await Match.findByIdAndUpdate(mongoMatchId, {
              $set: { stats: statsByMatch[csvMatchId] },
            });
          }

          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};
