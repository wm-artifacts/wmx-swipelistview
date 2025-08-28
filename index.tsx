// NOTE: This component requires 'react-native-swipe-list-view' as a dependency. Install it in your project for this component to work.
import React from 'react';
import { View, Text, StyleSheet, ListRenderItemInfo } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface SwipeListViewProps<T> {
  data: T[];
  renderItem?: (info: ListRenderItemInfo<T>) => React.ReactElement;
  renderHiddenItem?: (info: ListRenderItemInfo<T>) => React.ReactElement;
  onRowOpen?: (rowKey: string, rowMap: any) => void;
  keyExtractor?: (item: T, index: number) => string;
  style?: any;
}

function RNSwipeListView<T>({
  data,
  renderItem,
  renderHiddenItem,
  onRowOpen,
  keyExtractor,
  style = {},
}: SwipeListViewProps<T>) {
  // Default renderer for list items
  const defaultRenderItem = ({ item }: ListRenderItemInfo<T>) => {
    const safeItem = item as any;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{safeItem.title || ''}</Text>
        <Text style={styles.subtitle}>{safeItem.subtitle || ''}</Text>
      </View>
    );
  };

  // Safe key extractor
  const safeKeyExtractor = (item: T, index: number): string => {
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    return index.toString();
  };

  // Safe preview row key
  const getPreviewRowKey = (): string | undefined => {
    if (data && data.length > 0 && data[0] !== undefined) {
      return safeKeyExtractor(data[0], 0);
    }
    return undefined;
  };

  // Create props object with proper type handling
  const swipeListProps: any = {
    data,
    renderItem: renderItem || defaultRenderItem,
    rightOpenValue: -75,
    previewRowKey: getPreviewRowKey(),
    previewOpenValue: -40,
    previewOpenDelay: 3000,
    keyExtractor: safeKeyExtractor,
  };

  // Only add renderHiddenItem if provided
  if (renderHiddenItem) {
    swipeListProps.renderHiddenItem = renderHiddenItem;
  }

  // Only add onRowOpen if provided
  if (onRowOpen) {
    swipeListProps.onRowOpen = onRowOpen;
  }

  return (
    <View style={[styles.container, style]}>
      <SwipeListView {...swipeListProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
  },
});

export default RNSwipeListView; 
