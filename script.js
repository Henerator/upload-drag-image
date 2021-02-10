const dragContainerElement = document.querySelector('.drag-container');
const attachmentsContainerElement = document.querySelector('.container__attachments');

const classes = {
    dragenter: 'drag-container_state_enter',
    attachment: 'attachment',
    attachmentImage: 'attachment__image',
};

function addEventListener(element, events, handler) {
    events.forEach(eventName => {
        element.addEventListener(eventName, handler);
    });
}

function preventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
}

function addAttachment(src) {
    const attachmentElement = document.createElement('div');
    attachmentElement.classList.add(classes.attachment);

    const imageElement = document.createElement('img');
    imageElement.classList.add(classes.attachmentImage);
    imageElement.src = src;

    attachmentElement.appendChild(imageElement);
    attachmentsContainerElement.appendChild(attachmentElement);
}

const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];

addEventListener(dragContainerElement, dragEvents, preventDefault);
addEventListener(dragContainerElement, ['dragenter'], () => {
    dragContainerElement.classList.add(classes.dragenter);
});
addEventListener(dragContainerElement, ['dragleave', 'drop'], () => {
    dragContainerElement.classList.remove(classes.dragenter);
});
addEventListener(dragContainerElement, ['drop'], (event) => {
    const dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
    const imageFiles = [...dataTransfer.files].filter((file) =>
        file.type.includes('image/')
    );

    if (imageFiles.length === 0) {
		console.log('No image file in the data');
		return;
	}

    imageFiles.forEach(imageFile => {
        const reader = new FileReader();
        reader.onload = (data) => addAttachment(data.target.result);
        reader.readAsDataURL(imageFile);
    });
});
