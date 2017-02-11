
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
    // 'webkitIDBTransaction' is deprecated and will be removed in M57, around March 2017. Please use 'IDBTransaction' instead. See https://www.chromestatus.com/features/5775330191081472 for more details.
    // window.IDBTransaction = window.webkitIDBTransaction;

    // 'webkitIDBKeyRange' is deprecated and will be removed in M57, around March 2017. Please use 'IDBKeyRange' instead. See https://www.chromestatus.com/features/5775330191081472 for more details.
    // window.IDBKeyRange = window.webkitIDBKeyRange;
}

function TodoList() {
    // @TODO Obtener mediate el querySelector(): #todo-input, #todo-button y #todo-list
    this._todoInput = ;
    this._todoButton = ;
    this._todoList = ;

    // Gestionar interacción del usuario
    this._todoButton.addEventListener('click', this._handleTodoButtonEvent.bind(this))
}

TodoList.DB_NAME = "todos";
TodoList.DB_VERSION = 1;
TodoList.DB_STORE = "todo";

TodoList.prototype.db = null;
TodoList.prototype.onerror = function(e) {
    console.log(e);
};

TodoList.prototype.open = function() {
    var _self = this;

    /* @TODO: Inicializa una base de datos indexedDB */
    var request = ;

    request.onupgradeneeded = function(e) {
        var db = e.target.result;

        e.target.transaction.onerror = _self.onerror.bind(this);
        if (db.objectStoreNames.contains(TodoList.DB_STORE)) {
            db.deleteObjectStore(TodoList.DB_STORE);
        }

        var store = db.createObjectStore(TodoList.DB_STORE, { keyPath: "timeStamp" });
    };

    request.onsuccess = function(e) {
        _self.db = e.target.result;

        /* @TODO Obtener todos los todoItems */
    };

    request.onerror = _self.onerror.bind(this);
};

TodoList.prototype.addTodo = function(todoText) {
    var _self = this,
           db = this.db,
        trans = db.transaction([TodoList.DB_STORE], "readwrite"),
        store = trans.objectStore(TodoList.DB_STORE);

    var data = {
        "text": todoText,
        "timeStamp": new Date().getTime()
    };

    /* @TODO almacena en la base de datos el todo */

    request.onsuccess = function(e) {

        /* @TODO Obtener todos los todoItems */
    };

    request.onerror = function(e) {
        console.log("Error adding: ", e);
    };
};

TodoList.prototype.deleteTodo = function(id) {
    var _self = this,
           db = this.db,
        trans = db.transaction([TodoList.DB_STORE], "readwrite"),
        store = trans.objectStore(TodoList.DB_STORE);

    /* @TODO elimina de la base de datos el todo */

    request.onsuccess = function(e) {
        _self.getAllTodoItems();
    };

    request.onerror = function(e) {
        console.log("Error deleting: ", e);
    };
};

TodoList.prototype.getAllTodoItems = function() {

    // Clear lists
    this._todoList.innerHTML = '';

    var _self = this,
           db = this.db,
        trans = db.transaction([TodoList.DB_STORE], "readwrite"),
        store = trans.objectStore(TodoList.DB_STORE);

    // Get everything in the store
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function(e) {
        var result = e.target.result;
        if (!!result == false) {
            return;
        }

        _self._renderTodo(result.value);
        result.continue();
    };

    cursorRequest.onerror = _self.onerror.bind(this);
};

TodoList.prototype._renderTodo = function(todo) {
    var _self = this;
    var newItem = document.createElement("a");
    newItem.href = "#";
    newItem.className = "list-group-item";

    var text = document.createTextNode(todo.text);
    newItem.appendChild(text);

    newItem.addEventListener('click', function(e) {
        /* @TODO elimina de la base de datos el todo seleccionado */
    }, false);

    this._todoList.appendChild(newItem);
};

TodoList.prototype._handleTodoButtonEvent = function(e) {
    this.addTodo(this._todoInput.value);

    // Limpiar campo de texto
    this._todoInput.value = "";
};

document.addEventListener('DOMContentLoaded', function () {
    /* @TODO Inicializa la TodoList */
});
