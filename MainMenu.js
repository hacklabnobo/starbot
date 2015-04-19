
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {
  init: function (score) {
    this.score = score;
  },

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.add.sprite(0, 0, 'titlepage');

    var message;
    var fontSize;

    if (this.score) {
      message = "You got " + this.score + " meteorites!";
      fontSize = 50;
    } else {
      this.music = this.sound.add('music',1.5,true);
      this.music.play();
      message = "☆ Starbot ☆";
      fontSize = 80;
    }

    var scoreDisplay = this.add.text(0, 100, message, {fill: 'white', fontSize: fontSize});
    var spareRoom = this.world.width - scoreDisplay.width;
    scoreDisplay.x = spareRoom / 2;

		this.playButton = this.add.button(260, 250, 'playButton', this.startGame, this);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game');

	}

};
