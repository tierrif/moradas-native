import { useIsFocused, useTheme } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight,
  FlatList,
  Pressable,
} from 'react-native'
import { Popup } from 'react-native-windows'
import { deleteAddress, getAddresses } from '../addresses/address-handler'
import { Address } from '../addresses/types'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'

const MainScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('')
  const [showDeletePopup, setShowDeletePopup] = useState<number | null>(null)
  const [currentAddresses, setCurrentAddresses] = useState<Address[]>([])

  const isScreenFocused = useIsFocused()
  const { colors } = useTheme()
  const styles = useStyles()

  useEffect(() => {
    getAddresses().then(addresses => {
      setCurrentAddresses(addresses)
    })
  }, [])

  const handleCreate = () => {
    navigation.push('Edit', {})
  }

  const handleDelete = async (id: number) => {
    console.log('handleDelete: ' + id)
    await deleteAddress(id)
    const newAddresses = await getAddresses()
    if (search === '') {
      setCurrentAddresses(newAddresses)
    } else {
      handleSearch(search)
    }
    setShowDeletePopup(null)
  }

  const handleSearch = async (e: string) => {
    if (e === '') {
      const allAddresses = await getAddresses()
      setCurrentAddresses(allAddresses)
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
    setCurrentAddresses(newAddresses)
  }

  const onAddressRender = useCallback(
    (
      item: any,
      showFlyout: number | null,
      setShowFlyout: (showFlyout: number | null) => void,
    ) => {
      const handleEdit = (id: number) => {
        navigation.push('Edit', { id })
      }

      const handlePrint = (id: number) => {
        navigation.push('Print', { id })
      }

      const id = item.id

      return (
        <TouchableHighlight
          onPress={() => handleEdit(id)}
          style={styles.card}
          underlayColor={colors.border}>
          <View style={styles.cardInterior}>
            <Text style={{ fontSize: 14 }}>{item.content.split('\n')[0]}</Text>
            <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
              <TouchableHighlight
                accessibilityRole="button"
                {...{ tooltip: 'Imprimir' }}
                onPress={() => handlePrint(id)}
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

                  setShowFlyout(id)
                }}
                style={styles.searchButton}
                underlayColor={colors.border}>
                <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE74D;</Text>
              </TouchableHighlight>
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
    },
    [colors, styles, navigation],
  )

  const onChangeText = (text: string) => {
    setSearch(text)
    handleSearch(text)
  }

  return (
    <>
      {isScreenFocused && (
        <ScreenWrapper style={styles.appStyle} navigation={navigation}>
          {showDeletePopup !== null && (
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowDeletePopup(null)}
            />
          )}
          <Popup
            isOpen={showDeletePopup !== null}
            onDismiss={() => {
              setShowDeletePopup(null)
            }}>
            <View style={styles.modal}>
              <Text style={{ marginBottom: 30, fontSize: 16 }}>
                Esta ação é irreversível.
              </Text>
              <View style={styles.asRow}>
                <TouchableHighlight
                  onPress={async () => {
                    await handleDelete(showDeletePopup!!)
                  }}
                  activeOpacity={0.2}
                  underlayColor="#AA0000"
                  style={{
                    ...styles.modalButton,
                    marginRight: 10,
                  }}>
                  <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    setShowDeletePopup(null)
                  }}
                  activeOpacity={0.2}
                  underlayColor={colors.primary}
                  style={{
                    ...styles.modalButton,
                    backgroundColor: colors.primary,
                  }}>
                  <Text style={{ color: '#FFFFFF' }}>Cancelar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Popup>
          <View style={styles.container}>
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
            <View style={styles.newButton}>
              <Text style={{ color: 'white', ...styles.icon }}>&#xE710;</Text>
              <Text style={styles.iconButtonText}>Nova Morada</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.searchHeader}>
            <TextInput
              style={styles.searchInput}
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
            scrollEnabled={!showDeletePopup}
            renderItem={i => {
              return onAddressRender(
                i.item,
                showDeletePopup,
                setShowDeletePopup,
              )
            }}
            style={styles.list}
            keyExtractor={item => item.id.toString()}
            removeClippedSubviews
          />
        </ScreenWrapper>
      )}
    </>
  )
}

export default MainScreen
