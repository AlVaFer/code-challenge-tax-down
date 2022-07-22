import axios from "axios";

const JSONSERVER_URL = "http://localhost:3000";
axios.defaults.baseURL = JSONSERVER_URL;

export const getInputFields = async () => {
  try {
    const { data } = await axios.get("/inputfields");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async () => {
  try {
    const { data } = await axios.get("/user");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTaxes = async () => {
  try {
    const { data } = await axios.get("/taxes");
    return data;
  } catch (e) {
    console.log(e);
  }
};
