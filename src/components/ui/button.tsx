import { Button as MuiButton } from "@mui/material";
import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type,
  disabled,
}: CustomButtonProps) {
  return (
    <MuiButton variant="outlined" fullWidth type={type} disabled={disabled}>
      {children}
    </MuiButton>
  );
}
