let availableKeywords = [
'Flour',
'Sugar',
'Salt',
'Olive oil',
'Butter',
'Garlic',
'Onion',
'Black pepper',
'Egg',
'Milk',
'Chicken',
'Tomato',
'Rice',
'Lemon',
'Vinegar',
'Soy sauce',
'Basil',
'Parsley',
'Carrot',
'Potato',
'Ginger',
'Honey',
'Beef',
'Pork',
'Fish',
'Shrimp',
'Cheese',
'Bread',
'Yeast',
'Baking powder',
'Baking soda',
'Vanilla extract',
'Cinnamon',
'Nutmeg',
'Oregano',
'Thyme',
'Rosemary',
'Cumin',
'Paprika',
'Turmeric',
'Chili powder',
'Coriander',
'Mustard',
'Mayonnaise',
'Ketchup',
'Cream',
'Coconut milk',
'Spinach',
'Lettuce',
'Bell pepper',
'Broccoli',
'Zucchini',
'Eggplant',
'Mushroom',
'Celery',
'Peas',
'Corn',
'Green beans',
'Apple',
'Banana',
'Orange',
'Lime',
'Grape',
'Strawberry',
'Blueberry',
'Pineapple',
'Mango',
'Avocado',
'Cucumber',
'Tomato paste',
'Tomato sauce',
'Pasta',
'Soybean oil',
'Canola oil',
'Sesame oil',
'Peanut oil',
'Cornstarch',
'Chicken broth',
'Beef broth',
'Vegetable broth',
'Wine',
'Beer',
'Whipping cream',
'Yogurt',
'Cream cheese',
'Parmesan',
'Mozzarella',
'Cheddar',
'Tofu',
'Lentils',
'Beans',
'Chickpeas',
'Oats',
'Almonds',
'Walnuts',
'Cashews',
'Peanuts',
'Raisins',
'Dates',
'Cocoa powder',
'Chocolate',
'Maple syrup',
'Molasses',
'Brown sugar',
'Powdered sugar',
'Sea salt',
'Coarse salt',
'Peppercorns',
'Red pepper flakes',
'Cayenne pepper',
'Cloves',
'Cardamom',
'Bay leaf',
'Star anise',
'Saffron',
'Sesame seeds',
'Poppy seeds',
'Sunflower seeds',
'Chia seeds',
'Quinoa',
'Barley',
'Couscous',
'Bulgur',
'Fish sauce',
'Oyster sauce',
'Hoisin sauce',
'Sriracha',
'Hot sauce',
'Mustard seeds',
'Dill',
'Mint',
'Cilantro',
'Scallions',
'Shallots',
'Leeks',
'Okra',
'Cabbage',
'Kale',
'Cauliflower',
'Sweet potato',
'Turnip',
'Radish',
'Beet',
'Pumpkin',
'Squash',
'Artichoke',
'Asparagus',
'Arugula',
'Chard',
'Brussels sprouts',
'Parsley root',
'Fennel',
'Garbanzo beans',
'Black beans',
'Kidney beans',
'Pinto beans',
'Navy beans',
'Split peas',
'Rice noodles',
'Ramen noodles',
'Udon noodles',
'Rice vinegar',
'Apple cider vinegar',
'Balsamic vinegar',
'White vinegar',
'Brown rice',
'Jasmine rice',
'Basmati rice',
'Wild rice',
'Polenta',
'Grits',
'Breadcrumbs',
'Panko',
'Allspice',
'Curry powder',
'Five-spice powder',
'Herbes de Provence',
'Italian seasoning',
'Garlic powder',
'Onion powder',
'Salted butter',
'Unsalted butter',
'Evaporated milk',
'Condensed milk',
'Ice cream',
'Gelatin',
'Toasted sesame oil',
'Vegetable oil',
'Lard',
'Shortening',
'Crab',
'Lobster',
'Clam',
'Mussels',
'Scallops',
'Tuna',
'Salmon',
'Anchovies',
'Seaweed',
'Nori',
'Wasabi',
'Pickles',
'Capers',
'Olives',
'Green chili',
'Red chili',
'Black bean sauce',
'Tom yum paste',
'Curry paste',
'Tamarind',
'Garlic salt',
'Herb mix',
]

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const ingredientsBox = document.querySelector(".ingredient-box");
const searchBox = document.querySelector(".search-box");
let ingredients = []; // list of all the added ingredients
let excludedIngredients = []; //ingredients you want to exclude
let recipes = [];
let image =[];
const container = document.getElementById("recipe");
container.innerHTML= " ";
const filterResultBox = document.querySelector(".filterResult-box");
const filterInputBox = document.querySelector(".filterInput-box");
const excludedIngredientsBox = document.querySelector(".exclude-box");
const recipeDetails = document.getElementById("recipe-details");
//const closeButton = document.getElementById("close-button");

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

//displaying the keyword in the results box (ingredient search)
function displayKeyword(result){
    const content = result.map((element)=>{
        return "<li onclick = selectInput(this)>" + element + "</li>";
    });

    resultsBox.innerHTML = "<ul>"+ content.join('') +"</ul>";
}

