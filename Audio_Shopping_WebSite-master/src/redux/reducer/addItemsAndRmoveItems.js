const addItemsAndRemove = (state = '', action) => {
    switch (action.type) {
        case 'ADDITION_SUCCESSFULL':
            return action.payload.item;
        case 'ADDITION_FAILED':
            return '';
        case 'Fetch_Successfull':
            return action.payload.items;
        case 'Fetch_Unsuccessfull':
            return '';
        case 'REMOVE_SUCCESSFULL':
            return action.payload.item;
        case 'REMOVE_UNSUCCESSFULL':
            return '';
        default:
            return state;
    }
}

export default addItemsAndRemove;