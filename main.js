import { createAnimations } from "./animations.js";
import { initSpriteSheet } from "./spitresheet.js";
import { initAudio, playAudio } from "./audio.js";
import { initControls } from "./controls.js";
import { initImages } from "./images.js";

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  autoFocus: false,
  backgroundColor: "#049cd8",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

function preload() {
  initImages(this);
  initSpriteSheet(this);
  initAudio(this);
}

function create() {
  createAnimations(this);

  this.add.image(300, 50, "cloud1").setOrigin(0, 0).setScale(0.15);

  this.add.image(100, 50, "cloud2").setOrigin(0, 0).setScale(0.15);

  this.add
    .image(0, config.height - 80, "mountain2")
    .setOrigin(0, 0)
    .setScale(0.7);

  this.add
    .image(250, config.height - 55, "bush1")
    .setOrigin(0, 0)
    .setScale(0.7);

  this.pipes = this.physics.add.staticGroup();
  this.pipes
    .create(300, config.height - 55, "pipe1")
    .setOrigin(0.5, 0.5)
    .setSize(32, 48)
    .setDisplaySize(32, 48)
    .refreshBody();

  this.blocks = this.physics.add.staticGroup();
  this.blocks
    .create(200, config.height - 96, "block")
    .setOrigin(0.5, 0.5)
    .refreshBody();

  this.blocks
    .create(216, config.height - 96, "normal-mistery-block")
    .setOrigin(0.5, 0.5)
    .refreshBody();

  this.blocks
    .create(232, config.height - 96, "block")
    .setOrigin(0.5, 0.5)
    .refreshBody();

  this.floor = this.physics.add.staticGroup();

  this.floor
    .create(0, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor
    .create(128, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor
    .create(256, config.height - 16, "floorbricks")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.mario = this.physics.add
    .sprite(50, 100, "mario")
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setSize(16, 16)
    .setDisplaySize(16, 16);

  this.enemy = this.physics.add
    .sprite(350, config.height - 30, "goomba")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setVelocityX(-50);

  this.enemy.anims.play("goomba-walk", true);

  this.collectibes = this.physics.add.staticGroup();
  this.collectibes.create(100, 150, "coin").anims.play("coin-idle", true);
  this.collectibes.create(150, 150, "coin").anims.play("coin-idle", true);
  this.collectibes.create(180, 150, "coin").anims.play("coin-idle", true);
  this.collectibes.create(300, 150, "coin").anims.play("coin-idle", true);
  this.collectibes
    .create(30, config.height - 40, "supermushroom")
    .anims.play("mushroom-idle", true);

  //collisiones pero sin que choque con mario y los coleccionables
  this.physics.add.overlap(
    this.mario,
    this.collectibes,
    collectItem,
    null,
    this
  );

  this.physics.world.setBounds(0, 0, 2000, config.height);
  this.physics.add.collider(this.mario, this.pipes);
  this.physics.add.collider(this.mario, this.blocks);
  this.physics.add.collider(this.mario, this.floor);
  this.physics.add.collider(this.enemy, this.floor);
  this.physics.add.collider(this.enemy, this.pipes);
  this.physics.add.collider(this.enemy, this.blocks);

  //onHitEnemy es una callback que se ejecuta cuando mario colisiona con el enemigo
  //null procesado de la colision
  //this es el contexto de la escena
  this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);

  this.cameras.main.setBounds(0, 0, 2000, config.height);
  this.cameras.main.startFollow(this.mario);

  this.keys = this.input.keyboard.createCursorKeys();
}

function collectItem(mario, item) {
  const key = item.texture.key;
  item.destroy();
  //podriamos hacer un diableBody(true, true) que seria como desactivarlo

  if (key === "coin") {
    playAudio("coin-pickup", 0.1, this);
    addToScore(100, item, this);
  } else if (key === "supermushroom") {
    this.physics.world.pause();
    this.anims.pauseAll();

    playAudio("powerup", 0.1, this);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      mario.anims.play(i % 2 === 0 ? "mario-grown-idle" : "mario-idle");
    }, 100);

    mario.isBlocked = true;
    mario.isGrown = true;

    setTimeout(() => {
      mario.setDisplaySize(18, 32);
      mario.body.setSize(18, 32);

      this.anims.resumeAll();
      mario.isBlocked = false;
      clearInterval(interval);
      this.physics.world.resume();
    }, 1000);
  }
}

function addToScore(scoreToAdd, origin, game) {
  const scoreText = game.add.text(origin.x, origin.y, scoreToAdd, {
    fontFamily: "pixel",
    fontSize: config.width / 40,
  });

  game.tweens.add({
    targets: scoreText,
    duration: 500,
    y: scoreText.y - 20,
    onComplete: () => {
      game.tweens.add({
        targets: scoreText,
        duration: 100,
        alpha: 0,
        onComplete: () => {
          scoreText.destroy();
        },
      });
    },
  });
}

function onHitEnemy(mario, enemy) {
  if (mario.body.touching.down && enemy.body.touching.up) {
    enemy.anims.play("goomba-dead", true);
    enemy.setVelocityX(0);
    mario.setVelocityY(-200);

    playAudio("goomba-stomp", 1, this);
    addToScore(200, mario, this);

    setTimeout(() => {
      enemy.destroy();
    }, 500);
  } else {
    killMario(this);
  }
}

function update() {
  initControls(this);

  if (this.mario.y >= config.height) {
    killMario(this);
  }
}

function killMario(game) {
  const mario = game.mario;
  const scene = game.scene;

  if (mario.isDead) return;

  mario.isDead = true;
  mario.anims.play("mario-dead");
  mario.setCollideWorldBounds(false);

  playAudio("gameover", 0.05, game);

  mario.body.checkCollision.none = true;
  mario.setVelocityX(0);

  setTimeout(() => {
    mario.setVelocityY(-250);
  }, 100);

  setTimeout(() => {
    scene.restart();
  }, 2000);
}
