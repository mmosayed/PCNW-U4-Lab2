import React, { Component } from 'react';
import axios from 'axios'
import './MoveInfo.css';
import Async from 'react-promise'

const MoveInfo = (props) => {
  let moveInfo = {};
  return <Async promise={axios.get(`https://pokeapi.co/api/v2/move/${props.moveName}/`)}
    then={(res) => {
      moveInfo['acc'] = String(res.data.accuracy);
      moveInfo['type'] = String(res.data.damage_class.name);
      moveInfo['power'] = String(res.data.power);
      moveInfo['pp'] = Number(res.data.pp);
      return (
        <>
          <div className=' overlay'>
            <div class="h-100 m-50 row align-items-center  modal-dialog">
              <div class="col modal-content text-center">
                <div class="modal-header">

                  <h3 class="modal-title">{props.moveName}</h3>
                  <button type="button" class="close" onClick={props.closeMove} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4>Accuracy: {moveInfo['acc']}</h4>
                <h4>Type: {moveInfo['type']}</h4>
                <h4>Power: {moveInfo['power']}</h4>
                <h4>PP: {moveInfo['pp']}</h4>
                <div class="modal-footer"></div>
              </div>

            </div>
          </div>
        </>
      )
    }}
  />
}

export default MoveInfo;
