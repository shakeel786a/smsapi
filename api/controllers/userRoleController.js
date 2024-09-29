const UserRole = require("../models/userRole");

const createUserRoles = async (req, res) => {
  try {
    const newData = new UserRole(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllUserRoles = async (req, res) => {
  const { name, type, isActive, sort, select } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = name;
  }
  if (type) {
    queryObject.type = type;
  }
  if (type) {
    queryObject.isActive = isActive;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = UserRole.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  const myData = await apiData;
  res.status(200).json({
    isSuccess: 1,
    message: "Success",
    data: myData,
    nbHits: myData?.length,
  });
};

const getUserRoleById = async (req, res) => {
  const { userRoleId } = req.params || {};
  try {
    const result = await UserRole.findById(userRoleId);
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const userRoleUpdateById = async (req, res) => {
  const { userRoleId } = req.params || {};
  try {
    const result = await UserRole.updateOne(
      {
        _id: userRoleId,
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

const userRoleDeleteById = async (req, res) => {
  const { userRoleId } = req.params || {};
  try {
    const result = await UserRole.deleteOne({
      _id: userRoleId,
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
  createUserRoles,
  getAllUserRoles,
  getUserRoleById,
  userRoleUpdateById,
  userRoleDeleteById,
};
