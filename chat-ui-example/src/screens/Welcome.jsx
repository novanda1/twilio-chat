import {
  Grid,
  TextField,
  Card,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const [state, setState] = useState({ email: "", room: "" });
  const navigate = useNavigate();

  const { email, room } = state;

  const login = () => {
    if (email && room) {
      navigate("chat", {
        state: {
          room,
          email,
        },
      });
    }
  };

  const handleChange = (event) => {
    const newValue = { ...state, [event.target.name]: event.target.value };
    setState(newValue);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">ChatCuy</a>
      </div>

      <div className="flex flex-col w-[300px] mx-auto mt-40 gap-5">
        <input
          type="text"
          name="email"
          label="Email address"
          placeholder="Enter email address"
          className="input input-bordered w-full max-w-xs"
          required
          value={email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="room"
          label="Room"
          placeholder="Enter room name"
          className="input input-bordered w-full max-w-xs"
          required
          value={room}
          onChange={handleChange}
        />

        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
};

export default WelcomeScreen;
