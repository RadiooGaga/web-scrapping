document.addEventListener('DOMContentLoaded', () => {
const searchButton = document.querySelector('.searchButton');


let products = [];
let currentPage = 1;
let currentSearchTerm = null;
let currentCategory = null;
let totalPages;


const getProducts = async (page) => {
    const input = document.querySelector('.searchbar');
    currentSearchTerm = input.value.trim();
    currentCategory = null;

    searchButton.style.backgroundColor = "green";
    LOADING();

    const res = await fetch(`http://localhost:4001/api/v1/funko/${currentSearchTerm}?page=${page}`);
    const data = await res.json();
    //console.log("RES JSON:", data);

    products = data.products;
    totalPages = data.totalPages;

    printProducts(products, totalPages);
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


const renderPagination = (totalPages) => {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // limpiar anteriores
    //console.log(totalPage  
    
    const maxButtons = 5;
    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxButtons + 1, 1);
    }

       // Indicador "Anterior"
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        nextBtn.textContent = '<<';
        prevBtn.classList.add('previous');
        pagination.appendChild(prevBtn);
    }

   for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('btn-pagination');
        if (i === currentPage) btn.classList.add('active');

        btn.addEventListener('click', () => {
            currentPage = i;
            console.log(currentPage)
            handlePaginationClick();
        });

        pagination.appendChild(btn);
    }

        // Indicador "Siguiente"
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>>';
        nextBtn.classList.add('next');
        pagination.appendChild(nextBtn);
    }
};

const handlePaginationClick = () => {
    if (currentCategory) {
        getFunkoByCategory(currentCategory, currentPage);
    } else if (currentSearchTerm) {
        getProducts(currentPage);
    }
}


const setupCategoryListeners = () => {
    const categories = document.getElementById('listOfCategories').querySelectorAll('li');
    categories.forEach(category => {
        category.addEventListener("click", () => {
            let categoryName = category.dataset.slug;
            getFunkoByCategory(categoryName, 1);
        });
    });
};
setupCategoryListeners();



const getFunkoByCategory = async (categoryName, page) => {

    currentCategory = categoryName;

    LOADING();
    const key = categoryName || 'all';
    const res = await fetch(`http://localhost:4001/api/v1/cat/${key}?page=${page}`);
    const data = await res.json();
    //console.log("RES JSON:", data);

    products = data.products;
    totalPages = data.totalPages;

    printProducts(products, totalPages);
};



const printProducts = (products, pages) => {
    const funkosDiv = document.querySelector('.funkosDiv');
    funkosDiv.innerHTML ="";

    if (!products || products.length === 0) {
        funkosDiv.innerHTML = "<p>No se han encontrado productos.</p>";
        return;
    }
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
   
 
    let productsHTML = '';

        for (const product of products) {
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
    renderPagination(pages)

}

    searchButton.addEventListener("click", () => {
        currentPage = 1;
        getProducts(currentPage);
    });

})


