const app = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { userFunction, upDateCartCounter, hideHeader,  } from '../JS/template.js';

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
      userFunction();
      upDateCartCounter();
      hideHeader();

      /// creating the the cart item
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let quantity = JSON.parse(localStorage.getItem('quantity')) || 0;

      const cartWraper = document.querySelector('.cartItem-Wrapper');

      const displayCartItem = () => {
        cartWraper.innerHTML = '';
        if (cartItems.length > 0) {
          cartItems.forEach((cartItem) => {
            const id = cartItem.id;
            const newCart = document.createElement('div');
            newCart.classList.add('cartItem-item');
            newCart.innerHTML = `
                   <div class="item-image">
                       <a href="/HTML/details.html?id=${id}">
                           <img src="${cartItem.mainImage}" alt="${cartItem.title}">
                       </a>
                   </div>
                   <div class="item-description">
                       <div class="item-title">
                           <p>${cartItem.title}</p>
                       </div>
                       <div class="item-size">
                           <p data-size="${cartItem.size}">Size: ${cartItem.size}</p>
                       </div>
                       <div class="item-price">
                           <p>Price: ${cartItem.price}</p>
                       </div>
                        <div class="item-wishlist">
                         <p class="wishlist" data-id="${cartItem.id}">Add to Wishlist 
                          <span class="material-symbols-outlined" data-id="${cartItem.id}" data-size="${cartItem.size}">
                            favorite_border
                            </span>
                         </p>
                       </div>
                       <div class="item-delete">
                           <span class="material-symbols-outlined" data-id="${cartItem.id}" data-size="${cartItem.size}">
                               delete
                           </span>
                       </div>
                       <div class="item-quantity">
                           <div class="quantity-decrease">
                               <span class="material-symbols-outlined" data-id="${cartItem.id}" data-size="${cartItem.size}">
                                   remove_circle_outline
                               </span>
                           </div>
                           <div class="quantity">
                               <p data-id="${cartItem.id}" id="quantity">${cartItem.quantity}</p>
                           </div>
                           <div class="quantity-increase">
                               <span class="material-symbols-outlined" data-id="${cartItem.id}" data-size="${cartItem.size}">
                                   add_circle_outline
                               </span>
                           </div>
                       </div>
                   </div>
               `;
            cartWraper.appendChild(newCart);
          });
        }else {
          cartWraper.innerHTML = `
          <div class="cart-empty">
          <p>No items in the cart</p>
          <p>Start shopping by adding items to your cart</p>
          </div>
          `;
        }
      };
      displayCartItem();

      // Handle all actions in a single event listener
      cartWraper.addEventListener('click', (e) => {
        if (e.target.classList.contains('material-symbols-outlined')) {
          const itemId = parseInt(e.target.dataset.id);
          const itemSize = e.target.dataset.size;

          if (e.target.textContent.trim() === 'delete') {
            cartItems = cartItems.filter(
              (item) => !(item.id === itemId && item.size === itemSize)
            );
            quantity--;
          } else if (e.target.textContent.trim() === 'remove_circle_outline') {
            cartItems = cartItems.map((item) => {
              if (item.id === itemId && item.size === itemSize) {
                if (item.quantity > 0) {
                  item.quantity--;

                  if (item.quantity < -1) {
                    cartItems = cartItems.filter(
                      (item) => !(item.id === itemId && item.size === itemSize)
                    );
                    quantity--;
                    upDateCartCounter();
                    displayCartItem();
                  }
                }
              }
              return item;
            });
          } else if (e.target.textContent.trim() === 'add_circle_outline') {
            cartItems = cartItems.map((item) => {
              if (item.id === itemId && item.size === itemSize) {
                item.quantity++;
                quantity++;
              }
              return item;
            });
          }

          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          localStorage.setItem('quantity', JSON.stringify(quantity));
          displayCartItem();
          upDateCartCounter();
          calculateTotalPrice();
          calculateTotalQuantity();
        }
      });

      const calculateTotalPrice = () => {
        const total = document.getElementById('Total-Price');
        let TotalPrice = 0;
        cartItems.forEach((item) => {
          const price = parseFloat(item.price.replace('$', ''));
          if (!isNaN(price) && typeof item.quantity === 'number') {
            TotalPrice += price * item.quantity;
          }
          total.innerHTML = `Total Price: $${TotalPrice.toFixed(2)}`;
          localStorage.setItem('TotalPrice', JSON.stringify(TotalPrice));
        });
      };
      calculateTotalPrice();

      const calculateTotalQuantity = () => {
        const Quantity = document.getElementById('Total-Quantity');
        let TotalQuantity = 0;
        cartItems.forEach((item) => {
          TotalQuantity += item.quantity;
          Quantity.innerHTML = `Total Quantity: ${TotalQuantity}`;
          localStorage.setItem('TotalQuantity', JSON.stringify(TotalQuantity));
        });
      };
      calculateTotalQuantity();
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`
    console.error('Error:', error);
  }
};
