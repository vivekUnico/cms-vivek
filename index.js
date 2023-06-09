const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const Authorize = require("./middleware/CreateLeadFromEmail");
const cron = require('node-cron');

// cron.schedule('0 */4 * * *', async () => {
//   await Authorize();
// });

// cron.schedule('*/30 * * * * *', async () => {
//   console.log('fetching lead from email');
//   await Authorize();
// });

/*
* ###################################### For socket io implementation ######################################
*/
const http = require('http');
// --------------------------------- initialize app ---------------------------------
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
require('./controllers/community/socket')(io);

// Models
const StudyMaterial = require("./models/studymaterial");

// ---------------- ----------------- load env vars ---------------------------------
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "config/config.env" });
}

// --------------------------------- import routers files ---------------------------------

const adminRouter = require('./routes/admin');
const studentRouter = require('./routes/student');
const FileUploadRouter = require('./routes/getFileUrl/index.js');
// const customerRouter = require('./routes/user/user');

// --------------------------------- Logging Middleware ---------------------------------
app.use(morgan("dev"));

// --------------------------------- body parser setup ---------------------------------
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------------------------- CORS config---------------------------------
app.use(cors());

//  --------------------------------- main route setup ---------------------------------
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/student/", studentRouter);
app.use("/api/v1/getFileUrl/", FileUploadRouter);
// --------------------------------- error handler ---------------------------------
app.use(errorHandler);

// --------------------------------- Express App setup ---------------------------------
const PORT = process.env.PORT || 5000;
const servermain = server.listen(PORT, async () => {
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
