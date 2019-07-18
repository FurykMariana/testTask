import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderView() {
  return (
    <header className="header">
      <div className="container header__container">
        <h1>Blog</h1>
        <div className="header-links">
          <Link to="/">
            Home
          </Link>
          <Link to="/blog">
            Blogs
          </Link>
        </div>
      </div>
    </header>
  );
}
