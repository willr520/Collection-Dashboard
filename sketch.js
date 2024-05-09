let Morocco;
let data;
let maxDistance;
let spacer;
let DINMittelschriftStd;
let DINEngschriftStd;
let isAllClicked = false;

let hoveredSquareIndex = -1;
let selectedCountry = "";

document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById("toggleButton");
  const sidebar = document.querySelector(".sidebar");
  let sidebarWidth;
  const aboutListItem = document.getElementById("About");
  const originalTitleHTML = document.querySelector(".title").innerHTML;

  aboutListItem.addEventListener("click", function() {
    document.querySelector(".title").innerHTML = originalTitleHTML;
    document.querySelector("canvas").style.display = "none";
    const prevSelected = document.querySelector(".selected");
    if (prevSelected) {
      prevSelected.classList.remove("selected");
    }
    selectedCountry = "";
  });

  toggleButton.addEventListener("click", function() {
    sidebar.classList.toggle("sidebar-open");
    toggleButton.textContent = sidebar.classList.contains("sidebar-open") ? "<" : ">";
    sidebarWidth = sidebar.offsetWidth;
    toggleButton.style.left = sidebar.classList.contains("sidebar-open") ? sidebarWidth + 20 + "px" : "20px";
  });

  const countrySelect = document.getElementById("countrySelect");

  fetch("countries.json")
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
      const uniqueCountries = new Set();

      data.country.forEach(country => {
        const countryName = country.Countries;
        uniqueCountries.add(countryName);
      });

      uniqueCountries.forEach(countryName => {
        const li = document.createElement("li");
        li.textContent = countryName;
        li.style.color = "white";
        countrySelect.appendChild(li);

        li.addEventListener("click", function() {
          document.querySelector(".title").innerHTML = originalTitleHTML;
          document.querySelector("canvas").style.display = "block";
          const prevSelected = document.querySelector(".selected");
          if (prevSelected) {
            prevSelected.classList.remove("selected");
          }
          this.classList.add("selected");
          selectedCountry = countryName;
          document.querySelector(".title").textContent = `${selectedCountry}`;
        });
      });
    });
});

function preload() {
  Morocco = loadImage("images/Morocco.png");
  VG = loadFont('VG5000.ttf');
  DINMittelschriftStd = loadFont('DINMittelschriftStd.otf');
  DINEngschriftStd = loadFont('DINEngschriftStd.otf');
}

function setup() {
  textFont(DINMittelschriftStd);
  createCanvas(windowWidth, windowHeight);
  maxDistance = dist(width / 2, height / 2, width, height);
}

function draw() {
  textAlign(CENTER);
  background(50);
  
  if (!data) {
    return;
  }

  const totalWidth = 22 * 40;
  const startX = (width - totalWidth) / 2;
  let currentX = startX;
  let currentY = 140;

  for (let i = 0; i < data.country.length; i++) {
    if (selectedCountry === "All" && data.country[i].Countries === "All") {
        continue; // Skip this iteration if selectedCountry is "All" and the country is also "All"
      }
    if (data.country[i].Countries === selectedCountry) {
      noStroke();
      if (data.country[i].ID === "1") {
        fill(255, 194, 0);
      } else if (data.country[i].ID === "2") {
        fill(255, 44, 196);
      } else if (data.country[i].ID === "3") {
        fill(237, 0, 0);
      } else if (data.country[i].ID === "4") {
        fill(0, 207, 255);
      } else if (data.country[i].ID === "5") {
        fill(119, 75, 221);
      }
      rect(currentX, currentY, 25, 25);
      if (
        mouseX >= currentX &&
        mouseX <= currentX + 25 &&
        mouseY >= currentY &&
        mouseY <= currentY + 25
      ) {
        hoveredSquareIndex = i;
        const hoveredData = data.country[hoveredSquareIndex];
        textSize(30);
        const widthX = 1800;
        if (hoveredData.ID === '1') {
          fill(255, 194, 0);
          text('VEHICLE', widthX, 150);
        } else if (hoveredData.ID === '2') {
          fill(255, 44, 196);
          text('AMMUNITION', widthX, 150);
        } else if (hoveredData.ID === '3') {
          fill(237, 0, 0);
          text('EQUIPMENT', widthX, 150);
        } else if (hoveredData.ID === '4') {
          fill(0, 207, 255);
          text('TECHNOLOGY', widthX, 150);
        } else if (hoveredData.ID === '5') {
          fill(119, 75, 221);
          text('WEAPONS', widthX, 150);
        } 
        fill(255);
        text(`Date: ${hoveredData.Date}`, widthX, 200);
        text(`Quantity: ${hoveredData.Quantity}`, widthX, 250);
        text(`CurrentValue: ${hoveredData.CurrentValue}`, widthX, 300);
        text(`AcquisitionValue: ${hoveredData.AcquisitionValue}`, widthX, 350);
        text(`${hoveredData.Description}`, widthX, 400, 300);
      } 
      currentX += 27;
      if (currentX + 27 > startX + totalWidth) {
        currentX = startX;
        currentY += 27;
      }
    } 
  }
  if (selectedCountry === "All") {
    for (let i = 0; i < data.country.length; i++) {
      if (selectedCountry === "All" && data.country[i].Countries === "All") {
        continue; // Skip this iteration if selectedCountry is "All" and the country is also "All"
      }
        noStroke();
        if (data.country[i].ID === "1") {
          fill(255, 194, 0);
        } else if (data.country[i].ID === "2") {
          fill(255, 44, 196);
        } else if (data.country[i].ID === "3") {
          fill(237, 0, 0);
        } else if (data.country[i].ID === "4") {
          fill(0, 207, 255);
        } else if (data.country[i].ID === "5") {
          fill(119, 75, 221);
        }
        rect(currentX, currentY, 14, 14);
        if (
          mouseX >= currentX &&
          mouseX <= currentX + 14 &&
          mouseY >= currentY &&
          mouseY <= currentY + 14
        ) {
          hoveredSquareIndex = i;
          const hoveredData = data.country[hoveredSquareIndex];
          textSize(30);
          const widthX = 1800;
          if (hoveredData.ID === '1') {
            fill(255, 194, 0);
            text('VEHICLE', widthX, 150);
          } else if (hoveredData.ID === '2') {
            fill(255, 44, 196);
            text('AMMUNITION', widthX, 150);
          } else if (hoveredData.ID === '3') {
            fill(237, 0, 0);
            text('EQUIPMENT', widthX, 150);
          } else if (hoveredData.ID === '4') {
            fill(0, 207, 255);
            text('TECHNOLOGY', widthX, 150);
          } else if (hoveredData.ID === '5') {
            fill(119, 75, 221);
            text('WEAPONS', widthX, 150);
          } 
          fill(255);
          rectMode(CENTER);
          text(`${hoveredData.Countries}`, widthX, 200);
          text(`Date: ${hoveredData.Date}`, widthX, 250);
          text(`Quantity: ${hoveredData.Quantity}`, widthX, 300);
          text(`CurrentValue: ${hoveredData.CurrentValue}`, widthX, 350);
          text(`AcquisitionValue: ${hoveredData.AcquisitionValue}`, widthX, 400);
          text(`${hoveredData.Description}`, widthX, 450, 300);
        } 
        currentX += 15;
        if (currentX + 15 > startX + totalWidth) {
          currentX = startX;
          currentY += 15;
        
      }
    }
  }
  
}
