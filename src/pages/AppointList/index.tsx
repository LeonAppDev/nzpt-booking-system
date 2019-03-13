import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getHighTea } from '../../reducers/hightea/action';
import { highTeaInfoSelector} from '../../reducers/hightea/selector';

const mapStateToProps = (state: Map<any, any>) => ({
    highTea:state.get('hightea'),
})

const mapDispatchToProps = (dispatch: any) => ({
   getHighTea: ()=>dispatch(getHighTea()), 
})


interface AppointListProps {
    highTea: Map<any,any>;
    getHighTea: () => {};
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
    {   const { highTea } = this.props;
        console.log(highTea.get('hightea'));
        
        return (<div>test</div>);
    }
} 


export default connect(mapStateToProps, mapDispatchToProps)(AppointList);