/*
I hard coded the data structure at first
The ItemCtrl handles everything that has to do with the items (item constructor & data structure)
The UICtrl handles everything that has to do with the UI (Populating the list, getting the user input)
*/



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
        addItems: function(name, calories){
            let ID;
            // Create id
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0
            }
        },
        logData: function(){
            return data;
        }
    }
})()
// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addButton: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories'
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
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemName).value,
                calories: document.querySelector(UISelectors.itemCalories).value
            }
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})()
// App Controller
const app = (function(ItemCtrl, UICtrl){
    // Load event listeners
    function loadEventListeners() {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // Add event listeners
        document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit)
    }

    function itemAddSubmit(e){
        //Get form item input
        const input = UICtrl.getItemInput()
        
        // Check for a name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }

        e.preventDefault()
    }
    
    // Public methods
    return {
        init: function(){
            // Fetch Items from Data structure
            const items = ItemCtrl.getItems()
            
            // Populate list with Items
            UICtrl.populateItemList(items);

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl)


app.init()