const projectForm = `<h2>New Project</h2>
<form id="project-form" class="modal-form">
    <div>
        <label for="project-title">
        Project title:
        </label>
        <input type="text" name="title" id="project-title" required>
        <span class='required'>(required field)</span>
    </div>

    <div>
        <label for="project-description">
        Project description:
        </label>
        <textarea name="description" id="project-description" required></textarea>
        <span class='required'>(required field)</span>
    </div>
    <input type="hidden" name="creator" id="project-creator" value="user">

    <button type="submit" class='action-btn'>Add Project</button>
</form>`;

export default projectForm;
