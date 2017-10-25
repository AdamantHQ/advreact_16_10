import { call, put, take } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { reset } from "redux-form";
import firebase from 'firebase'
import {
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
    signInSaga,
    signUpSaga,
    moduleName,
} from './auth'

const auth = firebase.auth()

describe('Auth', () => {
    it('should sign up', () => {
        const payload = {
            email: '123@123.com',
            password: '11111111'
        }

        const gen = signUpSaga()

        expect(gen.next().value).toEqual(take(SIGN_UP_START));

        expect(gen.next({ payload }).value).toEqual(
            call([auth, auth.createUserWithEmailAndPassword], payload.email, payload.password)
        )

        expect(gen.next(payload).value).toEqual(put({
            type: SIGN_UP_SUCCESS,
            payload: { user: payload }
        }))

        expect(gen.next().value).toEqual(put(reset(moduleName)))

        expect(gen.next().value).toEqual(put(push('/people')))
    })

    it('should sign in', () => {
        const payload = {
            email: '123@123.com',
            password: '11111111'
        }

        const gen = signInSaga()

        expect(gen.next().value).toEqual(take(SIGN_IN_START));

        expect(gen.next({ payload }).value).toEqual(
            call([auth, auth.signInWithEmailAndPassword], payload.email, payload.password)
        )

        expect(gen.next(payload).value).toEqual(put({
            type: SIGN_IN_SUCCESS,
            payload: { user: payload }
        }))

        expect(gen.next().value).toEqual(put(reset(moduleName)))

        expect(gen.next().value).toEqual(put(push('/people')))
    })

    it('should handle sign up errors', () => {
        const gen = signUpSaga()
        gen.next()
        gen.next({payload: {}})
        const error = new Error()
        expect(gen.throw(error).value).toEqual(put({
            type: SIGN_UP_ERROR,
            payload: {error}
        }))
    })

    it('should handle sign in errors', () => {
        const gen = signInSaga()
        gen.next()
        gen.next({payload: {}})
        const error = new Error()
        expect(gen.throw(error).value).toEqual(put({
            type: SIGN_IN_ERROR,
            payload: {error}
        }))
    })
})
