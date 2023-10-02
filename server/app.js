import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/VFM");

app.listen(3001, () => {
  console.log("Server is running on 3001 port.");
});
