import React from 'react';
import PropTypes from 'prop-types';
import '../../../scss/elements/blogItem/blogItem.scss';
import { Link } from 'react-router-dom';

export default function BlogItemView({
  user,
  title,
  photo,
  selectBlog,
  content, 
  id,
  url
}) {
  return (
    <div className="blogItem">
      <div className="blogItem__image">
        <Link to={url} onClick={() => { selectBlog(user, title, photo, content, id); }}>
          <img src={photo} alt="blog img" />
        </Link>
      </div>
      <div className="blogItem__title">
        <h3>
          <Link to={url} onClick={() => { selectBlog(user, title, photo, content, id); }}>
            {title}
          </Link>
        </h3>
      </div>
      <div className="blogItem__user">
        <p>{user}</p>
      </div>
    </div>
  );
}

BlogItemView.propTypes = {
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  selectBlog: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
};
