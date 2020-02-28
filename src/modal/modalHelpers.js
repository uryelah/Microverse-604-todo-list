const modalHelpers = (function helper() {
  let modal;
  let modalContent;

  return {
    open(content, dataType) {
      modal = document.getElementById('modal');
      modalContent = modal.querySelector('#modal-content');
      modal.classList.remove('modal-closed');
      modalContent.innerHTML = content;
      modalContent.setAttribute('data-type', dataType);
    },

    close() {
      modal.classList.add('modal-closed');
    },

    getTodoUpdates() {
      return {
        title: modal.getElementsByClassName('title')[0].innerText,
        description: modal.getElementsByClassName('description')[0].innerText,
        priority: modal.getElementsByClassName('priority')[0].innerText.toLowerCase(),
        duration: parseInt(modal.getElementsByClassName('duration')[0].innerText, 10),
        date: modal.getElementsByClassName('date')[0].innerText,
        tags: modal.getElementsByClassName('tags')[0].innerText,
      };
    },

    getProjectUpdates() {
      return {
        title: modal.getElementsByClassName('title')[0].innerText,
        description: modal.getElementsByClassName('description')[0].innerText,
      };
    },
  };
}());

export default modalHelpers;
