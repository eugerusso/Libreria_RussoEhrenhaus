//Select elements
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");

//vars
let todos =[]; 
let EditTodoId= -1;

//Form submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("submit")

    saveTodo();
    renderTodos();
})

//SAVE TO DO 

function saveTodo(){
    const todoValue = todoInput.value;

    //check if the todo is empty
    const isEmpty= todoValue === '';

    //check for duplicate
    const isDuplicate = todos.some((todo)=> todo.value.toUpperCase() == todoValue.toUpperCase());
    if(isEmpty){
        alert ('che, está vacio');
    }else if(isDuplicate){
        alert ('está repetido')
    }else{
        if(EditTodoId >= 0){
            todos = todos.map((todo,index) =>({
                ...todo,
                value: index=== EditTodoId ? todoValue : todo.value,                
            }));
            EditTodoId = -1;
        }else{
            todos.push({
                value: todoValue,
                checked: false,
                color: '#' + Math.floor(Math.random()*16777215).toString(16),
            });
        }
        
        todoInput.value= ""
    }
    
}

//RENDER TO DO 

function renderTodos(){
    //CLEAR ELEMENT BEFORE RENDER
    todosListEl.innerHTML= "";

    //RENDER TODOS
    todos.forEach((todo,index) =>{
        todosListEl.innerHTML += `
        <div class="todo" id=${index}>
                <i class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}""
                style = "color : ${todo.color}"
                data-action="check"
                ></i>
                <p class="" data-action="check">${todo.value}</p>
                <i class="bi bi-pencil-square" data-action="edit"></i>
                <i class="bi bi-trash" data-action="delete"></i>
            </div>`
    })
}

//CLICK EVENT LISTENER FOR ALL THE TODOS

todosListEl.addEventListener("click", (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== "todo")return;

    //todo id
    const todo= parentElement;
    const todoId= Number(todo.id);

    //target action
    const action= target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId); 

})

//CHECK A TO DO 

function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos();
}

//EDIT A TO DO

function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//DELETE A TO DO 

function deleteTodo(todoId){
    todos = todos.filter( (todo,index) => index !== todoId);
    EditTodoId = -1;

    //re-render
    renderTodos();
}

//toastify con el botón add 
const btn = document.querySelector("#btn");
btn.addEventListener('click', () => {   
    Toastify({
        text: "Tarea agregada",
        duration: 3000,
        gravity: "top",
        position:"right",
        style: {
            background: "#1397cc"
        }
    }).showToast();
})
