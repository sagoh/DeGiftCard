import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthenticated = () => (
  <div>
    <h1>Please Login via Metamask!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotAuthenticated;