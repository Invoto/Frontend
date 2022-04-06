import React from 'react'

const WebNotifierContext = React.createContext();

export const WebNotifierProvider = WebNotifierContext.Provider;
export const WebNotifierConsumer = WebNotifierContext.Consumer;

export default WebNotifierContext;
