import React from 'react';
import HomeView from './HomeView';
import Config from '../../../config/config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.min_desctop = 968;
    this.min_tablets = 767;
    this.state = {
      blogs: [],
      photos: [],
      slidesToShow: 3,
      sliderButtons: true
    };
  }

  componentDidMount() {
    this.resize();
    this.getPhotos()
      .then((data) => {
        this.getBlogs()
          .then((result) => {
            this.setState({
              blogs: result.slice(0, 18),
              photos: data.slice(0, 18)
            });
          });
      });
  }

  resize = () => {
    if (window.innerWidth > this.min_desctop) {
      this.setState({ slidesToShow: 3, sliderButtons: true });
    } else if (window.innerWidth > this.min_tablets) {
      this.setState({ slidesToShow: 2, sliderButtons: true });
    } else {
      this.setState({ slidesToShow: 1, sliderButtons: false });
    }
  };

  getBlogs = () => {
    return fetch(Config.apiUrl).then(response => (response.json()));
  };

  getPhotos = () => {
    return fetch(Config.apiPhoto).then(response => response.json());
  };

  render() {
    const {
      blogs, photos, slidesToShow, sliderButtons 
    } = this.state;
    return (
      <HomeView blogs={blogs} photos={photos} slidesToShow={slidesToShow} sliderButtons={sliderButtons} />
    );
  }
}

export default Home;
