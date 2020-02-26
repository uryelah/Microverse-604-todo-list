import { ProjectArchive } from './project';
import projectForm from './modal/projectForm';
import todoForm from './modal/todoForm';
import projectDetails from './modal/projectDetails';
import modalHelpers from './modal/modalHelpers';
import projectHelpers from './projectHelpers';
import todoHelpers from './todoHelpers';
import Events from './events';
import Store from './localStorage';

const ui = () => {
  const projectsContainer = document.getElementById('all-projects');
  let openProject = document.getElementsByClassName('main-list')[0];
  const projectCount = document.getElementById('project-count');
  const projectLimit = document.getElementById('project-limit');
  const showMore = document.getElementsByClassName('show-more');
  const projectTitle = document.getElementById('project-title');
  let containerTodos = document.getElementById('container-todos');
  const viewTodosBtn = document.getElementById('view-todos');
  const userName = document.getElementById('user-name');
  let count;

  const deleteProject = (project) => {
    const projectId = parseInt(project.dataset.project, 10);
    document.getElementById(`${projectId}-pro`).remove();
    const todosArr = projectHelpers.projectAction(projectId, 'deleteTodos');
    ProjectArchive.deleteProject();
    todosArr.forEach((todo) => {
      document.getElementById(`${todo}-todo`).remove();
    });
    projectCount.innerHTML = ProjectArchive.getCount();
    modalHelpers.close();
    projectTitle.innerText = 'Deleted';
    openProject.classList.add('main-deleted');
  };

  const turnNumber = (str) => parseInt(str.match(/\d+/)[0], 10);

  const activeProjectMode = (p, project) => {
    if (p === project) {
      projectHelpers.activeProject(project);
    } else {
      p.classList.remove('project-active');
    }
  };

  const populateProjects = () => {
    projectsContainer.innerHTML = '';

    const currentProjects = ProjectArchive.getProjects();

    currentProjects.forEach((project, i) => {
      projectsContainer.innerHTML += `<article id="${project.getId()}-pro" data-project="${project.getId()}" class="project ${i === 0 ? 'project-active' : ''}">${project.getTitle()}</article>`;

      if (i === 0) {
        projectHelpers.activeProject(projectsContainer.lastElementChild);
      }
    });

    Events.addProjectsEvent(activeProjectMode);
    projectCount.innerText = ProjectArchive.getCount();
  };

  const addNewTodo = (projectId, newTodo) => {
    const todoData = newTodo.getTodoInfo();

    containerTodos = document.getElementById('container-todos');
    containerTodos.innerHTML += todoHelpers.todoElement(todoData);

    const currentTodos = document.getElementsByClassName('todo');
    Events.todoEvents([...currentTodos], todoHelpers.afterTodoEvent,
      todoHelpers.deleteTodo, todoHelpers.toggleCompleteTodo, todoHelpers.editTodo);
    todoHelpers.openTodos(viewTodosBtn, 'open');
  };

  const submitCallback = (e) => {
    modalHelpers.close();

    const formValues = {};

    [...e.target].forEach((element, i, arr) => {
      if (i === arr.length - 1) return;

      formValues[`${element.name}`] = element.value;
    });

    projectHelpers.newProject(formValues);

    count = ProjectArchive.getCount();

    populateProjects();

    e.preventDefault();
  };

  const openNewProjectForm = () => {
    if (count >= ProjectArchive.getLimit()) {
      projectLimit.innerHTML = 'Max projects reached!';
      projectLimit.classList.add('warn-project-limit');
      return;
    }
    modalHelpers.open(projectForm, null);


    Events.addSubmitProjectEvent(submitCallback);
  };

  const submitTodoCallback = (e) => {
    modalHelpers.close();

    const formValues = {};

    [...e.target].forEach((element, i, arr) => {
      if (i === arr.length - 1) return;
      if (element.name === 'project') {
        formValues[`${element.name}`] = parseInt(element.value, 10);
      } else {
        formValues[`${element.name}`] = element.value;
      }
    });

    const newTodo = projectHelpers.projectAction(turnNumber(openProject.id), 'addTodo', formValues);

    const projectId = turnNumber(openProject.id);


    addNewTodo(projectId, newTodo);
    todoHelpers.getNextTodo();

    e.preventDefault();
  };

  const openNewTodoForm = () => {
    openProject = document.querySelector('.main-list');
    modalHelpers.open(todoForm(turnNumber(openProject.id)), null);

    Events.addSubmitTodoEvent(submitTodoCallback);
  };

  const openProjectDetails = () => {
    const projectData = projectHelpers.projectAction(turnNumber(openProject.id), 'getProjectInfo');
    modalHelpers.open(projectDetails(projectData), projectData.id);

    Events.addDeleteProject(deleteProject);
  };

  Store.setUser();

  userName.innerText = Store.getUser();

  projectLimit.innerHTML = `Projects limit: ${ProjectArchive.getLimit()}`;

  Events.editProjectEvent(projectHelpers.editProject);

  Events.addToggleToProgressBar();

  Events.addHideToModal();

  Events.addnewProjectEvent(openNewProjectForm);

  Events.addnewTodovent(openNewTodoForm);

  Events.addOpenProject(openProjectDetails);

  Events.addOpenLists(showMore, todoHelpers.openTodos);

  populateProjects();

  todoHelpers.populateTodos(0);

  todoHelpers.getNextTodo();

  Events.addnavEvents(todoHelpers.populateTodos);
};

export default ui;
