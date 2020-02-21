import projectHelpers from './projectHelpers';
import { ProjectArchive, ProjectFactory } from './project';
import { TodoArchieve } from './todo';
import modalHelpers from './modal/modalHelpers';
import todoDetails from './modal/todoDetails';
import Events from './events';

const todoHelpers = (function () {
  const openTodos = (btn, toggle) => {
    let sibling = btn.nextElementSibling;

    if (toggle === 'open') {
      sibling.classList.remove('collapsed');
    } else if (toggle === 'close') {
      sibling.classList.add('collapsed');
    } else {
      sibling.classList.toggle('collapsed');
    }

    if (sibling.classList.contains('collapsed')) {
      btn.querySelector('span').innerText = 'View all';
    } else {
      btn.querySelector('span').innerText = 'Hide';
    }
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

    deleteTodo: (todo) => {
      const todoId = parseInt(todo.dataset.todo);
      projectHelpers.projectAction(parseInt(todo.dataset.project), 'deleteTodo', todoId);
      document.getElementById(`${todoId}-todo`).remove();
    },

    toggleCompleteTodo: (checkbox) => {
      const todoId = parseInt(checkbox.dataset.todo);
      const todo = document.getElementById(`${todoId}-todo`);
      TodoArchieve.getTodoAt(todoId).toggleComplete(checkbox.checked);

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

      Events.todoEvents([...document.getElementsByClassName('todo')]);

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
  }
})();

export default todoHelpers;
