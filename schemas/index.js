const mongoose = require("mongoose");

const mongoStr =
  "mongodb+srv://usagi0012:dntkrl1218@usagi0012.qgznxfs.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
  mongoose
    .connect(mongoStr)
    .then(() => console.log("connected"))
    .catch((err) => console.log(`failed. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
