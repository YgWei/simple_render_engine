import appserve from "./appserve";

const API_URL = "/render";

export default {
  async getEngines() {
    return await appserve.get(`${API_URL}/engines`);
  },
  async renderData(params) {
    return await appserve.post(`${API_URL}/webpage`, params, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf"
      }
    });
  }
};
