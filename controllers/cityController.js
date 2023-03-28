const User = require("../models/user");
const City = require("../models/city");

const createCity = async (req, res) => {
  try {
    const newData = new City(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllCities = async (req, res) => {
  const { cityName, sort, select, isActive } = req.query;
  const queryObject = {};

  if (isActive) {
    queryObject.isActive = isActive;
  }

  if (cityName) {
    queryObject.cityName = { $regex: cityName, $options: "i" };
  }

  // let apiData = City.find(queryObject);
  let apiData = City.aggregate([
    {
      $addFields: {
        stateId: { $toObjectId: "$stateId" },
      },
    },
    {
      $lookup: {
        from: "states",
        localField: "stateId",
        foreignField: "_id",
        as: "stateId",
      },
    },
    {
      $match: queryObject,
    },
  ]);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  //   let page = Number(req?.query?.page) || 1;
  //   let limit = Number(req?.query?.limit) || 10;

  //   let skip = (page - 1) * limit;

  //   apiData = apiData.skip(skip).limit(limit);

  const myData = await apiData;
  res.status(200).json({
    isSuccess: 1,
    message: "Success",
    data: myData,
    nbHits: myData?.length,
  });
};

const getCityById = async (req, res) => {
  const { cityId } = req.params || {};
  try {
    let apiData = City.aggregate([
      {
        $addFields: {
          stateId: { $toObjectId: "$stateId" },
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "stateId",
          foreignField: "_id",
          as: "stateId",
        },
      },
      {
        $match: {
          $expr: { $eq: ["$_id", { $toObjectId: cityId }] },
        },
      },
    ]);

    const myData = await apiData;
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: myData,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const cityUpdateById = async (req, res) => {
  const { cityId } = req.params || {};
  try {
    const result = await City.updateOne(
      {
        _id: cityId,
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

const cityDeleteById = async (req, res) => {
  const { cityId } = req.params || {};
  try {
    const result = await City.remove({
      _id: cityId,
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
  createCity,
  getAllCities,
  getCityById,
  cityUpdateById,
  cityDeleteById,
};
