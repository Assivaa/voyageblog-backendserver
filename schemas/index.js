const mongoose = require("mongoose");

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/voyageblog")
    .connect("mongodb+srv://Admin1:admin1@cluster0.qsqc6.mongodb.net/voyageblog?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;