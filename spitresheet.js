const SPRITESHEETS = [
  {
    key: "mario",
    path: "assets/entities/mario.png",
    frameWidth: 18,
    frameHeight: 16,
  },
  {
    key: "goomba",
    path: "assets/entities/overworld/goomba.png",
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "coin",
    path: "assets/collectibles/coin.png",
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "mario-grown",
    path: "assets/entities/mario-grown.png",
    frameWidth: 18,
    frameHeight: 32,
  },
  {
    key: "block",
    path: "assets/blocks/overworld/block.png",
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    key: "normal-mistery-block",
    path: "assets/blocks/overworld/misteryBlock.png",
    frameWidth: 16,
    frameHeight: 16,
  },
];

export const initSpriteSheet = (game) => {
  SPRITESHEETS.forEach(({ key, path, frameWidth, frameHeight }) => {
    game.load.spritesheet(key, path, { frameWidth, frameHeight });
  });
};
