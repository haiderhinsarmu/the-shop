const wepApp = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { userFunction, upDateCartCounter, hideHeader,  } from './template.js';

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
      upDateCartCounter();
      hideHeader();

      
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error(error);
  }
};
