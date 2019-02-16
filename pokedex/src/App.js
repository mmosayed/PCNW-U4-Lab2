import React, { Component } from 'react';
import Search from './components/Search'
import Pokelist from './components/Pokelist'
import StatView from './components/StatView'
import axios from 'axios'
import './App.css';
const {pokemons} = require('./pkmn-list')

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      /* initial state is generated in the componentdidmount function */ 
      /* this is example state */
      // offset:0,
      // currentPokemon: '',
      // currentPage: 'stat', //OR stat 
      // results: [
      //   {
      //     "name": "bulbasaur",
      //     "url": "https://pokeapi.co/api/v2/pokemon/1/"
      //   },
      //   {
      //     "name": "ivysaur",
      //     "url": "https://pokeapi.co/api/v2/pokemon/2/"
      //   },
      //]
    }
    
  }

  componentDidMount(){
    console.log('mounted')
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    .then(response=>{
       //const updatedResults = results.concat(response.data.results)
       this.setState({offset:0,currentPokemon: '',currentPage: 'stat',results:response.data.results})
    })
  }
  
  toList = () =>{
    this.setState({currentPage:'list'});
  }
  
  changeState = (obj) =>{
    this.setState(obj,()=>console.log(this.state))  
  }

//METHOD THAT HANDLES Pokelist ON CLICK TO SWAP STATE.CURRENTPAGE TO STAT and SEND POKEMON NAME TO STATE
  
  View = () =>{
    if(this.state.currentPage === 'list'){
      return <>
      <Pokelist results={this.state.results} changeState={this.changeState} offset={this.state.offset} /> 
            </>
    }
    else{
      return <>
        <StatView toList={this.toList} /*currentPokemon={this.state.currentPokemon}*//>
      </>
    }
  }


  
  render() {
    return (
      <>
      <Search pokemons={pokemons} changeState={this.changeState}  />
      <this.View />  
     </>
    )
  
  }
  
}



export default App
