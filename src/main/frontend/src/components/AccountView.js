import UsersMock from '../utils/usersMock';
import React from 'react';

class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: ''
        }
    }

    componentDidMount() {
        this.getUserInformation().then(result => this.setState({
            id: result.entity.id,
            name: result.entity.name,
            address: result.entity.address
        }))
    }

    getUserInformation() {
        let user = new UsersMock();
        return user.getUserById(0);
    }



    render() {
        console.log("anything")
        return (
            <div>{this.state.id}</div>,
            <div>{this.state.address}</div>,
            <div>{this.state.name}</div>
        );
    }
}

export default AccountView;
