import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles.css';

import Coverflow, { Image } from '../lib/index';

import Boolean from './Boolean';
import Number from './Number';

const images = [
  'https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/content/images/2016/east_asia_tibet_by_people_in_nature_cut.jpg?itok=nnFLKRvW',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6D3u-hkHvaGcCupeqDsvZwDV0nMlPBzzxBH8IM2HRwSIDsLE3',
  'https://hdwallsource.com/img/2014/11/mountain-landscapes-29036-29753-hd-wallpapers.jpg',
  'http://www.artinstructionblog.com/wp-content/uploads/2017/06/1.jpeg',
  'https://i.pinimg.com/originals/bb/d7/ad/bbd7ad1e9145fac2d44b92f850a19bd9.jpg',
  'https://i.ytimg.com/vi/yvYOcG9cdQw/hqdefault.jpg',
  'https://i.pinimg.com/originals/fe/53/7b/fe537b3a317079ce069ca2427094264e.jpg',
  'https://arts2science.files.wordpress.com/2014/09/hillsmountains.jpg?w=460&h=345',
  'https://arts2science.files.wordpress.com/2014/09/mountainlandscape1.jpg?w=460&h=345',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OIQoR2brJP9nOc7pf4qpcaAPOocLmNYugNGIzhrtp-my4FE3vQ',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ8OPRM-1HyOVgkp45ILn2nYu5gdz8VLKqSzsXFoHfn-9q3j6UMA',
  'https://i.ytimg.com/vi/rZ4NVveCpF8/maxresdefault.jpg',
  'https://chrisgheenphoto.files.wordpress.com/2017/06/grand-teton-from-jackson-lake.jpg',
  'https://photos.smugmug.com/Landscapes/Mountain-Landscapes/i-BQFVdsW/0/1f76194b/S/Turnagain%20Arm%20Salt%20Flats-S.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9ss1QCxU4KigzMEDtMEdiJRT9HWhqKIGHGUInnHxo9OMwCOE',
  'http://russianambience.com/wp-content/uploads/2014/09/20-wonderful-mountain-landscapes-from-caucasus-you-must-see.jpg',
  'https://cdn.pixabay.com/photo/2012/08/27/14/19/evening-55067__340.png',
  'https://www.artistsnetwork.com/wp-content/uploads/2014/11/landscape-painting_how-to-paint-a-mountain-121214.jpg',
  'https://ae01.alicdn.com/kf/HTB1pI5FOFXXXXbfaXXXq6xXFXXXM/Living-room-home-wall-decoration-fabric-poster-Nature-landscapes-Armenia-mountain-landscape-canvas-painting-wall-art.jpg_640x640.jpg',
  'http://wallpaperscraft.site/ui/images/12/WDF_525063.jpg',
];

class Demo extends Component {
  state = {
    ...Coverflow.defaultProps,
    cover: true,
  };
  handleChange = nextParam => this.setState(nextParam);
  render() {
    return (
      <div>
        <h1>Demo</h1>
        <Coverflow
          {...this.state}
          onIndexChange={index => this.setState({ index })}
          key={this.state.defaultIndex}
        >
          {images.map(src => <Image alt={src} src={src} key={src} cover={this.state.cover} />)}
          <button
            style={{
              background: '#cfe',
              height: '100%',
              width: '100%',
            }}
          >
            Extra item
          </button>
        </Coverflow>

        <div
          style={{
            maxWidth: 800,
            margin: 'auto',
          }}
        >
          <h2>Container Props</h2>
          <Boolean
            name="allowArrowKeys"
            onChange={this.handleChange}
            value={this.state.allowArrowKeys}
          />
          <hr />
          <Boolean
            name="allowScroll"
            onChange={this.handleChange}
            value={this.state.allowScroll}
          />
          <hr />
          <Number
            name="index"
            onChange={this.handleChange}
            value={this.state.index}
            min={0}
            max={images.length - 1}
            type="range"
          />
          <hr />
          <Number
            name="size"
            onChange={this.handleChange}
            value={this.state.size}
            min={40}
            max={400}
            type="range"
          />
          <hr />
          <Number
            name="ratio"
            onChange={this.handleChange}
            value={this.state.ratio}
            min={0.1}
            max={2}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="offset"
            onChange={this.handleChange}
            value={this.state.offset}
            min={0.1}
            max={3}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="spacing"
            onChange={this.handleChange}
            value={this.state.spacing}
            min={0.01}
            max={1}
            step={0.01}
            type="range"
          />
          <hr />
          <Number
            name="scale"
            onChange={this.handleChange}
            value={this.state.scale}
            min={0.1}
            max={1}
            step={0.1}
            type="range"
          />
          <hr />
          <Number
            name="tailSize"
            onChange={this.handleChange}
            value={this.state.tailSize}
            min={1}
            max={images.length}
            step={1}
            type="range"
          />
          <hr />
          <h2>Image Props</h2>
          <Boolean
            name="cover"
            onChange={this.handleChange}
            value={this.state.cover}
          />
        </div>
      </div>
    );
  }
}


render(<Demo />, document.getElementById('app'));
