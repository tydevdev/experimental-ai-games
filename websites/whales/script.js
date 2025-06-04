// Image carousel
const images = document.querySelectorAll('.carousel img');
let index = 0;
function showImage(i){
  images.forEach(img => img.classList.remove('active'));
  images[i].classList.add('active');
}
function next(){
  index = (index + 1) % images.length;
  showImage(index);
}
function prev(){
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}
document.querySelector('.next')?.addEventListener('click', next);
document.querySelector('.prev')?.addEventListener('click', prev);
showImage(index);

// Fact of the day
const facts = [
  'Whales evolved from land-dwelling mammals millions of years ago.',
  'The heart of a blue whale is as big as a small car.',
  'Orcas are actually the largest members of the dolphin family.',
  'Humpback songs can be heard for many miles under water.',
  'Gray whales make one of the longest migrations of any mammal.'
];
const factEl = document.getElementById('fact');
if (factEl) factEl.textContent = facts[Math.floor(Math.random()*facts.length)];

// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Scroll to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) toTop.style.display = 'flex';
  else toTop.style.display = 'none';
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Animate progress bar
const bar = document.querySelector('.progress span');
if (bar) {
  setTimeout(() => { bar.style.width = '70%'; }, 500);
}
