import { WithContext as ReactTags, Tag } from "react-tag-input";
import { TagInputProps } from "./TagInput.types";

const TagInput = (props: TagInputProps) => {
  const { tags, setTags } = props;
  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index: number, newTag: Tag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag: Tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <>
      <ReactTags
        tags={tags}
        autoFocus={false}
        inputFieldPosition="inline"
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        onTagUpdate={onTagUpdate}
        maxTags={15}
        allowAdditionFromPaste
        classNames={{
          tagInputField: `bg-transparent border-0 w-full text-base outline-0 max-[550px]:text-sm ${
            tags.length === 15 ? "hidden" : "block"
          }`,
          tagInput: "flex-1",
          selected:
            "bg-[rgba(0,0,0,0.3)] p-3 flex gap-2 items-center min-w-64 min-h-[56px] rounded-xl flex-wrap max-[900px]:min-w-0",
          tag: "flex gap-1 text-base bg-[#404040] rounded-[8px] px-2 py-1 max-[550px]:text-sm",
          remove: "outline-0",
        }}
        placeholder=""
      />
    </>
  );
};

export default TagInput;
