import React, { Component } from 'react'
import fire from './config/fire'
 class Input extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              text:''
         }
     }
     
inputChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
   

}
handleSubmit=(event)=>{
event.preventDefault()
const id=this.props.user.displayName
const uid=this.props.user.uid

const input={
    id:id,
    uid:uid,
    text:event.target.children[0].value}

fire.database().ref().child('chat').push(input).catch(err=>{
    console.log(err)
}).then(()=>{
    this.setState({text:''})
})
this.props.scroll()
}
    render() {
        return (
            <div className='input'>
                <form onSubmit={this.handleSubmit}>
                    <textarea  cols='30' 
                    value={this.state.text}
                    placeholder='Chat now'
                    name='text' 
                    className='text-area'
                    onChange={this.inputChange} ></textarea>
                    <button className='button'>SEND</button>
                </form>
            </div>
        )
    }
}

export default Input
