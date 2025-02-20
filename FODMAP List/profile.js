function createProfile(food) {

    switchToProfileView();

    const food_data = document.getElementById("food-data");

    const name = document.createElement("li");
    name.innerText = `Name: ${food.name}`;

    const fodmap = document.createElement("li");
    fodmap.innerText = `FODMAP: ${food.fodmap}`;

    const category = document.createElement("li");
    category.innerText = `Category: ${food.category}`;

    food_data.replaceChildren(name, fodmap, category)
}

function switchToProfileView() {
    const foodProfile = document.getElementById("food-profile");
    foodProfile.style.display = "block";

    const centerContainer = document.getElementById("center-container");
    centerContainer.style.display = "none";

    const goBackButton = document.getElementById('back-button')
    goBackButton.style.display = "block";
}

function switchToSearchBar() {
    const foodProfile = document.getElementById("food-profile");
    foodProfile.style.display = "none";

    const centerContainer = document.getElementById("center-container");
    centerContainer.style.display = "block";

    const goBackButton = document.getElementById('back-button')
    goBackButton.style.display = "none";
}
