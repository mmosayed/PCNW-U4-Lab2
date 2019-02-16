import React from 'react'
import './Pokelist.css'
import LoadButton from './LoadButton'

const pokeList = (results,changeState)=>{
    return results.map((e,i)=>{
        const img = `https://img.pokemondb.net/sprites/sun-moon/icon/${e["name"]}.png`
        let num = e["url"].slice(34,38)
        if(num.length === 2) num = "# 00" + (e["url"].slice(34,35))
        else if(num.length === 3) num = "# 0" + (e["url"].slice(34,36))
        else if(num.length === 4) num = "# " + (e["url"].slice(34,37))
        return <>
            <div className='tohover borderrow' onClick={event=>{changeState({currentPokemon:e["name"],currentPage:'state'})}}> 
                <div className='col-6'>
                    <img src={img} alt="pokemon"/> 
                    {e["name"]}
                </div> 
                
                <div className='col-6'>{num}</div> 
            </div>
            </>
    })
}

const Component2 = props =>{
    return <>
    {pokeList(props.results,props.changeState)}
    
    <div className='borderrow' style={{'border-style':'none'}}>
        <div className='col'>
        <LoadButton changeState={props.changeState} offset={props.offset} results={props.results} />
        </div>
    </div> </>
}

export default Component2