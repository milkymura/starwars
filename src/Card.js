import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      fields: {
        name: props.name,
        birth_year: props.birth_year,
        homeworld: props.homeworld
      }
    }
  }

  handleNameChange = (field, e) => {
    const tempFields = { ...this.state.fields }
    tempFields[field] = e.target.value
    this.setState({ fields: tempFields })
  }

  handleSave = () => {
    const tempProps = { ...this.props }
    delete tempProps.onHandleUpdateUser
    delete tempProps.onHandleFavorite
    delete tempProps.planetList
    delete tempProps.favorite_index
    delete tempProps.favorite

    const { onHandleUpdateUser, id } = this.props
    const { name, birth_year, homeworld } = this.state.fields

    const userData = {
      ...tempProps,
      birth_year , 
      homeworld ,
      name 
    }

    this.setState({ isEdit: false }, () => onHandleUpdateUser(id, userData))
  }

  toggleEdit = () => {
    const { name, birth_year } = this.props
    this.setState({ 
      isEdit: !this.state.isEdit,
      fields: { name, birth_year }
    })
  }


  render() {
    const { id , name, image , birth_year, 
      planetList, homeworld_alt, favorite, favorite_index,
      onHandleFavorite
    } = this.props

    const {
      isEdit ,
      fields : {
        name: temp_name, 
        birth_year: temp_birth_year ,
        homeworld: temp_homeworld
      }
    } = this.state

    return (  
      <div className='card'>
        <div className='card-content'>
            {favorite
              ? <button onClick={() => onHandleFavorite(false, id)}>unfavorite</button>
              : <button onClick={() => onHandleFavorite(true, id)}>favorite</button>
            }
            {isEdit 
              ? <input 
                  type="text"
                  value={temp_name}
                  onChange={(e) => this.handleNameChange('name',e)}
                />
              : <div className='card-name'>{name}</div>
            }
            
            <img src={`http://localhost:3008/${image}`} alt='profile'/>
            <p>
                <span>Birthday:</span>
                {isEdit 
                  ? <input 
                      type="text"
                      value={temp_birth_year}
                      onChange={(e) => this.handleNameChange('birth_year', e)}
                    />
                  : <span>{birth_year}</span>
                }
            </p>
            <p>
                {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
                <span>Homeworld:</span>
                {isEdit 
                  ? 
                    <select 
                      value={temp_homeworld}
                      onChange={(e) => this.handleNameChange('homeworld', e)}
                    >
                      { planetList.map( planet => (
                        <option value={planet.id}>
                          {planet.name}
                        </option>
                      ))}
                    </select>
                  : <span>{homeworld_alt}</span>
                }
            </p>
            <div>
              <button onClick={this.toggleEdit}>
                Edit
              </button>
              {isEdit && (
                <button onClick={this.handleSave}>
                  Save
                </button>
              )}
            </div>
        </div>
      </div>
    )
  }
}

export default Card;
