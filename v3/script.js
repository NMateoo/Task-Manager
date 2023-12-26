let tasks = [];
const taskName = document.getElementById('name');
const btnAdd = document.getElementById('add');
const taskList = document.getElementById('taskList');
const err = document.getElementById('errText');
let timeOut;

function loadStorage() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        JSON.parse(localStorage.getItem('tasks')).forEach(e => {
            add(e);
        });
        console.log(`Tasks Array: ${tasks}`);
    }
}

function add(task) {
    tasks.push(task);
    createHTML(task);
}

function remove(task) {
    if (tasks.length === 0) {
        taskList.style.display = 'none';
    } else {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        updateLocalStorage();
        removeDOM(index);
    }
}

function removeDOM(index) {
    taskList.removeChild(taskList.children[index]);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayErr(msg) {
    err.parentNode.style.display = 'flex';
    err.innerText = msg;
    taskName.value = '';
    taskName.focus();

    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
        err.parentNode.style.display = 'none';
    }, 3000);
}

function createHTML(name) {
    const newLi = document.createElement('li');
    const taskInput = document.createElement('input');
    const btnDelete = document.createElement('button');

    taskInput.value = name;
    taskInput.disabled = true;
    taskInput.className = 'taskInput';
    btnDelete.textContent = 'Delete';
    btnDelete.className = 'btnDelete';

    newLi.appendChild(taskInput);
    newLi.appendChild(btnDelete);
    taskList.appendChild(newLi);

    //Falta hacer el update (En proceso)
    newLi.addEventListener('click', e => {
        taskInput.disabled = !taskInput.disabled;
        taskInput.focus();
        let taskCopy = tasks;
        let i = taskCopy.indexOf(name);
        console.log(i + name);
        console.log(taskCopy);

    });

    btnDelete.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        remove(name);
        console.log(tasks);
    });
}

btnAdd.addEventListener('click', e => {
    if (taskName.value.trim() === '') {
        displayErr('Please enter a task');
    } else if (taskName.value.trim().length > 27) {
        displayErr('Task name is too long');
    } else {
        e.preventDefault();
        add(taskName.value);
        taskName.value = '';
        taskName.focus();
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

document.addEventListener('DOMContentLoaded', loadStorage);