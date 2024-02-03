export const formatToClientDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}
