import { ProjectArchive, ProjectFactory } from './project';
import { TodoArchieve, TodoFactory } from './todo';

const Store = (function () {
  let dataToStore = [];
  let todoDataToStore = [];

  const seedProjects = (projects) => {
    projects.forEach(project => {
      ProjectArchive.addProject(project)
    });
  }

  const seedTodos = (todos) => {
    todos.forEach(todo => {
      TodoArchieve.addTodo(todo);
    });
  }

  return {
    parseFromStorage: () => {
      let arr = JSON.parse(localStorage.getItem(ProjectArchive.getStoreName()));
      let todoArr = JSON.parse(localStorage.getItem(TodoArchieve.getStoreName()));

      const result = [];
      const todoResult = [];

      if (arr !== null) {
        arr.map(project => {
          result.push(ProjectFactory(project));
        });
  
        seedProjects(result);
      }

      if (todoArr !== null) {
        todoArr.map(todo => {
          let oo = TodoFactory(todo)
          todoResult.push(oo);
        });
  
        seedTodos(todoResult);
      }

    },

    storeProject: (projectList, storeName) => {
      dataToStore = projectList.map(project => project.getProjectInfo())
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },

    storeTodo: (todoList, storeName) => {
      todoDataToStore = todoList.map(todo => todo.rawTodoInfo());
      localStorage.setItem(storeName, JSON.stringify(todoDataToStore));
    },
//
    removeTodoFrom: (projectId, todoId, storeName) => {
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },

    updateProjects: (storeName) => {
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    }
  }
})();

export default Store;
