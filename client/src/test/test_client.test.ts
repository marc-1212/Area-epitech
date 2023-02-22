const resta = require('./test_resta'); 

//path del modul que vols emportarte


//la frase es un print simplement, si fas algu de les api fica algo tipo: "testing conexion with api" o similar
test('sumar 1 + 2 es igual a 3', () => {
// en expect li pases la funcio amb els arguments i en .toBe el output que esperes
  expect(resta(5, 2)).toBe(3);
});