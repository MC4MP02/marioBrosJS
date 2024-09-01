const IMAGES = [
  {
    key: "cloud1",
    path: "assets/scenery/overworld/cloud1.png",
  },
  {
    key: "cloud2",
    path: "assets/scenery/overworld/cloud2.png",
  },
  {
    key: "mountain2",
    path: "assets/scenery/overworld/mountain2.png",
  },
  {
    key: "bush1",
    path: "assets/scenery/overworld/bush1.png",
  },
  {
    key: "pipe1",
    path: "/assets/scenery/pipe1.png",
  },
  {
    key: "pipe2",
    path: "/assets/scenery/pipe2.png",
  },
  {
    key: "floorbricks",
    path: "/assets/scenery/overworld/floorbricks.png",
  },
  {
    key: "supermushroom",
    path: "/assets/collectibles/super-mushroom.png",
  },
];

/* this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");

this.load.image("cloud2", "assets/scenery/overworld/cloud2.png");

this.load.image("mountain2", "assets/scenery/overworld/mountain2.png");

this.load.image("bush1", "assets/scenery/overworld/bush1.png");

this.load.image("pipe1", "/assets/scenery/pipe1.png");

this.load.image("pipe2", "/assets/scenery/pipe2.png");

this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png");

this.load.image("supermushroom", "assets/collectibles/super-mushroom.png"); */

export const initImages = (game) => {
  IMAGES.forEach(({ key, path }) => {
    game.load.image(key, path);
  });
};
