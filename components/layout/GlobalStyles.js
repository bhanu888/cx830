import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatListSummaryItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flatListTitle: {
    fontSize: 18,
  },
  flatListDescription: {
    fontSize: 12,
    color: 'gray'
  }
});
