const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let stars = [];

for (let i = 0; i < 500; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random()
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    // Parallax-Bewegung
    let dx = (mouseX - canvas.width / 2) * (star.radius / 2) * 0.0115;
    let dy = (mouseY - canvas.height / 2) * (star.radius / 2) * 0.0115;

    ctx.beginPath();
    ctx.arc(star.x + dx, star.y + dy, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let useGyro = false;

function requestMotionPermission() {
  if (
    typeof DeviceMotionEvent !== 'undefined' &&
    typeof DeviceMotionEvent.requestPermission === 'function'
  ) {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          startGyro();
          document.getElementById('motion-btn').style.display = 'none';
        }
      })
      .catch(console.error);
  } else {
    // Android / Desktop fallback
    startGyro();
    document.getElementById('motion-btn').style.display = 'none';
  }
}

if (
    typeof DeviceMotionEvent === 'undefined' ||
    typeof DeviceMotionEvent.requestPermission !== 'function'
  ){
    document.getElementById('motion-btn').style.display = 'none';
}
// else{
//     requestMotionPermission();
// }

function startGyro() {
  useGyro = true;
  window.addEventListener('deviceorientation', (event) => {
    if (event.beta !== null && event.gamma !== null) {
      mouseX = window.innerWidth / 2 + event.gamma * 30;
      mouseY = window.innerHeight / 2 + event.beta * 30;
    }
  });
}

// Fallback for desktop
document.addEventListener('mousemove', (e) => {
  if (!useGyro) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

// --- Mousemove for desktop ---
document.addEventListener('mousemove', (e) => {
  if (!useGyro) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});
