import moment from 'moment'
import { BigNumber } from 'ethers'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function validateDate(
  format: string,
  fromDate?: string,
  toDate?: string
) {
  let finalFromDate = ''
  let finalToDate = ''

  if (!toDate) {
    finalToDate = moment(new Date()).format(format)
  } else {
    finalToDate = moment(toDate, 'DD/MM/YYYY').format(format)
  }

  if (!fromDate) {
    finalFromDate = moment(finalToDate, 'DD/MM/YYYY')
      .add(-1, 'days')
      .format(format)
  } else {
    finalFromDate = moment(fromDate, 'DD/MM/YYYY').format(format)
  }

  return { finalFromDate, finalToDate }
}

export function getRandomArbitrary(min: number, max: number) {
  const randomNumber = Math.random() * (max - min) + min
  return Math.round(randomNumber)
}

export function bn(data: number | string) {
  return BigNumber.from(data.toString())
}

export function formatPrice(numberString: string) {
  const number = parseFloat(numberString)

  if (number < 1) {
    const decimalPart = numberString.split('.')[1]
    let count = 0

    for (let i = 0; i < decimalPart.length; i++) {
      if (decimalPart[i] === '0') count++
      else break
    }

    if (decimalPart && count > 4) {
      const precision = Math.ceil(Math.log10(1 / number)) - 1
      const formattedNumber = numberString.slice(precision + 2)
      return `0.0(${precision.toString()})${formattedNumber.toString()}`
    }
    return numberString
  } else if (numberString.includes('.')) {
    return parseFloat(numberString).toLocaleString()
  }
  return parseFloat(numberString).toLocaleString()
}
