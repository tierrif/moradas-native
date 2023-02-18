import { Address, RawAddress } from './types'
import RNFS from 'react-native-fs'

export const getAddresses = async (): Promise<Address[]> => {
  const addresses = await readAddressFile()
  console.log(addresses)
  return addresses.map((address, index) => ({ ...address, id: index }))
}

export const editAddress = async (newAddress: Address) => {
  const convertedAddress: RawAddress = {
    content: newAddress.content,
    zipCode: newAddress.zipCode,
    username: newAddress.username,
  }

  const addresses = await readAddressFile()
  addresses[newAddress.id] = convertedAddress

  await writeToAddressFile(addresses)
}

export const addAddress = async (newAddress: RawAddress) => {
  const addresses = await readAddressFile()
  addresses.unshift(newAddress)

  await writeToAddressFile(addresses)
}

export const deleteAddress = async (id: number) => {
  const addresses = await readAddressFile()

  addresses.splice(id, 1)

  await writeToAddressFile(addresses)
}

const readAddressFile = async () => {
  if (!(await RNFS.exists(RNFS.DocumentDirectoryPath + '/addresses.json'))) {
    await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/addresses.json', '[]')
  }
  console.log(RNFS.DocumentDirectoryPath + '/addresses.json')
  return JSON.parse(
    await RNFS.readFile(RNFS.DocumentDirectoryPath + '/addresses.json', 'utf8'),
  ).addresses as RawAddress[]
}

const writeToAddressFile = async (addresses: RawAddress[]) => {
  await RNFS.writeFile(
    RNFS.DocumentDirectoryPath + '/addresses.json',
    JSON.stringify({ addresses }),
  )
}
