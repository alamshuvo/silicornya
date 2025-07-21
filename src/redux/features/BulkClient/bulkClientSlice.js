import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  clients: [],
  selectedClient: null,
  isLoading: false,
  error: null,
};

// Create slice
const bulkClientSlice = createSlice({
  name: 'bulkClient',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    selectClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearClientState: (state) => {
      state.clients = [];
      state.selectedClient = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Actions
export const {
  setClients,
  addClient,
  selectClient,
  setLoading,
  setError,
  clearClientState,
} = bulkClientSlice.actions;

// Reducer
export default bulkClientSlice.reducer;

// ✅ Selectors (Fixed from state.apiClient to state.bulkClient)
export const useApiClients = (state) => state.bulkClient.clients;
export const useSelectedClient = (state) => state.bulkClient.selectedClient;
export const useClientLoading = (state) => state.bulkClient.isLoading;
export const useClientError = (state) => state.bulkClient.error;
