document.addEventListener('DOMContentLoaded', () => {
const searchButton = document.querySelector('.searchButton');


let currentProducts = [];
let currentPage = 1;
let currentSearchTerm = null;
let currentCategory = null;
let totalPages;


const getProducts = async (page = 1) => {
    const input = document.querySelector('.searchbar');
    const searchTerm = input.value.trim();
    if (!searchTerm) return;

    currentSearchTerm = searchTerm;
    currentCategory = null;

    searchButton.style.backgroundColor = "green";
    LOADING();

    const res = await fetch(`http://localhost:4001/api/v1/funko/${currentSearchTerm}?page=${page}`);
    const data = await res.json();
    //console.log(typeof data) // object

    currentProducts = data;
    printProducts();
}


const LOADING = () => {
    const funkosDiv = document.querySelector('.funkosDiv');
    funkosDiv.innerHTML ="";

    for (let i = 0; i < 10; i++) {
        const spinnerDiv = document.createElement('div');
        spinnerDiv.classList.add('spinner');
        funkosDiv.innerHTML += `
        <div class="spinner">
        </div>
        `
    }
}

/*
btnShowMore.addEventListener('click', () => {
    currentPage++;
    if (currentCategory) {
        getFunkoByCategory(currentCategory, currentPage);
    } else if (currentSearchTerm) {
        getProducts(currentPage);  // <-- ahora le pasas la página
    }
});*/



const renderPagination = (totalPages) => {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // limpiar anteriores

   for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('btn-pagination');
        if (i === currentPage) btn.classList.add('active');

        btn.addEventListener('click', () => {
            currentPage = i;
            if (currentCategory) {
                getFunkoByCategory(currentCategory, currentPage);
            } else if (currentSearchTerm) {
                getProducts(currentPage);
            }
        });

        pagination.appendChild(btn);
    }
};


const setupCategoryListeners = () => {
    const categories = document.getElementById('listOfCategories').querySelectorAll('li');
    categories.forEach(category => {
        category.addEventListener("click", () => {
            const categoryName = category.textContent.trim();
            getFunkoByCategory(categoryName, 1);
        });
    });
};
setupCategoryListeners();



const getFunkoByCategory = async (categoryName, page = 1) => {

    currentCategory = categoryName;
    currentSearchTerm = null;


    LOADING();
    const res = await fetch(`http://localhost:4001/api/v1/cat/${categoryName}?page=${page}`);
    const data = await res.json();

    currentProducts = data;
    totalPages = data.totalPages;

    //console.log(typeof currentProducts) // object

    printProducts();
};



const printProducts = () => {
    const funkosDiv = document.querySelector('.funkosDiv');
    funkosDiv.innerHTML ="";

    if (!currentProducts || currentProducts.length === 0) {
        funkosDiv.innerHTML = "<p>No se han encontrado productos.</p>";
        return;
    }
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
   
 
    let productsHTML = '';

        for (const product of currentProducts) {
            const { title, img, price } = product;
            productsHTML += `
                <div class="funko-card">
                    <h2>${title}</h2>
                    <img src="${img}">
                    <span>Precio: ${price}</span>
                </div>
            `;
            
        }

    funkosDiv.innerHTML = productsHTML;  
        
    renderPagination(totalPages)

}

searchButton.addEventListener("click", getProducts);


})


