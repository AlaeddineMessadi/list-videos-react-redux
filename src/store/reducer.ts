const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        posts: action.payload,
      };
    case 'SET_AUTHORS':
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
