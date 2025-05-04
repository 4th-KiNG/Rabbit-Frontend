import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Button from "../../share/ui/Button/Button";
import { SettingsInputPassword } from "./SettingsInput/SettingsInput";
import { ChangePasswordValues } from "./SettingsInput/SettingsInput.types";
import { useAuth } from "../../lib/hooks/useAuth";
import { ServerError } from "../../types/errors.types";
import { ThemeButton } from "../../share";

const initialValues: ChangePasswordValues = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};

const SettingsPage = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errorText, setErrorText] = useState("");
  const { changePassword, changePasswordError, isSuccessChangePassword } =
    useAuth();

  const handleChangeOldPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setFormValues({ ...formValues, oldPassword: e.target.value });
      }
    },
    [formValues]
  );

  const handleChangeNewPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setFormValues({ ...formValues, newPassword: e.target.value });
      }
    },
    [formValues]
  );

  const handleChangeNewPassword2 = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target) {
        setFormValues({ ...formValues, newPassword2: e.target.value });
      }
    },
    [formValues]
  );

  useEffect(() => {
    if (changePasswordError)
      setErrorText((changePasswordError as ServerError)?.response.data.message);
    else setErrorText("");
  }, [changePasswordError]);

  useEffect(() => {
    if (isSuccessChangePassword) {
      setFormValues(initialValues);
    }
  }, [isSuccessChangePassword]);

  return (
    <>
      <h1 className="text-[2.5rem] font-bold mb-6 max-[475px]:text-[1.5rem] max-[475px]:mb-3">
        Настройки
      </h1>
      <div className="max-w-[1000px] w-full gap-y-11 flex flex-col max-[475px]:gap-y-8">
        <div>
          <h2 className="text-[2.5rem] font-bold text-[#7F7F7F] mb-6 max-[475px]:text-[1.5rem] max-[475px]:mb-3">
            Пароль
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4 max-[475px]:gap-x-4">
            <SettingsInputPassword
              label={"Старый пароль"}
              value={formValues.oldPassword}
              onChange={handleChangeOldPassword}
            />
            <SettingsInputPassword
              label={"Новый пароль"}
              value={formValues.newPassword}
              onChange={handleChangeNewPassword}
            />
            <SettingsInputPassword
              label={"Повторите пароль"}
              value={formValues.newPassword2}
              onChange={handleChangeNewPassword2}
            />
            {errorText.length > 0 && (
              <p className="text-[#CE3333] text-base max-[550px]:text-sm text-center">
                {errorText}
              </p>
            )}
            {isSuccessChangePassword && (
              <p className="text-[#fff] text-base max-[550px]:text-sm text-center">
                Новый пароль установлен!
              </p>
            )}
          </div>

          <Button
            className="rounded-[52px] bg-[#CE3333] text-l mt-6 py-[15px] px-8 max-w-[244px]
          max-[475px]:max-w-[195px] max-[475px]:text-[14px] max-[475px]:px-4"
            onClick={() => changePassword(formValues)}
          >
            Изменить пароль
          </Button>
        </div>
        <div>
          <h2 className="text-[2.5rem] font-bold text-[#7F7F7F] mb-6 max-[475px]:text-[1.5rem] max-[475px]:mb-3">
            Светлая/Темная тема
          </h2>
          <ThemeButton />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
