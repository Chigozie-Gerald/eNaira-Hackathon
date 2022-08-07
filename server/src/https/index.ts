import Axios from "axios";
import https from "https";

export const headers = {
  ClientId: "693a265e73771910be6d5b481430e7d8",
};
export const axios = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers,
});

export const url = {
  getBalance: "https://rgw.k8s.apis.ng/centric-platforms/uat/GetBalance",
  NIN: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/NINValidationByNIN",
};
