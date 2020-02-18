import { TodoFactory, TodoArchieve } from './todo';

const Projects = () => {
  let count = 0;
  const projectList = [];

  const getId = () => {
    return count++
  }

  const addProject = (project) => {
    projectList.push(project);
  }

  const getProjects = () => {
    return projectList;
  }

  const getProjectAt = (index) => {
    return projectList[index];
  }

  return {
    getId,
    addProject,
    getProjects,
    getProjectAt,
  }
}

const ProjectArchive = Projects();

const ProjectFactory = (factoryObject) => {
  let { title, description, todos = [], creator, archieve = ProjectArchive } = factoryObject;

  let id = archieve.getId();

  const getId = () => id;
  const getTodosForToday = () => {

  }

  const getTitle = () => title;

  const addTodo = (object) => {
    object.project = id;
    const newTodo = TodoFactory(object);
    todos.push(newTodo.getId());
    TodoArchieve.addTodo(newTodo);
    return newTodo;
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

  return {
    getId,
    getTodosForToday,
    getProjectInfo,
    getTitle,
    addTodo,
    getTodos,
    getTodoAt
  }
}


const myProject = ProjectFactory({ title: 'Default Project', description: 'This is the default description. :-)', creator: 'Sarah' });
ProjectArchive.addProject(myProject);

//const myProject2 = ProjectFactory({ title: 'second project' });
//ProjectArchive.addProject(myProject2);


let myFac = myProject.addTodo({ title: 'Default todo', description: 'Default descrition', priority: 1, time:"10:46", date:"2020-02-27", duration: 20000 });
//let myFac2 = myProject.addTodo({ title: 'test2', priority: 1, time: new Date(2020, 1, 14, 10, 30, 0), date: new Date(2020, 2, 23), duration: 20000 });


const completitionLoader = {
  receive: (percentage) => {
  }
}

export { ProjectArchive, ProjectFactory };