const productButtons = document.querySelectorAll("button");
const shoppingCart = [];
const cart = document.querySelector("#cart");
const openCartButton = document.querySelector("#open-cart");
function updateCart() {
  if (cart) {
    cart.textContent = `Cart (${shoppingCart.length})`;
  }
}
function addClickEvent() {
  //Hämta alla knappar som är klickbara
  const productButtons = document.querySelectorAll("button");
  productButtons.forEach((productButtons) => {
    productButtons.addEventListener("click", (event) => {
      //Här börjar hanteringen när en knapp klickas på

      const productName = productButtons.getAttribute("data-product");
      if (productName) {
        shoppingCart.push(productName);
        updateCart();
        listProductsInCart();
        console.log();
      }
    });
  });
}
// Void betyder att funktionen ej returnerar något värde
// För att kunna använda parentElement behöver vi göra om det till ett HTMLElement istället för typen EventTarget
function listProductsInCart() {
  console.log(shoppingCart);
}
function displayCartContent() {
  if (openCartButton) {
    openCartButton.addEventListener("click", () => {
      console.log(shoppingCart); // Du kan ersätta med kod för att visa varukorgens innehåll på användargränssnittet
    });
  }
}
addClickEvent();
displayCartContent();
