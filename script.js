// =====================================================
// 1. GET THE ELEMENTS WE NEED FROM THE PAGE
// =====================================================
var unitPriceText = document.getElementById("unit-price");
var quantityText = document.getElementById("quantity");
var totalText = document.getElementById("total");
var plusButton = document.getElementById("plus");
var minusButton = document.getElementById("minus");
var sizeButtons = document.querySelectorAll("input[name='size']");

// =====================================================
// 2. VARIABLES THAT STORE THE CURRENT CHOICE
// =====================================================
var price = 1499;     // price of the selected size
var quantity = 1;     // how many the user wants

// =====================================================
// 3. ONE FUNCTION THAT UPDATES THE SCREEN
//    (we call it every time price or quantity changes)
// =====================================================
function updateScreen() {
  // toLocaleString("en-IN") adds commas the Indian way: 1499 -> 1,499
  unitPriceText.textContent = "₹" + price.toLocaleString("en-IN");
  quantityText.textContent = quantity;
  totalText.textContent = "₹" + (price * quantity).toLocaleString("en-IN");
}

// =====================================================
// 4. VARIANTS: when a size is selected, change the price
// =====================================================
for (var i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].addEventListener("change", function () {
    price = Number(this.value);   // value is text ("1999"), Number() makes it a number
    updateScreen();
  });
}

// =====================================================
// 5. QUANTITY: + and - buttons (between 1 and 10)
// =====================================================
plusButton.addEventListener("click", function () {
  if (quantity < 10) {
    quantity = quantity + 1;
    updateScreen();
  }
});

minusButton.addEventListener("click", function () {
  if (quantity > 1) {
    quantity = quantity - 1;
    updateScreen();
  }
});

// =====================================================
// 6. MOBILE MENU: show/hide the menu on button click
// =====================================================
var menuButton = document.getElementById("menu-button");
var nav = document.getElementById("nav");

menuButton.addEventListener("click", function () {
  nav.classList.toggle("open");   // adds the class if missing, removes it if present
});

// Close the menu after a link is clicked
nav.addEventListener("click", function () {
  nav.classList.remove("open");
});

// =====================================================
// 7. FORM VALIDATION
// =====================================================
var form = document.getElementById("enquiry-form");
var successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  // Read what the user typed. trim() removes spaces at the start and end.
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();

  var isValid = true;   // we change this to false if any field is wrong

  // Name: at least 2 characters
  if (name.length < 2) {
    document.getElementById("name-error").textContent = "Please enter your full name.";
    isValid = false;
  } else {
    document.getElementById("name-error").textContent = "";
  }

  // Email: must contain "@" and a "." after it (simple check)
  if (!email.includes("@") || !email.includes(".") || email.indexOf("@") > email.lastIndexOf(".")) {
    document.getElementById("email-error").textContent = "Please enter a valid email, like name@example.com.";
    isValid = false;
  } else {
    document.getElementById("email-error").textContent = "";
  }

  // Phone: exactly 10 characters, and all of them numbers
  if (phone.length !== 10 || isNaN(phone)) {
    document.getElementById("phone-error").textContent = "Please enter a 10-digit mobile number.";
    isValid = false;
  } else {
    document.getElementById("phone-error").textContent = "";
  }

  // Message: at least 10 characters
  if (message.length < 10) {
    document.getElementById("message-error").textContent = "Please write at least 10 characters.";
    isValid = false;
  } else {
    document.getElementById("message-error").textContent = "";
  }

  // If anything was wrong, hide any old success message and stop here
  if (!isValid) {
    successMessage.style.display = "none";
    return;
  }

  // Everything is correct: show success message and clear the form
  successMessage.textContent = "Thank you, " + name + "! We received your enquiry and will reply within one working day.";
  successMessage.style.display = "block";
  form.reset();
});

// Show the correct starting values when the page loads
updateScreen();
