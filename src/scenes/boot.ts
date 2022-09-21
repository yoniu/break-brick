export class BootScene extends Phaser.Scene {

  private textLable: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{}
  private playButton: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{}

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    this.textLable = this.add.text(400, 300, '资源加载中...').setOrigin(0.5, 0.5)
    this.load.setPath('assets')
    this.load.atlas("assets", "breakout.png", "breakout.json")
    this.load.once('complete', () => {
      // this.textLable.destroy()
      // this.playButton = this.add.image(400, 300, 'assets', 'button').setOrigin(0.5, 0.5).on('pointerover', () => {
      //   console.log(1)
      //   this.playButton.setData({
      //     frames: 'buttonOver'
      //   })
      // })
      // this.playButton.addListener('pointerover', () => {
      //   console.log(1)
      //   this.playButton.setData({
      //     frames: 'buttonOver'
      //   })
      // })
      this.scene.start('PlayScene')
    })
  }

  create(): void {
  }
  
}
