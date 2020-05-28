import React,{Component} from 'react';
import {add_Reminder,remove_Reminder,clear_Reminder} from './actions';
import moment from'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './App.css';
import { connect } from 'react-redux';

class  App extends Component {
  state={
    text:'',
    date: new Date()
  }
  render_reminder= ()=> {
    const {reminders}= this.props
    return(

      <ul className="list-group">
        {
          reminders.map(reminder=>{

            return(
              <li key={reminder.id} className='list-group-item'>
                <div>{reminder.text} </div>
                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                <div className='remover btn btn-danger' onClick={
                  ()=>this.props.remove_Reminder(reminder.id)}>x</div>
              </li>
            )
          })
        }
      </ul>

    )
  }
 
  
  render(){
    
    return (
      <div className="App">
        <img src='' />
        <div className="reminder-title"> 
          <h1>what should u Do</h1>
          <input className="form-control" value={this.state.text} type="text" placeholder="enter what u think ..?" 
          
            onChange={(e)=>this.setState({text: e.target.value})}
          />
          


          <DatePicker
            className="form-control btn btn-block"
             selected={this.state.date}
             value={this.state.date}
             onChange={date => this.setState({date:date})}
             showTimeSelect
              timeFormat="HH:mm"
               timeCaption="time"
             dateFormat="MMMM d, yyyy h:mm aa"
          />


          <button className='btn btn-primary btn-block' onClick={()=>{this.props.add_Reminder(this.state.text,this.state.date)
            this.setState({
              text:'',date:''
            })
          
          }}>Add Reminder</button>
          <button className='btn btn-danger btn-block' onClick={()=>this.props.clear_Reminder()}>Clear Reminder</button>
        <div>
          {this.render_reminder()}
        </div>
        </div>
      </div>
    );

  }
  
}
//function mapDispatchToProps(dispatch){
  //  return{
    //add_Reminder:()=>dispatch(add_Reminder())
    //}

    //}
    function mapstateToProps(state){
      return{
        reminders:state
      }
    }
export default connect(mapstateToProps,{add_Reminder,remove_Reminder,clear_Reminder})(App);
