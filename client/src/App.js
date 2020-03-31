import React, {Component} from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: 'auto' //x축으로 overflow
  },
  table:{
    minWidth: 1080
  }
});

class App extends Component {

  state = {     //변경될 수 있는 데이터
    customers: ""
  }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async() => {  //비동기적
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  render(){
    const{ classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* 고객컴포넌트 출력 부분 */}
      {this.state.customers ? this.state.customers.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
       }) : ""}
      </TableBody>
      </Table>
    </Paper>
  );
  }
}

export default withStyles(styles)(App);