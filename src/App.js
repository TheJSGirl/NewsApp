import React, { Component } from 'react';
// import list from './list.js';
import {Grid, Row, FormGroup} from 'react-bootstrap';

//default parameters to fetch data from api
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);          


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
      result : null,
      searchTerm: DEFAULT_QUERY,

    }
    //bind method
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
  }

  //set top stories
  setTopStories(result){
    this.setState({result: result});
  }
  //fetch top stories
  fetchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
    .then(response =>response.json)
    .then(result => {
      console.log(result.hits);
      this.setTopStories(result)})
    .catch((error) => {
      console.error(error);
    })
  }

  //component did mount
  componentDidMount(){
    this.fetchTopStories(this.state.searchTerm);
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
    const {result, searchTerm} = this.state;

    if(!result){
      return null;
    }
    return (
      <div className="App">
        <Search
        onChange = {this.searchValue} 
        value = {searchTerm}
        search = {this.searchValue.bind(this)}
        >NewsApp
        </Search>
        <Table
        list = {result.hits}
        searchTerm = {searchTerm}
        removeItem = {this.removeItem}
        />
       
      </div>
    );
  }
}



class Search extends Component{
  
  render(){
    const {children} = this.props;
    return(
    <Grid fluid>
      <Row>
        <div className = "jumbotron text-center">
          <form>
            <FormGroup>
              <h1 style = {{fontWeight: 'bold'}}>{children}</h1><hr style={{border: '2px solid black', width: '100px'}}/>
              <div className = "input-group">
                <input className = "form-control width100 searchForm" type= "text" 
                onChange = {this.props.onChange} 
                value = {this.props.value}/>
                <span className = "input-group-btn">
                <button className = "btn btn-primary searchBtn" type= "submit">Search
                </button>
                </span>
              </div>
            </FormGroup>
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
      <div className="col-sm-10 col-sm-offset-1">
      {
           list.filter( isSearched(searchTerm)).map(item => 
            
               <div key= {item.objectID}>
                 <h1>{item.title}</h1>
                 <h4>{item.author} | {item.num_comments}Comments | {item.points} Points
                 <Button 
                 className = "btn btn-danger btn-xs"
                  type = "button"
                  onClick = {() => 
                  removeItem(item.objectID)}
                  >Remove
                  </Button>
                  </h4><hr/>
               </div>
               )
      }
      </div>
    )
  }
}

class Button extends Component{
  render(){
    const{type, onClick, children, className = ''} = this.props;
    return(
      <button 
      className={className}
      type = {type} 
      onClick = {onClick}>{children}</button>
      
    )
  }
}


export default App;
