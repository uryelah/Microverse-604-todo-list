import {TodoFactory, TodoArchieve} from './todo';

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
/* NEEDED DATA FOR TODO CREATION
	createdAt = Date.now(), title, duration = 0, description, priority = 1, date, time, tags = [], project, archieve = TodoArchieve
*/

const ProjectFactory = (factoryObject) => {
  let {title, description, todos = [], creator, archieve = ProjectArchive} = factoryObject;

  let id = archieve.getId();

  const getId = () => id;
  const getTodosForToday = () => {
		
  } 

  const addTodo = (object) => {
    object.project = id;
    const newTodo = TodoFactory(object);
    console.log('test')
    todos.push(newTodo);
  }
  

  const getProjectInfo = () => {
    return {
      id,
      title, 
      description,
      todos,
      creator
    }
  }

  return {
    getId,
    getTodosForToday,
    getProjectInfo,
    addTodo,
  }
}

const myProject = ProjectFactory({title: 'first project'});
ProjectArchive.addProject(myProject);
console.log(myProject.getProjectInfo());

const myProject2 = ProjectFactory({title: 'second project'});
ProjectArchive.addProject(myProject2);
console.log(myProject2.getProjectInfo())

console.log(ProjectArchive.getProjects());


let myFac = myProject.addTodo({title: 'test', priority: 2, time: new Date(2020, 1, 14, 10, 30, 0), date: new Date(2020, 2, 23), duration: 10000});
console.log(TodoFactory)
console.log(myFac.getTime())
console.log(myFac.getTodoInfo())
console.log(myFac.startTask())


export {ProjectArchive, ProjectFactory};