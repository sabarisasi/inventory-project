const products = {
  'Cake': { price: 50, unit: 'pcs' },
  'Rice': { price: 60, unit: 'kg' },
  'Soap': { price: 25, unit: 'pcs' },
  'Milk': { price: 30, unit: 'litre' },
  'Onion': { price: 20, unit: 'kg' },
  'Tomato': { price: 25, unit: 'kg' },
  'Bread': { price: 20, unit: 'pcs' },
  'Oil': { price: 150, unit: 'litre' }
};

const productSelect = document.getElementById('productSelect');
const deleteSelect = document.getElementById('deleteProductName');
const productQty = document.getElementById('productQty');
const productPrice = document.getElementById('productPrice');
const totalPrice = document.getElementById('totalPrice');
const table = document.getElementById('productTable');

function populateDropdowns() {
  productSelect.innerHTML = '<option value="">-- Select Product --</option>';
  deleteSelect.innerHTML = '';
  for (let p in products) {
    const option = new Option(p, p);
    productSelect.appendChild(option);
    deleteSelect.appendChild(new Option(p, p));
  }
}

productSelect.addEventListener('change', () => {
  const item = products[productSelect.value];
  if (item) productPrice.value = item.price;
  updateTotal();
});

productQty.addEventListener('input', updateTotal);

function updateTotal() {
  const qty = parseInt(productQty.value) || 0;
  const price = parseInt(productPrice.value) || 0;
  totalPrice.innerText = qty * price;
}

document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = productSelect.value;
  const qty = parseInt(productQty.value);
  const unit = products[name].unit;
  const price = parseInt(productPrice.value);
  const total = qty * price;
  const time = new Date().toLocaleString();
  const row = table.insertRow();
  row.innerHTML = `<td>${name}</td><td>${qty}</td><td>${unit}</td><td>₹${price}</td><td>₹${total}</td><td>${time}</td>`;
  this.reset();
  totalPrice.innerText = 0;
});

function printOnlyTable() {
  const printContent = document.getElementById('printSection').innerHTML;
  const win = window.open('', '', 'height=700,width=900');
  win.document.write('<html><head><title>Print Inventory</title></head><body>');
  win.document.write(printContent);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}

function showAdminLogin() {
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('adminLogin').style.display = 'block';
}

function validateAdmin() {
  const password = document.getElementById('adminPassword').value;
  if (password === '1234') {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
  } else {
    alert('Incorrect password');
  }
}

function goBack() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
}

function logoutAdmin() {
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
}

function backToHome() {
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
}

function addNewProduct() {
  const name = document.getElementById('newProductName').value;
  const price = parseInt(document.getElementById('newProductPrice').value);
  const unit = document.getElementById('newProductUnit').value;
  if (name && price > 0) {
    products[name] = { price, unit };
    populateDropdowns();
    alert(`${name} added.`);
  }
}

function deleteProduct() {
  const name = deleteSelect.value;
  if (name && confirm(`Delete ${name}?`)) {
    delete products[name];
    populateDropdowns();
    alert(`${name} deleted.`);
  }
}

function mainLogin() {
  const user = document.getElementById('mainUsername').value;
  const pass = document.getElementById('mainPassword').value;
  if (user === 'user' && pass === '1234') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('currentDateTime').innerText = 'Date & Time: ' + new Date().toLocaleString();
  } else {
    alert('Incorrect username or password');
  }
}

populateDropdowns();
