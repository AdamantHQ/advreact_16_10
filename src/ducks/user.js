import {appName} from '../config'
import {createSelector} from 'reselect'
import {Record, OrderedMap} from 'immutable'
import {v4} from 'node-uuid'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_START = `${prefix}/ADD_USER_START`
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`
export const ADD_USER_ERROR = `${prefix}/ADD_USER_ERROR`
export const DELETE_USER_START = `${prefix}/DELETE_USER_START`
export const DELETE_USER_SUCCESS = `${prefix}/DELETE_USER_SUCCESS`
export const DELETE_USER_ERROR = `${prefix}/DELETE_USER_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    entities: new OrderedMap(),
    loading: false,
    deleting: false,
    error: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER_START:
            return state.set('loading', true)

        case ADD_USER_SUCCESS:
            return state
                .setIn(['entities', payload.id], payload.user)
                .set('loading', false)

        case DELETE_USER_START:
            return state.set('deleting', true)

        case DELETE_USER_SUCCESS:
            return state
                .deleteIn(['entities', payload.id])
                .set('deleting', false)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const loadingStatusSelector = createSelector(stateSelector, state => state.loading)
export const deletingStatusSelector = createSelector(stateSelector, state => state.deleting)
export const userListSelector = createSelector(entitiesSelector, users => users.toArray())

/**
 * Action Creators
 * */
export const addUser = user => dispatch => {
    dispatch({
        type: ADD_USER_START
    })

    const id = v4();
    setTimeout(
        () => {
            dispatch({
                type: ADD_USER_SUCCESS,
                payload: { id, user: { ...user, id } }
            })
            dispatch(reset(moduleName))
        },
        500
    )
};

export const deleteUser = id => dispatch => {
    dispatch({type: DELETE_USER_START})

    setTimeout(
        () =>
          dispatch({
              type: DELETE_USER_SUCCESS,
              payload: {id}
          }),
        500
    )

}