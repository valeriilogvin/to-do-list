let app = {
    input : document.getElementById('input'),
    list: document.getElementById('list'),

    listArray: [
        {
            id: 12356,
            text: 'Сделать тестовое',
            status: false
        },
        {
            id: 11356,
            text: 'Поспать',
            status: true
        }
    ],

};

const indexOfIdGet = (array, id) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return false;
};

const statusOfIdGet = (array, id) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            if(array[i].status){
                return 'checked'
            }
        }
    }
};

function randomInteger(min, max){
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function numberOfListGet(array, id) {
    if(indexOfIdGet(array, id) !== false){
        return indexOfIdGet(array, id)
    } else {
        return app.listArray.length
    }
}

function listItemHtmlGet(element_id, text) {
    return `
        <div id="item_${element_id}" class="list-item">
            <input onclick="listStatusUpdate(${element_id})" class="checkbox" type="checkbox" name="status" value="0" ${statusOfIdGet(app.listArray, element_id)}><Br>
            <span class="number">${numberOfListGet(app.listArray, element_id) + 1}</span>
            <p class="text">${text}</p>
            <a onclick="deleteListItemHandler(${element_id})" class="del"></a>
        </div>
    `
}

function listNumberUpdate() {
    for (let i = 0; i < app.listArray.length; i++) {
        let $thisListItem = document.getElementById(`item_${app.listArray[i].id}`),
            thisLintItemNumber = $thisListItem.querySelector('.number');
        thisLintItemNumber.innerText = indexOfIdGet(app.listArray, +$thisListItem.id.slice(5)) + 1
    }
}

function listStatusUpdate(element_id) {
    let thisEl = document.getElementById(`item_${element_id}`),
        thisCheckbox = thisEl.querySelector('.checkbox');

    app.listArray[indexOfIdGet(app.listArray, element_id)].status = thisCheckbox.checked;
}

function resentListItemAppend() {
    if(app.listArray.length){
        for (let i = 0; i < app.listArray.length; i++) {
            app.list.insertAdjacentHTML('beforeend', `
                ${listItemHtmlGet(app.listArray[i].id, app.listArray[i].text)}
            `);
        }
    }
}

function appListObjectAppend(text, element_id){
    app.listArray.push({
        id: element_id,
        text: text,
        status: false
    })
}

function listItemAppend() {
    let text = app.input.value,
        element_id = randomInteger(10000, 60000);

    appListObjectAppend(text, element_id);

    app.list.insertAdjacentHTML('beforeend', `
        ${listItemHtmlGet(element_id, text)}
    `);
    app.input.value = '';
}

function deleteListItemHandler(element_id) {
    let this_item_id = 'item_' + element_id,
        $this_element = document.getElementById(this_item_id);

    if(indexOfIdGet(app.listArray, element_id) !== false){
        $this_element.remove();
        app.listArray.splice(indexOfIdGet(app.listArray, element_id), 1);
    }

    listNumberUpdate()
}

function init() {
    resentListItemAppend()
}

init();