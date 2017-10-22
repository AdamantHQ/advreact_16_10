import React from 'react'
import UserForm from '../user/UserForm'
import UserList from '../user/UserList'
import {loadingStatusSelector, addUser} from '../../ducks/user'
import {connect} from 'react-redux';

const UserPage = ({addUser, isAdding, users}) =>
    <div>
    <h2>User page</h2>
    <UserForm isAdding = {isAdding} onSubmit = {addUser} />
    <UserList />
</div>


export default connect(state => ({ isAdding: loadingStatusSelector(state)}), {addUser})(UserPage)