import { TodoFactory, TodoArchieve } from './todo';
import { Projects } from './projectArchive';
import Store from './localStorage';

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
    Store.updateProjects(ProjectArchive.getStoreName());
    TodoArchieve.addTodo(newTodo);
    return newTodo;
  }

  const deleteTodo = (todoId) => {
    todos.splice(todoId, 1);
    Store.removeTodoFrom(id, todoId, ProjectArchive.getStoreName());
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
      storedId,
      title,
      description,
      todos,
      creator,
    }
  }

  const editProject = (updatedObj) => {
    title = updatedObj.title !== '' ? updatedObj.title : title;
    description = updatedObj.description !== '' ? updatedObj.description : description;

    Store.updateProject(id, getProjectInfo());
    Store.updateProjects(ProjectArchive.getStoreName());

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

export { ProjectFactory, ProjectArchive };