import React from 'react'
import axios from 'axios'

const pokeListApi = (showMore,offset,results) =>{
    offset = offset + 20
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    .then(response=>{
       const updatedResults = results.concat(response.data.results)
       showMore({offset:offset,results:updatedResults})
    })
}

const LoadButton = (props)=>{
    const {showMore,offset,results} = props
    return <div><button onClick={e=>{pokeListApi(showMore,offset,results)}}>Load More</button></div>
}

export default LoadButton