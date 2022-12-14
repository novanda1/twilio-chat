import { Send } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Client } from "twilio-chat";
import ChatItem from "./ChatItem";
import useMessages from "./useMessage";

const ChatScreen = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const { email, room } = locationState || {};
  const { addMessage, messages, setMessages } = useMessages();

  const [mounted, setMounted] = useState(false);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState();

  const scrollDiv = useRef();

  const scrollToBottom = () => {
    if (!scrollDiv.current) return;
    const children = scrollDiv.current.children;

    if (children.length) {
      const lastItem = children[children.length - 1];
      console.log({ lastItem });
      lastItem.scrollIntoView();
    }
  };

  const joinChannel = async (_channel) => {
    if (_channel.channelState.status !== "joined") {
      await _channel.join();
    }

    setChannel(_channel);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (text) {
      setLoading(true);
      await channel.sendMessage(String(text).trim());
      setText("");
      setLoading(false);
    }
  };

  const getToken = async (email) => {
    const response = await axios.get(`http://localhost:3000/token/${email}`);
    const { data } = response;
    console.log(data)
    return data.token;
  };

  const init = async () => {
    let token = "";

    if (!email || !room) {
      navigate("/", { replace: true });
    }

    setLoading(true);

    try {
      token = await getToken(email);
    } catch (error) {
      throw new Error("Unable to get token, please reload this page");
    }

    const client = new Client(token);

    client.on("tokenAboutToExpire", async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await getToken(email);
      client.updateToken(token);
    });

    client.on("channelJoined", async (channel) => {
      // getting list of all messages since this is an existing channel
      console.log("channelJoined");
      const messages = await channel.getMessages(10);
      setMessages(messages.items);
    });

    try {
      const channel = await client.getChannelByUniqueName(room);
      joinChannel(channel);
    } catch (err) {
      try {
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });

        joinChannel(channel);
      } catch {
        throw new Error("Unable to create channel, please reload this page");
      }
    }
  };

  useEffect(() => {
    if (!mounted) setMounted(true);

    if (mounted) {
      init();
    }
  }, [mounted]);

  useEffect(() => {
    if (channel)
      channel.on("messageAdded", (m) => {
        addMessage(m);
      });
  }, [channel]);

  // scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [scrollDiv.current, scrollToBottom]);

  return (
    <div className="h-screen grid grid-rows-[100px_auto_100px] container mx-auto py-12 px-8">
      <div>
        <p>Room: {room}</p>
        <span>{email}</span>
      </div>

      <div className="overflow-auto scroll-smooth" ref={scrollDiv}>
        {messages &&
          messages.map((message) => (
            <ChatItem key={message.index} message={message} email={email} />
          ))}
      </div>

      <div className="flex flex-row mt-10 pr-16 relative rounded-2xl border overflow-hidden">
        <input
          required
          className="textarea flex-1"
          placeholder="Enter message"
          value={text}
          disabled={!channel}
          onChange={(event) => setText(event.target.value)}
        />

        <button
          onClick={sendMessage}
          disabled={!channel}
          className="absolute top-1/2 transform -translate-y-1/2 right-5"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
