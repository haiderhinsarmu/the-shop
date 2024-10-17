const wepApp = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { userFunction, upDateCartCounter, adminAcountFunction, logoutFunction, hideHeader } from '../JS/template.js';

window.addEventListener('DOMContentLoaded', () => {
  template();
});

const template = async () => {
  try {
    const rest = await fetch('/HTML/template.html');

    if (!rest.ok) {
      throw new Error(`Failed to load: ${rest.status}`);
    } else {
      const html = await rest.text();
      wepApp.innerHTML = html;
      const contentTab = document.getElementById('content-Tab');
      contentTab.innerHTML = temporary.innerHTML;
      temporary.innerHTML = '';
      userFunction();
      logoutFunction();
      upDateCartCounter();
      adminAcountFunction();
      hideHeader();

      const toorderdList = document.querySelector('.user-order');
      const toWishList = document.querySelector('.user-wishlist');
      const toEdit = document.querySelector('.user-edit');
      const toLogout = document.querySelector('.user-logout');
      
      toorderdList.addEventListener('click', () => {
        window.location.href = '/HTML/user-orders.html';
      });

      toWishList.addEventListener('click', () => {
        window.location.href = '/HTML/user-wishlists.html';
      });

      toEdit.addEventListener('click', () => {
        window.location.href = '/HTML/user-edit.html';
      });

      toLogout.addEventListener('click', () => {
        window.location.href = '/HTML/logout.html';
      });
    
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error(error);
  }
};
