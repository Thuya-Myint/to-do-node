import { useState, useEffect, useRef } from "react";
import axios from 'axios';

function ToDoApp() {
   const [todo, setTodo] = useState("");// get updated data from input field
   const [todolist, setTodolist] = useState([]);// get to do list from DB
   const [prolist, setProList] = useState([]);// get in progress list from DB
   const [completed, setCompleted] = useState([]);// get completed lis from DB
   const [updating, setUpdating] = useState(false);// variable to control function of input field
   const [action, setAction] = useState("Add To Task");// show function
   const [source, setSource] = useState("todo");
   const [updatedSource, setUpdatedSource] = useState("todo");
   const [dragging, setDragging] = useState(false);
   const dragRef = useRef({});
   const clickRef = useRef({});

   useEffect(() => {
      getTodos();
      getInProgress();
      getCompleted();
      // const eventSource=new EventSource('http://localhost:5002/api/stream');
      // eventSource.onmessage=(event)=>{
      //   const change=JSON.parse(event.data);
      //   handleDatabaseChange(change);
      // };
      // return ()=>{
      //   eventSource.close();
      // };
   }, []);
   // --------------------------------------------get Data from database---------------------------------
   const getTodos = async () => {
      try {
         const response = await axios.get('https://to-do-node-y6au.onrender.com/api/todo');
         setTodolist(response.data);
      } catch (error) {
         console.log(error);
      }
   };
   const getInProgress = async () => {
      try {
         const response = await axios.get('https://to-do-node-y6au.onrender.com/api/inProgress');
         setProList(response.data);
      } catch (error) {
         console.log(error);
      }
   };
   const getCompleted = async () => {
      try {
         const response = await axios.get('https://to-do-node-y6au.onrender.com/api/completed');
         setCompleted(response.data);
      } catch (error) {
         console.log(error);
      }
   }
   //--------------------------------------------get Data from database---------------------------------
   // --------------------------------------------add Data to database---------------------------------
   const add = async (e) => {
      e.preventDefault();
      if (todo.trim() === "") {
         alert("Task Can't Be Blank");
         return;
      }
      try {
         await axios.post(`https://to-do-node-y6au.onrender.com/api/${updatedSource}`, {
            name: todo
         });
         setTodo('');
         getTodos();
      } catch (error) {
         console.log(error);
      }
   };

   //  --------------------------------------------add Data to database---------------------------------
   // --------------------------------------------update Data to database---------------------------------
   const updateTodo = async (e) => {
      e.preventDefault();
      const { source, task, id } = clickRef.current;
      // console.log(todo, source, id)
      try {
         await axios.put(`https://to-do-node-y6au.onrender.com/api/${source}/${id}`, {
            name: todo,
         });
         setTodo('');
         getTodos();
      } catch (error) {
         console.log(error);
      }
   }
   // --------------------------------------------update Data to database---------------------------------
   // --------------------------------------------delete Data from database---------------------------------
   const deleteitem = async (e) => {
      e.preventDefault();
      var id = dragging ? dragRef.current.id : clickRef.current.id;
      var source = dragging ? dragRef.current.source : clickRef.current.source;
      try {
         await axios.delete(`https://to-do-node-y6au.onrender.com/api/${source}/${id}`);
         setTodo("");
         setUpdating(false);
         setAction("Add To Task");
         getTodos();
         getInProgress();
         getCompleted();


      } catch (error) {
         console.log(error);
      }
   }
   // --------------------------------------------delete Data from database---------------------------------
   const executeAction = (e) => {
      // console.log(action);
      if (action === 'Add To Task') {
         add(e);
      }
      else if (action === 'Update') {
         updateTodo(e);
      }

   }
   // --------------------------------------------delete Data from database---------------------------------
   // --------------------------------------------drag and drop---------------------------------
   const handleClick = (source, task, id) => {
      setSource(source);
      setTodo(task);
      setUpdating(true);
      setAction("Update");
      clickRef.current = { source, task, id };
      console.log(clickRef);
   }
   const clickToReset = () => {
      setUpdating(false);
      setAction("Add To Task");
      setTodo('');
   }
   const handleDragStart = (source, item, id) => {
      setTodo(item);
      setDragging(true);
      dragRef.current = { source, item, id };
   }
   const handleDragEnter = (destination) => {
      setUpdatedSource(destination);
   }
   const handleDrop = (e) => {
      if (dragging) {
         const { source, item, id } = dragRef.current;
         if (source !== updatedSource) {
            deleteitem(e);
            add(e);
         }
         setDragging(false);
      }
   }
   // --------------------------------------------drag and drop---------------------------------
   // const handleDatabaseChange = (change) => {
   //   if (change.operationType === 'insert') {
   //     const newDocument = change.fullDocument;
   //     if (change.ns.coll === 'todos') {
   //       setTodolist((prev) => [...prev, newDocument]);
   //     } else if (change.ns.coll === 'inprogress') {
   //       setProList((prev) => [...prev, newDocument]);
   //     } else if (change.ns.coll === 'completed') {
   //       setCompleted((prev) => [...prev, newDocument]);
   //     }
   //   } else if (change.operationType === 'update') {
   //     const updatedDocument = change.fullDocument;
   //     if (change.ns.coll === 'todos') {
   //       setTodolist((prev) =>
   //         prev.map((item) => (item._id === updatedDocument._id ? updatedDocument : item))
   //       );
   //     } else if (change.ns.coll === 'inprogress') {
   //       setProList((prev) =>
   //         prev.map((item) => (item._id === updatedDocument._id ? updatedDocument : item))
   //       );
   //     } else if (change.ns.coll === 'completed') {
   //       setCompleted((prev) =>
   //         prev.map((item) => (item._id === updatedDocument._id ? updatedDocument : item))
   //       );
   //     }
   //   } else if (change.operationType === 'delete') {
   //     const deletedDocumentId = change.documentKey._id;
   //     if (change.ns.coll === 'todos') {
   //       setTodolist((prev) => prev.filter((item) => item._id !== deletedDocumentId));
   //     } else if (change.ns.coll === 'inprogress') {
   //       setProList((prev) => prev.filter((item) => item._id !== deletedDocumentId));
   //     } else if (change.ns.coll === 'completed') {
   //       setCompleted((prev) => prev.filter((item) => item._id !== deletedDocumentId));
   //     }
   //   }
   // };
   return (
      <div className="p-10 flex flex-col h-screen text-lg items-center">
         <form className="flex sm:flex-row flex-col" onSubmit={executeAction}>
            <input
               type="text"
               placeholder="New Task"
               className="border-2 px-3 py-2 flex-shrink-1"
               value={todo}
               onChange={(e) => setTodo(e.target.value)}
            />
            <input
               type="submit"
               value={action}
               className="bg-blue-500 px-4 py-2 sm:ms-1 rounded-sm border-1 border-blue-500 sm:mt-0 mt-2"

            />
            {updating ? <div>
               <button
                  className="bg-blue-500 px-4 py-2 sm:ms-1 rounded-sm border-1 border-blue-500 sm:mt-0 mt-2 h-full"
                  onClick={clickToReset}>
                  Cancel</button>
               <button
                  className="bg-blue-500 px-4 py-2 sm:ms-1 rounded-sm border-1 border-blue-500 sm:mt-0 mt-2 h-full"
                  onClick={deleteitem}
               >
                  Delete
               </button>
            </div> : ""}
         </form>
         <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-10 md:gap-2 gap-0">
            <div className="mt-10">
               <div className="text-center bg-orange-300 py-2">To Do List</div>
               <section className="w-56 h-80 border-2 px-2 py-1 overflow-auto"
                  onDragEnter={() => handleDragEnter("todo")}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => handleDrop(e)}
               >
                  {todolist.map((item, index) => (
                     <div
                        key={item._id} // Use MongoDB ObjectId as key
                        className="bg-orange-400 px-4 py-2 rounded-md mb-1 text-slate-700"
                        onClick={() => handleClick("todo", item.name, item._id)}
                        draggable onDragStart={() => handleDragStart("todo", item.name, item._id)}
                     >
                        {item.name}
                     </div>
                  ))}
               </section>
            </div>
            <div className="mt-10">
               <div className="text-center bg-blue-300 py-2">In Progress</div>
               <section className="w-56 h-80 border-2 px-2 py-1 overflow-auto"
                  onDragEnter={() => handleDragEnter("inProgress")}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => handleDrop(e)}
               >
                  {prolist.map((item, index) => (
                     <div
                        key={item._id} // Use MongoDB ObjectId as key
                        className="bg-blue-400 px-4 py-2 rounded-md mb-1"
                        onClick={() => handleClick("inProgress", item.name, item._id)}
                        draggable onDragStart={() => handleDragStart("inProgress", item.name, item._id)}
                     >
                        {item.name}
                     </div>
                  ))}
               </section>
            </div>
            <div className="mt-10">
               <div className="text-center bg-green-300 py-2">Completed</div>
               <section className="w-56 h-80 border-2 px-2 py-1 overflow-auto"
                  onDragEnter={() => handleDragEnter("completed")}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => handleDrop(e)}
               >
                  {completed.map((item, index) => (
                     <div
                        key={item._id} // Use MongoDB ObjectId as key
                        className="bg-green-400 px-4 py-2 rounded-md mb-1"
                        onClick={() => handleClick("completed", item.name, item._id)}
                        draggable onDragStart={() => handleDragStart("completed", item.name, item._id)}
                     >
                        {item.name}
                     </div>
                  ))}
               </section>
            </div>
         </div>
      </div>
   );
}

export default ToDoApp;
