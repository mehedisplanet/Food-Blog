let loadData = () => {
  let searchText = document.getElementById("searchText").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayData(data.meals));
};

let displayData = (data) => {
  console.log(data);
  if (data == null) {
    document.getElementById("totalMeals").innerText = "0";
    let mealsContainer = document.getElementById("mealsContainer");
    mealsContainer.innerHTML = "";
    let nodata=document.createElement("div");
    nodata.innerHTML=`<h2><br/><br/><br/><br/>No Data Found</h2>`;
    mealsContainer.appendChild(nodata);
  } else {
    document.getElementById("totalMeals").innerText = data.length;
    let mealsContainer = document.getElementById("mealsContainer");
    mealsContainer.innerHTML = "";
    data.forEach((meal) => {
      console.log(meal);
      let card = document.createElement("div");
      card.classList.add("box");
      card.innerHTML = `
       <img class="imgBox" src="${meal.strMealThumb}" alt=""/>
      <h2>${meal.strMeal.slice(0,30)}</h2>
      <p>${meal.strArea}</p>
      <p>${meal.strTags}</p>
      <button onclick="displayModal('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Details
    </button>
      `;
      mealsContainer.appendChild(card);
    });
  }
};

let displayModal = async (id) => {
  try {
    let response = await fetch(
      `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let data = await response.json();
    console.log(data.meals[0]);

    let modalBody = document.getElementById("modalBody");
    let modalTitle = document.getElementById("modalTitle");
    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";
    data.meals.forEach((meal) => {
      console.log(meal);
      let card = document.createElement("div");
      card.innerHTML = `

      <p>${meal.strInstructions}</p>`;
      modalBody.appendChild(card);
    });
    data.meals.forEach((meal) => {
      console.log(meal);
      let title = document.createElement("div");
      title.innerHTML = `
      <p>${meal.strMeal}</p>`;
      modalTitle.appendChild(title);
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
