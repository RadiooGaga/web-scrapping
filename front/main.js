const searchButton = document.querySelector('.searchButton');

const getProducts = async () => {
    
    const input = document.querySelector('.searchbar');
    searchButton.style.backgroundColor = "green";
    LOADING()

    const res = await fetch(`http://localhost:4001/api/v1/funko/${input.value}`);
    const products = await res.json();
    printProducts(products);
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


const setupCategoryListeners = () => {
    const categories = document.getElementById('listOfCategories').querySelectorAll('li');
    categories.forEach(category => {
        category.addEventListener("click", async () => {
            const categoryName = category.textContent.trim();
            await getFunkoByCategory(categoryName);
        });
    });
};


const getFunkoByCategory = async (categoryName) => {

    LOADING();
    const res = await fetch(`http://localhost:4001/api/v1/cat/${categoryName}/`);
    const products = await res.json();
    printProducts(products);
};


const printProducts = (products) => {
    const funkosDiv = document.querySelector('.funkosDiv');
    funkosDiv.innerHTML ="";

        for (const product of products) {
            const { title, img, price } = product;
            const productHTML = `
                <div class="funko-card">
                    <h2>${title}</h2>
                    <img src="${img}">
                    <span>Precio: ${price}</span>
                </div>
            `;
            funkosDiv.innerHTML += productHTML; 
        }
}

          
searchButton.addEventListener("click", getProducts);
setupCategoryListeners();



