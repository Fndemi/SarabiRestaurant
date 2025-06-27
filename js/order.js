let cart = [];
    let orderType = 'delivery';

    // Order type switching
    document.getElementById('deliveryBtn').addEventListener('click', () => {
      orderType = 'delivery';
      updateOrderTypeButtons();
      updateDeliveryTime();
    });

    document.getElementById('pickupBtn').addEventListener('click', () => {
      orderType = 'pickup';
      updateOrderTypeButtons();
      updateDeliveryTime();
    });

    function updateOrderTypeButtons() {
      const deliveryBtn = document.getElementById('deliveryBtn');
      const pickupBtn = document.getElementById('pickupBtn');

      if (orderType === 'delivery') {
        deliveryBtn.classList.add('active');
        deliveryBtn.classList.remove('bg-amber-200', 'text-gray-700');
        deliveryBtn.classList.add('bg-amber-600', 'text-white');

        pickupBtn.classList.remove('active');
        pickupBtn.classList.remove('bg-amber-600', 'text-white');
        pickupBtn.classList.add('bg-amber-200', 'text-gray-700');
      } else {
        pickupBtn.classList.add('active');
        pickupBtn.classList.remove('bg-amber-200', 'text-gray-700');
        pickupBtn.classList.add('bg-amber-600', 'text-white');

        deliveryBtn.classList.remove('active');
        deliveryBtn.classList.remove('bg-amber-600', 'text-white');
        deliveryBtn.classList.add('bg-amber-200', 'text-gray-700');
      }
    }

    function updateDeliveryTime() {
      const deliveryTimeElement = document.getElementById('deliveryTime');
      if (orderType === 'delivery') {
        deliveryTimeElement.textContent = '25-35 min';
      } else {
        deliveryTimeElement.textContent = '15-20 min';
      }
    }

    function addToCart(itemName, price) {
      const existingItem = cart.find(item => item.name === itemName);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: itemName,
          price: price,
          quantity: 1
        });
      }

      updateCartDisplay();
    }

    function removeFromCart(itemName) {
      const itemIndex = cart.findIndex(item => item.name === itemName);
      if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          cart.splice(itemIndex, 1);
        }
      }
      updateCartDisplay();
    }

    function updateCartDisplay() {
      const cartCount = document.getElementById('cartCount');
      const cartEmpty = document.getElementById('cartEmpty');
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      const checkoutBtn = document.getElementById('checkoutBtn');

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      cartCount.textContent = totalItems;
      cartTotal.textContent = `$${totalPrice}`;

      if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartItems.classList.add('hidden');
        checkoutBtn.disabled = true;
      } else {
        cartEmpty.classList.add('hidden');
        cartItems.classList.remove('hidden');
        checkoutBtn.disabled = false;

        cartItems.innerHTML = cart.map(item => `
                    <div class="flex justify-between items-center bg-white bg-opacity-30 p-3 rounded-lg">
                        <div>
                            <div class="font-medium text-gray-800">${item.name}</div>
                            <div class="text-sm text-gray-600">$${item.price} x ${item.quantity}</div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="removeFromCart('${item.name}')" class="w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-all">-</button>
                            <span class="text-sm font-medium">${item.quantity}</span>
                            <button onclick="addToCart('${item.name}', ${item.price})" class="w-6 h-6 bg-green-500 text-white rounded-full text-xs hover:bg-green-600 transition-all">+</button>
                        </div>
                    </div>
                `).join('');
      }
    }

    // Initialize delivery time
    updateDeliveryTime();

    // Checkout functionality
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      if (cart.length > 0) {
        alert(`Order placed successfully! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}\nOrder type: ${orderType}\nEstimated time: ${document.getElementById('deliveryTime').textContent}`);
        cart = [];
        updateCartDisplay();
      }
    });
  