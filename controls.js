const MARIO_ANIMS = {
  grown: {
    idle: "mario-grown-idle",
    walk: "mario-grown-walk",
    jump: "mario-grown-jump",
  },
  normal: {
    idle: "mario-idle",
    walk: "mario-walk",
    jump: "mario-jump",
  },
};

export const initControls = (game) => {
  const mario = game.mario;
  const keys = game.keys;

  const isMarioTouchingDown = mario.body.touching.down;

  const isLeftDown = keys.left.isDown;
  const isRightDown = keys.right.isDown;
  const isUpDown = keys.up.isDown;

  if (mario.isDead) return;
  if (mario.isBlocked) return;

  const marionAnims = mario.isGrown ? MARIO_ANIMS.grown : MARIO_ANIMS.normal;

  if (isLeftDown) {
    if (isMarioTouchingDown) mario.anims.play(marionAnims.walk, true);
    mario.setVelocityX(-100);
    //mario.x -= 1;
    mario.flipX = true;
  } else if (isRightDown) {
    if (isMarioTouchingDown) mario.anims.play(marionAnims.walk, true);
    mario.setVelocityX(100);
    //mario.x += 1;
    mario.flipX = false;
  } else {
    if (isMarioTouchingDown) {
      mario.anims.play(marionAnims.idle, true);
      mario.setVelocityX(0);
    }
  }

  if (isUpDown && isMarioTouchingDown) {
    mario.setVelocityY(-250);
    mario.anims.play(marionAnims.jump, true);
  }
};
