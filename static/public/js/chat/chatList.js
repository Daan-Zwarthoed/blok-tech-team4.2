const images = document.querySelectorAll('.imgSelf');
const hiddenImage = document.querySelector('.hiddenImage');

const loadImage = function (image) {
    hiddenImage.src = image.src;
    if (hiddenImage.width === 0) {
        image.src = '/images/defaultUser.png';
    }
    hiddenImage.src = '';
};

images.forEach((image) => loadImage(image));
hiddenImage.remove();
