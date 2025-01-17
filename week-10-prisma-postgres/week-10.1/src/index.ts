import { Client } from 'pg';

// Async function to insert data into a table
async function insertData() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'db2',
    user: 'admin',
    password: 'flawlessnitin',
  });

  try {
    await client.connect(); // Ensure client connection is established
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);";
    const value = ["Nitin", "sahunitin970@gmail.com", "nitinnnnnnn"]
    const res = await client.query(insertQuery, value);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

insertData();
