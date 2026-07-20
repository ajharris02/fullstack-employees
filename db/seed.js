import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const SQL = `
DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
birthday DATE NOT NULL,
salary INTEGER NOT NULL
);
`;
  await db.query(SQL);
  const insert = `INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3);
  
`;
  for (let i = 0; i < 10; i++) {
    const randomName = faker.person.fullName();
    const randomBirthday = faker.date.birthdate();
    const randomSalary = faker.number.int({ min: 40000, max: 120000 });

    await db.query(insert, [randomName, randomBirthday, randomSalary]);
  }
  console.log("db tables created and seated");
}
