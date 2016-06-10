var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('.admin-add-fab');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});