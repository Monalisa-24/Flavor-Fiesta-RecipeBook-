const wishlisted = document.getElementById('wishlist');

function wishlisting(){
    wishlisted.style.color = "#f7055e";
}


// for gallery

const filterBtns = document.querySelectorAll('.filter-btn button');
const filterableCards = document.querySelectorAll('.filterable-cards .card');

// console.log(filterBtns, filterableCards);

//define the filterable cards
const filterCards = (e) => {
    // Remove the active class from all buttons
    filterBtns.forEach(button => button.classList.remove('active'));
    
    // Add the active class to the clicked button
    e.target.classList.add('active');
    // console.log(e.target);


    const filter = e.target.dataset.name;

    filterableCards.forEach(card => {
        if (filter === 'all' || card.dataset.name === filter) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
};

// add click event listener to each filter button
filterBtns.forEach(button => button.addEventListener("click", filterCards));



// redirection for recipe page

  document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
      window.location.href = `recipe.html?search=${encodeURIComponent(query)}`;
    }
  });
