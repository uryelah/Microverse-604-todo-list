var modalHelpers = (function () {
    const modal = document.getElementById("modal");
    const modalContent = modal.querySelector('#modal-content');

    return {
        open: function (content, dataType) {
            modal.classList.remove('modal-closed');
            modalContent.innerHTML = content;
            modalContent.setAttribute('data-type', dataType);
        },

        close: function () {
            modal.classList.add('modal-closed');
        },
    }
})();

export default modalHelpers;