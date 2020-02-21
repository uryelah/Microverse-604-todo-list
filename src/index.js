import ui from './ui';
import Store from './localStorage';
import { ProjectFactory,ProjectArchive } from './project';


if (!Store.hasProject()) {
  const myProject = ProjectFactory({ title: 'Default Project', description: 'This is the default description. :-)', creator: 'User' });
  ProjectArchive.addProject(myProject);

  myProject.addTodo({ title: 'Default todo', description: 'Default description', priority: 1, time: "10:46", date: "2020-02-27", duration: 20000 });
} else {
  Store.parseFromStorage();
}

window.onload = () => {
  ui();
};
