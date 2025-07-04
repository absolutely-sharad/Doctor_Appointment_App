import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, User, Phone, Mail, Calendar, Clock, FileText, Pill, Plus, Check } from 'lucide-react-native';
import { RootState, AppDispatch } from '@/store/store';
import { createPrescription } from '@/store/slices/prescriptionsSlice';
import { updateAppointmentStatus } from '@/store/slices/appointmentsSlice';
import { useTheme } from '@/contexts/ThemeContext';

export default function AppointmentDetailScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { appointments } = useSelector((state: RootState) => state.appointments);
  const { prescriptions, loading } = useSelector((state: RootState) => state.prescriptions);
  
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');

  const appointment = appointments.find(apt => apt.id === id);
  const appointmentPrescriptions = prescriptions.filter(prescription => prescription.appointmentId === id);

  if (!appointment) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>Appointment not found</Text>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.colors.primary }]} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCreatePrescription = async () => {
    if (!medicineName.trim() || !dosage.trim()) {
      Alert.alert('Error', 'Please fill in medicine name and dosage');
      return;
    }

    try {
      await dispatch(createPrescription({
        appointmentId: id!,
        medicineName: medicineName.trim(),
        dosage: dosage.trim(),
        instructions: instructions.trim(),
      })).unwrap();
      
      // Clear form
      setMedicineName('');
      setDosage('');
      setInstructions('');
      setShowPrescriptionForm(false);
      
      Alert.alert('Success', 'Prescription created successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to create prescription');
    }
  };

  const handleStatusChange = (status: 'scheduled' | 'completed' | 'cancelled') => {
    dispatch(updateAppointmentStatus({ id: id!, status }));
    Alert.alert('Success', `Appointment marked as ${status}`);
  };

  const statusColors = {
    scheduled: theme.colors.primary,
    completed: theme.colors.success,
    cancelled: theme.colors.error,
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.textTertiary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Appointment Details</Text>
      </View>

      <View style={[styles.patientCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <View style={styles.patientHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
            <User size={32} color={theme.colors.primary} />
          </View>
          <View style={styles.patientInfo}>
            <Text style={[styles.patientName, { color: theme.colors.text }]}>{appointment.patientName}</Text>
            <Text style={[styles.patientAge, { color: theme.colors.textTertiary }]}>Age: {appointment.age}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[appointment.status] }]}>
            <Text style={styles.statusText}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</Text>
          </View>
        </View>

        <View style={[styles.contactInfo, { borderTopColor: theme.colors.border }]}>
          <View style={styles.contactRow}>
            <Phone size={16} color={theme.colors.textTertiary} />
            <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>{appointment.phone}</Text>
          </View>
          <View style={styles.contactRow}>
            <Mail size={16} color={theme.colors.textTertiary} />
            <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>{appointment.email}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.appointmentCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Appointment Information</Text>
        
        <View style={styles.infoRow}>
          <Calendar size={20} color={theme.colors.textTertiary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
            {new Date(appointment.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Clock size={20} color={theme.colors.textTertiary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>{appointment.time}</Text>
        </View>

        <View style={styles.infoRow}>
          <FileText size={20} color={theme.colors.textTertiary} />
          <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>Symptoms: {appointment.symptoms}</Text>
        </View>

        {appointment.notes && (
          <View style={[styles.notesContainer, { borderTopColor: theme.colors.border }]}>
            <Text style={[styles.notesTitle, { color: theme.colors.text }]}>Notes:</Text>
            <Text style={[styles.notesText, { color: theme.colors.textSecondary }]}>{appointment.notes}</Text>
          </View>
        )}
      </View>

      {appointment.status === 'scheduled' && (
        <View style={[styles.actionsCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
              onPress={() => handleStatusChange('completed')}
            >
              <Check size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Mark Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.error }]}
              onPress={() => handleStatusChange('cancelled')}
            >
              <Text style={[styles.cancelButtonText, { color: theme.colors.error }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.prescriptionCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <View style={styles.prescriptionHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Prescriptions</Text>
          <TouchableOpacity
            style={styles.addPrescriptionButton}
            onPress={() => setShowPrescriptionForm(!showPrescriptionForm)}
          >
            <Plus size={20} color={theme.colors.primary} />
            <Text style={[styles.addPrescriptionText, { color: theme.colors.primary }]}>Add Prescription</Text>
          </TouchableOpacity>
        </View>

        {showPrescriptionForm && (
          <View style={[styles.prescriptionForm, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.formTitle, { color: theme.colors.text }]}>New Prescription</Text>
            
            <View style={styles.formField}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>Medicine Name *</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
                value={medicineName}
                onChangeText={setMedicineName}
                placeholder="Enter medicine name"
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>

            <View style={styles.formField}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>Dosage *</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
                value={dosage}
                onChangeText={setDosage}
                placeholder="e.g., 500mg twice daily"
                placeholderTextColor={theme.colors.textTertiary}
              />
            </View>

            <View style={styles.formField}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>Instructions (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.text }]}
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Additional instructions..."
                placeholderTextColor={theme.colors.textTertiary}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity
                style={[styles.cancelFormButton, { borderColor: theme.colors.border }]}
                onPress={() => setShowPrescriptionForm(false)}
              >
                <Text style={[styles.cancelFormText, { color: theme.colors.textTertiary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleCreatePrescription}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Create Prescription</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {appointmentPrescriptions.length > 0 ? (
          <View style={styles.prescriptionsList}>
            {appointmentPrescriptions.map((prescription, index) => (
              <View key={prescription.id} style={[styles.prescriptionItem, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.prescriptionIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                  <Pill size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.prescriptionDetails}>
                  <Text style={[styles.medicineName, { color: theme.colors.text }]}>{prescription.medicineName}</Text>
                  <Text style={[styles.dosageText, { color: theme.colors.textSecondary }]}>Dosage: {prescription.dosage}</Text>
                  {prescription.instructions && (
                    <Text style={[styles.instructionsText, { color: theme.colors.textTertiary }]}>Instructions: {prescription.instructions}</Text>
                  )}
                  <Text style={[styles.prescriptionDate, { color: theme.colors.textTertiary }]}>
                    Created: {new Date(prescription.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noPrescriptions}>
            <Pill size={32} color={theme.colors.borderLight} />
            <Text style={[styles.noPrescriptionsText, { color: theme.colors.textTertiary }]}>No prescriptions yet</Text>
            <Text style={[styles.noPrescriptionsSubtext, { color: theme.colors.textTertiary }]}>
              Add a prescription to get started
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: theme.spacing.xs + 4,
    marginRight: theme.spacing.sm + 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  patientCard: {
    margin: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
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
  contactInfo: {
    borderTopWidth: 1,
    paddingTop: theme.spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs + 4,
  },
  contactText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: theme.spacing.sm + 4,
  },
  appointmentCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm + 4,
  },
  infoText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: theme.spacing.sm + 4,
    flex: 1,
  },
  notesContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
  },
  notesTitle: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.xs + 4,
  },
  notesText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    lineHeight: 20,
  },
  actionsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm + 4,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm + 4,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs + 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  prescriptionCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: 40,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  addPrescriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addPrescriptionText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  prescriptionForm: {
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  formTitle: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  formField: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm + 4,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm + 4,
  },
  cancelFormButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 4,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelFormText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  submitButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 4,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  prescriptionsList: {
    gap: theme.spacing.sm + 4,
  },
  prescriptionItem: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
  },
  prescriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm + 4,
  },
  prescriptionDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginBottom: 4,
  },
  prescriptionDate: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.regular,
  },
  noPrescriptions: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  noPrescriptionsText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginTop: theme.spacing.sm + 4,
  },
  noPrescriptionsSubtext: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.lg,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
});