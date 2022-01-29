// Getting all required element
const inputbox = document.querySelector(".inputfield input");
const addbtn = document.querySelector(".inputfield button");
const todolist = document.querySelector(".todolist");
const deleteall = document.querySelector(".footer button");

// creating functiion  this will work when user start entering input the + icon will active else that will disble
inputbox.onkeyup = () => {
    let userdata = inputbox.value; //geting user entered value by the help of this function
    if (userdata.trim() != 0) {
        //if user values aren't only space
        addbtn.classList.add("active"); //active the add btn , when user start input + icon become blur
    } else {
        addbtn.classList.remove("active");
        //inactive the btn
    }
};

showtask(); //calling showtask function

// if user click on the add btn add the text to the local storage
addbtn.onclick = () => {
    let userdata = inputbox.value; //geting user entered
    let getlocalstorage = localStorage.getItem("New Todo"); //getting localstorage for store the text
    // if nothing is now on localstorage
    if (getlocalstorage == null) {
        //create a blank array and then store
        listarr = [];
    } else {
        listarr = JSON.parse(getlocalstorage); //transfer json string into a js object
    }
    listarr.push(userdata); //pushing or adding user data

    // update localstorage
    localStorage.setItem("New Todo", JSON.stringify(listarr)); //transfer js object into json string
    showtask(); //calling showtask function
};

// function to add task list inside ul

// next step whatever user input add that into the list and show that here is the list what you have to do

function showtask() {
    let getlocalstorage = localStorage.getItem("New Todo");
    if (getlocalstorage == null) {
        //create a blank array and then store
        listarr = [];
    } else {
        listarr = JSON.parse(getlocalstorage); //transfer json string into a js object
    }
    const pending = document.querySelector(".pending");
    pending.textContent = listarr.length; //passing the length value that will show how many task you have left to do
    // Some logic for clear all button
    if (listarr.length > 0) //if array length is greater than 0
    {
        deleteall.classList.add("active")
    } else {
        deleteall.classList.remove("active")
    }
    let newLiTag = "";
    listarr.forEach((element, index) => {
        newLiTag += `<li> ${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todolist.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputbox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
    let getlocalstorage = localStorage.getItem("New Todo");
    listarr = JSON.parse(getlocalstorage);
    listarr.splice(index, 1); //delete or remove the particular index one at a time

    // after remove the li again update the local storage
    // update storage after delete of one item
    localStorage.setItem("New Todo", JSON.stringify(listarr));
    showtask();
}

// delte all task function
deleteall.onclick = () => {
    listarr = []; //empty arr
    // after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listarr));
    showtask();
}