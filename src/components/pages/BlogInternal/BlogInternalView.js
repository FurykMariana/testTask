import React from 'react';
import PropTypes from 'prop-types';
import '../../../scss/pages/blogInternal/blogInternal.scss';
import Button from '../../elements/Button/Button';

export default function BlogInternalView({
  photo,
  user,
  title,
  content,
  comments,
  loadMore,
  edit,
  visibleForm,
  showForm
}) {
  return (
    <div className="internal">
      <div className="internal__content">
        <div className="internal__content__banner">
          <img src={photo} alt="avatar" />
          <div className="internal__content__banner__title">
            <h3>{title}</h3>
            <p>{user}</p>
          </div>
        </div>
        <div className="internal__content__text">
          <p>{content}</p>
        </div>
        <div className="internal__content__comments">
          <h3>Comments:</h3>
          <div className="internal__content__comments__list">
            {comments.map(comment => (
              <li key={comment.name}>
                {comment.body}
              </li>
            ))}
          </div>
          <Button title="load more" buttonClass="button-load" handleClick={loadMore} />
        </div>
        <button type="button" className="button-edit" onClick={showForm}>
          edit
        </button>
      </div>
      <div className={visibleForm ? 'internal__edit' : 'hide'}>
        <div className="internal__edit__content">
          <form>
            <p>Title:</p>
            <input type="text" value={title} onChange={e => (edit(e.target.value))} />
            <p>Content:</p>
            <textarea value={content} onChange={e => (edit(false, e.target.value))} />
          </form>
          <Button title="done" buttonClass="button-done" handleClick={showForm} />
        </div>
      </div>
    </div>
  );
}

BlogInternalView.propTypes = {
  photo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadMore: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  visibleForm: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired
};
