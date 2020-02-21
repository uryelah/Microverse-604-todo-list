const projectDetails = (project, edit = false) => {
    const deleteBtn = `<button id="project-delete" type="button" data-project='${project.id}'>Delete</button>`;
    const editBtn = `<button id="project-update" type="button" data-project='${project.id}'>Update Project</button>`;
    const projectCreator = `<p class="project-creator">Created by: ${project.creator}</p>`;
    const todos = `<div class="project-todo-today"><h3>Todos in this project: ${project.todos.length}</h3></div>`;

    return `<article id="0-project-open" class="modal-details project-details">
      <h2 ${ edit ? 'contenteditable="true" class="editable-content ' : 'class="'}project-title title">${project.title}</h2>
      ${ !edit ? projectCreator : ''}
      <p ${ edit ? 'contenteditable="true" class="editable-content ' : 'class="'}project-description description">${project.description}</p>
      ${ !edit ? todos : ''}
      ${ !edit ? deleteBtn : editBtn}             
    </article>`
}

export default projectDetails;