const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEL = document.createElement('li')
        if (todo && todo.completed) {
            todoEL.classList.add('completed')
        }
        todoEL.innerText = todoText


        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-check')
        todoEL.appendChild(checkIcon)

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid', 'fa-xmark')
        todoEL.appendChild(closeIcon)

        checkIcon.addEventListener('click', () => {
            todoEL.classList.toggle('completed')
            updateLS()
        })

        closeIcon.addEventListener('click', () => {
            todoEL.remove()
            updateLS()
        })

        todosUL.appendChild(todoEL)
        input.value = ''
        updateLS()
    }
}

function updateLS() {
    todosEL = document.querySelectorAll('li')

    const todos = []

    todosEL.forEach(todoEL => todos.push({
        text: todoEL.innerText,
        completed: todoEL.classList.contains('completed')
    }))

    localStorage.setItem('todos', JSON.stringify(todos))
}




