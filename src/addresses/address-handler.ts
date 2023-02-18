import { addresses } from '../../addresses.json'
import { Address } from './types'

export const getAddresses = (): Address[] => {
  return addresses.map((address, index) => ({ ...address, id: index }))
}
