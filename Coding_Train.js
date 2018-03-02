var locomotiva;
var vagoes;
var path;
var vel, drift;
var C, V, cv;
var  up, down, left, right;
var turn_rate;
var pivot;
var cx, cy;

function setup() {
  createCanvas( 800, 600 );
  cx = width/2;
  cy = height/2;
  C = 52;
  V = 3.25;
  cv = 16;// C/V;
  vagoes = 10;
  
  turn_rate = PI * 0.125;
  
  path = [];
  for( var i = 0; i < vagoes * cv; ++i ){
    path.push( createVector( cx - i * V, cy ) );
  }
  locomotiva = createVector( cx, cy );
  vel = createVector( 0, 0 );
  pivot = 0;
}

function draw() {
  background(200);
  var I = int(pivot + cv);
  if( I > path.length-1 ) I = cv + pivot - path.length;
  var angulo = atan2( locomotiva.y - path[I].y, locomotiva.x - path[I].x );
  var th = 0;
  if( up ) ++ th;
  if( down ) -- th;
  if( th != 0 ){
    //th *= V;
    var mo;
    if( left )  mo = createVector( th * cos( angulo - turn_rate ), th * sin( angulo - turn_rate ) );
    else if( right ) mo = createVector( th * cos( angulo + turn_rate ), th * sin( angulo + turn_rate ) );
    else mo = createVector( th * cos( angulo ), th * sin( angulo ) );
    vel.add( mo );
    vel.setMag( constrain(vel.mag(), 0, V ) );   
  }
  if( vel.mag() > 0 ){
    locomotiva.add( vel );
    if( abs(vel.mag() - V) <= 0.15 || drift >= V ){
      --pivot;
      if( pivot < 0 ) pivot = path.length-1;
      path[pivot] = locomotiva.copy();
      drift = 0;
    }
    else drift += vel.mag();
    vel.setMag( vel.mag() * 0.96 );
    if( vel.mag() < 0.002 ) vel.setMag(0);
  }
  
  translate( cx - locomotiva.x, cy -locomotiva.y );
  noFill();
  for( var i = -2; i <= 2; ++i ){
    for( var j = -2; j <= 2; ++j ){
      rect( i*width, j*height, width, height );
    }
  }
  resetMatrix();
  
  fill(127);
  for( var i = 1; i < vagoes - 1; ++i ){
    print("umm");
    var I = int(pivot + (i * cv));
    if( I > path.length-1 ) I = int((i * cv) + pivot - path.length);    
    var P = int(pivot + ((i-1) * cv));
    if( P > path.length-1 ) P = int(((i-1) * cv) + pivot - path.length);
    translate( cx - locomotiva.x, cy -locomotiva.y );
    translate( lerp( path[I].x, path[P].x, 0.1 ), lerp( path[I].y, path[P].y, 0.1 ) );
    rotate( atan2( path[P].y - path[I].y, path[P].x - path[I].x ) );
    print("so");
    rect(0, -12, 0.8 * C, 24 );
    resetMatrix();
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