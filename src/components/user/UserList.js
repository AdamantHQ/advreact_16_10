import React from 'react';
import { deleteUser, deletingStatusSelector, userListSelector } from '../../ducks/user'
import { connect } from 'react-redux';

const UserList = ({users, deleteUser, isDeleting}) =>
    users.map(({ firstName, lastName, id }) => (
        <div key={id}>
            <span>
                {`${firstName} ${lastName}`}
            </span>
            <span
                onClick={deleteUser(id)}
                style={{ color: isDeleting ? 'pink' : 'red', fontSize: 11, cursor: 'pointer' }}
            >
                Удалить
            </span>
        </div>
    ));

const mapStateToProps = state => ({
    users: userListSelector(state),
    isDeleting: deletingStatusSelector(state)
})

const mapDispatchToProps = dispatch => ({
    deleteUser: id => () => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
