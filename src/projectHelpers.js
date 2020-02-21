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
    }
})();

export default projectHelpers;

