// write a function to create a table into your database
import { Client } from "pg";
const client = new Client({
  host: "localhost",
  port: 5432,
  database: 'db',
  user: "admin",
  password: "flawlessnitin",
  // connectionString: "postgresql://admin:flawlessnitin@localhost:5432/db"
})
client.connect();

async function createUsersTable() {
  const result = await client.query("CREATE TABLE users ();")
} 
