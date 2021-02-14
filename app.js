'use strict';

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
// Times the image has been shown

let totalClicks = 0;
let clicksAllowed = 25;
let allItems = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let resultData = document.querySelector('section');
let resultButton = document.querySelector('div');


function Item(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExt}`;
  this.views = 0;
  this.clicks = 0;
  allItems.push(this);
}

new Item('usb', 'gif');
new Item('sweep', 'png');
new Item('bag');
new Item('banana');
new Item('bathroom');
new Item('boots');
new Item('breakfast');
new Item('bubblegum');
new Item('chair');
new Item('cthulhu');
new Item('dog-duck');
new Item('dragon');
new Item('pen');
new Item('pet-sweep');
new Item('scissors');
new Item('shark');
new Item('tauntaun');
new Item('unicorn');
new Item('water-can');
new Item('wine-glass');

function itemsRandomIndex() {
  return Math.floor(Math.random() * allItems.length);
}

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

function renderItems() {
  let indexArray = [];
  indexArray[0] = itemsRandomIndex();
  indexArray[1] = itemsRandomIndex();
  indexArray[2] = itemsRandomIndex();
  while (indexArray[0] === indexArray[1]) {
    indexArray[1] = itemsRandomIndex();
    console.log('duplicate found');
  }
  while (indexArray[1] === indexArray[2]) {
    indexArray[2] = itemsRandomIndex();
  }
  while (indexArray[2] === indexArray[0]) {
    indexArray[0] = itemsRandomIndex();
  }
  console.log(indexArray);


  imageOne.src = allItems[indexArray[0]].src;
  imageOne.title = allItems[indexArray[0]].name;
  allItems[indexArray[0]].views++;

  imageTwo.src = allItems[indexArray[1]].src;
  imageTwo.title = allItems[indexArray[1]].name;
  allItems[indexArray[1]].views++;

  imageThree.src = allItems[indexArray[2]].src;
  imageThree.title = allItems[indexArray[2]].name;
  allItems[indexArray[2]].views++;
}

// renderItems();

function renderResult() {
  let resultList = document.querySelector('ul');
  for (let i = 0; i < allItems.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${allItems[i].name}: ${allItems[i].clicks} votes and seen ${allItems[i].views} times.`;
    resultList.appendChild(liElem);
  }
}

function handleClick(event) {
  if (event.target === resultData) {
    alert('Please, select an image.');
  }

  totalClicks++;
  let itemClicked = event.target.title;

  for (let i = 0; i < allItems.length; i++) {
    if (itemClicked === allItems[i].name) {
      allItems[i].clicks++;
    }
  }

  renderItems();
  if (totalClicks === clicksAllowed) {
    resultData.removeEventListener('click', handleClick);
  }
}

function handleButtonClick(event) {
  if (totalClicks === clicksAllowed) {
    renderResult();
  }
}

renderItems();

resultData.addEventListener('click', handleClick);
resultButton.addEventListener('click', handleButtonClick);