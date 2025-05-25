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

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});