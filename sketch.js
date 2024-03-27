exInput = "a = vec3(-100, 10, 100) \n b = vec3(200, 200, 12) \n"; // c = a + b

class Interpreter
{
  constructor()
  {
    this.variables = new Map();
    
  }
  consumeInput(input)
  {
    const lines = input.split('\n');
    for(var line of lines)
    {
      if(line)
      {
        line = line
          .replace(/\s/g, '')
          .split("=");
        const nameVar = line[0];
        const expression = line[1];
        
        if(expression.startsWith("vec3"))
        {
          const components = expression
            .substring(5, expression.length - 1)
            .split(",")
            .map((x) => parseInt(x));
          this.variables.set(nameVar, new Vector3(components[0], components[1], components[2])); 
        } 
      }
    }
    print(this.variables);
  }
}
const interpreter = new Interpreter(); 
function setup() 
{
  createCanvas(400, 400, WEBGL);
  perspective(PI/3, 1, 5 * sqrt(3), 500 * sqrt(3));
  camera(0,-100, 200);
  interpreter.consumeInput(exInput);
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
  stroke("black");
  line(0, 0, 0, c.x, -c.y, c.z);
}