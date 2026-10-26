let userScore = 0;
let compScore = 0;

const emojis = {
  "Rock": "✊",
  "Paper": "✋",
  "Scissors": "✂️"
};

const choices = document.querySelectorAll(".choice-btn");
const msg = document.querySelector("#result");

const user = document.querySelector("#player-score");
const comp = document.querySelector("#computer-score");

const userLogo = document.querySelector("#player-display");
const comLogo = document.querySelector("#computer-display");

const reset = document.querySelector("#btn");


//Computer Choice
const getcomChoice = () => {
    const options = ["Rock", "Paper", "Scissors"];
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];
};


//Show Winner
const showWin = (userWin,userChoice,comChoice) => {
  userLogo.innerText = emojis[userChoice];
  comLogo.innerText = emojis[comChoice];
  
  if(userWin){
    userScore++;
    user.innerText = userScore;
    msg.innerText = "You Won";
    msg.style.backgroundColor = "green";
  } else{
    compScore++;
    comp.innerText = compScore;
    msg.innerText = "You Lose";
    msg.style.backgroundColor = "red";
  }
};

//Draw Game 
const drawGame = (userChoice,comChoice) => {
  userLogo.innerText = emojis[userChoice];
  comLogo.innerText = emojis[comChoice];


  msg.innerText ="Game was Draw";
  msg.style.backgroundColor = "grey";
};



//Play Game
const playGame = (userChoice) => {
  const comChoice = getcomChoice();
  console.log("Com Choice", comChoice);
  console.log("User Choice", userChoice);
  
  if(userChoice === comChoice){

    drawGame(userChoice, comChoice);
  } else {
    let userWin = true;
    if (userChoice === "Rock"){
      userWin = comChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper"){
      userWin = comChoice === "Scissors" ? false : true;      
    } else {
      userWin = comChoice === "Rock" ? false : true;
    }
    showWin(userWin,userChoice,comChoice);
  }


};


//User Choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");   
        playGame(userChoice)
    });   
});


//Reset Button

reset.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  user.innerText = "0";
  comp.innerText = "0";
  userLogo.innerText = "❓";
  comLogo.innerText = "❓";
  msg.innerText = "Make your move";
  msg.style.backgroundColor = ""; 
});












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