import React from 'react';
import PropTypes from 'prop-types';
import BlogItem from '../../elements/BlogItem/BlogItem';
import '../../../scss/pages/blogs/blogs.scss';
import users from '../../../mock/users';
import Button from '../../elements/Button/Button';

export default function BlogsPageView({
  blogs,
  loadMore,
  photos,
  selectBlog,
  showForm,
  visibleForm,
  setContent,
  setTitle,
  add,
  closeForm
}) {
  return (
    <div className="blogs">
      <div className="container">
        <div className="blogsContent">
          {blogs.map((post, i) => (
            <BlogItem
              key={[i, post.title].join('_')}
              user={users[post.userId]}
              title={post.title}
              path="/blog"
              url={`/blog/${post.title}`}
              photo={photos[i].url}
              selectBlog={selectBlog}
              content={post.body}
              id={post.userId}
            />
          ))}
        </div>
        <Button title="Load More" buttonClass="blogs__button" handleClick={loadMore} />
      </div>
      <div className={visibleForm ? 'newBlog visible' : 'newBlog'}>
        <div className="newBlog__form">
          <h5>
            Add new blog:
          </h5>
          <form>
            <p>Title:</p>
            <input type="text" placeholder="Title" onChange={setTitle} />
            <p>Content:</p>
            <textarea placeholder="Content" onChange={setContent} />
          </form>
          <Button title="Add" buttonClass="button-addSome" handleClick={add} />
          <Button title="Back" buttonClass="button-back" handleClick={closeForm} />
        </div>
      </div>
      <div className="blogs__addSome">
        <div className="container">
          <h4>If you want, you can add some blog! Just click right here.</h4>
          <Button title="Add" buttonClass="button-add" handleClick={showForm} />
        </div>
      </div>
    </div>
  );
}

BlogsPageView.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadMore: PropTypes.func.isRequired,
  selectBlog: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  add: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  visibleForm: PropTypes.bool.isRequired,
  showForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
};
