import modalHelpers from './modal/modalHelpers';

const Events = (function archieve() {
  const todoSortBtns = document.getElementsByClassName('left-nav');

  return {
    addProjectsEvent(callback) {
      [...document.getElementsByClassName('project')].forEach((project, i, arr) => {
        project.addEventListener('click', () => {
          arr.forEach((p) => {
            callback(p, project);
          });
        });
      });
    },

    addnavEvents(action) {
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
              action(false, 'EXPIRED');
              break;
            case 4:
              action(false, 'COMPLETED');
              break;
            case 5:
              action(false, 'INCOMPLETED');
              break;
            default:
              action(false, 'DATE');
              break;
          }
        });
      });
    },

    todoEvents(todos, callback, callback2, callback3, callback4) {
      todos.forEach((todo) => {
        todo.addEventListener('click', (e) => callback(e, todo));
      });

      [...document.getElementsByClassName('todo-delete')].forEach((btn) => {
        btn.addEventListener('click', (e) => callback2(e.target));
      });
      [...document.getElementsByClassName('todo-complete')].forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => callback3(e.target));
      });
      [...document.getElementsByClassName('todo-edit')].forEach((editBtn) => {
        editBtn.addEventListener('click', (e) => callback4(e.target));
      });
    },

    addEventToEdit: (todo, callback) => {
      document.getElementById('todo-update').addEventListener('click', () => callback(todo));
    },

    editProjectEvent(callback) {
      document.getElementById('edit-project').addEventListener('click', callback);
    },

    addToggleToProgressBar() {
      const progressTab = document.getElementById('progress-tab');
      const progress = document.getElementsByClassName('ongoing')[0];
      progressTab.addEventListener('click', () => {
        progress.classList.toggle('hidden');
        if (progressTab.classList.contains('progress-done')) {
          document.getElementById('bar-fill').style.width = '0%';
          progressTab.querySelector('span').innerText = '';
          progressTab.classList.remove('progress-done');
        }
      });
    },

    startProgressBar(callback) {
      const startTodo = document.getElementById('start-todo');

      if (!startTodo || startTodo === null) return;

      startTodo.addEventListener('click', (e) => callback(e));
    },

    addHideToModal() {
      const modal = document.getElementById('modal');
      const hideModal = modal.querySelector('#modal-hide');
      hideModal.addEventListener('click', () => {
        modalHelpers.close();
      });
    },

    addnewProjectEvent(callback) {
      const addProjectBtn = document.getElementById('add-project');

      addProjectBtn.addEventListener('click', callback);
    },

    addSubmitProjectEvent(callback) {
      const newProjectForm = document.getElementById('project-form');

      newProjectForm.addEventListener('submit', (e) => callback(e));
    },

    addnewTodovent(callback) {
      const addTodo = document.getElementById('create-project-todo');
      addTodo.addEventListener('click', callback);
    },

    addSubmitTodoEvent(callback) {
      const newTodoForm = document.getElementById('todo-form');

      newTodoForm.addEventListener('submit', (e) => callback(e));
    },

    addOpenProject(callback) {
      const projectTitle = document.getElementById('project-title');

      projectTitle.addEventListener('click', callback);
    },

    addDeleteProject(callback) {
      const deleteBtn = document.getElementById('project-delete');
      deleteBtn.addEventListener('click', (e) => callback(e.target));
    },

    addOpenLists(btns, callback) {
      [...btns].forEach((btn) => {
        btn.addEventListener('click', () => callback(btn));
      });
    },

    addToggleComplete(callback) {
      document.getElementById('toggle-completed').addEventListener('click', (e) => callback(e));
    },

    updateProject(callback) {
      document.getElementById('project-update').addEventListener('click', (e) => callback(e));
    },
  };
}());

export default Events;
