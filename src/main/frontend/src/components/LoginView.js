import React from 'react';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        alert('Your email: ' + this.state.email + '.Your password: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container_login">
                <form className='login_form' onSubmit={this.handleSubmit}>
                    <label className='login_form__label'>adres email</label>
                    <input className='login_form__input' name='email' type='email' value={this.state.email} onChange={this.handleChange} />
                    <label className='login_form__label'>hasło</label>
                    <input className='login_form__input' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                    <input className='login_form__submit' type='submit' value='Zaloguj'/>
                    <p className='login_form__info'>Potrzebujesz konta? <a href='/register'>Zarejestruj się</a></p>
                </form>
            </div>
        );
      }
}

export default LoginView;
