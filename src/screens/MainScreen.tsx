import { useIsFocused, useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native'
import { Popup } from 'react-native-windows'
import { deleteAddress, getAddresses } from '../addresses/address-handler'
import { Address } from '../addresses/types'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'

const MainScreen = ({ navigation }: any) => {
  const [currentSize, setCurrentSize] = useState(20)
  const [search, setSearch] = useState('')
  const [showDeleteFlyout, setShowDeleteFlyout] = useState(false)
  const [addressQueue, setAddressQueue] = useState<Address[]>([])
  const [currentAddresses, setCurrentAddresses] = useState<Address[]>([])

  const isScreenFocused = useIsFocused()
  const { colors } = useTheme()
  const styles = useStyles()

  useEffect(() => {
    getAddresses().then(addresses => {
      const newSize = 20
      setCurrentSize(newSize)
      setAddressQueue(addresses)
      setCurrentAddresses(addresses.slice(0, newSize))
    })
  }, [])

  const handleCreate = () => {
    navigation.push('Edit' as never, {})
  }

  const handleEdit = (id: number) => {
    navigation.push('Edit' as never, { id } as never)
  }

  const handleDelete = async (id: number) => {
    await deleteAddress(id)
    const newAddresses = await getAddresses()
    setAddressQueue(newAddresses)
    if (search === '') {
      setCurrentAddresses(newAddresses.slice(0, currentSize))
    } else {
      handleSearch(search)
    }
    setShowDeleteFlyout(false)
  }

  const handleSearch = async (e: string) => {
    if (e === '') {
      const allAddresses = await getAddresses()
      setAddressQueue(allAddresses)
      setCurrentAddresses(allAddresses.slice(0, currentSize))
      return
    }

    const normalize = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const newAddresses = (await getAddresses()).filter(address =>
      normalize(address.content).includes(normalize(e)),
    )
    setAddressQueue(newAddresses)
    setCurrentAddresses(newAddresses.slice(0, currentSize))
    setCurrentSize(20)
  }

  const onAddressRender = (
    item: any,
    showFlyout: boolean,
    setShowFlyout: (showFlyout: boolean) => void,
  ) => {
    const { id } = item

    return (
      <TouchableHighlight
        onPress={() => handleEdit(id)}
        style={{
          paddingLeft: 10,
          backgroundColor: colors.card,
          borderRadius: 3,
          marginBottom: 5,
          width: '98%',
        }}
        underlayColor={colors.border}>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{ fontSize: 14 }}>{item.content.split('\n')[0]}</Text>
          <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
            <TouchableHighlight
              accessibilityRole="button"
              {...{ tooltip: 'Imprimir' }}
              onPress={() => {}}
              style={styles.searchButton}
              underlayColor={colors.border}>
              <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE749;</Text>
            </TouchableHighlight>
            <TouchableHighlight
              accessibilityRole="button"
              {...{ tooltip: 'Eliminar' }}
              onPress={() => {
                if (showFlyout) {
                  return
                }

                setShowFlyout(true)
              }}
              style={styles.searchButton}
              underlayColor={colors.border}>
              <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE74D;</Text>
            </TouchableHighlight>
            <Popup
              isOpen={showFlyout}
              onDismiss={() => {
                setShowFlyout(false)
              }}>
              <View
                style={{
                  backgroundColor: colors.border,
                  borderRadius: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowOffset: { width: 10, height: 10 },
                  shadowColor: 'black',
                  shadowOpacity: 1,
                  elevation: 3,
                  zIndex: 999,
                  padding: 15,
                }}>
                <Text style={{ marginBottom: 30, fontSize: 16 }}>
                  Esta ação é irreversível.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableHighlight
                    onPress={() => {
                      handleDelete(id)
                      setShowFlyout(false)
                    }}
                    activeOpacity={0.2}
                    underlayColor="#AA0000"
                    style={{
                      height: 40,
                      width: 150,
                      backgroundColor: colors.notification,
                      borderRadius: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      setShowFlyout(false)
                    }}
                    activeOpacity={0.2}
                    underlayColor={colors.primary}
                    style={{
                      height: 40,
                      width: 150,
                      backgroundColor: colors.primary,
                      borderRadius: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#FFFFFF' }}>Cancelar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Popup>
            <TouchableHighlight
              accessibilityRole="button"
              {...{ tooltip: 'Editar' }}
              onPress={() => handleEdit(id)}
              style={styles.searchButton}
              underlayColor={colors.border}>
              <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE70F;</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const onChangeText = (text: string) => {
    setSearch(text)
    handleSearch(text)
  }

  return (
    <>
      {isScreenFocused && (
        <ScreenWrapper style={styles.appStyle} navigation={navigation}>
          {showDeleteFlyout && (
            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
              onPress={() => setShowDeleteFlyout(false)}
            />
          )}
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>Moradas</Text>
            <View style={{ flexDirection: 'row', flex: 1 }} />
            <TouchableHighlight
              accessibilityRole="button"
              accessibilityLabel="Navigation bar expanded"
              {...{ tooltip: 'Definições' }}
              onPress={() => navigation.push('Settings' as never)}
              activeOpacity={0.5783}
              underlayColor="rgba(0, 0, 0, 0.0241);">
              <Text style={styles.icon}>&#xE713;</Text>
            </TouchableHighlight>
          </View>
          <TouchableOpacity onPress={handleCreate}>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                backgroundColor: colors.primary,
                borderRadius: 3,
                padding: 5,
              }}>
              <Text style={{ color: 'white', ...styles.icon }}>&#xE710;</Text>
              <Text style={styles.iconButtonText}>Nova Morada</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
              marginTop: 20,
            }}>
            <TextInput
              style={{
                borderColor: colors.border,
                borderWidth: 1,
                color: colors.text,
                width: '25%',
                alignSelf: 'flex-start',
                height: 34,
              }}
              onChangeText={onChangeText}
              value={search}
              placeholder="Pesquisar..."
            />
            <TouchableHighlight
              accessibilityRole="button"
              {...{ tooltip: 'Pesquisar' }}
              onPress={() => handleSearch(search)}
              style={styles.searchButton}
              underlayColor={colors.border}>
              <Text style={styles.icon}>&#xE721;</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={currentAddresses}
            scrollEnabled={!showDeleteFlyout}
            renderItem={i =>
              onAddressRender(i.item, showDeleteFlyout, setShowDeleteFlyout)
            }
            style={{
              width: '100%',
              marginTop: 20,
            }}
            keyExtractor={item => item.id.toString()}
            removeClippedSubviews
            onEndReached={() => {
              setCurrentAddresses(
                currentAddresses.concat(
                  addressQueue.slice(currentSize, currentSize + 20),
                ),
              )
              setCurrentSize(currentSize + 20)
            }}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
              if (e.nativeEvent.contentOffset.y === 0) {
                setCurrentAddresses(addressQueue.slice(0, 20))
                setCurrentSize(20)
              }
            }}
          />
        </ScreenWrapper>
      )}
    </>
  )
}

export default MainScreen
