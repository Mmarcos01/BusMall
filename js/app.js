'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allItems = [];
let indexArrayCount = 6;
let indexArray = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let resultData = document.querySelector('section');

function Item(name, fileExt = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExt}`;
  this.views = 0;
  this.clicks = 0;
  allItems.push(this);
}

let retrievedItems = localStorage.getItem('items');

if(retrievedItems) {
  let parsedItems = JSON.parse(retrievedItems);
  allItems = parsedItems;
} else {
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
}

function itemsRandomIndex() {
  return Math.floor(Math.random() * allItems.length);
}

function imageRender(imageIndex, imageElement) {
  imageElement.src = allItems[imageIndex].src;
  imageElement.title = allItems[imageIndex].name;
  allItems[imageIndex].views++;

}

function renderItems() {
  while (indexArray.length < indexArrayCount) {
    let randomNumber = itemsRandomIndex();
    while (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  let firstItemIndex = indexArray.shift();
  let secondItemIndex = indexArray.shift();
  let thirdItemIndex = indexArray.shift();

  imageRender(firstItemIndex, imageOne);
  imageRender(secondItemIndex, imageTwo);
  imageRender(thirdItemIndex, imageThree);
}

function handleClick(event) {
  if (event.target === resultData) {
    alert('Please select an image.');
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
    renderChart();
    let stringifiedItems = JSON.stringify(allItems);
    localStorage.setItem('items', stringifiedItems);
  }
}

renderItems();

function renderChart() {
  let itemNames = [];
  let itemViews = [];
  let itemClicks = [];
  for (let i = 0; i < allItems.length; i++) {
    itemNames.push(allItems[i].name);
    itemViews.push(allItems[i].views);
    itemClicks.push(allItems[i].clicks);
  }
  let chartObject = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Views',
        data: itemViews,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: itemClicks,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'black',
        borderWidth: 1,
      }],
    },
    options: {
      legend: {
        labels: {
          fontColor: 'black',
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'black',
          },
          gridLines: {
            color: 'rgb(67, 112, 112)',
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            fontColor: 'black',
          },
          gridLines: {
            color: 'rgb(67, 112, 112)',
          },
        }],
      },
    },
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject); //eslint-disable-line
}

resultData.addEventListener('click', handleClick);