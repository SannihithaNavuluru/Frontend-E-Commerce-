// Sample data 
const products = [
    { id: 1, name: 'Organic Apples', subscriptionOptions: ['Weekly', 'Bi-weekly', 'Monthly'] },
    { id: 2, name: 'Fresh Carrots', subscriptionOptions: ['Weekly', 'Monthly'] },
    { id: 3, name: 'Almond Milk', subscriptionOptions: ['Weekly', 'Bi-weekly'] },
];

const subscriptions = [];

let productIdCounter = products.length + 1;
let subscriptionIdCounter = 1;

// Function to display products on the customer page
function displayProducts() {
    const productCatalog = document.getElementById('productCatalog');
    if (productCatalog) {
        productCatalog.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Subscription Options:</p>
                <select id="subscriptionOptions-${product.id}">
                    ${product.subscriptionOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
                </select>
                <button onclick="subscribeProduct(${product.id})">Subscribe</button>
            `;
            productCatalog.appendChild(productItem);
        });
    }
}

// Function for customer to subscribe to a product
function subscribeProduct(productId) {
    const product = products.find(p => p.id === productId);
    const subscriptionOption = document.getElementById(`subscriptionOptions-${productId}`).value;

    const subscription = {
        id: subscriptionIdCounter++,
        productName: product.name,
        option: subscriptionOption,
        active: true,
    };

    subscriptions.push(subscription);

    alert(`Subscribed to ${product.name} (${subscriptionOption}) successfully!`);
    displayCustomerSubscriptions();
}

// Function to display customer's subscriptions
function displayCustomerSubscriptions() {
    const subscriptionList = document.getElementById('subscriptionList');
    if (subscriptionList) {
        subscriptionList.innerHTML = '';

        subscriptions.forEach(subscription => {
            const subscriptionItem = document.createElement('div');
            subscriptionItem.classList.add('subscription-item');
            subscriptionItem.innerHTML = `
                <h3>${subscription.productName}</h3>
                <p>Plan: ${subscription.option}</p>
                <p>Status: ${subscription.active ? 'Active' : 'Inactive'}</p>
                <button onclick="cancelSubscription(${subscription.id})">Cancel Subscription</button>
            `;
            subscriptionList.appendChild(subscriptionItem);
        });
    }
}

// Function to cancel a subscription
function cancelSubscription(subscriptionId) {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    subscription.active = false;
    alert(`Subscription to ${subscription.productName} (${subscription.option}) cancelled!`);
    displayCustomerSubscriptions();
}

// Admin - Add Product
function addProduct() {
    const productName = prompt('Enter product name:');
    const options = prompt('Enter subscription options (comma separated, e.g., Weekly, Bi-weekly):').split(',');

    const product = {
        id: productIdCounter++,
        name: productName,
        subscriptionOptions: options.map(option => option.trim()),
    };

    products.push(product);
    alert('Product added successfully!');
    displayProducts();
    displayAdminProducts();
}

// Admin - Manage Products
function displayAdminProducts() {
    const productList = document.getElementById('productList');
    if (productList) {
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Subscription Options: ${product.subscriptionOptions.join(', ')}</p>
                <button onclick="removeProduct(${product.id})">Remove</button>
            `;
            productList.appendChild(productItem);
        });
    }
}

// Admin - Remove Product
function removeProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        alert('Product removed successfully!');
        displayAdminProducts();
    }
}

// Admin - View Orders (Sample static data)
function viewOrders() {
    const orderList = document.getElementById('orderList');
    if (orderList) {
        orderList.innerHTML = '';

        // Sample static order data
        const orders = [
            { id: 1, customerName: 'John Doe', productName: 'Organic Apples', status: 'Delivered' },
            { id: 2, customerName: 'Jane Smith', productName: 'Fresh Carrots', status: 'Pending' },
        ];

        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <h3>Order #${order.id}</h3>
                <p>Customer: ${order.customerName}</p>
                <p>Product: ${order.productName}</p>
                <p>Status: ${order.status}</p>
            `;
            orderList.appendChild(orderItem);
        });
    }
}

// Admin - Manage Subscriptions
function displayAdminSubscriptions() {
    const subscriptionList = document.getElementById('adminSubscriptionList');
    if (subscriptionList) {
        subscriptionList.innerHTML = '';

        subscriptions.forEach(subscription => {
            const subscriptionItem = document.createElement('div');
            subscriptionItem.classList.add('subscription-item');
            subscriptionItem.innerHTML = `
                <h3>${subscription.productName}</h3>
                <p>Plan: ${subscription.option}</p>
                <p>Status: ${subscription.active ? 'Active' : 'Inactive'}</p>
                <button onclick="toggleSubscriptionStatus(${subscription.id})">${subscription.active ? 'Deactivate' : 'Activate'}</button>
            `;
            subscriptionList.appendChild(subscriptionItem);
        });
    }
}

// Admin - Toggle Subscription Status
function toggleSubscriptionStatus(subscriptionId) {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    subscription.active = !subscription.active;
    alert(`Subscription to ${subscription.productName} (${subscription.option}) is now ${subscription.active ? 'Active' : 'Inactive'}!`);
    displayAdminSubscriptions();
}

// Function to show sections dynamically based on admin/customer selection
function showSection(sectionId) {

    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    document.querySelectorAll('.admin-section, .customer-section').forEach(section => section.style.display = 'none');
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Show the first section by default
    showSection('browseProducts');  // For customer.html
    showSection('manageProducts');  // For admin.html
});


// Initialize functions on window load
window.onload = function() {
    displayProducts();
    displayAdminProducts();
    displayCustomerSubscriptions();
    displayAdminSubscriptions();
    viewOrders();
};

// Handle Login Form
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "" || phone === "" || address === "") {
        alert("Please fill out all required fields.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const phonePattern = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (e.g., 123-456-7890 or (123) 456-7890).");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        alert("Password must include uppercase, lowercase letters, and numbers.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Registration successful!");
    window.location.href = "login.html";
});
