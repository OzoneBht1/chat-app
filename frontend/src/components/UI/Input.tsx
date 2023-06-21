import React from "react";
import classnames from "classnames";
import { LoginSchemaType } from "../Chat/validations/loginValidation";
import { UseFormRegister } from "react-hook-form";

interface IInputProps {
  fullWidth?: boolean;
  placeholder: string;
  error?: boolean;
  type?: string;
  leftIcon?: string;
  register: any;
}
const Input = ({
  fullWidth,
  error,
  type,
  placeholder,
  leftIcon,
  register,
  ...rest
}: IInputProps) => {
  const [focus, setFocus] = React.useState(false);
  let inputClass = classnames("pr-10 pl-5 py-3 rounded", {
    "w-full": fullWidth,
    "border-2 border-red-500": error,
    "border-2 border-gray-200": !error,
    "focus:outline-none focus:border-blue-500": !error && focus,
  });

  return (
    <div className="relative">
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        {...register}
        {...rest}
      />
    </div>
  );
};

export default Input;
