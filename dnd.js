var cnv;
var zoom = 10;
var gridSpacing = 50;
var zoomSpeed = 1;
var xOff = 0;
var yOff = 0;
var hX, hY;
var barbImg;
var hiLi = {
   isHigh: false,
   posX: 0,
   posY: 0
};
var buttons = [];
var buttonProps = [];
var characters = [];
var showMenuButton ={
   showMenu: false,
   posX: 10,
   posY: 100,
   width: 50,
   height: 30,
   text: "More",
   show: true,
   fnc: function(butt) {
      this.showMenu = !this.showMenu;
      (this.showMenu) ? butt.style('background-color', coolors.blue) : butt.style('background-color', coolors.gray);
      buttons.forEach(b => {
         this.showMenu ? b.show() : (b!==butt ? b.hide() : b.show());
      });
   }
};
var editButton ={
   editWalls: false,
   posX: 10,
   posY: 150,
   width: 50,
   height: 30,
   text: "Edit",
   show: false,
   fnc: function(butt) {
      this.editWalls = !this.editWalls;
      (this.editWalls) ? butt.style('background-color', coolors.blue) : butt.style('background-color', coolors.gray);
   }
};

function preload() {
   barbImg = loadImage( 'assets/barbarian.png' );
   setupCoolors();
}

function setup() {
   setupChars();
   cnv = createCanvas( windowWidth, windowHeight );
   setupButtons();
   redrawAll();
}
function setupButtons(){
   buttonProps.push(showMenuButton);
   buttonProps.push(editButton);
   buttonProps.forEach(bp => {
      var button = createButton(bp.text);
      button.position(bp.posX, bp.posY);
      button.size(bp.width, bp.height);
      bp.myButton = button;
      button.style('background-color', coolors.white);
      button.style('outline', 'none');
      button.style('border', '2px solid ' + coolors.orange);
      button.mousePressed(function () {bp.fnc(button);});
      (bp.show) ? button.show() : button.hide();
      buttons.push(button);
   });
   // var button = createButton(editButton.text);
   // button.position(editButton.posX, editButton.posY);
   // button.size(editButton.width, editButton.height);
   // editButton.myButton = button;
   // button.style('background-color', coolors.gray);
   // button.style('outline', 'none');
   // button.mousePressed(function () {editButton.fnc(button);});
   // buttons.push(button);
}
function setupChars() {
   characters.push({ //barb
      posX : 10,
      posY: 5,
      image: barbImg
   });
}

function moveGrid() {
   redrawAll();
}

function draw() {
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 2;
   cnv.position(x, y);
}

function drawGrid() {
   stroke( coolors.gray );
   for(var i = 0; i < (windowWidth / gridSpacing); i++) {
      line(i * gridSpacing, 0, i * gridSpacing, windowHeight);
   }
   for(var i = 0; i < (windowHeight / gridSpacing); i++) {
      line(0, i * gridSpacing, windowWidth, i * gridSpacing);
   }
}

function drawChars() {
   characters.forEach(character => {
      image(character.image,
            (character.posX + xOff) * gridSpacing,
            (character.posY + yOff) * gridSpacing,
            gridSpacing,
            gridSpacing);
   });
}

function drawHiLi() {
   if( hiLi.isHigh ) {
      stroke( coolors.blue );
      strokeWeight( 2 );
      fill( coolors.white );
      rect( (hiLi.posX + xOff) * gridSpacing,
            (hiLi.posY + yOff) * gridSpacing,
            gridSpacing,
            gridSpacing);
      strokeWeight( 1 );
   }
}

function drawMenu(){
   strokeWeight( 2 );
   stroke(coolors.black);
   fill(coolors.rasp);
   if(showMenuButton.showMenu){
      rect(0,90,75,100);
   }else{
      rect(0,90,75,50);

   }
   strokeWeight( 1 );

}

function redrawAll() {
   clear();
   background( coolors.white );
   drawGrid();
   drawHiLi();
   drawChars();
   drawMenu();
}

function mousePressed() {
   var gx = Math.floor(mouseX / gridSpacing) - xOff;
   var gy = Math.floor(mouseY / gridSpacing) - yOff;
   var clickedOnChar = false;
   characters.forEach(character => {
      if( gx == character.posX && gy == character.posY )
         clickedOnChar = true;
   });
   if( clickedOnChar ) {
      hiLi.posX = gx;
      hiLi.posY = gy;
      hiLi.isHigh = true;
   } else {
      characters.forEach(character => {
         if(hiLi.posX == character.posX && hiLi.posY == character.posY) {
            hiLi.isHigh = false;
            character.posX = gx;
            character.posY = gy;
         }
      });
   }
   redrawAll();
}

function keyPressed() {
   switch( keyCode ) {
      case 187: // +
         gridSpacing += zoomSpeed;
         break;
      case 189: // -
         gridSpacing > zoomSpeed ? gridSpacing -= zoomSpeed : null;
         break;
      case 37: // left
         xOff++;
         break;
      case 39: // right
         xOff--;
         break;
      case 38: // up
         yOff++;
         break;
      case 40: // down
         yOff--;
         break;
      default:
         break;
   }
   redrawAll();
}
