let db = {}

export function save(id, data){
  db[id] = data
}

export function get(id){
  return db[id]
}

export function update(id, data){
  if(db[id]) db[id] = { ...db[id], ...data }
}

export function remove(id){
  delete db[id]
}