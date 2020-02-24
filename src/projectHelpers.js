import { ProjectArchive, ProjectFactory } from './project';
import Store from './localStorage';

const projectHelpers = (function () {

  return {
    projectAction: function (id, action, param) {
      if (ProjectArchive.getCount() === 0) return;

      return ProjectArchive.getProjectAt(id)[action](param);
    },
    newProject: function (formData) {
      let newProject = ProjectFactory(formData);
      ProjectArchive.addProject(newProject);
    },
    activeProject: (project) => {
      const openProject = document.getElementsByClassName('main-list')[0];
      
      document.getElementById('all-projects').scrollTo(0, 0);
      project.classList.add('project-active');
      openProject.id = `${project.id}-open`;
      openProject.classList = `main-list main-${project.id}`;
      openProject.querySelector('h1').innerText = project.innerText;
      containerTodos = document.getElementById('container-todos');
      let projectId = turnNumber(project.id);
      todoHelpers.populateTodos(projectId);
    }
  }
})();

export default projectHelpers;

