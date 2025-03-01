import { Dispatch, SetStateAction } from "react";
import { Tag } from "react-tag-input";

export interface TagInputProps {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}
