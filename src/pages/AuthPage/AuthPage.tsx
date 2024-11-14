import { useState } from "react";
import { SignInForm, SignUpForm, RabbitTitle, ThemeButton } from "../../share";
import { bg } from "../../assets";
import { isMobile } from "../../utils/styles.utils";

const AuthPage = () => {
  const [status, setStatus] = useState<"signin" | "signup">("signin");
  return (
    <>
      <img src={bg} className="fixed top-0 left-0 w-full h-full" alt="" />
      <div
        className={`w-1/2 flex flex-col gap-5 fixed bg-[#eeeeee] ${
          status === "signin" ? "translate-x-full" : ""
        } transition-all duration-400 ease-out min-h-full p-8 items-center justify-center dark:bg-[#121212] max-[700px]:w-full max-[700px]:translate-x-0`}
      >
        {status === "signin" ? (
          <>
            <h1 className="text-4xl font-bold max-[700px]:text-3xl">Вход</h1>
            <SignInForm />
            <div className="flex justify-between w-full max-w-[500px]">
              <p>Нет аккаунта?</p>
              <p
                className="text-[#CE3333] underline cursor-pointer"
                onClick={() => setStatus("signup")}
              >
                Зарегистрироваться
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold max-[700px]:text-3xl">
              Регистрация
            </h1>
            <SignUpForm />
            <div className="flex justify-between w-full max-w-[500px]">
              <p>Есть аккаунт?</p>
              <p
                className="text-[#CE3333] underline cursor-pointer"
                onClick={() => setStatus("signin")}
              >
                Войти
              </p>
            </div>
          </>
        )}
        <div className="absolute bottom-10 max-[700px]:bottom-8">
          <RabbitTitle />
        </div>
        <div
          className={`fixed top-10 transition-all duration-400 ease-out ${
            status === "signup" && !isMobile() ? "left-10" : "right-10"
          }`}
        >
          <ThemeButton />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
