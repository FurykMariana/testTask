import React from 'react';
import PropTypes from 'prop-types';
import '../../../scss/pages/home/home.scss';
import { Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import users from '../../../mock/users';
import BlogItem from '../../elements/BlogItem/BlogItem';

export default function HomeView({
  blogs, photos, slidesToShow, sliderButtons 
}) {
  return (
    <div className="home">
      <div className="home__content">
        <h1>Hello!</h1>
        <p>We are using fake api, so you can try to do some quirks!</p>
        <p>You can find information links in the bottom left corner</p>
        <h5>Our latest blogs:</h5>
      </div>
      <Carousel
        slidesToShow={slidesToShow}
        slideWidth={1}
        cellSpacing={10}
        withoutControls={!sliderButtons}
      >
        {blogs.map((post, i) => (
          <BlogItem
            key={[i, post.title].join('_')}
            user={users[post.userId]}
            title={post.title}
            path="/blog"
            url={`/blog/${post.title}`}
            photo={photos[i].url}
            selectBlog={() => (false)}
            content={post.body}
            id={post.userId}
          />
        ))}
      </Carousel>
      <div className="home__social">
        <Link to="https://jsonplaceholder.typicode.com/" className="home__social__typicode">
            Fake API
        </Link>
        <Link to="https://github.com/FurykMariana/testTask" className="home__social__github">
            Github
        </Link>
      </div>
    </div>
  );
}

HomeView.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  slidesToShow: PropTypes.number.isRequired,
  sliderButtons: PropTypes.bool.isRequired
};
