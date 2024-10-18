import { useState } from "react";
import { SignInForm, SignUpForm } from "../../share";

const AuthPage = () => {
  const [status, setStatus] = useState<"signin" | "signup">("signin");
  return (
    <>
      <div
        className={`w-1/2 flex flex-col gap-5 fixed bg-[#121212] translate-x-${
          status === "signin" ? "full" : "0"
        } transition-all min-h-screen p-8 items-center justify-center max-[700px]:w-full`}
      >
        {status === "signin" ? (
          <>
            <h1 className="text-4xl font-bold">Войти</h1>
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
      </div>
      <div className="bg-[#404040] max-w-screen w-full h-screen"></div>
    </>
  );
};

export default AuthPage;
