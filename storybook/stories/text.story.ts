import * as Phaser from "phaser";
import { IStory } from "../interfaces";

export const textStory: IStory = {
  title: "Text",
  run: async (scene: Phaser.Scene) => {
    const text = scene.add
      .text(40, 40, "Hello Storybook", {
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "32px",
      })
      .setShadow(2, 2, "#000000", 4);

    return () => {
      text.destroy();
    };
  },
};
