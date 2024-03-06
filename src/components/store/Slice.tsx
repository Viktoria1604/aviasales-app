import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchKey, fetchTickets } from "./api";
import { ISearchId, ITicket, IGettedTicket } from "../../types";

interface IState{
    ticketsSort: string,
    transfer: string,
    tickets: ITicket[]
    searchId: string,
    transferAll:boolean;
    transferNone:boolean;
    transferOne:boolean;
    transferTwo:boolean;
    transferThree:boolean;
    loading: boolean;
}

const initialState:IState = {
    ticketsSort: 'cheapest',
    transfer: 'all',
    tickets: [],
    searchId: '',
    transferAll:false,
    transferNone:false,
    transferOne:false,
    transferTwo:false,
    transferThree:false,
    loading: false,
};

const sortSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTicketSort(state,action: PayloadAction<string>) {
            state.ticketsSort = action.payload
        },

        setTicketFilter(state, action:PayloadAction<string>){
            state.transfer = action.payload
        },
        setTicketTransferAll(state, action:PayloadAction<boolean>){
            state.transferAll = action.payload
        },
        setTicketTransferOne(state, action:PayloadAction<boolean>){
            state.transferOne = action.payload
        },
        setTicketTransferNone(state, action:PayloadAction<boolean>){
            state.transferNone = action.payload
        },
        setTicketTransferTwo(state, action:PayloadAction<boolean>){
            state.transferTwo = action.payload
        },
        setTicketTransferThree(state, action:PayloadAction<boolean>){
            state.transferThree = action.payload
        },
        isLoading(state, action:PayloadAction<boolean>){
            state.loading = action.payload
        },
        addTickets(state, action) {
            state.tickets.push(...action.payload);
          },
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchKey.fulfilled, (state, action: PayloadAction<ISearchId>) => {
                state.searchId = action.payload.searchId
            })
            // .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<IGettedTicket>) => {
            //     state.loading = false
            //     state.tickets = action.payload.tickets
            // })
            
    }
})
     
      


  export const {addTickets ,isLoading, setTicketSort, setTicketFilter, setTicketTransferAll, setTicketTransferOne, setTicketTransferTwo, setTicketTransferNone, setTicketTransferThree} = sortSlice.actions
  export const sortReducer = sortSlice.reducer 
