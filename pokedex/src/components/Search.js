import React, {Component} from 'react'
import './Search.css'


class Component1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            search:[]
        }
    }

    handleChange = (e,pokemons)=>{
        let temp = []
        if(e === ''){
            temp = []
            this.setState({search:temp})
        }
        else if(e !== ''){
          console.clear()
          for(let i=0;i<pokemons.length;i++){
            if(pokemons[i].toLowerCase().startsWith(e.toLowerCase())) {
                console.log(pokemons[i])
                temp.push(pokemons[i])
                if(temp.length === 5) break;
              }
          }
          this.setState({search:temp})
        }
    }

    handleEnter = (e) =>{
        if(e.keyCode === 27) {
            e.target.value = ''
            this.setState({search:[]})
        }
        else if(e.keyCode === 13){
            localStorage.setItem('currentPage', 'stat');
            localStorage.setItem('currentPokemon', this.state.search[0].toLowerCase());
            if(this.state.search.length !== 0) this.props.changeState({currentPokemon:this.state.search[0].toLowerCase(),currentPage:'stat'})
        }
    }

    createElementforDropD = () =>{
        if(this.state.search.length !== 0){
            return <div id='overlay' className="card border-light mb-3">
                <div class="card-body text-light">
                {this.state.search.map(poke=>{return <p onClick={e=>{this.props.changeState({currentPokemon:poke.toLowerCase(),currentPage:'stat'})}} class="card-text">{poke}</p>})}
                </div>
                </div>
        }
        
    }

    render(){
        return <>
        <div className="row myrow">
            <div className="col-12 topred"></div>
        <div className="col-2">
            <img style={{float:'left'}} className='img' alt='pokeball' src="https://i.ebayimg.com/images/g/HCgAAOxy63FSrBOH/s-l300.jpg"/>
        </div>
        <div className="col-8 center">
            <h2 style={{color:"red"}}>Pursuit Pokedex</h2> 
            <input type="text" className="form-control" onChange={e=>this.handleChange(e.target.value,this.props.pokemons)} onKeyDown={e=>this.handleEnter(e)}/>
            {this.createElementforDropD()}
        </div>
        <div className="col-2">
            <img style={{float:'right'}} className='img' alt='pokeball' src="https://i.ebayimg.com/images/g/HCgAAOxy63FSrBOH/s-l300.jpg"/>
        </div>
        <div className="col-12">
            <div className ="col-8 endline"></div> 
        </div>
        </div>
        
        </>
    }
    
}

export default Component1




       
