import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../ui";
import { IFormInputs } from "../../ui/Input/Input.types";
import { useAuth } from "../../../lib/hooks/useAuth";

const SignInForm = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();
  const { signIn } = useAuth();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => signIn(data);
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
          className="bg-[#CE3333] h-12"
          label="Войти"
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </>
  );
};

export default SignInForm;
