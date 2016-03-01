ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.timer',
	'plugins.parallax',
	'plugins.parallaxHorizontal'
)
.defines(function(){

	YouWin = ig.Game.extend({

		screen: new ig.Image('media/Sky.png'),
		frog: new ig.Image('media/Frog.png'),
		instructText: new ig.Font( 'media/font.png' ),
		mainCharacter: new ig.Image( 'media/Fairy.png' ),

		init: function() {
		},

		update: function() {
		},

		draw: function() {
			this.screen.draw(0,0);
			this.instructText.draw("YOU WIN!", 300, 100, ig.Font.ALIGN.CENTER);
			this.instructText.draw("The princess has claimed her frog prince!", 300, 130, ig.Font.ALIGN.CENTER);
			this.mainCharacter.draw(50, 200);
			this.frog.draw(250,200);
		}
	});

	Level4 = ig.Game.extend({
		x: 200, y: 50,
		direction: 4,
		image: 1,
		fx: 395, fy: 440,
		f1x: 450, f1y:300,
		f2x: 450, f2y: 200,
		f3x: 450, f3y: 90,
		dragonLife: 3,

		background: new ig.Image( 'media/4' ),
		instructText: new ig.Font( 'media/font.png' ),
		flyRight: new ig.Image('media/FlyRight.png'),
		flyLeft: new ig.Image('media/FlyLeft.png'),
		dragon: new ig.Image('media/Dragon.png'),
		fire: new ig.Image('media/Fire.png'),
		spell: new ig.Image('media/Spell.png'),
		spellx: 0, spelly: 0, spelldir: 0,

		init: function() {
			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.SPACE, 'shoot');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.A, 'leftP');
			ig.input.bind(ig.KEY.S, 'rightP');
		},

		update: function() {
			this.fx -= 2.5;
			this.f1x -= 2.2;
			this.f2x -= 2.5;
			this.f3x -= 2.8;

			if (this.fx <= -100) this.fx = 395;
			if (this.f1x <= -100) this.f1x = 450;
			if (this.f2x <= -100) this.f2x = 450;
			if (this.f3x <= -100) this.f3x = 450;
			if (this.fx <= this.x + 32 && this.fx + 50 >= this.x && this.fy >= this.y && this.fy <= this.y + 32) {
				lives--;
				if (lives == 0) ig.system.setGame(GameOver);
				else ig.system.setGame(Level4Info);
			}
			if (this.f1x <= this.x + 32 && this.f1x + 50 >= this.x && this.f1y >= this.y && this.f1y <= this.y + 32) {
				lives--;
				if (lives == 0) ig.system.setGame(GameOver);
				else ig.system.setGame(Level4Info);
			}
			if (this.f2x <= this.x + 32 && this.f2x + 50 >= this.x && this.f2y >= this.y && this.f2y <= this.y + 32) {
				lives--;
				if (lives == 0) ig.system.setGame(GameOver);
				else ig.system.setGame(Level4Info);
			}
			if (this.f3x <= this.x + 32 && this.f3x + 50 >= this.x && this.f3y >= this.y && this.f3y <= this.y + 32) {
				lives--;
				if (lives == 0) ig.system.setGame(GameOver);
				else ig.system.setGame(Level4Info);
			}

			if (lives == 0) ig.system.setGame(GameOver);

			if (this.spelldir == 1) {
				this.spellx += 2;
				this.spelly += 3;
			}
			else {
				this.spellx -= 2;
				this.spelly += 3;
			}

			if (this.spellx >= 395 && this.spelly >= 410) {
				ig.system.setGame(YouWin);
			}

			//if (this.dragonLife == 0) ig.system.setGame(YouWin);

			if (ig.input.pressed('shoot')) {
				this.spellx = this.x;
				this.spelly = this.y;
				if (this.image == 1) this.spelldir = 1;
				else this.spelldir = 0;
			}

			if (ig.input.pressed('down')) {
				this.direction = 2;
			}

			if (ig.input.pressed('left')) {
				this.direction = 3;
				this.image = 0;
			}

			if (ig.input.pressed('right')) {
				this.direction = 4;
				this.image = 1;
			}

			if (ig.input.pressed('up')) {
				this.direction = 1;
			}

			if (this.direction == 1) {
				if (this.y >= 50) this.y -= 2;
				else (this.y = 50);
			}

			if (this.direction == 2) {
				if (this.y <= 500) this.y += 2;
				else (this.y = 500);
			}

			if (this.direction == 3) {
				if (this.x >= 60) this.x-= 2;
				else (this.x = 60);
			}

			if (this.direction == 4) {
				if (this.x <= 500) this.x+= 2;
				else (this.x = 500);
			}
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.background.draw(0,0);
			this.dragon.draw(395, 410);
			this.fire.draw(this.fx, this.fy);
			this.fire.draw(this.f1x, this.f1y);
			this.fire.draw(this.f2x, this.f2y);
			this.fire.draw(this.f3x, this.f3y);
			this.instructText.draw("LIVES: " + lives, 10, 10);

			this.spell.draw(this.spellx, this.spelly);


			if (this.image == 1) this.flyRight.draw(this.x, this.y);
			else this.flyLeft.draw(this.x, this.y);
		}
	});


	Level4Info = ig.Game.extend({
		screen: new ig.Image('media/Level4.png'),
		text: new ig.Font('media/font1.png'),
		instructText: new ig.Font( 'media/font.png' ),
		mainCharacter: new ig.Image( 'media/Fairy.png' ),

		init: function() {
			ig.input.bind(ig.KEY.SPACE, 'continue');
		},

		update: function() {
			if (ig.input.pressed( 'continue')) {
				ig.system.setGame(Level4);
			}
			this.parent();
		},

		draw: function() {
			this.screen.draw(0,0);
			this.mainCharacter.draw(120, 260);
			this.text.draw("Your fairy godmother has gifted", 300, 100, ig.Font.ALIGN.CENTER);
			this.text.draw("you her wand to face the dragon", 300, 120, ig.Font.ALIGN.CENTER);
			this.text.draw("your keys will unlock!", 300, 140, ig.Font.ALIGN.CENTER);
			this.text.draw("Use the spacebar to cast a spell", 300, 160, ig.Font.ALIGN.CENTER);
			this.text.draw("on the dragon and finally", 300, 180, ig.Font.ALIGN.CENTER);
			this.text.draw("reach your frog prince!", 300, 200, ig.Font.ALIGN.CENTER);

			this.instructText.draw("Press Spacebar to Play", 300, 220, ig.Font.ALIGN.CENTER);
		}
	});

	Level3 = ig.Game.extend({
		move: 0,
		x: 50, y: 250,
		stomp: 0,

		background: new ig.Image( 'media/Start.png' ),
		instructText: new ig.Font( 'media/font.png' ),
		sky: new ig.Image( 'media/Sky2.png'),
		run1: new ig.Image('media/Run1.png'),
		run2: new ig.Image('media/Run2.png'),
		run3: new ig.Image('media/Run3.png'),
		fall1: new ig.Image('media/Fall1.png'),
		fall2: new ig.Image('media/Fall2.png'),
		fall3: new ig.Image('media/Fall3.png'),
		stomp: new ig.Image('media/Stomp.png'),
		fallTrigger: 0,
		fallTime: 0,
		bird: new ig.Image('media/Snake.png'), bx: 600, by: 400, b: 1,
		snake: new ig.Image('media/Snake.png'), bx1: 500, by1: 500,
		snakes: 0,

		init: function() {
			levelTime = new ig.Timer();
			this.parallax = new ParallaxHorizontal();
			this.parallax.add('media/Sky2.png', {distance: 5, y: 0});
			this.parallax.add('media/Clouds.png', {distance: 4, y:0});
			this.parallax.add('media/Grass.png', {distance: 1, y: 0});

			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.A, 'leftP');
			ig.input.bind(ig.KEY.S, 'rightP');
		},

		update: function() {
			// Update all entities and backgroundMaps
			this.parallax.move(50);
			this.parent();

			if (ig.input.pressed('jump')) {
				this.move = 2.5;
				this.y = 150;
				jump = new ig.Timer();
				//this.snakes++;
			}

			if (ig.input.pressed('up')) {
				this.stomp = 1;
				this.move = 6;
			}

			this.bx -= 5.5;
			this.bx1 -= 2;
			if (this.bx <= -200) {this.snakes++; this.bx = 600;}
			if (this.bx1 <= -50) this.bx1 = 550;
			if (this.bx <= this.x + 100 && this.bx + 20 >= this.x && this.by >= this.y && this.by + 20 <= this.y + 180) {
				this.fallTrigger = 1;
				fall = new ig.Timer();
				//ig.system.setGame(StartScreen);
			}

			if (this.fallTrigger == 1) {
				this.fallTime = fall.delta();
				if (this.fallTime <= 0.5) {
					this.move = 3;
				}
				else if (this.fallTime <= 1.0)
					this.move = 4;
				else if (this.fallTime <= 1.5)
					this.move = 5;
				else {
					lives --;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level3Info);
				}
			}

			playTimer = Math.round(levelTime.delta());
			if (this.snakes > 10) ig.system.setGame(Level4Info);
			//if (playTimer >= 20.0) ig.system.setGame(Level3Info);

			if (this.fallTrigger == 0) {
				jumpTime = jump.delta();
				if (jumpTime > 0.75 && this.fallTrigger == 0) {
					if (playTimer % 4 == 0.0) {
						this.y = 250;
						this.move = 0;
					}
					else if (playTimer % 4 == 1.0) {
						this.y = 250;
						this.move = 2;
					}
					else if (playTimer % 4 == 2.0){
						this.y = 250;
						this.move = 1;
					}
					else {
						this.y = 250;
						this.move = 2;
					}
				}
				else this.move = 2;
			}
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parallax.draw();

			if (this.move == 0) this.run1.draw(this.x, this.y);
			if (this.move == 2) this.run2.draw(this.x, this.y);
			if (this.move == 1) this.run3.draw(this.x, this.y);
			if (this.move == 3) this.fall1.draw(this.x, this.y);
			if (this.move == 4) this.fall2.draw(this.x, this.y);
			if (this.move == 5) this.fall3.draw(this.x, this.y);
			if (this.move == 6) this.stomp.draw(this.x, this.y);
			this.instructText.draw("LIVES: " + lives, 10, 10);
			//this.instructText.draw(this.fallTime, 10, 10);
			this.bird.draw(this.bx, this.by);
			this.bird.draw(this.bx1, this.by1);
		}
	});

	Level3Info = ig.Game.extend({
		screen: new ig.Image('media/Level3.png'),
		text: new ig.Font('media/font1.png'),
		instructText: new ig.Font( 'media/font.png' ),

		init: function() {
			ig.input.bind(ig.KEY.SPACE, 'continue');
		},

		update: function() {
			if (ig.input.pressed( 'continue')) {
				ig.system.setGame(Level3);
			}
			this.parent();
		},

		draw: function() {
			this.screen.draw(0,0);
			this.text.draw("Make it through the field and ", 300, 100, ig.Font.ALIGN.CENTER);
			this.text.draw("find the prince's door!", 300, 120, ig.Font.ALIGN.CENTER);
			this.text.draw("Use the spacebar to jump TEN snakes", 300, 140, ig.Font.ALIGN.CENTER);
			this.text.draw("and move on to the next level", 300, 160, ig.Font.ALIGN.CENTER);
			this.instructText.draw("Press Spacebar to Play", 300, 190, ig.Font.ALIGN.CENTER);
		}
	});

	GameOver = ig.Game.extend({
		back: new ig.Image( 'media/gameOver.png' ),
		fairy: new ig.Image( 'media/SadFairy.png'),
		instructText: new ig.Font( 'media/04b03.font.png' ),
		background: new ig.Image('media/Start.png'),

		init: function() {
			ig.input.bind( ig.KEY.SPACE, 'start');
		},

		update: function() {
			if (ig.input.pressed ('start')){
				ig.system.setGame(StartScreen)
			}
			this.parent();
		},

	  draw: function() {
			this.parent();
			this.back.draw(150, 30);
			this.fairy.draw(195, 300);
		}
	});

Level2 = ig.Game.extend({
	princessx: 0, princessy: 20, //starting position
	f10x: 10, f10y: 600, f10: 1, //up
	f1x: 50, f1y: 0, f1: 1, //down
	f8x: 100, f8y: 600, f8: 1, //up
	f2x: 160, f2y: 0, f2: 1, //down
	f3x: 210, f3y: 600, f3: 1, //up
	f4x: 300, f4y: 0, f4: 1, //down
	f9x: 340, f9y: 600, f9: 1, //up
	f5x: 380, f5y: 0, f5: 1, //down
	f6x: 450, f6y: 0, f6: 1, //down
	f11x: 490, f11y: 600, f11: 1, //up
	f7x: 530, f7y: 0, f7: 1, //down

	image: 0, //starting position
	direction: 4, //start right
	keysLeft: 10,
	up: 1, down: 1, left: 1, right: 1,
	x1: 300, y1: 300, k1: 1, //key 1
	x2: 100, y2: 525, k2: 1, //key 2
	x3: 500, y3: 500, k3: 1, //key 3
	x4: 520, y4: 100, k4: 1, //key 4
	x5: 50, y5: 400, k5: 1, //key 5
	x6: 75, y6: 50, k6: 1, //key 6
	x7: 100, y7: 200, k7: 1, //key7
	x8: 275, y8: 40, k8: 1, //key 8
	x9: 450, y9: 200, k9: 1, //key 9
	x10: 375, y10: 550, k10: 1, //key 10

	Water: new ig.Image('media/Water .png'),
	Key: new ig.Image('media/Key.png'),
	fish: new ig.Image('media/Fish.png'),
	fishUp: new ig.Image('media/FishUp.png'),
	U1: new ig.Image('media/SwimU1.png'),
	R1: new ig.Image('media/SwimR1.png'),
	D1: new ig.Image('media/SwimD1.png'),
	L1: new ig.Image('media/SwimL1.png'),
	U2: new ig.Image('media/SwimU2.png'),
	R2: new ig.Image('media/SwimR2.png'),
	D2: new ig.Image('media/SwimD2.png'),
	L2: new ig.Image('media/SwimL2.png'),
	U3: new ig.Image('media/SwimU3.png'),
	R3: new ig.Image('media/SwimR3.png'),
	D3: new ig.Image('media/SwimD3.png'),
	L3: new ig.Image('media/SwimL3.png'),
	U4: new ig.Image('media/SwimU4.png'),
	R4: new ig.Image('media/SwimR4.png'),
	D4: new ig.Image('media/SwimD4.png'),
	L4: new ig.Image('media/SwimL4.png'),
	instructText: new ig.Font( 'media/font4.png' ),

	init: function() {
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
	},

	update: function() {
		this.parent();

		if (this.keysLeft == 0)
			ig.system.setGame(Level3Info);
		if (lives == 0)
			ig.system.setGame(GameOver);

		this.f1y += 1;
		this.f2y += 2;
		this.f3y -= 2.5;
		this.f4y += 1;
		this.f5y += 2;
		this.f6y += 3;
		this.f7y += 2;
		this.f8y -= 2.5;
		this.f9y -= 1;
		this.f11y -= 1;

		if (this.f1y > 630) this.f1y = -30;
		if (this.f2y > 630) this.f2y = -30;
		if (this.f3y < -30) this.f3y = 600;
		if (this.f4y > 630) this.f4y = -30;
		if (this.f5y > 630) this.f5y = -30;
		if (this.f6y > 630) this.f6y = -30;
		if (this.f7y > 630) this.f7y = -30;
		if (this.f8y < -30) this.f8y = 600;
		if (this.f9y < -30) this.f9y = 600;
		if (this.f11y < -30) this.f11y = 600;

		if (ig.input.pressed('up')) { //direction = 1
			if (this.princessx <= this.x1 && this.princessx + 64 >= this.x1 + 32 && this.princessy <= this.y1 + 32) {if (this.k1 == 1) {this.keysLeft--; this.k1 = 0};}
			else if (this.princessx <= this.x2 && this.princessx + 64 >= this.x2 + 32 && this.princessy  <= this.y2 + 32) {if (this.k2 == 1) {this.keysLeft--; this.k2 = 0};}
			else if (this.princessx <= this.x3 && this.princessx + 64 >= this.x3 + 32 && this.princessy  <= this.y3 + 32) {if (this.k3 == 1) {this.keysLeft--; this.k3 = 0};}
			else if (this.princessx <= this.x4 && this.princessx + 64 >= this.x4 + 32 && this.princessy  <= this.y4 + 32) {if (this.k4 == 1) {this.keysLeft--; this.k4 = 0};}
			else if (this.princessx <= this.x5 && this.princessx + 64 >= this.x5 + 32 && this.princessy  <= this.y5 + 32) {if (this.k5 == 1) {this.keysLeft--; this.k5 = 0};}
			else if (this.princessx <= this.x6 && this.princessx + 64 >= this.x6 + 32 && this.princessy  <= this.y6 + 32) {if (this.k6 == 1) {this.keysLeft--; this.k6 = 0};}
			else if (this.princessx <= this.x7 && this.princessx + 64 >= this.x7 + 32 && this.princessy  <= this.y7 + 32) {if (this.k7 == 1) {this.keysLeft--; this.k7 = 0};}
			else if (this.princessx <= this.x8 && this.princessx + 64 >= this.x8 + 32 && this.princessy  <= this.y8 + 32) {if (this.k8 == 1) {this.keysLeft--; this.k8 = 0};}
			else if (this.princessx <= this.x9 && this.princessx + 64 >= this.x9 + 32 && this.princessy  <= this.y9 + 32) {if (this.k9 == 1) {this.keysLeft--; this.k9 = 0};}
			else if (this.princessx <= this.x10 && this.princessx + 64 >= this.x10 + 32 && this.princessy  <= this.y10 + 32) {if (this.k10 == 1) {this.keysLeft--; this.k10 = 0};}

			if (this.princessx <= this.f1x && this.princessx + 64 >= this.f1x + 32 && this.princessy <= this.f1y + 32 && this.princessy + 64 >= this.f1y + 32) {if (this.f1 == 1) {lives--; this.f1 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f2x && this.princessx + 64 >= this.f2x + 32 && this.princessy <= this.f2y + 32 && this.princessy + 64 >= this.f2y + 32) {if (this.f2 == 1) {lives--; this.f2 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f3x && this.princessx + 64 >= this.f3x + 32 && this.princessy <= this.f3y + 32 && this.princessy + 64 >= this.f3y + 32) {if (this.f3 == 1) {lives--; this.f3 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f4x && this.princessx + 64 >= this.f4x + 32 && this.princessy <= this.f4y + 32 && this.princessy + 64 >= this.f4y + 32) {if (this.f4 == 1) {lives--; this.f4 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f5x && this.princessx + 64 >= this.f5x + 32 && this.princessy <= this.f5y + 32 && this.princessy + 64 >= this.f5y + 32) {if (this.f5 == 1) {lives--; this.f5 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f6x && this.princessx + 64 >= this.f6x + 32 && this.princessy <= this.f6y + 32 && this.princessy + 64 >= this.f6y + 32) {if (this.f6 == 1) {lives--; this.f6 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f7x && this.princessx + 64 >= this.f7x + 32 && this.princessy <= this.f7y + 32 && this.princessy + 64 >= this.f7y + 32) {if (this.f7 == 1) {lives--; this.f7 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f8x && this.princessx + 64 >= this.f8x + 32 && this.princessy <= this.f8y + 32 && this.princessy + 64 >= this.f8y + 32) {if (this.f8 == 1) {lives--; this.f8 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f9x && this.princessx + 64 >= this.f9x + 32 && this.princessy <= this.f9y + 32 && this.princessy + 64 >= this.f9y + 32) {if (this.f9 == 1) {lives--; this.f9 = 0; ig.system.setGame(Level2Info);}}
			else if (this.princessx <= this.f11x && this.princessx + 64 >= this.f11x + 32 && this.princessy <= this.f11y + 32 && this.princessy + 64 >= this.f11y + 32) {if (this.f11 == 1) {lives--; this.f11 = 0; ig.system.setGame(Level2Info);}}

			if (this.f1 == 0) {this.f1 = 1; this.f1y = 0};
			if (this.f2 == 0) {this.f2 = 1; this.f2y = 0};
			if (this.f3 == 0) {this.f3 = 1; this.f3y = 600};
		  if (this.f4 == 0) {this.f4 = 1; this.f4y = 0};
			if (this.f5 == 0) {this.f5 = 1; this.f5y = 0};
			if (this.f6 == 0) {this.f6 = 1; this.f6y = 0};
			if (this.f7 == 0) {this.f7 = 1; this.f7y = 0};
			if (this.f8 == 0) {this.f8 = 1; this.f8y = 600};
			if (this.f9 == 0) {this.f9 = 1; this.f9y = 600};
			if (this.f11 == 0) {this.f11 = 1; this.f11y = 600};

			this.direction = 1;
			this.princessy -= 20;
			if (this.image < 4)
				this.image ++;
			else {
				this.image = 0;
			}
		}

		if (ig.input.pressed('down')) { //direction = 2
			if (this.princessx <= this.x1 && this.princessx + 64 >= this.x1 && this.princessy <= this.y1 && this.princessy + 32 >= this.y1) {if (this.k1 == 1) {this.keysLeft--; this.k1 = 0};}
			else if (this.princessx <= this.x2 && this.princessx + 64 >= this.x2 && this.princessy <= this.y2 && this.princessy + 32 >= this.y2) {if (this.k2 == 1) {this.keysLeft--; this.k2 = 0};}
			else if (this.princessx <= this.x3 && this.princessx + 64 >= this.x3 && this.princessy <= this.y3 && this.princessy + 32 >= this.y3) {if (this.k3 == 1) {this.keysLeft--; this.k3 = 0};}
			else if (this.princessx <= this.x4 && this.princessx + 64 >= this.x4 && this.princessy <= this.y4 && this.princessy + 32 >= this.y4) {if (this.k4 == 1) {this.keysLeft--; this.k4 = 0};}
			else if (this.princessx <= this.x5 && this.princessx + 64 >= this.x5 && this.princessy <= this.y5 && this.princessy + 32 >= this.y5) {if (this.k5 == 1) {this.keysLeft--; this.k5 = 0};}
			else if (this.princessx <= this.x6 && this.princessx + 64 >= this.x6 && this.princessy <= this.y6 && this.princessy + 32 >= this.y6) {if (this.k6 == 1) {this.keysLeft--; this.k6 = 0};}
			else if (this.princessx <= this.x7 && this.princessx + 64 >= this.x7 && this.princessy <= this.y7 && this.princessy + 32 >= this.y7) {if (this.k7 == 1) {this.keysLeft--; this.k7 = 0};}
			else if (this.princessx <= this.x8 && this.princessx + 64 >= this.x8 && this.princessy <= this.y8 && this.princessy + 32 >= this.y8) {if (this.k8 == 1) {this.keysLeft--; this.k8 = 0};}
			else if (this.princessx <= this.x9 && this.princessx + 64 >= this.x9 && this.princessy <= this.y9 && this.princessy + 32 >= this.y9) {if (this.k9 == 1) {this.keysLeft--; this.k9 = 0};}
			else if (this.princessx <= this.x10 && this.princessx + 64 >= this.x10 && this.princessy <= this.y10 && this.princessy + 32 >= this.y10) {if (this.k10 == 1) {this.keysLeft--; this.k10 = 0};}

			if (this.princessx <= this.f1x && this.princessx + 32 >= this.f1x && this.princessy <= this.f1y && this.princessy + 32 >= this.f1y) {if (this.f1 == 1) {lives--; this.f1 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f2x && this.princessx + 32 >= this.f2x && this.princessy <= this.f2y && this.princessy + 32 >= this.f2y) {if (this.f2 == 1) {lives--; this.f2 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f3x && this.princessx + 32 >= this.f3x && this.princessy <= this.f3y && this.princessy + 32 >= this.f3y) {if (this.f3 == 1) {lives--; this.f3 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f4x && this.princessx + 32 >= this.f4x && this.princessy <= this.f4y && this.princessy + 32 >= this.f4y) {if (this.f4 == 1) {lives--; this.f4 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f5x && this.princessx + 32 >= this.f5x && this.princessy <= this.f5y && this.princessy + 32 >= this.f5y) {if (this.f5 == 1) {lives--; this.f5 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f6x && this.princessx + 32 >= this.f6x && this.princessy <= this.f6y && this.princessy + 32 >= this.f6y) {if (this.f6 == 1) {lives--; this.f6 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f7x && this.princessx + 32 >= this.f7x && this.princessy <= this.f7y && this.princessy + 32 >= this.f7y) {if (this.f7 == 1) {lives--; this.f7 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f8x && this.princessx + 32 >= this.f8x && this.princessy <= this.f8y && this.princessy + 32 >= this.f8y) {if (this.f8 == 1) {lives--; this.f8 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f9x && this.princessx + 32 >= this.f9x && this.princessy <= this.f9y && this.princessy + 32 >= this.f9y) {if (this.f9 == 1) {lives--; this.f9 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f11x && this.princessx + 32 >= this.f11x && this.princessy <= this.f11y && this.princessy + 32 >= this.f11y) {if (this.f11 == 1) {lives--; this.f11 = 0}; ig.system.setGame(Level2Info);}

			if (this.f1 == 0) {this.f1 = 1; this.f1y = 0};
			if (this.f2 == 0) {this.f2 = 1; this.f2y = 0};
			if (this.f3 == 0) {this.f3 = 1; this.f3y = 600};
		  if (this.f4 == 0) {this.f4 = 1; this.f4y = 0};
			if (this.f5 == 0) {this.f5 = 1; this.f5y = 0};
			if (this.f6 == 0) {this.f6 = 1; this.f6y = 0};
			if (this.f7 == 0) {this.f7 = 1; this.f7y = 0};
			if (this.f8 == 0) {this.f8 = 1; this.f8y = 600};
			if (this.f9 == 0) {this.f9 = 1; this.f9y = 600};
			if (this.f11 == 0) {this.f11 = 1; this.f11y = 600};

			this.direction = 2;
			this.princessy += 20;
			if (this.image < 4)
				this.image ++;
			else {
				this.image = 0;
			}
		}

		if (ig.input.pressed('left')) { //direction = 3
			if (this.princessx <= this.x1 && this.princessx + 64 >= this.x1 && this.princessy <= this.y1 && this.princessy + 64 >= this.y1) {if (this.k1 == 1) {this.keysLeft--; this.k1 = 0};}
			else if (this.princessx <= this.x2 && this.princessx + 64 >= this.x2 && this.princessy <= this.y2 && this.princessy + 64 >= this.y2) {if (this.k2 == 1) {this.keysLeft--; this.k2 = 0};}
			else if (this.princessx <= this.x3 && this.princessx + 64 >= this.x3 && this.princessy <= this.y3 && this.princessy + 64 >= this.y3) {if (this.k3 == 1) {this.keysLeft--; this.k3 = 0};}
			else if (this.princessx <= this.x4 && this.princessx + 64 >= this.x4 && this.princessy <= this.y4 && this.princessy + 64 >= this.y4) {if (this.k4 == 1) {this.keysLeft--; this.k4 = 0};}
			else if (this.princessx <= this.x5 && this.princessx + 64 >= this.x5 && this.princessy <= this.y5 && this.princessy + 64 >= this.y5) {if (this.k5 == 1) {this.keysLeft--; this.k5 = 0};}
			else if (this.princessx <= this.x6 && this.princessx + 64 >= this.x6 && this.princessy <= this.y6 && this.princessy + 64 >= this.y6) {if (this.k6 == 1) {this.keysLeft--; this.k6 = 0};}
			else if (this.princessx <= this.x7 && this.princessx + 64 >= this.x7 && this.princessy <= this.y7 && this.princessy + 64 >= this.y7) {if (this.k7 == 1) {this.keysLeft--; this.k7 = 0};}
			else if (this.princessx <= this.x8 && this.princessx + 64 >= this.x8 && this.princessy <= this.y8 && this.princessy + 64 >= this.y8) {if (this.k8 == 1) {this.keysLeft--; this.k8 = 0};}
			else if (this.princessx <= this.x9 && this.princessx + 64 >= this.x9 && this.princessy <= this.y9 && this.princessy + 64 >= this.y9) {if (this.k9 == 1) {this.keysLeft--; this.k9 = 0};}
			else if (this.princessx <= this.x10 && this.princessx + 64 >= this.x10 && this.princessy <= this.y10 && this.princessy + 64 >= this.y10) {if (this.k10 == 1) {this.keysLeft--; this.k10 = 0};}

			if (this.princessx <= this.f1x && this.princessx + 32 >= this.f1x && this.princessy <= this.f1y && this.princessy + 32 >= this.f1y) {if (this.f1 == 1) {lives--; this.f1 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f2x && this.princessx + 32 >= this.f2x && this.princessy <= this.f2y && this.princessy + 32 >= this.f2y) {if (this.f2 == 1) {lives--; this.f2 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f3x && this.princessx + 32 >= this.f3x && this.princessy <= this.f3y && this.princessy + 32 >= this.f3y) {if (this.f3 == 1) {lives--; this.f3 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f4x && this.princessx + 32 >= this.f4x && this.princessy <= this.f4y && this.princessy + 32 >= this.f4y) {if (this.f4 == 1) {lives--; this.f4 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f5x && this.princessx + 32 >= this.f5x && this.princessy <= this.f5y && this.princessy + 32 >= this.f5y) {if (this.f5 == 1) {lives--; this.f5 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f6x && this.princessx + 32 >= this.f6x && this.princessy <= this.f6y && this.princessy + 32 >= this.f6y) {if (this.f6 == 1) {lives--; this.f6 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f7x && this.princessx + 32 >= this.f7x && this.princessy <= this.f7y && this.princessy + 32 >= this.f7y) {if (this.f7 == 1) {lives--; this.f7 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f8x && this.princessx + 32 >= this.f8x && this.princessy <= this.f8y && this.princessy + 32 >= this.f8y) {if (this.f8 == 1) {lives--; this.f8 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f9x && this.princessx + 32 >= this.f9x && this.princessy <= this.f9y && this.princessy + 32 >= this.f9y) {if (this.f9 == 1) {lives--; this.f9 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f11x && this.princessx + 32 >= this.f11x && this.princessy <= this.f11y && this.princessy + 32 >= this.f11y) {if (this.f11 == 1) {lives--; this.f11 = 0}; ig.system.setGame(Level2Info);}

			if (this.f1 == 0) {this.f1 = 1; this.f1y = 0};
			if (this.f2 == 0) {this.f2 = 1; this.f2y = 0};
			if (this.f3 == 0) {this.f3 = 1; this.f3y = 600};
		  if (this.f4 == 0) {this.f4 = 1; this.f4y = 0};
			if (this.f5 == 0) {this.f5 = 1; this.f5y = 0};
			if (this.f6 == 0) {this.f6 = 1; this.f6y = 0};
			if (this.f7 == 0) {this.f7 = 1; this.f7y = 0};
			if (this.f8 == 0) {this.f8 = 1; this.f8y = 600};
			if (this.f9 == 0) {this.f9 = 1; this.f9y = 600};
			if (this.f11 == 0) {this.f11 = 1; this.f11y = 600};

			this.direction = 3;
			this.princessx -= 20;
			if (this.image < 4)
				this.image ++;
			else {
				this.image = 0;
			}
		}

		if (ig.input.pressed('right')) { //direction = 4
			if (this.princessx <= this.x1 && this.princessx + 64 >= this.x1 && this.princessy <= this.y1 && this.princessy + 64 >= this.y1) {if (this.k1 == 1) {this.keysLeft--; this.k1 = 0};}
			else if (this.princessx <= this.x2 && this.princessx + 64 >= this.x2 && this.princessy <= this.y2 && this.princessy + 64 >= this.y2) {if (this.k2 == 1) {this.keysLeft--; this.k2 = 0};}
			else if (this.princessx <= this.x3 && this.princessx + 64 >= this.x3 && this.princessy <= this.y3 && this.princessy + 64 >= this.y3) {if (this.k3 == 1) {this.keysLeft--; this.k3 = 0};}
			else if (this.princessx <= this.x4 && this.princessx + 64 >= this.x4 && this.princessy <= this.y4 && this.princessy + 64 >= this.y4) {if (this.k4 == 1) {this.keysLeft--; this.k4 = 0};}
			else if (this.princessx <= this.x5 && this.princessx + 64 >= this.x5 && this.princessy <= this.y5 && this.princessy + 64 >= this.y5) {if (this.k5 == 1) {this.keysLeft--; this.k5 = 0};}
			else if (this.princessx <= this.x6 && this.princessx + 64 >= this.x6 && this.princessy <= this.y6 && this.princessy + 64 >= this.y6) {if (this.k6 == 1) {this.keysLeft--; this.k6 = 0};}
			else if (this.princessx <= this.x7 && this.princessx + 64 >= this.x7 && this.princessy <= this.y7 && this.princessy + 64 >= this.y7) {if (this.k7 == 1) {this.keysLeft--; this.k7 = 0};}
			else if (this.princessx <= this.x8 && this.princessx + 64 >= this.x8 && this.princessy <= this.y8 && this.princessy + 64 >= this.y8) {if (this.k8 == 1) {this.keysLeft--; this.k8 = 0};}
			else if (this.princessx <= this.x9 && this.princessx + 64 >= this.x9 && this.princessy <= this.y9 && this.princessy + 64 >= this.y9) {if (this.k9 == 1) {this.keysLeft--; this.k9 = 0};}
			else if (this.princessx <= this.x10 && this.princessx + 64 >= this.x10 && this.princessy <= this.y10 && this.princessy + 64 >= this.y10) {if (this.k10 == 1) {this.keysLeft--; this.k10 = 0};}

			if (this.princessx <= this.f1x && this.princessx + 32 >= this.f1x && this.princessy <= this.f1y && this.princessy + 32 >= this.f1y) {if (this.f1 == 1) {lives--; this.f1 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f2x && this.princessx + 32 >= this.f2x && this.princessy <= this.f2y && this.princessy + 32 >= this.f2y) {if (this.f2 == 1) {lives--; this.f2 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f3x && this.princessx + 32 >= this.f3x && this.princessy <= this.f3y && this.princessy + 32 >= this.f3y) {if (this.f3 == 1) {lives--; this.f3 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f4x && this.princessx + 32 >= this.f4x && this.princessy <= this.f4y && this.princessy + 32 >= this.f4y) {if (this.f4 == 1) {lives--; this.f4 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f5x && this.princessx + 32 >= this.f5x && this.princessy <= this.f5y && this.princessy + 32 >= this.f5y) {if (this.f5 == 1) {lives--; this.f5 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f6x && this.princessx + 32 >= this.f6x && this.princessy <= this.f6y && this.princessy + 32 >= this.f6y) {if (this.f6 == 1) {lives--; this.f6 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f7x && this.princessx + 32 >= this.f7x && this.princessy <= this.f7y && this.princessy + 32 >= this.f7y) {if (this.f7 == 1) {lives--; this.f7 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f8x && this.princessx + 32 >= this.f8x && this.princessy <= this.f8y && this.princessy + 32 >= this.f8y) {if (this.f8 == 1) {lives--; this.f8 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f9x && this.princessx + 32 >= this.f9x && this.princessy <= this.f9y && this.princessy + 32 >= this.f9y) {if (this.f9 == 1) {lives--; this.f9 = 0}; ig.system.setGame(Level2Info);}
			else if (this.princessx <= this.f11x && this.princessx + 32 >= this.f11x && this.princessy <= this.f11y && this.princessy + 32 >= this.f11y) {if (this.f11 == 1) {lives--; this.f11 = 0}; ig.system.setGame(Level2Info);}

			if (this.f1 == 0) {this.f1 = 1; this.f1y = 0};
			if (this.f2 == 0) {this.f2 = 1; this.f2y = 0};
			if (this.f3 == 0) {this.f3 = 1; this.f3y = 600};
		  if (this.f4 == 0) {this.f4 = 1; this.f4y = 0};
			if (this.f5 == 0) {this.f5 = 1; this.f5y = 0};
			if (this.f6 == 0) {this.f6 = 1; this.f6y = 0};
			if (this.f7 == 0) {this.f7 = 1; this.f7y = 0};
			if (this.f8 == 0) {this.f8 = 1; this.f8y = 600};
			if (this.f9 == 0) {this.f9 = 1; this.f9y = 600};
			if (this.f11 == 0) {this.f11 = 1; this.f11y = 600};

			this.direction = 4;
			this.princessx += 20;
			if (this.image < 4)
				this.image ++;
			else {
				this.image = 0;
			}
		}
	},

	draw: function() {
		this.Water.draw(0,0);
		this.instructText.draw( 'LIVES: ' + lives, 10, 10);
		this.instructText.draw( 'KEYS LEFT: ' + this.keysLeft, 450, 10);

		if (this.k1 == 1)	this.Key.draw(this.x1,this.y1);
		if (this.k2 == 1) this.Key.draw(this.x2,this.y2);
		if (this.k3 == 1) this.Key.draw(this.x3,this.y3);
		if (this.k4 == 1) this.Key.draw(this.x4,this.y4);
		if (this.k5 == 1) this.Key.draw(this.x5,this.y5);
		if (this.k6 == 1) this.Key.draw(this.x6,this.y6);
		if (this.k7 == 1) this.Key.draw(this.x7,this.y7);
		if (this.k8 == 1) this.Key.draw(this.x8,this.y8);
		if (this.k9 == 1) this.Key.draw(this.x9,this.y9);
		if (this.k10 == 1) this.Key.draw(this.x10, this.y10);

		if (this.f1 == 1) this.fish.draw(this.f1x, this.f1y);
		if (this.f2 == 1) this.fish.draw(this.f2x, this.f2y);
		if (this.f3 == 1) this.fishUp.draw(this.f3x, this.f3y);
		if (this.f4 == 1) this.fish.draw(this.f4x, this.f4y);
		if (this.f5 == 1) this.fish.draw(this.f5x, this.f5y);
		if (this.f6 == 1) this.fish.draw(this.f6x, this.f6y);
		if (this.f7 == 1) this.fish.draw(this.f7x, this.f7y);
		if (this.f8 == 1) this.fishUp.draw(this.f8x, this.f8y);
		if (this.f9 == 1) this.fishUp.draw(this.f9x, this.f9y);
		if (this.f11 == 1) this.fishUp.draw(this.f11x, this.f11y);

		if (this.direction == 1 && this.image == 0) this.U1.draw(this.princessx, this.princessy);
		else if (this.direction == 2 && this.image == 0) this.D1.draw(this.princessx, this.princessy);
		else if (this.direction == 3 && this.image == 0) this.L1.draw(this.princessx, this.princessy);
		else if (this.direction == 4 && this.image == 0) this.R1.draw(this.princessx, this.princessy);
		else if (this.direction == 1 && this.image == 1) this.U2.draw(this.princessx, this.princessy);
		else if (this.direction == 2 && this.image == 1) this.D2.draw(this.princessx, this.princessy);
		else if (this.direction == 3 && this.image == 1) this.L2.draw(this.princessx, this.princessy);
		else if (this.direction == 4 && this.image == 1) this.R2.draw(this.princessx, this.princessy);
		else if (this.direction == 1 && this.image == 2) this.U3.draw(this.princessx, this.princessy);
		else if (this.direction == 2 && this.image == 2) this.D3.draw(this.princessx, this.princessy);
		else if (this.direction == 3 && this.image == 2) this.L3.draw(this.princessx, this.princessy);
		else if (this.direction == 4 && this.image == 2) this.R3.draw(this.princessx, this.princessy);
		else if (this.direction == 1 && this.image == 3) this.U4.draw(this.princessx, this.princessy);
		else if (this.direction == 2 && this.image == 3) this.D4.draw(this.princessx, this.princessy);
		else if (this.direction == 3 && this.image == 3) this.L4.draw(this.princessx, this.princessy);
		else if (this.direction == 4 && this.image == 3) this.R4.draw(this.princessx, this.princessy);
		else if (this.direction == 1 && this.image == 4) this.U1.draw(this.princessx, this.princessy);
		else if (this.direction == 2 && this.image == 4) this.D1.draw(this.princessx, this.princessy);
		else if (this.direction == 3 && this.image == 4) this.L1.draw(this.princessx, this.princessy);
		else if (this.direction == 4 && this.image == 4) this.R1.draw(this.princessx, this.princessy);
	}

});

Level2Info = ig.Game.extend({
	TowerLake: new ig.Image( 'media/TowerLake' ),
	text: new ig.Font('media/font3'),
	instructText: new ig.Font( 'media/font.png' ),

	init: function() {
		ig.input.bind(ig.KEY.SPACE, 'continue');
	},

	update: function() {
		if (ig.input.pressed( 'continue')) {
			ig.system.setGame(Level2);
		}
		this.parent();
	},

	draw: function() {
		this.TowerLake.draw(0,0);
		this.text.draw("The princess escaped", 301, 55, ig.Font.ALIGN.CENTER);
		this.text.draw("from the tower!", 301, 70, ig.Font.ALIGN.CENTER);
		this.text.draw("Swim through the lake ", 301, 85, ig.Font.ALIGN.CENTER);
		this.text.draw("and collect all the keys.", 301, 100, ig.Font.ALIGN.CENTER);
		this.text.draw("You'll use them later when you", 301, 115, ig.Font.ALIGN.CENTER);
		this.text.draw("find your prince!", 301, 130, ig.Font.ALIGN.CENTER);
		this.text.draw("But don't touch any fish!", 301, 145, ig.Font.ALIGN.CENTER);
		this.text.draw("Left Punch: A    Right Punch: S", 301, 160, ig.Font.ALIGN.CENTER);
		this.instructText.draw("Press Spacebar to play", 301, 185, ig.Font.ALIGN.CENTER);
	}
});

GameOver = ig.Game.extend({
	back: new ig.Image( 'media/gameOver.png' ),
	fairy: new ig.Image( 'media/SadFairy.png'),
	instructText: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image('media/Start.png'),

	init: function() {
		ig.input.bind( ig.KEY.SPACE, 'start');
	},

	update: function() {
		if (ig.input.pressed ('start')){
			ig.system.setGame(StartScreen)
		}
		this.parent();
	},

  draw: function() {
		this.parent();
		this.back.draw(150, 30);
		this.fairy.draw(195, 300);
	}
});

Level1 = ig.Game.extend({
	x: 200, y: 0,
	image: 0,
	r: 0, l: 0,
	levelTime: 0,
	r1x: -30, r1y: 100, r1: 1, imager1: 0, //right bird 1
	l1x: 570, l1y: 0, l1: 1, imagel1: 0, //left bird1
	r2x: -30, r2y: 300, r2: 1, imager2: 0, //right bird 2
	l2x: 570, l2y: 200, l2: 1, imagel2: 0, //left bird 2
	r3x: -30, r3y: 550, r3: 1, imager3: 0,//right bird 3
	l3x: 570, l3y: 400, l3: 1, imagel3: 0,//left bird 3

	background: new ig.Image( 'media/Start.png' ),
	instructText: new ig.Font( 'media/font.png' ),
	sky: new ig.Image( 'media/Sky.png' ),
	tower: new ig.Image( 'media/Tower.png'),
	backL: new ig.Image( 'media/BackL.png'), backM: new ig.Image( 'media/BackM.png'), backR: new ig.Image( 'media/BackR.png'),
	rightPunch: new ig.Image('media/rightPunch.png'), leftPunch: new ig.Image('media/leftPunch.png'),
	left1: new ig.Image('media/Left1.png'), left2: new ig.Image('media/Left2.png'), left3: new ig.Image('media/Left3.png'),
	right1: new ig.Image('media/Right1.png'), right2: new ig.Image('media/Right2.png'), right3: new ig.Image('media/Right3.png'),

	init: function() {
		levelTime = new ig.Timer();
		this.parallax = new Parallax();
		this.parallax.add('media/Sky2.png', {distance: 5, y: 0});
		this.parallax.add('media/Clouds.png', {distance: 4, y: 0});
		this.parallax.add('media/Tower.png', {distance: 1, y: 0});

		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.SPACE, 'continue');
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.A, 'leftP');
		ig.input.bind(ig.KEY.S, 'rightP');
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parallax.move(50);
		this.parent();

		if (lives == 0) ig.system.setGame(GameOver);

		playTimer = levelTime.delta();

		if (this.image != 4 && this.image != 3) {
			if (this.r1 != 0) {
				if (this.r1x >= this.x + 50 && this.r1x <= this.x + 64 && this.r1y >= this.y && this.r1y <= this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.r2 != 0) {
				if (this.r2x >= this.x + 50 && this.r2x <= this.x + 64 && this.r2y >= this.y && this.r2y <= this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.r3 != 0) {
				if (this.r3x >= this.x + 50 && this.r3x <= this.x + 64 && this.r3y >= this.y && this.r3y <= this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.l1 != 0) {
				if (this.l1x <= this.x + 100 && this.l1x >= this.x && this.l1y + 12 >= this.y && this.l1y + 12 < this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.l2 != 0) {
				if (this.l2x <= this.x + 100 && this.l2x >= this.x && this.l2y + 12 >= this.y && this.l2y + 12 < this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.l3 != 0) {
				if (this.l3x <= this.x + 100 && this.l3x >= this.x && this.l3y + 12 >= this.y && this.l3y + 12 < this.y + 200) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
		}

		if (this.image == 4) {
			if (this.r1 != 0) {
				if (this.r1x >= this.x && this.r1x <= this.x + 13 && this.r1y+12 >= this.y + 15 && this.r1y <= this.y + 64) {
					this.r1 = 0;
					kills++;
				}
				if (this.r1x >= this.x + 50 && this.r1x <= this.x + 64 && this.r1y >= this.y && this.r1y <= this.y + 100) {lives--; ig.system.setGame(Level1Info)};
			}
			if (this.r2 != 0) {
				if (this.r2x >= this.x && this.r2x <= this.x + 13 && this.r2y+12 >= this.y + 15 && this.r2y <= this.y + 64) {
					this.r2 = 0;
					kills++;
				}
				if (this.r2x >= this.x + 50 && this.r2x <= this.x + 64 && this.r2y >= this.y && this.r2y <= this.y + 100) {lives--; ig.system.setGame(Level1Info)};
			}
			if (this.r3 != 0) {
				if (this.r3x >= this.x && this.r3x <= this.x + 13 && this.r3y+12 >= this.y + 15 && this.r3y <= this.y + 64) {
					this.r3 = 0;
					kills++;
				}
				if (this.r3x >= this.x + 50 && this.r3x <= this.x + 64 && this.r3y >= this.y && this.r3y <= this.y + 100) {lives--; ig.system.setGame(Level1Info)};
			}
		}

		if (this.image == 3) {
			if (this.l1 != 0) {
				if (this.l1x <= this.x + 150 && this.l1x >= this.x && this.l1y + 12 >= this.y + 15 && this.l1y <= this.y + 64) {
					this.l1 = 0;
					kills++;
				}
				if (this.l1x <= this.x + 100 && this.l1x >= this.x && this.l1y + 12 >= this.y && this.l1y + 12 < this.y + 100) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.l2 != 0) {
				if (this.l2x <= this.x + 150 && this.l2x >= this.x && this.l2y + 12 >= this.y + 15 && this.l2y <= this.y + 64) {
					this.l2 = 0;
					kills++;
				}
				if (this.l2x <= this.x + 100 && this.l2x >= this.x && this.l2y + 12 >= this.y && this.l2y + 12 < this.y + 100) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
			if (this.l3 != 0) {
				if (this.l3x <= this.x + 150 && this.l3x >= this.x && this.l3y + 12 >= this.y + 15 && this.l3y <= this.y + 64) {
					this.l3 = 0;
					kills++;
				}
				if (this.l3x <= this.x + 100 && this.l3x >= this.x && this.l3y + 12 >= this.y && this.l3y + 12 < this.y + 100) {
					lives--;
					if (lives == 0) ig.system.setGame(GameOver);
					else ig.system.setGame(Level1Info);
				}
			}
		}

		this.r1x += 2;
		if (this.r1x >= 600) {this.r1x = -30; if (this.r1 == 0) this.r1 = 1};
		if (this.r1x >= 500) this.imager1 = 2;
		else if (this.r1x >= 400) this.imager1 = 1;
		else if (this.r1x >= 300) this.imager1 = 0;
		else if (this.r1x >= 200) this.imager1 = 2;
		else if (this.r1x >= 100) this.imager1 = 1;
		else this.imager1 = 0;

		this.r2x += 2.5;
		if (this.r2x >= 600) {this.r2x = -30; if (this.r2 == 0) this.r2 = 1};
		if (this.r2x >= 500) this.imager2 = 2;
		else if (this.r2x >= 400) this.imager2 = 1;
		else if (this.r2x >= 300) this.imager2 = 0;
		else if (this.r2x >= 200) this.imager2 = 2;
		else if (this.r2x >= 100) this.imager2 = 1;
		else this.imager2 = 0;

		this.r3x += 1;
		if (this.r3x >= 600) {this.r3x = -30; if (this.r3 == 0) this.r3 = 1};
		if (this.r3x >= 500) this.imager3 = 2;
		else if (this.r3x >= 400) this.imager3 = 1;
		else if (this.r3x >= 300) this.imager3 = 0;
		else if (this.r3x >= 200) this.imager3 = 2;
		else if (this.r3x >= 100) this.imager3 = 1;
		else this.imager3 = 0;

		this.l1x -= 2.5;
		if (this.l1x <= -30) {this.l1x = 570; if (this.l1 == 0) this.l1 = 1};
		if (this.l1x >= 500) this.imagel1 = 2;
		else if (this.l1x >= 400) this.imagel1 = 1;
		else if (this.l1x >= 300) this.imagel1 = 0;
		else if (this.l1x >= 200) this.imagel1 = 2;
		else if (this.l1x >= 100) this.imagel1 = 1;
		else this.imagel1 = 0;

		this.l2x -= 1;
		if (this.l2x <= -30) {this.l2x = 570; if (this.l2 == 0) this.l2 = 1};
		if (this.l2x >= 500) this.imagel2 = 2;
		else if (this.l2x >= 400) this.imagel2 = 1;
		else if (this.l2x >= 300) this.imagel2 = 0;
		else if (this.l2x >= 200) this.imagel2 = 2;
		else if (this.l2x >= 100) this.imagel2 = 1;
		else this.imagel2 = 0;

		this.l3x -= 2;
		if (this.l3x <= -30) {this.l3x = 570; if (this.l3 == 0) this.l3 = 1};
		if (this.l3x >= 500) this.imagel3 = 2;
		else if (this.l3x >= 400) this.imagel3 = 1;
		else if (this.l3x >= 300) this.imagel3 = 0;
		else if (this.l3x >= 200) this.imagel3 = 2;
		else if (this.l3x >= 100) this.imagel3 = 1;
		else this.imagel3 = 0;

		if (playTimer >= 20.0) ig.system.setGame(Level2Info);

		if (ig.input.pressed('rightP')) { this.r = 1; this.image = 3;}

		if (ig.input.pressed('leftP')) { this.l = 1; this.image = 4;}

		if (ig.input.pressed('up')) {
			if (this.y > 20) {
				this.y = this.y - 30;
				if (this.image < 2)
					this.image ++;
				else
					this.image = 0;
			}
		}

		if (ig.input.pressed('down')) {
			if (this.y < 430) {
				this.y = this.y + 30;
				if (this.image < 2)
					this.image ++;
				else
					this.image = 0;
			}
		}

		if (ig.input.pressed('left')) {
			if (this.x > 85) {
				this.x = this.x - 30;
				if (this.image < 2)
					this.image ++;
				else
					this.image = 0;
			}
			else {
				lives --;
				if (lives == 0)
					ig.system.setGame(GameOver);
				else
					ig.system.setGame(Level1Info);
			}
		}

	  if (ig.input.pressed('right')) {
			if (this.x < 305) {
				this.x = this.x + 20;
				if (this.image < 2)
					this.image ++;
				else
					this.image = 0;
			}
			else {
				lives --;
				if (lives == 0)
					ig.system.setGame(GameOver);
				else
					ig.system.setGame(Level1Info);
			}
		}
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parallax.draw();

		if (this.image == 0) this.backL.draw(this.x, this.y);
		else if (this.image == 1) this.backM.draw(this.x, this.y);
		else if (this.image == 2) this.backR.draw(this.x, this.y);
		else if (this.image == 3) this.rightPunch.draw(this.x, this.y);
		else this.leftPunch.draw(this.x, this.y);

		if (this.r1 == 1) {
			if (this.imager1 == 0) this.right1.draw(this.r1x, this.r1y);
			else if (this.imager1 == 1) this.right2.draw(this.r1x, this.r1y);
			else this.right3.draw(this.r1x, this.r1y);
		}
		if (this.r2 == 1) {
			if (this.imager2 == 0) this.right1.draw(this.r2x, this.r2y);
			else if (this.imager2 == 1) this.right2.draw(this.r2x, this.r2y);
			else this.right3.draw(this.r2x, this.r2y);
		}
		if (this.r3 == 1) {
			if (this.imager3 == 0) this.right1.draw(this.r3x, this.r3y);
			else if (this.imager3 == 1) this.right2.draw(this.r3x, this.r3y);
			else this.right3.draw(this.r3x, this.r3y);
		}
		if (this.l1 == 1) {
			if (this.imagel1 == 0) this.left1.draw(this.l1x, this.l1y);
			else if (this.imagel1 == 1) this.left2.draw(this.l1x, this.l1y);
			else this.left3.draw(this.l1x, this.l1y);
	  }
		if (this.l2 == 1) {
			if (this.imagel2 == 0) this.left1.draw(this.l2x, this.l2y);
			else if (this.imagel2 == 1) this.left2.draw(this.l2x, this.l2y);
			else this.left3.draw(this.l2x, this.l2y);
	  }
		if (this.l3 == 1) {
			if (this.imagel3 == 0) this.left1.draw(this.l3x, this.l3y);
			else if (this.imagel3 == 1) this.left2.draw(this.l3x, this.l3y);
			else this.left3.draw(this.l3x, this.l3y);
		}
		this.instructText.draw( 'LIVES: ' + lives, 10, 10);
		this.instructText.draw( 'KILLS: ' + kills, 10, 30);
	}
});

Level1Info = ig.Game.extend({
	background: new ig.Image('media/TowerWindow.png'),
	instructText: new ig.Font( 'media/font.png' ),
	text: new ig.Font('media/font1.png'),
	showStats: false,
	levelTimer: new ig.Timer(),
	levelExit: null,
	stats: {time: 0, kills: 0},

	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.SPACE, 'continue');
		this.x = 200;
		this.y = 20;
	},

	loadLevel: function( data ) {
		this.parent(data);
		this.levelTimer.reset();
	},

	toggleStats: function(levelExit){
		this.showStats = true;
		this.stats.time = Math.round(this.levelTime.delta());
		this.levelExit = levelExit;
	},

	update: function() {
		// Update all entities and backgroundMaps
		if (ig.input.pressed ('continue')){
			ig.system.setGame(Level1);
		}
		this.parent();
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		this.background.draw(0,0);
		this.text.draw('Help the princess escape from her tower!', 300, 345, ig.Font.ALIGN.CENTER);
		this.text.draw('Avoid or punch the birds,', 300, 380, ig.Font.ALIGN.CENTER);
		this.text.draw('and stay on the bricks!', 300, 415, ig.Font.ALIGN.CENTER);
		this.text.draw('Left Punch: A    Right Punch: S', 300, 450, ig.Font.ALIGN.CENTER);
		this.text.draw('Lives: ' + lives, 300, 490, ig.Font.ALIGN.CENTER);
		this.instructText.draw( 'Press Spacebar To Play', 300, 520, ig.Font.ALIGN.CENTER );
	}
});

StartScreen = ig.Game.extend({
	mainCharacter: new ig.Image( 'media/Fairy.png' ),
	text: new ig.Image( 'media/image.png' ),
	instructText: new ig.Font( 'media/font.png' ),
	background: new ig.Image('media/Start.png'),

	init: function() {
		ig.input.bind( ig.KEY.SPACE, 'start');
		lives = 5;
		kills = 0;
	},

	update: function() {
		if (ig.input.pressed ('start')){
			ig.system.setGame(Level1Info)
		}
		this.parent();
	},

	draw: function() {
		this.parent();
		this.background.draw(0,0);
		this.instructText.draw("THE PRINCESS TO THE FROG", 145,50);
		this.mainCharacter.draw(195,120);
		var x = ig.system.width/2,
		y = ig.system.height - 50;
		this.instructText.draw( 'Press Spacebar To Start', x, y, ig.Font.ALIGN.CENTER );

	}
});

// Start the Game with 60fps, a resolution of 600x600
new ig.Image('media/Sky.png');
new ig.Image('media/Tower.png');
new ig.Image('media/Grass.png');
new ig.Image('media/Sky2.png');
new ig.Image('media/Clouds.png');
var lives = 5;
var kills = 0;
ig.main( '#canvas', StartScreen, 60, 600, 600, 1 );
});
