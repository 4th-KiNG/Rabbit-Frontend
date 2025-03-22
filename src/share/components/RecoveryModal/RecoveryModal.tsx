import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { RecoveryModalProps } from "./RecoveryModal.types";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../lib/hooks/useAuth";
import { ServerError } from "../../../types/errors.types";
import { isMobile } from "../../../utils/styles.utils";

const RecoveryModal = (props: RecoveryModalProps) => {
  const { isOpen, onOpenChange } = props;
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const { sendNewPassword, newPasswordError } = useAuth();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorText("");
    setEmail(e.target.value);
  };

  const handleRecoverPassword = () => {
    if (email.length > 0) {
      sendNewPassword(email);
    } else setErrorText("Некорректная почта");
  };

  useEffect(() => {
    if (newPasswordError)
      setErrorText((newPasswordError as ServerError)?.response.data.message);
  }, [newPasswordError]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Сброс пароля</ModalHeader>
              <ModalBody className="flex flex-col gap-6 items-center">
                <p className="text-base max-[550px]:text-sm">
                  Введите почту от аккаунта, на которую прийдёт письмо с новым
                  паролем.
                  <br />
                  Если письмо не пришло, проверьте папку "Спам" или попробуйте
                  ещё раз.
                </p>
                <Input
                  value={email}
                  onChange={handleChangeEmail}
                  size={`${isMobile() ? "md" : "lg"}`}
                  style={{ fontSize: `${isMobile() ? "14px" : "16px"}` }}
                />
                {errorText.length > 0 && (
                  <p className="text-center text-[#CE3333] max-w-72 w-full">
                    {errorText}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className="text-danger bg-transparent rounded-full"
                >
                  Закрыть
                </Button>
                <Button
                  onClick={handleRecoverPassword}
                  className="text-white bg-[#CE3333] rounded-full"
                >
                  Oтправить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecoveryModal;
