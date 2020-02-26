const todoDetails = (todo, edit = false) => {
  const completeBtn = `<button id="toggle-completed" class="todo-incomplete action-btn ${todo.completed ? 'completed-todo' : ''}" data-todo='${todo.id}' type="button">Complete todo</button>`;
  const editBtn = `<button id="todo-update" type="button" data-todo='${todo.id}' class='action-btn'>Update Todo</button>`;
  const startBtn = `<button type="button" id="start-todo" class="todo-start-btn action-btn" data-todo="${todo.id}" data-title="${todo.title}" data-duration="${todo.duration}">Start task</button>`;
  const createdAt = `<p class="todo-created-at">Created at:<span class="created-at">${todo.createdAt}</span></p>`;
  const completed = `<div class="todo-status">
    <p>Completed: <span class="status status-completed">${todo.completed}</span></p>
  </div>`;
  const tagColors = [
    'card-red',
    'card-green',
    'card-blue',
    'card-yellow',
    'card-green',
    'card-purple',
    'card-orange',
    'card-teal',
    'card-dark-blue',
  ];
  const tags = todo.tags.map(tag => `<p class="todo-tag child-card ${tagColors[Math.floor(Math.random() * tagColors.length)]}">${tag}</p>`).join('');
  const editableTags = `<p contenteditable="true"  class="editable-content todo-new-tags tags">${todo.tags.join(', ')}</p><small>${edit ? 'Separate the tags with commas' : ''}</small>`;

  return `<article id="0-todo-open" class="modal-details todo-details">
  
  <h2 ${edit ? 'contenteditable="true" class="editable-content ' : 'class=" '} todo-title title">${todo.title}</h2> 
  ${edit ? ' ' : completeBtn}
  
  <p ${edit ? 'contenteditable="true" class="editable-content ' : 'class=" '} todo-description description"> ${todo.description}</p>
  
  ${edit ? ' ' : createdAt}
  
  <div class="todo-priority">
      <p>Priority: <span ${edit ? 'contenteditable="true" class="editable-content ' : 'class=" '} priority priority-high">${todo.priority}</span></p>
      <small>${edit ? 'Priority levels: low, normal, high' : ''}</small>
  </div>
  
  <div class="todo-date-time">
      <p class="remaning-time"></p>
      <p ${edit ? 'contenteditable="true" class="editable-content ' : 'class=" '} day-time date">${todo.date}</p>
      <small>${edit ? 'Format: yyyy/mm/dd' : ''}</small>
  </div>
  
  ${edit ? ' ' : completed}
  
  <div class="todo-duration">
      <p>Duration: <span ${edit ? 'contenteditable="true" class="editable-content ' : 'class=" '} duration">${parseInt(todo.duration / 60000, 10)}</span> minutes</p>
      <small>${edit ? 'Enter a number for the minutes this task takes' : ''}</small>
  </div>
  ${edit || todo.duration < 60000 || todo.completed ? ' ' : startBtn}
  <div class="todo-tags">
      <p>Tags:</p>     
      ${edit ? editableTags : tags}
  </div> 
  ${edit ? editBtn : ' '}
  </article>`;
};

export default todoDetails;
