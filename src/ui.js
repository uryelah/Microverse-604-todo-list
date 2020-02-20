import { ProjectArchive, ProjectFactory } from './project';
import { TodoArchieve } from './todo';

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

const todoForm = (projectId) => {
  return `<h2>New Todo</h2>
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
          <input type="number" min='0' step=5 name="duration" id="todo-duration" value=0>
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
      <input type="hidden" name="project" id="todo-project" value="${projectId}">
  
      <button type="submit">Add todo</button>
  </form>`
}; 

const projectDetails = (project, edit = false) => {
  const deleteBtn = `<button id="project-delete" type="button" data-project='${project.id}'>Delete</button>`;
  const editBtn = `<button id="project-update" type="button" data-project='${project.id}'>Update Project</button>`;
  const projectCreator = `<p class="project-creator">Created by: ${project.creator}</p>`;
  const todos = `<div class="project-todo-today"><h3>Todos in this project: ${project.todos.length}</h3></div>`;

  return `<article id="0-project-open" class="modal-details project-details">
    <h2 ${ edit ? 'contenteditable="true" class="editable-content ' : 'class="' }project-title">${project.title}</h2>
    ${ !edit ? projectCreator : '' }
    <p ${ edit ? 'contenteditable="true" class="editable-content ' : 'class="' }project-description">${project.description}</p>
    ${ !edit ? todos : '' }
    ${ !edit ? deleteBtn : editBtn }             
  </article>`
}

const todoDetails = (todo, edit = false) => {
  const completeBtn = `<button id="toggle-completed" class="todo-incomplete action-btn" type="button">Complete todo</button>`
  const editBtn = `<button id="todo-update" type="button" data-todo='${todo.id}'>Update Todo</button>`;
  const startBtn = `<button type="button" class="todo-start-btn action-btn">Start task</button>`
  const createdAt = `<p class="todo-created-at">Created at:<span class="created-at">${todo.createdAt}</span></p>`
  const completed = `<div class="todo-status">
  <p>Completed: <span class="status status-completed">${todo.completed}</span></p>
</div>`

  return `<article id="0-todo-open" class="modal-details todo-details">

<h2 ${ edit ? 'contenteditable="true" class="editable-content ': 'class=" '} todo-title">${todo.title}</h2> 
${ edit ? ' ' : completeBtn }

<p ${ edit ? 'contenteditable="true" class="editable-content ': 'class=" '} todo-description"> ${todo.description}</p>

${ edit ? ' ' : createdAt }

<div class="todo-priority">
    <p>Priority: <span ${ edit ? 'contenteditable="true" class="editable-content ': 'class=" '} priority priority-high">${todo.priority}</span></p>
</div>

<div class="todo-date-time">
    <p class="remaning-time"></p>
    <p ${ edit ? 'contenteditable="true" class="editable-content ': 'class=" '} day-time">${todo.date}</p>
</div>


${ edit ? ' ' : completed }

<div class="todo-duration">
    <p>Duration: <span ${ edit ? 'contenteditable="true" class="editable-content ': 'class=" '} duration">${parseInt(todo.duration/60000)}</span> minutes</p>
</div>
${ edit ? ' ' : startBtn }
<div class="todo-tags">
    <p>Tags:</p>
    <p class="todo-tag child-card card-green"></p>
    <p class="todo-tag child-card card-red"></p>
    <p ${ edit ? 'contenteditable="true"  class="editable-content todo-new-tags" ' : ''} >${todo.tags.join(' ')}</p>
</div> 
${ edit ? editBtn : ' '};
</article>` 

};

