import React, { Component } from 'react'

import fire from './config/fire'



export class Page extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             chats:[],
             text:''

        }
        this.show=React.createRef()
    }
    

     handleLogout=()=>{
        fire.auth().signOut()
    }
 focusScroll(){
    this.show.current.scrollIntoView({behavior:'smooth',block: 'start',inline:'start' })
    
 }

 inputChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
   

}

time(){
    let hr =new Date().getHours()
    const min=new Date().getUTCMinutes()
    let tim='am'
    if (hr>11){
        switch (hr) {
                case 12:
                    tim = "pm"
                    hr=12
                    break;
                case 13:
                    tim = "pm";
                    hr=1
                    break;
                case 14:
                    tim = "pm";
                    hr=2
                    break;
                case 15:
                    tim = "pm";
                    hr=3
                    break;
                case 16:
                    tim = "pm";
                    hr=4
                    break;  
                case 17:
                    tim = "pm";
                    hr=5
                    break;
                case 18:
                    tim = "pm";
                    hr=6
                    break;
                case 19:
                    tim = "pm";
                    hr=7
                    break;
                case 20:
                    tim = "pm";
                    hr=8
                break;
                case 21:
                    tim = "pm";
                    hr=9
                break;
                case 22:
                    tim = "pm";
                    hr=10
                break;
                case 23:
                tim = "pm";
                hr=11
                break;
           default:
               break;
        }
    }else if (hr>0 && hr<=11){
        tim='am'
    }
    else {
        hr=12
        tim='am'
    }
return `${hr}:${min} ${tim}`
}
componentDidMount(){
    let data=[]
    fire.database().ref('chat').on('value',(snapshot)=> {
       
        if(snapshot.val()!=null){
             const vall=snapshot.val()
              data=Object.keys(vall).map(id=>{ 
                return {...vall[id],cc:id}
            } )
            
           
            this.setState({chats:data})
            this.focusScroll()
        }
    })
    
    


}
    
    
handleSubmit=(event)=>{
    event.preventDefault()
    let time =this.time()
    const id=this.props.user.displayName
    const uid=this.props.user.uid
    if(event.target.children[0].value!==''){
    const input={
        id:id,
        uid:uid,
        text:event.target.children[0].value,
        time:time
    }
    
    fire.database().ref().child('chat').push(input).catch(err=>{
        console.log(err)
    }).then(()=>{
        this.setState({text:''})
    })
}
    }
    render() {
       
      const  user=this.props.user.uid
        return (
            <div>
            <button className='logout' onClick={this.handleLogout}>LOGOUT</button><br/>
            <div className='page' >
            
           {this.state.chats.map((chat)=>(
               user===chat.uid?
               (
                   <div key={chat.cc}>
               <div  className='right box'>
                   <span className='user'><i>You</i></span><br/>
                   <div className='text'>{chat.text}</div>
                   <i className='user'>{chat.time}</i>
               </div>
                   
                   </div>
                )
               :
               (
                <div key={chat.cc}>
               <div  className='left box'>
                   <span className='user-left'><i>{chat.id}</i></span><br/>
                   <div className='text'>{chat.text}</div>
                   <i className='user-left'>{chat.time}</i>
                   </div>
                  
                   <div>
                  
                   </div>
                   </div>
                )
               
           ))
           }<br/>
           <br/>
            <p ref={this.show}></p>
           
        </div>
        <div className='input'>
                <form onSubmit={this.handleSubmit}>
                    <textarea  cols='1' 
                    value={this.state.text}
                    placeholder='Chat now'
                    name='text' 
                    className='text-area'
                    onChange={this.inputChange} ></textarea>
                    <button className='button'><span role='img' aria-label='send'>📤</span></button>
                </form>
            </div>
        </div>
        )
    }
}

export default Page
