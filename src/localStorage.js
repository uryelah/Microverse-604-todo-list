import modalHelpers from './modal/modalHelpers';
import signupForm from './modal/signupForm';

const Store = (function storage() {
  let dataToStore = [];
  let todoDataToStore = [];

  const seedProjects = (projects, archieve) => {
    projects.forEach((project) => {
      archieve.addProject(project);
    });
  };

  const seedTodos = (todos, archieve) => {
    todos.forEach((todo) => {
      archieve.addTodo(todo);
    });
  };

  return {
    setUser: () => {
      const user = localStorage.getItem('username');
      if (!user) {
        modalHelpers.open(signupForm, 'user');
        const userForm = document.getElementById('user-form');
        const userInput = document.getElementById('username-input');
        const userName = document.getElementById('user-name');
        userForm.addEventListener('submit', (e) => {
          localStorage.setItem('username', userInput.value);
          userName.innerText = userInput.value;
          modalHelpers.close();
          e.preventDefault();
        });
      }
    },

    getUser: () => localStorage.getItem('username'),

    hasProject: (archieve) => {
      const retrived = JSON.parse(localStorage.getItem(archieve.getStoreName()));
      return retrived !== null && retrived.length > 0;
    },

    parseFromStorage: (factory, todoArchieve, projectArchieve, projectFactory) => {
      const arr = JSON.parse(localStorage.getItem(projectArchieve.getStoreName()));
      const todoArr = JSON.parse(localStorage.getItem(todoArchieve.getStoreName()));

      const result = [];
      const todoResult = [];

      if (arr !== null) {
        arr.map((project) => {
          result.push(projectFactory(project));
          return project;
        });

        seedProjects(result, projectArchieve);
      }

      if (todoArr !== null) {
        todoArr.map((todo) => {
          const oo = factory(todo);
          todoResult.push(oo);
          return todo;
        });

        seedTodos(todoResult, todoArchieve, projectArchieve);
      }
    },

    storeProject: (projectList, storeName) => {
      dataToStore = Object.values(projectList).map(project => project.getProjectInfo());
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },

    removeProject: (projectId, storeName) => {
      dataToStore.splice(projectId, 1);
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },

    storeTodo: (todoList, storeName) => {
      todoDataToStore = todoList.map(todo => todo.rawTodoInfo());
      localStorage.setItem(storeName, JSON.stringify(todoDataToStore));
    },

    removeTodos: (todoList) => {
      todoList.forEach((todo) => {
        delete todoDataToStore[todo];
      });
      todoDataToStore = todoDataToStore.filter(todo => todo !== null);
      localStorage.setItem('todo-storage', JSON.stringify(todoDataToStore));
    },

    updateTodo: (todoId, todoData) => {
      todoDataToStore[todoId] = todoData;
    },

    updateTodos: (storeName) => {
      localStorage.setItem(storeName, JSON.stringify(todoDataToStore));
    },

    removeTodoFrom: (projectId, todoId, storeName) => {
      todoDataToStore.splice(todoId, 1);
      localStorage.setItem('todo-storage', JSON.stringify(todoDataToStore));
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },

    updateProject: (projectId, projectData) => {
      dataToStore[projectId] = projectData;
    },

    updateProjects: (storeName) => {
      localStorage.setItem(storeName, JSON.stringify(dataToStore));
    },
  };
}());

export default Store;
