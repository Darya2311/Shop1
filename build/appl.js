const data = [
    {
        category: "accessory",
        type: "sm",
        color: "blue",
        price: 30, 
        name: "scarf",
        rating: 3,
        imgUrl: "images/pic1.jpg"
    },
    {
        category: "clothes",
        type: "lg",
        color: "white",
        price: 70, 
        name: "shirt",
        rating: 3,
        imgUrl: "images/pic2.jpg"
    },
    {
        category: "clothes",
        type: "lg",
        color: "blue",
        price: 60, 
        name: "shirt",
        rating: 4,
        imgUrl: "images/pic3.jpg"
    },
    {
        category: "clothes",
        type: "md",
        color: "blue",
        price: 40, 
        name: "T-shirt",
        rating: 5,
        imgUrl: "images/pic4.jpg"
    },
    {
        category: "accessory",
        type: "sm",
        color: "black",
        price: 25, 
        name: "Glasses",
        rating: 5,
        imgUrl: "images/pic5.jpg"
    },
    {
        category: "clothes",
        type: "md",
        color: "white",
        price: 50, 
        name: "jumper",
        rating: 3,
        imgUrl: "images/pic6.jpg"
    },
    {
        category: "footwear",
        type: "md",
        color: "white",
        price: 30, 
        name: "sneakers",
        rating: 4,
        imgUrl: "images/pic7.jpg"
    },
    {
        category: "clothes",
        type: "lg",
        color: "dark-blue",
        price: 55, 
        name: "hoodies",
        rating: 3,
        imgUrl: "images/pic8.jpg"
    },
];  


//  показывает выпадашку фильтров 
function showCategoryList() {   
    let filterList = document.querySelectorAll('.filter');
    filterList.forEach(function(filter) {
        filter.addEventListener("click", function(e) {
            e.target.closest('.filter').classList.toggle('show-cat-list');
        })
    })

    catFilter(data);
}

showCategoryList();

//  фильтр 
function catFilter(data) { // попадает в data весь массив объектов
    let catList = document.querySelectorAll('.category-item');
    catList.forEach(function(item) {
        item.addEventListener('click', function(e) {
            let category = e.target.getAttribute("data-category");
            let filterType = e.target.closest('.filter').classList[1];
            let newData;
            let parentEl = document.querySelector('.main__files');

            if (category == "all") {
                parentEl.innerHTML = " ";
                console.log(data)
                appRender(data)
            } else {
                if (filterType == "price") {
                    newData = data.filter(function(card) { 
                        return card[filterType] <= category
                    })
                } else {
                    newData = data.filter(function(card) { // после фильтрации создается новый массив
                        return card[filterType] == category
                    })
                }
                parentEl.innerHTML = " "
                appRender(newData)
            }
        })
    })
};



//  шаблон карточки, добавление карточки в родительский элемент
function cardRender(parent, data) {
    let parentEl = document.querySelector(parent);

    let rating = renderRating(data);

    let card = `
    <div class="card">
        <img src="${data.imgUrl}" alt="Picture">
        <div class="for__icon">
            <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="card__caption">
            <h3>${data.name}</h3>
            <div class="rating"> 
                ${rating}
            </div>
            <p>${data.price}$</p>
        </div>
    </div>
    `;
    
    parentEl.innerHTML += card
};

//  создает разметку блока рейтинга 
function renderRating(data) {
    let ratingEl = "";
    for(i=0; i<data.rating; i++){
        ratingEl += '<i class="fas fa-star"></i>';
    }
    return ratingEl;
}

//  создает карточки из массива объктов (карточек)
function appRender(data) {
    data.forEach(function(card){
        cardRender(".main__files", card);
    });
};
appRender(data);




// создает клик на корзину
let btnBox = document.querySelector(".icon__item.pack")
let boxPage = document.querySelector('.bag-page.hidden')
function hiddenBlock() {
    boxPage.classList.toggle("hidden")
};

btnBox.addEventListener("click", hiddenBlock)



// бургер меню
let menu = document.querySelector(".menu-burger")
let links = document.querySelectorAll(".burger.menu__link")

menu.addEventListener("click", function(e) {
    // console.log(e.target);
    menu.classList.toggle("active")
  })