const ui = () => {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector('#modal-content');
  const hideModal = modal.querySelector('#modal-hide');
  const addProjectBtn = document.getElementById("add-project");

  const projectsContainer = document.getElementById('all-projects');
  const projects = document.getElementsByClassName('project');
  let openProject = document.getElementsByClassName('main-list')[0];

  const showMore = document.getElementsByClassName('show-more');

  const addTodo = document.getElementById('create-project-todo');
  const projectTitle = document.getElementById('project-title');
  let containerTodos = document.getElementById('container-todos');
  const projectTodos = containerTodos.getElementsByClassName('todo');
  const nextTodoArea = document.getElementById('next-task');
  const nextTodo = nextTodoArea.querySelector('.todo');

  const progress = document.getElementsByClassName('ongoing')[0];
  const progressTab = document.getElementById('progress-tab');
  const viewTodosBtn = document.getElementById('view-todos');
  const editProjectBtn = document.getElementById('edit-project');
  const AlltodosBtn = document.getElementById('see-all'); 
  const AllPriorityBtn = document.getElementById('see-all-priority');
  const AllCompletedBtn = document.getElementById('see-completed');
  const AllIncompletedBtn = document.getElementById('see-incompleted');
  const AllExpiredBtn = document.getElementById('see-expired');

  let editTodoBtn;
  
  let delTodoBtns;

  AlltodosBtn.addEventListener('click', e => {
    populateTodos(false, 'DATE');
  });

  AllPriorityBtn.addEventListener('click', e => {
    populateTodos(false, 'PRIORITY');
  });

  AllCompletedBtn.addEventListener('click', e => {
    populateTodos(false, 'COMPLETED');
  });

  AllIncompletedBtn.addEventListener('click', e => {
    populateTodos(false, 'INCOMPLETED')
  });

  AllExpiredBtn.addEventListener('click', e => {
    populateTodos(false, 'EXPIRED')
  });

  const deleteTodo = (todo) => {
    const todoId = parseInt(todo.dataset.todo);
    const projectId = parseInt(todo.dataset.project);
    ProjectArchive.getProjectAt(projectId).deleteTodo(todoId);
    document.getElementById(`${todoId}-todo`).remove();
  }

  const toggleCompleteTodo = (checkbox) => {
    const todoId = parseInt(checkbox.dataset.todo);
    const todo = document.getElementById(`${todoId}-todo`);
    TodoArchieve.getTodoAt(todoId).toggleComplete(checkbox.checked);

    if (checkbox.checked) {
      todo.classList.add('checked');
    } else {
      todo.classList.remove('checked');
    }
  }

  const editTodo = (todo) => {
    editTodoBtn = document.getElementById('edit-todo');
    const todoId = parseInt(todo.dataset.todo);
    const curTodo = TodoArchieve.getTodoAt(todoId);
    const editableTodo = curTodo.getTodoInfo();
    modal.classList.remove('modal-closed');
    modalContent.innerHTML = todoDetails(editableTodo, true);
    addEventToEdit(curTodo);
  }

  const deleteProject = (project) => {
    const projectId = parseInt(project.dataset.project);
    document.getElementById(`${projectId}-pro`).remove();
    const todosArr = ProjectArchive.getProjectAt(projectId).deleteTodos();
    ProjectArchive.deleteProject();
    todosArr.forEach(todo => {
      document.getElementById(`${todo}-todo`).remove();
    })
    modal.classList.add('modal-closed');
    projectTitle.innerText = 'Deleted';
    openProject.classList.add('main-deleted');
  }

  const turnNumber = (str) => {
    return parseInt(str.match(/\d+/)[0]);
  }
  
  const addEventToTodos = (todos) => {
    todos.forEach(todo => {
      todo.addEventListener('click', e => {
        if (e.target.classList.contains('todo-delete') || e.target.classList.contains('fas')) return;
        if (e.target.classList.contains('todo-edit') || e.target.classList.contains('far')) return;
        if (e.target.classList.contains('todo-complete')) return;

        const todoId = turnNumber(todo.id);
        const todoInfo = TodoArchieve.getTodoAt(todoId).getTodoInfo();

        modalContent.innerHTML = todoDetails(todoInfo);
        modal.classList.remove('modal-closed');
        modalContent.setAttribute('data-type', todo.id);
      });
    });
  }

  const updateNextTodo = (todo) => {
    let nextTodo = document.getElementById(`${todo.id}-todo-next`);

    if (nextTodo) {
      nextTodo.innerHTML = `
      <strong>${todo.title}</strong>
      <time>${todo.time}</time>
      `
    }
  }

  const populateTodos = (projectId, sortType) => {
    let todoData;
    
    if (projectId !== false) {
      todoData = ProjectArchive.getProjectAt(projectId).getTodos();
    } else {
      if (sortType === 'DATE') {
        todoData = TodoArchieve.todosByNewest();
      } else if (sortType === 'PRIORITY') {
        todoData = TodoArchieve.todosByPriority();
      }  else if (sortType === 'COMPLETED') {
        todoData = TodoArchieve.completedTodos();
      }  else if (sortType === 'INCOMPLETED') {
        todoData = TodoArchieve.incompletedTodos();
      }  else if (sortType === 'EXPIRED') {
        todoData = TodoArchieve.expiredTodos();
      }
    }
    
    containerTodos.innerHTML = ``;
    todoData.forEach(t => {
      let todo = t.getTodoInfo();
      containerTodos.innerHTML += `<article id="${todo.id}-todo" class="todo ${ todo.completed ? 'checked' : ''}">
      <input type="checkbox" ${ todo.completed ? 'checked="true"' : ''} class="todo-complete" data-todo="${todo.id}">
      <div class="todo-date">
          <time datetime="2020-02-14 20:00">${todo.time}</time>
          <time datetime="2020-02-14 20:00">${todo.date}</time>
      </div>
      <h4 class="todo-title">${todo.title}</h4>
      <div class="todo-priority todo-${todo.priority}">${todo.priority}</div>
      <button type="button" class="todo-edit add-btn edit-btn" data-todo="${todo.id}"><i class="far fa-edit" data-todo="${todo.id}"></i></button>
      <button type="button" class="todo-delete add-btn delete-btn" data-todo="${todo.id}" data-project="${todo.project}"><i class="fas fa-times" data-todo="${todo.id}" data-project="${todo.project}"></i>
      </button>                 
  </article>`
    });
    addEventToTodos([...document.getElementsByClassName('todo')]);

    [...document.getElementsByClassName('todo-delete')].forEach(btn => {
      btn.addEventListener('click', e => deleteTodo(e.target) )
    });
    [...document.getElementsByClassName('todo-complete')].forEach(checkbox => {
      checkbox.addEventListener('change', e => toggleCompleteTodo(e.target))
    });
    [...document.getElementsByClassName('todo-edit')].forEach(editBtn => {
      editBtn.addEventListener('click', e => editTodo(e.target))
    });
  };

  populateTodos(0);

  const activeProject = (project) => {
    projectsContainer.scrollTo(0, 0);
    project.classList.add('project-active');
    openProject.id = `${project.id}-open`;
    openProject.classList = `main-list main-${project.id}`;
    openProject.querySelector('h1').innerText = project.innerText;
    containerTodos = document.getElementById('container-todos');
    let projectId = turnNumber(project.id);  
    populateTodos(projectId);
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

  // Populate projects fomr Project Archive
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
  }

  const addEventToEdit = (todo) => {
    document.getElementById('todo-update').addEventListener('click', e => {
      let updatedTodoInfo = {};

      const newTitle = modal.getElementsByClassName('todo-title')[0].innerText;
      const newDescription = modal.getElementsByClassName('todo-description')[0].innerText;
      let newPriority = modal.getElementsByClassName('priority')[0].innerText.toLowerCase();
      let newDuration = parseInt(modal.getElementsByClassName('duration')[0].innerText);
      let newDate = modal.getElementsByClassName('day-time')[0].innerText;
      const newTags = modal.getElementsByClassName('todo-new-tags')[0].innerText;

      if (['low', 'normal', 'high'].includes(newPriority)) {
        updatedTodoInfo.duration = ['low', 'normal', 'high'].indexOf(newPriority);
      } else {
        newPriority = false;
      }

      if (isNaN(newDuration)) {
        newDuration = false;
      }

      newDate = newDate.match(/\b\d\d\d\d\/\d\d\/\d\d\b/)

      if (newDate === null) {
        newDate = false;
      } else {
        newDate = newDate[0];
      }

      updatedTodoInfo.title = newTitle;
      updatedTodoInfo.description = newDescription;
      updatedTodoInfo.priority = newPriority;
      updatedTodoInfo.duration = newDuration;
      updatedTodoInfo.date = newDate;
      updatedTodoInfo.tags = newTags;

      todo.editTodo(updatedTodoInfo);

      updatedTodoInfo = todo.getTodoInfo();

      populateTodos(updatedTodoInfo.project);

      updateNextTodo(updatedTodoInfo);

      modal.classList.add('modal-closed');
    })
  }

  const updateProject = (project) => {
    const editablePro = document.getElementById(`${project.id}-pro`);
    editablePro.innerText = project.title;

    activeProject(editablePro);
  }

  editProjectBtn.addEventListener('click', e => {
    const newProject = {
      title: '',
      description: ''
    }

    const projectId = turnNumber(openProject.id);
    const projectData = ProjectArchive.getProjectAt(projectId).getProjectInfo();
    modalContent.innerHTML = projectDetails(projectData, true);
    modal.classList.remove('modal-closed');

    document.getElementById('project-update').addEventListener('click', e => {
      const projectId = parseInt(e.target.dataset.project);

      const updatedProTitle = modal.querySelector('.project-title').innerText;
      const updatedProDescription = modal.querySelector('.project-description').innerText;
      
      newProject.title = updatedProTitle;
      newProject.description = updatedProDescription;

      const updatedProject = ProjectArchive.getProjectAt(projectId).editProject(newProject);
      updateProject(updatedProject);
      modal.classList.add('modal-closed');
    })
  });

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

  const openTodos = (btn) => {
    let sibling = btn.nextElementSibling;
    sibling.classList.toggle('collapsed');
    if (sibling.classList.contains('collapsed')) {
      btn.querySelector('span').innerText = 'View all';
    } else {
      btn.querySelector('span').innerText = 'Hide';
    }
  }

  const addNewTodo = (projectId, newTodo) => {
    let todoData;// = ProjectArchive.getProjectAt(projectId).getTodos();
    //todoData = todoData[todoData.length - 1];
    console.log(newTodo.getTodoInfo());
    
    todoData = newTodo.getTodoInfo();

    containerTodos.innerHTML += ` <article id="${todoData.id}-todo" class="todo">
            <input type="checkbox" class="todo-complete"  data-todo="${todoData.id}">
            <div class="todo-date">
                <time datetime="2020-02-14 20:00">${todoData.time}</time>
                <time datetime="2020-02-14 20:00">${todoData.date}</time>
            </div>
            <h4 class="todo-title">${todoData.title}</h4>
            <div class="todo-priority todo-${todoData.priority}">${todoData.priority}</div>
            <button type="button" class="todo-edit add-btn edit-btn" data-todo="${todoData.id}"><i class="far fa-edit" data-todo="${todoData.id}"></i></button>
            <button type="button" class="todo-delete add-btn delete-btn" data-todo="${todoData.id}" data-project="${todoData.project}"><i class="fas fa-times"  data-todo="${todoData.id}" data-project="${todoData.project}"></i>
            </button>                 
        </article>`;

    const currentTodos = document.getElementsByClassName('todo');
    addEventToTodos([...currentTodos]);
    [...document.getElementsByClassName('todo-delete')].forEach(btn => {
      btn.addEventListener('click', e => deleteTodo(e.target));
    });
    [...document.getElementsByClassName('todo-complete')].forEach(checkbox => {
      checkbox.addEventListener('change', e => toggleCompleteTodo(e.target));
    });
    [...document.getElementsByClassName('todo-edit')].forEach(editBtn => {
      editBtn.addEventListener('click', e => editTodo(e.target));
    });
    openTodos(viewTodosBtn);
  };

  addTodo.addEventListener('click', () => {
    openProject = document.getElementsByClassName('main-list')[0];
    modalContent.innerHTML = todoForm(turnNumber(openProject.id));
    modal.classList.remove('modal-closed');

    const newTodoForm = document.getElementById('todo-form');
    newTodoForm.addEventListener('submit', (e) => {
      modal.classList.add('modal-closed');

      let formValues = {};

      [...e.target].forEach((element, i, arr) => {
        if (i == arr.length - 1) return;
        if (element.name === 'project') {
          formValues[`${element.name}`] = parseInt(element.value);          
        } else {
          formValues[`${element.name}`] = element.value;
        }
      });
      let newTodo = ProjectArchive.getProjectAt(turnNumber(openProject.id)).addTodo(formValues);

      let projectId = turnNumber(openProject.id);
      

      addNewTodo(projectId, newTodo);

      e.preventDefault();
    });

  });

  projectTitle.addEventListener('click', () => {
    const projectId = turnNumber(openProject.id);
    const projectData = ProjectArchive.getProjectAt(projectId).getProjectInfo();
    modalContent.innerHTML = projectDetails(projectData);
    modal.classList.remove('modal-closed');
    modalContent.setAttribute('data-type', projectData.id);
    document.getElementById('project-delete').addEventListener('click', e => deleteProject(e.target))
  });

  [...showMore].forEach(btn => {
    btn.addEventListener('click', () => {
      openTodos(btn);
    });
  });
};

export default ui;