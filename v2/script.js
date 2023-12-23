const taskName = document.querySelector('#taskName');
const btnAdd = document.querySelector('#addTask');
const btnClear = document.querySelector('#clear');
const taskList = document.querySelector('#taskList');
const err = document.querySelector('#err');
let timeOut;

function loadTasksFromLocalStorage() {
    const tasks = loadFromLocalStorage('tasks');
    tasks.forEach(createTask);
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function addToLocalStorage(key, newValue) {
    const existingData = loadFromLocalStorage(key);
    existingData.push(newValue);
    localStorage.setItem(key, JSON.stringify(existingData));
}

function displayErrorMessage(message) {
    const icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    err.innerHTML = icon + message;
    err.style.display = 'block';
    taskName.value = '';
    taskName.focus();

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        err.style.display = 'none';
    }, 3000);
}

function addTask() {
    const inputValue = taskName.value.trim();

    if (inputValue === '') {
        displayErrorMessage('Please enter a task name');
    } else {
        addToLocalStorage('tasks', inputValue);
        taskName.value = '';
        taskName.focus();
        createTask(inputValue);
    }
}

function createTask(taskName) {
    const newLi = document.createElement('li');
    const task = document.createElement('input');
    const btnEdit = createButton('Edit', '<i class="fa-solid fa-pen-to-square"></i>');
    const btnDelete = createButton('Delete', '<i class="fa-solid fa-trash"></i>');
    btnEdit.className = 'btn-edit';
    btnDelete.className = 'btn-delete';

    task.value = taskName;
    task.disabled = true;
    task.spellcheck = false;
    task.type = 'text';
    taskList.appendChild(newLi);
    newLi.append(task, btnEdit, btnDelete);

    btnEdit.addEventListener('click', e => {
        e.preventDefault();
        toggleTaskEditing(task, btnEdit, taskName);
    });

    btnDelete.addEventListener('click', e => {
        e.preventDefault();
        removeTask(taskName, newLi);
    });
}

function createButton(textContent, icon) {
    const button = document.createElement('button');
    button.innerHTML = textContent + icon;
    return button;
}

function toggleTaskEditing(task, btnEdit, taskName) {
    task.disabled = !task.disabled;

    if (!task.disabled) {
        btnEdit.innerHTML = 'Save' + '<i class="fa-solid fa-floppy-disk"></i>';
        task.focus();
    } else {
        btnEdit.innerHTML = 'Edit' + '<i class="fa-solid fa-pen-to-square"></i>';
        updateTaskInLocalStorage(taskName, task.value);
    }
}

function removeTask(taskName, taskElement) {
    let tasks = loadFromLocalStorage('tasks');
    const index = tasks.indexOf(taskName);  

    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskElement.remove();
    }
    
    if (tasks.length === 0) {
        localStorage.removeItem('tasks');
    }
}


function clearTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) {
        displayErrorMessage('No tasks to clear');
    } else {
        if (confirm('Are you sure you want to clear all tasks?')) {
            localStorage.removeItem('tasks');
            taskList.innerHTML = '';
        }
    }
}

function updateTaskInLocalStorage(oldTaskName, newTaskValue) {
    const tasks = loadFromLocalStorage('tasks');
    const index = tasks.indexOf(oldTaskName);
    tasks[index] = newTaskValue;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

btnAdd.addEventListener('click', e => {
    e.preventDefault();
    addTask();
});

btnClear.addEventListener('click', e => {
    e.preventDefault();
    clearTasks();
});

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);