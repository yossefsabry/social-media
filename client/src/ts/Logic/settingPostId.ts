import { PostInfo } from "../interface";
import { currentPostClick } from "../storeData";

export default function settingCurrentPost(e: string): void {
  console.log("welcome");
  const element: PostInfo = JSON.parse(decodeURIComponent(e));
  currentPostClick.value = element;
  console.log(currentPostClick.value);
};
