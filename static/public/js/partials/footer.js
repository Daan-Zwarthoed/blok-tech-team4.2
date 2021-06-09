const currentPage = window.location.pathname.split('/')[1];
const footerList = document.querySelector('.bottom-nav > nav > ul');

if (currentPage === 'filter') footerList.children[0].classList.add('currentPage');

if (currentPage === 'chat') footerList.children[1].classList.add('currentPage');

if (currentPage === 'profiles') footerList.children[2].classList.add('currentPage');
