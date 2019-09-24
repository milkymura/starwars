import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js"
import star from './images/star.svg';
import wars from './images/wars.svg';
import ReactPaginate from 'react-paginate';

import { get, put, post, remove } from './tools/requests'

const ITEMS_PER_PAGE = 10

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people : [],
      page: 0,
      planets: [],
      favorites: []
    }
  }

  componentDidMount() {
    this.handlePageReq(this.state.page)
      .then(res => this.handlePlanetUpdate(res, 1))
    this.getAllPlanets()
    this.getFavorites()
  }


  getFavorites =  async () => {
    const favorites = await get('peoplefavorites').then(res => res)
    this.setState({ favorites })
  }

  getAllPlanets = async () => {
    const planets = await get('planets').then(res => res)
    this.setState({ planets })
  }

  handleFavorite = (isFavored, dataId) => {
    console.log('handleFavorite' , isFavored, dataId)
    if (isFavored) {
      post('peoplefavorites', {dataId})
        .then( res => this.handlePageReq(this.state.page))
        .then( res => this.handlePlanetUpdate(res, this.state.page))
        .then( res => this.getFavorites())
    } else {
      remove('peoplefavorites', {dataId})
        .then( res => this.handlePageReq(this.state.page))
        .then( res => this.handlePlanetUpdate(res, this.state.page))
        .then( res => this.getFavorites())
    }
  }

  handleUpdateUser = (id, userData) => {
    put(`people/${id}`, userData)
      .then( res => this.handlePageReq(this.state.page))
      .then( res => this.handlePlanetUpdate(res, this.state.page))
  }

  handlePageReq = (page) => {
    const current = page * ITEMS_PER_PAGE
    const next = (page + 1) * ITEMS_PER_PAGE
    return get('people', current, next)
  }

  handlePlanetUpdate = async (people, page) => {
    if(people.length) {
      const { planets, favorites } = this.state 

      // replace id world to world names
      const withPlanetNames = people.map((person) => {
        const personPlanetName = planets.find(( planet  => planet.id === person.homeworld ))
        if (personPlanetName) {
          return {
            ...person,
            homeworld_alt : personPlanetName.name
          }
        }
        return { ...person }
      })

      // detect if id is favorite
      const withFavorites = withPlanetNames.map(person => {
        const isFav = favorites.findIndex( i => {
          return (i.dataId === person.id)
        })
        return isFav > 0 
          ? { ...person, favorite: true, favorite_index: isFav } 
          : { ...person, favorite: false }
      })

      this.setState({ people : withFavorites })
    }
  }

  handlePageClick = data => {
    this.handlePageReq(data.selected)
      .then(res => this.handlePlanetUpdate(res, data.selected))
  }

  render() {
    const { people , planets} = this.state
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar />
        { people.length !== 0 
          && people.map((info) => (
            <Card 
              {...info}
              onHandleUpdateUser={this.handleUpdateUser}
              onHandleFavorite={this.handleFavorite}
              planetList={planets}
            />
          )) 
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
