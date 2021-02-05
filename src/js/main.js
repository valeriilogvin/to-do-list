const app = {
    input: document.getElementById('input'),
    inputEdit: document.getElementById('input-edit'),
    btnEdit: document.getElementById('btn-edit'),
    list: document.getElementById('list'),
    editModal: document.querySelector('.edit-modal'),

    listArray: [
        {
            id: 12356,
            text: 'Сделать тестовое',
            status: true
        },
        {
            id: 11356,
            text: 'Поспать',
            status: false
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
            if (array[i].status) {
                return 'checked'
            }
        }
    }
};

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function numberOfListGet(array, id) {
    if (indexOfIdGet(array, id) !== false) {
        return indexOfIdGet(array, id)
    } else {
        return app.listArray.length
    }
}

function listItemHtmlGet(elementId, text) {
    return `
        <div id="item_${elementId}" class="list-item">
            <input class="checkbox" onclick="listStatusUpdate(${elementId})" type="checkbox" id="check_${elementId}" name="status" value="yes" ${statusOfIdGet(app.listArray, elementId)}>
            <label for="check_${elementId}"></label>
            <span class="number">${numberOfListGet(app.listArray, elementId) + 1}.</span>
            <p class="text">${text}</p>
            <a class="edit" onclick="editListItemHandler(${elementId})">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.6661V15.9999H3.33379L13.1707 6.1629L9.8369 2.8291L0 12.6661Z"/>
                    <path d="M15.74 2.33586L13.6642 0.260036C13.3174 -0.0866786 12.7529 -0.0866786 12.4062 0.260036L10.7793 1.88693L14.1131 5.22072L15.74 3.59383C16.0867 3.24711 16.0867 2.68258 15.74 2.33586Z"/>
                </svg>
            </a>
            <a onclick="deleteListItemHandler(${elementId})" class="del"></a>
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

function listStatusUpdate(elementId) {
    let thisEl = document.getElementById(`item_${elementId}`),
        thisCheckbox = thisEl.querySelector('.checkbox');

    app.listArray[indexOfIdGet(app.listArray, elementId)].status = thisCheckbox.checked;
}

function resentListItemAppend() {
    if (app.listArray.length) {
        for (let i = 0; i < app.listArray.length; i++) {
            app.list.insertAdjacentHTML('beforeend', `
                ${listItemHtmlGet(app.listArray[i].id, app.listArray[i].text)}
            `);
        }
    }
}

function appListObjectAppend(text, elementId) {
    app.listArray.push({
        id: elementId,
        text: text,
        status: false
    })
}

function listItemAppend() {
    let text = app.input.value,
        elementId = randomInteger(10000, 60000);

    if(app.input.value.length){
        appListObjectAppend(text, elementId);

        app.list.insertAdjacentHTML('beforeend', `
        ${listItemHtmlGet(elementId, text)}
    `);
        app.input.value = '';
    } else {
        app.input.focus();
    }
}

function listItemEditSave(elementId) {
    let thisTaskItem = document.getElementById(`item_${elementId}`),
        thisTaskItemText = thisTaskItem.querySelector('.text'),
        thisObjIndex = indexOfIdGet(app.listArray, elementId);


    if(app.inputEdit.value.length){
        editModalVisibilityHandler();

        app.listArray[thisObjIndex].text = app.inputEdit.value;
        thisTaskItemText.innerText = app.inputEdit.value;
        app.inputEdit.value = '';
    } else {
        app.inputEdit.focus();
    }

}

function editListItemHandler(elementId) {
    let thisObjIndex = indexOfIdGet(app.listArray, elementId);

    editModalVisibilityHandler();
    app.btnEdit.setAttribute('onclick', `listItemEditSave(${elementId})`);
    app.inputEdit.value = app.listArray[thisObjIndex].text;
}

function deleteListItemHandler(elementId) {
    let thisItemId = 'item_' + elementId,
        $thisElement = document.getElementById(thisItemId);

    if (indexOfIdGet(app.listArray, elementId) !== false) {
        $thisElement.remove();
        app.listArray.splice(indexOfIdGet(app.listArray, elementId), 1);
    }

    listNumberUpdate()
}

function editModalVisibilityHandler() {
    if(app.editModal.classList.contains('show')){
        app.editModal.classList.remove('show')
    } else {
        app.editModal.classList.add('show')
    }
}

function init() {
    resentListItemAppend()
}

init();