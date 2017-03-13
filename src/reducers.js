import { combinedReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS} from '/actions';

function selectSubreddit(state = 'reactjs', action){
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.selectSubreddit
        default:
            return state;
    }
}

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action){
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state,{ didInvalidate: true })
        case REQUEST_POSTS:
            return Object.assign({}, state, { isFetching: true, didInvalidate: false })
        case RECEIVE_POSTS:
            return Object.assign({}, state, { 
                                                isFetching: false, 
                                                didInvalidate: false, 
                                                items: actions.posts, 
                                                lastUpdate: action.receivedAt 
                                            }
                                )
        default:
            return state;
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.selectSubreddit]: posts(state[action.selectSubreddit], action)
            })
    
        default:
            return state;
    }
}

const rootReducer = combinedReducers({
    postsBySubreddit,
    selectSubreddit
})

export default rootReducer;