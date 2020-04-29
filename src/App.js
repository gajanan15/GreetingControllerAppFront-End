import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './Component/Greeting';
// import data from './data/data.json';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      btnFlag:true,
      firstname:"",
      lastname:"",
      Content:"Hello  ",
      id:0,
      data:[]
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }


  addGreeting=(event) =>{
    this.setState({
      btnFlag:true
    })
  }

  handleChangeName = ({target}) =>{
    this.setState({
          [target.name]:target.value
    })    
  }


deleteEvent(dataId){
  console.log(this.state.data)
  const {data} = this.state;;
  this.setState({
    data : data.filter(data => data.id !== dataId)
  })
}

editEvent(dataId,firstname,lastname){
  this.setState({
    firstname:firstname,
    lastname:lastname,
    id : dataId
  })
}

  handleSubmit(e) { 
    e.preventDefault();
    if (this.state.firstname.length === 0 && this.state.lastname.length === 0) {
      return;
    }
    const newItem = {
    Content: this.state.Content.concat(this.state.firstname + "  " + this.state.lastname),
    id: this.state.data.length + 1,
    firstname:this.state.firstname,
    lastname:this.state.lastname
    };
    this.setState(state => ({
      data: state.data.concat(newItem),
     firstname:"",
    lastname:""
    }));
  }
 
  addGreetingFunction = e => {
    const addbtnFlag = this.state.btnFlag
    if(addbtnFlag){
       document.getElementById('information').style.display = 'block';
       this.setState({btnFlag:false});
     }else{
       document.getElementById('information').style.display = 'none';
       this.setState({btnFlag:true});
     }
   }
 

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={this.addGreetingFunction}>ADD GREETING</button> 
        <div id="information" className="model">
            <input type="text" name="firstname"  value={this.state.firstname} onChange={this.handleChangeName} placeholder="Enter First Name"/>&nbsp;&nbsp;
            <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChangeName} placeholder="Enter Last Name"/>&nbsp;&nbsp;
            <button onClick={this.handleSubmit}>Save</button>&nbsp;&nbsp;&nbsp;
            <button onClick={this.addGreetingFunction}>Cancel</button>
        </div>
          <table>
            <tbody>
              <tr>
                <th>Greeting Id</th>
                <th>Content</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
                {
                 this.state.data.map(data =>{
                  return <tr><td id="cell">{data.id}</td>
                             <td id="cell">{data.Content}</td>
                             <td><button onClick={()=>this.editEvent(data.id,data.firstname,data.lastname)}>Edit</button></td>
                             <td><button id="btnDelete" onClick={()=>this.deleteEvent(data.id)}>Delete</button></td>
                          </tr>
                  })
                }    
            </tbody>
          </table>
      </header>
    </div>
  );
}
}

export default App;
