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
  BVN: "https://rgw.k8s.apis.ng/centric-platforms/uat/customer/identity/BVN",
  createCustomer:
    "https://rgw.k8s.apis.ng/centric-platforms/uat/CreateConsumer",
  getFromPhone:
    "https://rgw.k8s.apis.ng/centric-platforms/uat/enaira-user/GetUserDetailsByPhone",
  getFromBVN: "https://rgw.k8s.apis.ng/centric-platforms/uat/CreateMerchant",
  createMerchant:
    "https://rgw.k8s.apis.ng/centric-platforms/uat/CreateMerchant",
};
export type body = {
  responseCode: string; //**
  BVN: string; //dirBvn
  firstName: string; //dirFirstName
  middleName: string; //dirMiddleName
  lastName: string; //dirLastName
  dateOfBirth: string; //dirDateOfBirth
  registrationDate: string; //**
  enrollmentBank: string; //**
  enrollmentBranch: string; //**
  email: string; //userName emailId
  gender: "Male" | "Female"; //**
  levelOfAccount: string; //**
  lgaOfOrigin: string; //**
  lgaOfResidence: string; //city
  maritalStatus: "Married" | "Single"; //**
  NIN: string; //**
  nameOnCard: string; //**
  nationality: string; //**
  phoneNumber1: string; //phone
  phoneNumber2: string; //**
  residentialAddress: string; //address
  stateOfOrigin: string; //**
  stateOfResidence: string; //**
  watchListed: string; //**
};

export const getTitle = (data: string, maritalStatus: string): string => {
  if (data === "Male") {
    return "Mr";
  } else {
    if (maritalStatus === "Married") {
      return "Mrs";
    } else {
      return "Miss";
    }
  }
};
