const express=require("express");
const router=express.Router();
const { addInProgress, getInProgress, deleteInProgress} = require("../model/DB.Manipulation");

router.post("/",addInProgress);
router.get("/",getInProgress);
router.delete("/:id",deleteInProgress)

module.exports=router;