import React, { Component } from 'react';
import mySocket from 'socket.io-client';

class Test extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            screen:0,
            host:null,
            qobj:{
                q:null,
                o1:null,
                o2:null
            }
        }
    }
    
    componentDidMount(){
        this.socket = mySocket("https://gamesocket.herokuapp.com/");
        
        this.socket.on("newq", (data)=>{
            this.setState({
                qobj:data
            })
        });
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
        
    }
    
    handleRoom=(roomString)=>{
        this.setState({
            screen:1
        })
        
        this.socket.emit("joinroom", roomString);
    }
    
    handleHost=(isHost)=>{
        this.setState({
            screen:2,
            host:isHost
        })
    }
    
    handleQ=()=>{
        var obj = {
            q:this.refs.q.value,
            o1:this.refs.o1.value,
            o2:this.refs.o2.value,
            a:this.refs.a.value
        };
        
        this.socket.emit("createqs", obj);
    }
    
    handleA=(optionNum)=>{
        this.socket.emit("answer", optionNum);
    }
    
    render() {
        var comp = null;
        if(this.state.screen === 0){
            comp =(
                <div>
                    <button onClick={this.handleRoom.bind(this,"room1")}>Room1</button>
                    <button onClick={this.handleRoom.bind(this,"room2")}>Room2</button>
                </div>
                
            )
        }else if(this.state.screen === 1){
            comp = (
                <div>
                    <button onClick={this.handleHost.bind(this,true)}>Host</button>
                    <button onClick={this.handleHost.bind(this,false)}>Player</button>
                </div>
            )
        }else if(this.state.screen === 2){
            if(this.state.host === true){
                comp = (
                    <div>
                        <input ref="q" type="text" placeholder="Ask a question"/>
                        <input ref="o1" type="text" placeholder="option1"/>
                        <input ref="o2" type="text" placeholder="option2"/>
                        <select ref="a">
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                        <button onClick={this.handleQ}>Submit</button>
                    </div>
                )
            }else if (this.state.host === false){
                comp =(
                    <div>
                        <h2>{this.state.qobj.q}</h2>
                        <button onClick={this.handleA.bind(this, "1")}>{this.state.qobj.o1}</button>
                        <button onClick={this.handleA.bind(this, "2")}>{this.state.qobj.o2}</button>
                    </div>
                )
            }
        }
        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default Test;
