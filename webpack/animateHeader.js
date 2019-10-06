// Detect request animation frame
var scroll =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // IE Fallback, you can even fallback to onscroll
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var lastPosition = -1;

// my Variables
var lastSection = false;
var headerItemTop = -1;
var headerItemBottom = -1;
var headerItemHeight = -1;

// The Scroll Function
function loop() {
  var sections = document.querySelectorAll(".home--section, .splash");
  var headerDynamic = document.querySelectorAll(".header-dynamic");
  var headerItem = document.querySelectorAll(".header-dynamic--item");

  if (headerItem.length > 0) {
    // get top position of item from container, because image might not have loaded
    headerItemTop = parseInt(headerDynamic[0].getBoundingClientRect().top);
    headerItemHeight = headerItem[0].offsetHeight;
    headerItemBottom = headerItemTop + headerItemHeight;
  }

  var sectionTop = -1;
  var sectionBottom = -1;
  var currentSection = -1;

  // Fire when needed
  if (lastPosition == window.pageYOffset) {
    scroll(loop);
    return false;
  } else {
    lastPosition = window.pageYOffset;

    Array.prototype.forEach.call(sections, function(el, i) {
      sectionTop = parseInt(el.getBoundingClientRect().top);
      sectionBottom = parseInt(el.getBoundingClientRect().bottom);

      // active section
      if (sectionTop <= headerItemBottom && sectionBottom > headerItemTop) {
        // check if current section has bg
        currentSection =
          el.classList.contains("home--color-scheme-4") ||
          el.classList.contains("home--color-scheme-1");

        
        // switch class depending on background image
        if (currentSection) {
          headerDynamic[0].classList.remove("header-dynamic--reverse");
        } else {
          headerDynamic[0].classList.add("header-dynamic--reverse");
        }
      }
      // end active section

      // if active Section hits replace area
      if (headerItemTop < sectionTop && sectionTop <= headerItemBottom) {
        // animate only, if section background changed
        if (currentSection != lastSection) {
          document.documentElement.style.setProperty(
            "--replace-offset",
            (100 / headerItemHeight) * parseInt(sectionTop - headerItemTop) +
              "%"
          );
        }
      }

      // end active section in replace area

      // if section above replace area
      if (headerItemTop >= sectionTop) {
        // set offset to 0 if you scroll too fast
        document.documentElement.style.setProperty("--replace-offset", 0 + "%");
        // set last section to current section
        lastSection = currentSection;
      }
    });
  }

  // Recall the loop
  scroll(loop);
}

// Call the loop for the first time
loop();

window.onresize = function(event) {
  loop();
};
