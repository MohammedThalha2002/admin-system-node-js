const express = require("express");
const router = express.Router();
const {
  addProduct,
  upload,
  getCurrencies,
  findOneCurrency,
  updateProduct,
  deleteProduct,
} = require("../controller/currency/currencyController");

router.post("/addProduct", upload, addProduct);

router.put("/updateProduct", updateProduct);

router.put("/updateProductWithImage", upload, updateProduct);

router.get("/currencies", getCurrencies);

router.get("/currencies/:id", findOneCurrency);

router.delete("/currencies/:id", deleteProduct);

module.exports = router;
