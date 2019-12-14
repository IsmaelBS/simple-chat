import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import socket from "./services/socket";
import { MdMessage } from "react-icons/md";
import GlobalStyle from "./style";
import { Form, MessageList, Typing, UsersList } from "./AppStyle";
import { randomBytes } from "crypto";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [textInput, setTextInput] = useState("");

  const [msg, setMsg] = useState([]);

  const [nickname, setNickname] = useState(null);

  const [isTyping, setIsTyping] = useState(false);

  const [usersOnline, setUsersOnline] = useState([]);

  const [someoneIsTyping, setSomeOneIsTyping] = useState({
    state: false,
    nickname: ""
  });

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("enviar", {
      message: textInput
    });
    setMsg([...msg, { message: textInput, type: "enviado" }]);
    setTextInput("");
  }

  useEffect(() => {
    socket.on("receber", response => {
      setMsg([...msg, response]);
    });

    return () => {
      socket.off("receber");
    };
  });

  useEffect(() => {
    socket.on("newConnection", response => {
      toast.info(`Usuário ${response.user} conectado!`);
    });

    return () => {
      socket.off("newConnection");
    };
  });

  useEffect(() => {
    if (isTyping) {
      socket.emit("typing", { typing: isTyping });
    }
  }, [isTyping]);

  useEffect(() => {
    socket.on("someoneIsTyping", nickname => {
      setSomeOneIsTyping({ state: true, nickname });
      setTimeout(() => setSomeOneIsTyping({ state: false, nickname }), 5000);
    });
  }, [isTyping]);

  return (
    <>
      {!nickname && (
        <button
          onClick={() => {
            const nickname = prompt("Qual seu nick?");
            setNickname(nickname);
            socket.emit("nickname", nickname);
          }}
        >
          Adicionar nome
        </button>
      )}
      <GlobalStyle />
      <ToastContainer />
      <MessageList>
        {msg.map(m =>
          m.type === "enviado" ? (
            <li key={randomBytes(10000)} className="enviado">
              {m.message}
            </li>
          ) : (
            <li key={randomBytes(10000)} className="recebido">
              <span>{m.message}</span>
              <strong>From: {m.user}</strong>
            </li>
          )
        )}
      </MessageList>
      {usersOnline.length !== 0 && (
        <UsersList>
          {usersOnline.map(user => (
            <li>{user.nickname}</li>
          ))}
        </UsersList>
      )}

      <Form onSubmit={e => sendMessage(e)}>
        {someoneIsTyping.state && (
          <Typing>{someoneIsTyping.nickname} esta digitando...</Typing>
        )}
        <input
          type="text"
          value={textInput}
          onChange={e => {
            setTextInput(e.target.value);
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
            }, 5000);
          }}
        />
        <button>
          <MdMessage size={20} color="#000" />
        </button>
      </Form>
    </>
  );
}

export default App;
