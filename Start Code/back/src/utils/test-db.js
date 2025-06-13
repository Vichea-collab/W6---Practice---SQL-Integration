import { getArticles } from "./database.js";

async function testConnection() {
  try {
    const articles = await getArticles();
    console.log("Connection successful! Articles:", articles);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

testConnection();