import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from '../src/context/auth';

const AuthApolloProvider = () => {
  const { auth } = useAuth();
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    headers: {
      authorization: auth.token || ''
    }
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
        <AuthApolloProvider />
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
);

