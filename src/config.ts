import { BootScene } from './scenes/boot';
import { PlayScene } from './scenes/play';
export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Breakout',
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: "mygame",
  physics: {
      default: 'arcade'
  },
  backgroundColor: '#4488aa',
  scene: [BootScene,PlayScene]
};
