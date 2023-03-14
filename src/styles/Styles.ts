import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 16,
  },
  inputText: {
    paddingHorizontal: 8,
    paddingVertitical: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 6,
  },
  buttonStyle: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: '#2c6fdb',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;
