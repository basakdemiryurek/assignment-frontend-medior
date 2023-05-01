import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tag } from "types/Tag";

interface TagState {
  tags: Tag[];
}

const initialState: TagState = {
  tags: [],
};

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = tagSlice.actions;

export default tagSlice;
