const app = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import { cardBottumMoreButtonFunction, addFevoriteFunction, cardsAnimation, userFunction, contentAnimation, changePages, searchFunction, upDateCartCounter, bottomHeaderLinkFunction, hideBottomHeader, fixeHeaderFunction, scrollToTop, handelscroll } from '../JS/template.js';

import { newArrival } from '../ARRAY/New-Arrival.js';
import { menShoes } from '../ARRAY/Men.js';
import { womenShoes } from '../ARRAY/Women.js';
import { kidsShoes } from '../ARRAY/Kids.js';
import { sportShoes } from '../ARRAY/Sport.js';
import { slippers } from '../ARRAY/Slipper.js';
import { socks } from '../ARRAY/Socks.js';
import { backpack } from '../ARRAY/Backpack.js';

const productArray = [...newArrival, ...menShoes, ...womenShoes, 
  ...kidsShoes, ...sportShoes, ...slippers, ...socks, ...backpack];


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
      cardsAnimation();
      contentAnimation();
      changePages();
      userFunction();
      searchFunction();
      upDateCartCounter();
      bottomHeaderLinkFunction();
      hideBottomHeader();
      scrollToTop();
      handelscroll();

      // display details
      const detailsWrapper = document.querySelector('.details-wraper');

      const detailsFunction = () => {
        const detailsContent = productArray
          .map((detailsItem) => {
            if (
              detailsItem.id === parseInt(window.location.search.split('=')[1])
            ) {
              const variants = productArray.filter(
                (item) => item.title === detailsItem.title
              );

              return `
               <div class="details-item">
                 <div class="item-left">
              <div class="item-images-grid">
                ${detailsItem.images.map((img, index) => `
                  <img class="small-image small-image${index + 1}" src="${img}" alt="pic">
                `).join('')}
                <img class="mainImage" src="${detailsItem.mainImage}" alt="pic">
                  </div>
               </div>
                 <div class="item-right">
                   <div class="item-title">
                     <h3>${detailsItem.title}</h3>
                   </div>
                    <div class="item-type">
                    ${detailsItem.type.map((type) => {
                      return `<p class="type">${type}</p>`;
                    }).join("")}
                   </div>
                   <div class="item-price">
                     <h3>${detailsItem.price}</h3>
                   </div>
                   <div class="item-viriation">
                     <div class="item-variant">
                       <div class="variant-image-wraper">
                         ${variants
                           .map(
                             (item) => `
                           <div class="image-item">
                             <img src="${item.mainImage}" data-id='${item.id}' data-image='${item.mainImage}' alt="pic" class="variant-main-image">
                           </div>
                         `
                           )
                           .join('')}
                       </div>
                       <div class="variant-size-wraper">
                       ${detailsItem.sizes
                         .map(
                           (size) => `
                       <div class="size-item">
                       <p class="size-item-btn" data-size='${size}'>${size}</p>
                       </div>
                       `
                         )
                         .join('')}
                       </div>
                       <div class="variant-quantity-wraper">
                         <p>Quantity: ${detailsItem.stock}</p>
                       </div>
                     </div>
                   </div>
                   <div class="add-to-cart">
                     <p class="shopping_cart" data-id=${
                       detailsItem.id
                     }>add to cart
                       <span class="material-symbols-outlined">shopping_cart</span>
                     </p>
                   </div>
                     <div class="item-wishlist">
                      <p class="wishlist" data-id='${
                        detailsItem.id
                      }'>Add to Wishlist 
                          <span class="material-symbols-outlined">
                            favorite_border
                            </span>
                        </p>
                  </div>
                   <div class="back-to-home">
                     <a href="/HTML/index.html">Back to Home</a>
                   </div>
                   <div class="item-discription">
                     <h2>${detailsItem.description}</h2>
                     <p>${detailsItem.Text}</p>
                   </div>
                 </div>
               </div>
             `;
            }
          })
          .join('');
        detailsWrapper.innerHTML = detailsContent;

        /// to display the product images
        const variantMainImage = document.querySelectorAll('.variant-main-image');
        const smallImageContainer = document.querySelector('.small-image');
        const bigScreen = document.querySelector('.mainImage');
        
        variantMainImage.forEach((image) => {
          image.addEventListener('click', (e) => {
            const mainImage = e.target.dataset.image;
            const newId = e.target.dataset.id;
            const detailsItem = productArray.find((item) => item.mainImage === mainImage);
            bigScreen.src = mainImage;

            smallImageContainer.innerHTML = detailsItem.images.map((img) => {
              return `<img class="small-image src="${img}" alt="pic">`;
            })

            const newUrl = new URL(window.location);
            newUrl.searchParams.set('id', newId);
            window.location.search = newUrl.search;
          });
        });

        //// displying ever smaller image in bigger screen
        const smallImages = document.querySelectorAll('.small-image');
        const screen = document.querySelector('.mainImage');

        smallImages.forEach((img) => {
          img.addEventListener('click', () => {
            screen.src = img.src;
          });
        });

        /// showing active size btn
        const sizeItems = document.querySelectorAll('.size-item-btn');
        sizeItems.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            sizeItems.forEach((item) => item.classList.remove('active'));
            e.target.classList.add('active');
          });
        });
      };
      detailsFunction();

      // adding eventlistner To  adda to cart btn
      detailsWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('shopping_cart')) {
          const activeSizeBtn = document.querySelector('.size-item-btn.active');
          if (activeSizeBtn) {
            const size = activeSizeBtn.dataset.size;
            const product = productArray.find(
              (item) => item.id === parseInt(window.location.search.split('=')[1]));
            const quantity = document.querySelector('.cart-count');
            quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
            localStorage.setItem(
              'quantity',
              JSON.stringify(quantity.innerHTML)
            );
            addToCart(product, size);
          } else {
            alert('Please select a size before adding to cart.');
          }
        }
      });

      /// adding it to cart
      const addToCart = (product, size) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const productWithSize = cartItems.find(
          (item) => item.id === product.id && item.size === size);
        if (productWithSize) {
          productWithSize.quantity++;
        } else {
          cartItems.push({ ...product, size, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      };


      // adding it to wishlist
      detailsWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('wishlist')) {
          const productId = parseInt(e.target.dataset.id);
          const activeSizeBtn = document.querySelector('.size-item-btn.active');
          const product = productArray.find((item) => item.id === parseInt(window.location.search.split('=')[1]));
          let wishlistItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
          
          if (activeSizeBtn) {
            const size = activeSizeBtn.dataset.size;
            const productWithSize = wishlistItems.find((item) => item.id === productId && item.size === size);
            const icon = e.currentTarget.querySelector('.material-symbols-outlined');
            
            icon.classList.toggle('active');
            
            if (!productWithSize) {
              wishlistItems.push({ ...product, size });
            } else {
              wishlistItems = wishlistItems.filter((item) => !(item.id === productId && item.size === size));
              icon.classList.remove('active');
            }
            
            localStorage.setItem('favoriteItems', JSON.stringify(wishlistItems));
          } else {
            alert('Please select a size before adding to wishlist.');
          }
        }
      });
      
      

      //// display related new arrivals
      const newArrivalWrapper = document.querySelector('.newArival-wraper');
      const RelatedNewArrivalFunction = () => {
        const related = productArray
          .map((reladetItem) => {
            if (
              reladetItem.id !== parseInt(window.location.search.split('=')[1])
            ) {
              return `
                <div class="newArival-item">
                  <div class="item-top">
                    <div class="item-image">
                      <img src="${reladetItem.mainImage}" alt="${reladetItem.title}">
                    </div>
                    <div class="item-text-price">
                      <p>${reladetItem.price}</p>
                    </div>
                  </div>
                  <div class="item-bottom">
                    <div class="item-text-title">
                      <p>${reladetItem.title}</p>
                    </div>
                    <div class="item-text-dots">
                      <span class="material-symbols-outlined" data-id="${reladetItem.id}">
                        more_vert
                      </span>
                    </div>
                  </div>
              <div class="item-bottom-button" data-id="${reladetItem.id}">
              <div class="item-wishlist">
                      <p class="wishlist" data-id='${reladetItem.id}'>Add to Wishlist
                          <span class="material-symbols-outlined">
                            favorite_border
                            </span>
                        </p>
                  </div>
                  <div class="see-details">
                      <a href="/HTML/details.html?id=${reladetItem.id}">
                        <p>See Details...
                          <span class="material-symbols-outlined">
                            arrow_forward
                          </span>
                        </p>
                      </a>
                    </div>
                    <div class="item-add-to-cart">
                      <p class="add-to-cart" data-id'${reladetItem.id}'>Add to Cart
                          <span class="material-symbols-outlined">
                            add_shopping_cart
                              </span>
                          </p>
                    </div>
                    <div class="item-share">
                      <p class="share" data-id="${reladetItem.id}">Share...
                        <span class="material-symbols-outlined">
                          share
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              `;
            }
          })
          .join('');

        newArrivalWrapper.innerHTML = related;
      };

      RelatedNewArrivalFunction();

      //// sliding the related new arrival
      const arrivalWrapper = document.querySelector('.newArival-wraper');
      const chevronIcons = document.querySelectorAll('.chevron-icon');

      const updateChevronDisplay = () => {
        const chevronLeft = document.getElementById('chevronLeft');
        const chevronRight = document.getElementById('chevronRight');

        if (arrivalWrapper.scrollLeft <= 0) {
          chevronLeft.style.display = 'none';
          chevronRight.style.display = 'block';
        } else if (
          arrivalWrapper.scrollLeft + arrivalWrapper.clientWidth >=
          arrivalWrapper.scrollWidth
        ) {
          chevronRight.style.display = 'none';
          chevronLeft.style.display = 'block';
        } else {
          chevronLeft.style.display = 'block';
          chevronRight.style.display = 'block';
        }
      };

      // add event listeners to chevron icons to slide new arrival items
      const slideNewArrival = () => {
        chevronIcons.forEach((icon) => {
          icon.addEventListener('click', () => {
            const direction = icon.id === 'chevronLeft' ? -1 : 1;
            const scrollAmount = arrivalWrapper.clientWidth * direction;
            arrivalWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(updateChevronDisplay, 500);
          });
        });

        updateChevronDisplay();
      };

      slideNewArrival();

  

      cardBottumMoreButtonFunction();
      addFevoriteFunction();
      
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`
    console.error('Error:', error);
  }
};


window.addEventListener('DOMContentLoaded', () => {
  template();
})
