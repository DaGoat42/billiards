let resetTime = 0;
let xMax = 700;
let yMax = 300;
let x0 = 150;
let y0 = 0.65 * yMax;
let target;
let walls;
let cue;
let img;
let balls;
let table;
let cueBall;
let score = 0;


function setup() {
	new Canvas(xMax, yMax);
	
	img = loadImage('background.png')
	table = new Sprite();
	img.resize(xMax, yMax);
	table.img = img;
	table.img.scale = 0.35;
	table.collider = 'none';
	//image(img, 0, 0);
	
	balls = new Group();
	balls.d = 20;
	newCueBall();
	
	cue = new Sprite();
	cue.h = 60;
	cue.w = 10;
	cue.x = xMax - 110;
	cue.y = yMax - 60;
	cue.collider = 'kinematic';
	cue.hasHitBall = 0;
	
	box = new Sprite([
    [105, 30],
    [xMax - 105, 30],
    [xMax - 105, yMax - 30],
    [105, yMax - 30],
    [105, 30]
  ]);
  box.collider = "static";
  box.shape = "chain";
  // box.visible = false;
	box.bounciness = 1;
	// box.friction = 0;
	
	pocketDetectors = new Group();
	pocketDetectors.diameter = 30;
	pocketDetectors.overlaps(box);
	pocketDetectors.collider = 'kinematic';
	pocketDetectors.debug = true;
	pocketDetectors.collides(balls, (this_pocket, the_ball) => {
	    score += 1;
			cueBall.life = 1;
			newCueBall();
	});
	
	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = 105; // + 0*col_num*xMax/2;
	this_pocket.y = 30; // + 0*row_num*yMax;

	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = xMax - 105; 
	this_pocket.y = 30;
	
	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = xMax - 105; 
	this_pocket.y = yMax - 30;
	
	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = 105; 
	this_pocket.y = yMax - 30;
	
	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = xMax/2; 
	this_pocket.y = yMax - 20;
	
	this_pocket = new pocketDetectors.Sprite();
	this_pocket.x = xMax/2; 
	this_pocket.y = 20;
}	

function draw() {
	clear();
	
	if (mouse.pressing()) {
		cue.x = mouse.x;
		cue.y = mouse.y;
		cue.rotateMinTo(cueBall, 100, 90);
		cue.collider = 'dynamic';
	}
	else {
			cue.collider = 'kinematic';
	}
	if (mouse.pressed()) {
		cue.rotationLock = true;
		if (cue.hasHitBall ==0) {
			cue.moveTowards (cueBall)
		}
		
		
	}
	if (cue.collides (cueBall)) {
		cue.hasHitBall = 1;
		cue.vel.x = 0;
		cue.vel.y = 0;
		cue.collider = 'none'
	}
	else {
		cue.collider = 'kinematic'
	}
	if (abs(cueBall.vel.x) < 0.1 && abs(cueBall.vel.y) < 0.1) {
		cue.hasHitBall = 0;
	}
	allSprites.draw();
	textSize(20);
	fill('white');
	text("Score: " + score, xMax/2 - 40, yMax/2);
}

function newCueBall() {
	cueBall = new balls.Sprite();
	cueBall.color = ('white')
	cueBall.x = 400;
	cueBall.y = 150;
	cueBall.drag = 1;
}
