import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native-windows'

const useStyles = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    appStyle: {
      flex: 1,
      alignItems: 'flex-start',
      padding: 20,
      paddingTop: 0,
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
      marginTop: 30,
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
    card: {
      paddingLeft: 10,
      backgroundColor: colors.card,
      borderRadius: 3,
      marginBottom: 5,
      width: '98%',
    },
    cardInterior: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
    },
    modal: {
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
    },
    asRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      height: 40,
      width: 150,
      backgroundColor: colors.notification,
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    newButton: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 3,
      padding: 5,
    },
    searchHeader: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      width: '100%',
      marginTop: 20,
    },
    searchInput: {
      borderColor: colors.border,
      borderWidth: 1,
      color: colors.text,
      width: '25%',
      alignSelf: 'flex-start',
      height: 34,
    },
    list: {
      width: '100%',
      marginTop: 20,
    },
  })
}

export default useStyles
