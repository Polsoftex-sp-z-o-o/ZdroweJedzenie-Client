import React from 'react';
import temp_logo from './temp_logo.PNG'

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }
    }

    render() {
        return (
            <div class="logo_and_text">
                <img class="logo_image" src={temp_logo} alt="zdrowe jedzenie logo"></img>
                <p class="text_below_logo">{this.state.text}</p>
            </div>
        );
    }
}

class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            confirm_password: ''
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
        if(this.state.password !== this.state.confirm_password){
            alert('Nie pasujące hasła');
        }else{
            alert('Your email: ' + this.state.email + '.Your password: ' + this.state.password);
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="container_outer">
                <div id="left_container_logo" className="container_logo">
                    <Logo text="Lorem ipsum" />
                </div>
                <div id="right_container_register" className="container_register">
                    <form className='register_form' onSubmit={this.handleSubmit}>
                        <label className='register_form__label'>adres email</label>
                        <input className='register_form__input' name='email' type='email' value={this.state.email} onChange={this.handleChange} />
                        <label className='register_form__label'>hasło</label>
                        <input className='register_form__input' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                        <label className='register_form__label'>Potwierdź hasło</label>
                        <input className='register_form__input' name='confirm_password' type='password' value={this.state.confirm_password} onChange={this.handleChange}/>
                        <input className='register_form__submit' type='submit' value='Zarejestruj'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterView;