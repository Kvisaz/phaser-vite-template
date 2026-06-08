import * as Phaser from "phaser";

export type GameObject =
  | Phaser.GameObjects.Container
  | Phaser.GameObjects.Image
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.RenderTexture
  | Phaser.GameObjects.Shape
  | Phaser.GameObjects.TileSprite;

export interface IStory {
  title: string;
  /**
   * Запускает story на сцене и возвращает функцию очистки созданных объектов.
   */
  run: (scene: Phaser.Scene) => Promise<() => void>;
}

export interface IStoryListItem extends Partial<IStory> {
  title: string;
  template?: "titleDelimiter";
  run?: (scene: Phaser.Scene) => Promise<() => void>;
}

export const storyTitle = (title: string): IStoryListItem => ({ title, template: "titleDelimiter" });
