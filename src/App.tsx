import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import userApiClient from "./UserDisplay/userApiClient";
import { Box, List, ListItem, CircularProgress } from "@material-ui/core";
import { useMachine } from '@xstate/react';
import { appMachine } from './StateManagement/Index';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    border: '2px solid #f2f2f2',
    cursor: 'pointer'
  },
}));

function App() {
  const [state, send] = useMachine(appMachine);
  const navigate = useNavigate();
  const classes = useStyles();

  const fetchUserData = useCallback(async () => {
    send({type: 'LOADING', value: true})
    try {
      const results = await userApiClient().get("/users", {});
      send({type: 'ADD_USERS', value: results.data})
    } catch (e) {
      console.log(e);
    }
    send({type: 'LOADING', value: false})
  }, [send]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const showMore = (id: number) => () => {
    send({type: 'SELECT', value: id})
    navigate(`/UserDisplay/MoreUserInformation`)
  };

  if(!state.context.loading){
    return (
      <Box>
      <nav aria-label="main mailbox folders">
        <List>
        {state.context.userList.map((user: any, index) => (
          <ListItem className={classes.listItem} key={index} onClick={showMore(user.id)}>
            <div>
              {user.first_name } {user.last_name }
            </div>
          </ListItem>
        ))}
        </List>
      </nav>
      </Box>
    );
  } else {
    return (
      <CircularProgress/>
    );
  }
}

export default App;
