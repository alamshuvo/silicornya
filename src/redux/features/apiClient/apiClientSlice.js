import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  clients: [],
  selectedClient: null,
  isLoading: false,
  error: null,
};

// Create slice
const apiClientSlice = createSlice({
  name: 'apiClient',
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
} = apiClientSlice.actions;

// Reducer
export default apiClientSlice.reducer;

// Selectors
export const useApiClients = (state) => state.apiClient.clients;
export const useSelectedClient = (state) => state.apiClient.selectedClient;
export const useClientLoading = (state) => state.apiClient.isLoading;
export const useClientError = (state) => state.apiClient.error;
