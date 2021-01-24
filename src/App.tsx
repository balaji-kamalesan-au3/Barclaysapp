import { AppBar, Button, Container, Typography } from '@material-ui/core';
import { RowModel,  } from '@material-ui/data-grid';
import React, { ChangeEvent } from 'react';
import './App.css';
import TableComponent from './Components/TableComponent';
import MuiAlert from '@material-ui/lab/Alert'
import BookCard from './Components/BookCard';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

interface AppState {
  data : Array<ModifiedBook>,
  isLoading : boolean,
  staticData : Array<ModifiedBook>,
  cartList : Array<cartBook>,
  selectedBook : RowModel | null,
  isCartOpen : boolean
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
  ratings_count : number,
  Image : string,

}

export interface cartBook {
  id: any,
  bookID : Number,
  title : string,
  authors : string,
  average_rating : number,
  isbn : number,
  language_code : string,
  price : number,
  ratings_count : number,
  Image : string,
  quantity : number
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
        selectedBook : null,
        isCartOpen : false,
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

  createObject( id : any,
    bookID : Number,
    title : string,
    authors : string,
    average_rating : number,
    isbn : number,
    language_code : string,
    price : number,
    ratings_count : number,
    Image : string,
    quantity : number){
    return {
        Image,authors,average_rating,bookID,isbn,language_code,price,ratings_count,title,quantity,id
    }
  }

  addtoCart(data : RowModel){
    console.log(data);
      let {id,bookID,title,authors,average_rating,isbn,language_code,price,ratings_count,Image} = data;
      let quantity =1
      let modBook : cartBook = this.createObject(id,bookID,title,authors,average_rating,isbn,language_code,price,ratings_count,Image,quantity);

      let newCart = this.state.cartList;
      let index = newCart.findIndex((book) => book.bookID === modBook.bookID);
      console.log(index);
      if(index === -1) newCart.push(modBook)
      else{
        newCart[index].quantity++;
      }
      this.setState({cartList : newCart})
  }

  RemoveFromCart(data : RowModel){
    let newCart = this.state.cartList;
    let index = newCart.findIndex((book) => book.bookID === data.bookID);
    if(index !== -1 && newCart[index].quantity > 1){
       newCart[index].quantity--;
    }
    else {
      newCart.splice(index,1)
    }
    this.setState({cartList : newCart});
  }


  handleonChange(event : ChangeEvent<HTMLInputElement>){
      let newData = [];
      let term = event.target.value.toLowerCase();
      newData = this.state.staticData.filter((book) => {
          return  book.authors.toString().toLowerCase().includes(term) || book.title.toString().toLowerCase().includes(term);
      })
      this.setState({data : newData , isLoading : false})
  }

  setSelectedbook(book : RowModel){
    this.setState({selectedBook : book}, () => console.log("Book Changed"))
  }

  componentDidMount() {
    fetch("http://localhost:5000/books/getAllBooks")
          .then(data => data.json())
          .then(data =>{ 
            this.setState({data : this.addId(data), staticData : this.addId(data)}, 
              () => {console.log("Loading Completed", this.state); this.setState({isLoading : false})}
              )
            })
  }

  render(){
    console.log(this.state)
    let price = this.state.cartList.map((book) => {
      return Number(book.price) * Number(book.quantity)
    })
    let sum = price.reduce((a, b) => a + b, 0)
    return (
      <div>
        <AppBar position="static" className="AppBar">
          
          <Typography variant="h6">
          <span style={{margin : "0% 2%", border:"2px solid white" , padding: "1% 2%"}}>
            <Badge badgeContent={this.state.cartList.length} color="secondary" onClick={() => this.setState({isCartOpen : !this.state.isCartOpen})}>
                <AddShoppingCartIcon />
            </Badge>
          </span>
            BookCart
          </Typography>
        </AppBar>
        <div className="SearchBarContainer">
          <input type="text" placeholder="Search Books Here" className="inputSearch" onChange={(e) =>{ this.setState({isLoading :true}); this.handleonChange(e)}} />
        </div>
        {this.state.isCartOpen && 
          <div>
              
                  <div className="CartContainer">
                      
                      {this.state.cartList.length && 
                          this.state.cartList.map(cartItem => <BookCard 
                            book={cartItem} 
                            addtocart = {(book : RowModel) => this.addtoCart(book)}
                            removefromcart = {(book : RowModel) =>  this.RemoveFromCart(book)} 
                            />)
                      }
                      {!this.state.cartList.length && 
                        <MuiAlert elevation={6} variant="filled" severity="error" className="alert">
                              No Items in Cart please add something to list here
                        </MuiAlert> }
                      {this.state.cartList.length && <Button color="primary" onClick={() => window.open("https://www.instamojo.com/@Barclaysappgayu")}  style={{
                        padding: "1%",borderRadius: "5px", borderColor: "blue"
                      }}> Proceed to Pay - {sum}</Button>}
                  </div>
          </div>
          }

        <div className="PageContainer">
       
        
        {this.state.isLoading && <h1>Data is Loading....</h1>  }
        {!this.state.isLoading && <TableComponent data={this.state.data}  changeSelectedBook = {(book : RowModel) => this.setSelectedbook(book)} />  }

        <div className="Sidebar">
            <h3 style={{textAlign: "center"}}>Cart</h3>
            {this.state.selectedBook && 
            <BookCard 
            book={this.state.selectedBook} 
            addtocart = {(book : RowModel) => this.addtoCart(book)}
            removefromcart = {(book : RowModel) =>  this.RemoveFromCart(book)}
            
            /> }
        </div>
        </div>
      </div>
    )
  }
}

export default App;
