//exInput = "a = vec3(-100, 10, 100) \n b = vec3(200, 200, 12) \n c = a + b"; // c = a + b
// c = a + vec3(0, 0, 0)
let input;
var interpreter = new Interpreter(); 
var commandHistory = [];
var indexHistory = 0;
let f;

function preload() {
  f = loadFont('Roboto-Black.ttf');
}
function setup() 
{
  createCanvas(400, 400, WEBGL);
  perspective(PI/3, 1, 5 * sqrt(3), 500 * sqrt(3));
  camera(0,-100, 200);
  input = document.getElementById('inpucik');
}
function keyPressed()
{
  if(keyCode === ENTER)
  {
    msg = input.value;
    interpreter.consumeInput(msg);
    commandHistory.push(msg);
    indexHistory = commandHistory.length;
    input.value = "";
  }
  else if(keyCode === UP_ARROW) 
  {
    indexHistory = indexHistory > 0 ? indexHistory - 1 : indexHistory;
    input.value = commandHistory[indexHistory];
  }
  else if(keyCode == DOWN_ARROW)
  {
    if(indexHistory < commandHistory.length - 1)
    {
      indexHistory + 1;
      input.value = commandHistory[indexHistory];
    }
    else
    {
      input.value = "";
    }
  }
}
function drawMode()
{
  strokeWeight(3);
  stroke("rgba(255, 0, 0, 0.25)");
  line(0,0,0, 100000, 0, 0);
  stroke("rgba(0, 0, 255, 0.25)");
  line(0,0,0, 0, 0, 1000000);
  stroke("rgba(0, 255, 0, 0.25)");
  line(0,0,0, 0, -1000000, 0);

  fill(255);
}
function draw() 
{
  background(220);
  orbitControl();
  for(let[key, value] of interpreter.variables)
  {
    drawVector(value);
    push();
    textFont(f);
    translate(value.vector.x, -value.vector.y, value.vector.z);
    
    textSize(30);
    fill(0);
    textAlign(CENTER, CENTER);
    text(value.vector.x.toString() + " " + value.vector.y.toString() + " " + value.vector.z.toString(), 0, -50);
    pop();
  }
  drawMode();
  stroke("black");
}

function drawVector(c)
{
  strokeWeight(5);
  stroke(c.color);
  line(0, 0, 0, c.vector.x, -c.vector.y, c.vector.z);
}