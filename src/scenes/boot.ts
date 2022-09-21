export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    this.load.setPath('assets');
    this.load.atlas("assets", "breakout.png", "breakout.json");
  }

  update(): void {
    this.scene.start('PlayScene');
  }
  
}
