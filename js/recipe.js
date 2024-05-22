window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('search');
  
    if (query) {
      // Fetch the recipe data from the MealDB API
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
          if (data.meals) {
            const meal = data.meals[0];
            document.getElementById('recipe-title').innerText = meal.strMeal;
            document.getElementById('recipe-details').innerHTML = `
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h2>Ingredients:</h2>
              <ul>
                ${Object.keys(meal).filter(key => key.startsWith('strIngredient') && meal[key]).map(key => `<li>${meal[key]} - ${meal['strMeasure' + key.slice(13)]}</li>`).join('')}
              </ul>
              <h2>Instructions:</h2>
              <p>${meal.strInstructions}</p>
            `;
          } else {
            showRecipeNotFound();
          }
        })
        .catch(error => {
          console.error('Error fetching recipe:', error);
          showRecipeNotFound();
        });
    }
  });
  
  function showRecipeNotFound() {
    document.getElementById('recipe-title').innerText = 'Recipe not found';
    document.getElementById('recipe-details').innerHTML = '';
    const listButton = document.getElementById('list-all-recipes');
    listButton.style.display = 'block';
    listButton.addEventListener('click', fetchAllRecipes);
  }
  
  function fetchAllRecipes() {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          const allRecipesDiv = document.getElementById('all-recipes');
          allRecipesDiv.style.display = 'block';
          allRecipesDiv.innerHTML = data.meals.map(meal => `
            <div class="recipe-card">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          `).join('');
        }
      })
      .catch(error => {
        console.error('Error fetching all recipes:', error);
      });
  }
  