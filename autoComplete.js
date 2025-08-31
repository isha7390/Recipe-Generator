let availableKeywords = [
'All-purpose flour',
'Almond flour',
'Baking powder',
'Baking soda',
'Rice flour',
'Cornstarch',
'Corn flour',
'Oats',
'White rice',
'Basmati rice',
'Jasmine rice',
'Quinoa',
'Barley',
'Pasta',
'Noodles',
'Soy sauce',
'Tamari',
'Miso paste',
'Fish sauce',
'Gochujang',
'Gochugaru',
'Kimchi',
'Sesame oil',
'Vegetable oil',
'Olive oil',
'Coconut oil',
'Butter',
'Ghee',
'Lard',
'Milk',
'Cream',
'Yogurt',
'Greek yogurt',
'Sour cream',
'Condensed milk',
'Coconut milk',
'Eggs',
'Chicken',
'Beef',
'Pork',
'Lamb',
'Fish',
'Shrimp',
'Tofu',
'Tempeh',
'Chickpeas',
'Lentils',
'Black beans',
'Kidney beans',
'Green peas',
'Potatoes',
'Sweet potatoes',
'Carrot',
'Onion',
'Garlic',
'Ginger',
'Shallots',
'Scallions',
'Leeks',
'Tomatoes',
'Canned tomatoes',
'Tomato paste',
'Bell pepper',
'Chili peppers',
'Spinach',
'Kale',
'Cabbage',
'Bok choy',
'Zucchini',
'Eggplant',
'Mushrooms',
'Cucumbers',
'Pumpkin',
'Squash',
'Avocado',
'Lemon',
'Lime',
'Orange',
'Apple',
'Banana',
'Strawberries',
'Blueberries',
'Mango',
'Pineapple',
'Coconut',
'Almonds',
'Cashews',
'Walnuts',
'Pecans',
'Peanuts',
'Pine nuts',
'Chia seeds',
'Flax seeds',
'Sesame seeds',
'Sunflower seeds',
'Salt',
'Black pepper',
'White pepper',
'Cayenne pepper',
'Paprika',
'Chili powder',
'Cumin',
'Coriander',
'Turmeric',
'Curry powder',
'Garam masala',
'Cardamom',
'Cloves',
'Nutmeg',
'Cinnamon',
'Bay leaves',
'Oregano',
'Basil',
'Thyme',
'Rosemary',
'Parsley',
'Dill',
'Mint',
'Saffron',
'Vinegar (white, rice, apple cider, balsamic)',
'Soybean paste (Doenjang)',
'Rice vinegar',
'Mirin',
'Sake',
'Honey',
'Maple syrup',
'Molasses',
'Brown sugar',
'Powdered sugar',
'Granulated sugar',
'Corn syrup',
'Dark chocolate',
'White chocolate',
'Cocoa powder',
'Coffee',
'Green tea',
'Black tea',
]

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const ingredientsBox = document.querySelector(".ingredient-box");
const searchBox = document.querySelector(".search-box");
let ingredients = []; // list of all the added ingredients
let unwantedIngredients = ["soy sauce","fish sauce" ]; //ingredients you want to exclude
let recipes = [];
let image =[];
const container = document.getElementById("recipe");
container.innerHTML= " ";

//autocomplete searchbar
inputBox.onkeyup = function(){
    let result= [];
    let input = inputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            return keyword.toLowerCase().startsWith(input.toLowerCase()) || keyword.includes(input.toLowerCase());
        });
        console.log(result);
    }
    displayKeyword(result)

    if (!result.length){
        resultsBox.innerHTML ='';
    }

    
}

//displaying the keyword in the results box
function displayKeyword(result){
    const content = result.map((element)=>{
        return "<li onclick = selectInput(this)>" + element + "</li>";
    });

    resultsBox.innerHTML = "<ul>"+ content.join('') +"</ul>";
}

//selecting the ingredeient
function selectInput(element){
    addIngredient(element.innerHTML);
    inputBox.value = element.innerHTML;
    resultsBox.innerHTML = '';
    displayIngredient(searchBox);
}


//to add the ingredients
function addIngredient(value){
    ingredients.push(value);
    console.log("I have taken in the ingredient");
}

//to display the ingredients in the ingredients box
function displayIngredient(){
    const content = ingredients.map((element)=>{

        return "<li >" + element + "<button > X </button> </li>";
        
    });
    ingredientsBox.innerHTML="<ul>" + content.join('') + "</ul>";
    inputBox.value = '';   
   

}

//to remove ingredients both from list and page 
 ingredientsBox.addEventListener("click", function(event){ 
    if(event.target.tagName === "BUTTON")
    {
        const li = event.target.parentElement;
        li.remove();
        let index = ingredients.indexOf(li);
        ingredients.splice(index,1);
        console.log(li);
    }
    //remove box when no ingredients
    if(ingredients.length === 0)
        {
            ingredientsBox.innerHTML = '';
        }
})


//to finish adding ingredients
document.getElementById("finishAdding").addEventListener("click", function(event){

    //to receive the recipes
    const apiKey = "241dd7cd49e5457ab367b44d6d9c483a";
    const ingredientsParam = ingredients.join(",+");

    const ingredientURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsParam}&ignorePantry=true`;
    console.log(ingredientURL)
    fetch(ingredientURL, { 
            headers: {
                'X-API-Key': apiKey
            }})
        .then(response => response.json())
       
        .then(recipeData=>{

            //let extraIngredients =
            let recipeTitles = recipeData.map(recipe => recipe.title);
            let recipeImages = recipeData.map(recipe => recipe.image);

            recipes = recipeTitles;
            image = recipeImages;

            displayRecipe(recipes,image);
        })

        



    if (ingredients.length > 0){
     resultsBox.innerHTML ='';
    searchBox.innerHTML ='';
    ingredientsBox.innerHTML ='';   
    }
    
    
    console.log("this is after extracting the data");

})

//displaying the recipes
function displayRecipe(recipes, images){
    container.innerHTML=" ";
    for (let i =0; i< recipes.length; i++ )
    {
        console.log("hello");
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");


        recipeCard.innerHTML =`
        
        <h3> ${recipes[i]}</h3>
        <img src = ${images[i]}>
        
        `;

        container.appendChild(recipeCard);
        
}
}



















