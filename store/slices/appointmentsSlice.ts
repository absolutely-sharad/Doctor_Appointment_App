import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
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

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'scheduled' | 'completed' | 'cancelled';
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
  error: null,
  filter: 'all',
};

// Mock API call - replace with actual API
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    return [
      {
        id: '1',
        patientName: 'Sarah Johnson',
        age: 34,
        symptoms: 'Persistent headaches, dizziness',
        time: '09:00 AM',
        date: '2024-01-15',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@email.com',
        status: 'scheduled' as const,
        notes: 'Patient reports headaches for the past week'
      },
      {
        id: '2',
        patientName: 'Michael Chen',
        age: 28,
        symptoms: 'Chest pain, shortness of breath',
        time: '10:30 AM',
        date: '2024-01-15',
        phone: '+1 (555) 987-6543',
        email: 'michael.chen@email.com',
        status: 'scheduled' as const,
        notes: 'Urgent consultation needed'
      },
      {
        id: '3',
        patientName: 'Emma Williams',
        age: 45,
        symptoms: 'Joint pain, fatigue',
        time: '02:00 PM',
        date: '2024-01-15',
        phone: '+1 (555) 456-7890',
        email: 'emma.williams@email.com',
        status: 'completed' as const,
        notes: 'Follow-up appointment required'
      },
      {
        id: '4',
        patientName: 'David Rodriguez',
        age: 52,
        symptoms: 'High blood pressure, routine check',
        time: '03:30 PM',
        date: '2024-01-15',
        phone: '+1 (555) 321-0987',
        email: 'david.rodriguez@email.com',
        status: 'scheduled' as const,
        notes: 'Regular monthly check-up'
      },
      {
        id: '5',
        patientName: 'Lisa Anderson',
        age: 31,
        symptoms: 'Skin rash, itching',
        time: '04:45 PM',
        date: '2024-01-15',
        phone: '+1 (555) 654-3210',
        email: 'lisa.anderson@email.com',
        status: 'cancelled' as const,
        notes: 'Patient cancelled due to emergency'
      }
    ];
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'scheduled' | 'completed' | 'cancelled'>) => {
      state.filter = action.payload;
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: 'scheduled' | 'completed' | 'cancelled' }>) => {
      const appointment = state.appointments.find(apt => apt.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch appointments';
      });
  },
});

export const { setFilter, updateAppointmentStatus } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;