import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clone } from "lodash";
import { Table } from "models/Table";
import { RootState, AppThunk } from "store/store";
import injector from "utils/injector";
import { logError } from "utils/logger";
import { toasterError } from "utils/toaster";

export interface HomeState {
  loading: boolean;
  patients: Table;
}

export const initialState: HomeState = {
  loading: false,
  patients: {
    colsCount: 0,
    rows: [],
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Table>) => {
      state.patients = clone(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { setPatients, setLoading } = homeSlice.actions;

// ----------------------- Selectors ---------------------------

export const selectLoading = (state: RootState): boolean => state.home.loading;
export const selectPatients = (state: RootState): Table => state.home.patients;

// ----------------------- Thunks ---------------------------

export const loadPageThunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const provider = injector.getDataProvider();
    const patients = await provider.getPatients();
    dispatch(setPatients(patients));
  } catch (error) {
    logError(error);
    toasterError("Sorry, error happend on loading patients");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const removePatientThunk =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const provider = injector.getDataProvider();
      const patients = await provider.removePatientsRow(id);
      dispatch(setPatients(patients));
    } catch (error) {
      logError(error);
      toasterError("Sorry, error happend on removing patient");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export default homeSlice.reducer;
