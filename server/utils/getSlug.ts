export function getSlug (name: string) {
  // return only uppercase letters
  return name.replace(/[^A-Z]/g, '')
}
