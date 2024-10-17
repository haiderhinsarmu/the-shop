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

      const personalForm = document.getElementById('personalForm');

      personalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
      
        const fristName = document.getElementById('fristName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const houseNumber = document.getElementById('houseNumber').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postalCode').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const country = document.getElementById('country').value;
      
        const errorMessage = document.querySelector('.error-message');
        const successMessage = document.querySelector('.success-message');
      
        // Messages
        const showError = (message) => {
          errorMessage.textContent = message;
          successMessage.textContent = '';
          errorMessage.classList.add('active');
        };
      
        const showSuccess = (message) => {
          successMessage.textContent = message;
          errorMessage.textContent = '';
          successMessage.classList.add('active');
        };
      
        // Validate all fields
        if (
          fristName === '' || lastName === '' || email === '' || phone === '' ||
          address === '' || houseNumber === '' || city === '' || postalCode === '' ||
          country === ''
        ) {
          showError('Please fill in all fields');
          return;
        }
      
        // Validate email
        const validEmail = () => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
        };
      
        if (!validEmail(email)) {
          showError('Please enter a valid email');
          return;
        }
      
        // Validate phone number
        const validPhone = () => {
          const re = /^\d+$/;
          return re.test(phone);
        };
      
        if (!validPhone(phone)) {
          showError('Please enter a valid phone number');
          return;
        }
      
        showSuccess('Form submitted successfully');
      
        if (rememberMe) {
          localStorage.setItem('personalForm', JSON.stringify({
            fristName, lastName, email, phone, address, houseNumber, city, postalCode, country
          }));
        }
      
        // Reset the form
        document.getElementById('personalForm').reset();
      
        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.textContent = '';
          successMessage.classList.remove('active');
          successMessage.textContent = '';
        }, 3000);
      

        const personalFormData = {
          fristName, lastName, email, phone, address, houseNumber, city, postalCode, country
        }

        try {
          const serverRes = fetch('CheckOut', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(personalFormData),
          });
          if (!serverRes.ok) {
            throw new Error(`Failed to fetch data: ${serverRes.status}`);
          } else {
            const data = await serverRes.json();

            showSuccess('Form submitted successfully')
            setTimeout(() => {
              errorMessage.classList.remove('active');
              errorMessage.textContent = '';
              successMessage.classList.remove('active');
              successMessage.textContent = '';
            }, 3000);

            window.location.href = '/HTML/payment.html';
          }
        } catch (error) {
          showError(`Error: ${error.message}`)
        }

      });
      
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error fetching template HTML:', error);
  }
};
