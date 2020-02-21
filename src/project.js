import { TodoFactory, TodoArchieve } from './todo';
import { Projects } from './projectArchive';

const ProjectArchive = Projects();

const ProjectFactory = (factoryObject) => {
  let { storedId, title, description, todos = [], creator, archieve = ProjectArchive } = factoryObject;

  let id = typeof storedId === 'number' ? storedId : archieve.getId();

  const getId = () => id;

  const getTitle = () => title;

  const addTodo = (object) => {
    object.project = id;
    const newTodo = TodoFactory(object);
    todos.push(newTodo.getId());
    TodoArchieve.addTodo(newTodo);
    return newTodo;
  }

  const deleteTodo = (todoId) => {
    todos.splice(todoId, 1);
    TodoArchieve.deleteTodo(todoId);
  }

  const deleteTodos = () => {
    TodoArchieve.deleteTodos(todos);
    return todos;
  }

  const getTodos = () => TodoArchieve.getTodosByIds(todos);

  const getTodoAt = (index) => {
    return TodoArchieve.getTodoAt(index);
  }

  const getProjectInfo = () => {
    return {
      id,
      title,
      description,
      todos,
      creator,
    }
  }

  const editProject = (updatedObj) => {
    title = updatedObj.title !== '' ? updatedObj.title : title;
    description = updatedObj.description !== '' ? updatedObj.description : description;

    return getProjectInfo();
  }

  return {
    getId,
    getProjectInfo,
    getTitle,
    addTodo,
    getTodos,
    getTodoAt,
    deleteTodo,
    deleteTodos,
    editProject
  }
}

const myProject = ProjectFactory({ title: 'Default Project', description: 'This is the default description. :-)', creator: 'Sarah' });
//ProjectArchive.addProject(myProject);

//let myFac = myProject.addTodo({ title: 'Default todo', description: 'Default descrition', priority: 1, time: "10:46", date: "2020-02-27", duration: 20000 });


const completitionLoader = {
  receive: (percentage) => {
  }
}

const projectsFromStore = ProjectArchive.parseFromStorage();

projectsFromStore.forEach(project => {
  ProjectArchive.addProject(project)
  ProjectArchive.addProject(project)
});

export { ProjectFactory, ProjectArchive };