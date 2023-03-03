// Находим элементы на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

let tasks = [];


if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	// Наполнение массива данными из LocalStorage, если в нём были элементы
	tasks.forEach((task) => renderTask(task));
}


// Добавление задачи на страницу
form.addEventListener('submit', addTask); 

// Удаление функции
taskList.addEventListener('click', deleteTask);

// Отметка выполненной задачи
taskList.addEventListener('click', doneTask);


// Function declaration. Функция может вызвана ещё до того, как будет объявлена
function addTask(event){
	// Отменяем отправку формы
	event.preventDefault();

	// Достаем текст из формы ввода
	const taskText = taskInput.value;

	// Описываем задачу в виде объекта задачи  
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	}

	// Добавляем задачу в массив
	tasks.push(newTask);

	renderTask(newTask);

	// Очищаем поле и возвращаем на него фокус
	taskInput.value = "";
	taskInput.focus(); 

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();
}

function deleteTask(){
	if (event.target.dataset.action !== "delete")return

	const parentNode = event.target.closest('li');

	const id = Number(parentNode.id);

	// Находим индекс в массиве
	// const index = tasks.findIndex((task) => task.id === id);

	// Удаляем из массива
	// tasks.splice(index, 1)

	// Удаляем задачу через фильтрацию массива
	tasks = tasks.filter((task) => task.id !== id);

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();

	parentNode.remove();
	
}

function doneTask(){
	if (event.target.dataset.action !== "done") return

	const parentNode = event.target.closest('li');
	const taskTitle = parentNode.querySelector('span');

	taskTitle.classList.toggle('done');

	const id = Number(parentNode.id);

	// const task = tasks.find(function(task) {
	// 	if (task.id === id) {
	// 		return true
	// 	}
	// });

	const task = tasks.find((task) => task.id === id);

	// Меняем статус выполнения задачи на обратный
	task.done = !task.done;

	// Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage();	
}

function saveToLocalStorage(){
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	// Формирование css класса
	const cssClass = task.done ?  "done" : "";

	// Формируем разметку под новые задачи
	const taskHTML = `<li id="${task.id}"><span class="${cssClass}">${task.text} </span><input type="checkbox" data-action="done"><button data-action="delete">x</button></li>`;

	// Добавляем новую задачу
	taskList.insertAdjacentHTML('beforeend', taskHTML);
}