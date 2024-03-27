class Vector3 
{
  constructor(x, y, z)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
function addVectors(a, b)
{
  return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
}
function subVectors(a, b)
{
  return new Vector3(a.x - b.x, a.y-b.y, a.z - b.z);
}
function mulVector(vec, s)
{
  return new Vector3(s * vec.x, s * vec.y, s * vec.z);
}
function divVector(vec, s)
{
  return mulVector(vec, 1/s);
}
function negateVector(vec)
{
  return mulVector(vec, -1);
}
function lengthVector(vec)
{
  return sqrt(pow(vec.x, 2) + pow(vec.y, 2) + pow(vec.z, 2));
}
function dotProduct(a, b)
{
  return (a.x * b.x + a.y * b.y + a.z * b.z);
}
function crossProduct(a, b)
{
  x = a.y * b.z - a.z * b.y;
  y = a.z * b.x - a.x * b.z;
  z = a.x * b.y - a.y * b.x;
  return new Vector3(x, y, z)
}
function normalizeVector(a)
{
  return divVector(a, lengthVector(a));
}
