import { ProjectArchive, ProjectFactory } from './project';

const projectHelpers = (function () {

    return {
        projectAction: function (id, action, param) {
            return ProjectArchive.getProjectAt(id)[action](param);
        },
        newProject: function (formData) {
            let newProject = ProjectFactory(formData);
            ProjectArchive.addProject(newProject);
        },
    }
})();

export default projectHelpers;
