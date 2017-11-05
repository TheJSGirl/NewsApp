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
      searchTerm: ' ',

    }
    //bind method
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
  }

  //search value
  searchValue(e){

    console.log({searchTerm: e.target.value});
  }

  //remove method
  removeItem(id){
    const notId = item => item.objectID !== id;
    const updateList = this.state.list.filter(notId);
    this.setState({list: updateList});
  }
  render() {
    return (
      <div className="App">
        <form>
          <input type= "text" onChange = {this.searchValue}/>
        </form>
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
