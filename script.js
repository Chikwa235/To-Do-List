const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    window.onload = function () {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => displayTask(task.text, task.timestamp, task.completed));
      if (localStorage.getItem("theme") === 'dark') {
        document.body.classList.add("dark");
      }
    };

    function toggleTheme() {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? 'dark' : 'light');
    }

    function addTask() {
      const taskText = taskInput.value.trim();
      if (!taskText) return;

      const timestamp = new Date().toLocaleString();
      displayTask(taskText, timestamp);

      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.push({ text: taskText, timestamp, completed: false });
      localStorage.setItem("tasks", JSON.stringify(savedTasks));

      taskInput.value = "";
    }

    function displayTask(text, timestamp, completed = false) {
      const li = document.createElement("li");
      if (completed) li.classList.add("completed");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("task-info");

      const taskSpan = document.createElement("div");
      taskSpan.classList.add("task-text");
      taskSpan.textContent = text;

      const timeSpan = document.createElement("div");
      timeSpan.classList.add("timestamp");
      timeSpan.textContent = `Added: ${timestamp}`;

      infoDiv.appendChild(taskSpan);
      infoDiv.appendChild(timeSpan);

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const completeBtn = document.createElement("button");
      completeBtn.innerHTML = "✅";
      completeBtn.onclick = () => toggleComplete(text, timestamp, li);

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.onclick = () => editTask(text, timestamp);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.onclick = () => deleteTask(text, timestamp, li);

      actions.appendChild(completeBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(infoDiv);
      li.appendChild(actions);
      taskList.appendChild(li);
    }

    function toggleComplete(text, timestamp, element) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map(task => {
        if (task.text === text && task.timestamp === timestamp) {
          task.completed = !task.completed;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      element.classList.toggle("completed");
    }

    function editTask(text, timestamp) {
      const newTask = prompt("Edit your task:", text);
      if (!newTask) return;

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map(task => {
        if (task.text === text && task.timestamp === timestamp) {
          task.text = newTask;
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      location.reload();
    }

    function deleteTask(text, timestamp, element) {
      taskList.removeChild(element);
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter(task => !(task.text === text && task.timestamp === timestamp));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }