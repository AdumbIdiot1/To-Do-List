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
        taskInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') this.addTask();
        });
    },
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();
        if (!taskText) {
            taskInput.style.borderColor = '#ff4757';
            setTimeout(() => taskInput.style.borderColor = '#e0e0e0', 1000);
            return;
        }
        const newTask = {id: ++this.taskIdCounter, text: taskText, status: 'pending', createdAt: new Date()};
        this.tasks.unshift(newTask);
        this.saveTasks();
        this.render();
        taskInput.value = '';
        taskInput.focus();
    },
    deleteTask(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this.saveTasks();
                this.render();
            }, 300);
        }
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
    saveTasks() {this.updateCounter();},
    loadTasks() {this.tasks = [];},
    updateCounter() {
        const counter = document.getElementById('taskCounter');
        if (!this.tasks.length) {counter.style.display='none'; return;}
        counter.style.display='block';
        document.getElementById('totalTasks').textContent = this.tasks.length;
        document.getElementById('pendingTasks').textContent = this.tasks.filter(t=>t.status==='pending').length;
        document.getElementById('inProgressTasks').textContent = this.tasks.filter(t=>t.status==='in-progress').length;
        document.getElementById('completedTasks').textContent = this.tasks.filter(t=>t.status==='completed').length;
    },
    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        taskList.innerHTML = '';
        if (!this.tasks.length) taskList.appendChild(emptyState);
        else this.tasks.forEach(task => taskList.appendChild(this.createTaskElement
