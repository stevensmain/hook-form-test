import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Box } from "@mui/material";

import { loginFormSchema } from "../../schemas/login-form-schema";
import { loginUser } from "../../services/auth";
import Input from "../ui/input";
import Button from "../ui/button";

interface FormValues {
  username: string;
  password: string;
}

function LoginForm() {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = formMethods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await loginUser(data);
    console.log(result);
    reset();
  };

  return (
    <Box
      sx={{
        bgcolor: "grey.300",
        borderRadius: "30px",
        p: "50px",
        width: "50%",
      }}
    >
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Input
              label="Username"
              name="username"
              type="text"
              maxLength={12}
            />

            <Input
              label="Password"
              name="password"
              type="text"
              maxLength={12}
            />

            <Button type="submit" disabled={!isDirty || !isValid}>
              Login
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default LoginForm;
