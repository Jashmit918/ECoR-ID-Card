const gazUserModel = require("../models/gazUser.model");

module.exports.createReq = async ({
  empName,
  desg,
  ruidNo,
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
  hindiNamePic,
  hindiDesg,
}) => {
  if (
    !empName ||
    !desg ||
    !ruidNo ||
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

  const existingUser = await gazUserModel.findOne({ ruidNo });
  if (existingUser) {
    throw new Error("A request with this RUID Number already exists.");
  }

  const newReq = await gazUserModel.create({
    empName,
    desg,
    ruidNo,
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
    hindiNamePic,
    hindiDesg,
  });

  return newReq;
};

