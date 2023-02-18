import { useRoute, useTheme } from '@react-navigation/native'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { addresses } from '../../addresses.json'
import { ScreenWrapper } from '../components/ScreenWrapper'

const EditAddress = ({ navigation }: any) => {
  const { colors } = useTheme()
  const { id } = useRoute().params as { id: number }

  const [content, setContent] = useState(addresses[id].content)

  const styles = StyleSheet.create({
    appStyle: {
      flex: 1,
      alignItems: 'flex-start',
      padding: 20,
      backgroundColor: '#EEEEEE',
    },
    title: {
      fontWeight: '200',
      fontSize: 26,
      borderBottomWidth: 0.5,
      marginBottom: 25,
    },
    subTitle: {
      fontWeight: '500',
      fontSize: 14,
      borderBottomWidth: 0.5,
      marginBottom: 5,
    },
    button: {
      height: 30,
      width: 30,
      marginRight: 10,
      padding: 5,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.border,
    },
    icon: {
      fontFamily: 'Segoe MDL2 Assets',
      fontSize: 60,
    },
  })

  const handleBack = () => {
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
        <Text style={styles.title}>Editar Morada</Text>
      </View>
      <Text style={styles.subTitle}>Conteúdo</Text>
      <TextInput
        style={{ borderColor: colors.border, borderWidth: 1, width: '70%' }}
        onChangeText={setContent}
        value={content}
        multiline
        placeholder="Conteúdo..."
      />
    </ScreenWrapper>
  )
}

export default EditAddress
