import { useRoute, useTheme } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { getAddresses } from '../addresses/address-handler'
import { ScreenWrapper } from '../components/ScreenWrapper'
import useStyles from '../themes/styles'
import htmlToPdf from '../NativePDFGen'

import RNPrint from 'react-native-print'
import { DocumentDirectoryPath, writeFile } from 'react-native-fs'

const PrintScreen = ({ navigation }: any) => {
  const { colors } = useTheme()
  const { id } = useRoute().params as { id: number }

  const [content, setContent] = useState('')

  const styles = useStyles()

  useEffect(() => {
    getAddresses().then(addresses => {
      setContent(addresses[id].content)
    })
  }, [id])

  const handleBack = () => {
    navigation.push('Home')
  }

  const genFileName = (length: number) => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
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
        <Text style={styles.title}>Imprimir</Text>
        <TouchableHighlight
          accessibilityRole="button"
          {...{ tooltip: 'Imprimir' }}
          onPress={async () => {
            const html = `<p style="
            font-family: sans-serif;
            font-size: 18px;
            ">${content.replace(/\n/g, '<br>')}</h1>`
            await writeFile(DocumentDirectoryPath + '/file.html', html)
            htmlToPdf?.ConvertHtmlToPdf(
              'file.html',
              genFileName(7) + '.pdf',
              (path?: string) => {
                if (path && !path.startsWith('[ERR]')) {
                  RNPrint.print({
                    filePath: path,
                  })
                } else if (path?.startsWith('[ERR]')) {
                  console.error(path)
                }
              },
            )
          }}
          style={styles.button}
          underlayColor={colors.border}
          activeOpacity={0.2}>
          <Text style={{ ...styles.icon, fontSize: 14 }}>&#xE8AD;</Text>
        </TouchableHighlight>
      </View>
      <View style={{ width: '70%' }} />
    </ScreenWrapper>
  )
}

export default PrintScreen
