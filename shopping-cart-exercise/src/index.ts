const productButtons: NodeList = document.querySelectorAll("button");
const shoppingCart: (string | null)[] = [];
const cart: HTMLElement | null = document.querySelector("#cart");
const productsList: HTMLElement | null = document.querySelector("#products");
const openCartButton: HTMLElement | null = document.querySelector("#open-cart");

function updateCart(): void {
  const cartAmountElem: HTMLElement | null =
    document.getElementById("productsInCart");

  // kolla så att elementet finns
  if (cartAmountElem) {
    cartAmountElem.innerText = shoppingCart.length.toString();
  }
}

function addClickEvent(): void {
  // Void betyder att funktionen ej returnerar något värde

  productButtons.forEach((productButton) => {
    productButton.addEventListener("click", (event: Event) => {
      // vi behöver få tag på elementets förälder som vi just klickade på
      // för vi vill använda oss av parentElement-metoden som bara funkar på html-element och ej på eventtarget
      // steg 1: gör om eventtarget till html-element
      const clickedElement: HTMLElement = event.target as HTMLElement;
      // steg 2: få tag på knappens föräldraelement
      if (clickedElement.parentElement) {
        const productTitle: string | null =
          clickedElement.parentElement.getAttribute("data-product");
        // checka om titeln redan finns i varukorgen
        if (shoppingCart.indexOf(productTitle) === -1) {
          shoppingCart.push(productTitle);
        } else {
          alert("boken finns redan");
        }
        console.log(shoppingCart);

        updateCart();
      }
    });
  });
}

function listProductsInCart(): void {
  if (cart) {
    // rensa det som finns i listan, så det inte blir en massa dubletter hela tiden
    productsList.innerHTML = "";
    shoppingCart.forEach((title: string | null) => {
      // skapa ett nytt html-element i js
      const el: HTMLElement = document.createElement("li");

      if (title) {
        el.innerText = title;
        el.classList.add("product-title");
        // skapa delete-knapp
        const deleteBtn: HTMLElement = document.createElement("button");
        deleteBtn.innerText = "X";
        // skapa eventlyssnare på knapp
        deleteBtn.addEventListener("click", () => {
          removeItemFromCart(title);
        });

        // lägg in knapp i li-elementet
        el.append(deleteBtn);

        // få in vårt nya element även i vår html
        productsList.append(el);
      }
    });
  }
}

if (openCartButton) {
  openCartButton.addEventListener("click", () => {
    if (cart) {
      cart.classList.toggle("hide");
      listProductsInCart();
    }
  });
}

function removeItemFromCart(item) {
  // vad har titeln för index i vår shoppingCart
  let index: number = shoppingCart.findIndex((title) => title === item);
  shoppingCart.splice(index, 1);
  listProductsInCart();
  updateCart();
}

addClickEvent();
