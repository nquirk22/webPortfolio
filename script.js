
const SITE = document.querySelector('.site');
const OVERLAY = document.querySelector('.overlay');
const TRIGGER = document.querySelector('.trigger');
const XTRIGGER = document.querySelector('.xtrigger');
const REVEAL = document.querySelector('.main-nav');
const MENUITEMS = REVEAL.querySelectorAll('nav a');
const MENUARRAY = Array.apply(null, MENUITEMS);
const HELLO_ELT = document.querySelector("#hello");// for masthead animation
const DOWN_ARROW = document.querySelector('.arrow');


// Toggle reveal class on body element, set aria-expanded and screen reader text on TRIGGER:
function revealMenu() {
  SITE.classList.toggle('reveal');
  OVERLAY.classList.toggle('obscure');
  if ( REVEAL.getAttribute('aria-expanded') == 'false' ) {
      REVEAL.setAttribute('aria-expanded', true);
  } else {
    REVEAL.setAttribute('aria-expanded', false);
  }

  TRIGGER.setAttribute('style', 'opacity: 0;left: -5em;');
  XTRIGGER.setAttribute('style', 'transition: left .6s;opacity: 1;left: 2em');

}

function hideMenu() {
  SITE.classList.toggle('reveal');
  OVERLAY.classList.toggle('obscure');
  if ( REVEAL.getAttribute('aria-expanded') == 'false' ) {
      REVEAL.setAttribute('aria-expanded', true);
  } else {
    REVEAL.setAttribute('aria-expanded', false);
  }
  XTRIGGER.setAttribute('style', 'transition: left .6s;opacity: 0;left: -5em;');
  TRIGGER.setAttribute('style', 'transition: opacity .6s;opacity: 1;left: 2em');

}



// Hide nav area when focus shifts away:
function catchFocus() {
	if ( TRIGGER.getAttribute('aria-expanded') == 'true' &&
      !( MENUARRAY.includes(document.activeElement) ||
          document.activeElement === TRIGGER ) ) {
		revealMenu();
	} else {
		return;
	}
}

// Hide nav area when touch or click happens elsewhere:
function clickTarget(e) {
	if ( REVEAL.getAttribute('aria-expanded') ==
      'true' && !REVEAL.contains(e.target) ) {
		hideMenu();
	}
}

function downArrow() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    DOWN_ARROW.style.opacity = ".3";
    // DOWN_ARROW.style.bottom = "1.1em";
    DOWN_ARROW.style.width = "2rem";
    DOWN_ARROW.style.height = "auto";
  } else {
    DOWN_ARROW.style.opacity = "1";
    // DOWN_ARROW.style.bottom = "3.5em";
    DOWN_ARROW.style.width = "3rem";
    DOWN_ARROW.style.height = "auto";
  }
}

// EVENT LISTENERS----------------------------------------------------
// Listen for clicks on TRIGGER button:
TRIGGER.addEventListener('click', revealMenu, false);
XTRIGGER.addEventListener('click', hideMenu, false);

// Listen for focus changes:
SITE.addEventListener('focusin', catchFocus, true);

// Listen for clicks:
SITE.addEventListener('click', function(e) { clickTarget(e); }, true);

for (let i = 0; i < MENUITEMS.length; i++) {
  MENUITEMS[i].addEventListener('click', hideMenu, false);
}

window.addEventListener('scroll', downArrow, false);

// DOWN ARROW ANIMATION--------------------------------------------------
var _throttleTimer = null;
var _throttleDelay = 100;
var $window = $(window);
var $document = $(document);

$document.ready(function () {

    $window
        .off('scroll', ScrollHandler)
        .on('scroll', ScrollHandler);

});


function ScrollHandler(e) {
    //throttle event:
    clearTimeout(_throttleTimer);
    _throttleTimer = setTimeout(function () {
        if ($window.scrollTop() + $window.height() > $document.height() - 100) {
            DOWN_ARROW.style.opacity = "0";
        }
    }, _throttleDelay);
}



// MASTHEAD ANIMATION----------------------------------------------------
var captions = ['Hi,',
  "I'm Nathan",
  "problem solver",
  "software developer"];

function type(elt, priorLength, str, next) {
  if (elt.innerHTML.length != priorLength + str.length) {
    elt.innerHTML += str.charAt(elt.innerHTML.length - priorLength);
    setTimeout(type, 150, elt, priorLength, str, next);
  } else {
    if (next) {
      next();
    }
  }
}

function erase(elt, toKeep, next) {
  let eltLength = elt.innerHTML.length;
  if ( eltLength > toKeep ) {
    elt.innerHTML = elt.innerHTML.substr(0, eltLength - 1);
    setTimeout(erase, 100, elt, toKeep, next);
  } else {
    if (next) {
      next();
    }
  }
}

$(document).ready(function() {
    var cursorAnimation = function() {
        $('#cursor').animate({
            opacity: 0
        }, 'fast', 'swing').animate({
            opacity: 1
        }, 'fast', 'swing');
    }
    interval = setInterval (cursorAnimation, 850);
    var period = function() {
      clearInterval(interval);
      document.querySelector('#period').style.width = "1vw";
      document.querySelector('#period').style.opacity = "1";
      document.querySelector('#cursor').style.visibility = "collapse";

    };
    // var seventh = function() {setTimeout(type, 700, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[3], period);};// prints [2]
    // var sixth = function() {setTimeout(erase, 2000, HELLO_ELT, 6, seventh)};// erases [2]
    // var fifth = function() {setTimeout(type, 700, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[2], sixth);};// prints [2]
    // var fourth = function() {setTimeout(erase, 2000, HELLO_ELT, 6, fifth)};// erases [1]
    var third = function() {setTimeout(type, 700, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[1], period);};// prints [1]
    var second = function() {setTimeout(erase, 2000, HELLO_ELT, 0, third)};// erases [0]

    setTimeout(type, 2250, HELLO_ELT, HELLO_ELT.innerHTML.length, captions[0], second);
    // var third = setTimeout(type, 2500, HELLO_ELT, captions[1]);
});
