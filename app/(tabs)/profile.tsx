import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { User, Mail, Phone, MapPin, Calendar, Award, Settings, LogOut } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const doctorInfo = {
    name: 'Dr. Sharad Singh Kushwaha',
    speciality: 'Internal Medicine',
    experience: '8 years',
    rating: '4.9',
    email: 'dr.sharad.med@clinic.com',
    phone: '+91 (555) 123-4567',
    address: 'Medical Center, 123 Health St, City',
    patients: '1,250+',
    appointments: '5,000+',
  };

  const menuItems = [
    { id: 1, title: 'Account Settings', icon: Settings, action: () => {} },
    { id: 2, title: 'Notifications', icon: Mail, action: () => {} },
    { id: 3, title: 'Help & Support', icon: Phone, action: () => {} },
    { id: 4, title: 'About', icon: Award, action: () => {} },
    { id: 5, title: 'Sign Out', icon: LogOut, action: () => {}, danger: true },
  ];

  const styles = createStyles(theme);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
      </View>

      <View style={[styles.profileCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/26886763/pexels-photo-26886763.jpeg' }}
            style={styles.profileImage}
          />
          <View style={[styles.onlineIndicator, { backgroundColor: theme.colors.success }]} />
        </View>

        <View style={styles.profileInfo}>
          <Text style={[styles.doctorName, { color: theme.colors.text }]}>{doctorInfo.name}</Text>
          <Text style={[styles.specialty, { color: theme.colors.primary }]}>{doctorInfo.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.rating, { color: theme.colors.accent }]}>★ {doctorInfo.rating}</Text>
            <Text style={[styles.experience, { color: theme.colors.textTertiary }]}>{doctorInfo.experience} experience</Text>
          </View>
        </View>

        <View style={[styles.contactInfo, { borderTopColor: theme.colors.border }]}>
          <View style={styles.contactRow}>
            <Mail size={16} color={theme.colors.textTertiary} />
            <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>{doctorInfo.email}</Text>
          </View>
          <View style={styles.contactRow}>
            <Phone size={16} color={theme.colors.textTertiary} />
            <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>{doctorInfo.phone}</Text>
          </View>
          <View style={styles.contactRow}>
            <MapPin size={16} color={theme.colors.textTertiary} />
            <Text style={[styles.contactText, { color: theme.colors.textSecondary }]}>{doctorInfo.address}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.statsCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.statsTitle, { color: theme.colors.text }]}>Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <User size={24} color={theme.colors.primary} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{doctorInfo.patients}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textTertiary }]}>Patients</Text>
          </View>
          <View style={styles.statItem}>
            <Calendar size={24} color={theme.colors.secondary} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{doctorInfo.appointments}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textTertiary }]}>Appointments</Text>
          </View>
          <View style={styles.statItem}>
            <Award size={24} color={theme.colors.error} />
            <Text style={[styles.statNumber, { color: theme.colors.text }]}>{doctorInfo.rating}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textTertiary }]}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={[styles.menuCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.menuTitle, { color: theme.colors.text }]}>Settings</Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { borderBottomColor: theme.colors.borderLight }]}
            onPress={item.action}
          >
            <View style={styles.menuItemLeft}>
              <item.icon 
                size={20} 
                color={item.danger ? theme.colors.error : theme.colors.textTertiary} 
              />
              <Text style={[
                styles.menuItemText,
                { color: item.danger ? theme.colors.error : theme.colors.text }
              ]}>
                {item.title}
              </Text>
            </View>
            <Text style={[styles.menuItemArrow, { color: theme.colors.textTertiary }]}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textTertiary }]}>
          MedConnect Pro v1.0.0
        </Text>
        <Text style={[styles.footerSubtext, { color: theme.colors.textTertiary }]}>
          Professional Medical Management System
        </Text>
      </View>
    </ScrollView>
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
  headerTitle: {
    fontSize: 28,
    fontFamily: theme.typography.fontFamily.bold,
  },
  profileCard: {
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.border,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: '38%',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  doctorName: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.medium,
    marginBottom: theme.spacing.xs + 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + 4,
  },
  rating: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  experience: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  contactInfo: {
    borderTopWidth: 1,
    paddingTop: theme.spacing.lg,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm + 4,
  },
  contactText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: theme.spacing.sm + 4,
    flex: 1,
  },
  statsCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    marginTop: theme.spacing.xs + 4,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  },
  menuCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
    marginLeft: theme.spacing.sm + 4,
  },
  menuItemArrow: {
    fontSize: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingBottom: 60,
  },
  footerText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.medium,
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 4,
  },
});