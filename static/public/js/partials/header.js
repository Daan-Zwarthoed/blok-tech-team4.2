const header = document.querySelector('.header');
const chatHeader = document.querySelector('.chatHeader');
const body = document.querySelector('body');
let lastScrollTop = 0;

function scrollFunction() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (document.documentElement.offsetHeight <= window.innerHeight + st) return body.classList.remove('transition');
    body.classList.add('transition');
    header.classList.add('transition');

    if (st > lastScrollTop) {
        body.classList.remove('bodyPaddingTop');
        header.classList.add('headerUpwards');
        if (chatHeader) chatHeader.classList.add('chatHeaderUpwards');
    } else {
        body.classList.add('bodyPaddingTop');
        header.classList.remove('headerUpwards');
        if (chatHeader) chatHeader.classList.remove('chatHeaderUpwards');
    }

    lastScrollTop = st <= 0 ? 0 : st;
}

window.addEventListener('scroll', scrollFunction);
// Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
