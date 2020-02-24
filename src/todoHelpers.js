import projectHelpers from './projectHelpers';
import { ProjectArchive } from './project';
import { TodoArchieve } from './todo';
import modalHelpers from './modal/modalHelpers';
import todoDetails from './modal/todoDetails';
import Events from './events';

const todoHelpers = (function () {
  const turnNumber = (str) => {
    return parseInt(str.match(/\d+/)[0]);
  }

  const toggleComplete = (e) => {
    const todoId = parseInt(e.target.dataset.todo);
    const todo = document.getElementById(`${todoId}-todo`);

    TodoArchieve.getTodoAt(todoId).toggleComplete(true);

    todo.classList.add('checked');
    
    modalHelpers.close();
  }

  const openTodos = (btn, toggle) => {
    const viewTodosBtn = document.getElementById('view-todos');
    let sibling = btn.nextElementSibling;

    if (toggle === 'open') {
      sibling.classList.remove('collapsed');
    } else if (toggle === 'close') {
      sibling.classList.add('collapsed');
    } else {
      sibling.classList.toggle('collapsed');
    }

    if (sibling.classList.contains('collapsed')) {
      viewTodosBtn.querySelector('span').innerText = 'View all';
    } else {
      viewTodosBtn.querySelector('span').innerText = 'Hide';
    }
  };

  const getNewData = (todo) => {
    let updatedTodoInfo = modalHelpers.getTodoUpdates();

    if (['low', 'normal', 'high'].includes(updatedTodoInfo.priority)) {
      updatedTodoInfo.priority = ['low', 'normal', 'high'].indexOf(updatedTodoInfo.priority);
    } else {
      updatedTodoInfo.priority = false;
    }

    if (isNaN(updatedTodoInfo.duration)) {
      updatedTodoInfo.duration = false;
    }

    updatedTodoInfo.date = updatedTodoInfo.date.match(/\b\d\d\d\d\/\d\d\/\d\d\b/);

    if (updatedTodoInfo.date === null) {
      updatedTodoInfo.date = false;
    } else {
      updatedTodoInfo.date = updatedTodoInfo.date[0];
    }

    todo.editTodo(updatedTodoInfo);

    updatedTodoInfo = todo.getTodoInfo();

    todoHelpers.populateTodos(updatedTodoInfo.project);

    todoHelpers.updateNextTodo(updatedTodoInfo);

    modalHelpers.close();
  }

  const getNextTodo = function () {
    const nextTodo = TodoArchieve.todosByNewest(true);
    const nextContainer = document.getElementById('next-task');

    if (nextTodo) {
      const todo = nextTodo.getTodoInfo();
      nextContainer.innerHTML = `<article id="${todo.id}-todo-next" class="todo brief-todo">
      <strong>${todo.title}</strong>
      <time>${todo.time}</time>
      </article>`;
    } else {
      nextContainer.innerHTML = `<article id="" class="no-todo todo brief-todo"><strong></strong><time></time></article>`
    }
  }

  const afterTodoEvent = (e, todo) => {
    if (e.target.classList.contains('todo-delete') || e.target.classList.contains('fas')) return;
    if (e.target.classList.contains('todo-edit') || e.target.classList.contains('far')) return;
    if (e.target.classList.contains('todo-complete')) return;

    const todoId = turnNumber(todo.id);
    const todoInfo = TodoArchieve.getTodoAt(todoId).getTodoInfo();

    modalHelpers.open(todoDetails(todoInfo), todo.id);

    Events.startProgressBar();

    Events.addToggleComplete(toggleComplete);
  }

  return {

    todoElement: function (todo) {
      return `<article id="${todo.id}-todo" data-project="${todo.project}" class="todo ${todo.expired ? 'expired-todo' : ''} ${todo.completed ? 'checked' : ''}">
            <input type="checkbox" ${ todo.completed ? 'checked="true"' : ''} class="todo-complete" data-todo="${todo.id}">
            <div class="todo-date">
                <time datetime="2020-02-14 20:00">${todo.time}</time>
                <time datetime="2020-02-14 20:00">${todo.date}</time>
            </div>
            <h4 class="todo-title">${todo.expired ? '[EXPIRED] ' : ''}${todo.title}</h4>
            <div class="todo-priority todo-${todo.priority}">${todo.priority}</div>
            <button type="button" class="todo-edit add-btn edit-btn" data-todo="${todo.id}"><i class="far fa-edit" data-todo="${todo.id}"></i></button>
            <button type="button" class="todo-delete add-btn delete-btn" data-todo="${todo.id}" data-project="${todo.project}"><i class="fas fa-times" data-todo="${todo.id}" data-project="${todo.project}"></i>
            </button>                 
        </article>`
    },

    getNextTodo: getNextTodo,

    getNewData,

    deleteTodo: (todo) => {
      const todoId = parseInt(todo.dataset.todo);
      projectHelpers.projectAction(parseInt(todo.dataset.project), 'deleteTodo', todoId);
      document.getElementById(`${todoId}-todo`).remove();
    },

    toggleCompleteTodo: (checkbox) => {
      const todoId = parseInt(checkbox.dataset.todo);
      const todo = document.getElementById(`${todoId}-todo`);
      TodoArchieve.getTodoAt(todoId).toggleComplete(checkbox.checked);

      getNextTodo();

      if (checkbox.checked) {
        todo.classList.add('checked');
      } else {
        todo.classList.remove('checked');
      }
    },

    editTodo: (todo) => {
      const editTodoBtn = document.getElementById('edit-todo');
      const todoId = parseInt(todo.dataset.todo);
      const curTodo = TodoArchieve.getTodoAt(todoId);
      const editableTodo = curTodo.getTodoInfo();
      modalHelpers.open(todoDetails(editableTodo, true), null);
      Events.addEventToEdit(curTodo);
    },

    openTodos: openTodos,

    

    populateTodos: (projectId, sortType) => {
      if (ProjectArchive.getCount() === 0) return;

      const openProject = document.getElementsByClassName('main-list')[0];
      const projectTitle = document.getElementById('project-title');
      const containerTodos = document.getElementById('container-todos');
      const viewTodosBtn = document.getElementById('view-todos');
      let todoData;

      if (projectId !== false) {
        todoData = projectHelpers.projectAction(projectId, 'getTodos');
      } else {
        openProject.id = 'all-todos';
        openProject.classList.add('main-all');
        if (sortType === 'DATE') {
          todoData = TodoArchieve.todosByNewest();
          projectTitle.innerText = 'Projects by date'
        } else if (sortType === 'PRIORITY') {
          todoData = TodoArchieve.todosByPriority();
          projectTitle.innerText = 'Projects by priority'
        } else if (sortType === 'COMPLETED') {
          todoData = TodoArchieve.completedTodos();
          projectTitle.innerText = 'Completed projects'
        } else if (sortType === 'INCOMPLETED') {
          todoData = TodoArchieve.incompletedTodos();
          projectTitle.innerText = 'Incompleted projetcs'
        } else if (sortType === 'EXPIRED') {
          todoData = TodoArchieve.expiredTodos();
          projectTitle.innerText = 'Expired projects'
        }
      }

      containerTodos.innerHTML = ``;
      todoData.forEach(t => {
        if (t !== undefined) {
          let todo = t.getTodoInfo();
          containerTodos.innerHTML += todoHelpers.todoElement(todo);
        }
      });

      Events.todoEvents([...document.getElementsByClassName('todo')], afterTodoEvent);

      openTodos(viewTodosBtn, 'open');
    },

    updateNextTodo: (todo) => {
      let nextTodo = document.getElementById(`${todo.id}-todo-next`);

      if (nextTodo) {
        nextTodo.innerHTML = `
      <strong>${todo.title}</strong>
      <time>${todo.time}</time>
      `
      }
    },

    afterTodoEvent,
  }
})();

export default todoHelpers;
