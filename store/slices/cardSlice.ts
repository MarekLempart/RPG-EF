    // store/slices/cardSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface CardState {
    cards: Array<{ id: string; title: string }>;
    }

    const initialState: CardState = {
    cards: []
    };

    const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCards(state, action: PayloadAction<Array<{ id: string; title: string }>>) {
        state.cards = action.payload;
        },
        addCard(state, action: PayloadAction<{ id: string; title: string }>) {
        state.cards.push(action.payload);
        }
    }
    });

    export const { setCards, addCard } = cardSlice.actions;
    export default cardSlice.reducer;
