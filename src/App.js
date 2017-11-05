import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import list from './list.js';
import {Grid, Row} from 'react-bootstrape';


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
      list,
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
        <Search
        onChange = {this.searchValue} 
        value = {searchTerm}
        search = {this.searchValue.bind(this)}
        />
        <Table
        list = {list}
        searchTerm = {searchTerm}
        removeItem = {this.removeItem}
        />
       
      </div>
    );
  }
}



class Search extends Component{
  
  render(){
  console.log('props value',this.props);
  
    return(
    <Grid>
      <Row>
        <div className= "jumbotron">
          <form>
            <input type= "text" 
            onChange = {this.props.onChange} 
            value = {this.props.value}/>
        </form>
        </div>
      </Row>
    </Grid>
    )
  }

}

class Table extends Component{
  
  render(){
    const {list, searchTerm, removeItem} = this.props;
    return(
      <div>
      {
           list.filter( isSearched(searchTerm)).map(item => 
            
               <div key= {item.objectID}>
                 <h1>{item.title} by {item.author}</h1>
                 <p>numberOfComments{item.num_comments} and points{item.points}</p>
                 <Button 
                  type = "button"
                  onClick = {() => 
                  removeItem(item.objectID)}
                  >Remove
                  </Button>
               </div>
               )
      }
      </div>
    )
  }
}

class Button extends Component{
  render(){
    const{type, onClick, children} = this.props;
    return(
      <button 
      type = {type} 
      onClick = {onClick}>{children}</button>
      
    )
  }
}


export default App;
