import axios from "axios";

interface UserData {
  username: string;
  password: string;
}

export const loginUser = async (data: UserData) => {
  return axios.post("/api/login", data).then((response) => response.data);
};
