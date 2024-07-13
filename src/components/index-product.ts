export type Product = {
    readonly id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    urlimg: string;
    rating: number;
    stock: number;
}

/* GENERATING RATING */
function generateRating(rating: number) {
    const clearStar = `<svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`;
    const filledStar = `<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>`;

    let finalString = ``;
    for(let i = 1; i <= 5; i++){
        if (i <= rating) {
            finalString+= filledStar;
        }else{
            finalString+= clearStar;
        }
    }

    return finalString;
}

/* CREATING A PRODUCT */
export function createProduct(productData: Product) {
    const product = document.createElement("div");
    insertData(product, productData);

    return product;
}

/* Inserting data */
function insertData(container: HTMLDivElement, data: Product) {
    /* SETTING DATA */
    container.innerHTML = `
				<a href="#">
					<img class="img p-8 rounded-t-lg h-60 mx-auto"
						src="${data.urlimg}"
						alt="product image" rel="noopener noreferrer" />
				</a>
				<div class="px-5 pb-5">
					<a href="#">
						<h5 class="name text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${data.name}</h5>
					</a>
					<div class="flex items-center mt-2.5 mb-5">
						<div class="flex items-center space-x-1 rtl:space-x-reverse">
                            ${ generateRating(data.rating) }
						</div>
						<span
							class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${data.rating}</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="price text-3xl font-bold text-gray-900 dark:text-white">$${data.price}</span>
						<a class="add-to-cart text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
							to cart</a>
					</div>
				</div>`;

    /* SETTING CLASSES */
    container.className = "product-container mx-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";
    container.dataset.id = String(data.id);
}