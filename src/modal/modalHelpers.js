const modalHelpers = (function () {
  let modal;
  let modalContent;

  return {
    open: function (content, dataType) {
      modal = document.getElementById("modal");
      modalContent = modal.querySelector('#modal-content');
      modal.classList.remove('modal-closed');
      modalContent.innerHTML = content;
      modalContent.setAttribute('data-type', dataType);
    },

    close: function () {
      modal.classList.add('modal-closed');
    },

    getTodoUpdates: function () {
      return {
        title: modal.getElementsByClassName('title')[0].innerText,
        description: modal.getElementsByClassName('description')[0].innerText,
        priority: modal.getElementsByClassName('priority')[0].innerText.toLowerCase(),
        duration: parseInt(modal.getElementsByClassName('duration')[0].innerText),
        date: modal.getElementsByClassName('date')[0].innerText,
        tags: modal.getElementsByClassName('tags')[0].innerText,
      }
    },
    
    getProjectUpdates: function () {
      return {
        title: modal.getElementsByClassName('title')[0].innerText,
        description: modal.getElementsByClassName('description')[0].innerText,
      }
    },
  }
})();

export default modalHelpers;