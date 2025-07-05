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

### Build for Production

```bash
# Build for web deployment
npm run build:web

# The built files will be in the dist/ directory
```

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

### Design Decisions

1. **Theme System**: Implemented comprehensive dark/light theme with automatic detection
2. **Typography**: Used Inter font family for modern, readable interface
3. **Color System**: Created semantic color tokens for consistent theming
4. **Spacing**: 8px base unit system for consistent layouts
5. **Animations**: Subtle micro-interactions to enhance user experience

### Technical Assumptions

1. **Platform Target**: Primarily web-focused with mobile compatibility
2. **Data Persistence**: Mock data resets on app restart (no backend integration)
3. **Authentication**: Assumed single doctor user (no login system)
4. **Offline Support**: Not implemented (requires backend integration)
5. **Real-time Updates**: Not implemented (would require WebSocket/Server-Sent Events)

### Business Logic Assumptions

1. **Appointment Scheduling**: Assumed appointments are pre-scheduled by external system
2. **Patient Data**: Mock data represents realistic medical scenarios
3. **Prescription Workflow**: Simplified prescription creation without drug interaction checks
4. **Status Management**: Doctors can update appointment status manually
5. **Data Validation**: Basic client-side validation for prescription forms

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍⚕️ About

MedConnect Pro is designed to streamline the appointment management process for healthcare professionals. The application focuses on user experience, performance, and maintainability while providing essential features for medical practice management.

---

**Built with ❤️ using Expo and React Native**
