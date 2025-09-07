document.addEventListener("DOMContentLoaded", function () {
  const paletteContainer = document.getElementById("palette-container");
  const generateAllBtn = document.getElementById("generate-all-btn");
  const addCardBtn = document.getElementById("add-card-btn");
  const removeCardBtn = document.getElementById("remove-card-btn");

  const initialCardCount = 3;

  function generateRandomHexColor() {
    const chars = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getContrastColor(hex) {
    const hexValue = hex.substring(1);
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  }

  function updateColorCard(cardElement) {
    const colorDisplay = cardElement.querySelector(".color-display");
    const hexCodeElement = cardElement.querySelector(".hex-code");
    const infoContainer = cardElement.querySelector(".color-info");
    const newColor = generateRandomHexColor();
    colorDisplay.style.backgroundColor = newColor;
    hexCodeElement.textContent = newColor.toUpperCase();
    infoContainer.style.backgroundColor = newColor;
    hexCodeElement.style.color = getContrastColor(newColor);
  }

  function createAndAppendCard() {
    const card = document.createElement("div");
    card.className = "color-card";
    card.innerHTML = `
      <div class="color-display"></div>
      <div class="color-info">
          <p class="hex-code"></p>
      </div>
    `;
    const colorDisplay = card.querySelector(".color-display");
    const hexCode = card.querySelector(".hex-code");
    colorDisplay.addEventListener("click", () => updateColorCard(card));
    hexCode.addEventListener("click", function () {
      navigator.clipboard.writeText(hexCode.textContent).then(() => {
        const originalText = hexCode.textContent;
        hexCode.textContent = "Copied!";
        setTimeout(() => {
          hexCode.textContent = originalText;
        }, 1500);
      });
    });
    updateColorCard(card);
    paletteContainer.appendChild(card);
  }

  for (let i = 0; i < initialCardCount; i++) {
    createAndAppendCard();
  }

  generateAllBtn.addEventListener("click", function () {
    const allCards = document.querySelectorAll(".color-card");
    allCards.forEach(updateColorCard);
  });

  addCardBtn.addEventListener("click", createAndAppendCard);

  removeCardBtn.addEventListener("click", function () {
    if (paletteContainer.children.length > 1) {
      paletteContainer.removeChild(paletteContainer.lastElementChild);
    }
  });
});
