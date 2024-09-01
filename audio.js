const AUDIOS = [
  {
    key: "gameover",
    path: "assets/sound/music/gameover.mp3",
  },
  {
    key: "goomba-stomp",
    path: "assets/sound/effects/goomba-stomp.wav",
  },
  {
    key: "coin-pickup",
    path: "assets/sound/effects/coin.mp3",
  },
  {
    key: "powerup",
    path: "assets/sound/effects/consume-powerup.mp3",
  },
];

export const initAudio = (game) => {
  AUDIOS.forEach(({ key, path }) => {
    game.load.audio(key, path);
  });
};

export const playAudio = (id, volume, game) => {
  try {
    return game.sound.add(id, { volume: volume }).play();
  } catch (e) {
    console.error(e);
  }
};

//this.sound.add("gameover", { volume: 0.2 }).play();
