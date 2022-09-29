let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let action = document.getElementById("notePadLabel");
// set date initialize
function setDate(){
var now = new Date();
var month = (now.getMonth() + 1);               
var day = now.getDate();
if (month < 10) 
    month = "0" + month;
if (day < 10) 
    day = "0" + day;
var today = now.getFullYear() + '-' + month+'-'+ day;
dateInput.value= today;
console.log(today);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
 // End form listening

  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Notes cannot be blank";
    } else if (dateInput.value === ""){
      setDate();
      msg.innerHTML = "Date cannot be blank";
    }
    else
    {
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    
        (() => {
          add.setAttribute("data-bs-dismiss", "");
        })();
      console.log("success");
      msg.innerHTML = "";
    }
  };
//End formValidation

  let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
confirmAction();
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
//  createTasks();
};
// end accept Data

let createTasks = () => {
    action.innerHTML="Flight NotePad - ADD";
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
    resetForm();
  };
  // End Create Task

  let deleteTask = (e) => {
    let confirmAction = confirm("Are you sure to DELETE?");
    if (confirmAction) {
      e.parentElement.parentElement.remove();
      data.splice(e.parentElement.parentElement.id, 1);
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      alert("Action canceled");
    }
  
    console.log(data);
  }; // End of Delete function

  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  }; // end f.resetForm

  let editTask = (e) => {
    action.innerHTML="Flight NotePad - Edit";
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
  }; // End of Edit function

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();

  // Confirmation start

  function confirmAction() {
    let confirmAction = confirm("Are you sure to execute this action?");
    if (confirmAction) {
      createTasks()
    } else {
      alert("Action canceled");
    }
  }

  function showConfirmBox() {
    document.getElementById("overlay").hidden = false;
  }
  function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
  }

  function isConfirm(answer) {
    if (answer) {
      alert("Answer is yes");
    } else {
      alert("Answer is no");
    }
    closeConfirmBox();
  }
  // End confirmation