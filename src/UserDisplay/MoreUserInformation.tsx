import { useEffect, useCallback } from 'react';
import { Box, CircularProgress } from "@material-ui/core";
import userApiClient from "../UserDisplay/userApiClient";
import { useMachine } from '@xstate/react';
import { appMachine } from '../StateManagement/Index'

function MoreUserInformation() {
  const [state, send] = useMachine(appMachine);

  const fetchSelectedUser = useCallback(async () => {
    send({type: 'LOADING', value: true})
    //Could do something here so getting the value with xstate
    const selectedUserId = localStorage.getItem('selectedUserId');
    const results = await userApiClient().get("/users", {});
    const userList = results.data;
    
    if(selectedUserId !== null){
      const selectedUser = userList.find((user: any) => {
      return user.id === JSON.parse(selectedUserId)
      })
      send({type: 'ADD_SELECTED_USER', value: selectedUser})
    }

    send({type: 'LOADING', value: false})
  }, [send]);

  useEffect(() => {
    fetchSelectedUser();
  }, [fetchSelectedUser]);

  if(!state.context.loading){
    //Could build reusable component for this
    return (
      <Box>
        <strong>First Name:</strong> {state.context.selectedUser.first_name } <br/>
        <strong>Last Name:</strong> {state.context.selectedUser.last_name } <br/>
        <strong>Email:</strong> {state.context.selectedUser.email } <br/>
        <strong>Gender:</strong> {state.context.selectedUser.gender } <br/>
        <strong>Company Name:</strong> {state.context.selectedUser.company.name } <br/>
        <strong>Company Department:</strong> {state.context.selectedUser.company.department } <br/>
      </Box>
    );
  } else {
    return (
       <CircularProgress/>
    );
  }
}

export default MoreUserInformation;
