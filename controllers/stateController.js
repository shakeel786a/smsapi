const User = require("../models/user");
const State = require("../models/state");

const createStates = async (req, res) => {
  try {
    const newData = new State(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllStates = async (req, res) => {
  const { stateName, sort, select, isActive } = req.query;
  const queryObject = {};

  if (isActive) {
    queryObject.isActive = isActive;
  }

  if (stateName) {
    queryObject.stateName = { $regex: stateName, $options: "i" };
  }

  let apiData = State.find(queryObject);

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

const getStateById = async (req, res) => {
  const { stateId } = req.params || {};
  try {
    const result = await State.findById(stateId);
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const stateUpdateById = async (req, res) => {
  const { stateId } = req.params || {};
  try {
    const result = await State.updateOne(
      {
        _id: stateId,
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

const stateDeleteById = async (req, res) => {
  const { stateId } = req.params || {};
  try {
    const result = await State.deleteOne({
      _id: stateId,
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
  createStates,
  getAllStates,
  getStateById,
  stateUpdateById,
  stateDeleteById,
};
