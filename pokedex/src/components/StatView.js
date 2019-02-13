import React, { Component } from 'react';
import axios from 'axios'


class StatView extends Component {
  constructor(props){
    super(props)
    this.state = {
      sprites : [],
      hp: 0,
      att: 0,
      spatt: 0,
      spdef: 0,
      speed: 0,
      moves:[],
      types: [],
    }
  }
  //Takes in pokemon name
  getPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur') 
    .then(res=>{
      let data = res.data;
      let sprites = [data.sprites.front_default,data.sprites.front_shiny,data.sprites.back_default,data.sprites.back_shiny];
      let moveList = [];
      let type = [];
      for(let i=0; i < data.types.length; i++){
        type.push(data.types[i].type.name)
      }
      for(let i=0; i < 3; i++){
        moveList.push(data.moves[i].move.name);
      }
      this.setState({
        sprites: sprites,
        hp: data.stats[4].base_stat,
        att: data.stats[3].base_stat,
        spatt: data.stats[2].base_stat,
        spdef: data.stats[1].base_stat,
        speed: data.stats[0].base_stat,
        moves: moveList,
        types: type,
      })
    })
  }
  toList = () =>{
    this.props.toList();
  }
  render(){
    this.getPokemon();
    return (
    <>
      <h1 onClick={this.toList}> HELLO THIS IS RETURNED</h1>
      <h1>{this.state.types}</h1>
      <h1>{this.state.speed}</h1>
    </>
    )
  }
  
}





export default StatView;