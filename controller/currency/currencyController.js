// const sequelize = require("../../config/db");
const Currency = require("../../model/currencyModel");
const multer = require("multer");
const path = require("path");

const addProduct = async (req, res) => {
  const data = req.body;
  console.log(req.file.path);
  let info = {
    Name: data.Name,
    Description: data.Description,
    Image: req.file.path,
    Price: data.Price,
    Continent: data.Continent,
    Country: data.Country,
    Status: data.Status,
    Type: data.Type,
    bestSeller: data.bestSeller,
  };

  try {
    const currency = await Currency.create(info);
    res.send(currency);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to upload the product");
  }
};

const updateProduct = async (req, res) => {
  const data = req.body;
  console.log(req.file.path);
  let info = {
    Name: data.Name,
    Description: data.Description,
    Image: req.file.path,
    Price: data.Price,
    Continent: data.Continent,
    Country: data.Country,
    Status: data.Status,
    Type: data.Type,
    bestSeller: data.bestSeller,
  };

  try {
    const currency = await Currency.update(info, {
      where: { id: data.id },
    });
    res.send(currency);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to upload the product");
  }
};

const getCurrencies = async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.bestSeller) {
    match.bestSeller = req.query.bestSeller === "true";
  }

  if (req.query.Type) {
    match.Type = req.query.Type;
  }

  if (req.query.Country) {
    match.Country = req.query.Country;
  }

  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const currency = await Currency.findAll({
      where: match,
      offset: offset,
      limit: limit,
    });

    const meta = {
      total: await Currency.count({
        where: match,
        offset: offset,
        limit: limit,
      }),
      limit: limit,
      offset: offset,
      page: offset / limit + 1,
    };

    const output = {
      data: currency,
      meta: meta,
    };
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to upload the product");
  }
};

const findOneCurrency = async (req, res) => {
  try {
    const currency = await Currency.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (currency) res.send(currency);
    else res.status(400).json("Not found");
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed get the product");
  }
};

const deleteProduct = async (req, res) => {
  Currency.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      console.log("Successfully deleted record.");
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
    });
};

// Upload Image Controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5mb" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("Image");

module.exports = {
  addProduct,
  upload,
  getCurrencies,
  findOneCurrency,
  updateProduct,
  deleteProduct,
};
