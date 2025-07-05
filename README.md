# MedConnect Pro - Doctor Appointment Management App

A modern, responsive mobile application built with Expo and React Native that allows doctors to manage patient appointments, view detailed patient information, and create prescriptions. The app features a beautiful dark/light theme system and intuitive user interface.

## 🚀 Live Demo

**Deployed Application:** [https://rakshaya-doctor-appointment.netlify.app/](https://rakshaya-doctor-appointment.netlify.app/)

## 📱 Features

### Core Functionality
- **Appointment Management**: View, filter, and manage patient appointments
- **Patient Details**: Comprehensive patient information display
- **Prescription System**: Create and manage prescriptions for patients
- **Status Management**: Update appointment status (scheduled, completed, cancelled)
- **Real-time Filtering**: Sliding filter system with appointment counts

### UI/UX Features
- **Dark/Light Theme**: Automatic system theme detection with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and web platforms
- **Smooth Animations**: Micro-interactions and transitions using React Native Reanimated
- **Professional Design**: Apple-level design aesthetics with attention to detail
- **Accessibility**: Proper contrast ratios and readable typography

## 🛠 Tech Stack

### Frontend
- **Expo SDK 52.0.30** - React Native framework
- **Expo Router 4.0.17** - File-based routing system
- **TypeScript** - Type safety and better development experience
- **Redux Toolkit** - State management
- **React Native Reanimated** - Smooth animations
- **Lucide React Native** - Beautiful icon system
- **Expo Google Fonts (Inter)** - Typography system

### Backend (Mock Implementation)
- **Redux Async Thunks** - Simulated API calls
- **Mock Data** - Realistic patient and appointment data
- **Local State Management** - Prescription and appointment management

## 📁 Project Structure

```
app/
├── _layout.tsx                 # Root layout with theme provider
├── (tabs)/                     # Tab-based navigation
│   ├── _layout.tsx            # Tab bar configuration
│   ├── index.tsx              # Appointments list screen
│   ├── profile.tsx            # Doctor profile screen
│   └── settings.tsx           # Settings and preferences
├── appointment/
│   └── [id].tsx               # Dynamic appointment detail screen
└── +not-found.tsx             # 404 error screen

components/
└── SlidingFilters.tsx         # Animated filter component

contexts/
└── ThemeContext.tsx           # Theme management system

store/
├── store.ts                   # Redux store configuration
└── slices/
    ├── appointmentsSlice.ts   # Appointment state management
    └── prescriptionsSlice.ts  # Prescription state management

hooks/
└── useFrameworkReady.ts       # Framework initialization hook
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, for additional features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medconnect-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - **Web**: Open http://localhost:8081 in your browser
   - **Mobile**: Use Expo Go app to scan the QR code
   - **Simulator**: Press 'i' for iOS or 'a' for Android simulator

## 📱 Viewing on Mobile Devices

### Option 1: Expo Go App (Recommended for Development)

#### For iOS:
1. **Install Expo Go** from the App Store
2. **Start the development server** with `npm run dev`
3. **Scan the QR code** displayed in the terminal or browser using:
   - iPhone Camera app (iOS 11+)
   - Expo Go app's built-in scanner
4. **Open in Expo Go** when prompted

#### For Android:
1. **Install Expo Go** from Google Play Store
2. **Start the development server** with `npm run dev`
3. **Scan the QR code** using Expo Go app's scanner
4. **Open in Expo Go** when prompted

### Option 2: Development Build (For Production-like Testing)

For features that require native code or to test the app in a production-like environment:

#### Prerequisites:
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

#### Create Development Build:

1. **Configure EAS Build**
   ```bash
   eas build:configure
   ```

2. **Build for iOS**
   ```bash
   eas build --platform ios --profile development
   ```

3. **Build for Android**
   ```bash
   eas build --platform android --profile development
   ```

4. **Install on Device**
   - **iOS**: Install via TestFlight or direct installation
   - **Android**: Download and install the APK file

### Option 3: Local Simulators

#### iOS Simulator (macOS only):
1. **Install Xcode** from the Mac App Store
2. **Start development server** with `npm run dev`
3. **Press 'i'** in the terminal to open iOS simulator
4. **Select device** from the simulator menu

#### Android Emulator:
1. **Install Android Studio**
2. **Set up Android Virtual Device (AVD)**
3. **Start development server** with `npm run dev`
4. **Press 'a'** in the terminal to open Android emulator

### Option 4: Physical Device via USB (Advanced)

#### For iOS:
1. **Enable Developer Mode** on your iPhone
2. **Connect via USB** and trust the computer
3. **Use Xcode** to install the development build

#### For Android:
1. **Enable Developer Options** in Settings
2. **Enable USB Debugging**
3. **Connect via USB** and allow debugging
4. **Install APK** using `adb install app.apk`

### Troubleshooting Mobile Viewing

#### Common Issues:
- **QR Code not scanning**: Ensure both devices are on the same network
- **App not loading**: Check firewall settings and network connectivity
- **Performance issues**: Use development build for better performance
- **Features not working**: Some features require native code (use development build)

#### Network Requirements:
- Both computer and mobile device must be on the same WiFi network
- Corporate networks may block the connection
- Use mobile hotspot if network issues persist

### Build for Production

```bash
# Build for web deployment
npm run build:web

# Build for app stores
eas build --platform all --profile production
```

## 💳 Payments Integration

### RevenueCat for Mobile Subscriptions

When adding subscriptions or in-app purchases to the app, use **RevenueCat** - the best solution for mobile subscriptions and in-app purchases.

#### Why RevenueCat?
- Handles billing, entitlements, analytics, and receipt validation out of the box
- Supports both Apple App Store and Google Play Store billing
- Makes it easier for developers to monetize their apps without building complex infrastructure

#### Important Notes:
- **Native Code Required**: RevenueCat requires native code and will not function in Bolt's in-browser preview
- **Export Required**: Since Bolt projects are built on Expo, you'll need to export your project and open it locally (e.g., in Cursor or VS Code) to install the RevenueCat SDK
- **Development Build**: To test purchases, create a development build using the Expo Dev Client

#### Getting Started:
1. **Export your project** from Bolt to your local development environment
2. **Follow the official guide**: https://www.revenuecat.com/docs/getting-started/installation/expo
3. **Create development build** for testing purchases on real devices

#### Important:
**DO NOT use Stripe** for mobile platform subscriptions as it does not support Apple or Google billing. RevenueCat is the preferred tool for mobile subscription use cases.

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB / #3B82F6)
- **Secondary**: Green (#059669 / #10B981)
- **Accent**: Amber (#F59E0B / #FBBF24)
- **Error**: Red (#DC2626 / #EF4444)

### Typography
- **Font Family**: Inter (Regular, Medium, SemiBold, Bold)
- **Spacing System**: 8px base unit (4, 8, 16, 20, 24, 32)
- **Border Radius**: 8, 12, 16, 20px

### Theme System
- Automatic dark/light mode detection
- Manual theme toggle in settings
- Consistent color application across all components
- Proper contrast ratios for accessibility

## 📊 State Management

### Redux Store Structure
```typescript
{
  appointments: {
    appointments: Appointment[],
    loading: boolean,
    error: string | null,
    filter: 'all' | 'scheduled' | 'completed' | 'cancelled'
  },
  prescriptions: {
    prescriptions: Prescription[],
    loading: boolean,
    error: string | null
  }
}
```

### Data Models
```typescript
interface Appointment {
  id: string;
  patientName: string;
  age: number;
  symptoms: string;
  time: string;
  date: string;
  phone: string;
  email: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface Prescription {
  id: string;
  appointmentId: string;
  medicineName: string;
  dosage: string;
  instructions: string;
  createdAt: string;
}
```

## 🔧 Key Decisions & Assumptions

### Architecture Decisions

1. **File-based Routing**: Used Expo Router for intuitive navigation structure
2. **Tab Navigation**: Primary navigation pattern for easy access to main features
3. **Redux Toolkit**: Chosen for predictable state management and excellent DevTools
4. **Mock Backend**: Implemented realistic API simulation for demonstration purposes
5. **Component Modularity**: Each component focuses on a single responsibility
6. **Web-First Platform**: Default platform is Web with mobile compatibility
7. **Expo Managed Workflow**: Uses Expo managed workflow exclusively (no native code directories)

### Design Decisions

1. **Theme System**: Implemented comprehensive dark/light theme with automatic detection
2. **Typography**: Used Inter font family for modern, readable interface
3. **Color System**: Created semantic color tokens for consistent theming
4. **Spacing**: 8px base unit system for consistent layouts
5. **Animations**: Subtle micro-interactions to enhance user experience
6. **Styling**: Uses `StyleSheet.create` exclusively (no NativeWind or alternative styling libraries)

### Technical Assumptions

1. **Platform Target**: Primarily web-focused with mobile compatibility
2. **Data Persistence**: Mock data resets on app restart (no backend integration)
3. **Authentication**: Assumed single doctor user (no login system)
4. **Offline Support**: Not implemented (requires backend integration)
5. **Real-time Updates**: Not implemented (would require WebSocket/Server-Sent Events)
6. **Native APIs**: Limited to web-compatible APIs (no Haptics, Local Authentication, etc.)
7. **Error Handling**: Prefers showing errors directly in UI instead of Alert API

### Business Logic Assumptions

1. **Appointment Scheduling**: Assumed appointments are pre-scheduled by external system
2. **Patient Data**: Mock data represents realistic medical scenarios
3. **Prescription Workflow**: Simplified prescription creation without drug interaction checks
4. **Status Management**: Doctors can update appointment status manually
5. **Data Validation**: Basic client-side validation for prescription forms

### Framework Constraints

1. **Required Hook**: The `useFrameworkReady` hook in `app/_layout.tsx` is REQUIRED and must NEVER be removed or modified
2. **Navigation Structure**: All routes must be placed in the `/app` directory
3. **Component Organization**: Reusable components must be placed in the `/components` directory
4. **Environment Variables**: Uses Expo's environment variable system (not Vite)
5. **Font Management**: Uses `@expo-google-fonts` packages exclusively

## 🚀 Deployment

The application is deployed on Netlify and automatically builds from the main branch.

**Live URL**: https://capable-unicorn-a17b5c.netlify.app

### Deployment Configuration
- **Platform**: Web (Expo for Web)
- **Build Command**: `expo export --platform web`
- **Output Directory**: `dist/`
- **Node Version**: 18.x

## 🔮 Future Enhancements

### Backend Integration
- Real Node.js + Express backend with TypeScript
- PostgreSQL or MongoDB database
- JWT authentication system
- Real-time notifications

### Advanced Features
- Push notifications for appointment reminders
- Calendar integration
- Patient communication system
- Prescription history and drug interaction checks
- Analytics dashboard
- Multi-doctor support

### Mobile Enhancements
- Offline data synchronization
- Biometric authentication
- Camera integration for document scanning
- Voice notes for appointments
- RevenueCat integration for premium features

### Platform-Specific Features
- iOS: HealthKit integration
- Android: Google Fit integration
- Web: Progressive Web App (PWA) capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code structure and patterns
- Use TypeScript for all new code
- Implement proper error handling
- Test on multiple platforms (web, iOS, Android)
- Maintain the existing design system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍⚕️ About

MedConnect Pro is designed to streamline the appointment management process for healthcare professionals. The application focuses on user experience, performance, and maintainability while providing essential features for medical practice management.

The app demonstrates modern React Native development practices using Expo, showcasing how to build production-ready applications with beautiful UI, smooth animations, and robust state management.

---

**Built with ❤️ using Expo and React Native**
