import { handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import _ from 'lodash';
import moment from 'moment';

import { getHighTea } from './action';
import { GET_HIGHTEA, GET_HIGHTEA_SUCCESS, bookingSession, highTeaCategory, highTeaType, meta_keys, highTeaType2 } from './constant';
import { OrderDetail, OrderDetailList, rangeTime} from './object';


const initialState = fromJS({});

const getTicketType = (tType: string): string => {
      
    let type:string = highTeaCategory.adults;
    if(tType)
    {
        if((tType.indexOf(highTeaType.adults)>=0)|| (tType.indexOf(highTeaType2.adults)>=0))
        {
            type = highTeaCategory.adults;
        }
        else if((tType.indexOf(highTeaType.children)>=0) || (tType.indexOf(highTeaType2.children)>=0))
        {
            type = highTeaCategory.children;
        }
        else if(tType.indexOf(highTeaType.family)>=0)
        {   
            type = highTeaCategory.family;
        }
    }
    return type;
}

function getSessionRange(session: string): rangeTime 
{
    switch(session)
    {
        case bookingSession.sessionFrom10PM:
        return rangeTime.morning;
        case bookingSession.sessionFrom2PM:
        return rangeTime.afternoon;
        default:
        return rangeTime.morning;
    }
    
}

export default handleActions({
    [GET_HIGHTEA_SUCCESS]: (state: Map<any,any>, action: any) => {
          
        const highTeaItems = action?action.payload:null;
        let orderDetailLists: OrderDetailList[] = [];

        for(const highTeamItem of highTeaItems)
        {  
         
            const postItemMeta: any[] = (highTeamItem || {}).wprh_postmeta;
            const billingEmail: any = _.find(postItemMeta, { meta_key: '_billing_email' });
            const billingPhone: any = _.find(postItemMeta, { meta_key: '_billing_phone' });
            const firstName: any = _.find(postItemMeta, { meta_key: '_shipping_first_name' });
            const lastName: any = _.find(postItemMeta, { meta_key: '_shipping_last_name' });
            const orderItems: any[] = (highTeamItem || {}).wprh_woocommerce_order_items;
            for(const orderItem of orderItems )
            {   
                let detail: OrderDetail = new OrderDetail();
                
                detail.notes = highTeamItem.post_excerpt;
                detail.email = billingEmail?billingEmail.meta_value:"";
                detail.phone = billingPhone?billingPhone.meta_value:"";
                detail.name = `${firstName?firstName.meta_value:""} ${lastName?lastName.meta_value:""}`;

                const orderItemMetas: any[] = (orderItem || {}).wprh_woocommerce_order_itemmeta;
                const sitAlone = _.find(orderItemMetas, { meta_key: 'sitalone'});
                const notPool = _.find(orderItemMetas, { meta_key: 'bythepool'});
                detail.alone = ((sitAlone?sitAlone.meta_value:null) === '1')?'Y':'N';
                detail.notPool = ((notPool?notPool.meta_value:null) === '1')?'Y':'N';
                
                const ticketType = _.find(orderItemMetas, { meta_key: 'ticket-type'});

                let ticketTypeMeta = ticketType?ticketType.meta_value:null;
                if(!ticketTypeMeta)
                {
                   ticketTypeMeta = orderItem.order_item_name;
                }
                
                const type = getTicketType(ticketTypeMeta);
                const quality = _.find(orderItemMetas, { meta_key: '_qty'});
                detail[type] = quality?+quality.meta_value:0;
                
                const bookingDate = _.find(orderItemMetas, (el:{meta_key:string; meta_value:string}) => {

                    if(el.meta_key === 'Start Date' || el.meta_key === 'Date')
                    return el;
                     
                });

             
                const bookingTime = _.find(orderItemMetas, { meta_key: 'Booking Time'});
                detail.session = bookingTime?bookingTime.meta_value:null;
                
                if( bookingDate && moment(bookingDate.meta_value).isAfter() )
                {  
                    const timeSession = getSessionRange(detail.session);
                    
                    let orderDetailList: OrderDetailList = _.find(orderDetailLists, { date: moment(bookingDate.meta_value), timeSession:timeSession }); 
                    
                    if(!orderDetailList)
                    {
                        orderDetailList = {
                            date: moment(bookingDate.meta_value),
                            timeSession: timeSession,
                            orderDetails: [],
                            totalAdults:detail.adults,
                            totalChildren:detail.children
                        }
                        
                        orderDetailLists.push(orderDetailList);
                        orderDetailList.orderDetails.push(detail);
                    }
                    else
                    {   orderDetailList.totalAdults += detail.adults;
                        orderDetailList.totalChildren += detail.children;
                        const existedDetailIndex = _.findIndex(orderDetailList.orderDetails, { email: detail.email });
                         
                        if(existedDetailIndex>=0)
                        {   
                      
                            orderDetailList.orderDetails[existedDetailIndex].adults += detail.adults;
                            orderDetailList.orderDetails[existedDetailIndex].children += detail.children;
                            orderDetailList.orderDetails[existedDetailIndex].family += detail.family;

                        }
                        else
                        {
                            orderDetailList.orderDetails.push(detail);
                        }
                    }

                   
                }
                

            }
            
        }

        console.log(orderDetailLists);

        const listsAscByDate:OrderDetailList[] = _.orderBy(orderDetailLists, ['date', 'timeSession' ],['asc', 'asc']);
        console.log(listsAscByDate);
  
        return state.set('highteaList',listsAscByDate);
    
    },
}, initialState);