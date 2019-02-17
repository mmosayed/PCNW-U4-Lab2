import React, { Component } from 'react';
import axios from 'axios'
import './StatView.css';
import MoveInfo from './MoveInfo'

class StatView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sprites: [],
      hp: 0,
      att: 0,
      def: 0,
      spatt: 0,
      spdef: 0,
      speed: 0,
      moves: [],
      movesMethod: [],
      types: [],
      currentMove: '',
    }
  }
  //Takes in pokemon name
  getPokemon = (pokemon) => {
    if (pokemon === ''){return}
    else{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => {
        let data = res.data;
        let sprites = [data.sprites.front_default, data.sprites.front_shiny, data.sprites.back_default, data.sprites.back_shiny];
        let moveList = [];
        let moveMethod = [];
        let type = [];
        for (let i = 0; i < data.types.length; i++) {
          type.push(data.types[i].type.name)
        }
        for (let i = 0; i < data.moves.length; i++) {
          moveList.push(data.moves[i].move.name);
          moveMethod.push(data.moves[i].version_group_details[0].move_learn_method.name)
        }
        this.setState({
          sprites: sprites,
          hp: data.stats[5].base_stat,
          att: data.stats[4].base_stat,
          def: data.stats[3].base_stat,
          spatt: data.stats[2].base_stat,
          spdef: data.stats[1].base_stat,
          speed: data.stats[0].base_stat,
          moves: moveList,
          movesMethod: moveMethod,
          types: type,
        })
      })
  }
}
  toList = () => {
    localStorage.setItem('currentPage', 'list');
    this.props.toList();
  }
  closeMove = () => {
    this.setState({ currentMove: '' })
  }
  PokeStats = () => {
    let statList = ['Hp', 'Attack', 'Defense', 'Sp.Attack', 'Sp.Defense', 'Speed']
    return statList.map((e, i) => {
      return (<>
        <div className='col-2 statName d-flex justify-content-around' key={i}>
          {e}
        </div>
      </>)
    })
  }
  PokeNum = () => {
    let statNum = [this.state.hp, this.state.att, this.state.def, this.state.spatt, this.state.spdef, this.state.speed]
    return statNum.map((e, i) => {
      return (<>
        <div className='col-2 statNum d-flex justify-content-around' key={i}>
          {e}
        </div>
      </>)
    })
  }

  getMoves = (e) => {
    this.setState({ currentMove: e.currentTarget.innerText })
  }
  ShowMoves = () => {
    if (this.state.currentMove === '') {
      return (<></>)
    }
    else {
      return <MoveInfo moveName={this.state.currentMove} closeMove={this.closeMove} />
    }
  }

  MoveList = () => {
    return this.state.moves.map((e, i) => {
      if (this.state.movesMethod[i] === 'egg') {
        return (<>
          <div className='col-3 pt-1 pb-1 d-flex justify-content-around border border-2 border-info rounded-pill moves' key={i} onClick={this.getMoves}>
            {e}
          </div>
        </>)
      }
      if (this.state.movesMethod[i] === 'machine') {
        return (<>
          <div className='col-3 pt-1 pb-1 d-flex justify-content-around border border-2 border-success rounded-pill moves' key={i} onClick={this.getMoves}>
            {e}
          </div>
        </>)
      }
      if (this.state.movesMethod[i] === 'tutor') {
        return (<>
          <div className='col-3 pt-1 pb-1 d-flex justify-content-around border border-2 border-warning rounded-pill moves' key={i} onClick={this.getMoves}>
            {e}
          </div>
        </>)
      }
      if (this.state.movesMethod[i] === 'level-up') {
        return (<>
          <div className='col-3 pt-1 pb-1 d-flex justify-content-around border border-2 border-purple rounded-pill moves' key={i} onClick={this.getMoves}>
            {e}
          </div>
        </>)
      }
    })
  }
  componentDidMount(){
    this.getPokemon(this.props.pokemon)
  }
  componentDidUpdate(prevProps){
    if(this.props.pokemon !== prevProps.pokemon){
      this.getPokemon(this.props.pokemon)
    }
  }
  

  render() {
    
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={this.toList}><a href="#">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{this.props.pokemon}</li>
          </ol>
        </nav>
        <div className='container border border-primary rounded-pill d-flex justify-content-around'>
          <h2 className='title'>Stats</h2>
          <div className='row flex-wrap '>
            <this.PokeStats />
            <this.PokeNum />
          </div>
        </div>
        <div className='container'>
          <h2 className='title '>Moves</h2>
          <span className='sub-title'>Learned by </span>
          <span className='sub-title text-info'>Egg </span>
          <span className='sub-title text-success'>Machine </span>
          <span className='sub-title text-warning'>Tutor </span>
          <span className='sub-title text-purple'>Level-up </span>
          <p></p>
          <div className='row flex-wrap '>
            <this.MoveList />
          </div>
        </div>
        <this.ShowMoves />
      </>
    )
  }

}
export default StatView;