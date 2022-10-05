const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Models
const StudyMaterial = require("./models/studymaterial");

// --------------------------------- load env vars ---------------------------------
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "config/config.env" });
}

// --------------------------------- import routers files ---------------------------------

const adminRouter = require('./routes/admin');
const studentRouter = require('./routes/student');
// const customerRouter = require('./routes/user/user');
// --------------------------------- initialize app ---------------------------------
const app = express();

// --------------------------------- Logging Middleware ---------------------------------
app.use(morgan("dev"));

// --------------------------------- body parser setup ---------------------------------
app.use(express.json());

// --------------------------------- CORS config---------------------------------
app.use(cors());

//  --------------------------------- main route setup ---------------------------------
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/student/", studentRouter);

// app.use("/api/v1/customer/", customerRouter);
// --------------------------------- error handler ---------------------------------
app.use(errorHandler);

// --------------------------------- Express App setup ---------------------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  await connectDB();
  const rootStudyMateialFolderExists = await StudyMaterial.find({});
  if (rootStudyMateialFolderExists.length == 0) {
    await StudyMaterial.create({
      title: "root_StudyMaterial",
      type: "root"
    })
  }
  console.log(
    chalk.yellowBright.bold(
      `Server is running on PORT: ${PORT} url on mode ${process.env.NODE_ENV}`
    )
  );
});


// --------------------------------- Handle unhandled Promise rejections ---------------------------------
process.on("unhandledRejection", (err) => {
  console.log(chalk.bold.redBright(`Error: ${err.message}`));
  console.log(err);
  server.close(() => {
    console.log(
      chalk.bold.redBright("Server closed due to unhandled promise rejection")
    );
    process.exit(1);
  });
});
