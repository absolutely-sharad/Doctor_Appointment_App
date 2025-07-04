import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Prescription {
  id: string;
  appointmentId: string;
  medicineName: string;
  dosage: string;
  instructions: string;
  createdAt: string;
}

interface PrescriptionsState {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
}

const initialState: PrescriptionsState = {
  prescriptions: [],
  loading: false,
  error: null,
};

export const createPrescription = createAsyncThunk(
  'prescriptions/createPrescription',
  async (prescriptionData: Omit<Prescription, 'id' | 'createdAt'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock API response
    return {
      id: Date.now().toString(),
      ...prescriptionData,
      createdAt: new Date().toISOString(),
    };
  }
);

const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {
    clearPrescriptionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions.push(action.payload);
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create prescription';
      });
  },
});

export const { clearPrescriptionError } = prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;