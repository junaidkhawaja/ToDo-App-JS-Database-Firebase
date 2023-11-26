var firebaseConfig = {
  apiKey: "AIzaSyDK0ARz7_OFCr1Xj8WHAZHYfT0f_ooARYI",
  authDomain: "todo-app-db-auth.firebaseapp.com",
  projectId: "todo-app-db-auth",
  databaseURL: "https://todo-app-db-auth-default-rtdb.firebaseio.com",
  storageBucket: "todo-app-db-auth.appspot.com",
  messagingSenderId: "102940096282",
  appId: "1:102940096282:web:8db15e4c5b4555518a1ea3"
};

// Initialize Firebase
var frb = firebase.initializeApp(firebaseConfig);

var todayDate = new Date().toDateString();
var dateBox = document.getElementById("dateBox");
dateBox.innerHTML = todayDate;

var input = document.getElementById("add");
var list = document.getElementById("todolist");
firebase.database().ref("todos").on("child_added", (data)=>{
    var liElem = document.createElement('li'); // let's create an empty list element
    var liText = document.createTextNode(data.val().value); // let's capture input value
    var liCheck = document.createElement('input'); // let's add a checkbox 
    var liDel = document.createElement('button'); // let's add a button to delete
    var liDelText = document.createTextNode('❌'); // let's assign delete button a value
    var liEdit = document.createElement('button'); // let's add a button to edit
    var liEditText = document.createTextNode('✏️'); // let's assign edit button a value
    liCheck.setAttribute("type", "checkbox"); // let's set attr to input
    liDel.setAttribute("onclick", "del(this)"); // let's add onclick event to delete
    liEdit.setAttribute("id", data.val().key); // let's assign a unique key to the edit button
    liEdit.setAttribute("onclick", "edit(this)"); // let's add onclick event to edit
    liDel.setAttribute("id", data.val().key); // let's assign a unique key to delete button
    liElem.appendChild(liCheck); // let's put li text
    liElem.appendChild(liText); // let's put li text
    liDel.appendChild(liDelText); // let's put delete text under button
    liEdit.appendChild(liEditText); // let's put edit text under the button
    liElem.appendChild(liDel); // let's put delete button under element
    liElem.appendChild(liEdit); // let's put edit button under element
    list.appendChild(liElem); // let's put the li inside the UL
    input.value = ""; // let's empty the input value

})
function addItem() {
    if (input.value) { // works only if input has value
    var key = firebase.database().ref("todos").push().key; // let's add a key to the databse
    var obj = { // here we are adding the key and value to an object
        value: input.value,
        key: key,
    }
    
    firebase.database().ref("todos").child(key).set(obj); // we're rewriting the key with the new object containing the same old key
}
}
function deleteAll() {
    firebase.database().ref("todos").remove(); // let's truncate the database completely
    list.innerHTML = ""; // let's emptify the inner html of the ul
}
function del(x) {
    firebase.database().ref("todos").child(x.id).remove(); // let's delete the child using it's key pairing
    x.parentNode.remove(); // let's remove the li itself
}
function edit(e) {
    var newValue =  prompt('Enter new ToDo'); // let's assign the new value to the li
    e.parentNode.childNodes[1].nodeValue = newValue // assigning the promot value to the task old value
    var editItem = { // creating an object so we can pass on new data
        value: newValue,
        key: e.id,
      };
    
      firebase.database().ref("todos").child(e.id).set(editItem); // setting/rewriting data into the same key pairs
}