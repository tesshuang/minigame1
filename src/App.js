import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './App.css';
import Rooms from './comp/Rooms';

class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            myImg:require("./images/img1.png"),
            myImg2:require("./images/img2.png"),
            allusers:[],
            myId:null,
            showtoggle:false
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.showDisplay = this.showDisplay.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
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
            });
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
        })
        
        this.socket.on("newmove",(data)=>{
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
            console.log(data.id);
        })
       /* this.refs.theDisplay.addEventListener("mousemove",(ev)=>{
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
        });*/
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src
    }
    
    showDisplay(roomString){
        this.setState({
           showtoggle:true 
        });
        
        this.socket.emit("joinroom", roomString);
    }
    leaveRoom(){
        this.setState({
           showtoggle:false 
        });
    }
    render() {
        console.log(this.state.allusers);
        var allimgs= this.state.allusers.map((obj,i)=>{
            return(
                <img ref={"u"+obj} src={this.state.myImg} height={40} key={i} className="allImgs"/>
            )
        });
        
        var comp = null;
        if(this.state.showtoggle === false){
            comp = <Rooms showDisplay= {this.showDisplay}/>
        } else{
            comp = (
            <div>
                <div ref="theDisplay"className="whole">
                {allimgs}
                </div>
                <div className="btmright">
                    {this.state.myId}
                    <img src={this.state.myImg} height={40} onClick={this.handleImage}/>
                    <img src={this.state.myImg2} height={40} onClick={this.handleImage}/>
                    <button onClick={this.leaveRoom}>Leave</button>
                </div>
            </div>
        )
        }   
        

        console.log(this.state.myId);
        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default App;
