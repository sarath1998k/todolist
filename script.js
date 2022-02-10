const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value
           
    if(todo) {
        todoText = todo.text //if todo is not empty
    }

    if(todoText) {                                             //if todoText is not empty
        const todoEl = document.createElement('li')             //li is created
        if(todo && todo.completed) {
            todoEl.classList.add('completed')                //class completed is added to list
        }

        todoEl.innerText = todoText       //li value is altererd entered word is added

        todoEl.addEventListener('click', () => {                    
            todoEl.classList.toggle('completed')               //on left click removes completed from li
            updateLS()                                         //update list
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()                              //on right click

            todoEl.remove()                               //removes the row 
            updateLS()
        }) 

        todosUL.appendChild(todoEl)                    // apend li into ul

        input.value = ''                               //input value reset to 

        updateLS()                       //update list
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')              //select all li

    const todos = []                              //creating cost  todos element

    todosEl.forEach(todoEl => {                        //loop running for all element in todos
        todos.push({
            text: todoEl.innerText,                        
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}