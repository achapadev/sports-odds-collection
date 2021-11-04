export const calculateOdds = (value) => {
  if (Math.sign(value) === 1) {
    return `+${value}`
  }
  return value
}

// if we have positive num attach plus sign infront of it
//  otherwise just return negative

export const getDate = (date) => {
  const value = new Date(date)
  return `${
    value.getUTCMonth() + 1
  }-${value.getUTCDate()}-${value.getFullYear()}`
}

export const filterTeam = (team) => {
  return team.toLowerCase().trim().split(/\s+/).join("_")
}
