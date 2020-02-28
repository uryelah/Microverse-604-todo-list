import { ProjectArchive, ProjectFactory } from './project';
// eslint-disable-next-line import/no-cycle
import todoHelpers from './todoHelpers';
// eslint-enable-next-line import/no-cycle
import Events from './events';
import modalHelpers from './modal/modalHelpers';
import projectDetails from './modal/projectDetails';

const projectHelpers = (function helper() {
  const turnNumber = str => parseInt(str.match(/\d+/)[0], 10);

  const activeProject = (project) => {
    const openProject = document.getElementsByClassName('main-list')[0];

    document.getElementById('all-projects').scrollTo(0, 0);
    project.classList.add('project-active');
    openProject.id = `${project.id}-open`;
    openProject.classList = `main-list main-${project.id}`;
    openProject.querySelector('h1').innerText = project.innerText;
    const projectId = turnNumber(project.id);
    todoHelpers.populateTodos(projectId);
  };

  const updateProject = (project) => {
    const editablePro = document.getElementById(`${project.id}-pro`);
    editablePro.innerText = project.title;

    activeProject(editablePro);
  };

  const projectAction = (id, action, param) => {
    if (ProjectArchive.getCount() > 0) {
      return ProjectArchive.getProjectAt(id)[action](param);
    }
    return null;
  };

  const afterUpdate = (e) => {
    const projectId = parseInt(e.target.dataset.project, 10);

    const newProject = modalHelpers.getProjectUpdates();

    const updatedProject = projectAction(projectId, 'editProject', newProject);
    updateProject(updatedProject);
    modalHelpers.close();
  };

  return {
    projectAction,

    newProject(formData) {
      const newProject = ProjectFactory(formData);
      ProjectArchive.addProject(newProject);
    },

    activeProject,

    updateProject,

    editProject: () => {
      const openProject = document.getElementsByClassName('main-list')[0];
      const projectId = turnNumber(openProject.id);
      const projectData = projectHelpers.projectAction(projectId, 'getProjectInfo');
      modalHelpers.open(projectDetails(projectData, true), projectId);

      Events.updateProject(afterUpdate);
    },

    afterUpdate,
  };
}());

export default projectHelpers;
