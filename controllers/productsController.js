const Product = require("../models/product");

const createPorducts = async (req, res) => {
  //   res.status(200).json({ message: "Success", data: {} });
  try {
    const newData = new Product(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.company = featured;
  }
  if (name) {
    // queryObject.name = name;
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req?.query?.page) || 1;
  let limit = Number(req?.query?.limit) || 10;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const myData = await apiData;
  res.status(200).json({
    isSuccess: 1,
    message: "Success",
    data: myData,
    nbHits: myData?.length,
  });
};

const getProductById = async (req, res) => {
  const { productId } = req.params || {};
  try {
    const result = await Product.findById(productId);
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const productUpdateById = async (req, res) => {
  const { productId } = req.params || {};
  try {
    const result = await Product.updateOne(
      {
        _id: productId,
      },
      req.body
    );
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const productDeleteById = async (req, res) => {
  const { productId } = req.params || {};
  try {
    const result = await Product.deleteOne({
      _id: productId,
    });
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

module.exports = {
  createPorducts,
  getAllProducts,
  getProductById,
  productUpdateById,
  productDeleteById,
};
