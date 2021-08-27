import React , {Component} from "react";
import {add_Reminder , remove_Reminder , clear_Reminder} from '../actions';
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './reminder.jpg'
import moment from "moment";
class App extends Component {
    state = {
          text: '',
          date: new Date()
    }

    render_Reminders = () => {
          const {reminders} = this.props ;
          return (
              <ul className="list-group">
                  {
                      reminders.map(reminder => {
                          return(
                              <li key={reminder.id} className='list-group-item'>
                                  <div>{reminder.text}</div>
                                  <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                  <div className="closeIcon btn btn-danger" onClick={() => this.props.remove_Reminder(reminder.id)}>x</div>
                              </li>
                          )

                      })



                  }
              </ul>
          )
    }
    render(){
        return(
            <div className="App">
                <img src ={logo} />     
                <div className="reminder-title" >
                     <h2>What Should You Do ?</h2>
                </div>  
                <input
                      className="form-control"
                      type="text"
                      value={this.state.text}
                      placeholder="Enter What You Think ... ?"
                      onChange={(e) => this.setState({text : e.target.value})}
                />
                <DatePicker
                    className="form-control"
                    value={this.state.date}
                    placeholderText="Enter Date"
                    selected={this.state.date}
                    onChange={(date) =>{this.setState({date : date})}}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <button className="btn btn-primary d-block w-100"
                        onClick={()=> {
                            this.props.add_Reminder(this.state.text , this.state.date)
                            this.setState({text: '' , date: ''})
                        }}
                >
                        Add Reminder       
                </button>
                <button className="btn btn-danger d-block w-100" onClick={() => this.props.clear_Reminder() }>
                    Clear Reminder       
                </button> 
                {this.render_Reminders()}                                
            </div>
            
        )
    }
}

//function mapDispatshToProps(dispatch){
   // return{
     //   add_Reminder : () => dispatch(add_Reminder())
    //}
//}

//function mapStateToProps(state){
   // return {
   //     reminders: state
    //  }
 // }


export default connect(state => {
    return {
        reminders : state
    }
}, {add_Reminder , remove_Reminder , clear_Reminder})(App); // the action creator(add_Reminder) communicate with reducer