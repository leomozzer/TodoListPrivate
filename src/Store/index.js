import {createStore} from 'redux';

// const INITIAL_STATE = {
//     name: '',
//     email: '',
//     image: '',
//     urlRender: 0,
//     viewName: ''
// }
//only for tests
const INITIAL_STATE = {
    name: '',
    email: '',
    image: '',
    urlRender: 1,
    viewName: 'Open notes'
}

function dataRender(state = INITIAL_STATE, action){
    switch(action.type){
        case 'RENDER_HOME':
                return {urlRender : 1, viewName: 'Open notes'}
        case 'RENDER_DELETED':
                return {urlRender : 2, viewName: 'Deleted notes'}
        case 'RENDER_ARCHIVED':
                return {urlRender : 3, viewName: 'Archived notes'}
        case 'RENDER_FAVORITES':
                return {urlRender : 4, viewName: 'Favorite notes'}                
        default:
            return state
    }
}

const store = createStore(dataRender)
export default store;