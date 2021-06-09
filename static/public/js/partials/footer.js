const currentPage = window.location.pathname.split('/')[1];
const footerList = document.querySelector('.bottom-nav > nav > ul');

switch (currentPage) {
   case 'filter':
    footerList.children[0].classList.add('currentPage');
    break;
  case 'chat':
    footerList.children[1].classList.add('currentPage');
    break;
  case 'profiles':
    footerList.children[2].classList.add('currentPage');
    break;
}
