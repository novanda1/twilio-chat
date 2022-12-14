import produce from "immer";
import create from "zustand";
import { combine } from "zustand/middleware";

const useMessages = create(
  combine({ messages: [] }, (set, get) => ({
    addMessage: (message) => {
      if (!message) return;
      const newState = produce(get().messages, (draft) => {
        draft.push(message);
      });

      set({ messages: newState });
    },

    setMessages: (messages) => set({ messages }),
  }))
);

export default useMessages;
