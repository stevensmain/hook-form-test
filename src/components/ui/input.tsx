import { InputHTMLAttributes } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { TextField, Typography } from "@mui/material";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface CustomInputProps extends InputProps {
  name: string;
  label: string;
}

const formValidation = (errors: FieldErrors, errorKey: string) => {
  return errors[errorKey] ? (
    <Typography color="red">{errors[errorKey]?.message as string}</Typography>
  ) : null;
};

export default function Input({
  name,
  label,
  type,
  disabled,
}: CustomInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <TextField
        required
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        variant="outlined"
        {...register(name)}
        fullWidth
      />
      {errors && formValidation(errors, name)}
    </div>
  );
}
