const wepApp = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { userFunction, upDateCartCounter, hideHeader } from './template.js';

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

      // Displaying the ordered items
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const orderdThingsWraper = document.querySelector('.ordered-Wrapper');
      const orderNumber = document.getElementById('Your-order-number');
      const totalPriceElement = document.getElementById('total-price');
      const totalQuantityElement = document.getElementById('total-quantity');

      const orderedThings = () => {
        orderdThingsWraper.innerHTML = '';
        if (cartItems.length > 0) {
          let totalPrice = 0;
          let totalQuantity = 0;

          cartItems.forEach((cartItem) => {
            const newOrderd = document.createElement('div');
            newOrderd.classList.add('ordered-item');
            newOrderd.innerHTML = `
              <a href="/HTML/details.html?id=${cartItem.id}">
                <div class="item-image">
                  <img src="${cartItem.mainImage}" alt="${cartItem.title}">
                </div>
              </a>
              <div class="item-description">
                <p>${cartItem.title}</p>
                <p>Size: ${cartItem.size}</p>
                <p>Price: ${cartItem.price}</p>
              </div>
            `;
            orderdThingsWraper.appendChild(newOrderd);

            totalPrice += parseFloat(cartItem.price.replace('$', ''));
            totalQuantity += 1; 
          });

          totalPriceElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
          totalQuantityElement.innerHTML = `Total Quantity: ${totalQuantity}`;
        } else {
          orderdThingsWraper.innerHTML = `
            <div class="cart-empty">
              <p>No ordered items yet</p>
              <p>Start shopping by adding items to your cart</p>
            </div>
          `;
        }
      };
      orderedThings();
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error(error);
  }
};

