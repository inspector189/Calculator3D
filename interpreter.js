class Interpreter
{
  constructor()
  {
    this.variables = new Map();
    this.operators = new Map([
        ["+", addVectors],
        ["-", subVectors],
    ]);
  }  
  evaluateExpression(expression)
  {
    const tokens = expression.split(/(?:\+|\-)(.*)/);
    if(tokens.length == 3)
    {
        let opCode = expression.substring(tokens[0].length + 1, expression.length - tokens[0].length - tokens[1].length);
        let operator = this.operators.get(opCode);
        return operator(this.evaluateExpression(tokens[0]), this.evaluateExpression(tokens[1]));
    }
    else if(tokens.length == 1)
    {
        return this.variables.get(tokens[0]).vector;
    }
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
          this.variables.set(nameVar, { vector: new Vector3(components[0], components[1], components[2]), color: "black"}); 
        } 
        else
        {
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
}