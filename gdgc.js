// Fetch Products from Fake Store API
const productsContainer = document.getElementById('products');
let products = [];
let cart = [];

// Fetch data from API
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  });

// Display products in HTML
function displayProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsContainer.appendChild(productItem);
  });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
    saveCartToLocalStorage();
  }

// Update Cart in HTML
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">Price: $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
            <div class="quantity-control">
              <button class="quantity-btn" onclick="changeQuantity(${item.id}, 'decrease')">-</button>
              <input class="quantity-input" type="text" value="${item.quantity}" readonly>
              <button class="quantity-btn" onclick="changeQuantity(${item.id}, 'increase')">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    document.getElementById('item-count').innerText = totalItems;

    // Save cart to local storage
    saveCartToLocalStorage();
}
 
// Change Quantity of Items in Cart
function changeQuantity(productId, action) {
    const product = cart.find(p => p.id === productId);
    if (action === 'increase') {
      product.quantity += 1;
    } else if (action === 'decrease' && product.quantity > 1) {
      product.quantity -= 1;
    }
    updateCart();
    saveCartToLocalStorage();
  }

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

  



// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Load Wishlist from Local Storage
function loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
        wishlist = JSON.parse(storedWishlist);
        updateWishlist();
    }
}

// Checkout Function
function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    localStorage.removeItem('cart');
}


// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadWishlistFromLocalStorage();  // Load wishlist from local storage
});