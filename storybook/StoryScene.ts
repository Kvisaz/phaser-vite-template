import * as Phaser from "phaser";

export class StoryScene extends Phaser.Scene {
  /** Подготавливает сцену storybook после завершения preload. */
  create(): void {
    console.log("Story Scene created...");
  }
}
