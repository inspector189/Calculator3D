exInput = "a = vec3(-100, 10, 100) \n b = vec3(200, 200, 12) \n c = a + b"; // c = a + b

let input = document.getElementById("inpucik");
var interpreter = new Interpreter(); 

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
    let msg = input.value;
    let wordsDiv = document.getElementById("words");
    wordsDiv.innerHTML += msg + "<br>";
    interpreter.consumeInput(msg);
    input.value = "";
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
  for(let[key, value] of interpreter.variables)
  {
    drawVector(value);
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