//selecting the ingredeient (ingredient search)
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
    const ingredientsParam = ingredients.join(",");
    const excludedIngredientsParam = excludedIngredients.join(",");

    const ingredientURL = `http://localhost:3000/recipeGenerator?includeIngredients=${ingredientsParam}&excludeIngredients=${excludedIngredientsParam}&addRecipeInformation=true&addRecipeInstructions=true&instructionsRequired=true&number=20`;
    //console.log(ingredientURL)
    //fetch('/recipeGenerator')
    fetch(ingredientURL) 

        .then(response => response.json())
       
        .then(recipeData=>{

            const results = recipeData.results;
            filterBar.classList.toggle("active", false);
            displayRecipe(results);

        })

        



    if (ingredients.length > 0){
     resultsBox.innerHTML ='';
    searchBox.innerHTML ='';
    ingredientsBox.innerHTML ='';   
    }
    
    
    console.log("this is after extracting the data");

})

//displaying the recipes
function displayRecipe(results){
    container.innerHTML=" ";

    console.log(results);

    

    for( let r =0; r<results.length; r++)
    {
        let result = results[r];
        console.log(result.title);
        console.log(result.image);
        console.log(result.servings);
        console.log(result.cookingMinutes);
        console.log("-----------");

        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        const stepsArray = result.analyzedInstructions[0].steps;

        let instructions="<ol>";

        for(let p =0; p<stepsArray.length; p++)
        {
            instructions  += `<li>${stepsArray[p].step}</li>`;
        }
        instructions+="</ol>";

        const ingredientsArray = result.analyzedInstructions[0].steps;

        const ri = new Set();
        result.analyzedInstructions[0].steps.forEach(step => {
            step.ingredients.forEach(ingredient => {
                ri.add(ingredient.name);
            })
        });
        console.log(ri);    

        let recipeIngredients = "<ul>";
        ri.forEach(ingredient =>{
            recipeIngredients += `<li>${ingredient}</li>`;
        })
        recipeIngredients+= "</ul>";

        recipeCard.innerHTML =`
        
        <h3> ${result.title}</h3>
        <img src = ${result.image}>
        
        `;
        recipeCard.addEventListener("click", function(event){
            console.log("this is after the card has been clicked.");
            recipeDetails.classList.add("open");
            recipeDetails.innerHTML = `
                    <div class = "inner">
                    <div class="text-wrapper">
                    <div class="close-button" id="close-button">X</div>
                    <h3> ${result.title}</h3>
                    <h4>Servings: ${result.servings}</h4>
                    <h4>Cooking Time: ${result.cookingMinutes}</h4>
                    <h3>Ingredients: </h3>
                    <p>${recipeIngredients}</p>
                    <h3>Instructions: </h3>
                    <p>${instructions}</p>
                    </div>
                    <img src = ${result.image}>
                    </div>
                `;
            const closeButton = document.getElementById("close-button");
                    closeButton.addEventListener("click", function(event){
                        recipeDetails.classList.remove("open");

                        

                    })

        });
        
       


        container.appendChild(recipeCard);
        
    }

}

const button = document.getElementById("filter-button");
const filterBar = document.getElementById("filter-bar");

button.addEventListener("click", function(event){
    filterBar.classList.toggle("active");
})


filterInputBox.onkeyup = function(){
    let result= [];
    let input = filterInputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword)=>{
            return keyword.toLowerCase().startsWith(input.toLowerCase()) || keyword.includes(input.toLowerCase());
        });
        console.log(result);
    }
    filterDisplayKeyword(result)

    if (!result.length){
        filterResultBox.innerHTML ='';
    }

    
}

function filterDisplayKeyword(result){
    const content = result.map((element)=>{
        return "<li onclick = filterSelectInput(this)>" + element + "</li>";
    });

    filterResultBox.innerHTML = "<ul>"+ content.join('') +"</ul>";
}

function filterSelectInput(element){
    excludedIngredients.push(element.innerHTML);
    console.log("I have taken the ingredient to exclude")
    filterInputBox.value = element.innerHTML;
    filterResultBox.innerHTML = '';
    filterDisplayIngredient();
}

function filterDisplayIngredient(){
    const content = excludedIngredients.map((element)=>{

        return "<li >" + element + "<button > X </button> </li>";
        
    });
    excludedIngredientsBox.innerHTML="<ul>" + content.join('') + "</ul>";
    filterInputBox.value = '';   
   

}

 excludedIngredientsBox.addEventListener("click", function(event){ 
    if(event.target.tagName === "BUTTON")
    {
        const li = event.target.parentElement;
        li.remove();
        let index = excludedIngredients.indexOf(li);
        excludedIngredients.splice(index,1);
        console.log(li);
    }
    //remove box when no ingredients
    if(excludedIngredients.length === 0)
        {
            excludedIngredientsBox.innerHTML = '';
        }
})














