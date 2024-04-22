const getDate = (timestamp: number) => {
  const date = new Date(timestamp).toLocaleDateString('en-us', {
    year:"numeric",
    month:"short",
    day:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  })
  return date
}

export default getDate;