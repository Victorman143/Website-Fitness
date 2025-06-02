document.getElementById('payNow').addEventListener('click', function () {
  const billingData = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    address: document.getElementById('address').value.trim(),
    city: document.getElementById('city').value.trim(),
    country: document.getElementById('country').value.trim(),
    zip: document.getElementById('zip').value.trim(),
    product: {
      title: document.getElementById('productTitle').textContent,
      price: document.getElementById('productPrice').textContent,
      total: document.getElementById('totalPrice').textContent
    }
  };

  

  console.log("Datos del pedido:", billingData);

  // Aquí integras con 2Checkout usando billingData
});


