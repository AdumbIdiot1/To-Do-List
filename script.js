const TaskManager = {
    tasks: [],
    taskIdCounter: 0,

    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.render();
    },

    setupEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const taskInput = document.getElementById('taskInput');

        addBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    },

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            taskInput.style.borderColor = '#ff4757';
            setTimeout(() => { taskInput.style.borderColor = '#e0e0e0'; }, 1000);
            return;
        }

        const newTask = {
            id: ++this.taskIdCounter,
            text: taskText,
            status: 'pending',
            createdAt: new Date()
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        this.render();

        taskInput.value = '';
        taskInput.focus();
    },

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.render();
    },

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        if (task.status === 'pending') task.status = 'in-progress';
        else if (task.status === 'in-progress') task.status = 'completed';
        else task.status = 'pending';

        this.saveTasks();
        this.render();
    },

    saveTasks() {
        this.updateCounter();
    },

    loadTasks() {
        this.tasks = [];
    },

    updateCounter() {
        const counter = document.getElementById('taskCounter');
        if (!this.tasks.length) {
            counter.style.display = 'none';
            return;
        }
        counter.style.display = 'block';
        document.getElementById('totalTasks').textContent = this.tasks.length;
        document.getElementById('pendingTasks').textContent = this.tasks.filter(t => t.status === 'pending').length;
        document.getElementById('inProgressTasks').textContent = this.tasks.filter(t => t.status === 'in-progress').length;
        document.getElementById('completedTasks').textContent = this.tasks.filter(t => t.status === 'completed').length;
    },

    render() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = '✨ No tasks yet! Add one above to get started.';
            taskList.appendChild(emptyState);
            return;
        }

        this.tasks.forEach(task => {
            taskList.appendChild(this.createTaskElement(task));
        });

        this.updateCounter();
    },

    createTaskElement(task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.dataset.taskId = task.id;

        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';
        if (task.status === 'completed') checkbox.classList.add('checked');
        checkbox.addEventListener('click', () => this.toggleTaskStatus(task.id));

        const taskText = document.createElement('div');
        taskText.className = 'task-text';
        if (task.status === 'completed') taskText.classList.add('completed');
        taskText.textContent = task.text;

        const statusBadge = document.createElement('div');
        statusBadge.className = 'task-status';
        if (task.status === 'pending') { statusBadge.classList.add('status-pending'); statusBadge.textContent = 'Pending'; }
        else if (task.status === 'in-progress') { statusBadge.classList.add('status-in-progress'); statusBadge.textContent = 'In Progress'; }
        else { statusBadge.classList.add('status-completed'); statusBadge.textContent = 'Completed'; }

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(statusBadge);
        taskItem.appendChild(deleteBtn);

        return taskItem;
    }
};

document.addEventListener('DOMContentLoaded', () => TaskManager.init());
