const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const propertyRouter = require("./property");
const reviewRouter = require("./review");
const userRouter = require("./user");
const viewingsRouter = require("./viewings");
const favoriteRouter = require("./favorite");
const employeeRouter = require("./employee");

router.use("/favorite", favoriteRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/property", propertyRouter);
router.use("/review", reviewRouter);
router.use("/viewing", viewingsRouter);
router.use("/employee", employeeRouter);

module.exports = router;
