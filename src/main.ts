import * as Phaser from "phaser";
import * as packageInfo from '../package.json';
import { MainScene } from "./scenes/MainScene";

console.log(`${packageInfo.name} ${packageInfo.version} starting...`);
console.log(`${packageInfo.description}`);
console.log('...................');

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 200 }
    }
  },
  scene: [MainScene]
};

new Phaser.Game(config);
