const app = document.getElementById('wep-App');
const temporary = document.getElementById('tempo-Web');
import {
  userFunction,
  bottomHeaderLinkFunction,
  fixeHeaderFunction,
  upDateCartCounter,
  addFevoriteFunction,
  cardBottumMoreButtonFunction,
  alertFuctionForHomePage,
  cardsAnimation,
  contentAnimation,
  searchFunction,
  navigateTheLinks,
  updateYear,
  scrollToTop,
  handelscroll,
  changePages,
} from "../JS/template.js";
import { newArrival } from '../ARRAY/New-Arrival.js';
import { menShoes } from '../ARRAY/Men.js';
import { womenShoes } from '../ARRAY/Women.js';
import { kidsShoes } from '../ARRAY/Kids.js';
import { sportShoes } from '../ARRAY/Sport.js';
import { slippers } from '../ARRAY/Slipper.js';
import { socks } from '../ARRAY/Socks.js';
import { backpack } from '../ARRAY/Backpack.js';


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
      bottomHeaderLinkFunction();
      fixeHeaderFunction();
      upDateCartCounter();
      cardsAnimation();
      contentAnimation();
      searchFunction();
      navigateTheLinks();
      updateYear();
      scrollToTop();
      handelscroll();
      changePages();
      

      // // // displaying new arival
      const newArrivalWrapper = document.querySelector('.newArival-wraper');

      const newArivalFunction = () => {
        const newArivals = newArrival
          .map((arrivalItem) => {
            return `
            <div class="newArival-item">
              <div class="item-top">
                <div class="item-image">
                  <img src="${arrivalItem.mainImage}" alt="${arrivalItem.title}">
                </div>
                <div class="item-text-price">
                  <p>${arrivalItem.price}</p>
                </div>
              </div>
              <div class="item-bottom">
                <div class="item-text-title">
                  <p>${arrivalItem.title}</p>
                </div>
                <div class="item-text-dots">
                    <span class="material-symbols-outlined" data-id="${arrivalItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${arrivalItem.id}">
                  <div class="item-wishlist">
                    <p class="wishlist" data-id='${arrivalItem.id}'>Add to Wishlist
                      <span class="material-symbols-outlined">favorite_border</span>
                    </p>
                  </div>
                  <div class="see-details">
                    <a href="/HTML/details.html?id=${arrivalItem.id}">
                      <p>See Details...
                        <span class="material-symbols-outlined">arrow_forward</span>
                      </p>
                    </a>
                  </div>
                  <div class="item-add-to-cart">
                    <p class="add-to-cart" data-id='${arrivalItem.id}'>Add to Cart
                      <span class="material-symbols-outlined">add_shopping_cart</span>
                    </p>
                  </div>
                  <div class="item-share">
                    <p class="share" data-id="${arrivalItem.id}">Share...
                      <span class="material-symbols-outlined">share</span>
                    </p>
                  </div>
                </div>
              </div>
            `;
          })
          .join('');
        newArrivalWrapper.innerHTML = newArivals;
     
      };
      newArivalFunction();

  
      
  

      //// sliding the new arrivals
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

      /// didplay the men section
      const menSectionWraper = document.querySelector('.men-wraper');

      const menFunction = () => {
        const men = menShoes
          .map((menItem) => {
            return `
              <div class="men-item">
                <div class="item-top">
                    <div class="item-image">
                        <img src="${menItem.mainImage}" alt="${menItem.title}">
                    </div>
                    <div class="item-text-price">
                        <p>${menItem.price}</p>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="item-text-title">
                        <p>${menItem.title}</p>
                    </div>
                    <div class="item-text-dots">
                        <span class="material-symbols-outlined" data-id="${menItem.id}">
                            more_vert
                        </span>
                    </div>
                </div>
                <div class="item-bottom-button" data-id="${menItem.id}">
                    <div class="item-wishlist">
                        <p class="wishlist" data-id="${menItem.id}">Add to Wishlist 
                            <span class="material-symbols-outlined">
                                favorite_border
                            </span>
                        </p>
                    </div>
                    <div class="see-details">
                       <a href="/HTML/details.html?id=${menItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${menItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${menItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        menSectionWraper.innerHTML = men;
    
       
      };
      menFunction();

    

      // didplay the women section
      const womenSectionWraper = document.querySelector('.women-wraper');

      const womenFunction = () => {
        const women = womenShoes
          .map((womenItem) => {
            return `
              <div class="women-item">
                <div class="item-top">
                    <div class="item-image">
                        <img src="${womenItem.mainImage}" alt="${womenItem.title}">
                    </div>
                    <div class="item-text-price">
                        <p>${womenItem.price}</p>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="item-text-title">
                        <p>${womenItem.title}</p>
                    </div>
                    <div class="item-text-dots">
                        <span class="material-symbols-outlined" data-id="${womenItem.id}">
                            more_vert
                        </span>
                    </div>
                </div>
                <div class="item-bottom-button" data-id="${womenItem.id}">
                    <div class="item-wishlist">
                        <p class="wishlist" data-id="${womenItem.id}">Add to Wishlist 
                            <span class="material-symbols-outlined">
                                favorite_border
                            </span>
                        </p>
                    </div>
                    <div class="see-details">
                       <a href="/HTML/details.html?id=${womenItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${womenItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${womenItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        womenSectionWraper.innerHTML = women;
     
        
      };
      womenFunction();

    

      // didplay the kids section
      const kidsSectionWraper = document.querySelector('.kids-wraper');
      const kidsFunction = () => {
        const kids = kidsShoes
          .map((kidItem) => {
            return `
              <div class="kids-item">
                <div class="item-top">
                    <div class="item-image">
                        <img src="${kidItem.mainImage}" alt="${kidItem.title}">
                    </div>
                    <div class="item-text-price">
                        <p>${kidItem.price}</p>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="item-text-title">
                        <p>${kidItem.title}</p>
                    </div>
                    <div class="item-text-dots">
                        <span class="material-symbols-outlined"  data-id="${kidItem.id}">
                            more_vert
                        </span>
                    </div>
                </div>
               <div class="item-bottom-button" data-id="${kidItem.id}">
                    <div class="item-wishlist">
                        <p class="wishlist" data-id="${kidItem.id}">Add to Wishlist 
                            <span class="material-symbols-outlined">
                                favorite_border
                            </span>
                        </p>
                    </div>
                    <div class="see-details">
                       <a href="/HTML/details.html?id=${kidItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${kidItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${kidItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        kidsSectionWraper.innerHTML = kids;
        
        
      };
      kidsFunction();

   

      // displas sport section
      const sportSectionWraper = document.querySelector('.sports-wraper');
      const sportFunction = () => {
        const sport = sportShoes
          .map((sportItem) => {
            return `
              <div class="sports-item">
                <div class="item-top">
                    <div class="item-image">
                        <img src="${sportItem.mainImage}" alt="${sportItem.title}">
                    </div>
                    <div class="item-text-price">
                        <p>${sportItem.price}</p>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="item-text-title">
                        <p>${sportItem.title}</p>
                    </div>
                    <div class="item-text-dots">
                       <span class="material-symbols-outlined" data-id="${sportItem.id}">
                            more_vert
                        </span>
                    </div>
                </div>
               <div class="item-bottom-button" data-id="${sportItem.id}">
                    <div class="item-wishlist">
                        <p class="wishlist" data-id="${sportItem.id}">Add to Wishlist 
                            <span class="material-symbols-outlined">
                                favorite_border
                            </span>
                        </p>
                    </div>
                    <div class="see-details">
                       <a href="/HTML/details.html?id=${sportItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${sportItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${sportItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        sportSectionWraper.innerHTML = sport;
        
        
      };
      sportFunction();

  

      //// displaying sommer section
      const productArray = [
        ...newArrival,
        ...menShoes,
        ...womenShoes,
        ...kidsShoes,
        ...sportShoes,
      ];

      let summerShoes = productArray.filter(
        (item) => item.type && item.type.includes('summer'.toLowerCase())
      );
      const summerSectionWrapper = document.querySelector('.Sommer-wraper');

      const summerFunction = () => {
        const summerContent = summerShoes
          .map((summerItem) => {
            return `
              <div class="Sommer-item">
                <div class="item-top">
                  <div class="item-image">
                    <img src="${summerItem.mainImage}" alt="${summerItem.title}">
                  </div>
                  <div class="item-text-price">
                    <p>${summerItem.price}</p>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-text-title">
                    <p>${summerItem.title}</p>
                  </div>
                  <div class="item-text-dots">
                    <span class="material-symbols-outlined" data-id="${summerItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${summerItem.id}">
                  <div class="item-wishlist">
                    <p class="wishlist" data-id="${summerItem.id}">Add to Wishlist 
                      <span class="material-symbols-outlined">
                        favorite_border
                      </span>
                    </p>
                  </div>
                  <div class="see-details">
                       <a href="/HTML/details.html?id=${summerItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${summerItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${summerItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        summerSectionWrapper.innerHTML = summerContent;
        
        
      };

      summerFunction();


      //display winter
      const winterSectionWrapper = document.querySelector('.winter-wraper');
      let winterShoes = productArray.filter(
        (item) => item.type && item.type.includes('winter'.toLowerCase())
      );

      const winterFunction = () => {
        const winterContent = winterShoes
          .map((winterItem) => {
            return `
              <div class="winter-item">
                <div class="item-top">
                  <div class="item-image">
                    <img src="${winterItem.mainImage}" alt="${winterItem.title}">
                  </div>
                  <div class="item-text-price">
                    <p>${winterItem.price}</p>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-text-title">
                    <p>${winterItem.title}</p>
                  </div>
                  <div class="item-text-dots">
                    <span class="material-symbols-outlined" data-id="${winterItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${winterItem.id}">
                  <div class="item-wishlist">
                    <p class="wishlist" data-id="${winterItem.id}">Add to Wishlist 
                      <span class="material-symbols-outlined">
                        favorite_border
                      </span>
                    </p>
                  </div>
                  <div class="see-details">
                       <a href="/HTML/details.html?id=${winterItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${winterItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${winterItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');

        winterSectionWrapper.innerHTML = winterContent;
       
        
      };

      winterFunction();

   

      // display slipper
      const slipperSectionWrapper = document.querySelector('.Slippers-wraper');

      const slipperFunction = () => {
        const slipperContent = slippers
          .map((slipperItem) => {
            return `
              <div class="Slippers-item">
                <div class="item-top">
                  <div class="item-image">
                    <img src="${slipperItem.mainImage}" alt="${slipperItem.title}">
                  </div>
                  <div class="item-text-price">
                    <p>${slipperItem.price}</p>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-text-title">
                    <p>${slipperItem.title}</p>
                  </div>
                  <div class="item-text-dots">
                    <span class="material-symbols-outlined"  data-id="${slipperItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${slipperItem.id}">
                  <div class="item-wishlist">
                    <p class="wishlist" data-id="${slipperItem.id}">Add to Wishlist 
                      <span class="material-symbols-outlined">
                        favorite_border
                      </span>
                    </p>
                  </div>
                  <div class="see-details">
                       <a href="/HTML/details.html?id=${slipperItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${slipperItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${slipperItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');

        slipperSectionWrapper.innerHTML = slipperContent;
       
        
      };

      slipperFunction();

     

      // display socks
      const socksSectionWrapper = document.querySelector('.socks-wraper');

      const socksFunction = () => {
        const socksContent = socks
          .map((sockItem) => {
            return `
              <div class="socks-item">
                <div class="item-top">
                  <div class="item-image">
                    <img src="${sockItem.mainImage}" alt="${sockItem.title}">
                  </div>
                  <div class="item-text-price">
                    <p>${sockItem.price}</p>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-text-title">
                    <p>${sockItem.title}</p>
                  </div>
                  <div class="item-text-dots">
                    <span class="material-symbols-outlined" data-id="${sockItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${sockItem.id}">
                    <div class="item-wishlist">
                    <p class="wishlist" data-id="${sockItem.id}">Add to Wishlist 
                      <span class="material-symbols-outlined">
                        favorite_border
                      </span>
                    </p>
                  </div>
                  <div class="see-details">
                       <a href="/HTML/details.html?id=${sockItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${sockItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${sockItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');

        socksSectionWrapper.innerHTML = socksContent;
        
        
      };

      socksFunction();

    

      //display backbpack
      const packSectionWrapper = document.querySelector('.backpack-wraper');

      const packFunction = () => {
        const packContent = backpack
          .map((packItem) => {
            return `
              <div class="backpack-item">
                <div class="item-top">
                  <div class="item-image">
                    <img src="${packItem.mainImage}" alt="${packItem.title}">
                  </div>
                  <div class="item-text-price">
                    <p>${packItem.price}</p>
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="item-text-title">
                    <p>${packItem.title}</p>
                  </div>
                  <div class="item-text-dots">
                    <span class="material-symbols-outlined"  data-id="${packItem.id}">
                      more_vert
                    </span>
                  </div>
                </div>
                <div class="item-bottom-button" data-id="${packItem.id}">
                  <div class="item-wishlist">
                    <p class="wishlist" data-id="${packItem.id}">Add to Wishlist 
                      <span class="material-symbols-outlined">
                        favorite_border
                      </span>
                    </p>
                  </div>
                  <div class="see-details">
                       <a href="/HTML/details.html?id=${packItem.id}">
                    <p>See Details... 
                      <span class="material-symbols-outlined">
                         arrow_forward
                            </span>
                        </p>
                     </a>
                   </div>
                    <div class="item-add-to-cart">
                        <p class="add-to-cart" data-id="${packItem.id}">Add to Cart 
                            <span class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </p>
                    </div>
                    <div class="item-share">
                        <p class="share" data-id="${packItem.id}">Share... 
                            <span class="material-symbols-outlined">
                                share
                            </span>
                        </p>
                    </div>
                </div>
            </div>
          `;
          })
          .join('');
        packSectionWrapper.innerHTML = packContent;
      };
      
      packFunction();
      
      
      addFevoriteFunction();
      alertFuctionForHomePage();
      cardBottumMoreButtonFunction();
    }
  } catch (error) {
    const contentTab = document.getElementById('content-Tab');
    contentTab.innerHTML = `<h1>Error: ${error.message}</h1>`;
    console.error('Error:', error);
  }
};