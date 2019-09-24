import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';
import ReactPaginate from 'react-paginate';

import { get } from './tools/requests'

const ITEMS_PER_PAGE = 10

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people : [],
      page: 0
    }
  }


  componentDidMount() {
    this.handlePageReq(this.state.page)
      .then(res => this.handlePlanetUpdate(res, 1))
  }

  handlePageReq = (page) => {
    const current = page * ITEMS_PER_PAGE
    const next = (page + 1) * ITEMS_PER_PAGE
    return get('people', current, next)
  }

  handlePlanetUpdate = async (people, page) => {
    if(people.length) {
      const planets = await get('planets').then(res => res)
      const peopleReplacement = people.map((person) => {
        const personPlanetName = planets.find(( planet  => planet.id === person.homeworld ))
        if (personPlanetName) {
          return {
            ...person,
            homeworld : personPlanetName.name
          }
        }
      })
      this.setState({ people : peopleReplacement })
    }
  }

  handlePageClick = data => {
    this.handlePageReq(data.selected)
      .then(res => this.handlePlanetUpdate(res, data.selected))
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
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={people.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;
