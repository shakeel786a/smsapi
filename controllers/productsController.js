const Product = require("../models/product");

const createPorducts = async (req, res) => {};

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
  res
    .status(200)
    .json({ message: "Success", data: myData, nbHits: myData?.length });
};

module.exports = { createPorducts, getAllProducts };
