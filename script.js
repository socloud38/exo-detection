// Create Scene
const heightScreen = 700;
const widthScreen = 400;
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = `${widthScreen}px`;
screen.style.height = `${heightScreen}px`;
screen.style.border = "solid 1px black";
screen.style.backgroundImage = "url('./images/sprite2D/background.jpeg')";
screen.style.backgroundSize = "cover";
screen.style.overflow = "hidden";

// Create the platform
const heightPlatform = 20;
const platforms = [
  { top: 150, left: 10, width: 60 },
  { top: 220, left: 30, width: 60 },
  { top: 290, left: 50, width: 60 },
  { top: 360, left: 70, width: 60 },
  { top: 430, left: 90, width: 60 },
  { top: 540, left: 110, width: 60 },
  { top: 150, right: 10, width: 60 },
  { top: 220, right: 30, width: 60 },
  { top: 290, right: 50, width: 60 },
  { top: 360, right: 70, width: 60 },
  { top: 430, right: 90, width: 60 },
  { top: 540, right: 110, width: 60 },
];

let score = 0;
const scoreBoard = document.createElement('span')
  scoreBoard.innerText = `${score} Points`;
  scoreBoard.style.position = "absolute";
  scoreBoard.style.bottom = "10px";
  scoreBoard.style.left = "10px";
  scoreBoard.style.fontSize = "30px";
  scoreBoard.style.color = "white";

screen.appendChild(scoreBoard);

function createPlatorm(d) {
  const pf = document.createElement('div');
  pf.style.position = "absolute";
  pf.style.top = `${d.top}px`;
  if (d.left) pf.style.left = `${d.left}px`
    else pf.style.right = `${d.right}px`;
  pf.style.width = `${d.width}px`;
  pf.style.height = `${heightPlatform}px`;
  pf.style.backgroundImage = "url('./images/sprite2D/platform.png')";
  pf.style.backgroundSize = "contain";
  pf.style.backgroundRepeat = "no-repeat";
  return pf;
}

// Create Tonneau
class Tonneau {
  constructor(x) {
    this.posX = x;
    this.posY = 0;
    this.intervalID = 0;
    // Create tonneau
    this.t = document.createElement('div');
    this.t.style.position = "absolute";
    this.t.style.top = `${this.posY}px`;
    this.t.style.left = `${this.posX}px`;
    this.t.style.width = "30px";
    this.t.style.height = "50px";
    this.t.style.transform = "rotate(180deg)";
    this.t.style.backgroundImage = "url('./images/sprite2D/fusée.png')";
    this.t.style.backgroundSize = "contain";
    this.t.style.backgroundRepeat = "no-repeat";

    this.explosion = document.createElement('div');
    this.explosion.style.position = "absolute";
    this.explosion.style.width = "50px";
    this.explosion.style.height = "50px";
    this.explosion.style.opacity = "1";
    this.explosion.style.backgroundImage = "url('./images/sprite2D/explosion.png')";
    this.explosion.style.backgroundRepeat = "no-repeat";
    this.explosion.style.backgroundSize = "cover";
    this.explosion.classList.add('explosion');

    this.initialization();
  }

  initialization = () => {
    this.intervalID = setInterval(() => {
      this.posY += 5;
      this.t.style.top = `${this.posY}px`;
      this.detectionSurface();
    }, 50);
    setInterval(() => {
      if(this.posY >= 900) {
        this.t.remove();
      }
    }, 1000)
  }

  getT() {
    return this.t;
  }

  // TODO
  detectionSurface = () => {
    for (const platform of platforms) {
      const left = (this.posX < (platform.left + platform.width))
      const right = (this.posX > (widthScreen - (platform.right + platform.width) - parseInt(this.t.style.width)))
      const ifRight = platform.right ? right : left;

      if( this.posY + parseInt(this.t.style.height) >= platform.top && ifRight) {
        this.explosion.style.top = `${this.posY + 10}px`;
        this.explosion.style.left = `${this.posX - 5}px`;
        screen.appendChild(this.explosion);
        clearInterval(this.intervalID);
        this.t.remove();
        setTimeout(() => {
          score += 50;
          this.explosion.remove()
          scoreBoard.innerText = `${score} Points`;
        }, 700)
      }
    }
  }
}

function generateTonneau() {
  setInterval(() => {
    const randomX = Math.floor(Math.random() * widthScreen);
    const newT = new Tonneau(randomX);
    screen.appendChild(newT.getT());
  }, 2000);
}

// Append the platform
platforms.forEach(d => screen.appendChild(createPlatorm(d)))
root.appendChild(screen);

// Generate Tonneaux
generateTonneau();

