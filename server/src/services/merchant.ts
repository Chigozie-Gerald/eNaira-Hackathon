import { axios, body, getTitle, url } from "../https";

export const createMerchant = async (userDetails: body, BVN: string) => {
  try {
    console.log(`=======333`);
    const body = {
      channel_code: "APISNG",
      password: "password12341234",
      customer_tier: "2",
      account_no: "0815834717",
      user_name: "",
      wallet_category: "parent",
    };
    const BODY = {
      ...body,
      director_bvn: BVN,
      city: userDetails.lgaOfResidence, //
      state: userDetails.stateOfOrigin.split(` `)[0], // condition, married and male or female
      reference: `NXG3338${BVN}MNT`, // auto
      tin: `${BVN}-0001`, // auto
    };
    const res = (await axios.post(url.createMerchant, BODY)).data;
    // if(!res.responseData) {
    //     throw new Error(`Something went wrong`)
    // }
    return res;
  } catch (err: any) {
    throw new Error(`Could not create Merchant`);
  }
};
