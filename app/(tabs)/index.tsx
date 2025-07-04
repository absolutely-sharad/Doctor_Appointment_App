import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { Calendar, Clock, User } from 'lucide-react-native';
import { RootState, AppDispatch } from '@/store/store';
import { fetchAppointments, setFilter, Appointment } from '@/store/slices/appointmentsSlice';
import { SlidingFilters } from '@/components/SlidingFilters';
import { useTheme } from '@/contexts/ThemeContext';

const statusColors = {
  scheduled: '#2563EB',
  completed: '#059669',
  cancelled: '#DC2626',
};

const statusLabels = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function AppointmentsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, loading, error, filter } = useSelector((state: RootState) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const filteredAppointments = appointments.filter(appointment => 
    filter === 'all' || appointment.status === filter
  );

  // Calculate counts for each filter
  const filterCounts = {
    all: appointments.length,
    scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  const filterOptions = [
    { key: 'all', label: 'All', count: filterCounts.all },
    { key: 'scheduled', label: 'Scheduled', count: filterCounts.scheduled },
    { key: 'completed', label: 'Completed', count: filterCounts.completed },
    { key: 'cancelled', label: 'Cancelled', count: filterCounts.cancelled },
  ];

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={[styles.appointmentCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}
      onPress={() => router.push(`/appointment/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={[styles.patientName, { color: theme.colors.text }]}>{item.patientName}</Text>
          <Text style={[styles.patientAge, { color: theme.colors.textTertiary }]}>Age: {item.age}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] }]}>
          <Text style={styles.statusText}>{statusLabels[item.status]}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Clock size={16} color={theme.colors.textTertiary} />
          <Text style={[styles.infoText, { color: theme.colors.textTertiary }]}>{item.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Calendar size={16} color={theme.colors.textTertiary} />
          <Text style={[styles.infoText, { color: theme.colors.textTertiary }]}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.symptoms, { color: theme.colors.textSecondary }]} numberOfLines={2}>
        {item.symptoms}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textTertiary }]}>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => dispatch(fetchAppointments())}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Today's Appointments</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textTertiary }]}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <SlidingFilters
        filters={filterOptions}
        activeFilter={filter}
        onFilterChange={(newFilter) => dispatch(setFilter(newFilter as any))}
      />

      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <User size={48} color={theme.colors.borderLight} />
            <Text style={[styles.emptyText, { color: theme.colors.textTertiary }]}>No appointments found</Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
              {filter === 'all' ? 'No appointments scheduled for today' : `No ${filter} appointments`}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
  },
  listContainer: {
    padding: theme.spacing.lg,
  },
  appointmentCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm + 4,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  patientAge: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: theme.spacing.md,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm + 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  infoText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: 6,
  },
  symptoms: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.medium,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.sm + 4,
    borderRadius: theme.borderRadius.sm,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginTop: theme.spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: theme.spacing.xs + 4,
    textAlign: 'center',
  },
});