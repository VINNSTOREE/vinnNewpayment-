import fetch from "node-fetch"
import config from "./config.js"
import { save } from "./db.js"

export default async function handler(req, res){
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed" })
  }

  try{
    const { amount } = req.body

    // 🔒 VALIDASI
    if(!amount || amount < config.MIN_AMOUNT || amount > config.MAX_AMOUNT){
      return res.json({ error: "Nominal tidak valid" })
    }

    const response = await fetch(`${config.BASE_URL}/deposit/create`, {
      method: "POST",
      headers: {
        "X-API-Key": config.API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount })
    })

    const data = await response.json()

    if(!data.success){
      return res.json({ error: "Gagal buat QRIS" })
    }

    const trx = data.data

    // 💾 SIMPAN
    save(trx.depositId, {
      amount: trx.totalAmount,
      status: "pending",
      createdAt: Date.now()
    })

    return res.json({
      success: true,
      id: trx.depositId,
      qr: trx.qrImage,
      amount: trx.totalAmount
    })

  }catch(err){
    console.log(err)
    res.json({ error: "Server error" })
  }
}