import { ProjectFactory } from './project';

const Projects = () => {
  let count = 0;
  const storeName = 'project-storage';
  const projectLimit = 7;
  let projectList = [];

  const parseFromStorage = () => {
    let arr = JSON.parse(localStorage.getItem(storeName));

    const result = [];

    arr.map(project => {
      result.push(ProjectFactory(project));
    });
    
    return result;
  }

  const getId = () => {
    return count++
  }

  const getCount = () => count;

  const getLimit = () => projectLimit;

  const deleteProject = (projectId) => {

    projectList.splice(projectId, 1);

  }

  const getProjects = () => {
    return projectList;
  }

  const getProjectAt = (index) => {
    return projectList[index];
  }

  const addProject = (project) => {
    if (count > projectLimit) return;

    projectList.push(project);

    let lastAdded = projectList[projectList.length - 1];
    let dataToStore = lastAdded.getProjectInfo();
    dataToStore.storedId = dataToStore.id;
    localStorage.setItem(storeName, JSON.stringify([dataToStore]));
  }

  return {
    getId,
    getCount,
    getLimit,
    addProject,
    getProjects,
    getProjectAt,
    deleteProject,
    parseFromStorage
  }
}

export { Projects };