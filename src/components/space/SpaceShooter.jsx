import Phaser from "phaser";
import { useState, useEffect } from "react";
import Game from "./game";
import { GameOver } from "./gameOver";
import { GameOverNivel2 } from "./gameOverNivel2";
import { Menu } from "./Menu";
import { MenuNiveles } from "./MenuNiveles";
import NextLevel from "./NextLevel";
import Nivel2 from "./Nivel2";
import { Win } from "./Win";

//TODO Cambiar Nombre
function SpaceShooter() {
  const [listo, setListo] = useState(false);

  useEffect(() => {

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-phaser',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      autoCenter: Phaser.Scale.CENTER_BOTH,
      scene: [Menu, MenuNiveles, Game, GameOver, GameOverNivel2, Win, Nivel2, NextLevel],
      pixelArt: true,
      audio: {
        disableWebAudio: true
      }
    };

    const game = new Phaser.Game(config);

    game.events.on("LISTO", setListo);

    return () => {
      setListo(false);
      game.destroy(true);
    }
  }, [listo])

  return (
    <div id="game-phaser"></div>
  );
}

export default SpaceShooter;