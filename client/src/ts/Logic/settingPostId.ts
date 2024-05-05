import { PostInfo } from "../interface";
import { currentPostClick } from "../storeData";

export default function settingCurrentPost(e: string): void {
  const element: PostInfo = JSON.parse(decodeURIComponent(e));
  currentPostClick.value = element;
};
