function addTask() {
    const task = document.createElement('div');
    task.classList.add("task");

    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('placeholder', 'Enter task name');
    task.appendChild(taskNameInput);

    const taskContent = document.createElement('span');
    taskContent.classList.add("task-content");
    task.appendChild(taskContent);

    const taskButtons = document.createElement('div');
    taskButtons.classList.add("task-buttons");

    const okButton = document.createElement('button');
    okButton.textContent = "OK";
    okButton.addEventListener("click", function() {
        taskContent.textContent = taskNameInput.value;
        task.removeChild(taskNameInput);
        task.removeChild(okButton);
    });
    taskButtons.appendChild(okButton);

    const doingButton = document.createElement('button');
    doingButton.textContent = "Doing";
    doingButton.addEventListener("click", function() {
        task.style.backgroundColor = "rgb(173, 255, 173)"; 
    });
    taskButtons.appendChild(doingButton);

    const doneButton = document.createElement('button');
    doneButton.textContent = "Done";
    doneButton.addEventListener("click", function() {
        task.remove();
    });
    taskButtons.appendChild(doneButton);

    task.appendChild(taskButtons);

    document.querySelector('.list').appendChild(task);
}

document.querySelector('.btn input[type="button"]').addEventListener("click", addTask);
