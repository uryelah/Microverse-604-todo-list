import { ProjectArchive, ProjectFactory } from './project';
import todoHelpers from './todoHelpers';
import Events from './events';
import modalHelpers from './modal/modalHelpers';
import projectDetails from './modal/projectDetails';

const projectHelpers = (function () {
  const turnNumber = (str) => {
    return parseInt(str.match(/\d+/)[0]);
  };

  const activeProject = (project) => {
    const openProject = document.getElementsByClassName('main-list')[0];

    document.getElementById('all-projects').scrollTo(0, 0);
    project.classList.add('project-active');
    openProject.id = `${project.id}-open`;
    openProject.classList = `main-list main-${project.id}`;
    openProject.querySelector('h1').innerText = project.innerText;
    let projectId = turnNumber(project.id);
    todoHelpers.populateTodos(projectId);
  };

  const updateProject = (project) => {
    const editablePro = document.getElementById(`${project.id}-pro`);
    editablePro.innerText = project.title;

    activeProject(editablePro);
  };

  const projectAction = function (id, action, param) {
    if (ProjectArchive.getCount() === 0) return;

    return ProjectArchive.getProjectAt(id)[action](param);
  };

  const afterUpdate = (e) => {
    const projectId = parseInt(e.target.dataset.project);

    const newProject = modalHelpers.getProjectUpdates();

    const updatedProject = projectAction(projectId, 'editProject', newProject);
    updateProject(updatedProject);
    modalHelpers.close();
  }

  return {
    projectAction,

    newProject: function (formData) {
      let newProject = ProjectFactory(formData);
      ProjectArchive.addProject(newProject);
    },

    activeProject,

    updateProject,

    editProject: () => {
      let openProject = document.getElementsByClassName('main-list')[0];
      const projectId = turnNumber(openProject.id);
      const projectData = projectHelpers.projectAction(projectId, 'getProjectInfo');
      modalHelpers.open(projectDetails(projectData, true), projectId);

      Events.updateProject(afterUpdate);
    },

    afterUpdate,
  }
})();

export default projectHelpers;

