// Marketplace logic for ChristoBuzz
import { supabase } from './supabase.js';

// Crypto addresses (fixed, from user)
const cryptoAddresses = {
  BTC: "bc1qclkz9jvap6nmmk2nzntrt8rm8yy6yyqgw7y4p6",
  USDT: "0x6a339cef96d44e50a275a801f4d6c7d94e89dfdf",
  ETH: "0x6a339cef96d44e50a275a801f4d6c7d94e89dfdf",
  SOL: "8oVTkpHj5vXLWJrYXQX1UkJxGeaJLnrgKihmLGoBwzHk",
  BNB: "0x6a339cef96d44e50a275a801f4d6c7d94e89dfdf",
  USDC: "0x6a339cef96d44e50a275a801f4d6c7d94e89dfdf"
};

// Elements
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const addProductBtn = document.getElementById('addProductBtn');
const productList = document.getElementById('productList');

// Add product
addProductBtn.addEventListener('click', async () => {
  const name = productNameInput.value.trim();
  let price = parseFloat(productPriceInput.value);

  if(!name || isNaN(price) || price <= 0) {
    alert("Please enter valid name and price");
    return;
  }

  // Add 5-10% app fee automatically
  const appFeePercent = Math.floor(Math.random() * 6) + 5; // Random 5-10%
  const totalPrice = +(price + (price * appFeePercent / 100)).toFixed(2);

  const { data, error } = await supabase
    .from('marketplace')
    .insert([{ name, price: totalPrice, app_fee: appFeePercent }]);

  if(error) {
    console.error(error);
    alert("Failed to add product");
    return;
  }

  addProductToUI({ name, price: totalPrice, app_fee: appFeePercent });
  productNameInput.value = "";
  productPriceInput.value = "";
});

// Function to render product
function addProductToUI(product) {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <strong>${product.name}</strong>
    <p>Price: $${product.price} (includes ${product.app_fee}% app fee)</p>
  `;
  productList.prepend(div);
}

// Load products from Supabase on page load
async function loadProducts() {
  const { data, error } = await supabase.from('marketplace').select('*').order('id', { ascending: false });
  if(error) {
    console.error(error);
    return;
  }
  data.forEach(addProductToUI);
}

loadProducts();
