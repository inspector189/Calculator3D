exInput = "a = vec3(-100, 10, 100) \n b = vec3(200, 200, 12) \n c = a + b"; // c = a + b

let input;
let consoleScreen;
var interpreter = new Interpreter(); 
function setup() 
{
  createCanvas(400, 400, WEBGL);
  consoleScreen = createGraphics(400, 400);
  consoleScreen.fill(160, 152, 123);
 // consoleScreen.text("cos", 150, 150);
  perspective(PI/3, 1, 5 * sqrt(3), 500 * sqrt(3));
  camera(0,-100, 200);
  input = createInput("");
  input.position(380, 500, 0);
  input.input(false);
}
function keyPressed()
{
  if(keyCode === ENTER)
  {
    let msg = input.value();
    //consoleScreen.text(msg, 50, 50);
    interpreter.consumeInput(exInput);
    input.value("");
  }
}
function drawMode()
{
  strokeWeight(3);
  stroke("red");
  line(0,0,0, 100000, 0, 0);
  stroke("blue");
  line(0,0,0, 0, 0, 1000000);
  stroke("green");
  line(0,0,0, 0, -1000000, 0);

  fill(255);
}
function draw() 
{
  background(220);
  for(let[key, value] of interpreter.variables)
  {
    drawVector(value);
  }
  drawMode();
  image(consoleScreen, -100, -100);
  stroke("black");
}

function drawVector(c)
{
  strokeWeight(5);
  stroke("black");
  line(0, 0, 0, c.x, -c.y, c.z);
}