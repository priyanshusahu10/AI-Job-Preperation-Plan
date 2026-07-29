const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middleware/file.middleware")

const interviewRouter = express.Router()



interviewRouter.post("/",authMiddleware.User, upload.single("resume"), interviewController.generateInterViewReportController)


interviewRouter.get("/report/:interviewId", authMiddleware.User, interviewController.getInterviewReportByIdController)


interviewRouter.get("/", authMiddleware.User, interviewController.getAllInterviewReportsController)


interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.User, interviewController.generateResumePdfController)



module.exports = interviewRouter