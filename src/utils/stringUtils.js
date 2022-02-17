export const addSpaceToScore = (string) => {
  return string?.replace(/(.{4})/g, '$1 ').trim()
}
