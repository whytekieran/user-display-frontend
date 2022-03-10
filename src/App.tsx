import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApiClient from "./UserDisplay/userApiClient";
import { Box, List, ListItem } from "@material-ui/core";

function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await userApiClient().get("/users", {});
      setUserData(results.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const showMore = (id: number) => () => {
    navigate(`/UserDisplay/MoreUserInformation/${id}`)
  };

  if(!loading){
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
        {userData.map((user, index) => (
          <ListItem key={index} onClick={showMore(user.id)}>
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
      /** 
       * You could make this much fancier, maybe make a nice spinner component or maybe not include
       * at all, potential nice feature
      */
      <Box>.......loading</Box>
    );
  }
}

export default App;
