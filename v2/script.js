const taskName = document.querySelector('#taskName');
const btnAdd = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');
const err = document.querySelector('#err');

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
    err.textContent = message;
    err.style.display = 'block';
    taskName.value = '';
    taskName.focus();

    setTimeout(() => {
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
    const btnEdit = createButton('Edit');
    const btnDelete = createButton('Delete');
    btnEdit.className = 'btn-edit';
    btnDelete.className = 'btn-delete';

    task.value = taskName;
    task.disabled = true;
    task.spellcheck = false;
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

function createButton(textContent) {
    const button = document.createElement('button');
    button.textContent = textContent;
    return button;
}

function toggleTaskEditing(task, btnEdit, taskName) {
    task.disabled = !task.disabled;

    if (!task.disabled) {
        btnEdit.textContent = 'Save';
        task.focus();
    } else {
        btnEdit.textContent = 'Edit';
        updateTaskInLocalStorage(taskName, task.value);
    }
}

function removeTask(taskName, taskElement) {
    const tasks = loadFromLocalStorage('tasks');
    const index = tasks.indexOf(taskName);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskElement.remove();
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

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);