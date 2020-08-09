import { User } from '../user';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    errorMessage: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    errorMessage: null,
    loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.AUTH_SUCCESS:
            const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                user,
                errorMessage: null,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case AuthActions.AUTH_FAIL:
            return {
                ...state,
                user: null,
                errorMessage: action.payload,
                loading: false
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                errorMessage: null
            };
        default:
            return state;
    }
}
