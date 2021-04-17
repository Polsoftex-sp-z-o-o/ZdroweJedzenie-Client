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
        return (
            <div className="card bg-light">
                <div className="card-body mx-auto" style={{ maxWidth: "80%" }}></div>
                <h4 className="card-title mt-3 text-center">Twoje dane</h4>
                <div className="container_account">
                    <div className="row align-items-center">
                        <blockquote className="quote-box">
                            <p className="quote-text">
                                <hr></hr><hr></hr><hr></hr><hr></hr>
                                <div>{this.state.address}</div>
                                <hr></hr>
                                <div>{this.state.name}</div>
                            </p>
                            <hr></hr>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountView;
