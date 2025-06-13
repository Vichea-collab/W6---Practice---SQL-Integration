import { pool } from "../utils/database.js";

//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

// Get all articles
export async function getArticles() {
    const [rows] = await pool.query("SELECT * FROM articles");
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    const { title, content, journalist, category } = article;
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
        [title, content, journalist, category]
    );
    return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    const { title, content, journalist, category } = updatedData;
    await pool.query(
        "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?",
        [title, content, journalist, category, id]
    );
    return { id, ...updatedData };
}

// Delete an article by ID
export async function deleteArticle(id) {
    await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return { id };
}

// Fetch article by ID with journalist info
export async function getArticleWithJournalistById(id) {
    const [rows] = await pool.query(
        `SELECT a.*, j.name as journalist_name, j.email as journalist_email, j.bio as journalist_bio
         FROM articles a
         JOIN journalists j ON a.journalist_id = j.id
         WHERE a.id = ?`,
        [id]
    );
    return rows[0];
}

// Fetch all articles by journalist ID
export async function getArticlesByJournalistId(journalistId) {
    const [rows] = await pool.query(
        `SELECT a.*, j.name as journalist_name, j.email as journalist_email, j.bio as journalist_bio
         FROM articles a
         JOIN journalists j ON a.journalist_id = j.id
         WHERE a.journalist_id = ?`,
        [journalistId]
    );
    return rows;
}
