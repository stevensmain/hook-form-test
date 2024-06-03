import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import axios from "axios";

import LoginForm from "../components/login/login-form";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("LoginForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ token: "123" });
    render(<LoginForm />);
  });

  test("should exist two inputs in the view", () => {
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("should exist the submit button", () => {
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("should have the correct value when the user type in the fields", async () => {
    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    const usernameValue = "username";
    const passwordValue = "myPass123$";

    await user.type(usernameField, usernameValue);
    await user.type(passwordField, passwordValue);

    await waitFor(() => expect(usernameField).toHaveValue(usernameValue));
    await waitFor(() => expect(passwordField).toHaveValue(passwordValue));

    await waitFor(() => expect(submitButton).not.toBeDisabled());

    await user.click(submitButton);
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  test("should have errors message when the value of the fields are invalid", async () => {
    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    const usernameValue = "username12345";
    const passwordValue = "pass123";

    await user.type(usernameField, usernameValue);
    await user.type(passwordField, passwordValue);

    await waitFor(() =>
      expect(
        screen.getByText("Username must be less than 12 characters")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        screen.getByText(
          "Password must be alphanumeric, and contain max 12 characters, a capital letter and a special character"
        )
      ).toBeInTheDocument()
    );

    await waitFor(() => expect(submitButton).toBeDisabled());
  });
});
