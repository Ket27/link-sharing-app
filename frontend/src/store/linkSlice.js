import { createSlice } from "@reduxjs/toolkit";

const linkSlice = createSlice({
  name: "links",
  initialState: { linksDetails: 0 },
  reducers: {
    setLinksDetails: (state, action) => {
      state.linksDetails = action.payload;
    },
  },
});

export const linksActions = linkSlice.actions;
export default linkSlice;
