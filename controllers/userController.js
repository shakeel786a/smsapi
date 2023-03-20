const User = require("../models/user");
const UserRole = require("../models/userRole");
const { getUserRoleById } = require("./userRoleController");

const createUsers = async (req, res) => {
  try {
    const newData = new User(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllUsers = async (req, res) => {
  const { firstName, lastName, sort, select, isActive } = req.query;
  const queryObject = {};

  if (isActive) {
    queryObject.isActive = isActive;
  }

  if (firstName) {
    // queryObject.name = name;
    queryObject.firstName = { $regex: firstName, $options: "i" };
  }
  if (lastName) {
    // queryObject.name = name;
    queryObject.lastName = { $regex: lastName, $options: "i" };
  }

  let apiData = User.find(queryObject);

  const abc = db.users.aggregate({
    $lookup: {
      from: "userroles",
      localField: "userRoleId",
      foreignField: "_id",
      as: "userRoleId",
    },
  });
  console.log("abc==============>", abc);

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

const getUserById = async (req, res) => {
  const { userId } = req.params || {};
  try {
    const result = await User.findById(userId);
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const userUpdateById = async (req, res) => {
  const { userId } = req.params || {};
  try {
    const result = await User.updateOne(
      {
        _id: userId,
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

const userDeleteById = async (req, res) => {
  const { userId } = req.params || {};
  try {
    const result = await User.remove({
      _id: userId,
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
  createUsers,
  getAllUsers,
  getUserById,
  userUpdateById,
  userDeleteById,
};
