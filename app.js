//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var itemInput=document.getElementById("add-task__new-task");//Add a new task.
var addButton=document.querySelector(".add-task__button");//first button
var incompleteitemHolder=document.querySelector(".incompleted-tasks");//ul of #incompleted-tasks
var completeditemsHolder=document.querySelector(".completed-tasks");//completed-tasks


//New item list item
var createNewitemElement=function(itemString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=itemString;
    label.className="task__label label";

    listItem.className="incompleted-tasks__item task"

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className = "task__checkbox input"

    editInput.type="text";
    editInput.className="task__input input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="task__button task__button_func_edit button";

    deleteButton.className="task__button task__button_func_delete button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className="button__image"
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var additem=function(){
    console.log("Add item...");
    //Create a new list item with the text from the #new-item:
    if (!itemInput.value) return;
    var listItem=createNewitemElement(itemInput.value);

    //Append listItem to incompleteitemHolder
    incompleteitemHolder.appendChild(listItem);
    binditemEvents(listItem, itemCompleted);

    itemInput.value="";

}

//Edit an existing item.

var edititem=function(){
    console.log("Edit item...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".task__button_func_edit");
    var containsClass=listItem.classList.contains("task_editable");
    //If class of the parent is .incompleted-items__item_editable
    if(containsClass){
        console.log('fuf')
        //switch to .incompleted-items__item_editable
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .incomplete-items__item_editable on the parent.
    listItem.classList.toggle("task_editable");
};


//Delete item.
var deleteitem=function(){
    console.log("Delete item...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark item completed
var itemCompleted=function(){
    console.log("Complete item...");

    //Append the item list item to the #completed-items
    var listItem=this.parentNode;
    listItem.className="completed-tasks__item task"
    completeditemsHolder.appendChild(listItem);
    binditemEvents(listItem, itemIncomplete);

}


var itemIncomplete=function(){
    console.log("Incomplete item...");
//Mark item as incomplete.
    //When the checkbox is unchecked
    //Append the item list item to the #incompleteitems.
    var listItem=this.parentNode;
    listItem.className="incompleted-tasks__item task"
    incompleteitemHolder.appendChild(listItem);
    binditemEvents(listItem,itemCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the additem function.
addButton.onclick=additem;
addButton.addEventListener("click",additem);
addButton.addEventListener("click",ajaxRequest);


var binditemEvents=function(itemListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=itemListItem.querySelector("input[type=checkbox]");
    var editButton=itemListItem.querySelector(".task__button_func_edit");
    var deleteButton=itemListItem.querySelector(".task__button_func_delete");


    //Bind edititem to edit button.
    editButton.onclick=edititem;
    //Bind deleteitem to delete button.
    deleteButton.onclick=deleteitem;
    //Bind itemCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteitemHolder ul list items
//for each list item
for (var i=0; i<incompleteitemHolder.children.length;i++){

    //bind events to list items chldren(itemsCompleted)
    binditemEvents(incompleteitemHolder.children[i],itemCompleted);
}




//cycle over completeditemsHolder ul list items
for (var i=0; i<completeditemsHolder.children.length;i++){
    //bind events to list items chldren(itemsIncompleted)
    binditemEvents(completeditemsHolder.children[i],itemIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty items.

//Change edit to save when you are in edit mode.