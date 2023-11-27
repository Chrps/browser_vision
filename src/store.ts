import {
  createStore,
  createLogger,
  Store,
  useStore as baseUseStore,
} from "vuex";

export interface RootState {
  showInputImage: boolean;
  fixedWidth: number;
  isFixedWidth: boolean; // Add this property
}

const store = createStore<RootState>({
  state: {
    showInputImage: false,
    fixedWidth: 0,
    isFixedWidth: false, // Initialize with a default value
  },
  mutations: {
    updateShowInputImage(state, value) {
      state.showInputImage = value;
    },
    updateFixedWidth(state, value) {
      state.fixedWidth = value;
    },
    updateIsFixedWidth(state, value) {
      state.isFixedWidth = value;
    },
  },
  actions: {
    calculateFixedWidth({ commit }) {
      const area = window.innerWidth * window.innerHeight;
      const fixedWidth = 0.6 * Math.sqrt(area);
      commit("updateFixedWidth", fixedWidth);
    },
  },
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export function useStore(): Store<RootState> {
  return baseUseStore();
}

export default store;
