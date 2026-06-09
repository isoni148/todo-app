const taskList = document.getElementById("taskList");

function addTask() {

    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Enter a task");
        return;
    }
   const li = document.createElement("li");
    li.innerHTML = `
    <span onclick="toggleTask(this)">
        ${input.value}
    </span>

    <div>
        <button onclick="editTask(this)">
            Edit
        </button>

        <button onclick="deleteTask(this)">
            Delete
        </button>
    </div>
`;


    taskList.appendChild(li);

    saveTasks();
    updateTaskCount();

    input.value = "";
}

function deleteTask(button){
    button.closest("li").remove();
    saveTasks();
    updateTaskCount();
}

function toggleTask(task){
    task.classList.toggle("completed");
    saveTasks();
}

function saveTasks(){
    localStorage.setItem(
        "tasks",
        taskList.innerHTML
    );
}

function loadTasks(){
    taskList.innerHTML =
        localStorage.getItem("tasks") || "";

    updateTaskCount();
}

loadTasks();

function updateTaskCount() {
    const count = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").innerText =
        "Total Tasks: " + count;
}

function searchTask(){

    const input =
        document.getElementById("searchInput");

    const filter =
        input.value.toLowerCase();

    const li =
        document.querySelectorAll("#taskList li");

    li.forEach(item => {

        const text =
            item.innerText.toLowerCase();

        if(text.includes(filter)){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });

}

function editTask(button){

    const span =
        button.parentElement.previousElementSibling;

    const updatedTask =
        prompt("Edit Task", span.innerText);

    if(updatedTask !== null &&
       updatedTask.trim() !== ""){

        span.innerText = updatedTask;

        saveTasks();
    }
}
function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}