import React from 'react'
import { Field, reduxForm } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'


const SignUp = ({handleSubmit, invalid, isAdding}) =>
    <form onSubmit = {handleSubmit}>
        <Field name = 'firstName' component = {ErrorField} type = 'text' label = 'Имя'/>
        <Field name = 'lastName' component = {ErrorField} type = 'text' label = 'Фамилия'/>
        <Field name = 'email' component = {ErrorField} type = 'email' label = 'E-mail'/>
        <div>
            <input type = 'submit' disabled={invalid || isAdding}/>
        </div>
    </form>


const validate = ({ firstName, lastName, email }) => {
    const errors = {}

    if (!firstName) errors.firstName = 'Please, enter user\'s first name'
    if (!lastName) errors.lastName = 'Please, enter user\'s last name'
    if (!email) {
        errors.email = 'Please, enter user\'s email'
    } else if (!emailValidator.validate(email)) {
        errors.email = 'invalid email'
    }
    return errors;
}

export default reduxForm({form: 'user', validate})(SignUp)