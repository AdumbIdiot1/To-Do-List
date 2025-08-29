function addTask() {
    const task = document.createElement('div')
    task.classList.add("task")

    const taskNameInput = document.createElement('input')
    taskNameInput.type = 'text'
    taskNameInput.placeholder = 'Enter task name'
    task.appendChild(taskNameInput)

    const taskContent = document.createElement('span')
    taskContent.classList.add("task-content")
    task.appendChild(taskContent)

    const taskButtons = document.createElement('div')
    taskButtons.classList.add("task-buttons")

    const okButton = document.createElement('button')
    okButton.textContent = "OK"
    okButton.addEventListener("click", function() {
        const value = taskNameInput.value.trim()
        if (value !== "") {
            taskContent.textContent = value
            taskNameInput.remove()
            okButton.remove()
        }
    })
    taskButtons.appendChild(okButton)

    const doingButton = document.createElement('button')
    doingButton.textContent = "Doing"
    doingButton.addEventListener("click", function() {
        task.classList.toggle("doing")
    })
    taskButtons.appendChild(doingButton)

    const doneButton = document.createElement('button')
    doneButton.textContent = "Done"
    doneButton.addEventListener("click", function() {
        task.classList.add("completed")
        setTimeout(() => task.remove(), 300)
    })
    taskButtons.appendChild(doneButton)

    task.appendChild(taskButtons)
    document.querySelector('.list').appendChild(task)
    taskNameInput.focus()
}

document.querySelector('.btn input[type="button"]').addEventListener("click", addTask)
