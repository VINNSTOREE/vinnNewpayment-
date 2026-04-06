import config from "./config.js"

export default async function handler(req, res){
  const { id } = req.query

  if(!id) return res.json({ error: "ID kosong" })

  try{
    const cek = await fetch(`${config.BASE_URL}/deposit/status/${id}`, {
      headers: {
        "X-API-Key": config.API_KEY
      }
    })

    const data = await cek.json()

    const status = data?.data?.status

    if(!status){
      return res.json({ status: "unknown" })
    }

    return res.json({
      success: true,
      status
    })

  }catch(err){
    console.log(err)
    res.json({ error: "Gagal cek status" })
  }
}
