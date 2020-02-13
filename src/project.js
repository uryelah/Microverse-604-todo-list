import {TodoFactory} from './todo';

const Projects = () => {
  let count = 0;

  const getId = () => {
		return count++
	}

  return {
    getId
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
    getProjectInfo
  }
}

const myProject = ProjectFactory({title: 'first project'});
console.log(myProject.getProjectInfo());

const myProject2 = ProjectFactory({title: 'second project'});
console.log(myProject2.getProjectInfo())

export {ProjectArchive, ProjectFactory};