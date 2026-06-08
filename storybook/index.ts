import * as Phaser from "phaser";
import { phaserGameConfig } from "../src/config";
import { IStory, IStoryListItem } from "./interfaces";
import { StoryScene } from "./StoryScene";
import { stories } from "./stories";

const baseScale = phaserGameConfig.scale as Phaser.Types.Core.ScaleConfig;

const config: Phaser.Types.Core.GameConfig = {
  ...phaserGameConfig,
  scale: {
    ...baseScale,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NONE,
    parent: "game",
  },
  scene: [new StoryScene(StoryScene.name)],
};

const game = new Phaser.Game(config);

const storiesEl = document.getElementById("stories");
if (storiesEl == null) throw new Error("no sidebar");
const titleEl = document.getElementById("gameTitle");

let prevStoryClose: (() => void) | undefined;

const runInGame = async (story: IStory, gameInstance: Phaser.Game): Promise<void> => {
  prevStoryClose?.();

  setSearchParam("title", story.title);
  titleEl!.innerHTML = story.title;
  const scene = gameInstance.scene.getScene(StoryScene.name);
  prevStoryClose = await story.run(scene);
};

let storiesIndex = 0;
stories.forEach((story) => {
  if (story.run != null) {
    const isStartIndex = storiesIndex === 0;
    const titleParam = getSearchParam("title");
    const isStart = titleParam != null ? titleParam === story.title : isStartIndex;
    addStory(story as IStory, storiesEl, isStart);
    storiesIndex += 1;
  } else if (story.template === "titleDelimiter") {
    addStoryDelimiter(story, storiesEl);
  }
});

function addStory(story: IStory, parent: HTMLElement, isStart: boolean): void {
  const el = addElement({
    storyTag: "button",
    innerHtml: story.title,
    className: "story",
    parent,
  });
  el.addEventListener("click", () => runInGame(story, game).catch(console.warn));

  if (isStart) {
    setTimeout(() => {
      el.focus();
      runInGame(story, game).catch(console.warn);
    }, 500);
  }
}

function addStoryDelimiter(story: IStoryListItem, parent: HTMLElement): void {
  addElement({
    storyTag: "div",
    innerHtml: story.title,
    className: "storyDelimiter",
    parent,
  });
}

interface IAddProps {
  storyTag: string;
  innerHtml: string;
  className: string;
  parent: HTMLElement;
}

function addElement({ storyTag, className, innerHtml, parent }: IAddProps): HTMLElement {
  const el = document.createElement(storyTag);
  el.innerHTML = innerHtml;
  el.classList.add(className);
  parent.append(el);
  return el;
}

function setSearchParam(param: string, value: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.replaceState({}, "", url.toString());
}

function getSearchParam(param: string): string | undefined {
  const paramValue = new URLSearchParams(window.location.search).get(param);
  return paramValue != null ? decodeURI(paramValue) : undefined;
}
