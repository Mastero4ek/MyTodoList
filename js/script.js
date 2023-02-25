'use strict'

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todo')) || [];

const render = function () {
	todoList.innerHTML = '';
	todoCompleted.innerHTML = '';

	todoData.forEach(function(item) {
		const li = document.createElement('li');

		li.classList.add('todo-item');

		li.innerHTML = `<span class="text-todo">${item.text}</span>

						<div class="todo-buttons">
							<button class="todo-remove">
								<img src="img/garbage.svg" alt="garbage">
							</button>

							<button class="todo-complete">
								<img src="img/check.svg" alt="check">
							</button>
						</div>`;

		const todoBtns = li.querySelector('.todo-buttons'),
			doneBtn = li.querySelector('.todo-complete'),
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
			todoData.splice(todoData.indexOf(item), 1);

			render();

			localStorage.setItem('todo', JSON.stringify(todoData));
		});

		li.addEventListener('mouseenter', () => {
			if(todoBtns.classList.contains('.todo-buttons-swipe')) return;

			setTimeout(() => {
				todoBtns.classList.add('todo-buttons-swipe');
			}, 500);

			const timer = setTimeout(() => {
			    todoBtns.classList.add('todo-buttons-swipe');

			    clearTimeout(timer);
			}, 1000);
		});

		li.addEventListener('mouseleave', () => {
			setTimeout(() => {
				todoBtns.classList.remove('todo-buttons-swipe');
			}, 1000);
		});
	});
};

todoControl.addEventListener('submit', function(event) {
	event.preventDefault();

	if(headerInput.value.trim(' ') == '') return;

	let headerInputEdit = headerInput.value[0].toUpperCase() + headerInput.value.slice(1);

	const newTodo = {
		text: '&#8227; ' + headerInputEdit.trim(),
		completed: false
	};

	todoData.push(newTodo);

	headerInput.value = '';

	render();

	localStorage.setItem('todo', JSON.stringify(todoData));
});

render();