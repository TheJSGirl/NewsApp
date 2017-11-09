import React, { Component } from 'react';
// import list from './list.js';
import {Grid, Row, FormGroup} from 'react-bootstrap';

//default parameters to fetch data from api
const DEFAULT_QUERY = 'react';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);          


//filter the results by search
// function isSearched(searchTerm){
//   return function(item){
//     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }

class App extends Component {

  //setting up internal component state
  constructor(props){
    super(props)
    this.state = {
      results : null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,

    }
    //bind method
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //set top stories
  setTopStories(results, searchKey){
    //get the hits and page from the  result
    const{hits, page} = results;

    //meaning page is not 0, button has been clicked, page might be 1 or 2
    // const oldHits = page !==0 ? this.state.result.hits : [];

    //redifine old hits
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    
    //old hits are already available in the state
    const updateHits = [...oldHits , ...hits];

    this.setState({results:{...results,[searchKey]:{ hits : updateHits, page}}});
  }
  //fetch top stories
  fetchTopStories(searchTerm, page){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response =>response.json())
    .then(result => {
      console.log(result.hits);
      this.setTopStories(result)})
    .catch((error) => {
      console.error(error);
    })
  }

  //component did mount
  componentDidMount(){
    
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchTopStories(this.state.searchTerm,DEFAULT_PAGE );
  }

  //on search submit function
  onSubmit(event){
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }
  //search value
  searchValue(e){
    e.preventDefault();
    this.setState({searchTerm: e.target.value});
  }

  //remove method
  removeItem(id){
    const notId = item => item.objectID !== id;
    const updateList = this.state.results.hits.filter(notId);
    // this.setState({result: Object.assign({}, this.state.result, {hits: updateList})});
    this.setState({result: {...this.state.result, hits: updateList}});
  }
  render() {
    const {results, searchTerm, searchKey} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page ) || 0;
    // const list = (results && results[searchKey] && results[searchKey].hits) || [];

    // if(!result){
    //   return null;
    // }
    return (
      <div className="App">
        <Search
        onChange = {this.searchValue} 
        value = {searchTerm}
        search = {this.searchValue.bind(this)}
        onSubmit = {this.onSubmit}
        >NewsApp
        </Search>
        {results &&
          <Table
          list = {results.hits}
          searchTerm = {searchTerm}
          removeItem = {this.removeItem}
          /> 
        }
        
        <div className = "text-center alert">
          <Button
            className = "btn btn-success"
            onClick= {() => this.fetchTopStories(searchTerm, page +1)}>
            Load more
          </Button>
        </div>
       
      </div>
    );
  }
}



class Search extends Component{
  
  render(){
    const {children, onSubmit, onChange, value} = this.props;
    return(
    <Grid fluid>
      <Row>
        <div className = "jumbotron text-center">
          <form onSubmit = {onSubmit}> 
            <FormGroup>
              <h1 style = {{fontWeight: 'bold'}}>{children}</h1><hr style={{border: '2px solid black', width: '100px'}}/>
              <div className = "input-group">
                <input className = "form-control width100 searchForm" type= "text" 
                onChange = {onChange} 
                value = {value}/>
                <span className = "input-group-btn">
                <Button className = "btn btn-primary searchBtn" type= "submit">Search
                </Button>
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
    
    const {list, removeItem} = this.props;
    return(
      <div className="col-sm-10 col-sm-offset-1">
      {
          //  list.filter( isSearched(searchTerm)).map(item => 

          list.map(item =>   
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
