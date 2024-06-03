const express = require("express");
const router = express.Router();
const db = require("../../config/db"); // Mengimpor koneksi database

// Rute untuk mendapatkan semua data dari tabel tertentu
router.get("/produk", (req, res) => {
  db.query("SELECT * FROM produk", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json({
      status: "Berhasil",
      data: results,
    });
  });
});

// Mendapatkan produk berdasarkan id
router.get("/produk/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM produk WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }

    if (result.length === 0) {
      res.status(404).json({
        status: "Gagal",
        message: "Produk tidak ditemukan",
      });
      return;
    }

    res.json({
      status: "Berhasil",
      data: result[0],
    });
  });
});

// Menambahkan data
router.post("/produk", (req, res) => {
  const { products, price, stock } = req.body;
  const sql = "INSERT INTO produk (products, price, stock) VALUES (?, ?, ?)";
  db.query(sql, [products, price, stock], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ message: "Error inserting data", error: err });
      return;
    }
    const insertedId = result.insertId;
    const newProduct = {
      id: insertedId,
      products: products,
      price: price,
      stock: stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    res
      .status(201)
      .json({ message: "Data inserted successfully", data: newProduct });
  });
});

// Mengubah data
router.put("/produk/:id", (req, res) => {
  const { id } = req.params;
  const { products, price, stock } = req.body;
  const sql =
    "UPDATE produk SET products = ?, price = ?, stock = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?";

  // Lakukan update
  db.query(sql, [products, price, stock, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ message: "Error updating data", error: err });
      return;
    }

    // Periksa apakah ada baris yang diperbarui
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "ID not found" });
      return;
    }

    // Jika data berhasil diperbarui, ambil data yang baru diperbarui
    const selectSql = "SELECT * FROM produk WHERE id = ?";
    db.query(selectSql, [id], (err, updatedResult) => {
      if (err) {
        console.error("Error fetching updated data:", err);
        res
          .status(500)
          .json({ message: "Error fetching updated data", error: err });
        return;
      }

      // Mengirimkan respon dengan data yang diperbarui
      res
        .status(200)
        .json({ message: "Data updated successfully", data: updatedResult[0] });
    });
  });
});

// Menghapus data
router.delete("/produk/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM produk WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
      return;
    }
    res.json("Data deleted successfully");
  });
});

module.exports = router;
