


const dataCar=[]
function fetchdata() {
  fetch("/assets/js/cars.json")
  .then((response) => response.json())
  .then((data) =>{ dataCar.push(...data.cars)  
   featchCard(data)})
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}



const cards = document.querySelector("#cards");
const icons=document.querySelectorAll(".icons")

let page = 1;
let limitpage = 6;



  let icon="grid-outline";
   
  

icons.forEach(items=>{
    items.addEventListener("click",(event)=>{
          icon=event.target.name
  
          fetchdata()
    })
  })
  



function featchCard(data) {
  let beginpage = limitpage * (page - 1);
  let endpage = limitpage * page - 1;
  const styleCalss= icon=="grid-outline"?"grid lg:grid-cols-3 justify-center md:grid-cols-3 sm:grid-cols-2 md:-my-1 lg:-mr-12 gap-6 pb-8":"flex flex-col gap-3 justify-center ml-50 pb-8"

  cards.innerHTML = "";
    
  cards.setAttribute("class",styleCalss);
  
  data.cars.forEach((element, key) => {
    if (key >= beginpage && key <= endpage) {
      const html = `
        <div class="  px-1    p-2 bg-white rounded-xl transform transition-all  ${icon==="grid-outline"?"row-span-1 col-span-1 w-64":"flex flex-row w-4/5"} ">
        <img
          class="h-40 object-cover rounded-xl"
          src="${element.image}"
          alt="voiture"
        />
        <div class="card-detail ">
        <div class="p-2">
          <h2 class="font-bold text-lg">${element.make}</h2>
          
          <p class="text-sm text-gray-600">
          ${element.description}
          </p>
        </div>
    
        <div class="m-2">
        <button onclick="addToCart(${element.id})" class="py-1 px-3 bg-[#15211B] text-white font-semibold rounded-lg shadow-md ${icon!=="grid-outline"?"w-full":""} ">Add to Cart</button>
   
        </div>
        </div>
      </div>
        `;
      cards.insertAdjacentHTML("beforeend", html);
    }
  });
  

  pagination();
}

function pagination() {
  let count = Math.ceil(18 / limitpage);
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    const htmlPaginate = `<li>
    <button
      class="h-10 px-5   ${i==page?' text-white bg-indigo-600 border-indigo-600':' text-indigo-600'}transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100"
      onclick="changePage(${i})"  >
  
      ${i}
    </button>
  </li>`;


    pagination.insertAdjacentHTML("beforeend", htmlPaginate);
  }
}

function changePage(index) {
  page=index;
  fetchdata();
}











fetchdata();




const navLinks = document.querySelector(".nav-links");
function ontoggleMenu(e) {
  e.name = e.name === "menu-outline" ? "close-outline" : "menu-outline";
  navLinks.classList.toggle("top-[14.7%]");
  navLinks.classList.toggle("bg-slate-50/20");
}

const modal=document.querySelector(".Modal")

const hiddenMadal=document.querySelectorAll(".close-modal")
const imgModal=document.querySelector(".img-modal")
const markModal=document.querySelector(".marke-modal")
const nameModal=document.querySelector(".name-modal")
const priceModal=document.querySelector(".price-modal")
const descriptionModal=document.querySelector(".discription-modal")

hiddenMadal.forEach(item=>{
  item.addEventListener("click",function(){
    modal.classList.add("hidden")
  })
})



function addToCart(items) {
        const infoCar= dataCar.find(car=>car.id===items)
        modal.classList.remove("hidden")
        console.log(infoCar);
       imgModal.setAttribute("src",infoCar.image)
       markModal.textContent=infoCar.make
       nameModal.textContent=infoCar.name
       priceModal.textContent=infoCar.price
       descriptionModal.textContent=infoCar.description
}


