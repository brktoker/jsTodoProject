// By Burak Toker
//this project is an notation tool that allows us to record the work that needs to be done

//All Element Select
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners() {

    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodo)
    filter.addEventListener("keyup",filterTodo)
    clearButton.addEventListener("click",clearAllTodos)
}

function clearAllTodos(){

    if(confirm("Tümünü silmek istediğinize emin misiniz?")){

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")
    }
}

function deleteTodo(e) {

    //console.log(e.target.parentElement.parentElement.textContent)

    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("warning", `${e.target.parentElement.parentElement.textContent} "silindi"`)
    }
}

function filterTodo(e){

    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase()

        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important")
            
        }
        else{
            listItem.setAttribute("style","display : block")
            

        }
        
    })
}

function deleteTodoFromStorage(deleteTodo) {

    let todos = getTodosFromStorage()

    todos.forEach(function (todo, index) {

        if (todo === deleteTodo) {
            console.log(index)
            todos.splice(index, 1)
        }
        localStorage.setItem("todos", JSON.stringify(todos))
    })
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage()

    todos.forEach(function (todo) {
        addUITodo(todo)
    })

}

function addTodo(e) {

    const newTodo = todoInput.value.trim();// to prevent gaps trim() function

    if (newTodo === "") {

        showAlert("danger", "Lütfen Todo Giriniz")
    }

    else {

        addUITodo(newTodo)
        addTodoToStorage(newTodo)
        showAlert("success", "Todo Ekleme Başarılı")
    }

    e.preventDefault();//page is not refreshed 
}

function getTodosFromStorage() {
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


function addTodoToStorage(newTodo) {

    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos))

}


// alert todo
function showAlert(type, message) {

    const alert = document.createElement("div")

    alert.className = `alert alert-${type}`
    alert.textContent = message
    firstCardBody.appendChild(alert)

    window.setTimeout(function () {
        alert.remove()
    }, 2000)
}

// add UI todo
function addUITodo(newTodo) {


    const listItem = document.createElement("li")
    listItem.className = "list-group-item d-flex justify-content-between"

    const link = document.createElement("a")
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.appendChild(link)
    listItem.appendChild(document.createTextNode(newTodo))
    todoList.appendChild(listItem)
    todoInput.value = ""
}





