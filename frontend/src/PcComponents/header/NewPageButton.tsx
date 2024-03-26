import React from 'react';
import { Link } from 'react-router-dom';

const NewPageButton = () => (
  <div>
    <Link to="/new" className="button">+</Link>
  </div>
);

export default NewPageButton;
