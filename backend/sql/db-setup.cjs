require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

console.log(process.env.DB_URL);

async function run() {
  const client = new Client({ connectionString: process.env.DB_URL });
  await client.connect();

  const schema = fs.readFileSync(path.join(__dirname, '..', 'sql', 'schema.sql'), 'utf8');
  const seed = fs.readFileSync(path.join(__dirname, '..', 'sql', 'seed.sql'), 'utf8');

  try {
    console.log('Applying schema...');
    await client.query(schema);
    console.log('Seeding...');
    await client.query(seed);
    console.log('Done.');
  } catch (err) {
    console.error('DB setup error:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();
