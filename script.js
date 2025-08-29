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
        const text = taskInput.value.trim();
        if (!text) {
            taskInput.style.borderColor = '#ff4757';
            setTimeout(() => taskInput.style.borderColor = '#e0e0e0', 1000);
            return;
        }
        const newTask = {id: ++this.taskIdCounter, text: text, status: 'pending', createdAt: new Date()};
        this.tasks.unshift(newTask);
        this.saveTasks();
        this.render();
        taskInput.value = '';
        taskInput.focus();
    },
    deleteTask(id) {
        const taskEl = document.querySelector(`[data-task-id="${id}"]`);
        if (taskEl) taskEl.classList.add('removing');
        setTimeout(() => {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
        }, 300);
    },
    toggleTaskStatus(id) {
        const task = this.tasks.find(t => t.id === id);
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
        if (!this.tasks.length) { counter.style.display = 'none'; return; }
        counter.style.display = 'block';
        document.getElementById('totalTasks').textContent = this.tasks.length;
        document.getElementById('pendingTasks').textContent = this.tasks.filter(t => t.status === 'pending').length;
        document.getElementById('inProgressTasks').textContent = this.tasks.filter(t => t.status === 'in-progress').length;
        document.getElementById('completedTasks').textContent = this.tasks.filter(t => t.status === 'completed').length;
    },
    render() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        if (!this.tasks.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = '✨ No tasks yet! Add one above to get started.';
            taskList.appendChild(empty);
        } else {
            this.tasks.forEach(task => taskList.appendChild(this.createTaskElement(task)));
        }
        this.updateCounter();
    },
    createTaskElement(task) {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.dataset.taskId = task.id;
        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';
        if (task.status === 'completed') checkbox.classList.add('checked');
        checkbox.addEventListener('click', () => this.toggleTaskStatus(task.id));
        const text = document.createElement('div');
        text.className = 'task-text';
        if (task.status === 'completed') text.classList.add('completed');
        text.textContent = task.text;
        const status = document.createElement('div');
        status.className = 'task-status';
        if (task.status === 'pending') {status.classList.add('status-pending'); status.textContent = 'Pending';}
        else if (task.status === 'in-progress') {status.classList.add('status-in-progress'); status.textContent = 'In Progress';}
        else {status.classList.add('status-completed'); status.textContent = 'Completed';}
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => this.deleteTask(task.id));
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(status);
        item.appendChild(delBtn);
        return item;
    }
};
document.addEventListener('DOMContentLoaded', () => TaskManager.init());
