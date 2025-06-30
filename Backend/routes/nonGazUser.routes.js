const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const nonGazUserController = require("../controllers/nonGazUser.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const createReqValidation = [
  body("empName").notEmpty().withMessage("Employee Name is required"),
  body("desg").notEmpty().withMessage("Designation is required"),
  body("empNo").notEmpty().withMessage("Employee Number is required"),
  body("dob")
    .isISO8601()
    .toDate()
    .withMessage("Date of Birth must be a valid date"),
  body("dept").notEmpty().withMessage("Department is required"),
  body("station").notEmpty().withMessage("Station is required"),
  body("billUnit").isInt().withMessage("Bill Unit must be an integer"),
  body("address").notEmpty().withMessage("Address is required"),
  body("mobile").isMobilePhone().withMessage("Valid Mobile Number is required"),
  body("reason").notEmpty().withMessage("Reason for application is required"),
  body("emergencyName")
    .notEmpty()
    .withMessage("Emergency Contact Name is required"),
  body("emergencyContact")
    .isMobilePhone()
    .withMessage("Valid Emergency Contact Number is required"),
  body("family").isArray().withMessage("Family must be an array"),
  body("family.*.name")
    .trim()
    .notEmpty()
    .withMessage("Family member name is required"),
  body("family.*.bloodGrp")
    .trim()
    .notEmpty()
    .withMessage("Family member blood group is required"),
  body("family.*.relation")
    .trim()
    .notEmpty()
    .withMessage("Family member relation is required"),
  body("family.*.famDob")
    .isISO8601()
    .toDate()
    .withMessage("Family member DOB must be a valid date"),
  body("family.*.idMarks")
    .trim()
    .notEmpty()
    .withMessage("Identification marks are required"),
];

router.post(
  "/create-req",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "signPic", maxCount: 1 },
  ]),
  createReqValidation,
  nonGazUserController.createReq
);
router.post(
  "/app-status",
  [
    body("empNo").notEmpty().withMessage("Employee Number is required"),
    body("empNo")
      .isInt({ min: 100 })
      .withMessage("Employee Number must be at least 3 digits long"),
    body("dob")
      .isISO8601()
      .toDate()
      .withMessage("Date of Birth must be a valid date"),
  ],
  nonGazUserController.appStatus
);

router.post(
  "/search-applications",
  authMiddleware.authUser,
  nonGazUserController.searchApplications
);
router.post(
  "/update",
  authMiddleware.authUser,
  nonGazUserController.updateApplicationStatus
);
router.get(
  "/view-applications",
  authMiddleware.authUser,
  nonGazUserController.viewAllApplications
);
module.exports = router;
