const engine = new Engine();

engine.start();

document.addEventListener("keydown",(event)=>{
  event.preventDefault()
  engine.spawn({
    name: "test",
    posX: 450,
    posY: 200,
    size: 50,
    mass: 10,
    stiff: 0.5
  });
});