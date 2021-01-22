import { Paper } from '@material-ui/core'
import React from 'react';

interface CartProps {
    booktitle : string,
    author : string
}

export default function CartComponent (props : CartProps){
    console.log(props)
    return (
        <div>
            <Paper elevation={3}>
                    <div className="BookContainer">
                        <div className="BookTitle"> {props.booktitle}</div>
                        <div className="BookAuthor"> {props.author}  </div>
                    </div>
            </Paper>
        </div>
    )
}

