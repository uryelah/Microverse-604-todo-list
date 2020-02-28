import ui from './ui';
import Store from './localStorage';
import { ProjectFactory, ProjectArchive } from './project';
import { TodoFactory, TodoArchieve } from './todo';


if (!Store.hasProject(ProjectArchive)) {
  const myProject = ProjectFactory({ title: 'Default Project', description: 'This is the default description. :-)', creator: 'user' });
  ProjectArchive.addProject(myProject);

  myProject.addTodo({
    title: 'Default todo', description: 'Default description', priority: 1, time: '10:46', date: '2020-02-27', duration: 20000, tags: 'Example tag, default',
  });
} else {
  Store.parseFromStorage(TodoFactory, TodoArchieve, ProjectArchive, ProjectFactory);
}

window.onload = () => {
  ui();
};
