const gazUserModel = require("../models/gazUser.model");
const gazUserService = require("../services/gazUser.services");
const { validationResult } = require("express-validator");
const sharp = require("sharp");

module.exports.createReq = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
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
  } = req.body;

  const isAlreadyRequested = await gazUserModel.findOne({ ruidNo });
  if (isAlreadyRequested) {
    return res.status(400).json({ message: "Request already exists" });
  }
  let profilePic = req.files?.profilePic?.[0];
  let signPic = req.files?.signPic?.[0];
  let hindiNamePic = req.files?.hindiNamePic?.[0];
  let hindiDesg = req.files?.hindiDesg?.[0];

  if (profilePic && profilePic.mimetype === "image/png") {
    profilePic.buffer = await sharp(profilePic.buffer).jpeg().toBuffer();
    profilePic.mimetype = "image/jpeg";
  }
  if (signPic && signPic.mimetype === "image/png") {
    signPic.buffer = await sharp(signPic.buffer).jpeg().toBuffer();
    signPic.mimetype = "image/jpeg";
  }
  if (hindiNamePic && hindiNamePic.mimetype === "image/png") {
    hindiNamePic.buffer = await sharp(hindiNamePic.buffer).jpeg().toBuffer();
    hindiNamePic.mimetype = "image/jpeg";
  }
  if (hindiDesg && hindiDesg.mimetype === "image/png") {
    hindiDesg.buffer = await sharp(hindiDesg.buffer).jpeg().toBuffer();
    hindiDesg.mimetype = "image/jpeg";
  }

  const newReq = await gazUserService.createReq({
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
    profilePic: {
      data: profilePic?.buffer,
      contentType: profilePic?.mimetype,
    },
    signPic: {
      data: signPic?.buffer,
      contentType: signPic?.mimetype,
    },
    hindiNamePic: {
      data: hindiNamePic?.buffer,
      contentType: hindiNamePic?.mimetype,
    },
    hindiDesg: {
      data: hindiDesg?.buffer,
      contentType: hindiDesg?.mimetype,
    },
  });
  res.status(201).json({ newReq });
};

module.exports.appStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { ruidNo, dob } = req.body;

  if (!ruidNo || !dob) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  const application = await gazUserModel.findOne({
    ruidNo,
    dob: new Date(dob),
  });
  if (!application) {
    return res.status(400).json({ status: "Application not found" });
  }
  res.status(201).json({ app: {
      ...application._doc,
      profilePic: application.profilePic?.data
        ? `data:${application.profilePic.contentType};base64,${application.profilePic.data.toString('base64')}`
        : null,
      signPic: application.signPic?.data
        ? `data:${application.signPic.contentType};base64,${application.signPic.data.toString('base64')}`
        : null,
      hindiNamePic: application.hindiNamePic?.data
        ? `data:${application.hindiNamePic.contentType};base64,${application.hindiNamePic.data.toString('base64')}`
        : null,
      hindiDesg: application.hindiDesg?.data
        ? `data:${application.hindiDesg.contentType};base64,${application.hindiDesg.data.toString('base64')}`
        : null,
    }});
};

module.exports.searchApplications = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { from, to, status } = req.body;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (from && to) {
      query.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    } else if (from) {
      query.createdAt = {
        $gte: new Date(from),
        $lte: new Date(),
      };
    } else if (to) {
      query.createdAt = {
        $lte: new Date(to),
      };
    }

    const applicationsRaw = await gazUserModel.find(query).sort({ createdAt: -1 });

    const applications = applicationsRaw.map(application => ({
      ...application._doc,
      profilePic: application.profilePic?.data
        ? `data:${application.profilePic.contentType};base64,${application.profilePic.data.toString('base64')}`
        : null,
      signPic: application.signPic?.data
        ? `data:${application.signPic.contentType};base64,${application.signPic.data.toString('base64')}`
        : null,
      hindiNamePic: application.hindiNamePic?.data
        ? `data:${application.hindiNamePic.contentType};base64,${application.hindiNamePic.data.toString('base64')}`
        : null,
      hindiDesg: application.hindiDesg?.data
        ? `data:${application.hindiDesg.contentType};base64,${application.hindiDesg.data.toString('base64')}`
        : null,
    }));

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error in searchApplications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.viewAllApplications = async (req, res, next) => {
  try {

    const applicationsRaw = await gazUserModel
      .find()
      .sort({ createdAt: -1 });

    const applications = applicationsRaw.map(application => ({
      ...application._doc,
      profilePic: application.profilePic?.data
        ? `data:${application.profilePic.contentType};base64,${application.profilePic.data.toString('base64')}`
        : null,
      signPic: application.signPic?.data
        ? `data:${application.signPic.contentType};base64,${application.signPic.data.toString('base64')}`
        : null,
      hindiNamePic: application.hindiNamePic?.data
        ? `data:${application.hindiNamePic.contentType};base64,${application.hindiNamePic.data.toString('base64')}`
        : null,
      hindiDesg: application.hindiDesg?.data
        ? `data:${application.hindiDesg.contentType};base64,${application.hindiDesg.data.toString('base64')}`
        : null,
    }));

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error in searchApplications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { ruidNo, status } = req.body;

    if (!ruidNo || !status) {
      return res.status(400).json({ message: "ruidNo and status are required" });
    }

    const result = await gazUserModel.findOneAndUpdate(
      { ruidNo },
      { $set: { status } },
      { new: false }
    );

    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error in updateApplicationStatus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

