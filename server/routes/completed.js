const express=require("express");
const router=express.Router();
const { addCompleted, showCompleted, deleteCompleted } = require("../model/DB.Manipulation");

router.post("/",addCompleted);
router.get("/", showCompleted);
router.delete("/:id", deleteCompleted);

module.exports=router;