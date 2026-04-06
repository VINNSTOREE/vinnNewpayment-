const config = {
  API_KEY: process.env.API_KEY || "rg_92de2603ed65af6487074222c8757a",
  BASE_URL: "https://ramashop.my.id/api/public",
  MIN_AMOUNT: 1000,
  MAX_AMOUNT: 1000000,
  EXPIRED_TIME: 5 * 60 * 1000 // 5 menit
}

export default config