import React, { Component } from 'react'
import './App.css'
import fire from './config/fire'
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'

import Page from './Page'
import Form from './Form'
import Register from './Register'



 class App extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        user:{}
     }
   }
   componentDidMount(){
    this.authListener()
  }
  
    authListener=()=>{
      fire.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.setState({user})
        }else{
          this.setState({user:null})
        }
  
      })
    }
 
  render() {
   
    return (
      <div className="App">
         <BrowserRouter>
            <Switch >
              <Route path='/' exact render={()=>(!this.state.user?(<Form/>):(<Page user={this.state.user}/>))}/>
              <Route path='/register' exact render={()=>(!this.state.user?(<Register/>):(<Redirect to='/'/>))}/>
            </Switch>
         </BrowserRouter>
       

      
        
    </div>
    )
  }
}

export default App;
