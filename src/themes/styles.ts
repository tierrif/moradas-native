import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native-windows'

const useStyles = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
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
    heading: {
      marginTop: 30,
      marginBottom: 10,
      fontSize: 23,
      color: colors.text,
    },
    text: {
      paddingTop: 5,
      paddingBottom: 5,
      color: colors.text,
    },
    scrollView: {
      paddingRight: 20,
    },
    settingContainer: {
      alignItems: 'flex-start',
    },
  })
}

export default useStyles
