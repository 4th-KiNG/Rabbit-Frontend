import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ReportModalProps } from "./ReportModal.types";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeEvent, useCallback, useState } from "react";

const ReportModal = (props: ReportModalProps) => {
  const { isOpen, onOpenChange, type, sendReport } = props;
  const [value, setValue] = useState("");

  const handleChangeTextArea = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value),
    []
  );
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Пожаловаться на контент{" "}
                {type === "post" ? "поста" : "комментария"}
              </ModalHeader>
              <ModalBody>
                <TextareaAutosize
                  className="w-full inline-table text-md bg-transparent outline-none border-noned h-auto"
                  placeholder="Причина жалобы"
                  value={value}
                  onChange={handleChangeTextArea}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="text-danger bg-transparent rounded-full"
                >
                  Close
                </Button>
                <Button
                  onClick={() => sendReport(value)}
                  className="text-white bg-[#CE3333] rounded-full"
                >
                  Отправить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
