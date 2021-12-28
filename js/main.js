let explore = document.getElementsByClassName("explore")[0];
let oval = document.getElementsByClassName("oval")[0];

explore.addEventListener("mouseover", () => {
  oval.style.cssText = `transform: scale(1)`;
});
explore.addEventListener("mouseout", () => {
  oval.style.cssText = `transition: all 1.4s;transform: scale(0.3)`;
});

explore.addEventListener("click", () => {
  oval.addEventListener("transitionend", () => {
    explore.querySelector("a").href = "#destination";
    explore.querySelector("a").click();
  });
});

let navBar = document.getElementsByClassName("nav-bar")[0];
let navv = document.getElementsByClassName("navv")[0];
let navMenu = document.getElementsByClassName("nav-menu")[0];
let closeBtn = document.getElementsByClassName("mobile-nav")[0];
navv.addEventListener("click", () => {
  navMenu.classList.add("show");
  navBar.classList.add("full-height");
});
closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("show");
  navBar.classList.remove("full-height");
});

/*********Nav Indigator*********** */

let allSection = document.querySelectorAll('section[class*="section"]');
let navItems = document.querySelector(".nav-items").querySelectorAll("li");
window.onscroll = () => {
  let current;
  allSection.forEach((sec) => {
    if (scrollY >= sec.offsetTop) {
      
      current = document.getElementsByClassName(sec.id + "-tab")[0];
    }
  });
  let navMenu = document.getElementsByClassName("nav-menu")[0];
  if (current.classList.contains('home-tab')) navMenu.style.backgroundColor = "hsla(0, 0%, 100%, 0.1)";
  else navMenu.style.backgroundColor = "rgba(66, 66, 66, 0.521)";
  navItems.forEach((item) => {
    item.classList.remove("active");
    current.classList.add("active");
  });
};
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    item.querySelector("a").click();
  });
});
/******Technology photo responsive******** */
let techPhoto = document.getElementsByClassName('tech-photo')[0];
if (window.innerWidth < 1200) {
  techPhoto.src = "./assets/technology/image-launch-vehicle-landscape.jpg";
} else {
  techPhoto.src = "./assets/technology/image-launch-vehicle-portrait.jpg";
}
window.addEventListener('resize', ()=>{
  if (window.innerWidth < 1200) {
    techPhoto.src = "./assets/technology/image-launch-vehicle-landscape.jpg";
  } else {
    techPhoto.src = "./assets/technology/image-launch-vehicle-portrait.jpg";
  }
});

/**********Fetch Json Data********* */
fetch('./../data.json')
.then(res => res.json())
.then(data => {
  console.log(data);
  sliderSec(data);
  crewSec(data);
  techSec(data);
});

/*********Destination Section*********** */
let desInfoTitle = document.querySelector('.des-info-content .title');
let desInfoContent = document.querySelector('.des-info-content .text-content');
let avgDistance = document.querySelector('.avg-distance .distance-value');
let travelTime = document.querySelector('.travel-time .distance-value');
let desInfoImg = document.querySelector('.des-info-img');
let desSlideBarItem = document.querySelector('.des-slidebar ul');
let desSlideBarList = document.querySelectorAll('.des-slidebar ul li');
desSlideBarList.forEach(item =>{
  
  item.addEventListener('click', ()=>{
    desSlideBarList.forEach(item => item.classList.remove('active'));
    item.classList.add("active");
  });
});
function sliderSec(jsonData){
  desSlideBarItem.addEventListener("click", (e) => {
    let linkIndex = Number(e.target.dataset.linkindex);
    desInfoTitle.textContent = jsonData.destinations[linkIndex].name;
    desInfoContent.textContent = jsonData.destinations[linkIndex].description;
    avgDistance.textContent = jsonData.destinations[linkIndex].distance;
    travelTime.textContent = jsonData.destinations[linkIndex].travel;
    desInfoImg.src = jsonData.destinations[linkIndex].images.webp;
  });

}

/*****Crew Section***** */
let allCrewIndi = document.querySelectorAll('.crew-indicator');
let role = document.querySelector('.crew-content span:first-child');
let cName = document.querySelector(".commander-name");
let bio = document.querySelector(".commander-info");
let crewPhoto = document.querySelector('.crew-photo');
function crewSec(jsonData){
  allCrewIndi.forEach(item =>{
    item.addEventListener('click', ()=>{
      allCrewIndi.forEach(item => item.classList.remove('indi-active'));
      item.classList.add('indi-active');
      let indiIndex = Number(item.dataset.indiindex);
      role.textContent = jsonData.crew[indiIndex].role;
      cName.textContent = jsonData.crew[indiIndex].name;
      bio.textContent = jsonData.crew[indiIndex].bio;
      crewPhoto.src = jsonData.crew[indiIndex].images.webp;
    });
  });
}

/********Technology Section******* */
let techIndicators = document.querySelectorAll(".tech-indicator-section .tech-indicator");
let techTitle = document.querySelector('.tech-content-title');
let techArticle = document.querySelector('.tech-content-article');
let techPhotoSec = document.querySelector('.tech-photo');

function techSec(jsonData){
  techIndicators.forEach((item) => {
    item.addEventListener("click", () => {
      techIndicators.forEach((item) => item.classList.remove("tech-active"));
      let techIndex = Number(item.dataset.techindex);
      item.classList.add("tech-active");
      techTitle.textContent = jsonData.technology[techIndex].name;
      techArticle.textContent = jsonData.technology[techIndex].description;
      if (window.innerWidth < 1200) {
        techPhoto.src = jsonData.technology[techIndex].images.landscape;
      } else {
        techPhoto.src = jsonData.technology[techIndex].images.portrait;
      }
    });
  });
}

