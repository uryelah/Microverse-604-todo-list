import { TodoArchieve } from './todo';
import modalHelpers from './modal/modalHelpers';
import projectHelpers from './projectHelpers';
import todoHelpers from './todoHelpers';
import todoDetails from './modal/todoDetails';

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

    todoEvents: function (todos) {
      todos.forEach(todo => {
        todo.addEventListener('click', e => {
          if (e.target.classList.contains('todo-delete') || e.target.classList.contains('fas')) return;
          if (e.target.classList.contains('todo-edit') || e.target.classList.contains('far')) return;
          if (e.target.classList.contains('todo-complete')) return;
  
          const todoId = turnNumber(todo.id);
          const todoInfo = TodoArchieve.getTodoAt(todoId).getTodoInfo();
  
          modalHelpers.open(todoDetails(todoInfo), todo.id);

          document.getElementById('toggle-completed').addEventListener('click', e => {
            const todoId = parseInt(e.target.dataset.todo);
            const todo = document.getElementById(`${todoId}-todo`);

            TodoArchieve.getTodoAt(todoId).toggleComplete(true);
    
            todo.classList.add('checked');
           });
        });
      });
      
      [...document.getElementsByClassName('todo-delete')].forEach(btn => {
        btn.addEventListener('click', e => todoHelpers.deleteTodo(e.target) )
      });
      [...document.getElementsByClassName('todo-complete')].forEach(checkbox => {
        checkbox.addEventListener('change', e => todoHelpers.toggleCompleteTodo(e.target))
      });
      [...document.getElementsByClassName('todo-edit')].forEach(editBtn => {
        editBtn.addEventListener('click', e => todoHelpers.editTodo(e.target))
      });
    },

    addEventToEdit: (todo) => {
      document.getElementById('todo-update').addEventListener('click', () => {
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
      })
    }
  }
})();

export default Events;
