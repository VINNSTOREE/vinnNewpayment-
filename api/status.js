import fetch from "node-fetch"
import config from "./config.js"
import { get, update, remove } from "./db.js"

export default async function handler(req, res){
  const { id } = req.query

  if(!id) return res.json({ error: "ID kosong" })

  const trx = get(id)
  if(!trx) return res.json({ error: "Transaksi tidak ditemukan" })

  // ⏳ CEK EXPIRED
  if(Date.now() - trx.createdAt > config.EXPIRED_TIME){
    remove(id)
    return res.json({ status: "expired" })
  }

  try{
    const cek = await fetch(`${config.BASE_URL}/deposit/status/${id}`, {
      headers: {
        "X-API-Key": config.API_KEY
      }
    })

    const data = await cek.json()
    const status = data?.data?.status || "unknown"

    update(id, { status })

    return res.json({
      success: true,
      status
    })

  }catch(err){
    console.log(err)
    res.json({ error: "Gagal cek status" })
  }
}