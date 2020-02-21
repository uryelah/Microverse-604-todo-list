import { ProjectArchive } from './project';
import { TodoArchieve } from './todo';
import projectForm from './modal/projectForm';
import todoForm from './modal/todoForm';
import projectDetails from './modal/projectDetails';
import todoDetails from './modal/todoDetails';
import modalHelpers from './modal/modalHelpers';
import projectHelpers from './projectHelpers';
import todoHelpers from './todoHelpers';
import Events from './events';

const ui = () => {
  const modal = document.getElementById("modal");
  const hideModal = modal.querySelector('#modal-hide');
  const addProjectBtn = document.getElementById("add-project");

  const projectsContainer = document.getElementById('all-projects');
  let openProject = document.getElementsByClassName('main-list')[0];
  const projectCount = document.getElementById('project-count');
  const projectLimit = document.getElementById('project-limit');
  projectLimit.innerHTML = `Projects limit: ${ProjectArchive.getLimit()}`

  const showMore = document.getElementsByClassName('show-more');

  const addTodo = document.getElementById('create-project-todo');
  const projectTitle = document.getElementById('project-title');
  let containerTodos = document.getElementById('container-todos');
  let count;

  const progress = document.getElementsByClassName('ongoing')[0];
  const progressTab = document.getElementById('progress-tab');
  const viewTodosBtn = document.getElementById('view-todos');
  const editProjectBtn = document.getElementById('edit-project');
  

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
  
  const addEventToTodos = (todos) => {
    Events.todoEvents(todos);
  }

  const activeProject = (project) => {
    projectsContainer.scrollTo(0, 0);
    project.classList.add('project-active');
    openProject.id = `${project.id}-open`;
    openProject.classList = `main-list main-${project.id}`;
    openProject.querySelector('h1').innerText = project.innerText;
    containerTodos = document.getElementById('container-todos');
    let projectId = turnNumber(project.id);  
    todoHelpers.populateTodos(projectId);
  }

  const projectClickEvent = () => {
    [...document.getElementsByClassName('project')].forEach((project, i, arr) => {
      project.addEventListener('click', () => {
        arr.forEach(p => {
          if (p === project) {
            activeProject(project);
          } else {
            p.classList.remove('project-active');
          }
        });
      });
    });
  };

  const populateProjects = () => {
    projectsContainer.innerHTML = '';

    const currentProjects = ProjectArchive.getProjects();

    currentProjects.forEach((project, i) => {
      projectsContainer.innerHTML += `<article id="${project.getId()}-pro" class="project ${i === 0 ? 'project-active' : ''}">${project.getTitle()}</article>`

      if (i === 0) {
        activeProject(projectsContainer.lastElementChild);        
      }
    });

    projectClickEvent();
    projectCount.innerText = ProjectArchive.getCount();
  }

  const updateProject = (project) => {
    const editablePro = document.getElementById(`${project.id}-pro`);
    editablePro.innerText = project.title;

    activeProject(editablePro);
  }

  const addNewTodo = (projectId, newTodo) => {
    let todoData;
    
    todoData = newTodo.getTodoInfo();

    containerTodos.innerHTML += todoHelpers.todoElement(todoData);

    const currentTodos = document.getElementsByClassName('todo');
    addEventToTodos([...currentTodos]);
    todoHelpers.openTodos(viewTodosBtn, 'open');
  };

  editProjectBtn.addEventListener('click', e => {
    const projectId = turnNumber(openProject.id);
    const projectData = projectHelpers.projectAction(projectId, 'getProjectInfo');
    modalHelpers.open(projectDetails(projectData, true), projectId);

    document.getElementById('project-update').addEventListener('click', e => {
      const projectId = parseInt(e.target.dataset.project);
      
      const newProject = modalHelpers.getProjectUpdates();

      const updatedProject = projectHelpers.projectAction(projectId, 'editProject', newProject);
      updateProject(updatedProject);
      modalHelpers.close();
    })
  });

  progressTab.addEventListener('click', () => {
    progress.classList.toggle('hidden');
  });

  hideModal.addEventListener('click', () => {
    modalHelpers.close();
  });

  addProjectBtn.addEventListener('click', () => {
    if (count >= ProjectArchive.getLimit()) {
      projectLimit.innerHTML = 'Max projects reached!'
      projectLimit.classList.add('warn-project-limit');
      return;
    } else {
      modalHelpers.open(projectForm, null);
    }

    let newProjectForm = document.getElementById('project-form');

    newProjectForm.addEventListener('submit', e => {
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
    });
  });

  addTodo.addEventListener('click', () => {
    openProject = document.getElementsByClassName('main-list')[0];
    modalHelpers.open(todoForm(turnNumber(openProject.id)), null);

    const newTodoForm = document.getElementById('todo-form');
    newTodoForm.addEventListener('submit', (e) => {
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
    });

  });

  projectTitle.addEventListener('click', () => {
    const projectData = projectHelpers.projectAction(turnNumber(openProject.id), 'getProjectInfo');
    modalHelpers.open(projectDetails(projectData), projectData.id);
    document.getElementById('project-delete').addEventListener('click', e => deleteProject(e.target))
  });

  [...showMore].forEach(btn => {
    btn.addEventListener('click', () => {
      todoHelpers.openTodos(btn);
    });
  });

  populateProjects();
  todoHelpers.populateTodos(0);
  todoHelpers.getNextTodo();
  Events.addnavEvents(todoHelpers.populateTodos);
};

export default ui;