const projectForm = `<h2>New Project</h2>
<form id="project-form" class="modal-form" onsubmit="return false">
    <div>
        <label for="project-title">
        Project title:
        </label>
        <input type="text" name="title" id="project-title">
    </div>

    <div>
        <label for="project-description">
        Project description:
        </label>
        <input type="text" name="description" id="project-description">
    </div>
    <input type="hidden" name="creator" id="project-creator" value="user">

    <button type="button">Add Project</button>
</form>`

const ui = () => {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector('#modal-content');
  const hideModal = modal.querySelector('#modal-hide');
  const addProjectBtn = document.getElementById("add-project");

  const projectsContainer = document.getElementById('all-projects');
  const projects = document.getElementsByClassName('project');
  const openProject = document.getElementsByClassName('main-list')[0];

  hideModal.addEventListener('click', () => {
    modal.classList.add('modal-closed');
  });

  addProjectBtn.addEventListener('click', () => {
    modalContent.innerHTML = projectForm;
    modal.classList.remove('modal-closed');
  });

  [...projects].forEach((project, i, arr) => {
    project.addEventListener('click', () => {
      arr.forEach(p => {
        if (p === project) {
          projectsContainer.scrollTo(0, 0);
          p.classList.add('project-active');
        } else {
          p.classList.remove('project-active');
        }
      });
    });
  });
};

export default ui;