const mySlider = new East({
 sliderEl: document.querySelector('.slider-row'),

 controls:{
  prevEl: document.querySelector('.goToPrev'),
  nextEl: document.querySelector('.goToNext')
 }
});


const catalogueSlider = new East({
 sliderEl: document.querySelector('.catalogue-row'),

 controls: {
  prevEl: document.querySelector('.prevCatalogue'),
  nextEl: document.querySelector('.nextCatalogue')
 }
});

const personSlider = new East({
 sliderEl: document.querySelector('.person-row'),

 controls: {
  prevEl: document.querySelector('.prevPerson'),
  nextEl: document.querySelector('.nextPerson')
 }
});