export function getLowestMissingNumber(numbers: number[]) {
  const sortedNumbers = numbers.sort((numA, numB) => numA - numB)

  let lowestMissingNumber = 1
  for (const number of sortedNumbers) {
    if (number === lowestMissingNumber) {
      lowestMissingNumber++
    }
  }
  return lowestMissingNumber
}
