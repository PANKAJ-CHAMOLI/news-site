const API_KEY = "b98116a85a844976b61d44d6e12a0055";                                                                                                             
const url = "https://newsapi.org/v2/everything?q=";
let from = "2024-06-01";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&from=${from}&sortBy=relevancy&apiKey=${API_KEY}`);
        const data = await res.json();
        Animation2();
        displayWindow(data.articles);
        window.scrollTo(0, 0);
    }
    catch (error) {
        console.error("Error fetching news.", error);
    }
}

function displayWindow(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = '';
     
    let count = 0;    
    
    articles.forEach(article => {
        if (count >= 30) return;
        if (!article.urlToImage) return;

            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
             count++;
            });
    }

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsDate = cardClone.querySelector("#news-date");
    const newsDesc = cardClone.querySelector("#news-desc");
    const source= cardClone.querySelector("#source");
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML =article.title;
    newsDesc.innerHTML = article.description;
    source.innerHTML = article.source.name;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
       
    });
    
    newsDate.innerHTML = `${date}`; 

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

function reload() {
    window.location.reload();
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
   
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
 
function Animation() {
    var tl = gsap.timeline();

    tl.from("nav", {
        y: '-10',
        opacity: '0',
        duration: 1.9,
        ease: Expo.easeInOut

    });
    tl.from("#card-container", {
        opacity: '0',
        duration: 1,
        ease: Expo.easeInOut

    });
}
Animation();
async function Animation2() {
    var tl = gsap.timeline();
   
    tl.from("#card-container", {
        opacity: '0',
        duration: 1,
        ease: Expo.easeInOut
    
    });
}


