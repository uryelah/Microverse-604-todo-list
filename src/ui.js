import { ProjectArchive, ProjectFactory } from './project';

const projectForm = `<h2>New Project</h2>
<form id="project-form" class="modal-form">
    <div>
        <label for="project-title">
        Project title:
        </label>
        <input type="text" name="title" id="project-title" required>
    </div>

    <div>
        <label for="project-description">
        Project description:
        </label>
        <textarea name="description" id="project-description" required></textarea>
    </div>
    <input type="hidden" name="creator" id="project-creator" value="user">

    <button type="submit">Add Project</button>
</form>`

const todoForm = `<h2>New Todo</h2>
<form id="todo-form" class="modal-form">
    <div>
        <label for="todo-title">
        Title:
        </label>
        <input type="text" name="title" id="todo-title" required>
    </div>

    <div>
        <label for="todo-title">
        Priority:
        </label>
        <select name="priority" id="todo-priority" required>
            <option value="0">Low</option>
            <option value="1">Normal</option>
            <option value="2">High</option>
        </select>
    </div>

    <div>
        <label for="todo-date">
        Due at:
        </label>
        <input type="date" name="date" id="todo-date" required>
    </div>

    <div>
        <label for="todo-time">
        Time:
        </label>
        <input type="time" name="time" id="todo-time">
    </div>

    <div>
        <label for="todo-duration">
        Duration:
        </label>
        <input type="number" min='0' step=5 name="duration" id="todo-duration">
        <small>Time in minutes</small>
    </div>

    <div>
        <label for="todo-tag">
        Tags:
        </label>
        <input type="text" name="tag" id="todo-tag">
        <small>Separate each tag with a comma.</small>
    </div>
    <div>
        <label for="todo-description">
        Description:
        </label>
        <textarea type="text" name="description" id="todo-description" required></textarea>
    </div>
    <input type="hidden" name="project" id="todo-project" value="0">

    <button type="submit">Add todo</button>
</form>`

const projectDetails = `<article id="0-project-open" class="modal-details project-details">
<h2 class="project-title">Project Title</h2>
<p class="project-creator">Created by: User</p>
<p class="project-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, cupiditate esse error molestias dolorum minus laborum culpa perferendis asperiores odit aspernatur, totam sit deleniti maxime pariatur tenetur sint, quia blanditiis!</p>
<div class="project-todo-today">
    <p class="mini-todos">Task for today:</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
    <p class="todo brief-todo">task1, 2am</p>
    <p class="todo brief-todo">task2, 11am</p>
</div>   
<button class="project-delete" type="button">Delete</button>             
</article>`

const todoDetails = `<article id="0-todo-open" class="modal-details todo-details">
<h2 class="todo-title">Todo Title</h2>
<button id="toggle-completed" class="todo-incomplete action-btn" type="button">Complete todo</button>
<p class="todo-description">Description
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates id molestias fuga omnis! Fugit doloribus quod nemo ex provident maiores voluptates in, consequuntur dolorem, cupiditate ipsum, debitis iure dicta dolore!
</p>
<p class="todo-created-at">Created at:<span class="created-at">Thursday, 11 | 11:30am</span></p>
<div class="todo-priority">
    <p>Priority: <span class=" priority priority-high">High</span></p>
</div>
<div class="todo-date-time">
    <p class="remaning-time">Next Week</p>
    <p class="day-time">Thursday, 18 | 9:30pm</p>
</div>
<div class="todo-status">
    <p>Status: <span class="status status-completed">Completed</span></p>
</div>
<div class="todo-duration">
    <p>Duration: <span class="duration">2h</span></p>
</div>
<button type="button" class="todo-start-btn action-btn">Start task</button>
<div class="todo-tags">
    <p>Tags:</p>
    <p class="todo-tag child-card card-green">#tag1</p>
    <p class="todo-tag child-card card-red">#tag2</p>
</div>                
</article>`

