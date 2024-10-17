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

      const paymentForm = document.getElementById('paymentForm');

      paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cardHolderName = document.getElementById('cardHolderName').value;
        const birthDate = document.getElementById('birthDate').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expirationDate = document.getElementById('expirationDate').value;
        const cvv = document.getElementById('cvv').value;
        const visa = document.getElementById('visa').checked;
        const masterCard = document.getElementById('masterCard').checked;
        const paypal = document.getElementById('paypal').checked;

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

        if (
          cardHolderName === '' ||
          birthDate === '' ||
          cardNumber === '' ||
          expirationDate === '' ||
          cvv === ''
        ) {
          showError('Please fill in all fields');
          return;
        }

        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
          showError('Card number must be 16 digits long and numeric');
          return;
        }

        const validExpirationDate = () => {
          const re = /^(0[1-9]|1[0-2])\/\d+$/;
          return re.test(expirationDate);
        };

        if (!validExpirationDate(expirationDate)) {
          showError('Expiration date must be in MM/YY format');
          return;
        }

        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
          showError('CVV must be 3 digits long and numeric');
          return;
        }

        if (!visa && !masterCard && !paypal) {
          showError('Please select a payment method');
          return;
        }

        showSuccess('Payment successful');
        paymentForm.reset();

        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.textContent = '';
          successMessage.classList.remove('active');
          successMessage.textContent = '';
        }, 3000);

        const paymentFormData = {
          cardHolderName,
          birthDate,
          cardNumber,
          expirationDate,
          cvv,
          visa,
          masterCard,
          paypal,
        };

        try {
          const rseverRes = fetch('Payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentFormData),
          });
          if (!rseverRes.ok) {
            throw new Error(`Failed to process payment: ${rseverRes.status}`);
          } else {
            const paymentData = await rseverRes.json();
            showSuccess('Payment processed successfully');
            setTimeout(() => {
              errorMessage.classList.remove('active');
              errorMessage.textContent = '';
              successMessage.classList.remove('active');
              successMessage.textContent = '';
            });
          }
        } catch (error) {
          showSuccess(`Error: ${error.message}`);
        }
      });
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error fetching template HTML:', error);
  }
};
