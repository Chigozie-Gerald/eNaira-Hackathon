import { axios, body, getTitle, url } from "../https";

export const createCustomer = async (userDetails: body, BVN: string) => {
  try {
    console.log(`=======222`);
    const body = {
      channel_code: "APISNG",
      customer_tier: "2",
      account_no: "0815834717",
      password: "password12341234",
    };

    const customer = (
      await axios.post(url.getFromPhone, {
        phone_number: userDetails.phoneNumber1,
        user_type: "USER",
        channel_code: "APISNG",
      })
    ).data;

    const BODY = {
      ...body,
      nin: userDetails.NIN,
      bvn: BVN,
      reference: `NXG3338${BVN}`, // perm + auto
    };
    if (
      customer &&
      customer.responseCode === "00" &&
      customer.response_message === "Successful Request" &&
      customer.responseData
    ) {
      return customer;
    } else {
      // if (!res.responseData) {
      //   throw new Error(`Something went wrong`);
      // }
      const res = (await axios.post(url.createCustomer, BODY)).data;
      return res;
    }
  } catch (err: any) {
    throw new Error(`Could not create customer`);
  }
};
