const err = document.querySelector('#error');
const addBtn = document.querySelector('#add');
const taskName = document.querySelector('#taskName');
const clearBtn = document.querySelector('#clear');
const taskList = document.querySelector('#taskList');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (taskName.value.trim(' ') === '') {
        taskName.focus();
        err.style.display = 'block';
        err.innerText = 'Please enter a task name';
        taskName.value = '';
        setInterval(() => {
            err.style.display = 'none';
        }, 3000);
    } else {
        const name = taskName.value;
        const newLi = document.createElement('li');
        const task = document.createElement('input');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const safeBtn = document.createElement('button');
        task.value = name;
        task.disabled = true;
        task.className = 'task';
        newLi.appendChild(task);
        taskList.appendChild(newLi);
        editBtn.innerText = 'Edit';
        editBtn.className = 'edit';
        newLi.appendChild(editBtn);
        deleteBtn.innerText = 'Delete';
        deleteBtn.className = 'delete';
        newLi.appendChild(deleteBtn);
        safeBtn.innerText = 'Save';
        safeBtn.className = 'save';
        newLi.appendChild(safeBtn);

        taskName.value = '';
    }
});

taskList.addEventListener('click', e => {
    e.preventDefault();
    
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('edit')) {
        e.target.previousElementSibling.disabled = false;
        e.target.previousElementSibling.focus();
    }

    if (e.target.classList.contains('save')) {
        document.querySelector('.task').disabled = true;
    }
});

clearBtn.addEventListener('click', e => {
    e.preventDefault();
    if (taskList.innerHTML.trim(' ')  === '') {
        err.style.display = 'block';
        err.innerText = 'There are no tasks to clear';
        setInterval(() => {
            err.style.display = 'none';
        }, 3000);
    } else {
        if (confirm('Are you sure you want to clear all tasks?')) {
            taskList.innerHTML = '';
            taskName.value = '';
            taskName.focus();
        }   
    }
});