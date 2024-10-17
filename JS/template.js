import { newArrival } from '../ARRAY/New-Arrival.js';
import { menShoes } from '../ARRAY/Men.js';
import { womenShoes } from '../ARRAY/Women.js';
import { kidsShoes } from '../ARRAY/Kids.js';
import { sportShoes } from '../ARRAY/Sport.js';
import { slippers } from '../ARRAY/Slipper.js';
import { socks } from '../ARRAY/Socks.js';
import { backpack } from '../ARRAY/Backpack.js';

// search function
const productArray = [
  ...newArrival,
  ...menShoes,
  ...womenShoes,
  ...kidsShoes,
  ...sportShoes,
  ...slippers,
  ...socks,
  ...backpack,
];

export const searchFunction = () => {
  const searchInput = document.getElementById('search');
  const resultContainar = document.querySelector('.result-container');
  const resultWrapper = document.querySelector('.result-wraper');
  const body = document.body;

  searchInput.addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase();
    resultWrapper.innerHTML = '';

    if (searchValue.trim() === '') {
      resultContainar.classList.remove('open');
      body.classList.remove('no-scroll');
      return;
    } else {
      resultContainar.classList.add('open');
      body.classList.add('no-scroll');
      const searchedProduct = productArray.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          (item.type && item.type.includes(searchValue.toLowerCase()))
      );

      if (searchedProduct.length > 0) {
        searchedProduct.forEach((product) => {
          const filteredProduct = document.createElement('div');
          filteredProduct.classList.add('result-item');
          filteredProduct.innerHTML = `
          <a href="/HTML/details.html?id=${product.id}">
            <div class="item-titel">
              <h3>${product.title}</h3>
            </div>
            <div class="item-desription">
              <h3>${product.description}</h3>
            </div>
            <div class="item-image">
              <img src="${product.mainImage}" alt="${product.title}">
            </div>
          </a>
          `;
          resultWrapper.appendChild(filteredProduct);
        });
      }
    }
  });
};




/// ins some page header
export const hideHeader = () => {
  const header = document.querySelector('.header');
  header.style.display = 'none'
}

export const hideBottomHeader = () => {
  const bottomHeader = document.querySelector('.bottom-header');
  bottomHeader.style.display = 'none'
}


export const userFunction = () => {
  const loginIcon = document.getElementById('login');
  const userNameElement = document.querySelector('.user-name');
  const userContainer = document.querySelector('.user-container');


  const userData = JSON.parse(localStorage.getItem('userData'));

  // Check if the user is logged in and display the username
  if (userData) {
    userNameElement.textContent = userData.userName.firstName;
    userContainer.style.display = 'block';
    loginIcon.style.display = 'none';
  } else {
    userContainer.style.display = 'none';
    loginIcon.style.display = 'block';
  }
};



//// bottom header links
export const bottomHeaderLinkFunction = () => {
  const links = document.querySelectorAll('.buttom-header-link');
  const body = document.body;

  links.forEach((link) => {
    link.addEventListener('click', () => {
      links.forEach((link) => link.classList.remove('active'));
      link.classList.add('active');
    });
  });

  body.addEventListener('click', (e) => {
    links.forEach((link) => {
      if (!link.contains(e.target)) {
        link.classList.remove('active');
      }
    });
  });
};


/// fixen header while scrolling
export const fixeHeaderFunction = () => {
  const header = document.querySelector('.header');

  const headerfunction = () => {
    const scrollTop = window.pageYOffset;
    const headerHeight = header.getBoundingClientRect().height;

    if (scrollTop > headerHeight) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  };
  window.addEventListener('scroll', headerfunction);
};



/// updating the cart counter
export const upDateCartCounter = () => {
  let cartCounter = document.querySelector('.cart-count');
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  cartCounter.innerHTML = totalQuantity;
};



// sumulierte admin function 
// Initialize user data
const userData = {
  userName: {
    firstName: 'haider',
    lastName: 'yahiya',
  },
  img: '/KIDSIMGS/Air Jordan 1 Low-1 (1).png',
};

