import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Popover } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

import { getHighTea } from '../../reducers/hightea/action';
import { highTeaInfoSelector} from '../../reducers/hightea/selector';
import { AppointListProps, bookingSession } from './object';
import { OrderDetailList, rangeTime } from '../../reducers/hightea/object';
import { CustomTableCell,styles } from './style';
  
const mapStateToProps = (state: Map<any, any>) => ({
    highTea:state.get('hightea'),
})

const mapDispatchToProps = (dispatch: any) => ({
   getHighTea: ()=>dispatch(getHighTea()), 
})


class AppointList extends Component<AppointListProps> {
    

    static defaultProps = {
         highTea: Map(),
         getHighTea: () =>{}

    };
    
    componentDidMount() {
        this.props.getHighTea();
    }

    constructor(props:any)
    {
        super(props);
    }

    render()
    {   const { highTea, classes } = this.props;
        const listsAscByDate: OrderDetailList [] = highTea.get('highteaList');
        console.log(listsAscByDate);
        
        if(listsAscByDate)
            {
            return(
                    <div>
                    { 
                        listsAscByDate.map((list, index) =>(
                            
                            <Paper className={classes.root} key={index.toString()}>
                            <div>{list.date.format('Do MMM YYYY')}</div>
                            <div>{(() => {
                                if(list.timeSession === rangeTime.morning)
                                {
                                    return bookingSession.sessionFrom10PM;
                                }
                                else if( list.timeSession === rangeTime.afternoon)
                                {
                                    return bookingSession.sessionFrom2PM;
                                }
                            })()} </div>
                            <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                {/*<CustomTableCell>Session</CustomTableCell>*/} 
                                <CustomTableCell>Adults</CustomTableCell>
                                <CustomTableCell>Children</CustomTableCell>
                                <CustomTableCell>Alone</CustomTableCell>
                                <CustomTableCell>Not Pool</CustomTableCell>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Phone</CustomTableCell>
                                <CustomTableCell>Email</CustomTableCell> 
                                <CustomTableCell>Notes</CustomTableCell> 
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {  
                                list.orderDetails.map((filterItem, index) => (
                                    <TableRow className={classes.row} key={index.toString()}>
                                    {/*<CustomTableCell component="th" scope="row">{filterItem.session}</CustomTableCell>*/}
                                    <CustomTableCell align="right">{filterItem.adults}</CustomTableCell>
                                    <CustomTableCell align="right">{filterItem.children}</CustomTableCell>
                                    <CustomTableCell align="right">{filterItem.alone}</CustomTableCell>
                                    <CustomTableCell align="right">{filterItem.notPool}</CustomTableCell>
                                    <CustomTableCell align="right">{filterItem.name}</CustomTableCell>
                                    <CustomTableCell align="right">{filterItem.phone}</CustomTableCell>
                                    <CustomTableCell align="right" style={{maxWidth:'100px'}}>{filterItem.email}</CustomTableCell>
                                    <CustomTableCell align="right" style={{minWidth:'350px'}}>{filterItem.notes}</CustomTableCell>
                                    </TableRow>
                                ))
                                }
                                <TableRow>
                                    <CustomTableCell rowSpan={3} />
                                    <CustomTableCell colSpan={2}>Total Adults</CustomTableCell>
                                    <CustomTableCell align="right">{list.totalAdults}</CustomTableCell>
                                </TableRow>
                                <TableRow>
                                    <CustomTableCell colSpan={2}>Total Children</CustomTableCell>
                                    <CustomTableCell align="right">{list.totalChildren}</CustomTableCell>
                                </TableRow>
                            </TableBody>
                            
                            </Table>
                        </Paper>
                        

                        )
                            )}
                
                    </div>
            )
                        }
                        else
                        {
                            return <div>loading</div>
                        }
    }
} 


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppointList));