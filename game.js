const canvas = document.getElementById("game");
const engine = new Engine(canvas);

engine.start();

engine.setGround({
  startX: 0,
  startY: 600,
  endX: 900,
  endY: 600
});

engine.setGround({
  startX: 30,
  startY: 0,
  endX: 30,
  endY: 600
});

engine.setGround({
  startX: 800,
  startY: 0,
  endX: 800,
  endY: 600
});

document.addEventListener("keydown",(event)=>{
  event.preventDefault();

  engine.spawn({
    name: event.code,
    posX: 450,
    posY: 200,
    size: 30,
    mass: 10,
    stiff: 0.5
  });
});