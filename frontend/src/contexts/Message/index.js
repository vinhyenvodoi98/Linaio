import { useState, createContext } from 'react';
import Message from 'components/Message';

export const MessageContext = createContext({
  status: null,
});

export const MessageProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [content, setContent] = useState(null);

  return (
    <MessageContext.Provider value={{ status, setStatus, content, setContent }}>
      {!!status && !!content ? <Message type={status} content={content} /> : <></>}
      {children}
    </MessageContext.Provider>
  );
};
