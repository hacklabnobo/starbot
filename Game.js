
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {
    addGround: function(x,y,length) {
        var start = x;

        for (var i = 0; i < length; i++) {
          var sprite;

          if (i == 0) {
            sprite = 'groundLeft';
          } else if (i == length - 1) {
            sprite = 'groundRight';
          } else {
            sprite = 'groundMid';
          }

          var g = this.ground.create(start, y, sprite);
          g.body.immovable = true;
          start = start + 64;
        }
    },

    updateScoreDisplay: function() {
      this.scoreDisplay.text = "" + this.score;
    },

    addFireball: function() {
      var maxX = this.world.width - 12;
      var x = maxX * Math.random();
      var fireball = this.fireballs.create(x,-14, 'fireball');

      fireball.body.velocity.y = 100;
      fireball.animations.add('smolder',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],12,true);
      fireball.animations.play('smolder');
    },

    removeFireball: function(fireball) {
      this.fireballs.remove(fireball, true);
    },

    catchFireball: function(guy, fireball) {
      this.beep.play();
      this.removeFireball(fireball);
      this.score = this.score + 1;
      this.updateScoreDisplay();
    },

    decrementTime: function() {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 1;
        this.timerDisplay.text = "" + this.timeLeft;
      } else {
        this.quitGame();
      }
    },

    create: function () {
        this.score = 0;
        this.timeLeft = 120;

        this.beep = this.sound.add('beep',0.3);
        this.add.sprite(0, 0, 'gameBackground');
        this.guy = this.add.sprite(400, 64, 'guy');
        this.ground = this.add.group();
        this.ground.enableBody = true;
        this.physics.arcade.enable(this.guy);
        this.guy.body.gravity.y = 1000;
        this.guy.body.collideWorldBounds = true;
        this.guy.animations.add('left',[0,1,2,3],4,true);
        this.guy.animations.add('right',[5,6,7,8],4,true);
        this.fireballs = this.add.group();
        this.fireballs.enableBody = true;

        this.timer = this.time.create();
        this.timer.loop(1000, this.addFireball, this);
        this.timer.loop(1000, this.decrementTime, this);
        this.timer.start();

        this.addGround(400,112,3);
        this.addGround(50,192,3);
        this.addGround(150,312,5);
        this.addGround(-10,this.world.height - 30,11)
        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreDisplay = this.add.text(5,5,"",{fill: 'white'});
        this.timerDisplay = this.add.text(5,30,"" + this.timeLeft,{fill: 'white'});
        this.updateScoreDisplay();
    },

    update: function () {
        this.physics.arcade.collide(this.guy, this.ground);
        this.physics.arcade.overlap(this.guy, this.fireballs, this.catchFireball, null, this);

        if (this.guy.body.touching.down) {
          if (this.cursors.left.isDown) {
            this.guy.body.velocity.x = -250;
            this.guy.animations.play('left');
          } else if (this.cursors.right.isDown) {
            this.guy.body.velocity.x = 250;
            this.guy.animations.play('right');
          } else {
            this.guy.body.velocity.x = 0;
            this.guy.frame = 4;
          }

          if (this.cursors.up.isDown) {
            this.guy.body.velocity.y = -600;
          }
        }

        var fireballs = this.fireballs.children.slice(0);

        for (var i = 0; i < fireballs.length; i++) {
          var ball = fireballs[i];
          if (!ball.inCamera) {
            this.removeFireball(ball);
          }
        }
    },

    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu', true, false, this.score);

    }

};
