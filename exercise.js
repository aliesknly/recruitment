let itemsStr = '163841689525773';
const MAX = 10;

/*
 Description 
    - This function loops the rest of the items inside the box, from the largest to smallest ones, looking those that fit to fill the box. 

 Input 
    - maxSupportedItem : number, item id represented by 1-9
    - fullBox : boolean
    - items : array of strings - list of line items, ex: ['9','8','6','6','2', '1']
    - box : string - contains current box content, ex: '81' 
    - boxLine : contains current packaged boxes 
*/
function packager(itemsInput) {
    let items = itemsInput.split('');

    //Sorting items is less efficient in a manufacturing line, but is best optimized results. Result slightly varies if items are not sorted. 
    sortDescending(items);

    let boxLine = [];

    while (items.length > 0) {

        //Takes (removes) the first item in the line, and looks for the rest of items to fill the box
        let box = items[0];
        let boxSum = parseInt(items[0]);
        items.splice(0, 1);

        //The largest supported item to fill the box is always the difference between MAX (10), and the sum of items inside the box
        let maxSupportedItem = MAX - parseInt(boxSum);
        let fullBox = false;

        //Fill the box with items meeting the specified conditions (see function references for details).
        ({ maxSupportedItem, box, boxSum } = fillBoxOptimized(maxSupportedItem, fullBox, items, box, boxSum, boxLine));
    }

    return boxLine.join('/');
}

console.log(packager(itemsStr));


/*
 Description 
    - This function sorts an array of characters (digits) descending using their numeric value as sorting criteria

 Input 
    - items : array of characters (digits), ex: ['9','8','6','6','2', '1']
*/
function sortDescending(items) {
    items.sort((a, b) => parseInt(b) - parseInt(a));
}

/*
 Description 
    - This function loops the rest of the items inside the box, from the largest to smallest ones, looking those that fit to fill the box. 

 Input 
    - maxSupportedItem : number, item id represented by 1-9
    - fullBox : boolean
    - items : array of strings - list of line items, ex: ['9','8','6','6','2', '1']
    - box : string - contains current box content, ex: '81' 
    - boxLine : contains current packaged boxes 
*/

function fillBoxOptimized(maxSupportedItem, fullBox, items, box, boxSum, boxLine) {
    while (maxSupportedItem > 0 && !fullBox) {
        let index = items.indexOf(maxSupportedItem.toString());
        if (index >= 0) {
            items.splice(index, 1);
            box += maxSupportedItem.toString();
            boxSum += maxSupportedItem;
            maxSupportedItem = MAX - parseInt(boxSum);
        } else {
            maxSupportedItem--;
        }
        if (((index >= 0) && ((items.length === 0) || (boxSum + parseInt(maxSupportedItem) > MAX))) || (maxSupportedItem === 0)) {
            ({ box, fullBox, boxSum } = closeBox(boxLine, box, fullBox, boxSum));
        }
    }
    return { maxSupportedItem, box, boxSum };
}


/*
 Description 
    - This function checks the conditions to consider the box must be closed, adding it to the boxLine, as well as to set the conditions for the new one. 

 Input 
    - boxLine : contains current packaged boxes 
    - box : string - contains current box content, ex: '81' 
    - boxSum : number - contains sum of items of the current box, ex: 9 
    - fullBox : boolean
*/

function closeBox(boxLine, box, fullBox, boxSum) {
    boxLine.push(box);
    fullBox = true;
    boxSum = 0;
    box = '';
    return { box, fullBox, boxSum };
}