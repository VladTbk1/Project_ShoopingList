// Elements

const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear-button');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions
const updateUI = () => {
	const itemsAllList = document.querySelectorAll('li');
	if (!itemsAllList.length) {
		itemFilter.style.display = 'none';
		clearButton.style.display = 'none';
	} else {
		itemFilter.style.display = 'block';
		clearButton.style.display = 'block';
	}
};

const filterItems = (e) => {
	const text = e.target.value.toLowerCase();
	const itemsAllList = document.querySelectorAll('li');
	itemsAllList.forEach((e) => {
		const currItemName = e.firstChild.textContent.toLowerCase();
		currItemName.indexOf(text) != -1
			? (e.style.display = 'flex')
			: (e.style.display = 'none');
	});
};

const clearList = () => {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	updateUI();
};

const removeItemFromStorage = (e) => {
	let itemsFromStorage = getItemLocalStorage();
	itemsFromStorage = itemsFromStorage.filter((elem) => elem !== e);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};
const createButton = (classes) => {
	const button = document.createElement('button');
	button.setAttribute('class', classes);
	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.setAttribute('class', classes);
	return icon;
};

const setEditMode = (e) => {
	isEditMode = true;
	e.classList.add('edit-mode');
	formBtn.innerHTML = '<i class ="fa-solid"></i>';
};

const clearItem = (e) => {
	if (itemList.firstChild) {
		e.target.classList.contains('icon-clear') === true
			? confirm('Are you sure?')
				? (e.target.parentElement.parentElement.remove(),
				  removeItemFromStorage(
						e.target.parentElement.parentElement.textContent
				  ),
				  updateUI())
				: null
			: setEditMode(e.target);
	}
};

const addItemDOM = (e) => {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(e));

	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);

	const icon = createIcon('fa-solid fa-xmark icon-clear');
	button.appendChild(icon);
	itemList.appendChild(li);
};

const addItemLocalStorage = (e) => {
	const itemsLocalStorage = getItemLocalStorage();
	itemsLocalStorage.push(e);

	// convert to jeson
	localStorage.setItem('items', JSON.stringify(itemsLocalStorage));
};

const getItemLocalStorage = () => {
	let itemsLocalStorage;
	if (localStorage.getItem('items') === null) {
		itemsLocalStorage = [];
	} else itemsLocalStorage = JSON.parse(localStorage.getItem('items'));

	return itemsLocalStorage;
};

const displayItems = (e) => {
	const itemsLocalStorage = getItemLocalStorage();
	itemsLocalStorage.forEach((e) => addItemDOM(e));
	updateUI();
};

const addItem = (e) => {
	e.preventDefault();
	itemValue = itemInput.value;

	if (itemValue === '') {
		alert('Please add item');
		return;
	}
	// Create DOM element
	addItemDOM(itemValue);
	// Create Local Storage
	addItemLocalStorage(itemValue);
	// Update UI
	updateUI();
};

// Event listiners
const main = () => {
	updateUI();
	itemForm.addEventListener('submit', addItem);
	itemFilter.addEventListener('input', filterItems);
	itemList.addEventListener('click', clearItem);
	clearButton.addEventListener('click', clearList);
	document.addEventListener('DOMContentLoaded', displayItems);
};
main();
