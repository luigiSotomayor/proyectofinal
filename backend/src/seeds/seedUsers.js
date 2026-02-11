import fs from "fs";
import csv from "csv-parser";
import User from "../api/models/user.js";

const parseDate = (value) => {
  if (!value) return null;

  const [day, month, year] = value.split("/");
  return new Date(`${year}-${month}-${day}`);
};

export const seedUsers = async () => {
  const usersMap = new Map();
  const users = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/seeds/users.csv")
      .pipe(
        csv({
          separator: ";",
          mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, ""),
        }),
      )
      .on("data", (row) => {
        const user = {
          userCode: row.userCode,
          firstName: row.firstName,
          lastName: row.lastName,
          birthday: parseDate(row.birthday),
          phone: row.phone,
          email: row.email,
          nationality: row.nationality,
          password: row.password,
          role: row.role,
          position: row.position,
          dorsal: row.dorsal,
        };
        users.push(user);
      })
      .on("end", async () => {
        
        try {
          const createdUsers = await User.insertMany(users);
          createdUsers.forEach((user) => {
            usersMap.set(user.userCode, user._id);
          });
          resolve(usersMap);
        } catch (err) {
          reject(err);
        }
      });
  });
};
