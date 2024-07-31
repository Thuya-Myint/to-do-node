const express=require("express");
const router=express.Router();
const {addToDo, getToDo, getSpecToDo, updateToDo, deleteToDo}=require("../model/DB.Manipulation");

router.post("/",addToDo);
router.get("/",getToDo);
router.get("/:id", getSpecToDo);
router.put("/:id", updateToDo);
router.delete("/:id", deleteToDo);

module.exports=router;