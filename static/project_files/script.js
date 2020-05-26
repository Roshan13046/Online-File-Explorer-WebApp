//loop through children of body
const children = $('tbody').children();
console.log(children.forEach);

//convert children to an array
let children_array = [];
for (let i = 0; i < children.length; i++) {
    children_array.push(children[i]);
}
console.log(children_array);

//build an array of object
const items = [];
children_array.forEach(element => {
    console.log(element.outerHTML);
    console.log(element.getAttribute('data-name'));
    const rowDetails = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        time: parseInt(element.getAttribute('data-time')),
        html: element.outerHTML
    }
    items.push(rowDetails);
});
console.log(items);

//sort status
const sortStatus = {
    name: 'none', //none, up,down
    size: 'none', //none, up,down
    time: 'none' //none, up,down
};

const sort = (items, option, type) => {
    items.sort((item1, item2) => {
        let value1, value2;
        if (type == 'name') {
            value1 = item1.name.toUpperCase();
            value2 = item2.name.toUpperCase();
        } else if (type === 'size') {
            value1 = item2.size;
            value2 = item2.size;
        } else if (type === 'time') {
            value1 = item2.time;
            value2 = item2.time;
        }

        if (value1 < value2) {
            return -1;
        }
        if (value1 > value2) {
            return 1;
        }
        //equal values
        return 0;

    });

    //reverse the array if the options is  down
    if (option === 'down') {
        items.reverse();
    }
};

const sort_name_down = items => {
    sort_name_up(items);
    items.reverse();
};

//fill table body with items
const fill_table_body = items => {
    const content = items.map(element => element.html).join('');
    console.log(content);
    $('tbody').html(content);
};


//event listeners
document.getElementById('table_head_row').addEventListener('click', event => {
    if (event.target) {
        //clear icons
        $('ion-icon').remove();
        if (['none', 'down'].includes(sortStatus[event.target.id])) {
            //sort in increasing/ascending order
            sort(items, 'up', event.target.id);
            sortStatus[event.target.id] = 'up';
            //add icon up              
            event.target.innerHTML += '<ion-icon name="arrow-up"></ion-icon>';

        } else if (sortStatus[event.target.id] === 'up') {
            //sort in decreasing/descending order
            sort(items, 'down', event.target.id);
            sortStatus[event.target.id] = 'down';
            //add icon down
            event.target.innerHTML += '<ion-icon name="arrow-down"></ion-icon>';
        }
        fill_table_body(items);
    }
});
