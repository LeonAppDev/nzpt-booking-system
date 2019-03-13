import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { getHighTea } from '../../reducers/hightea/action';
import { highTeaInfoSelector} from '../../reducers/hightea/selector';
import { Popover } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles:any = (theme:any) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });


const mapStateToProps = (state: Map<any, any>) => ({
    highTea:state.get('hightea'),
})

const mapDispatchToProps = (dispatch: any) => ({
   getHighTea: ()=>dispatch(getHighTea()), 
})


interface AppointListProps {
    highTea: Map<any,any>;
    getHighTea: () => {};
    classes: any;
}

interface orderDetail {
    email: string;
    name: string;
    phone: string;
    adults: string;
    children: string;
    alone: string;
    notPool: string;
    notes: string;
    session: string;
}

enum rangeTime {
    morning,
    afternoon
}
interface orderDetailList {
    date:string;
    orderDetails:orderDetail[];
}


class AppointList extends Component<AppointListProps> {
    
  /*  static propTypes = {
        highTea: ImmutablePropTypes.Map,
        getHighTea: PropTypes.func
    };
*/
   /* static defaultProps = {
         highTea: Map(),
         getHighTea: () =>{}

    };
    */
    componentDidMount() {
        this.props.getHighTea();
    }

    constructor(props:any)
    {
        super(props);
    }

    render()
    {   const { highTea, classes } = this.props;
        const highTeaItems: Object[] = highTea.get('hightea');
        console.log(highTeaItems);
        let filterItems:orderDetail[] = [];
        let orderDetailLists: orderDetailList[] = [];
        if(highTeaItems)
        {   
          
            for(const highTeaItem of highTeaItems)
            {   
                let detail: orderDetail = {
                    email:'',
                    name: '',
                    phone: '',
                    adults: '',
                    children: '',
                    alone: '',
                    notPool: '',
                    notes: '',
                    session: '',
                };

                if('post_excerpt' in highTeaItem)
                {
                    detail.notes = highTeaItem['post_excerpt'];
                }

                if('wprh_postmeta' in highTeaItem)
                {   
                    const postMetas:any[]= highTeaItem['wprh_postmeta'];
                    
                    for(const postMeta of postMetas)
                    {
                        if(postMeta['meta_key'] === '_billing_email')
                        {
                            detail.email = postMeta['meta_value'];
                        }

                        if(postMeta['meta_key'] === '_billing_phone')
                        {
                            detail.phone = postMeta['meta_value'];
                        }

                        if(postMeta['meta_key'] === '_shipping_first_name')
                        {
                            detail.name = `${postMeta['meta_value']} ${detail.name}`;
                        }

                        if(postMeta['meta_key'] === '_shipping_last_name')
                        {
                            detail.name += postMeta['meta_value'];
                        }
                    }

                }
                if('wprh_woocommerce_order_items' in highTeaItem)
                {
                    const orderItems:any[] = highTeaItem['wprh_woocommerce_order_items'];
                    for(const orderItem of orderItems)
                    {
                        let tickType:string = orderItem['order_item_name'];
                        if('wprh_woocommerce_order_itemmeta' in orderItem)
                        {
                            const orderItemMetas: [] = orderItem['wprh_woocommerce_order_itemmeta'];

                            if(_.find(orderItemMetas, { meta_key: 'Booking Time'}))
                            {
                                detail.session = _.find(orderItemMetas, { meta_key: 'Booking Time'}).meta_value;
                            }
                            const quality = _.find(orderItemMetas, { meta_key: '_qty'});
                            const date = _.find(orderItemMetas, { meta_key: 'Date'});
                            if(_.find(orderItemMetas, { meta_key: 'ticket-type'}))
                            {
                                tickType = _.find(orderItemMetas, { meta_key: 'ticket-type'}).meta_value;
                            }

                            if(tickType.indexOf('Elegant High Tea')>=0)
                            {
                                detail.adults = quality.meta_value;
                            }
                            else if(tickType.indexOf('Child Meal')>=0)
                            {
                                detail.children = quality.meta_value;
                            }
                            else if(tickType.indexOf('Family')>=0)
                            {   
                                detail.notes += ` ${tickType} ${quality.meta_value}`;
                            }


                            for(const orderItemMeta of orderItemMetas)
                            {   
                                if('meta_key' in orderItemMeta && 'meta_value' in orderItemMeta)
                                {   
                                    if( (orderItemMeta['meta_key'] === 'Date' || orderItemMeta['meta_key'] === 'Start Date' ) && moment(orderItemMeta['meta_value']).isAfter())
                                    {   
                                        const date = orderItemMeta['meta_value'];
                                        let orderDetailList = _.find(orderDetailLists, { date: date});

                                        if(!orderDetailList)
                                        {
                                            orderDetailList = {
                                                date: date,
                                                orderDetails: []
                                            }

                                            orderDetailLists.push(orderDetailList);

                                        }
                                        orderDetailList.orderDetails.push(detail)
                                    }

                                }
                            }
                        }

                    }

                }
            } 
            console.log(orderDetailLists);    

        } 
        return(
                <div>
                {
                    orderDetailLists.map((list, index) =>(
                        <Paper className={classes.root} key={index.toString()}>
                        <div>{list.date}</div>
                        <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
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
                                   <CustomTableCell component="th" scope="row">{filterItem.adults}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.children}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.alone}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.notPool}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.name}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.phone}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.email}</CustomTableCell>
                                   <CustomTableCell align="right">{filterItem.notes}</CustomTableCell>
                                   </TableRow>
                               ))
                            }
                        </TableBody>
                        
                        </Table>
                       </Paper>

                    )
                )}
              
                </div>
        )
    }
} 


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppointList));