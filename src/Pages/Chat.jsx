import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import {io} from 'socket.io-client'


function Chat() {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);


  // ==========================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/login");
        } else {
          setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Call the async function inside the useEffect
  
  }, []);
  // =================
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);

    }
  },[currentUser])
  
  // ========================================
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } else {
            navigate("/setavatar");
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    fetchContacts(); // Call the async function inside the useEffect
  
  }, [currentUser]);
  // ===================================
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} 
        currentUser={currentUser} 
        changeChat={handleChatChange}/>
        {
          currentChat === undefined ? 
          (<Welcome  currentUser={currentUser} />)
          :
          (
            <ChatContainer currentChat={currentChat} 
            currentUser={currentUser}
            socket={socket}
            />
          )
          
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #131324;
.container{
  width: 85vw;
  height: 85vh;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (max-width:720px)  {
    grid-template-columns: 35% 65%;
    // background-color: white;
  }
  @media screen and (max-width:425px)  {
    grid-template-columns: 40% 60%;
    width: 100%;
    height: 100%;
  }
}`

export default Chat