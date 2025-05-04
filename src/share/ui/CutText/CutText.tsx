import { useState } from "react";

interface CutTextProps {
  text: string;
}

const CutText = (props: CutTextProps) => {
  const { text } = props;
  const [isShowText, setShowText] = useState(false);
  return (
    <>
      {text.length < 100 || isShowText ? text : text.slice(0, 100) + "..."}
      {text.length > 100 &&
        (isShowText ? (
          <button
            onClick={() => setShowText(false)}
            className="text-[#ecedee86] ml-2"
          >
            Скрыть текст
          </button>
        ) : (
          <button
            onClick={() => setShowText(true)}
            className="text-[#ecedee86] ml-2"
          >
            Показать ещё
          </button>
        ))}
    </>
  );
};

export default CutText;
