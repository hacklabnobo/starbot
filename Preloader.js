
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(120, 215, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'images/preloader_background.jpg');
		this.load.image('gameBackground', 'images/preloader_background.jpg');
		this.load.image('playButton', 'images/play_button.png');
		this.load.spritesheet('guy', 'images/guy.png', 32, 32);
		this.load.spritesheet('fireball', 'images/fireball.png', 10, 14);
    this.load.image('groundMid', 'images/ground_mid.png');
    this.load.image('groundLeft', 'images/ground_leftend.png');
    this.load.image('groundRight', 'images/ground_rightend.png');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
    this.state.start('MainMenu');

	}

};
