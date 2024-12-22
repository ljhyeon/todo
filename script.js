// 요소 선택
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const filterAllButton = document.getElementById('filter-all');
const filterActiveButton = document.getElementById('filter-active');
const filterCompletedButton = document.getElementById('filter-completed');

// 새로운 할 일 추가
function addTodo(task, isCompleted = false) {
    // li 요소 생성
    const listItem = document.createElement("li");

    // 텍스트 노드 추가
    listItem.textContent = task;

    if (isCompleted) {
        listItem.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = "Complete";
    completeButton.classList.add('complete-btn');

    completeButton.addEventListener('click', ()=> {
        listItem.classList.toggle('completed');
        saveTodos();
    });

    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // 삭제 버튼 클릭 이벤트 추가
    deleteButton.addEventListener("click", () => {
        todoList.removeChild(listItem);
        saveTodos(); // 삭제 후 저장
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    // 입력 필드 비우기
    todoInput.value = ""; // 입력 필드 초기화
    saveTodos(); // 할 일 추가 후 저장
}

// 데이터 저장
function saveTodos() {
    const tasks = [];
    todoList.querySelectorAll("li").forEach((item) => {
        tasks.push({
            task: item.textContent.replace("CompleteDelete", "").trim(),
            isCompleted: item.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(tasks));
}

// 초기 데이터 로드
function loadTodos() {
    const tasks = JSON.parse(localStorage.getItem("todos") || "[]");
    tasks.forEach((task) => {
        addTodo(task.task, task.isCompleted);
    });
}

// 필터링
function filterTodos(filter) {
    const allTodos = todoList.querySelectorAll("li");
    allTodos.forEach((todo) => {
        switch(filter) {
            case "all":
                todo.style.display = "flex";
                break;
            case "active":
                todo.style.display = todo.classList.contains("completed") ? "none" : "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

// 이벤트 리스너 추가
addButton.addEventListener("click", ()=> {
    const task = todoInput.value.trim();
    if (task !== "") {
        addTodo(task);
        saveTodos();
        todoInput.value = "";
    }
});

// Enter 키로도 추가
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const task = todoInput.value.trim();
        if (task !== "") {
            addTodo(task);
            saveTodos();
            todoInput.value = "";
        }
    }
});

filterAllButton.addEventListener("click", () => filterTodos("all"));
filterActiveButton.addEventListener("click", () => filterTodos("active"));
filterCompletedButton.addEventListener("click", () => filterTodos("completed"));

// 페이지 로드 시 초기 데이터 불러오기
window.addEventListener("DOMContentLoaded", loadTodos);
