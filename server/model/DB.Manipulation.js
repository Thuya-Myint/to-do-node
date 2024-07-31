const { todo, Inprogress, Complete } = require("./model");

// ---------------------------------------To Do----------------------------------------------
// delete Specific item
const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await todo.findByIdAndDelete(id);
    if (!itemToDelete)
      return res.status(404).json({ message: " this product is not exist!" });
    res.status(200).json({ message: " This product is successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update Specific item
const updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await todo.findByIdAndUpdate(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Specific item from the database
const getSpecToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await todo.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add ToDo item to the database
const addToDo = async (req, res) => {
  try {
    const addedTodo = await todo.create(req.body);
    res.status(200).json(addedTodo);
  } catch (error) {
    console.error("Error adding task: ", error);
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// Retrieve all ToDo items from the database
const getToDo = async (req, res) => {
  try {
    const todos = await todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error retrieving tasks: ", error);
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};
// ---------------------------------------In Progress----------------------------------------------
//add to Progress
const addInProgress = async (req, res) => {
  try {
    const inpro = await Inprogress.create(req.body);
    res.status(200).json(inpro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//retrieve from in progress
const getInProgress = async (req, res) => {
  try {
    const inpro = await Inprogress.find({});
    res.status(200).json(inpro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete from Complete
const deleteInProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const targetedItem = await Inprogress.findByIdAndDelete(id);
    if (!targetedItem)
      return res.status(404).json({ message: " Item does not exist!" });

    return res
      .status(202)
      .json({ message: "this item is deleted Successfully" });
  } catch (error) {}
};
// ---------------------------------------Completed----------------------------------------------
//add to Completed
const addCompleted=async(req, res)=>{
  try {
    const addedTask=await Complete.create(req.body);
    res.status(200).json(addedTask);
  } catch (error) {
    res.status(500).json({message :error.message});
  }
}
//show Completed
const showCompleted=async(req, res)=>{
  try {
    const resultSet=await Complete.find({});
    res.status(200).json(resultSet);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
}
//delete Completed
const deleteCompleted=async(req, res)=>{
  try {
    const {id}=req.params;
    const deletedTask=await Complete.findByIdAndDelete(id);
    if(!deletedTask)
      return res.status(404).json({message : " this item does not existed"});

    return res.status(200).json({message : " this item is successfully Deleted"})
  } catch (error) {
    res.status(500).json({message : error.message});
  }
}
module.exports = {
  addToDo,
  getToDo,
  getSpecToDo,
  updateToDo,
  deleteToDo,

  getInProgress,
  addInProgress,
  deleteInProgress,

  addCompleted,
  showCompleted,
  deleteCompleted
};
