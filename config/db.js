const mongoose = require("mongoose");
const connectDB = () => {
 

    mongoose
    .connect("mongodb://localhost:27017/", {
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then(() => {
      console.log("connected online");
    })
    .catch((error) => {
      console.log(error);
    });

 
 };

module.exports = connectDB;
