const todoForm = (projectId) => `<h2>New Todo</h2>
    <form id="todo-form" class="modal-form">
        <div>
            <label for="todo-title">
            Title:
            </label>
            <input type="text" name="title" id="todo-title" required>
            <span class='required'>(required field)</span>
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
            <span class='required'>(required field)</span>
        </div>
    
        <div>
            <label for="todo-date">
            Due at:
            </label>
            <input type="date" name="date" id="todo-date" required>
            <span class='required'>(required field)</span>
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
            <input type="text" name="tags" id="todo-tag">
            <small>Separate each tag with a comma.</small>
        </div>
        <div>
            <label for="todo-description">
            Description:
            </label>
            <textarea type="text" name="description" id="todo-description" required></textarea>
            <span class='required'>(required field)</span>
        </div>
        <input type="hidden" name="project" id="todo-project" value="${projectId}">
    
        <button type="submit" class='action-btn'>Add todo</button>
    </form>`;

export default todoForm;
