class Interpreter
{
  constructor()
  {
    this.variables = new Map();
    this.operators = new Map([
      ["+", addVectors],
      ["-", subVectors],
      ["*", mulVector],
      ["/", divVector],
      ["^", crossProduct],
      [".", dotProduct],
    ]);
  }  
  evaluateExpression(expression)
  {
    expression = expression.trim();
    if(expression.startsWith("vec3"))
    {
      const components = expression
        .substring(5, expression.length - 1)
        .split(",")
        .map(x => parseFloat(x));

      return new Vector3(components[0], components[1], components[2]);
    }
    const tokens = expression.split(/(\+|\-|\*|\/|\^|\.)/);
    console.log(tokens);
    if(tokens.length == 3)
    {
      let left = tokens[0];
      let opCode = tokens[1];
      let right = tokens[2];

      let operator = this.operators.get(opCode);

      return operator(
        this.evaluateExpression(left),
        this.evaluateExpression(right)
      );
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
      else
      {
        let wordsDiv = document.getElementById("words");
        wordsDiv.innerHTML += "ERROR: Unexpected token!!! " + tokens[0] + "<br>";
      }
    }
  }
  consumeInput(input)
  {
    let wordsDiv = document.getElementById("words");
    const lines = input.split('\n');
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
          let match = line.match(/color\((\w+),\s*"([^"]+)"\)/);
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
        let newVec = this.evaluateExpression(expression);
        if(typeof newVec === "number")
          {
            wordsDiv.innerHTML += nameVar + " = " + newVec + "<br>";
            continue; // <-- pomijamy zapis do this.variables
          }

          Vector3.prototype.toString = function() {
            return 'Vector3 {x : ' + this.x + ', y : ' + this.y + ', z : ' + this.z + '}';
          }

          let vectorAsString = newVec.toString();
          this.variables.set(nameVar, { vector: newVec, color: "red" });
          wordsDiv.innerHTML += nameVar + " = " + vectorAsString + "<br>";
      }
    }
  }
}
