let jsTranslations;

if (screen.width > 1360) {
  // do nothing, leave the body size as it is
} else if (screen.width === 1360) {
  // do nothing, leave the body size as it is
} else {
  document.body.style.display = "none";
  var message = document.createElement("div");
  message.innerText = "Webapp only for resolutions 1360 and higher. Sorry :(";
  message.style.fontSize = "36px";
  message.style.color = "black";
  message.style.textAlign = "center";
  message.style.position = "absolute";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  document.body.parentElement.insertBefore(message, document.body);
}

function toggleTheme() {
  var body = document.body;
  var sunIcon = document.getElementById("sunIcon");
  var moonIcon = document.getElementById("moonIcon");

  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    body.classList.add("dark-theme");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
}

const stars = [];

const numStars = 200;
const background = document.getElementById("background");

// Create stars
for (let i = 0; i < numStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = `${Math.random() * 99}%`;
  star.style.left = `${Math.random() * 99}%`;
  star.style.setProperty("--delay", Math.random());
  background.appendChild(star);
  stars.push(star);
}

const meteorite = document.querySelector(".meteorite");

function showMeteorite() {
  const randomY = Math.random() * 100;
  meteorite.style.top = `${randomY}%`;
  meteorite.style.animationDuration = `${Math.random() * 2 + 4}s`;
  meteorite.style.animationDelay = `0s`;
  setTimeout(() => {
    meteorite.style.animation = "none";
    setTimeout(() => {
      meteorite.style.animation = "meteorite 1s linear";
    }, 1000);
  }, 5000);
}

showMeteorite();
setInterval(showMeteorite, 10000);

// LANGUAGE BUTTON
const langSelect = document.createElement("select");
langSelect.style.position = "fixed";
langSelect.style.width = "120px";
langSelect.style.height = "25px";
langSelect.style.fontSize = "16px";
langSelect.style.fontFamily = "Orbitron";
langSelect.style.bottom = "40px";
langSelect.style.left = "100px";
langSelect.style.margin = "0px";
langSelect.style.borderRadius = "10px";
langSelect.style.textAlign = "center";
const langEn = document.createElement("option");
const langEs = document.createElement("option");
const langZh = document.createElement("option");
const langFr = document.createElement("option");
const langDe = document.createElement("option");
const langPt = document.createElement("option");
const langRu = document.createElement("option");
const langHi = document.createElement("option");
const langAr = document.createElement("option");
const langKo = document.createElement("option");
langEn.text = "English";
langEs.text = "Español";
langZh.text = "中文";
langFr.text = "Français";
langDe.text = "Deutsch";
langPt.text = "Português";
langRu.text = "Eрусский";
langHi.text = "हिन्दी";
langAr.text = "العربية";
langKo.text = "한국어";
langEn.value = "en";
langEs.value = "es";
langZh.value = "zh";
langFr.value = "fr";
langDe.value = "de";
langPt.value = "pt";
langRu.value = "ru";
langHi.value = "hi";
langAr.value = "ar";
langKo.value = "ko";
langSelect.add(langEn);
langSelect.add(langEs);
langSelect.add(langZh);
langSelect.add(langFr);
langSelect.add(langDe);
langSelect.add(langPt);
langSelect.add(langRu);
langSelect.add(langHi);
langSelect.add(langAr);
langSelect.add(langKo);
document.body.appendChild(langSelect);

// Create function to change language
function changeLanguage(lang) {
  if (
    lang == "ar" ||
    lang == "de" ||
    lang == "en" ||
    lang == "es" ||
    lang == "fr" ||
    lang == "hi" ||
    lang == "ko" ||
    lang == "pt" ||
    lang == "ru" ||
    lang == "zh"
  ) {
    langSelect.value = lang;
    fetch(`locales/${lang}.json`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelectorAll("[data-key]").forEach((element) => {
          const key = element.getAttribute("data-key");
          if (data.hasOwnProperty(key)) {
            if (element.tagName === "INPUT") {
              element.setAttribute("value", data[key]);
            } else {
              element.textContent = data[key];
            }
          }
        });
      });

    // Load JavaScript translations
    fetch(`locales/${lang}.json`)
      .then((response) => response.json())
      .then((data) => {
        jsTranslations = data;
        // Retrieve the translated text for the "support" key from your JSON translation file
        const translatedSupportText = jsTranslations.support1;

        // Append the heart symbol at the end of the translated text
        const supportParagraph = document.querySelector(
          'p[data-key="support1"]'
        );
        supportParagraph.innerHTML = `${translatedSupportText} ❤️`;
      });
  } else {
    fetch(`locales/en.json`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelectorAll("[data-key]").forEach((element) => {
          const key = element.getAttribute("data-key");
          if (data.hasOwnProperty(key)) {
            if (element.tagName === "INPUT") {
              element.setAttribute("value", data[key]);
            } else {
              element.textContent = data[key];
            }
          }
        });
      });

    // Load JavaScript translations
    fetch(`locales/en.json`)
      .then((response) => response.json())
      .then((data) => {
        jsTranslations = data;
      });
  }
}

