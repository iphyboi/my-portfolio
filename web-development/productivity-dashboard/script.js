const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const toggleDarkBtn = document.getElementById('toggle-dark');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    let completedCount = 0;
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if(task.completed) {
            li.style.textDecoration = 'line-through';
            completedCount++;
        }
        const button = document.createElement('div');
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'undo' : 'complet';
        completeBtn.style.marginRight = '5px';
        completeBtn.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveAndRender();
        });
        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);
        li.appendChild(buttons);
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        taskList.appendChild(li);
    });
    totalTasksEl.textContent = tasks.length;
    completedTasksEl.textContent = completedCount;
    pendingTasksEl.textContent = tasks.length - completedCount;
}
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.ariaValueMax.trim();
    if(taskText) {
        tasks.push({ text: taskText, completed: false});
        taskInput.value = '';
        saveAndRender();
    }
});
toggleDarkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
renderTasks();