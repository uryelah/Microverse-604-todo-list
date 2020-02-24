import { ProjectArchive } from './project';
import projectForm from './modal/projectForm';
import todoForm from './modal/todoForm';
import projectDetails from './modal/projectDetails';
import modalHelpers from './modal/modalHelpers';
import projectHelpers from './projectHelpers';
import todoHelpers from './todoHelpers';
import Events from './events';

const ui = () => {
  const projectsContainer = document.getElementById('all-projects');
  let openProject = document.getElementsByClassName('main-list')[0];
  const projectCount = document.getElementById('project-count');
  const projectLimit = document.getElementById('project-limit');
  const showMore = document.getElementsByClassName('show-more');
  const projectTitle = document.getElementById('project-title');
  let containerTodos = document.getElementById('container-todos');
  const viewTodosBtn = document.getElementById('view-todos');
  let count;

  const deleteProject = (project) => {
    const projectId = parseInt(project.dataset.project);
    document.getElementById(`${projectId}-pro`).remove();
    const todosArr = projectHelpers.projectAction(projectId, 'deleteTodos')
    ProjectArchive.deleteProject();
    todosArr.forEach(todo => {
      document.getElementById(`${todo}-todo`).remove();
    })
    modalHelpers.close();
    projectTitle.innerText = 'Deleted';
    openProject.classList.add('main-deleted');
  }

  const turnNumber = (str) => {
    return parseInt(str.match(/\d+/)[0]);
  }

  const populateProjects = () => {
    projectsContainer.innerHTML = '';

    const currentProjects = ProjectArchive.getProjects();

    currentProjects.forEach((project, i) => {
      projectsContainer.innerHTML += `<article id="${project.getId()}-pro" class="project ${i === 0 ? 'project-active' : ''}">${project.getTitle()}</article>`

      if (i === 0) {
        projectHelpers.activeProject(projectsContainer.lastElementChild);        
      }
    });

    Events.addProjectsEvent()
    projectCount.innerText = ProjectArchive.getCount();
  }

  const addNewTodo = (projectId, newTodo) => {
    
    let todoData;
    
    todoData = newTodo.getTodoInfo();

    containerTodos = document.getElementById('container-todos');
    containerTodos.innerHTML += todoHelpers.todoElement(todoData);

    const currentTodos = document.getElementsByClassName('todo');
    Events.todoEvents([...currentTodos], todoHelpers.afterTodoEvent);
    todoHelpers.openTodos(viewTodosBtn, 'open');
  };

  const submitCallback = (e) => {
    modalHelpers.close();

    let formValues = {};

    [...e.target].forEach((element, i, arr) => {
      if (i == arr.length - 1) return;

      formValues[`${element.name}`] = element.value;
    });

    projectHelpers.newProject(formValues);

    count = ProjectArchive.getCount();

    populateProjects();

    e.preventDefault();
  }
  
  const openNewProjectForm = () => {
    if (count >= ProjectArchive.getLimit()) {
      projectLimit.innerHTML = 'Max projects reached!'
      projectLimit.classList.add('warn-project-limit');
      return;
    } else {
      modalHelpers.open(projectForm, null);
    }

    Events.addSubmitProjectEvent(submitCallback);
  };

  const submitTodoCallback = (e) => {
    modalHelpers.close();

    let formValues = {};

    [...e.target].forEach((element, i, arr) => {
      if (i == arr.length - 1) return;
      if (element.name === 'project') {
        formValues[`${element.name}`] = parseInt(element.value);          
      } else {
        formValues[`${element.name}`] = element.value;
      }
    });
    
    let newTodo = projectHelpers.projectAction(turnNumber(openProject.id), 'addTodo', formValues);

    let projectId = turnNumber(openProject.id);
    

    addNewTodo(projectId, newTodo);
    todoHelpers.getNextTodo();

    e.preventDefault();
  };

  const openNewTodoForm = (e) => {
    openProject = document.getElementsByClassName('main-list')[0];
    modalHelpers.open(todoForm(turnNumber(openProject.id)), null);
  
    Events.addSubmitTodoEvent(submitTodoCallback);
  };

  const openProjectDetails = () => {
    const projectData = projectHelpers.projectAction(turnNumber(openProject.id), 'getProjectInfo');
    modalHelpers.open(projectDetails(projectData), projectData.id);

    Events.addDeleteProject(deleteProject);
  }

  projectLimit.innerHTML = `Projects limit: ${ProjectArchive.getLimit()}`

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