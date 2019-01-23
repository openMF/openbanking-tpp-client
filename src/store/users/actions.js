export const SELECT_USER = 'ADD_USERS';

export function selectUser(user) {
    return {type: SELECT_USER, user}
}