import { createAsyncThunk } from "@reduxjs/toolkit";
import{ IGettedTicket, ISearchId} from "../../types";
import { isLoading, addTickets } from "./Slice";


const link ='https://aviasales-test-api.kata.academy'


export const fetchKey = createAsyncThunk<ISearchId, void>(
    'tickets/fetchKey',
    async () => {
        const response = await fetch(`${link}/search`);
        const data = await response.json();
        return data;
    }
);

export const fetchTickets = createAsyncThunk(
    'tickets/fetchSearchTickets',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(isLoading(true));
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);

      if (!response.ok) {
        throw new Error('error');
      }

      const data = await response.json();

      if (!data.stop) {
        dispatch(addTickets(data.tickets));
        await dispatch(fetchTickets(id));
      } else {
        dispatch(isLoading(false));
      }
    } catch (e: any) {
      if (e.message === 'error') {
        await dispatch(fetchTickets(id));
      }
      return rejectWithValue(e.message);
    }
  }
);
