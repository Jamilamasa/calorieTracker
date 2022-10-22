// Storge Controller

// Item Controller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // Data structure
    const data = {
        items: [
            {id: 0, name: 'Rice', calories: 1200},
            {id: 1, name: 'Eba', calories: 300},
            {id: 2, name: 'Fufu', calories: 800}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItems: function(){
            return data.items;
        },
        logData: function(){
            return data;
        }
    }
})()
// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list'
    }

    return{
        populateItemList: function(items){
            let list = '';
            items.forEach((item)=>{
                list += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            })
            document.querySelector(UISelectors.itemList).innerHTML = list;
        }
    }
})()
// App Controller
const app = (function(ItemCtrl, UICtrl){
    
    // Public methods
    return {
        init: function(){
            // Fetch Items from Data structure
            const items = ItemCtrl.getItems()
            
            // Populate list with Items
            UICtrl.populateItemList(items);
        }
    }
})(ItemCtrl, UICtrl)


app.init()