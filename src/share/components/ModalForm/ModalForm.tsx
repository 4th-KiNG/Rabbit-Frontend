import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ModalProps } from "./ModalForm.types";

const ModalForm = (props: ModalProps) => {
  const { isOpen, onOpenChange, title, content } = props;
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="text-danger bg-transparent rounded-full"
                >
                  Close
                </Button>
                <Button
                  onClick={onClose}
                  className="text-white bg-[#CE3333] rounded-full"
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;
