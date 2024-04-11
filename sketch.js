//exInput = "a = vec3(-100, 10, 100) \n b = vec3(200, 200, 12) \n c = a + b"; // c = a + b
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
    if(msg.trim() === "clear()")
    {
      wordsDiv.innerHTML = "";
      interpreter.variables.clear();
    }
    else if (msg.startsWith("color(")) {
      let match = msg.match(/color\((\w+),\s*"(\w+)"\)/);
      if (match) {
        let vectorName = match[1];
        let colorName = match[2];
        if (interpreter.variables.has(vectorName)) {
          interpreter.variables.get(vectorName).color = colorName;
        }
      }
      wordsDiv.innerHTML += msg + "<br>";
    }
    else
    {
      wordsDiv.innerHTML += msg + "<br>";
      interpreter.consumeInput(msg);
    }
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
  orbitControl();
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