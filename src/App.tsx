import { Box, Typography } from "@mui/material";

import LoginForm from "./components/login/login-form";

function App() {
  return (
    <Box
      className="App"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h2" mb="20px" textAlign="center">
        GentlemanClass - Testing
      </Typography>

      <LoginForm />
    </Box>
  );
}

export default App;
