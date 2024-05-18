import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  defaultLocation: any;
  region: {
    latitude: number;
    latitudeDelta: number;
    longitude: number;
    longitudeDelta: number;
  };
  chosenLocation: any;
  chosenRegion: {
    latitude: number;
    latitudeDelta: number;
    longitude: number;
    longitudeDelta: number;
  };
  chosenAddress: any;
  isModalVisible: boolean;
}

const initialState: State = {
  defaultLocation: {},
  region: {
    latitude: 18.44082130082575,
    latitudeDelta: 0.019175200768195566,
    longitude: 79.1182143241167,
    longitudeDelta: 0.01609325408935547,
  },
  chosenLocation: {},
  chosenRegion: {
    latitude: 18.44082130082575,
    latitudeDelta: 0.019175200768195566,
    longitude: 79.1182143241167,
    longitudeDelta: 0.01609325408935547,
  },
  chosenAddress: {},
  isModalVisible: false
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDefaultLocation: (state, action: PayloadAction<any>) => {
      state.defaultLocation = action.payload;
    },
    setChosenLocation: (state, action: PayloadAction<any>) => {
      state.chosenLocation = action.payload;
    },
    setMapRegion: (state, action: PayloadAction<any>) => {
      state.region = action.payload;
    },
    setChosenRegion: (state, action: PayloadAction<any>) => {
      state.chosenRegion = action.payload;
    },
    setChosenAddress: (state, action: PayloadAction<any>) => {
      state.chosenAddress = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<any>) => {
      state.isModalVisible = action.payload;
    }, 
    clearLocation: (state) => {
      state.chosenLocation = {};
      state.chosenRegion = {
        latitude: 18.44082130082575,
        latitudeDelta: 0.019175200768195566,
        longitude: 79.1182143241167,
        longitudeDelta: 0.01609325408935547,
      };
      state.chosenAddress = {};
    } 
  },
});

export const {
  setDefaultLocation,
  setChosenLocation,
  setMapRegion,
  setChosenRegion,
  setChosenAddress,
  setModalVisible,
  clearLocation
} = mapSlice.actions;
export default mapSlice.reducer;
