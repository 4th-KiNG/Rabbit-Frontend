import { Input, Button } from "../../ui";
import { useForm, SubmitHandler } from 'react-hook-form'
import { IFormInputs } from "../../ui/Input/Input.types";
import { useAuth } from "../../../lib/hooks/useAuth";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm<IFormInputs>();
  const { signUp } = useAuth();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => signUp(data);
  return (
    <>
      <form action="" className="flex flex-col gap-3 w-full max-w-[500px]">
        <Input 
          type="text"
          label="Имя"
          register={register}
          name="username"
          required
        />
        <Input 
          type="text"
          label="Фамилия"
          register={register}
          name="surname"
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
          name="repeatpassword"
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

export default SignUpForm;
