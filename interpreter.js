//to do: minusy trzeba naprawić :(
class Interpreter
{
  constructor()
  {
    this.variables = new Map();
    this.operators = new Map([
        ["+", addVectors],
        ["-", subVectors],
        ["⋅", dotProduct],
        ["x", crossProduct],
        ["*", mulVector],
        ["/", divVector],
    ]);
  }  
  evaluateExpression(expression)
  {
    const tokens = expression.split(/(?:\+|\-|\*|\x|\⋅|\/)(.*)/);
    if(tokens.length == 3)
    {
        let opCode = expression.substring(tokens[0].length + 1, expression.length - tokens[0].length - tokens[1].length);
        let operator = this.operators.get(opCode);
        return operator(this.evaluateExpression(tokens[0]), this.evaluateExpression(tokens[1]));
    }
    else if(tokens.length == 1)
    {
      let value = this.variables.get(tokens[0]);
      if(value !== undefined) {
          return value.vector;
      } else if(!isNaN(tokens[0])) {
          return parseFloat(tokens[0]);
      }
      else if(expression.startsWith("vec3"))
      {
        const components = expression
            .substring(5, expression.length - 1)
            .split(",")
            .map((x) => parseInt(x));
          return new Vector3(components[0], components[1], components[2]);
      }
    }
  }
  consumeInput(input)
  {
    const lines = input.split('\n');
    let wordsDiv = document.getElementById("words");
    for(var line of lines)
    {
      if(line)
      {    
        if(line.trim() === "clear()")
        {
          wordsDiv.innerHTML = "";
          this.variables.clear();
          continue;
        }
        else if (line.startsWith("color(")) {
          let match = line.match(/color\((\w+),\s*"(\w+)"\)/);
          if (match) {
            let vectorName = match[1];
            let colorName = match[2];
            if (this.variables.has(vectorName)) {
              this.variables.get(vectorName).color = colorName;
            }
          }
          wordsDiv.innerHTML += line + "<br>";
          continue;
        }
        
        line = line
          .replace(/\s/g, '')
          .split("=");
        const nameVar = line[0];
        const expression = line[1];
        Vector3.prototype.toString = function() {
          return 'Vector3 {x : ' + this.x + ', y : ' + this.y + ', z : ' + this.z + '}';
        }
        let wordsDiv = document.getElementById("words");
        let newVec = this.evaluateExpression(expression);
        let vectorAsString = this.evaluateExpression(expression).toString();
        this.variables.set(nameVar, { vector: newVec, color: "red "});
        wordsDiv.innerHTML += vectorAsString + "<br>";
        
      }
    }
  }
}