import { useState } from "react";
import { SignInForm, SignUpForm } from "../../share";
import { bg } from "../../assets";
import { RabbitTitle, ThemeButton } from "../../share/ui";

const AuthPage = () => {
  const [status, setStatus] = useState<"signin" | "signup">("signin");
  return (
    <>
      <img src={bg} className="fixed top-0 left-0 w-screen h-screen" alt="" />
      <div
        className={`w-1/2 flex flex-col gap-5 fixed bg-[#eeeeee] ${
          status === "signin" ? "translate-x-full" : ""
        } transition-all duration-400 ease-out min-h-screen p-8 items-center justify-center dark:bg-[#121212] max-[700px]:w-full max-[700px]:translate-x-0`}
      >
        {status === "signin" ? (
          <>
            <h1 className="text-4xl font-bold">Вход</h1>
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
            <h1 className="text-4xl font-bold">Регистрация</h1>
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
        <div className="fixed bottom-10">
          <RabbitTitle />
        </div>
        <div
          className={`fixed top-10 transition-all duration-400 ease-out ${
            status === "signin" ? "right-10" : "left-10"
          }`}
        >
          <ThemeButton />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
