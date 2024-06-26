import { NAME_TEXT_DATA } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = `Click the upper side of screen, or swipe down, to open menu, then click "Text -> load -> No file chosen" to load a text file`;

export const textSlice = createSlice({
  name: NAME_TEXT_DATA,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },    
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { set, reset } = textSlice.actions;

export default textSlice.reducer;