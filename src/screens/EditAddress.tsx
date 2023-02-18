import { useRoute, useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'
import {
  editAddress,
  getAddresses,
  addAddress,
} from '../addresses/address-handler'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'

const EditAddress = ({ navigation }: any) => {
  const { colors } = useTheme()
  const { id } = useRoute().params as { id?: number }

  const isEdit = id !== undefined

  const [content, setContent] = useState('')
  const [nick, setNick] = useState('')
  const styles = useStyles()

  useEffect(() => {
    getAddresses().then(addresses => {
      if (isEdit) {
        setContent(addresses[id].content)
        setNick(addresses[id].username || '')
      }
    })
  }, [id, isEdit])

  const handleBack = () => {
    navigation.push('Home')
  }

  const handleSave = async () => {
    const replacedContent = content.replace(/\r/g, '\n')
    const split = replacedContent.split(' ')
    const zipCode = split[split.length - 2].split(' ')[0]

    if (isEdit) {
      await editAddress({
        content: replacedContent,
        username: nick,
        id,
        zipCode,
      })
    } else {
      await addAddress({
        content: replacedContent,
        username: nick,
        zipCode,
      })
    }
    navigation.push('Home')
  }

  return (
    <ScreenWrapper style={styles.appStyle} navigation={navigation}>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableHighlight
          accessibilityRole="button"
          {...{ tooltip: 'Voltar' }}
          onPress={handleBack}
          style={styles.button}
          underlayColor={colors.border}
          activeOpacity={0.2}>
          <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE72B;</Text>
        </TouchableHighlight>
        <Text style={styles.title}>{isEdit ? 'Editar' : 'Criar'} Morada</Text>
      </View>
      <View style={{ width: '70%' }}>
        <Text style={styles.subTitle}>Conteúdo</Text>
        <TextInput
          style={{ borderColor: colors.border, borderWidth: 1 }}
          onChangeText={setContent}
          value={content}
          multiline
          placeholder="Conteúdo..."
        />
        <Text style={styles.subTitle}>Username/Nick (opcional)</Text>
        <TextInput
          style={{ borderColor: colors.border, borderWidth: 1 }}
          onChangeText={setNick}
          value={nick}
          multiline
          placeholder="Username/Nick..."
        />
        <TouchableHighlight
          accessibilityRole="button"
          {...{ tooltip: 'Guardar' }}
          onPress={handleSave}
          style={{
            ...styles.button,
            marginTop: 10,
            marginRight: 0,
            alignSelf: 'flex-end',
            width: 100,
            height: 40,
          }}
          underlayColor={colors.border}
          activeOpacity={0.2}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 3,
              padding: 5,
            }}>
            <Text style={styles.icon}>&#xE8FB;</Text>
            <Text
              style={{
                ...styles.iconButtonText,
                color: 'black',
                fontSize: 14,
              }}>
              Guardar
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScreenWrapper>
  )
}

export default EditAddress
