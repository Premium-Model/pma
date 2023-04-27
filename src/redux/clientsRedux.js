import { createSlice } from "@reduxjs/toolkit";
import client1 from '../Images/img/client1.jpg'
import client2 from '../Images/img/client2.jpg'
import client3 from '../Images/img/client3.jpg'

const initialState ={
    clients:[
        {
            id: 1,
            img: client1,
            location: "Lagos, Nigeria",
            name: "HNK FASHION",
            category: "Fashion designer",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 2,
            img: client2,
            location: "Abuja, Nigeria",
            name: "JOY FACEBEAT",
            category: "MakeUp artist",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 3,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 4,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 5,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 6,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 7,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 8,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 9,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 10,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 11,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 12,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 13,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 14,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 15,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 16,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 17,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 18,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 19,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
          {
            id: 20,
            img: client3,
            location: "Ekiti, Nigeria",
            name: "TALENT MANAGER",
            category: "Agent",
            edit: "Edit",
            delete: "Delete",
          },
    ],
    selectedClient: null

}

const clientSlice = createSlice({
    name:"clients",
    initialState,
    reducers:{
        selectClient:(state, action) =>{
            const clientId = action.payload
            state.selectedClient = state.clients.find(client => client.id === clientId)
        }
    }
})

export const {selectClient} = clientSlice.actions
export default clientSlice.reducer