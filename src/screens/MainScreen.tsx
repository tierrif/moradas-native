import { useIsFocused, useTheme } from '@react-navigation/native'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { Popup } from 'react-native-windows'
import { addresses } from '../../addresses.json'
import { ScreenWrapper } from '../components/ScreenWrapper'

type Address = {
  content: string
  zipCode: string
  username?: string
  id: number
}

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#EEEEEE',
  },
  searchButton: {
    height: 33,
    marginLeft: 5,
    width: 38,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '200',
    fontSize: 26,
    borderBottomWidth: 0.5,
    marginBottom: 25,
  },
  icon: {
    fontFamily: 'Segoe MDL2 Assets',
    fontSize: 16,
  },
  iconButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
})

const MainScreen = ({ navigation }: any) => {
  const [currentSize, setCurrentSize] = useState(20)
  const getAddresses = (): Address[] => {
    return addresses.map((address, index) => ({ ...address, id: index }))
  }
  const [currentAddresses, setCurrentAddresses] = useState<Address[]>(
    getAddresses().slice(0, currentSize),
  )

  const [search, setSearch] = useState('')
  const [showDeleteFlyout, setShowDeleteFlyout] = useState(false)
  const [addressQueue, setAddressQueue] = useState<Address[]>(getAddresses())
  const isScreenFocused = useIsFocused()
  const { colors } = useTheme()

  const handleCreate = () => {
    console.log('Create')
  }

  const handleEdit = (id: number) => {
    navigation.push('Edit' as never, { id } as never)
  }

  const handleDelete = (id: number) => {
    console.log(id)
  }

  const handleSearch = (e: string) => {
    if (e === '') {
      const allAddresses = getAddresses()
      setAddressQueue(allAddresses)
      setCurrentAddresses(allAddresses.slice(0, currentSize))
      return
    }

    const normalize = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const newAddresses = getAddresses().filter(address =>
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
              }}
              horizontalOffset={200}
              verticalOffset={200}>
              <View
                style={{
                  backgroundColor: colors.border,
                  width: 200,
                  height: 170,
                  borderRadius: 3,
                  alignItems: 'center',
                  justifyContent: 'space-around',
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
                    marginBottom: 10,
                  }}>
                  <Text style={{ color: '#FFFFFF' }}>Cancelar</Text>
                </TouchableHighlight>
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
                  }}>
                  <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                </TouchableHighlight>
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
          <Text style={styles.title}>Moradas</Text>
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
