export default function () {

  const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars)}` : null

  const randomNumber = (min = 1, max) => Math.floor(Math.random() * (max - min + 1)) + min

  return {
    sliceAddress,
    randomNumber
  }
}