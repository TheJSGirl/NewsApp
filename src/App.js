import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import list from './list.js';


class App extends Component {

  //setting up internal component state
  constructor(props){
    super(props)
    this.state = {
      list: list,

    }
    //bind method
    this.removeItem = this.removeItem.bind(this);
  }
  removeItem(id){
    console.log('remove item');
  }
  render() {
    return (
      <div className="App">
         {
          this.state.list.map((item) => {
             return (
               <div key= {item.objectID}>
                 <h1>{item.title} by {item.author}</h1>
                 <p>numberOfComments{item.num_comments} and points{item.points}</p>
                 <button type = "button" onClick = {() => this.removeItem(item.objectID)}>Remove</button>
               </div>
             )
           })
         }
       
      </div>
    );
  }
}

export default App;
