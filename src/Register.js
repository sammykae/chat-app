import React, { Component } from 'react'
import fire from './config/fire'
import './Form.css'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';

export class Register extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           register:{},
           error:''
        }
      }


      componentDidMount(){
       this.authListener()
     }
     
       authListener=()=>{
         fire.auth().onAuthStateChanged((register)=>{
           if (register) {
             this.setState({register})
           }else{
             this.setState({register:null})
           }
     
         })
       }   


clear(){
    setTimeout(() => {
        this.setState({error:''})
    }, 3000);
}


    handleSignup=(event)=>{
        event.preventDefault()
        const username=event.target.children[2].value
        fire.auth().createUserWithEmailAndPassword(event.target.children[0].value,
            event.target.children[4].value)
        .then((user)=>{
            const use = fire.auth().currentUser;
            return use.updateProfile({
              displayName:username
            }) 
           
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
                <form autoComplete='off' onSubmit={this.handleSignup}>
                <input type='email' className='form-control'  placeholder='Email' name='username' required />
                <br />
                <input type='text' className='form-control' placeholder='username' name='username' required />
                <br/>
                <input type='password' className='form-control' placeholder='Password' name='pasword' required />
                <Fade duration={1000} bottom  when={this.state.error!==''}>
                                            <div className="invalid-feedback" style={{color:'whitesmoke', display: 'block',width:'350px'}}>
                                            <label>{this.state.error}</label> 
                                            </div>
                                        </Fade>    
                <div className='sub'>
                <input type='submit' value='Register' className='submit'/>
                </div>
                <Link to ="/" className='nav-button'>Login</Link>
              
                </form>
                
                </div>
                
            </div>
        )
    }
}

export default Register
