// const anime = require('animejs');

// var animateLeft = anime({
//   targets: '.square',
//   left: '100%',
//   autoplay: false
// });

let animation = anime({
  targets: '.text1',
  translateX: 130,
  duration: 700,
  easing: 'linear',
  direction: 'linear',
});

animation = anime({
  targets: '.text2',
  translateX: -130,
  duration: 700,
  easing: 'linear',
  direction: 'linear',
});

animation = anime({
  targets: '.img1',
  translateX: 0,
  duration: 700,
  easing: 'linear',
  direction: 'linear',
});
