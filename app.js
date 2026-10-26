


































































































//BACKGROUND MESH PARTICLES PHYSICS

    const canvas = document.getElementById('antigravity-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const mouse = { x: -1000, y: -1000, radius: 130 };

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createMeshParticles();
    }

    class Particle {
      constructor(originX, originY) {
        this.originX = originX;
        this.originY = originY;
        this.x = originX;
        this.y = originY;
        this.vx = 0;
        this.vy = 0;
        this.radius = 1.5;
        this.color = '#c5bfb2';
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 14;
          this.vy -= Math.sin(angle) * force * 14;
        }

        this.vx += (this.originX - this.x) * 0.07;
        this.vy += (this.originY - this.y) * 0.07;

        this.vx *= 0.82;
        this.vy *= 0.82;

        this.x += this.vx;
        this.y += this.vy;

        this.draw();
      }
    }

    function createMeshParticles() {
      particles = [];
      const gap = 24;
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          particles.push(new Particle(x, y));
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener('resize', initCanvas);

    initCanvas();
    animateParticles();