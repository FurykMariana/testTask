import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from '../../../config/config';
import BlogsPageView from './BlogsPageView';
import BlogInternal from '../BlogInternal/BlogInternal';
import users from '../../../mock/users';

export default class BlogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      shown: 0,
      photos: [],
      internal: false,
      currentBlog: null,
      title: '',
      content: '',
      visibleForm: false
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.slug) {
      this.getPhotos()
        .then(result => (
          this.getBlogs(match.params.slug)
            .then((json) => {
              this.setState({
                currentBlog: {
                  user: users[json[0].userId],
                  title: json[0].title,
                  photo: result[json[0].id].url,
                  content: json[0].body,
                  id: json[0].userId,
                },
                internal: true
              });
            })
        ));
    } else {
      this.getPhotos()
        .then((data) => {
          this.getBlogs()
            .then((result) => {
              this.setState(({ blogs, shown, photos }) => {
                return {
                  blogs: blogs.concat(result.slice(shown, 18)),
                  photos: photos.concat(data.slice(shown, 18)),
                  shown: shown + 18,
                  internal: !!match.params.slug
                };
              });
            });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getPhotos()
      .then((data) => {
        this.getBlogs()
          .then((result) => {
            this.setState(({ blogs, shown, photos }) => {
              return {
                blogs: blogs.concat(result.slice(shown, 18)),
                photos: photos.concat(data.slice(shown, 18)),
                shown: shown + 18,
                internal: !!nextProps.match.params.slug
              };
            });
          });
      });
  }

  setContent = (e) => {
    this.setState({ content: e.target.value });
  };

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  addBlog = () => {
    const { title, content } = this.state;
    if (title === '' || content === '') return;
    fetch(Config.apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body: content,
        userId: 10
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        fetch(Config.apiPhoto, {
          method: 'POST',
          body: JSON.stringify({
            albumId: 1,
            id: 1,
            url: 'https://via.placeholder.com/150/92c952'
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then(result => (
            result.json()
          ))
          .then((result) => {
            this.setState(({ blogs, photos }) => {
              blogs.unshift(response);
              photos.unshift(result);
              return {
                blogs,
                photos,
                visibleForm: false
              };
            });
          });
      });
  };

  closeForm = () => {
    this.setState({ visibleForm: false });
  };

  getBlogs = (slug) => {
    let url = Config.apiUrl;
    if (slug) {
      url = `${Config.apiUrl}?title=${slug}`;
    }
    return fetch(url).then(response => (response.json()));
  };

  getPhotos = () => {
    return fetch(Config.apiPhoto).then(response => response.json());
  };

  loadMoreBlogs = () => {
    const { shown } = this.state;
    this.getPhotos()
      .then((data) => {
        this.getBlogs()
          .then((result) => {
            this.setState(({ blogs, photos }) => {
              return {
                blogs: blogs.concat(result.slice(shown, shown + 18)),
                photos: photos.concat(data.slice(shown, shown + 18)),
                shown: shown + 18,
              };
            });
          });
      });
  };

  selectBlog = (user, title, photo, content, id) => {
    this.setState({
      currentBlog: {
        user,
        title,
        photo,
        content,
        id
      },
      internal: true
    });
  };

  showForm = () => {
    this.setState({ visibleForm: true });
  };

  editBlog = (ttl, cntnt) => {
    this.setState(({ currentBlog }) => {
      return {
        currentBlog: {
          title: ttl || currentBlog.title,
          user: currentBlog.user,
          photo: currentBlog.photo,
          content: cntnt || currentBlog.content,
          id: currentBlog.id
        }
      };
    });
  };

  render() {
    const {
      blogs,
      photos,
      currentBlog,
      internal,
      visibleForm,
    } = this.state;
    return (internal
      ? (
        <BlogInternal currentBlog={currentBlog} internal={internal} edit={this.editBlog} />
      ) : (
        <BlogsPageView
          blogs={blogs}
          loadMore={this.loadMoreBlogs}
          photos={photos}
          selectBlog={this.selectBlog}
          showForm={this.showForm}
          visibleForm={visibleForm}
          setContent={this.setContent}
          setTitle={this.setTitle}
          add={this.addBlog}
          closeForm={this.closeForm}
        />
      )
    );
  }
}

BlogsPage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ slug: PropTypes.string }) }).isRequired,
  history: PropTypes.shape({}).isRequired
};
