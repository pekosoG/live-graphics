import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state={
    context:null,
    fullWidth:1,
    fullHeigth:1,
    zoom:10,
    change:-1
  }

  componentDidMount(){
    this.refs.canvas.width=window.innerWidth;
    this.refs.canvas.height=window.innerHeight;
    this.setState({context:this.refs.canvas.getContext('2d'),fullHeigth:window.innerHeight-20,fullWidth:window.innerWidth-20});
    this.renderGraph();
  }

  renderGraph = () =>{
    if(this.state.context!=null){
      let c=this.state.context;
      for(let y=0; y< this.state.fullHeigth;y++){
        for(let x=0;x< this.state.fullWidth; x++){
          let value= Math.floor(x/this.state.zoom * y/this.state.zoom)%2;
          c.fillStyle = value ? 'white':'black';
          c.fillRect(x,y,1,1);
        }
      }
      debugger;
      let change=this.state.change;
      if(this.state.zoom==1 && change==-1)
        change=1;
      if(this.state.zoom==10 && change==1)
        change=-1;
      console.log(this.state.zoom+change,change);
      this.setState({zoom:this.state.zoom+change,change:change});
    }
  }

  render() {
    this.renderGraph();
    return (
      <canvas ref="canvas"/>
    );
  }
}

export default App;
