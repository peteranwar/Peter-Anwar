document.addEventListener("DOMContentLoaded", () => {
  const openPopupButtons = document.querySelectorAll(".plus-icon");
  const closePopupButtons = document.querySelectorAll(".close-popup");

  openPopupButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const overlay = event.target
        .closest(".product-card")
        .querySelector(".overlay");
  
      setTimeout(() => {
        document.querySelectorAll(".overlay").forEach((ov) => {
          ov.style.display = "none";
        });
  
        overlay.style.display = "flex";
      }, 0);
    })
  );

  closePopupButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const overlay = event.target.closest(".overlay");
      overlay.style.display = "none";
    })
  );

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".overlay").forEach((overlay) => {
      if (
        overlay.style.display === "flex" &&
        !overlay.querySelector(".popup-card").contains(event.target) &&
        !event.target.classList.contains("plus-icon")
      ) {
        overlay.style.display = "none";
      }
    });
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    let selectedColor = null;
    let selectedSize = null;
    let variantID = null;

    const colorOptions = card.querySelectorAll(".color-option");
    const sizeSelect = card.querySelector(".size-select");
    const productData = card.querySelector(".product-data");
    const addToCartBtn = card.querySelector(".add-to-cart_btn");

    colorOptions.forEach((option) =>
      option.addEventListener("click", (event) => {
        colorOptions.forEach((color) => color.classList.remove("active"));
        event.target.classList.add("active");
        selectedColor = event.target.getAttribute("data-color");
      })
    );

    if (sizeSelect) {
      sizeSelect.addEventListener("input", () => {
        selectedSize = sizeSelect.value;
      });
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", async () => {
        if (!selectedColor || !selectedSize) {
          alert("Please select a color and size.");
          return;
        }

        const variants = JSON.parse(productData.textContent);
        const matchedVariant = variants.find(
          (variant) =>
            variant.options.includes(selectedColor) &&
            variant.options.includes(selectedSize)
        );

        if (!matchedVariant) {
          alert("This variant is not available.");
          return;
        }

        variantID = matchedVariant.id;

        const productsToAdd = [{ id: variantID, quantity: 1 }];

        if (selectedColor === "Black" && selectedSize === "Medium") {
          productsToAdd.push({ id: 44693574484151, quantity: 1 }); // ID of Soft Winter Jacket
        }

        try {
          await fetch("/cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: productsToAdd }),
          });

          alert("Product added to cart.");
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      });
    }
  });
});
