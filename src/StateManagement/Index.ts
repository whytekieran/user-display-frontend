import { createMachine, assign} from 'xstate';
import { User } from '../UserDisplay/User';

export const appMachine = createMachine({
    id: 'appStateMachine',
    initial: 'appState',
    context: {
        loading: true,
        userList: [],
        selectedUser: User
    },
    states: {
        appState: { 
            on: {
              LOADING: {
                actions: 'loadingDisplay'
              },
              SELECT: {
                  actions: 'selectingUser'
              },
              ADD_USERS: {
                  actions: 'addingUser'
              },
              ADD_SELECTED_USER: {
                actions: 'addingSelectedUser'
              }
            }
        },
    }
},
{
    actions: {
      loadingDisplay: assign((context: any, event: any) => {
        return {
          loading: event.value
        }
      }),
      selectingUser: assign((context: any, event: any) => {
        localStorage.setItem('selectedUserId', event.value.toString());
      }),
      addingUser: assign((context: any, event: any) => {
        return {
          userList: event.value
        }
      }),
      addingSelectedUser: assign((context: any, event: any) => {
        return {
          selectedUser: event.value
        }
      }),
    }
});