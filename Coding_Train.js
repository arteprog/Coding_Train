var vagoes;
var path;
var C, V, cv;
var  up, down, left, right;
var turn_rate;
var pivot;
var cx, cy;

function setup() {
  createCanvas( 800, 600 );
  cx = width/2;
  cy = height/2;
  vagoes = [];
  C = 48;
  V = 3;
  cv = 16;// C/V;
  
  turn_rate = PI * 0.125;
  for( var i = 0; i < 13; ++i ){
    vagoes.push( createVector( cx - i * C, cy ) );
  }
  
  path = [];
  for( var i = 0; i < vagoes.length * cv; ++i ){
    path.push( createVector( cx - i * V, cy ) );
  }
  pivot = 0;
}

function draw() {
  background(200);
  
  
  var angulo = atan2( vagoes[0].y - vagoes[1].y, vagoes[0].x - vagoes[1].x );
  var th = 0;
  if( up ) ++ th;
  if( down ) -- th;
  if( th != 0 ){
    th *= V;
    var mo;
    if( left )  mo = createVector( th * cos( angulo - turn_rate ), th * sin( angulo - turn_rate ) );
    else if( right ) mo = createVector( th * cos( angulo + turn_rate ), th * sin( angulo + turn_rate ) );
    else mo = createVector( th * cos( angulo ), th * sin( angulo ) );
    vagoes[0].add( mo );
    
    --pivot;
    if( pivot < 0 ) pivot = path.length-1;
    path[pivot] = vagoes[0].copy();
  }
  
  var angulos = [];
  //for( var i = 0; i < vagoes.length -1; ++i ) angulos[i] = atan2( vagoes[i+1].y - vagoes[i].y, vagoes[i+1].x - vagoes[i].x );
  angulos[0] = atan2( vagoes[1].y - vagoes[0].y, vagoes[1].x - vagoes[0].x );
  for( var i = 0; i < vagoes.length-2; ++i ){
    vagoes[i+1].x = vagoes[i].x + cos( angulos[i] ) * C;
    vagoes[i+1].y = vagoes[i].y + sin( angulos[i] ) * C;
    angulos[i+1] = atan2( vagoes[i+2].y - vagoes[i+1].y, vagoes[i+2].x - vagoes[i+1].x );
  }
  vagoes[vagoes.length-1].x = vagoes[vagoes.length-2].x + cos( angulos[vagoes.length-2] ) * C;
  vagoes[vagoes.length-1].y = vagoes[vagoes.length-2].y + sin( angulos[vagoes.length-2] ) * C;
  
  fill(127);
  for( var i = 1; i < vagoes.length - 1; ++i ){
    var I = pivot + (i * cv);
    if( I > path.length-1 ) I = (i * cv) + pivot - path.length;
    var P = pivot + ((i-1) * cv);
    if( P > path.length-1 ) P = ((i-1) * cv) + pivot - path.length;
    translate( lerp( path[I].x, path[P].x, 0.1 ), lerp( path[I].y, path[P].y, 0.1 ) );
    rotate( atan2( path[P].y - path[I].y, path[P].x - path[I].x ) );
    rect(0, -12, 0.8 * C, 24 );
    resetMatrix();
  }
  
  //for( var i = 0; i < path.length; ++i ) point( path[i].x, path[i].y );
  
  //print( path.length );
  
  fill(255);
  for( var i = 0; i < vagoes.length -1; ++i ){
    translate( lerp( vagoes[i].x, vagoes[i+1].x, 0.1 ), lerp( vagoes[i].y, vagoes[i+1].y, 0.1 ) );
    rotate( angulos[i] );
    rect(0, -12, 0.8 * C, 24 );
    resetMatrix();
    //line( vagoes[i].x, vagoes[i].y, vagoes[i+1].x, vagoes[i+1].y );
    //ellipse( vagoes[i].x, vagoes[i].y, 10, 10 );
  }
}

function keyPressed(){
  if( keyCode == UP_ARROW ) up = true;
  else if( keyCode == DOWN_ARROW ) down = true;
  else if( keyCode == LEFT_ARROW ) left = true;
  else if( keyCode == RIGHT_ARROW ) right = true;
}
function keyReleased(){
  if( keyCode == UP_ARROW ) up = false;
  else if( keyCode == DOWN_ARROW ) down = false;
  else if( keyCode == LEFT_ARROW ) left = false;
  else if( keyCode == RIGHT_ARROW ) right = false;
}