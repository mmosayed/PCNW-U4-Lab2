import React from 'react'
import axios from 'axios'

const pokeListApi = (changeState,offset,results) =>{
    offset = offset + 20
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    .then(response=>{
       const updatedResults = results.concat(response.data.results)
       changeState({offset:offset,results:updatedResults})
    })
}

const LoadButton = (props)=>{
    const {changeState,offset,results} = props
    return <div><button onClick={e=>{pokeListApi(changeState,offset,results)}}>Load More</button></div>
}

export default LoadButton