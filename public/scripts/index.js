var cnv;
var toPlay = {
   posX: 25,
   posY: 25,
   width: 100,
   height: 25,
   isHovered: false,
   toPage: "play"
};
var buttons = [toPlay];

var coolors = {};

function preload() {
   coolors.white = color(245, 240, 246);
   coolors.black = color(28, 29, 32);
   coolors.gray = color(220, 220, 220);
   coolors.blue = color(42, 183, 202);
   coolors.dblue = color(0, 72, 124);
}

function setup() {
   cnv = createCanvas( windowWidth, windowHeight );
   redrawAll();
}

function redrawAll() {
   clear();
   background( coolors.white );
   // checkHover();
   drawButtons();
}

function drawButtons() {
   buttons.forEach(b => {
      if( b.isHovered ) {
         stroke( coolors.black );
         fill( coolors.blue );
      } else {
         stroke( coolors.gray );
         fill( coolors.dblue );
      }
      b.posX = (windowWidth - b.width) / 2;
      rect( b.posX, b.posY, b.width, b.height );
      // rect( b.posX, b.posY, b.size, b.size );
   });
}

function checkHover() {
   buttons.forEach(b => {
      var x = mouseX;
      var y = mouseY;
      if(x > b.posX && x < b.posX + b.size &&
         y < b.posY && y < b.posY + b.size)
         b.isHovered = true;
      else
         b.isHovered = false;
   });
}

function draw() {
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 2;
   cnv.position( x, y );
}

function mousePressed() {
   buttons.forEach(b => {
      var x = mouseX;
      var y = mouseY;
      if(x > b.posX && x < b.posX + b.width &&
         y > b.posY && y < b.posY + b.height)
         document.location.href = b.toPage;
   });
}
