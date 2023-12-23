let tasks = [];
const taskName = document.querySelector('#taskName');
const btnAdd = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');

function renderTask() {
    console.log(localStorage.getItem('tasks'));
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const newLi = document.createElement('li');
        newLi.textContent = task;

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.addEventListener('click', e => {
            e.preventDefault();
            console.log('Editar');
        });

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.addEventListener('click', e => {
            e.preventDefault();
            console.log('Borrar');
        });

        newLi.appendChild(btnEdit);
        newLi.appendChild(btnDelete);
        taskList.appendChild(newLi);
    });
}

btnAdd.addEventListener('click', e => {
    e.preventDefault();

    tasks.push(taskName.value);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTask();

    taskName.value = '';
});

renderTask();