// Save user data in local storage
localStorage.setItem('userData', JSON.stringify(userData));

// Function to populate user data on the page
export const adminAcountFunction = () => {
  const adminNameTop = document.querySelector('.userNameTop');
  const adminImage = document.querySelector('.userImage');
  const adminName = document.querySelector('.userName');
  const orderedThings = document.querySelector('.ordered');
  const adminFavoritesThings = document.querySelector('.favorite');

  let userData = JSON.parse(localStorage.getItem('userData'));
  let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
  let cartItem = JSON.parse(localStorage.getItem('cartItems')) || [];


  const fullName = `${userData.userName.firstName} ${userData.userName.lastName}`;
  adminNameTop.innerHTML = `Welcome ${fullName}`;
  adminImage.src = userData.img;
  adminName.innerHTML = fullName;

  orderedThings.innerHTML = cartItem.length ? `Ordered items: ${cartItem.length}` : `Ordered items: 0`;
  adminFavoritesThings.innerHTML = favoriteItems.length ? `Favorite items: ${favoriteItems.length}` : `Favorite items: 0`;
};




/// logout function
export const logoutFunction = () => {
  const logoutBtn = document.querySelector('.Logout');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('quantity')
    localStorage.removeItem('cartItems');
    localStorage.removeItem('favoriteItems');
    localStorage.removeItem('totalFevorite');
    window.location.href = '/HTML/logout.html';
    userFunction();
  });
};



/// change pages  
export const changePages = () => {
  const toLogin = document.querySelector('.login');
  const toUserAcount = document.querySelector('.user-container');
  const toShoppingCart = document.querySelector('.cart-container');

  toLogin.addEventListener('click', () => {
    window.location.href = '/login-and-register.html';
  });

  toUserAcount.addEventListener('click', () => {
    window.location.href = '/HTML/user-account.html';
  });
  
  toShoppingCart.addEventListener('click', () => {
    window.location.href = '/HTML/cart.html';
  });
}


//adding fevorite
export const addFevoriteFunction = () => {
  const addToFavoriteBtns = document.querySelectorAll('.wishlist');
  let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

  addToFavoriteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('wishlist')) {
        e.stopPropagation();
        const productId = parseInt(e.currentTarget.dataset.id);
        const product = productArray.find((item) => item.id === productId);
        const icons = e.currentTarget.querySelectorAll('.material-symbols-outlined');

        icons.forEach((icon) => {
          icon.classList.toggle('active');
        });

        if (!favoriteItems.find((item) => item.id === productId)) {
          favoriteItems.push({...product, quantity: 1 });
        } else {
          favoriteItems = favoriteItems.filter((item) => item.id !== productId);
        }
        
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
      }
    });
  });
};




//update the fevorite counter
export const upDateFevoriteCounter = () => {
  const fevoriteCounter = document.querySelector('.favorite');

  let totalFevorite = 0;
  let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

  favoriteItems.forEach((item) => {
    if (item.quantity && !isNaN(parseFloat(item.quantity))) {
      totalFevorite += parseFloat(item.quantity);
    }
  });

  fevoriteCounter.innerHTML = `Wishlist List: ${totalFevorite}`;
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  localStorage.setItem('totalFevorite', JSON.stringify(totalFevorite));
};




