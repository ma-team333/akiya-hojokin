export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akiya-hojokin-theta.vercel.app";
export const SITE_NAME = "空き家補助金ナビ";
export const ENTITY_ID = "akiya";

export const operator = {
  name: process.env.NEXT_PUBLIC_OPERATOR_NAME ?? "公開前に運営者名を設定してください",
  address: process.env.NEXT_PUBLIC_OPERATOR_ADDRESS ?? "公開前に所在地を設定してください",
  email: process.env.NEXT_PUBLIC_OPERATOR_EMAIL ?? "公開前に連絡先を設定してください",
};
