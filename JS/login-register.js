const app = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');

import { hideHeader } from './template.js';

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

      // toggle the login and register
      const registerContainer = document.querySelector('.register-container');
      const rigister = document.querySelector('.register-login-switch');
      const login = document.querySelector('.login-register-switch');

      rigister.addEventListener('click', () => {
        registerContainer.classList.toggle('slide');

        rigister.textContent =
          rigister.textContent === 'Register' ? 'Login' : 'Register';
        login.textContent =
          login.textContent === 'Login' ? 'Register' : 'Login';
      });

      /// validating the login
      const loginForm = document.getElementById('loginForm');

      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let userName = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let rememberMe = document.getElementById('rememberMe').checked;

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

        userName =
          userName === '' ? showError('Please enter your username') : userName;
        userName =
          userName.length < 5
            ? showError('Username must be at least 5 characters long')
            : userName;
        password =
          password === '' ? showError('Please enter your password') : password;
        password =
          password.length < 5
            ? showError('Password must be at least 5 characters long')
            : password;

        userName && password ? showSuccess('Logged in successfully') : null;
        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.textContent = '';
          succsessMessage.classList.remove('active');
          succsessMessage.textContent = '';
        }, 3000);

        rememberMe = rememberMe
          ? localStorage.setItem(
              'userData',
              JSON.stringify({ userName: { userName: userName } })
            )
          : null;
        // resetting the form
        document.getElementById('loginForm').reset();

        const loginFormData = {
          userName: userName,
          password: password,
        };

        try {
          const serverRes = fetch('/Login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginFormData),
          });
          if (!serverRes.ok) {
            throw new Error(`Failed to login: ${serverRes.status}`);
          } else {
            const userData = await serverRes.json();
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('token', userData.token);
            localStorage.setItem('isLoggedIn', true);
            showSuccess('Logged in successfully');
            setTimeout(() => {
              errorMessage.classList.remove('active');
              errorMessage.textContent = '';
              succsessMessage.classList.remove('active');
              succsessMessage.textContent = '';
            }, 3000);
            window.location.href = '/';
            window.location.reload();
          }
        } catch (error) {
          showError('Failed to login');
          setTimeout(() => {
            errorMessage.classList.remove('active');
            errorMessage.textContent = '';
            succsessMessage.classList.remove('active');
            succsessMessage.textContent = '';
          }, 3000);
        }
      });

      /// showing and hiding the password
      const showPassword = document.getElementById('loginVisibility');
      const hidePassword = document.getElementById('loginVisibilityOff');

      hidePassword.style.display = 'none';
      showPassword.addEventListener('click', () => {
        document.getElementById('password').type = 'text';
        showPassword.style.display = 'none';
        hidePassword.style.display = 'Block';
      });

      hidePassword.addEventListener('click', () => {
        document.getElementById('password').type = 'password';
        hidePassword.style.display = 'none';
        showPassword.style.display = 'block';
      });
    }




    //// validating the register
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      let firstName = document.getElementById('firstName').value;
      let lastName = document.getElementById('lastName').value;
      let email = document.getElementById('email').value;
      let phone = document.getElementById('phone').value;
      let password = document.getElementById('RegisretPassword').value;
      let confirmPassword = document.getElementById('confirmPassword').value;
      let terms = document.getElementById('terms').checked;

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

      firstName =
        firstName === ''
          ? showError('Please enter your first name')
          : firstName;
      firstName =
        firstName.length < 5
          ? showError('First name must be at least 2 characters long')
          : firstName;
      lastName =
        lastName === '' ? showError('Please enter your last name') : lastName;
      lastName =
        lastName.length < 5
          ? showError('Last name must be at least 2 characters long')
          : lastName;
      email =
        email === '' ? showError('Please enter your email address') : email;
      const validEmail = () => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };
      
      email = validEmail()
        ? email
        : showError('Please enter a valid email address');

       // Validate phone number
       const validPhone = () => {
        const re = /^\d+$/;
        return re.test(phone);
      };
    
      phone = validPhone() ? phone : 
      showError('Please enter a valid phone number');

      password =
        password === '' ? showError('Please enter your password') : password;
      password =
        password.length < 5
          ? showError('Password must be at least 5 characters long')
          : password;
      confirmPassword =
        confirmPassword === ''
          ? showError('Please confirm your password')
          : confirmPassword;
      confirmPassword =
        confirmPassword !== password
          ? showError('Passwords do not match')
          : confirmPassword;
      terms = terms
        ? terms
        : showError('Please agree to the terms and conditions');

      firstName &&
      lastName &&
      email &&
      phone &&
      password &&
      confirmPassword &&
      terms
        ? showSuccess('Registration successful')
        : null;
      setTimeout(() => {
        errorMessage.classList.remove('active');
        errorMessage.textContent = '';
        succsessMessage.classList.remove('active');
        succsessMessage.textContent = '';
      }, 3000);

      // resetting the form
      document.getElementById('registerForm').reset();

      const registerFormData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
      };

      try {
        const serverRes = fetch('/Register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerFormData),
        });
        if (!serverRes.ok) {
          throw new Error(`Failed to register: ${serverRes.status}`);
        } else {
          const userData = await serverRes.json();
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('token', userData.token);
          showSuccess('Registration successful');
          setTimeout(() => {
            errorMessage.classList.remove('active');
            errorMessage.textContent = '';
            succsessMessage.classList.remove('active');
            succsessMessage.textContent = '';
          }, 3000);
          window.location.href = '/HTML/login-register.html';
          window.location.reload();
        }
      } catch (error) {
        showError('Failed to register');
        setTimeout(() => {
          errorMessage.classList.remove('active');
          errorMessage.textContent = '';
          succsessMessage.classList.remove('active');
          succsessMessage.textContent = '';
        }, 3000);
      }
    });



    const visibility = document.getElementById('confirmVisibility');
    const visibility_off = document.getElementById('confirmVisibility_off');

    visibility_off.style.display = 'none';

    visibility.addEventListener('click', () => {
      document.getElementById('RegisretPassword').type = 'text';
      document.getElementById('confirmPassword').type = 'text';
      visibility.style.display = 'none';
      visibility_off.style.display = 'block';
    });

    visibility_off.addEventListener('click', () => {
      document.getElementById('RegisretPassword').type = 'password';
      document.getElementById('confirmPassword').type = 'password';
      visibility_off.style.display = 'none';
      visibility.style.display = 'block';
    });

  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error fetching template HTML:', error);
  }
};
