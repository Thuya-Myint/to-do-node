const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const toDoRoute = require("./routes/todo");
const inProRoute = require("./routes/progress");
const completeRoute = require("./routes/completed");
const { todo } = require("./model/model");
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todo", toDoRoute);
app.use("/api/inProgress",inProRoute);
app.use("/api/completed", completeRoute);

mongoose.connect(
  "mongodb+srv://thuyamyint2022:thuya123@cluster-1.zjpuhzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1",
  
)
  .then(() => {
    console.log("Connected to Mongo DB!");
    app.listen(5002, () => {
      console.log("Server is running on port 5002");
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
  //SSE endpoint
app.get("/api/stream", async(req, res)=>{
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const heartbeat=setInterval(()=>{
    res.write(":\n\n");
  },30000)


const db=mongoose.connection;

const todoStream=db.collection("todos").watch();
const inProgressStream=db.collection("progresses").watch();
const completedStream=db.collection("completes").watch();

const handleChange=(change)=>{
  res.write(`data : ${JSON.stringify(change)}\n\n`);
};
todoStream.on("change", handleChange);
inProgressStream.on("change", handleChange);
completedStream.on("change", handleChange);

req.on("close",()=>{
  clearInterval(heartbeat);
  todoStream.close();
  inProgressStream.close();
  completedStream.close();
})
});
