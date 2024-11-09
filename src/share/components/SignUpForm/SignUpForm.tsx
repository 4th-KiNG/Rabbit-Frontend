import { Input, Button } from "../../ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInputs } from "../../ui/Input/Input.types";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { ServerError } from "../../../types/errors.types";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();
  const { signUp, signUpError } = useAuth();
  const [errorText, setErrorText] = useState<string | null>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.password === data.repeatPassword) {
      delete data.repeatPassword;
      signUp(data);
      setErrorText(null);
    } else {
      setErrorText("Введенные пароли не совпадают");
    }
  };

  useEffect(() => {
    setErrorText((signUpError as ServerError)?.response.data.message);
  }, [signUpError]);

  return (
    <>
      <form action="" className="flex flex-col gap-3 w-full max-w-[500px]">
        <Input
          type="text"
          label="Никнейм"
          register={register}
          name="username"
          required
        />
        <Input
          label="Почта"
          type="email"
          register={register}
          name="email"
          required
        />
        <Input
          label="Пароль"
          type="password"
          register={register}
          name="password"
          required
        />
        <Input
          label="Повторите пароль"
          type="password"
          register={register}
          name="repeatPassword"
          required
        />
        <Button
          className="bg-[#CE3333] h-12 text-white"
          label="Зарегистрироваться"
          onClick={handleSubmit(onSubmit)}
        />
        {errorText && <p className="text-[#CE3333] text-center">{errorText}</p>}
      </form>
    </>
  );
};

export default SignUpForm;
