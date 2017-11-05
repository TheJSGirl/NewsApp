import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import list from './list.js';


//filter the results by search
function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

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
    e.preventDefault();
    this.setState({searchTerm: e.target.value});
  }

  //remove method
  removeItem(id){
    const notId = item => item.objectID !== id;
    const updateList = this.state.list.filter(notId);
    this.setState({list: updateList});
  }
  render() {
    const {list, searchTerm} = this.state;
    return (
      <div className="App">
        <form>
          <input type= "text" onChange = {this.searchValue}/>
        </form>
         {
           list.filter(isSearched(searchTerm)).map((item) => {
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
