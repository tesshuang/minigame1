import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            myImg:require("./images/img1.png"),
            myImg2:require("./images/img2.png"),
            allusers:[],
            myId:null
        }
        
        this.handleImage = this.handleImage.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://gamesocket.herokuapp.com/");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allusers:data
            })
        })
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            })
            console.log(data);
        })
        
        this.socket.on("newmove",(data)=>{
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
            console.log(data.id);
        })
        this.refs.theDisplay.addEventListener("mousemove",(ev)=>{
            if(this.state.myId === null){
                return false;
            }
            
           this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            
            
            this.socket.emit("mymove",{
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myId,
                src: this.refs["u"+this.state.myId].src
            });
        });
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src
    }
    render() {
        var allimgs= this.state.allusers.map((obj,i)=>{
            return(
                <img ref={"u"+obj} src={this.state.myImg} height={40} key={i} className="allImgs"/>
            )
        })
        console.log(this.state.myId);
        return (
            <div>
            <div ref="theDisplay"className="whole">
                {allimgs}
            </div>
            <div className="btmright">
                {this.state.myId}
                <img src={this.state.myImg} height={40} onClick={this.handleImage}/>
                <img src={this.state.myImg2} height={40} onClick={this.handleImage}/>
            </div>
            </div>
        );
    }
}

export default App;
