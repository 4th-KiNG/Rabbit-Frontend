import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../";
import { IFormInputs } from "../../ui/Input/Input.types";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { ServerError } from "../../../types/errors.types";

const SignInForm = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();
  const { signIn, signInError } = useAuth();
  const [errorText, setErrorText] = useState<string | null>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => signIn(data);

  useEffect(() => {
    setErrorText((signInError as ServerError)?.response.data.message);
  }, [signInError]);

  return (
    <>
      <form action="" className="flex flex-col gap-3 w-full max-w-[500px]">
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
        <Button
          className="bg-[#CE3333] h-12 text-white text-base text-center max-[700px]:text-sm"
          onClick={handleSubmit(onSubmit)}
        >
          Войти
        </Button>
        {errorText && <p className="text-[#CE3333] text-center">{errorText}</p>}
      </form>
    </>
  );
};

export default SignInForm;
