class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `<slot name="product-card-content"></slot>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const openOverlayButton = this.querySelector(".plus-icon");
    const overlay = this.querySelector(".overlay");
    const closePopupButtons = this.querySelector(".close-popup");
    const colorOptions = this.querySelectorAll(".color-option");
    const sizeSelection = this.querySelector(".size-select");
    const addToCartButton = this.querySelector(".add-to-cart_btn");

    let selectedColor = null;
    let selectedSize = sizeSelection.value;
    let variantID = null;

    openOverlayButton.addEventListener(
      "click",
      () => (overlay.style.display = "flex")
    );

    closePopupButtons.addEventListener(
      "click",
      () => (overlay.style.display = "none")
    );

    //TODO Handle Color User Selection
    colorOptions.forEach((option) =>
      option.addEventListener("click", (event) => {
        colorOptions.forEach((color) => color.classList.remove("active"));

        event.target.classList.add("active");
        selectedColor = event.target.getAttribute("data-color");
      })
    );

    //TODO Handle Size User Selection
    sizeSelection.addEventListener(
      "input",
      () => (selectedSize = sizeSelection.value)
    );

    //TODO Handle Add To Cart Button

    addToCartButton.addEventListener("click", async (event) => {
      const selectedProductVariants = JSON.parse(
        event.target.previousElementSibling.textContent
      );

      if (!selectedColor || !selectedSize) {
        alert("Please select a color and size.");
        return;
      }

      variantID = selectedProductVariants.find(
        (variant) =>
          variant.options.includes(selectedColor) &&
          variant.options.includes(selectedSize)
      )["id"];

      let productsToAddToCart = [{ id: variantID, quantity: 1 }];

      if (selectedColor === "Black" && selectedSize === "Medium") {
        productsToAddToCart.push({ id: 44693574484151, quantity: 1 });
      }

      await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: productsToAddToCart }),
      })
        .then((response) => {
          alert("Product added to cart");
          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
}

customElements.define("product-card", ProductCard);
