const app = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');

import { hideHeader } from '../JS/template.js';

window.addEventListener('DOMContentLoaded', () => {
  template();
});

const template = async () => {
  try {
    const res = await fetch('/HTML/template.html');
    if (!res.ok) {
      throw new Error(`Failed to load: ${res.status}`);
    } else {
      const html = await res.text();
      app.innerHTML = html;
      const contentTab = document.getElementById('content-Tab');
      contentTab.innerHTML = temporary.innerHTML;
      temporary.innerHTML = '';
      hideHeader();

      const form = document.getElementById('forgot-password-form');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const errorMessage = document.querySelector('.error-message');
        const succsessMessage = document.querySelector('.success-message');

        // messages
        const showError = (message) => {
          errorMessage.textContent = message;
          succsessMessage.textContent = '';
          errorMessage.classList.add('active');
        };

        const showSuccess = (message) => {
          succsessMessage.textContent = message;
          errorMessage.textContent = '';
          succsessMessage.classList.add('active');
        };

        if(email === '') {
          showError('Please enter your email');
          return;
        }
        
        const validEmail = () => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
        };
        
        // validate email
        validEmail()
        ? showSuccess('Valid email')
        : showError('Please enter a valid email');
        
        showSuccess('Email sent successfully');
        // reset the form  
        document.getElementById('forgot-password-form').reset();

        
        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.textContent = '';
          succsessMessage.classList.remove('active');
          succsessMessage.textContent = '';
        }, 3000);
        
        const forgotFormData = {
          email,
        };
        
        try {
          const serverRes = fetch('/Forgot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(forgotFormData),
          });
          if (!serverRes.ok) {
            throw new Error(`Failed to fetch data: ${serverRes.status}`);
          } else {
            const data = await serverRes.json();
            console.log('Server response:', data);
            showSuccess('Email sent successfully');
            
            setTimeout(() => {
              errorMessage.classList.remove('active');
              errorMessage.textContent = '';
              succsessMessage.classList.remove('active');
              succsessMessage.textContent = '';
            }, 3000);
          }
        } catch (error) {
          showError(`Error: ${error.message}`);
        }
      });
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error fetching template HTML:', error);
  }
};
