let inputNewTask = document.querySelector('#task')
let btnAddTask = document.querySelector('#btn-add-task')
let taskList = document.querySelector('#task-list')
let editWindow = document.querySelector('#edit-window')
let editWindowBg = document.querySelector('#edit-window-bg')
let closeBtn = document.querySelector('#close-btn')
let updateTaskBtn = document.querySelector('#update-task')
let editingTask = document.querySelector('#id-editing-task')
let inputTaskNameEdit = document.querySelector('#input-task-name-edit')

inputNewTask.addEventListener('keypress', e => {
  if (inputNewTask.value === "") return;
  if (e.keyCode == 13) {
    let task = {
      name: inputNewTask.value,
      id: idGenerate()
    }
    addTask(task)
  }
})

closeBtn.addEventListener('click', e => {
  alternateEditWindow()
})

btnAddTask.addEventListener('click', e => {
  if (inputNewTask.value === "") return;
  let task = {
    name: inputNewTask.value,
    id: idGenerate()
  }
  addTask(task)
})

updateTaskBtn.addEventListener('click', e => {
  e.preventDefault();
  let idTask = editingTask.innerHTML.replace('#', '')
  let task = {
    name: inputTaskNameEdit.value,
    id: idTask,
  }

  let currentTask = document.getElementById(''+idTask+'')

  if(currentTask) {
    let li = createTagLi(task)
    taskList.replaceChild(li, currentTask)
    alternateEditWindow()
  } else {
    alert('Elemento HTML não encontrado!')
  }
})

function idGenerate() {
  return Math.floor(Math.random() * 3000)
}

function addTask(task) {
  let li = createTagLi(task)
  taskList.appendChild(li)
  inputNewTask.value = ''
}

function createTagLi(task) {
  let li = document.createElement('li')
  li.id = task.id

  let span = document.createElement('span')
  span.classList.add('textTask')
  span.innerHTML = task.name

  let div = document.createElement('div')

  let btnMod = document.createElement('button')
  btnMod.classList.add('btn-edit')
  btnMod.innerHTML = '<ion-icon name="brush-outline"></ion-icon>'
  btnMod.setAttribute('onclick', 'edit(' + task.id + ')')

  let btnDel = document.createElement('button')
  btnDel.classList.add('btn-edit')
  btnDel.innerHTML = '<ion-icon name="trash-outline"></ion-icon>'
  btnDel.setAttribute('onclick', 'del(' + task.id + ')')

  div.appendChild(btnMod)
  div.appendChild(btnDel)

  li.appendChild(span)
  li.appendChild(div)
  return li
}

function edit(idTask) {
  let li = document.getElementById('' + idTask + '')
  if (li) {
    editingTask.innerHTML = '#' + idTask
    inputTaskNameEdit.value = li.innerText;
    alternateEditWindow()
  } else {
    alert('Elemento HTML não encontrado!')
  }
}

function del(idTask) {
  let confirmation = window.confirm(
    'Espero que tenha alcançado o seu objetivo!'
  )
  if (confirmation) {
    let li = document.getElementById('' + idTask + '')
    if (li) {
      taskList.removeChild(li)
    } else {
      alert('Elemento HTML não encontrado!')
    }
  }
}

function alternateEditWindow() {
  editWindow.classList.toggle('active')
  editWindowBg.classList.toggle('active')
}
