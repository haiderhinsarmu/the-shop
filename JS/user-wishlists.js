const wepApp = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { hideHeader  } from './template.js';


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
      hideHeader();

      /// display  wishlist
      // Fetching wishlists from local storage
      let wishlists = JSON.parse(localStorage.getItem('favoriteItems')) || [];
      const wishListWraper = document.querySelector('.wishlists-wrapper');

      const wishListFunction = () => {
        wishListWraper.innerHTML = '';
        if (wishlists.length > 0) {
          wishlists.forEach((wishItem) => {
            const newWishList = document.createElement('div');
            newWishList.classList.add('wishlists-item');
            newWishList.innerHTML = `
        <a href="/HTML/details.html?id=${wishItem.id}">
          <div class="item-image">
            <img src="${wishItem.mainImage}" alt="${wishItem.title}">
          </div>
          <div class="item-details">
            <h2>${wishItem.title}</h2>
          </a>
          <p data-size="${wishItem.size}">Size: ${wishItem.size}</p>
          <p> Price: ${wishItem.price}</p>
          <div class="item-actions">
            <button data-id="${wishItem.id}" data-size="${wishItem.size}" class="delete-btn">Delete</button>
          </div>
        </div>
      `;
            wishListWraper.appendChild(newWishList);
          });
        } else {
          wishListWraper.innerHTML = `
      <div class="empty-wishlists">
        <p>No wishlist yet.</p>
        <p>Add items to your wishlist by clicking on the "Add to Wishlist" button on the product details or home page.</p>
      </div>
    `;
        }
      };

      wishListFunction();

      wishListWraper.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
          e.stopPropagation();
          const itemId = parseInt(e.target.dataset.id);
          const size = e.target.dataset.size;
      
      
          wishlists = wishlists.filter(item => !(item.id === itemId && (item.size === size || !item.size)));
      
          localStorage.setItem('favoriteItems', JSON.stringify(wishlists));
          wishListFunction();
        }
      });
      
      
      
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error(error);
  }
};
