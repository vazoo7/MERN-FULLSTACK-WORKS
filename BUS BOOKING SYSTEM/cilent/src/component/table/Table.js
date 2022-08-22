import React from 'react';
import './table.css';
import { makeStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const THEME = createMuiTheme({
    typography: {
     "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
     "fontSize": 15,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
const BusTable = (props) => {
  let {value:busData}=props
    const classes = useStyles();
    const changeIdx=(e,row)=>{
      e.preventDefault()
      sessionStorage.setItem("bus-id",row)
        let {onChild2}=props
        if(onChild2){
          let e=2
            onChild2(e)
        }
    }
    return (
      
        <div className="table-top">
            <h3>Select Bus</h3>
    <MuiThemeProvider theme={THEME}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:"green"}}>
            <TableCell>BusType</TableCell>
            <TableCell style={{color:"black"}}align="right">Depature</TableCell>
            <TableCell align="right">Arrival&nbsp;</TableCell>
            <TableCell align="right">Date&nbsp;</TableCell>
            <TableCell align="right">Available&nbsp;</TableCell>
            <TableCell align="right">Fare&nbsp;</TableCell>
            <TableCell align="right">&nbsp;&nbsp;&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {busData.bus.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.busType}
              </TableCell>
              <TableCell align="right">{row.depature}</TableCell>
              <TableCell align="right">{row.arrival}</TableCell>
              <TableCell align="right">{row.travelDate}</TableCell>
              <TableCell align="right">{row.seatsAvailable-row.bookedSeats.length}</TableCell>
              <TableCell align="right">{row.fare}</TableCell>
              <TableCell align="right"><button className="btn btn-success" onClick={e=>changeIdx(e,row._id)}>View Seats</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</MuiThemeProvider>


 </div>
    );
};

export default BusTable;