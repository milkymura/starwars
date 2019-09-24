import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';

import { get } from './tools/requests'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people : []
    }
  }

  componentDidMount() {
    get('people')
      .then(res => this.setState({ people : res }))
  }


  render() {
    const { people } = this.state
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar />
        { people.length !== 0 
          && people.map((info) => <Card {...info}/>) 
        }
      </div>
    );
  }
}

export default App;
