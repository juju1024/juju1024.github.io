const searchbar = document.getElementById("searchbar")
const liste = document.getElementById("liste")

liste.classList.add("hideListe");

document.getElementById("searchbar").oninput = suggest;

let foods = [];

async function fetchList() {
    const fetchedFoodsResponse = await fetch('https://raw.githubusercontent.com/oseparovic/fodmap_list/master/fodmap_repo.json');
    foods = await fetchedFoodsResponse.json();
}

fetchList();

function suggest() {
    liste.classList.remove("hideListe");
    liste.replaceChildren();
    for (const food of foods) {

        if (includesCaseInsensitive(food.name, searchbar.value) && searchbar.value != "") {
            let suggestion = document.createElement("li");
            suggestion.innerText = `${food.name}`;
            if (food.fodmap === 'low') {
                suggestion.classList.add('low');
            } else {
                suggestion.classList.add('high');
            }
            liste.appendChild(suggestion);
            suggestion.onclick = () => createProfile(food);
        }

    }
    if (liste.childElementCount == 0) {
        liste.classList.add("hideListe");
    }

}

function includesCaseInsensitive(string, substring) {
    let upperSubstring = substring.toUpperCase();
    let upperString = string.toUpperCase();
    return upperString.includes(upperSubstring);
}
