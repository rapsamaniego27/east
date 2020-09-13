/* Code javascript here */

function East({sliderEl, controls}) {

 /* Destructured controls object */
 const {prevEl, nextEl} = controls;
 
 /* Verifies if slider element exists or is an element */
 if ((sliderEl instanceof Element) && sliderEl) {
  this.setDefaultClasses(sliderEl);

  // select the elements needed for the sliderEl
  this.slides = sliderEl.querySelector('.east-track');
  this.slidesChildren = Array.from(this.slides.children);
  this.east = sliderEl;

  // when this sliderEl is created, run the start sliderEl function
  this.startSlider();
  this.applyClasses();
  this.bindControls(prevEl, nextEl);
 }else{
  console.error('No slider is passed in');
 }

}

East.prototype.startSlider = function () {
 this.current =
  this.east.querySelector('.east--current') || this.slides.firstElementChild;
 this.prev =
  this.current.previousElementSibling || this.slides.lastElementChild;
 this.next = this.current.nextElementSibling || this.slides.firstElementChild;

 /* Adds this class to the slides */
  this.slidesChildren.forEach(slide => {
   slide.classList.add('east-slide');
  });
};

East.prototype.applyClasses = function () {
 this.current.classList.add('east--current');
 this.prev.classList.add('east--prev');
 this.next.classList.add('east--next');

};

East.prototype.move = function (direction) {
 // first strip all the classes off the current slides
 const classesToRemove = ['east--prev', 'east--current', 'east--next'];
 this.prev.classList.remove(...classesToRemove);
 this.current.classList.remove(...classesToRemove);
 this.next.classList.remove(...classesToRemove);
 if (direction === 'back') {
  // make an new array of the new values, and destructure them over and into the prev, current and next variables
  [this.prev, this.current, this.next] = [
   // get the prev slide, if there is none, get the last slide from the entire sliderEl for wrapping
   this.prev.previousElementSibling || this.slides.lastElementChild,
   this.prev,
   this.current,
  ];
 } else {
  [this.prev, this.current, this.next] = [
   this.current,
   this.next,
   // get the next slide, or if it's at the end, loop around and grab the first slide
   this.next.nextElementSibling || this.slides.firstElementChild,
  ];
 }

 this.applyClasses();
};

/* Binds the Prev and Next button to a click event */
East.prototype.bindControls = function(prevEl, nextEl){
 // Event listeners
 prevEl.addEventListener('click', () => this.move('back'));
 nextEl.addEventListener('click', () => this.move());
};

/* Sets the classes for Track and Container */
East.prototype.setDefaultClasses = function(sliderEl){
 sliderEl.classList.add('east-row');
 sliderEl.firstElementChild.classList.add('east-track');
};


/* window.addEventListener('keyup', function (e) {
 if (e.key === 'ArrowRight') {
  dogSlider.move();
 }
});
 */