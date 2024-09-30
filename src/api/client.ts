import axios from "axios";

const client = axios.create({
  baseURL: "https://pkhsns2xwi.execute-api.eu-west-1.amazonaws.com/Prod",
});

export default client;
