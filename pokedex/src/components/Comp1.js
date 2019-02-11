import React from 'react'
import './Comp1.css'

const suggest = (e,pokemons)=>{
    if(e !== ''){
      console.clear()
      pokemons.forEach(poke=>{
        if(poke.toLowerCase().startsWith(e.toLowerCase())) {
          
          console.log(poke)
        }
      })
    }
}

const changeState = (e) =>{
    if(e.keyCode === 13){
      console.log('enter pressed')
    }
  }

const Component1 = (props) =>{
    
    return <>
    <div className='row col-12 topred'></div>
    <div className = 'row'>
        <div className='col-4'>
            <img className='img' src='https://i.ebayimg.com/images/g/HCgAAOxy63FSrBOH/s-l300.jpg'/>
        </div>
        <div className='col-4'>
            <h2 style={{color:"red"}}>Pursuit Pokedex</h2> 
            <input className='input' type="text" placeholder='Search...' onChange={e=>suggest(e.target.value,props.pokemons)} onKeyDown={e=>changeState(e)}/>
        </div>    
        <div className = 'col-4'>
            <img style={{float:'right'}} className='img' src='https://i.ebayimg.com/images/g/HCgAAOxy63FSrBOH/s-l300.jpg'/>
        </div>
    </div>
    </>
    
}

export default Component1




       
