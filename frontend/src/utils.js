let itemsObjToArray = (items) => {
    let newItems = Object.entries(items).map((item)=>{
        let newItem = {...item[1]};
        newItem.itemID = item[0];
        return newItem;
    });
    return newItems;
};


export {itemsObjToArray};
