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

      const form = document.getElementById('reset-password-form');

      form.addEventListener('click', async (e) => {
        e.preventDefault();
      
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
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

        if (newPassword === '' || confirmNewPassword === '') {
          showError('Please fill in all fields');
          return;
        }

        if (newPassword.length < 5) {
          showError('Password must be at least 8 characters long');
          return;
        }

        if (newPassword!== confirmNewPassword) {
          showError('Passwords do not match');
          return;
        }
        
        showSuccess('Password reset successful');
        document.getElementById('reset-password-form').reset();
        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.innerHTML = '';
          succsessMessage.classList.remove('active');
          succsessMessage.innerHTML = '';
        }, 3000);


        const reserFormData = {
          newPassword,
        }

        try {
          const serverRes = fetch('/ResetPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reserFormData),
          })
          if (!serverRes.ok) {
            throw new Error(`Failed to reset password: ${serverRes.status}`);
          } else {
            showSuccess('Password reset successful');
            setTimeout(() => {
              errorMessage.classList.remove('active');
              errorMessage.innerHTML = '';
              succsessMessage.classList.remove('active');
              succsessMessage.innerHTML = '';
            }, 3000);
          }
        } catch (error) {
          showError(`Error: ${error.message}`);
        }

      });


      // making password visibil 
      const visibility = document.getElementById('visibility');
      const visibility_off = document.getElementById('visibility_off');

      visibility_off.style.display = 'none';
      visibility.addEventListener('click', () => {
        document.getElementById('new-password').type = 'text';
        document.getElementById('confirm-new-password').type = 'text';
        visibility_off.style.display = 'block';
        visibility.style.display = 'none';
      });

      visibility_off.addEventListener('click', () => {
        document.getElementById('new-password').type = 'password';
        document.getElementById('confirm-new-password').type = 'password';
        visibility_off.style.display = 'none';
        visibility.style.display = 'block';
      });


    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error fetching template HTML:', error);
  }
};