//open and close the cards more buttum botton 
export const cardBottumMoreButtonFunction = () => {
  const wrapers = document.querySelectorAll('.backpack-wraper, .socks-wraper, .Slippers-wraper, .winter-wraper, .Sommer-wraper, .sports-wraper, .kids-wraper, .women-wraper, .men-wraper, .newArival-wraper');
  
  wrapers.forEach((wraper) => {
    wraper.addEventListener('click', (e) => {
      if (e.target.classList.contains('material-symbols-outlined')) {
        e.preventDefault();
        e.stopPropagation();

        const allHiddenBodies = document.querySelectorAll('.item-bottom-button.open');
        allHiddenBodies.forEach((hiddenbody) => {
          hiddenbody.classList.remove('open');
          
        });

        const btn = e.target;
        const btnId = btn.dataset.id;
        const hiddenBodys = wraper.querySelectorAll('.item-bottom-button');

        hiddenBodys.forEach((hiddenbody) => {
          if (hiddenbody.dataset.id === btnId) {
            hiddenbody.classList.toggle('open');
          }
        });
      }
    });
  });

  // Close all open sections when clicking outside
  window.addEventListener('click', () => {
    const allHiddenBodies = document.querySelectorAll('.item-bottom-button.open');
    allHiddenBodies.forEach((hiddenbody) => {
      hiddenbody.classList.remove('open');
    });
  });
};



// showing the allert if user try to add to cart befor secting the sieze 
export const alertFuctionForHomePage = () => {
  const wrapers = document.querySelectorAll('.backpack-wraper, .socks-wraper, .Slippers-wraper, .winter-wraper, .Sommer-wraper, .sports-wraper, .kids-wraper, .women-wraper, .men-wraper, .newArival-wraper');
    wrapers.forEach((wraper) => {
      wraper.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          alert('Please select size before you add it to the cart');
        }
      });
    })
}


/// animating the carts
export const cardsAnimation = () => {
  const slide = () => {
    const cards = document.querySelectorAll(
      '.newArival-item, .men-item, .women-item, .kids-item, .sports-item, .Sommer-item, .winter-item, .Slippers-item, .socks-item, .backpack-item,  .about-item, .about-text, .contact-item'
    );
    const height = window.innerHeight;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardBottom = card.getBoundingClientRect().bottom;

      if (cardTop - height < -50) {
        card.classList.add('first');
      } else {
        card.classList.remove('first');
      }

      if (cardBottom - height < 100) {
        card.classList.add('second');
      }

      if (cardTop - height < -150) {
        card.classList.add('second');
      } else {
        card.classList.remove('second');
      }

      if (cardTop - height < -250) {
        card.classList.add('third');
      } else {
        card.classList.remove('third');
      }
    });
  };

  window.addEventListener('scroll', slide);
};


///// section content animation
export const contentAnimation = () => {
  const contents = document.querySelectorAll(
    '.newArival-container h1, .men-container h1, .women-container h1, .kids-container h1, .sports-container h1, .Sommer-container h1, .winter-container h1, .Slippers-container h1, .socks-container h1, .backpack-container h1, .about-container h1, .contact-container h1'
  );
  const height = window.innerHeight;

  const slide = () => {
    contents.forEach((content) => {
      const contentTop = content.getBoundingClientRect().top;

      if (contentTop - height < 0) {
        content.classList.add('slide');
      } else {
        content.classList.remove('slide');
      }
    });
  };
  window.addEventListener('scroll', slide);
};

/// navigate the link
export const navigateTheLinks = () => {
  const links = document.querySelectorAll('.buttom-header-link a, .topHeader-links a');
  const header = document.querySelector('.header');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const href = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(href);

      const headerHeight = header.getBoundingClientRect().height;
      let targetPosition = targetElement.offsetTop - headerHeight;
      const fixedHeader = header.classList.contains('fixed');

      if (!fixedHeader) {
        targetPosition -= headerHeight;
      }

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
};




// smooth scrolling to top
export const scrollToTop = () => {
  const icons = document.querySelectorAll('.material-symbols-outlined');

  icons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      if (e.target.id === 'vertical_align_top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    });
  });
};


// hide the scroll top icon when scrolling 300px down
export const handelscroll = () => {
  const icon = document.getElementById('vertical_align_top');
  icon.style.display = 'none';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      icon.style.display = 'block';
    } else {
      icon.style.display = 'none';
    }
  });
};




// updating the footer year
export const updateYear = () => {
  const footerYear = document.getElementById('year');
  const now = new Date().getFullYear();
  footerYear.innerHTML = now;
};
