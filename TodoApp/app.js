const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = [];

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodo();
        todoInput.value = '';
    }
};

const updateTodoList = () => {
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = renderTodos(todo, todoIndex);
        todoListUL.append(todoItem);
    });
};

const renderTodos = (todo, todoIndex) => {
    const todoLI = document.createElement("li");
    const todoId = `todo-${todoIndex}`
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="transparent">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todo.text}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="var(--secondary-color)">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
    `
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoLI.querySelector('input');
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoLI;
};

const saveTodo = () => {
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJson);
};

const getTodos = () => {
    const todoJson = localStorage.getItem('todos');
    allTodos = JSON.parse(todoJson);
    updateTodoList();
}
getTodos();

const deleteTodoItem = (todoIndex) => {
    allTodos = allTodos.filter((_, index) => index !== todoIndex);   
    saveTodo();
    updateTodoList();
}