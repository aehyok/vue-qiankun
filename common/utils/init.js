export const checkPhoneFun = val => {
  if (!/^1\d{10}$/.test(val)) {
    return false
  }
  return true
}
