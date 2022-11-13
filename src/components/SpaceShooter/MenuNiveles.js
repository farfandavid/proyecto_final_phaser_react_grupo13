import Phaser from "phaser";

export class MenuNiveles extends Phaser.Scene {

  constructor() {
    super({ key: 'menuNiveles' });
  }

  preload() {
    this.load.image('fondo', 'assets/spaceInvader/background/background.png');
    this.load.image('nivel_1', 'assets/spaceInvader/background/Nivel1.png');
    this.load.image('nivel_2', 'assets/spaceInvader/background/Nivel1.png');
  }

  create() {
    this.add.image(400, 300, 'fondo');

    var nivel_1 = this.add.sprite(400, 140, "nivel_1").setInteractive();
    nivel_1.setScale(0.3, 0.3);

    var nivel_2 = this.add.sprite(400, 400, "nivel_2").setInteractive();
    nivel_2.setScale(0.3, 0.3);

    nivel_1.on('pointerdown', function () {
      cargarEscena('Game')
    })

    nivel_2.on('pointerdown', function () {
      cargarEscena('nivel2')
    })


    const cargarEscena = (escena) => {
      this.scene.start(escena)
    }
  }
}