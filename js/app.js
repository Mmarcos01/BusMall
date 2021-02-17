'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allItems = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let resultData = document.querySelector('section');
// let resultButton = document.querySelector('div');


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

let indexArrayCount = 6;
let indexArray = [];

function renderItems() {
  while (indexArray.length < indexArrayCount) {
    let randomNumber = itemsRandomIndex();
    while (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  // console.log(indexArray);

  let firstItemIndex = indexArray.shift();
  let secondItemIndex = indexArray.shift();
  let thirdItemIndex = indexArray.shift();

  imageOne.src = allItems[firstItemIndex].src;
  imageOne.title = allItems[firstItemIndex].name;
  allItems[firstItemIndex].views++;

  imageTwo.src = allItems[secondItemIndex].src;
  imageTwo.title = allItems[secondItemIndex].name;
  allItems[secondItemIndex].views++;

  imageThree.src = allItems[thirdItemIndex].src;
  imageThree.title = allItems[thirdItemIndex].name;
  allItems[thirdItemIndex].views++;

  // function renderResult() {
  //   let resultList = document.querySelector('ul');
  //   for (let i = 0; i < allItems.length; i++) {
  //     let liElem = document.createElement('li');
  //     liElem.textContent = `${allItems[i].name}: ${allItems[i].clicks} votes and seen ${allItems[i].views} times.`;
  //     resultList.appendChild(liElem);
  //   }
  // }

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
    }
  }

  // function handleButtonClick(event) {
  //   if (totalClicks === clicksAllowed) {
  //     renderResult();
  //   }
  // }
  resultData.addEventListener('click', handleClick);

  // resultButton.addEventListener('click', handleButtonClick);
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: itemClicks,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        }],
      },
    },
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

renderChart();