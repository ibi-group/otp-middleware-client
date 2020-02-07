import React from 'react';

export default function Messages(props) {
  const { messages } = props;
  
  return (
    <ol>
      {messages && messages.map((m, i) => <li key={i}>{m.data}</li>)}
    </ol>
  )
}
