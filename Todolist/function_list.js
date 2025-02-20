let id_counter = 0;
let list = document.getElementById("liste");
function append_list_item() {
    if (input.value != "") {
        let id = id_counter;
        let item = document.getElementById("input").value;
        let li = document.createElement("li");
        li.id = "list_item" + id_counter;
        li.className = "listItem";

        let node = document.createElement("p");
        node.textContent = item;
        node.id = "node" + id_counter;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "box" + id_counter;
        checkbox.className = "toDoBox";
        checkbox.onclick = () => check_boxes(id);

        let delete_button = document.createElement("button");
        delete_button.id = "delete_button" + id_counter;
        delete_button.textContent = "Delete";
        delete_button.className = "delButton";
        delete_button.onclick = () => delete_items(id);

        let todo = document.createElement("div");
        todo.className = "todo";
        todo.appendChild(checkbox);
        todo.appendChild(node);
        li.appendChild(todo);
        li.appendChild(delete_button);
        list.appendChild(li);

        input.value = "";
        id_counter++;
    }
}

function check_boxes(id) {
    if (document.getElementById("box" + id).checked) {
        document.getElementById("node" + id).style.textDecoration = "line-through";
    } else {
        document.getElementById("node" + id).style.textDecoration = "none";
    }
}
function delete_items(id) {
    let confirmation = confirm("Do you really want to delete this item?");
    if (confirmation) {
        document.getElementById("list_item" + id).remove();
    }
}