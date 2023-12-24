let tasks = [];
const taskName = document.getElementById('name');
const btnAdd = document.getElementById('add');
const taskList = document.getElementById('taskList');
let selectedTask = null;

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
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    updateLocalStorage();
    removeDOM(index);
}

function removeDOM(index) {
    taskList.removeChild(taskList.children[index]);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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

    //Falta hacer el update

    btnDelete.addEventListener('click', e => {
        e.preventDefault();
        remove(name);
        console.log(tasks);
    });
}

btnAdd.addEventListener('click', e => {
    e.preventDefault();
    add(taskName.value);
    taskName.value = '';
    taskName.focus();
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

document.addEventListener('DOMContentLoaded', loadStorage);