import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from '../../../config/config';
import BlogInternalView from './BlogInternalView';

export default class BlogInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      visibleForm: false,
      shown: 0
    };
  }

  componentDidMount() {
    this.getComments()
      .then(result => (
        this.setState({
          comments: result.slice(0, 3),
          shown: 3
        })
      ));
  }

  getComments = () => {
    const { currentBlog } = this.props;
    return fetch(`${Config.apiUrl}/${currentBlog.id}/comments`)
      .then(result => result.json());
  };

  loadMoreComments = () => {
    const { shown } = this.state;
    this.getComments()
      .then(result => (
        this.setState(({ comments }) => {
          return {
            comments: comments.concat(result.slice(shown, shown + 8)),
            shown: shown + 8
          };
        })
      ));
  };

  showForm = (e) => {
    if (e.target.parentNode.closest('body').classList.contains('overflow')) {
      e.target.parentNode.closest('body').classList.remove('overflow');
    } else {
      e.target.parentNode.closest('body').classList.add('overflow');
    }
    this.setState(({ visibleForm }) => {
      return {
        visibleForm: !visibleForm
      };
    });
  };

  render() {
    const {
      currentBlog, internal, edit
    } = this.props;
    const { comments, visibleForm } = this.state;
    return (
      <BlogInternalView
        photo={currentBlog.photo}
        title={currentBlog.title}
        user={currentBlog.user}
        content={currentBlog.content}
        internal={internal}
        comments={comments}
        loadMore={this.loadMoreComments}
        edit={edit}
        visibleForm={visibleForm}
        showForm={this.showForm}
      />
    );
  }
}

BlogInternal.propTypes = {
  currentBlog: PropTypes.shape({}).isRequired,
  internal: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired
};
