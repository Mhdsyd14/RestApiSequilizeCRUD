const express = require("express");
const router = express.Router();
const Product = require("../../model/products"); // Import model dengan benar
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// Buat produk baru
router.post("/products", async (req, res) => {
  const { products, price, stock } = req.body;

  try {
    const newProduct = await Product.create({
      products,
      price,
      stock,
    });
    res.status(201).json({
      status: "Berhasil",
      data: newProduct,
    });
  } catch (err) {
    console.error(err); // Logging kesalahan
    res.status(500).json({
      status: "Gagal",
      message: err.message,
      errors: err.errors, // Mengembalikan rincian kesalahan
    });
  }
});

// Ambil semua produk
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      status: "Berhasil",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      status: "Gagal",
      message: err.message,
    });
  }
});

// Ambil produk berdasarkan ID
router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        status: "Gagal",
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      status: "Berhasil",
      data: product,
    });
  } catch (err) {
    console.error(err); // Logging kesalahan
    res.status(500).json({
      status: "Gagal",
      message: err.message,
      errors: err.errors, // Mengembalikan rincian kesalahan
    });
  }
});

// Perbarui produk berdasarkan ID
router.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const { products, price, stock } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        status: "Gagal",
        message: "Produk tidak ditemukan",
      });
    }

    await product.update({
      products,
      price,
      stock,
    });

    res.json({
      status: "Berhasil",
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Gagal",
      message: err.message,
      errors: err.errors,
    });
  }
});

// Hapus berdasarkan id
router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        status: "Gagal",
        message: "Produk tidak ditemukan",
      });
    }

    await product.destroy();

    res.json({
      status: "Berhasil",
      message: "Produk berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Gagal",
      message: err.message,
      errors: err.errors,
    });
  }
});

module.exports = router;
