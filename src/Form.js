import React, { Component } from 'react'
import fire from './config/fire'
import './Form.css'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';


export class Form extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           user:{},
           error:''
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
clear(){
    setTimeout(() => {
        this.setState({error:''})
    }, 3000);
}
    handleLogin=(event)=>{
        event.preventDefault()
        
        fire.auth().signInWithEmailAndPassword(event.target.children[0].value,
            event.target.children[2].value)
        .then((user)=>{
            
        }).catch((err)=>{
            this.setState({error:err.message})
           

        })
this.clear()
    }


    render() {
       
       

                return (
            <div className='display' >
              
                <div className='center container '>
                   
                    <div className='head'>
                <p className='logo '>LOGO</p>
                <p className='brand '>Brand Name</p>
                </div>
                <form autoComplete='off' onSubmit={this.handleLogin}>
                <input type='email' className='form-control' placeholder='Username or Email' name='username' required />
                <br />
                <input type='password' className='form-control' placeholder='Password' name='pasword' required />
                <Fade duration={1000} bottom  when={this.state.error!==''}>
                                            <div className="invalid-feedback" style={{color:'whitesmoke', display: 'block',width:'350px'}}>
                                            <label>{this.state.error}</label> 
                                            </div>
                                        </Fade>                <div className='sub'>
                <input type='submit' value='Login' className='submit'/>
                </div>
                <Link to ="/register" className='nav-button'>Register</Link>
               
                    
                                   </form>
                    
                </div>
               
                
            </div>
        )
    }
}

export default Form
