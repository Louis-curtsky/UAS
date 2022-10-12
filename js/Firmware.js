let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let check1Yes = document.getElementById("check1Yes");
let check1No = document.getElementById("check1No");

let check2Yes = document.getElementById("check2Yes");
let check2No = document.getElementById("check2No");

let textInput = document.getElementById("textInput");

let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");

let dateInput2 = document.getElementById("dateInput2");
let textarea2= document.getElementById("text2area");

let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add1 = document.getElementById("add1");
let add2 = document.getElementById("add2");
let action = document.getElementById("notePadLabel");
let notes = document.getElementById("Notes");
let btnNote = document.getElementById("consistency");
let addNew = document.getElementById("addNew");
let addNewA = document.getElementById("addNewA");
let countTask = 0;
let position = 0;

//Check 1yesno
check1No.onclick = check1Click;
check1Yes.onclick = check1Click;

check2No.onclick = check2Click;
check2Yes.onclick = check2Click;

form1.addEventListener("submit",  (e) => {
  e.preventDefault();
  if (check1No){
    formValidation();
  }
});

function check1Click(){
  if (check1Yes.checked)
  {
    addNew.innerHTML="-";
    addNew.style.cursor="none";
  }
  else
  {
    addNew.innerHTML="Click";
    addNew.style.cursor="pointer";
    countTask=1;
    position++;
    textInput.value=countTask;
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
    form2.addEventListener("submit",  (e) => {
      e.preventDefault();
      if (check2No.checked)
      formValidation();
    });
    addNewA.innerHTML="Click";
    addNewA.style.cursor="pointer";
    countTask=2;
    position++;
    textInput.value=countTask;
  }
} // End check1Click

console.log("postion:"+ position);
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


 // End form listening


  let formValidation = () => {
      setDate();
      if (countTask===1)
      {
        acceptData1();
        add1.setAttribute("data-bs-dismiss", "modal");
        add1.click();
        (() => {
          add1.setAttribute("data-bs-dismiss", "");
        })();
        countTask=0;
      }
      if (countTask===2)
      {
        acceptData2();
        add2.setAttribute("data-bs-dismiss", "modal");
        add2.click();
        (() => {
          add2.setAttribute("data-bs-dismiss", "");
        })();
        countTask=0;
      }
      msg.innerHTML = "";
  };
//End formValidation

let data = [];

let acceptData1 = () => {
  data.push({
    text: textInput.value,
    datapos: position,
    date: dateInput.value,
    description: textarea.value,
  });
  confirmAction();
//  createTasks();
};
// end accept Data 1

let acceptData2 = () => {
  console.log("acceptData2: "+textarea2.value);
  data.push({
    text: textInput.value,
    datapos: position,
    date: dateInput2.value,
    description: textarea2.value,
  });
  confirmAction();
//  createTasks();
};
// end accept Data 1

let createTasks = () => {
    action.innerHTML="Firmware Check List";
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span >No: ${x.datapos}</span>
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
    dateInput2.value = "";
    textarea2.value = "";
    if (countTask === 1)
    {
      check1No.disabled = true;
      check1Yes.disabled = true;
      addNew.style.cursor="none";
    } 
    if (countTask === 2)
    {
      check2No.disabled = true;
      check2Yes.disabled = true;
      addNewA.style.cursor="none";
    } 
    countTask=0;
    if (position>2)
    {
      position = 0;
    }
  }; // end f.resetForm

  let editTask = (e) => {
    action.innerHTML="Edit";
    let selectedTask = e.parentElement.parentElement;

  // console.log("Edit= e:"+ e.parentElement.innerHTML);
  
  for (i=0; i<4; i++){
    console.log("Edit {"+i+"}:"+selectedTask.children[i].innerHTML);
  }
  
  datapos = selectedTask.children[0].innerHTML;
  textInput.value = selectedTask.children[1].innerHTML;
  dateInput.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;
  if (e.parentElement.parentElement===1){
      countTask=1;
  }
  
  if (e.parentElement.parentElement===1===2){
      countTask=2;
  }
 //  e.parentElement.parentElement.remove();
    selectedTask.remove();
    data.splice(e.parentElement.parentElement.id, 1);
 //   console.log("Edit Data:"+JSON.stringify(data));
    localStorage.setItem("data", JSON.stringify(data));
  }; // End of Edit function

  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
   // console.log(data);
    createTasks();
  })();

  // Confirmation start

  function confirmAction() {
    if (countTask != 0)
    {
      let confirmAction = confirm("Are you sure to execute this action?");
      if (confirmAction) {
        createTasks()
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        alert("Action canceled");
      }
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