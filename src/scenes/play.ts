
export class PlayScene extends Phaser.Scene {
  private score = 0
  private bricks
  private scoreText?: Phaser.GameObjects.Text
  private ball!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private paddle!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  constructor() {
      super("PlayScene");
  }

  init(): void {
    this.score=0;
  }

  create(): void {
    this.physics.world.setBoundsCollision(true, true, true, false)
    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
      frameQuantity: 10,
      gridAlign: {
        width: 10, 
        height: 6,
        cellWidth: 64,
        cellHeight: 32,
        x: 112,
        y: 100
      }
    })
    this.scoreText = this.add.text(
      80, 30, 'Score:0', {
        fontFamily: 'Monaco, Courier, monospace',
        fontSize: '46px'
      }
    )
    this.ball = this.physics.add
      .image(400, 500, "assets", "ball1")
      .setCollideWorldBounds(true)
      .setBounce(1).setData("onPaddle", true);

    this.paddle = this.physics.add
      .image(400, 540, "assets", "paddle1")
      .setImmovable();
       //  Input events
        this.input.on("pointermove",
          (pointer) => {
            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            if (this.ball.getData("onPaddle")) 
              this.ball.x = this.paddle.x;
           },
          this
        );
    
        this.input.on(
          "pointerup", (pointer) => {
            if (this.ball.getData("onPaddle")) {
              this.ball.setVelocity(75, -300);
              this.ball.setData("onPaddle", false);
            }
          },
          this
        )
        this.physics.add.collider(
          this.ball,
          this.bricks,
          this.hitBrick,
          null,
          this
        );
        this.physics.add.collider(
          this.ball,
          this.paddle,
          this.hitPaddle,
          null,
          this
        );  
    
  }
  update(): void {
    if (this.ball.y > 600) {
      this.resetBall();
    }
  }

  resetBall() {
    this.score=0;
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 500);
    this.ball.setData("onPaddle", true);
  }

  resetLevel() {
    this.score=0;
    this.resetBall();
    this.bricks.children.each( (brick)=> {
      brick.enableBody(false, 0, 0, true, true);
      //reset, x, y, enableGameObject, showGameObject
    });
  }

  hitBrick(ball:Phaser.Types.Physics.Arcade.ImageWithDynamicBody,     brick:Phaser.Types.Physics.Arcade.ImageWithStaticBody) {
    this.score+=10;
    this.scoreText.setText('Score:'+this.score);
    brick.disableBody(true, true);
    
    if (this.bricks.countActive() === 0) {
      //this.resetLevel();
    }
  }
  hitPaddle(ball:Phaser.Types.Physics.Arcade.ImageWithDynamicBody, 
    paddle:Phaser.Types.Physics.Arcade.ImageWithDynamicBody) {
    let diff = 0;
    if (Math.abs(ball.x - paddle.x) > 2) {
      diff = ball.x - paddle.x;
      ball.setVelocityX(-10 * diff);
    } else {
      //  Add a little random X to stop it bouncing straight up!
      ball.setVelocityX(2 + Math.random() * 8);
    }
  }
  
}
