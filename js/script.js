'use strict'

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todo'));

const render = function () {
	todoList.innerHTML = '';
	todoCompleted.innerHTML = '';

	todoData.forEach(function(item) {
		const li = document.createElement('li');

		li.classList.add('todo-item');

		li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
		'<div class="todo-buttons">' +
		'<button class="todo-remove">' +
		'<img src="img/garbage.svg" alt="garbage">' +
		'</button>' +
		'<button class="todo-complete">' +
		'<img src="img/check.svg" alt="check">' +
		'</button>' +
		'</div>';

		const doneBtn = li.querySelector('.todo-complete'),
			removeBtn = li.querySelector('.todo-remove');

		if(item.completed) {
			todoCompleted.append(li);

			doneBtn.style.backgroundColor = '#66A000';
		} else {
			todoList.append(li);

			doneBtn.style.backgroundColor = '#34495E';
		}

		doneBtn.addEventListener('click', function() {
			item.completed = !item.completed;

			render();

			localStorage.setItem('todo', JSON.stringify(todoData));
		});

		removeBtn.addEventListener('click', function(e) {
			todoData.splice(item, 1);

			li.remove();

			render();

			localStorage.setItem('todo', JSON.stringify(todoData));
		});
	});
};

todoControl.addEventListener('submit', function(event) {
	event.preventDefault();

	if(headerInput.value.trim(' ') == '') return;

	let headerInputEdit = headerInput.value[0].toUpperCase() + headerInput.value.slice(1);

	const newTodo = {
		text: headerInputEdit.trim(),
		completed: false
	};

	todoData.push(newTodo);

	headerInput.value = '';

	render();

	localStorage.setItem('todo', JSON.stringify(todoData));
});

render();