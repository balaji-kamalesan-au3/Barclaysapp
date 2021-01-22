import { AppBar, Button, InputLabel, TextField, Typography } from '@material-ui/core';
import { SelectionChangeParams } from '@material-ui/data-grid';
import React, { ChangeEvent } from 'react';
import './App.css';
import TableComponent from './Components/TableComponent';
import CartComponent from './Components/CartComponent';

interface AppState {
  data : Array<ModifiedBook>,
  isLoading : boolean,
  staticData : Array<ModifiedBook>,
  cartList : Array<ModifiedBook>,
}



export interface ModifiedBook {
  id: any,
  bookID : Number,
  title : string,
  authors : string,
  average_rating : number,
  isbn : number,
  language_code : string,
  price : number,
  ratings_count : number
}

interface AppProps{

}

class App extends React.Component<AppProps, AppState>{
  constructor(props: any){
    super(props)
    this.state={
        data :[],
        isLoading : true,
        staticData : [],
        cartList : [],
    }
  }

  addId(data: Array<ModifiedBook>){
    let newid  =0;
    let newData = data;
    newData = data.map((book) => {
        book.id = newid++;
        return book;
    })
    return newData
  }

  manageCart(data : SelectionChangeParams){
     console.log(data.rowIds);
     let newCart = data.rowIds.map(id => this.state.data[Number(id)]);
     this.setState({cartList : newCart})
  }

  handleonChange(event : ChangeEvent<HTMLInputElement>){
      let newData = [];
      let term = event.target.value.toLowerCase();
      newData = this.state.staticData.filter((book) => {
          return  book.authors.toString().toLowerCase().includes(term) || book.title.toString().toLowerCase().includes(term);
      })
      this.setState({data : newData , isLoading : false})
  }

  componentDidMount() {
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json")
          .then(data => data.json())
          .then(data =>{ 
            this.setState({data : this.addId(data), staticData : this.addId(data)}, 
              () => {console.log("Loading Completed", this.state); this.setState({isLoading : false})}
              )
            })
  }

  render(){
    console.log(this.state)
    return (
      <div>
        <AppBar position="static" className="AppBar">
          <Typography variant="h6">
            BookCart
          </Typography>
        </AppBar>
        <div className="SearchBarContainer">
          <input type="text" placeholder="Search Books Here" className="inputSearch" onChange={(e) =>{ this.setState({isLoading :true}); this.handleonChange(e)}} />
        </div>
        <div className="PageContainer">
       
        
        {this.state.isLoading && <h1>Data is Loading....</h1>  }
        {!this.state.isLoading && <TableComponent data={this.state.data} manageCart = {(li : SelectionChangeParams) => this.manageCart(li)} />  }

        <div className="Sidebar">
            <h3 style={{textAlign: "center"}}>Cart</h3>
            {this.state.cartList.map(cart => <CartComponent booktitle={String(cart.title)} author={String(cart.authors)} />)}
           { this.state.cartList.length >0 && <Button onClick={() => this.setState({cartList : [],data: this.state.staticData},() => alert("Thanks for you Purchase"))} style ={{width:"100%"}} color="primary"> Buy Cart </Button> }
        </div>
        </div>
      </div>
    )
  }



}

export default App;
