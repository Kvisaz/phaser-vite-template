import { IStoryListItem, storyTitle } from "./interfaces";
import { textStory } from "./stories/text.story";

export const stories: IStoryListItem[] = [
  storyTitle("Simple Components"),
  textStory,
];
