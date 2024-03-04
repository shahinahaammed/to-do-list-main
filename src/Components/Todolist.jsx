import React, {useState } from "react";
import { v4 as uuidv4 } from "uuid";
function Todolist() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [status, setstatus] = useState("");
  const [date, setdate] = useState("");
  const savetolocalstorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const handleadd = () => {
    settodos([ ...todos, { id: uuidv4(), todo, status, date, isCompleted: false },]);
    settodo("");
    setstatus("");
    setdate("");
    savetolocalstorage();
  };
  const handleedit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    setstatus(t[0].status);
    setdate(t[0].date);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
  };
  const handledelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetolocalstorage();
  };
  const handlechange = (e) => {
    settodo(e.target.value);
  };
  const handlestatus = (e) => {
    setstatus(e.target.value);
  };
  const handleDate = (e) => {
    setdate(e.target.value);
  };

  return (
    <div className="box">
      <h1 className="Headings">Todo List</h1>
      <h3 className="Heading">Add Task</h3>
      <div className="box-container">
        <div className="boxs">
          <div key={date} className="add">
            <p>Task</p>
            <input onChange={handlechange} value={todo} type="text" placeholder="Enter Task"  />
            <p>Status</p>
            <input onChange={handlestatus} type="text" value={status}  placeholder="Enter Status" /> 
            <p>Deadline</p>
            <input type="date" onChange={handleDate} value={date} id="" />
            <button className="Add-task" onClick={handleadd} disabled={todo.length <= 2} > Add Task </button>
          </div>
          {todos.length >= 1 && <div className="List">Todo List</div>}
          <div keys={status} className="lists">
            {todos.length >= 1 && (
              <div className="List-details">
                {" "}
                <span>Task</span> <span>Status</span> <span>Deadline</span>{" "}
                <span>Action</span>
              </div>
            )}

            {todos.map((item) => {
              return (
                <div className="text-details">
                  <div keys={item.id} className="textedit">
                    <div className="textedit">
                      <div  className={  item.isCompleted   ? "  " : "style= {{text-decoration:line-through}}" }>
                        {item.todo}
                      </div>
                    </div>
                    <div className="textedit">
                    <div  className={  item.isCompleted   ? "  " : "style= {{text-decoration:line-through}}" }>
                        {item.status}
                      </div>
                    </div>
                    <div className="textedit">
                     <div  className={  item.isCompleted   ? "  " : "style= {{text-decoration:line-through}}" }>
                        {item.date}
                      </div>
                    </div>
                    <div className="textedit">
                      <button className="Edit" onClick={(e) =>{ 
                      handleedit(e, item.id);
                        }}>                                            
                        Edit
                      </button>
                      <button className="Delete" onClick={(e) => {
                          handledelete(e, item.id);
                        }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
