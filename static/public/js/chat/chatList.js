const images = document.querySelectorAll('.imgSelf');
images.forEach((image) =>
    fetch(image.src, { method: 'HEAD' })
        .then((res) => {
            if (!res.ok) {
                image.src = '/uploads/defaultUser.png';
            }
        })
        .catch((err) => console.log('Error:', err))
);
