//Global variables defined
var canvas;
var ctx;

//Tiempo máximo para el juego en segundos
var timeleftMax;
var nivel;
var altoCanvas = 300;
var anchoCanvas = 900;
var posEjeXnumeros = parseInt(anchoCanvas / 2);
var alturaPrimerSumando = parseInt(altoCanvas/3);
var simboloOperacion;
var numero1;
var numero2;
var resultado;
var numeroPrueba;
var timeleft;
var aciertos;
var fallos;
var delayInMilliseconds = 1000; //1 second
//diccionario para almacenar las puntuaciones
var diccionarioPuntuaciones = {};
var juegoTerminado = false;

var sonidoAcierto = new Howl({
  src: ['sounds/gmae.wav'],
  loop: false
});

var sonidoFallo = new Howl({
  src: ['sounds/robot.mp3'],
  loop: false
});

function tiempo(){
  var downloadTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = timeleft + " segundos..." ;
    document.getElementById("progressBar").value = timeleftMax - timeleft;
    timeleft -= 1;
    if(timeleft < 0){
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "¡Tiempo terminado!"
      juegoTerminado = true;
      dibujaAciertos();
    }
  }, 1000);
}


function inicializa(){
  document.body.style.backgroundImage = "url('img/fondo.jpg')";
  //Reseteamos los estilos que pusimos para habilitar el scroll en las puntuaciones
  var divCanvas = document.getElementById("divCanvas");
  divCanvas.style.maxHeight = null;
  divCanvas.style.maxWidth = null;
  divCanvas.style.overflow = null;
  //divCanvas.style.border = null;
  //document.getElementById("divCanvas").style = "none";
  timeleft = timeleftMax;
  aciertos = 0;
  fallos = 0;
  juegoTerminado = false;
  numeroPrueba = '';
  document.getElementById("progressBar").max = timeleftMax;
  document.getElementById("countdown").innerHTML = "¿Preparado?";
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.canvas.width  = anchoCanvas;
  ctx.canvas.height = altoCanvas;
  muestraBotones('hidden');
}


function nuevoJuego(){
  var seleccionTiempo = document.getElementById("timeSelect").value;
  if (seleccionTiempo > 0){
    timeleftMax = document.getElementById("timeSelect").value;
    nivel = document.getElementById("mySelect").value;

    if(nivel != 'nada'){
      //console.log('Has seleccionado el juego con Id: ' + nivel);
      var name = document.getElementById("FirstName").value;
      if(name != ""){
        inicializa();
        localStorage.setItem("username", name);
        muestraUserInput('hidden');
        muestraBotones('visible');
        accion();
        tiempo();
      }
      else{
        alert('¡Debes de introducir un nombre para poder jugar!')
        document.getElementById("mySelect").value = 'nada';
      }
    }
    else {
      alert('¡Debes seleccionar un juego!');
      document.getElementById("mySelect").value = 'nada';
    }
  }
  else {
    alert('¡Debes seleccionar un tiempo de juego!');
    document.getElementById("mySelect").value = 'nada';
  }
}

function muestraBotones(flag){
  document.getElementById("div2").style.visibility = flag;
}

function muestraUserInput(flag){
  document.getElementById("mySelect").value = 'nada';
  document.getElementById("div1").style.visibility = flag;
}

function accion(){

  borraCanvas();

  switch (nivel) {
    case 'sumas1':
      dibujaSuma(10, 10);
      break;
    case 'sumas2':
      dibujaSuma(20, 20);
      break;
    case 'mult1':
      dibujaMultiplicacion(2, 10);
      break;
    case 'mult2':
      dibujaMultiplicacion(3, 10);
      break;
    case 'mult3':
      dibujaMultiplicacion(4, 10);
      break;
    case 'mult4':
      dibujaMultiplicacion(5, 10);
      break;
    case 'mult5':
      dibujaMultiplicacion(6, 10);
      break;
    case 'mult6':
      dibujaMultiplicacion(7, 10);
      break;
    case 'mult7':
      dibujaMultiplicacion(8, 10);
      break;
    case 'mult8':
      dibujaMultiplicacion(9, 10);
      break;
    case 'mult9':
      dibujaMultiplicacion(10, 10);
      break;
    case 'nada':
      alert('¡Elije una opción, por favor!')
      inicializa();
      break;
    default:
      alert('¡Operación no soportada!')
  }
}

function dibujaSuma(sumandoMax1, sumandoMax2){
  //Generamos dos enteros como sumandos que van cada uno desde 0 a sumandoMax;
  simboloOperacion = '+ ';
  numero1 = getRandomInt(0, sumandoMax1);
  numero2 = getRandomInt(0, sumandoMax2);
  resultado = suma(numero1, numero2);
  //console.log('El resultado es: ' + resultado);
  dibujaNumeros();
}

function dibujaMultiplicacion(multiplicandoMax1, multiplicandoMax2){
  //Generamos dos enteros como sumandos que van cada uno desde 0 a sumandoMax;
  simboloOperacion = 'x ';
  numero1 = getRandomInt(0, multiplicandoMax1);
  numero2 = getRandomInt(0, multiplicandoMax2);
  resultado = multiplica(numero1, numero2);
  //console.log('El resultado es: ' + resultado);
  dibujaNumeros();
}