const ui = () => {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector('#modal-content');
  const hideModal = modal.querySelector('#modal-hide');
  const addProjectBtn = document.getElementById("add-project");

  const projectsContainer = document.getElementById('all-projects');
  const projects = document.getElementsByClassName('project');
  const openProject = document.getElementsByClassName('main-list')[0];

  const showMore = document.getElementsByClassName('show-more');

  const addTodo = document.getElementById('create-project-todo');
  const projectTitle = document.getElementById('project-title');
  let containerTodos = document.getElementById('container-todos');
  const projectTodos = containerTodos.getElementsByClassName('todo');
  const nextTodoArea = document.getElementById('next-task');
  const nextTodo = nextTodoArea.querySelector('.todo');

  const progress = document.getElementsByClassName('ongoing')[0];
  const progressTab = document.getElementById('progress-tab');


  const projectClickEvent = () => {
    [...document.getElementsByClassName('project')].forEach((project, i, arr) => {
      project.addEventListener('click', () => {
        arr.forEach(p => {
          if (p === project) {
            projectsContainer.scrollTo(0, 0);
            project.classList.add('project-active');
            openProject.id = `${project.id}-open`;
            openProject.classList = `main-list main-${project.id}`;
            openProject.querySelector('h1').innerText = project.innerText;
            containerTodos = document.getElementById('container-todos');
          } else {
            p.classList.remove('project-active');
          }
        });
      });
    });
  }

  // Populate projects fomr Project Archive
  const populateProjects = () => {
    projectsContainer.innerHTML = '';

    const currentProjects = ProjectArchive.getProjects();
    
    currentProjects.forEach(project => {
      projectsContainer.innerHTML += `<article id="${project.getId()}-pro" class="project">${project.getTitle()}</article>`
    });

    projectClickEvent();
  }

  populateProjects();
  
  progressTab.addEventListener('click', () => {
    progress.classList.toggle('hidden');
  });

  hideModal.addEventListener('click', () => {
    modal.classList.add('modal-closed');
  });

  addProjectBtn.addEventListener('click', () => {
    modalContent.innerHTML = projectForm;
    modal.classList.remove('modal-closed');

    let newProjectForm = document.getElementById('project-form');

    newProjectForm.addEventListener('submit', e => {
      modal.classList.add('modal-closed');
      
      let formValues = {};

      [...e.target].forEach((element, i, arr) => {
        if (i == arr.length - 1) return;
        
        formValues[`${element.name}`] = element.value;
      });

      let newProject = ProjectFactory(formValues);
      ProjectArchive.addProject(newProject);

      populateProjects();

      e.preventDefault();
    });
  });

  const addNewTodo = () => {
    let todoData = ProjectArchive.getProjectAt(0).getTodos();
            todoData = todoData[todoData.length -1];
            todoData = todoData.getTodoInfo();
    
            
            containerTodos.innerHTML += ` <article id="${todoData.id}-todo" class="todo">
            <input type="checkbox" class="todo-complete">
            <div class="todo-date">
                <time datetime="2020-02-14 20:00">${todoData.time}</time>
                <time datetime="2020-02-14 20:00">${todoData.date}</time>
            </div>
            <h4 class="todo-title">${todoData.title}</h4>
            <div class="todo-priority todo-${todoData.priority}">${todoData.priority}</div>
            <button type="button" class="todo-edit add-btn edit-btn"><i class="far fa-edit"></i></button>
            <button type="button" class="todo-delete add-btn delete-btn"><i class="fas fa-times"></i>
            </button>                 
        </article>`;

  };

  const populateTodos = () => {
    let todoData = ProjectArchive.getProjectAt(0).getTodos();
    containerTodos.innerHTML = ``;
    todoData.forEach(todo => {
      let todoData = todo.getTodoInfo();
      containerTodos.innerHTML = ` <article id="${todoData.id}-todo" class="todo">
      <input type="checkbox" class="todo-complete">
      <div class="todo-date">
          <time datetime="2020-02-14 20:00">${todoData.time}</time>
          <time datetime="2020-02-14 20:00">${todoData.date}</time>
      </div>
      <h4 class="todo-title">${todoData.title}</h4>
      <div class="todo-priority todo-${todoData.priority}">${todoData.priority}</div>
      <button type="button" class="todo-edit add-btn edit-btn"><i class="far fa-edit"></i></button>
      <button type="button" class="todo-delete add-btn delete-btn"><i class="fas fa-times"></i>
      </button>                 
  </article>`
    });
  };
  populateTodos();

  addTodo.addEventListener('click', () => {
    modalContent.innerHTML = todoForm;
    modal.classList.remove('modal-closed');

    const newTodoForm = document.getElementById('todo-form');
          newTodoForm.addEventListener('submit', (e)=> {
            modal.classList.add('modal-closed'); 

            let formValues = {};

            [...e.target].forEach((element, i, arr) => {
              if (i == arr.length - 1) return;
              formValues[`${element.name}`] = element.value;
            });
            let newTodo = ProjectArchive.getProjectAt(0).addTodo(formValues);
            addNewTodo();

            e.preventDefault();    
          });

  });

  projectTitle.addEventListener('click', () => {
    let projectData = openProject.id;
    projectData.replace('-open', '');
    modalContent.innerHTML = projectDetails;
    modal.classList.remove('modal-closed');
    modalContent.setAttribute('data-type',projectData);
  });

  [...projectTodos, nextTodo].forEach((todo) => {
    todo.addEventListener('click', () => {
      modalContent.innerHTML = todoDetails;
      modal.classList.remove('modal-closed');
      modalContent.setAttribute('data-type',todo.id);
    })
  });

  [...showMore].forEach( btn => {
    btn.addEventListener('click', () => {
      let sibling = btn.nextElementSibling;
      sibling.classList.toggle('collapsed');
      if (sibling.classList.contains('collapsed')) {
        btn.querySelector('span').innerText = 'View all';
      } else {
        btn.querySelector('span').innerText = 'Hide';
      }
    });
  });
};

export default ui;