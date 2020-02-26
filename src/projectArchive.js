import Store from './localStorage';

const Projects = () => {
  let count = 0;
  const storeName = 'project-storage';
  const projectLimit = 7;
  const projectList = {};

  const getId = () => {
    const prevId = count;
    count += 1;
    return prevId;
  };

  const getStoreName = () => storeName;

  const getCount = () => count;

  const getLimit = () => projectLimit;

  const deleteProject = (projectId) => {
    count -= 1;
    delete projectList[projectId];
    Store.removeProject(projectId, storeName);
  };

  const getProjects = () => Object.values(projectList);

  const getProjectAt = index => projectList[index];

  const addProject = (project) => {
    if (count > projectLimit) return;
    projectList[project.getId()] = project;
    Store.storeProject(projectList, storeName);
  };

  return {
    getId,
    getCount,
    getLimit,
    addProject,
    getProjects,
    getStoreName,
    getProjectAt,
    deleteProject,
  };
};

export default Projects;
