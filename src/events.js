import modalHelpers from './modal/modalHelpers';
import projectHelpers from './projectHelpers';
import todoHelpers from './todoHelpers';
import { TodoArchieve } from './todo';

const Events = (function () {
  const todoSortBtns = document.getElementsByClassName('left-nav');
  const turnNumber = (str) => {
    return parseInt(str.match(/\d+/)[0]);
  };

  return {
    addProjectsEvent: function () {
      [...document.getElementsByClassName('project')].forEach((project, i, arr) => {
        project.addEventListener('click', () => {
          arr.forEach(p => {
            if (p === project) {
              projectHelpers.activeProject(project);
            } else {
              p.classList.remove('project-active');
            }
          });
        });
      });
    },

    addnavEvents: function (action) {
      [...todoSortBtns].forEach((btn, i) => {
        btn.addEventListener('click', () => {
          switch (i) {
            case 1:
              action(false, 'DATE');
              break;
            case 2:
              action(false, 'PRIORITY');
              break;
            case 3:
              action(false, 'EXPIRED')
              break;
            case 4:
              action(false, 'COMPLETED');
              break;
            case 5:
              action(false, 'INCOMPLETED')
              break;
          }
        })
      });
    },

    todoEvents: function (todos, callback) {
      todos.forEach(todo => {
        todo.addEventListener('click', e => callback(e, todo));
      });

      [...document.getElementsByClassName('todo-delete')].forEach(btn => {
        btn.addEventListener('click', e => todoHelpers.deleteTodo(e.target))
      });
      [...document.getElementsByClassName('todo-complete')].forEach(checkbox => {
        checkbox.addEventListener('change', e => todoHelpers.toggleCompleteTodo(e.target))
      });
      [...document.getElementsByClassName('todo-edit')].forEach(editBtn => {
        editBtn.addEventListener('click', e => todoHelpers.editTodo(e.target))
      });
    },

    addEventToEdit: (todo) => {
      document.getElementById('todo-update').addEventListener('click', () => todoHelpers.getNewData(todo))
    },

    editProjectEvent: function (callback) {
      document.getElementById('edit-project').addEventListener('click', callback);
    },

    addToggleToProgressBar: function () {
      const progressTab = document.getElementById('progress-tab');
      const progress = document.getElementsByClassName('ongoing')[0];
      progressTab.addEventListener('click', () => {
        progress.classList.toggle('hidden');
        if (progressTab.classList.contains('progress-done')) {
          document.getElementById('bar-fill').style.width = `0%`;
          progressTab.querySelector('span').innerText = '';
          progressTab.classList.remove('progress-done')
        }
      });
    },

    startProgressBar: function () {
      const progressTab = document.getElementById('progress-tab');
      const startTodo = document.getElementById('start-todo');
      const progress = document.getElementsByClassName('ongoing')[0];

      startTodo.addEventListener('click', e => {
        const proTab = document.getElementById('progress-tab');
        const todoId = parseInt(e.target.dataset.todo);
        const todo = TodoArchieve.getTodoAt(todoId);
          
        const completitionLoader = {
          receive: (percentage) => {
            document.getElementById('bar-fill').style.width = `${percentage}%`;
          },
          complete: () => {
            todoHelpers.populateTodos(0);
            setTimeout(() => {
              document.getElementById(`${todoId}-todo`).querySelector('input').click();
              proTab.classList.add('progress-done');
            }, 1000)
          }
        }
        todo.startTask(completitionLoader);
        modalHelpers.close();
        progressTab.querySelector('span').innerText = e.target.dataset.title;
        progress.classList.remove('hidden');
      });
    },

    addHideToModal: function () {
      const hideModal = modal.querySelector('#modal-hide');
      hideModal.addEventListener('click', () => {
        modalHelpers.close();
      });
    }, 

    addnewProjectEvent: function (callback) {
      const addProjectBtn = document.getElementById("add-project");
      
      addProjectBtn.addEventListener('click', callback);
    },

    addSubmitProjectEvent: function (callback) {
      const newProjectForm = document.getElementById('project-form');
      
      newProjectForm.addEventListener('submit', e => callback(e));
    },

    addnewTodovent: function (callback) {
      const addTodo = document.getElementById('create-project-todo');
      addTodo.addEventListener('click', callback);
    },

    addSubmitTodoEvent: function (callback) {
      const newTodoForm = document.getElementById('todo-form');

      newTodoForm.addEventListener('submit', (e) => callback(e));
    },

    addOpenProject: function (callback) {
      const projectTitle = document.getElementById('project-title');

      projectTitle.addEventListener('click', callback)
    },

    addDeleteProject: function (callback) {
      const deleteBtn = document.getElementById('project-delete')
      deleteBtn.addEventListener('click', e => callback(e.target));
    },

    addOpenLists: function (btns, callback) {
      [...btns].forEach(btn => {
        btn.addEventListener('click', () => callback(btn));
      });
    },

    addToggleComplete: function (callback) {
      document.getElementById('toggle-completed').addEventListener('click', e => callback(e));
    },

    updateProject: function (callback) {
      document.getElementById('project-update').addEventListener('click', e => callback(e));
    }
  }
})();

export default Events;
