document.addEventListener('DOMContentLoaded', () => {
    const taskNameInput = document.getElementById('taskName');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskTimeInput = document.getElementById('taskTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    let tasks = [];

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const taskTime = taskTimeInput.value;

        if (taskName === '' || taskTime === '') {
            alert('Please enter both task name and completion time.');
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            description: taskDescription,
            time: taskTime,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        clearInputs();
    }

    function renderTasks() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <div class="task-details">
                    <strong>${task.name}</strong><br>
                    ${task.description}<br>
                    <em>Complete by: ${task.time}</em>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            const completeBtn = taskItem.querySelector('.complete-btn');
            const editBtn = taskItem.querySelector('.edit-btn');
            const deleteBtn = taskItem.querySelector('.delete-btn');

            completeBtn.addEventListener('click', () => toggleComplete(task.id));
            editBtn.addEventListener('click', () => editTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            if (task.completed) {
                completedTasksList.appendChild(taskItem);
            } else {
                pendingTasksList.appendChild(taskItem);
            }
        });
    }

    function toggleComplete(taskId) {
        tasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            taskNameInput.value = task.name;
            taskDescriptionInput.value = task.description;
            taskTimeInput.value = task.time;
            deleteTask(taskId);
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function clearInputs() {
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskTimeInput.value = '';
    }
});
