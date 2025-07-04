import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FilterOption {
  key: string;
  label: string;
  count?: number;
}

interface SlidingFiltersProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const SlidingFilters: React.FC<SlidingFiltersProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef(
    filters.reduce((acc, filter) => {
      acc[filter.key] = new Animated.Value(filter.key === activeFilter ? 1 : 0);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;

  useEffect(() => {
    // Animate filter changes
    Object.keys(animatedValues).forEach(key => {
      Animated.timing(animatedValues[key], {
        toValue: key === activeFilter ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [activeFilter, animatedValues]);

  const handleFilterPress = (filterKey: string) => {
    onFilterChange(filterKey);
    
    // Auto-scroll to center the active filter
    const filterIndex = filters.findIndex(f => f.key === filterKey);
    if (filterIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: filterIndex * 120 - 60, // Approximate centering
        animated: true,
      });
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {filters.map((filter) => {
          const isActive = filter.key === activeFilter;
          const animatedValue = animatedValues[filter.key];

          const backgroundColor = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colors.surface, theme.colors.primary],
          });

          const textColor = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.colors.textTertiary, '#FFFFFF'],
          });

          const scale = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05],
          });

          return (
            <TouchableOpacity
              key={filter.key}
              onPress={() => handleFilterPress(filter.key)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.filterButton,
                  {
                    backgroundColor,
                    transform: [{ scale }],
                  },
                ]}
              >
                <Animated.Text style={[styles.filterText, { color: textColor }]}>
                  {filter.label}
                </Animated.Text>
                {filter.count !== undefined && (
                  <Animated.View
                    style={[
                      styles.countBadge,
                      {
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : theme.colors.borderLight,
                      },
                    ]}
                  >
                    <Animated.Text
                      style={[
                        styles.countText,
                        { color: isActive ? '#FFFFFF' : theme.colors.textTertiary },
                      ]}
                    >
                      {filter.count}
                    </Animated.Text>
                  </Animated.View>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    minWidth: 80,
    justifyContent: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  countBadge: {
    marginLeft: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.medium,
  },
});