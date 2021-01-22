import React from 'react';
import { DataGrid, SelectionChangeParams } from '@material-ui/data-grid'
import { Container } from '@material-ui/core';

interface TableProps {
    data : Array<ModifiedBook>,
    manageCart : (list: SelectionChangeParams   ) => void;
}

interface TableState {
    data : Array<ModifiedBook>
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

class TableComponent extends React.Component< TableProps,TableState>{
    constructor(props : TableProps){
        super(props);
        this.state ={
            data : []
        }
    }

    componentDidMount() {
        this.setState({data : this.props.data}, () =>  console.log(this.state))
    }

    componentDidUpdate(prevProps : TableProps) {
        if(prevProps.data.length !== this.props.data.length){
                this.setState({data : this.props.data}, () =>  console.log(this.state))
        }

    }

    render(){
        const dataColumns =[
            { field: 'bookID', headerName: 'Book ID', width: 120 },
            { field: 'title', headerName: 'Title', width: 350 },
            { field: 'price', headerName: 'Price', width: 100 },
            { field: 'language_code', headerName: 'Language', width: 100 },
            { field: 'isbn', headerName: 'ISBN', width: 150 },
            { field: 'ratings_count', headerName: 'Ratings Count', width: 150 },
            {
                field: 'average_rating',
                headerName: 'Average Rating',
                type: 'number',
                width: 150,
            },
        
        ]
        return(
            <Container>
            <div style={{ height: 900, width: '100%' }}>
                  <DataGrid rows={this.state.data} columns={dataColumns} pageSize={50} checkboxSelection onSelectionChange ={ (newSelection ) => this.props.manageCart(newSelection)} />
            </div>
            </Container>
        )
    }
}

export default TableComponent