const Menu = require("../models/menu");

const createMenu = async (req, res) => {
  //   res.status(200).json({ message: "Success", data: {} });
  try {
    const newData = new Menu(req?.body || {});
    const result = await newData.save();

    res.status(200).json({ isSuccess: 1, message: "Success", data: result });
  } catch (error) {
    console.log("error=======>", error);
  }
};

const getAllMenu = async (req, res) => {
  const { title, isActive, sort } = req.query;
  const queryObject = {};

  if (isActive) {
    queryObject.isActive = isActive;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  let apiData = Menu.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  const myData = await apiData;
  res.status(200).json({
    isSuccess: 1,
    message: "Success",
    data: myData,
    nbHits: myData?.length,
  });
};

const getMenuById = async (req, res) => {
  const { menuId } = req.params || {};
  try {
    const result = await Menu.findById(menuId);
    res.status(200).json({
      isSuccess: 1,
      message: "Success",
      data: result,
    });
  } catch (error) {
    console.log("error=====>", error);
  }
};

const menuUpdateById = async (req, res) => {
  const { menuId } = req.params || {};
  try {
    const result = await Menu.updateOne(
      {
        _id: menuId,
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

const menuDeleteById = async (req, res) => {
  const { menuId } = req.params || {};
  try {
    const result = await Menu.remove({
      _id: menuId,
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
  createMenu,
  getAllMenu,
  getMenuById,
  menuUpdateById,
  menuDeleteById,
};
