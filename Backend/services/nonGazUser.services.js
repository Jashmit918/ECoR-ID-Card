const nonGazUserModel = require("../models/nonGazUser.model");

module.exports.createReq = async ({
  empName,
  desg,
  empNo,
  dob,
  dept,
  station,
  billUnit,
  address,
  rlyContact,
  mobile,
  reason,
  family,
  emergencyName,
  emergencyContact,
  profilePic,
  signPic,
}) => {
  if (
    !empName ||
    !desg ||
    !empNo ||
    !dob ||
    !dept ||
    !station ||
    !billUnit ||
    !address ||
    !mobile ||
    !reason ||
    !emergencyName ||
    !emergencyContact
  ) {
    throw new Error("All required fields must be provided.");
  }

  const existingUser = await nonGazUserModel.findOne({ empNo });
    if (existingUser) {
      throw new Error("A request with this RUID Number already exists.");
    }

  const newReq = await nonGazUserModel.create({
    empName,
    desg,
    empNo,
    dob,
    dept,
    station,
    billUnit,
    address,
    rlyContact,
    mobile,
    reason,
    family,
    emergencyName,
    emergencyContact,
    profilePic,
    signPic,
  });

  return newReq;
};