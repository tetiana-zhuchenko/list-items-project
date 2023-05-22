require('../css/reset.css');
require('../css/root.css');
require('../css/items-list.css');
require('../css/header.css');
require('../css/add-items.css');
require('../css/pink-gradient.css');

const itemContainer = document.querySelector('[data-items]');
const newItemsForm = document.querySelector('[data-new-item-form]');
const newItemInput = document.querySelector('[data-new-item-input]');
const serchInput = document.querySelector('[data-search]');
const searchInput = document.querySelector('[data-search-input]');
const LOCAL_STORAGE_ITEM_KEY = 'task.itemsList';
let itemsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_KEY)) || [];
console.log(itemsList);

// add item
newItemsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemName = newItemInput.value;
  if (itemName === null || itemName === '') {
    alert('Please add the item');
    return;
  }
  const item = createListItem(itemName);
  newItemInput.value = null;
  itemsList.push(item);
  saveAndRender();
});

function createListItem(name) {
  return { id: Date.now().toString(), name: name };
}

function saveAndRender() {
  save();
  render(itemsList);
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, JSON.stringify(itemsList));
}

function render(itemsList) {
  clearElement(itemContainer);

  itemsList.forEach((item) => {
    const itemElement = document.createElement('li');
    itemElement.classList.add('item');
    itemElement.innerHTML = `<p class="item-content">${item.name}</p>
  <button class="delete-btn pink-gradient" >Delete</button>`;
    itemContainer.appendChild(itemElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render(itemsList);

// delete item
itemContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    itemsList = itemsList.filter(
      (item) => item.name !== e.target.previousElementSibling.innerHTML
    );
  }
  saveAndRender();
});

// search item
// listener for input
serchInput.addEventListener('input', (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);

  const tempItemsList = filteredListForSearch(searchValue);

  render(tempItemsList);
});

// listener for submit
serchInput.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchValue = searchInput.value;
  const tempItemsList = filteredListForSearch(searchValue);

  render(tempItemsList);
});

function filteredListForSearch(value) {
  return itemsList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
}
