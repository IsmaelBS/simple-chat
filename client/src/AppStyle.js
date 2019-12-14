import styled from "styled-components";
import style from "./style";

export const Form = styled.form`
  display: flex;
  max-width: 800px;
  margin: auto;
  width: 100%;
  margin-bottom: 1rem;
  position: relative;

  input {
    flex: 1;
    margin-right: 1.5rem;
    padding: 1rem;
  }

  button {
    padding: 5px;
  }
`;

export const Typing = styled.div`
  position: absolute;
  top: -30px;
  height: 30px;
  z-index: 2;
  width: 100%;
  font-size: 2rem;
  background-color: transparent;
`;

export const MessageList = styled.ul`
  flex: 1;
  max-width: 800px;
  margin-bottom: 2rem;
  overflow-y: auto;
  width: 100%;
  margin: 3rem auto;

  li {
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    padding: 2rem;
    font-size: 1.4rem;
    position: relative;
    margin-left: 25px;
  }

  li + li {
    margin-top: 2rem;
  }

  .enviado::before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    left: -25px;
    border-right: 25px solid #fff;
    border-top: 0px solid transparent;
    border-bottom: 15px solid transparent;
  }

  .recebido::before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    right: -25px;
    border-left: 25px solid #fff;
    border-top: 0px solid transparent;
    border-bottom: 15px solid transparent;
  }

  .recebido {
    margin-left: auto;
    margin-right: 25px;
    strong {
      margin-top: 3rem;
      display: block;
      text-align: right;
    }
  }
`;

export const UsersList = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  overflow-y: auto;
  padding: 30px;
  background-color: #fff;

  li {
    display: flex;
    align-items: center;
    font-size: 2rem;
  }

  li::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
    margin-right: 10px;
  }
`;
