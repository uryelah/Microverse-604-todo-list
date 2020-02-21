import { ProjectFactory } from './project';
import Store from './localStorage';

const Projects = () => {
  let count = 0;
  const storeName = 'project-storage';
  const projectLimit = 7;
  let projectList = [];

  const getId = () => {
    return count++
  }

  const getStoreName = () => storeName;

  const getCount = () => count;

  const getLimit = () => projectLimit;

  const deleteProject = (projectId) => {
    projectList.splice(projectId, 1);
    Store.removeProject(projectId, storeName);
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
    Store.storeProject(projectList, storeName);
  }

  return {
    getId,
    getCount,
    getLimit,
    addProject,
    getProjects,
    getStoreName,
    getProjectAt,
    deleteProject,
  }
}

export { Projects };