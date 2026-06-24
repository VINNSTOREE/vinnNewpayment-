const config = {
  API_KEY: process.env.API_KEY || "rg_34cf185626d1e99457e110568e5710",
  BASE_URL: "https://ramashop.my.id/api/public",
  MIN_AMOUNT: 1000,
  MAX_AMOUNT: 1000000,
  EXPIRED_TIME: 5 * 60 * 1000 // 5 menit
}

export default config
