import React, { Component } from "react";
import CardComponents from "components/cards";
import { List, ListItem } from "material-ui/List";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import ActionInfo from "material-ui/svg-icons/action/info";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Event from 'event'
import API from 'utils/api';
import EnterModal from 'components/enter_modal';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  messages: {
    width: 800
  }
};

class MyApp extends Component {
  constructor() {
    super();
    this.state = {
      value: 'a',
      username: "",
      events: [],
      event: new Event()
    }
    this.api = null;
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  handleClose(username) {
    this.setState({open:false, username: username})
  }
  componentWillMount() {
     this.api = new API();
     this.api.login(resp => {
        this.loadEvent() 
    });
  }
  loadEvent() {
    this.api.getEvents(resp => {
      if (resp==null) {
        this.seedDb();
      } else {
        this.setState({events:Object.values(resp)})
        this.handleChange('a');
      }
    })
  }
  seedDb() {
    event = new Event('Monday Night Cycling','17 July 2017','7:00 pm','9:00 pm','The Monday ride is a good opportunity to get out of the house, exercise and socialise. We go mostly on bicycle paths and on less busy roads, typically between 1,5 to 2 hours long and meander around the city or some of the nicest parks in the city.');
    this.api.addEvent(event, cb=> {
      event = new Event('Line Dancing - Country & Non-Country','19 July 2017','7:00 pm','9:30 pm','Join some of your member friends and kick up your heels with the Toronto Wranglers line dancing night!');
      this.api.addEvent(event, cb=> {
        this.loadEvent()
        this.setState({})
      });
  });
  }
  handleChangeField(e) {
    var infoEvent = this.state.event;
    console.log(e.target.name);
    switch(e.target.name) {
    case 'name':
      infoEvent.name = e.target.value;
      break;
    case 'date':
      infoEvent.date = e.target.value;
      break;
    case 'start_time':
      infoEvent.start_time = e.target.value;
      break;
    case 'end_time':
      infoEvent.end_time = e.target.value;
      break;
    case 'description':
      infoEvent.description = e.target.value;
      break;
    }
    this.setState({event:infoEvent})
  }
  handleSubmit(e) {
    this.api.addEvent(this.state.event, cb=> {
      this.loadEvent()
      this.setState({})
  });
  }
  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Events" value="a">
          <div style={styles.container}>
            <List style={styles.messages}>
              {this.state.events.map((info, idx) => {
                return (
                  <div key={idx}>
                    <ListItem
                      primaryText={info.name}
                      secondaryText={info.date}
                    />
                    <Divider />
                  </div>
                )
              })}
            </List>
          </div>
        </Tab>
        <Tab label="Submit new event" value="b">
          <div>
            <h3 style={styles.headline}>All fields are required *</h3>
              <TextField floatingLabelText="Event Name" fullWidth={true} name="name" value={this.state.event.name} onChange={this.handleChangeField.bind(this)} /><br />
              <TextField floatingLabelText="Event Date" fullWidth={true} name="date" value={this.state.event.date} onChange={this.handleChangeField.bind(this)} /><br />
              <TextField floatingLabelText="Event Start Time" fullWidth={true} name="start_time" value={this.state.event.start_time} onChange={this.handleChangeField.bind(this)} /><br />
              <TextField floatingLabelText="Event End Time" fullWidth={true} name="end_time" value={this.state.event.end_time} onChange={this.handleChangeField.bind(this)} /><br />
              <TextField floatingLabelText="Event Description" fullWidth={true} name="description" multiLine={true} rows={3} value={this.state.event.description} onChange={this.handleChangeField.bind(this)} /><br /><br />
              <RaisedButton label="Send" primary={true} onTouchTap={this.handleSubmit.bind(this)} />
          </div>
        </Tab>
      </Tabs>









    );
  }
}
export default MyApp;
