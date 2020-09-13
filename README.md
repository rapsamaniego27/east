<!-- Heading -->
#  **East.js**

<!-- Description -->
**East slider** just like dulas.js, it also aims to be used with ease by enabling developers to customize the code under the hood.

This library is inspired by Wes' technique of creating sliders from his Beginner Javascript course.
So I decided to refactor the code and made it as customizable as it can be.

## Getting Started

There are 5 important elements to understand:
* **container** - the parent container of the slider
* **row** - is the main slider, we declare the width and height of it here.
* **track** - contains all of the slides
* **slide** - the slide item itself
* **controls** - handles the sliding next and prev

As you read through this, we will be giving a sample on how this will constructed from CSS, HTML up to Javascript.

### Installation
First is we install the CSS and JS. You can also get the local files from the repo.

It's not on NPM yet, but you can install the css and js files from the repo source. 
```HTML
<!-- CSS installed on the head tags -->
<link rel="stylesheet" href="https://raw.githubusercontent.com/rapsamaniego27/east/master/css/east.css">


<!-- Javascript installed in the bottom -->
<script src="https://raw.githubusercontent.com/rapsamaniego27/east/master/js/east.js" defer></script>
```


### Setting up the HTML

```HTML
<!-- Slider Container -->
<div class="slider-container">
  <!-- Slider Row -->
  <div class="slider-row">
    <!-- Slide Track -->
    <div class="slides-track">
    
      <!-- The Slides -->
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <!-- End of the slides -->
    
    </div>
  </div>

  <!-- Controls -->
  <div class="controls">
    <button class="goToPrev">← Prev</button>
    <button class="goToNext">Next →</button>
  </div>
 <!-- End Controls -->

</div>
```

### Setting up the CSS

#### Slider Container
It is recommended that we have declare a max-width for the **container** so that it also responds to mobile. 

This also makes the height **automatic** and **centered** in position.

```CSS
.slider-container{
  max-width:800px;
  height:auto;
  margin:0 auto;
}
```

#### Slider Row
Add a specific **height** to the slider itself.

You may add other styles if you want, like borders and shadows.
```CSS
.slider-row{
  height:400px;
  margin: 0 auto;
  border:2px solid black;
}
```

#### Slide
The CSS below is not mandatory, you may declare any css properties inside it as this element can contain more than one element like **heading**, **images**, **paragraphs**, etc.

```CSS
.slide{
  background:#D0007A;
  font-size: 100px;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 5px solid white;
}
```

#### Controls
Controls can be positioned anywhere on your slider, and styled any way you want.

```CSS
.controls {
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  align-items: center;
  margin:20px auto;
}

```

### Instantiating East Object
Lastly we instantiate the plugin for it to work, you may add in as many options if you want to expand the plugin. Enjoy!

```Javascript
const mySlider = new East({
 /* The Slider Element */
 sliderEl: document.querySelector('.slider-row'),

/* Slider Controls */
 controls:{
  prevEl: document.querySelector('.goToPrev'),
  nextEl: document.querySelector('.goToNext')
 }
});
```

## Under the Hood

### Plugin Styles
Below are the default styling of a slider.
Once installed, it injects these classes to position the slides properly.

```CSS
/* Parent Container */
.east-row{
 position:relative;
 width:100%;
}

/* This element will always be 100% of its slider container */
.east-track{
  width:100%;
  height:100%;
  overflow: hidden;
  position: relative;
}

/* Default styling of a slide */
.east-slide {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all .25s;
  transform: translateX(-200%);
}
```

#### State Styles
These styles are also part of the plugin, these states are injected to the slides, with each state giving off different positions

States are classified into 4:
* none
* prev
* current
* next

```CSS

/* A slide by default that does not have a state injected */
/* It puts the slide 200% off the slider */
.east-slide.east--next + .east-slide {
  transform: translateX(200%);
}


/* Previous state - it positions the slide on the left side of its current slide */
.east-slide.east--prev {
  z-index: 10;
  transform: translateX(-100%);
}

/* Current state - it positions the slide in the center, showing it to users*/
.east-slide.east--current {
  z-index: 10;
  transform: translateX(0);
}

/* Next state - it positions the slide on the right side of its current slide */
.east-slide.east--next {
  z-index: 10;
  transform: translateX(100%);
}

```


### The Machine
Underneath it all contains the javascript for the plugin.. It uses the prototype methods in Javascript.

East slider is just a function containing prototypes attached to it.

We pass in the **slider element** and the **controls**. Then we verify if the element exists on the HTML, then we run the **variable declarations** and **default functions**.

```Javascript
function East({sliderEl, controls}) {

 /* Destructured controls object */
 const {prevEl, nextEl} = controls;
 
 /* Verifies if slider element exists or is an element */
 if ((sliderEl instanceof Element) && sliderEl) {
  this.setDefaultClasses(sliderEl);

   //declare variables

  // run functions
 
 }else{
  console.error('No slider is passed in');
 }

}
```

#### Prototype : startSlider
It grabs the current, prev and next elements in the slider.

We also loop in the slides and injecting the class called `east-slide`.

```Javascript
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
```

#### Prototype : applyClasses
For **current**, **prev** and **next** elements, we inject in their classes.

```Javascript
East.prototype.applyClasses = function () {
 this.current.classList.add('east--current');
 this.prev.classList.add('east--prev');
 this.next.classList.add('east--next');

};
```

#### Prototype : move
This method tells which direction to move depending if either **next** or **previous** button is clicked.

It simply removes all classes of the current element and adds them back in with the new elements with their updated states, using **destructuring**

```Javascript
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

```
#### Prototype : bindControls
We bind the **prev** and **next** element to a click event, passing in the **move** method.

```Javascript
/* Binds the Prev and Next button to a click event */
East.prototype.bindControls = function(prevEl, nextEl){
 // Event listeners
 prevEl.addEventListener('click', () => this.move('back'));
 nextEl.addEventListener('click', () => this.move());
};
```

#### Prototype : setDefaultClasses
It injects the default classes to slider.

```Javascript
/* Sets the classes for Track and Container */
East.prototype.setDefaultClasses = function(sliderEl){
 sliderEl.classList.add('east-row');
 sliderEl.firstElementChild.classList.add('east-track');
};
```