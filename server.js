require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
  process.env.MDB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connesso");
  }
);
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/api", AuthRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
