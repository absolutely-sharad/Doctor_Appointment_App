import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Bell, Moon, Globe, Shield, CircleHelp as HelpCircle, Info, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);

  const settingsOptions = [
    {
      id: 1,
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      icon: Bell,
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      id: 2,
      title: 'Dark Mode',
      subtitle: 'Toggle dark mode appearance',
      icon: Moon,
      hasSwitch: true,
      switchValue: isDark,
      onSwitchChange: toggleTheme,
    },
    {
      id: 3,
      title: 'Auto Sync',
      subtitle: 'Automatically sync appointment data',
      icon: Globe,
      hasSwitch: true,
      switchValue: autoSync,
      onSwitchChange: setAutoSync,
    },
    {
      id: 4,
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      icon: Shield,
      hasSwitch: false,
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Help & Support',
      subtitle: 'Get help or contact support',
      icon: HelpCircle,
      hasSwitch: false,
      onPress: () => {},
    },
    {
      id: 6,
      title: 'About',
      subtitle: 'App version and information',
      icon: Info,
      hasSwitch: false,
      onPress: () => {},
    },
  ];

  const styles = createStyles(theme);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textTertiary }]}>Manage your preferences</Text>
      </View>

      <View style={[styles.settingsCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>General</Text>
        
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.settingItem, { borderBottomColor: theme.colors.borderLight }]}
            onPress={option.onPress}
            activeOpacity={option.hasSwitch ? 1 : 0.7}
          >
            <View style={styles.settingItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}15` }]}>
                <option.icon size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{option.title}</Text>
                <Text style={[styles.settingSubtitle, { color: theme.colors.textTertiary }]}>{option.subtitle}</Text>
              </View>
            </View>
            
            <View style={styles.settingItemRight}>
              {option.hasSwitch ? (
                <Switch
                  value={option.switchValue}
                  onValueChange={option.onSwitchChange}
                  trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                  thumbColor={option.switchValue ? '#FFFFFF' : '#FFFFFF'}
                />
              ) : (
                <ChevronRight size={20} color={theme.colors.textTertiary} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.infoCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.infoTitle, { color: theme.colors.text }]}>App Information</Text>
        <View style={[styles.infoRow, { borderBottomColor: theme.colors.borderLight }]}>
          <Text style={[styles.infoLabel, { color: theme.colors.textTertiary }]}>Version</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text }]}>1.0.0</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomColor: theme.colors.borderLight }]}>
          <Text style={[styles.infoLabel, { color: theme.colors.textTertiary }]}>Build</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text }]}>2024.01.15</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomColor: theme.colors.borderLight }]}>
          <Text style={[styles.infoLabel, { color: theme.colors.textTertiary }]}>Developer</Text>
          <Text style={[styles.infoValue, { color: theme.colors.text }]}>MedConnect Pro</Text>
        </View>
      </View>

      <View style={[styles.dangerCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.dangerTitle, { color: theme.colors.error }]}>Danger Zone</Text>
        <TouchableOpacity style={[styles.dangerButton, { borderColor: theme.colors.error }]}>
          <Text style={[styles.dangerButtonText, { color: theme.colors.error }]}>Reset App Data</Text>
        </TouchableOpacity>
        <Text style={[styles.dangerDescription, { color: theme.colors.textTertiary }]}>
          This will remove all local data and reset the app to its default state.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textTertiary }]}>
          © 2024 MedConnect Pro. All rights reserved.
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.regular,
  },
  settingsCard: {
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  settingItemRight: {
    marginLeft: theme.spacing.md,
  },
  infoCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 4,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  dangerCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dangerTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.semiBold,
    marginBottom: theme.spacing.md,
  },
  dangerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm + 4,
  },
  dangerButtonText: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  dangerDescription: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingBottom: 60,
  },
  footerText: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'center',
  },
});