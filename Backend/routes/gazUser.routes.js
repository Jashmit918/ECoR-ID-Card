const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const gazUserController = require("../controllers/gazUser.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const createReqValidation = [
  body("empName").trim().notEmpty().withMessage("Employee Name is required"),
  body("desg").trim().notEmpty().withMessage("Designation is required"),
  body("ruidNo")
    .trim()
    .notEmpty()
    .withMessage("Employee RUID Number is required"),
  body("ruidNo")
    .isLength({ min: 3 })
    .withMessage("Employee RUID Number must be at least 3 characters"),
  body("dob")
    .isISO8601()
    .toDate()
    .withMessage("Date of Birth must be a valid date"),
  body("dept").trim().notEmpty().withMessage("Department is required"),
  body("station").trim().notEmpty().withMessage("Station is required"),
  body("billUnit")
    .isInt({ min: 1 })
    .withMessage("Bill Unit must be a positive integer"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("rlyContact")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid Railway Contact Number"),
  body("mobile").isMobilePhone().withMessage("Valid Mobile Number is required"),
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason for application is required"),
  body("emergencyName")
    .trim()
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
    { name: "hindiNamePic", maxCount: 1 },
    { name: "hindiDesg", maxCount: 1 },
  ]),
  createReqValidation,
  gazUserController.createReq
);

router.post(
  "/app-status",
  [
    body("ruidNo")
      .trim()
      .notEmpty()
      .withMessage("Employee RUID Number is required"),
    body("ruidNo")
      .isLength({ min: 3 })
      .withMessage("Employee RUID Number must be at least 3 characters"),
    body("dob")
      .isISO8601()
      .toDate()
      .withMessage("Date of Birth must be a valid date"),
  ],
  gazUserController.appStatus
);

router.post(
  "/search-applications",
  authMiddleware.authUser,
  gazUserController.searchApplications
);
router.post(
  "/update",
  authMiddleware.authUser,
  gazUserController.updateApplicationStatus
);
router.get(
  "/view-applications",
  authMiddleware.authUser,
  gazUserController.viewAllApplications
);


module.exports = router;
