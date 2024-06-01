import mongoose from "mongoose";
import app from "./app.js"


const {DB_HOST} = process.env;
const port = process.env.PORT || 4000;

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(port, () => {
    console.log('Database connection successful');
  })
}).catch((err) => {
  
  console.log(err.message);
  process.exit(1);
})