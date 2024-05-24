export function getPercentage(
  numerator: number,
  denominator: number,
  options: { round?: 'down' | 'up' } = {}
) {
  switch (options.round) {
    case 'up':
      return Math.ceil((numerator / denominator) * 100)
    case 'down':
      return Math.floor((numerator / denominator) * 100)
    default:
      return (numerator / denominator) * 100
  }
}
