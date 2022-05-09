const ul = document.querySelector('body ul');
const input = document.getElementById('add-input');
function generate(item, container) {
    const div = document.createElement('div');
    const element = item;
    const li = document.createElement('li');
    container.appendChild(li);
    const input = document.createElement('input');
    li.appendChild(div);
    input.setAttribute('type', 'checkbox');
    const label = document.createElement('label');
    div.appendChild(label);
    div.appendChild(input);
    input.addEventListener('change', taskStatus);
    // text editable input-- task text
    const taskDescription = document.createElement('input');
    taskDescription.value = element.description;
    div.appendChild(taskDescription);
    taskDescription.classList.add('taskDescription');
    // div.innerHTML += element.description;
    const dotIcon = document.createElement('img');
    dotIcon.setAttribute('src', './assets/images/dot.png');
    dotIcon.classList.add('dotIcon');
    li.appendChild(dotIcon);
    li.classList.add(`index${element.index}`);
    li.addEventListener('click', editingTask);
  }
  
  const generateItems = (tasksList, ul) => {
    for (let j = 0; j < tasksList.length; j += 1) {
      if (tasksList[j].index >= document.getElementsByClassName('taskDescription').length) {
        generate(tasksList[j], ul);
      }
    }
  };
function finishEditing(event) {
    const selectedElementClass = `.${event.currentTarget.parentNode.parentNode.classList[0]}`;
    const elementLi = document.querySelector(selectedElementClass);
    const elementInput = event.currentTarget;
    elementLi.classList.remove('editing-background');
    elementInput.classList.remove('editing-background');
    elementInput.addEventListener('input', modifyTask(elementInput.value, selectedElementClass));
    const icon = document.querySelector(`${selectedElementClass} > img`);
    icon.setAttribute('src', './assets/images/dot.png');
  }
  
  function editingTask(event) {
    document.querySelectorAll('.editing-background').forEach((element) => {
      element.classList.remove('editing-background');
    });
    const elementLi = event.currentTarget;
    const elementInput = event.currentTarget.firstElementChild.lastElementChild;
    elementInput.addEventListener('blur', finishEditing);
    elementLi.classList.add('editing-background');
    elementInput.classList.add('editing-background');
    const icon = document.querySelector('.editing-background > img');
    icon.setAttribute('src', './assets/images/trash-can.png');
    const p = event.currentTarget;
    icon.addEventListener('click', () => {
      const list = JSON.parse(localStorage.getItem('Tasks'));
      const newlist = [];
      list.forEach((element) => {
        if (element.index !== Number(p.classList[0].slice(5))) {
          newlist.push(element);
        }
      });
      let newindex = 0;
      elementLi.remove();
      newlist.forEach((element) => {
        element.index = newindex;
        newindex += 1;
      });
      localStorage.setItem('Tasks', JSON.stringify(newlist));
    });
  }
const button = document.getElementById('button-container');
const butonHandler = button.addEventListener('click', () => {
  const list = JSON.parse(localStorage.getItem('Tasks'));
  const result = list.filter((element) => element.completed !== true);
  localStorage.setItem('Tasks', JSON.stringify(result));
});

const addTask = (e) => {
    if (e.keyCode === 13) {
      const list = JSON.parse(localStorage.getItem('Tasks'));
      const item = {
        description: input.value,
        completed: false,
        index: list.length,
      };
      input.value = '';
      list.push(item);
      generateItems(list, ul);
      updateLocalStorage(list);
    }
  };
  function updateLocalStorage(tL = tasksList) {
    localStorage.setItem('Tasks', JSON.stringify(tL));
  }
  
  function updateAppStorage() {
    const items = JSON.parse(localStorage.getItem('Tasks'));
    items.forEach((element) => {
      tasksList.push(element);
    });
  }
  
  function initStorage() {
    if (localStorage.getItem('Tasks') === null) {
      localStorage.setItem('Tasks', JSON.stringify(tasksList));
      return;
    }// Print/load local storage.
    updateAppStorage();
    generateItems(JSON.parse(localStorage.getItem('Tasks')), ul);
  }
  function modifyTask(newdescription, index /* completed = false */) {
    index = index[index.length - 1];
    const list = JSON.parse(localStorage.getItem('Tasks'));
    list.forEach((element) => {
      if (String(element.index) === index) {
        element.description = newdescription;
        element.index = toNumber(index);
      }
    });
    localStorage.setItem('Tasks', JSON.stringify(list));
  }
  const tasksList = [
];
function taskStatus(event) {
    const list = JSON.parse(localStorage.getItem('Tasks'));
    const taskChecked = Number(event.currentTarget.parentNode.parentNode.classList[0].slice(5));
    if (!list[taskChecked].completed) {
      event.currentTarget.parentNode.parentNode.firstChild.lastChild.style.textDecoration = 'line-through';
    } else {
      event.currentTarget.parentNode.parentNode.firstChild.lastChild.style.textDecoration = 'none';
    }
    list.forEach((element) => {
      if (event.currentTarget.nodeType === 1) {
        if (element.index === taskChecked) {
          element.completed = !element.completed;
        }
      }
    });
    localStorage.setItem('Tasks', JSON.stringify(list));
    document.querySelectorAll('.editing-background').forEach((element) => {
      element.classList.remove('editing-background');
    });
  }
  const userActionHandler = () => {
    input.addEventListener('keypress', addTask);
  };
  

butonHandler;
userActionHandler();
window.addEventListener('load', initStorage);
window.addEventListener('load', taskStatus);
// end