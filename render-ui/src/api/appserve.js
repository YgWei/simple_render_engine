import axios from "axios";

const env = process.env;

const appserve = axios.create({
  baseURL: `${env.VUE_APP_API_PROTOCOL}://${env.VUE_APP_API_HOTS}:${env.VUE_APP_API_PORT}/api/${env.VUE_APP_API_VERSION}`
});

export default appserve;