function dibujaNumeros(){
  borraCanvas();
  ctx.font = '70px impact';
  ctx.fillStyle = '#555555';
  ctx.textAlign = "right";
  ctx.fillText(numero1, posEjeXnumeros, alturaPrimerSumando);
  ctx.fillText(simboloOperacion, posEjeXnumeros - 70, alturaPrimerSumando + 30);
  ctx.fillText(numero2, posEjeXnumeros, alturaPrimerSumando + 70);
  dibujaLineaHorizontal();
  //ctx.fillText(resultado, 170, 220);
}

function dibujaLineaHorizontal(){
  // Reset the current path
  ctx.beginPath();
  // Staring point
  ctx.moveTo(posEjeXnumeros - 100, alturaPrimerSumando + 90);
  // End point
  ctx.lineTo(posEjeXnumeros + 25, alturaPrimerSumando + 90);
  // Make the line visible
  ctx.stroke();
}

function dibujaResultado(esCorrecto){
  if(esCorrecto){
    ctx.fillStyle = '#0000FF';
    ctx.fillText(numeroPrueba, posEjeXnumeros, 2*alturaPrimerSumando + 70);
  }
  else{
    ctx.fillStyle = '#FF0000';
    ctx.fillText(numeroPrueba, posEjeXnumeros, 2*alturaPrimerSumando + 70);
  }
}

function dibujaAciertos(){
  borraCanvas();
  ctx.font = '50px impact';
  ctx.fillStyle = '#4CAF50';
  ctx.textAlign = "left";
  username = localStorage.getItem("username");
  ctx.fillText(username + ", aciertos: " +  aciertos + ", fallos: " +  fallos, 50, 200);
  diccionarioPuntuaciones[username] = "nivel: " + nivel + ", tiempo: " + timeleftMax
                                    + " segundos, aciertos: " + aciertos + ", fallos: " + fallos;
  localStorage.setItem("puntuaciones",  JSON.stringify(diccionarioPuntuaciones));
  muestraBotones('hidden');
  setTimeout(function() {
    //console.log('Conmenzamos de nuevo!!')
    borraCanvas();
    muestraUserInput('visible');
  }, delayInMilliseconds*4);
}

function muestraRankingPuntuaciones(){
  borraCanvas();
  //document.body.style.backgroundImage = 'none';
  document.body.style.backgroundImage = "url('img/fondoGanadores.jpg')";
  canvas.width  = anchoCanvas;
  //duplicamos la altura del canvas para que quepa la puntuación
  canvas.height = 3*altoCanvas;

  var divCanvas = document.getElementById("divCanvas");
  divCanvas.style.maxHeight = "300px";
  divCanvas.style.maxWidth = "800px";
  divCanvas.style.overflow = "scroll";
  //divCanvas.style.border = "2px solid blue"

  ctx.font = '20px times';
  ctx.fillStyle = '#000000';
  ctx.textAlign = "left";
  // retrieve stored data (JSON stringified) and convert
  var text = '';
  var storedData = localStorage.getItem("puntuaciones");
  if (storedData) {
    scoresArray = JSON.parse(storedData);
    var entries = Object.entries(scoresArray);

    ctx.font = "30px Verdana";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, anchoCanvas, 0);
    gradient.addColorStop("0"," magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("Tablero de puntuaciones:", 50, 100);
    ctx.font = '20px times';
    ctx.fillStyle = '#000000';
    ctx.textAlign = "left";

    for(index=0;index<entries.length;index++){
      //console.log("Nombre: " + entries[index][0] + ", " + entries[index][1]);
      ctx.fillText(entries[index][0] + ", " + entries[index][1], 50, 150 + index*25);
    }
  }
}

function ponNumero(numero){
  dibujaNumeros();

  if(numeroPrueba==''){
    numeroPrueba = numero.toString();
  }
  else{
    if((numeroPrueba + numero.toString()).length > 3){
      alert('No puedes introducir más dígitos');
    }
    else{
      numeroPrueba = numeroPrueba + numero.toString();
    }
  }
  //console.log('El número de prueba es: ' + numeroPrueba);
  ctx.fillText(numeroPrueba, posEjeXnumeros, 2*alturaPrimerSumando + 70);
}

function compruebaResultado(){
  if(resultado==parseInt(numeroPrueba)){
    sonidoAcierto.play();
    dibujaResultado(true);
    aciertos++;
    numeroPrueba = '';
    setTimeout(function() {
      if(!juegoTerminado){
        accion();
      }
    }, delayInMilliseconds);
    //alert('Resultado Correcto!!');
  }
  else{
    sonidoFallo.play();
    dibujaResultado(false);
    fallos++;
    numeroPrueba = '';
    setTimeout(function() {
      if(!juegoTerminado){
        accion();
      }
    }, delayInMilliseconds);
    //alert('Te has equivocado...');
  }
}

function borraResultado(){
  dibujaNumeros();
  numeroPrueba = '';
}

function suma(num1, num2){
  var valor;
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  valor = num1 + num2;
  return(valor);
}

function multiplica(num1, num2){
  var valor;
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  valor = num1 * num2;
  return(valor);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function borraCanvas(){
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;
}
