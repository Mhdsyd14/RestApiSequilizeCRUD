const mysql = require("mysql2");

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Biput777",
  database: "tugaseduworkproducts",
});

// Menghubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("=> Connected to the database mysql native");
});

module.exports = connection;
