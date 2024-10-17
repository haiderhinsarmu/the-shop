const app = document.getElementById("wep-App");
const temporary = document.getElementById("tempo-Web");

import { hideHeader } from "../JS/template.js";

window.addEventListener("DOMContentLoaded", () => {
  template();
});

const template = async () => {
  try {
    const res = await fetch("/HTML/template.html");
    if (!res.ok) {
      throw new Error(`Failed to load: ${res.status}`);
    } else {
      const html = await res.text();
      app.innerHTML = html;
      const contentTab = document.getElementById('content-Tab');
      contentTab.innerHTML = temporary.innerHTML;
      temporary.innerHTML = '';
      hideHeader();
   
    }
  } catch (error) {
   const contentTab = document.getElementById('content-Tab');
   contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error("Error fetching template HTML:", error);
  }
}