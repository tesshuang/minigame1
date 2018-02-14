import React, { Component } from 'react';


class Rooms extends Component {
    constructor(props){
        super(props);
        
        this.showDisplay = this.showDisplay.bind(this);
    }
    
    showDisplay(roomString){
        this.props.showDisplay(roomString);
    }
    render() {
        return (
            <div>
                <button onClick={this.showDisplay.bind(this,"room1")}>Room1</button>
                <button onClick={this.showDisplay.bind(this,"room2")}>Room2</button>
                <button onClick={this.showDisplay.bind(this,"room3")}>Room3</button>
                <button onClick={this.showDisplay.bind(this,"room4")}>Room4</button>
                <button onClick={this.showDisplay.bind(this,"room5")}>Room5</button>
            </div>
        );
    }
}

export default Rooms;
