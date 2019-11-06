import anime from "animejs";
import { colorSchemes } from "./color";

const scroll =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function() {};

const oddClasses = colorSchemes
  .filter((_, idx) => idx % 2 === 1)
  .map(el => el[0]);

const sections = document.querySelectorAll(".home--section, .splash");
const headerDynamic = document.querySelectorAll(".header-dynamic");
const headerItem = document.querySelectorAll(".header-dynamic--item");

let lastPosition = -1;
let lastSection = false;

let headerItemTop = -1;
let headerItemBottom = -1;
let headerItemHeight = -1;

const isOddSection = el =>
  oddClasses.reduce(
    (val, oddClass) => val || el.classList.contains(oddClass),
    false
  );

const loop = () => {
  if (window.scrollY === 0) {
    anime({
      targets: ".header--line",
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 700
    });
  }

  if (headerItem.length > 0) {
    // get top position of item from container, because image might not have loaded
    headerItemTop = parseInt(headerDynamic[0].getBoundingClientRect().top);
    headerItemHeight = headerItem[0].offsetHeight;
    headerItemBottom = headerItemTop + headerItemHeight;
  }

  if (lastPosition === window.pageYOffset) {
    scroll(loop);
    return false;
  }

  let sectionTop = -1;
  let sectionBottom = -1;
  let currentSection = -1;

  lastPosition = window.pageYOffset;

  sections.forEach(el => {
    sectionTop = parseInt(el.getBoundingClientRect().top);
    sectionBottom = parseInt(el.getBoundingClientRect().bottom);

    // active section
    if (sectionTop <= headerItemBottom && sectionBottom > headerItemTop) {
      currentSection = isOddSection(el);
      colorSchemes.forEach(colorScheme => {
        const [colorSchemeClass, colors] = colorScheme;
        const isOdd = oddClasses.includes(colorSchemeClass);

        const varBackground = "--header-background" + (isOdd ? "-invert" : "");
        const varTextColor = "--header-text-color" + (isOdd ? "-invert" : "");

        if (el.classList.contains(colorSchemeClass)) {
          document.documentElement.style.setProperty(varBackground, colors[0]);
          document.documentElement.style.setProperty(varTextColor, colors[1]);
        }
      });

      // switch class depending on background image
      if (currentSection) {
        headerDynamic[0].classList.remove("header-dynamic--reverse");
      } else {
        headerDynamic[0].classList.add("header-dynamic--reverse");
      }
    }

    // if active section hits replace area
    if (headerItemTop < sectionTop && sectionTop <= headerItemBottom) {
      // animate only, if section background changed
      if (currentSection !== lastSection) {
        document.documentElement.style.setProperty(
          "--replace-offset",
          (100 / headerItemHeight) * parseInt(sectionTop - headerItemTop) + "%"
        );
      }
    }

    // if section above replace area
    if (headerItemTop >= sectionTop) {
      // set offset to 0 if you scroll too fast
      document.documentElement.style.setProperty("--replace-offset", 0 + "%");
      // set last section to current section
      lastSection = currentSection;
    }
  });

  scroll(loop);
};

loop();

window.onresize = loop;
