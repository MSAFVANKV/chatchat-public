import React, { useState } from 'react';
import styled from "styled-components";
import Picker from "emoji-picker-react"
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';


function ChatInput({handleSendMsg}) {
    const [showemojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");
    const handleOpenEmojiPicker = () => {
        setShowEmojiPicker(!showemojiPicker)
    }

   
    const handleEmojiClick = (chosenEmoji, event) => {
        const emoji = chosenEmoji.emoji;
        setMsg(prevMsg => prevMsg + ' ' + emoji);
    };
    
    const sendChat = ( event) => {
       event.preventDefault();
       if(msg.length>0){
        handleSendMsg(msg)
        setMsg('')
       }
    };

  return (
    <Container>
        <div className="button-container">
            <div className="emoji" >
                <BsEmojiSmileFill onClick={handleOpenEmojiPicker} />
                {showemojiPicker && (
                        <div className="emoji-picker-react">
                            <Picker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
            </div>
        </div>
        {/* form */}
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder='Type your Message here' 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
                <button type='submit'>
                    <IoMdSend/>
                </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
grid-template-columns: 5% 95%;
align-items: center;
background-color: #080420;
padding: 0 2rem;
padding-bottom: 0.3rem;
@media screen and (max-width:425px)  {
    padding: 0 ;

}
.button-container{
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji{
    position: relative;
    svg{
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
   .emoji-picker-react {
        position: absolute;
        width:200px;
        top: -470px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
      
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
      
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
      
        .emoji-group::before {
          background-color: #080420;
        }
      }
      
  }
  

}
.input-container{
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input{
    width: 90%;
    height: 50%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.1rem;
    &::selection{
      background-color: #9186f3;
    }
    &:focus{
      outline: none;
    }
    @media screen and (max-width:425px)  {
        width: 100%;
        height: 50%;
    }
  }
  button{
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    svg {
      font-size:2rem;
      color:white;
    };

  }
}
`

export default ChatInput