// Add event listener
langSelect.addEventListener("change", (event) => {
  const lang = event.target.value;
  changeLanguage(lang);
});

// Initialize the default language
let defaultLanguage = "en";
let languageCode;

// Function to detect browser language
function detectBrowserLanguage() {
  const browserLanguage = navigator.language || navigator.userLanguage;

  languageCode = browserLanguage.substr(0, 2); // Extract the first two letters (language code)

  if (browserLanguage.includes("-")) {
    const regionCode = browserLanguage.split("-")[1]; // Extract the region code if present
    return `${languageCode}-${regionCode}`; // Return the language code with region code
  }

  return languageCode; // Return the language code
}

// Check if browser language is supported, otherwise fallback to default language
const browserLanguage = detectBrowserLanguage();

if (
  ["en", "es", "zh", "fr", "de", "pt", "ru", "hi", "ar", "ko"].includes(
    browserLanguage
  )
) {
  defaultLanguage = browserLanguage;
}
// Call the changeLanguage function with the default language
changeLanguage(languageCode);

// BLUR BACKGROUND WITH DIALOG BOX
var donateLink = document.getElementById("donate-link");
donateLink.addEventListener("click", function (event) {
  // Prevent the default link behavior
  event.preventDefault();

  // Show the dialog box
  var dialog = document.getElementById("dialog");
  dialog.style.display = "block";

  // Add the blur class to the background container element
  var backgroundContainer = document.querySelector(".container");
  backgroundContainer.classList.add("blur");
  var backgroundContainerbuy = document.querySelector(".container-buy");
  backgroundContainerbuy.classList.add("blur");
  dialog.classList.remove("blur");

  // Attach a click event listener to the "Close" button
  var closeButton = document.getElementById("close-dialog");
  closeButton.addEventListener("click", function (event) {
    // Hide the dialog box
    dialog.style.display = "none";

    // Remove the blur class from the background container element
    backgroundContainer.classList.remove("blur");
    backgroundContainerbuy.classList.remove("blur");
  });
});

// Get the copy button element
const copyButton = document.getElementById("copy-button");

// Get the wallet address element
const walletAddress = document.querySelector('p[data-key="wallet"]');

// Add a click event listener to the copy button
copyButton.addEventListener("click", function () {
  // Create a temporary input element
  const tempInput = document.createElement("input");

  // Set the value of the input element to the wallet address
  tempInput.value = walletAddress.textContent;

  // Append the input element to the document body
  document.body.appendChild(tempInput);

  // Select the value of the input element
  tempInput.select();

  // Copy the selected value to the clipboard
  document.execCommand("copy");

  // Remove the temporary input element from the document body
  document.body.removeChild(tempInput);

  // Change the copy button icon to a green tick
  copyButton.innerHTML = "&#x2714;";
  // Apply CSS styles to change the copy button icon color to green
  copyButton.style.color = "green";

  // Disable the copy button to prevent multiple clicks
  copyButton.disabled = true;
});

// Function to toggle containers
function toggleContainers(showContainer, hideContainer) {
  document.querySelector(showContainer).style.display = "block";
  document.querySelector(hideContainer).style.display = "none";
}

// Click event for "Token" link
document.getElementById("token-link").addEventListener("click", function () {
  toggleContainers(".container-buy", ".container");
});

// Click event for "Home" link
document.getElementById("home-link").addEventListener("click", function () {
  toggleContainers(".container", ".container-buy");
});
