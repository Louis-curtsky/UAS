let form = document.getElementById("form1");
let form2 = document.getElementById("form2");
let textInput = document.getElementById("textInput");
let check1Yes = document.getElementById("check1Yes");
let check1No = document.getElementById("check1No");
let check2Yes = document.getElementById("check2Yes");
let check2No = document.getElementById("check2No");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let action = document.getElementById("notePadLabel");
let notes = document.getElementById("Notes");
let btnNote = document.getElementById("consistency");
let addNew = document.getElementById("addNew");
let addNewA = document.getElementById("addNewA");
let countTask = 0;
let stop1 = false;

//Check 1yesno
check1No.onclick = check1Click;
check1Yes.onclick = check1Click;

check2No.onclick = check2Click;
check2Yes.onclick = check2Click;

function check1Click(){
  if (check1Yes.checked)
  {
    addNew.innerHTML="-";
    addNew.style.cursor="none";
    console.log("1=Yes");
  }
  else
  {
    addNew.innerHTML="Click";
    addNew.style.cursor="pointer";
    countTask=1;
    textInput.value=countTask;
    console.log("textInput:"+textInput.value);
  }
} // End check1Click

function check2Click(){
  if (check2Yes.checked)
  {
    console.log("2=Yes");
    addNewA.innerHTML="-";
    addNewA.style.cursor="none";
  }
  else
  {
    addNewA.innerHTML="Click";
    addNewA.style.cursor="pointer";
    countTask=2;
    textInput.value=countTask;
    stop1 = true;
    console.log("textInput:"+textInput.value);
  }
} // End check1Click



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


  form.addEventListener("submit",(e) => {
    e.preventDefault();
    if (stop1===false)
    {
      formValidation()
    } 
    console.log("form1 listening...");
  });

 // End form listening


  form2.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation()
    console.log("form2 listening...");
  });

// End form listening

  let formValidation = () => {
      setDate();
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    
        (() => {
          add.setAttribute("data-bs-dismiss", "");
        })();
      console.log("Form Validated!!!");
      msg.innerHTML = "";
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
  console.log("accepData: "+data.description);
//  createTasks();
};
// end accept Data

let createTasks = () => {
    action.innerHTML="Firmware Check List";
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form${countTask}" class="fas fa-edit"></i>
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
    action.innerHTML="Edit";
    let selectedTask = e.parentElement.parentElement;

  console.log("Edit= e:"+ e.parentElement.innerHTML);
    textInput.value = selectedTask.children[0].innerHTML;
  //  countTask = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
  }; // End of Edit function

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
   // console.log(data);
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