import bcrypt from "bcrypt"

export function comparePassword (password: string, hashPassword: string) {  
  let compareResult = false
  bcrypt.compare(password, hashPassword, (err, result) => {
    compareResult = result
  })
  return compareResult
}

export async function hashPassword (password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
