const loadCatagoris = async () => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/categories`
    );
    const data = await res.json();
    const allCatagory = data.data;
    diplayCatagoris(allCatagory);
  };
  
  const diplayCatagoris = (allCatagory) => {
    const btnContainer = document.getElementById("button-container");
    btnContainer.classList = `text-center flex justify-center gap-5`;
    allCatagory.forEach((singleCatagory) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <button onclick="loadCatagorisDetail('${singleCatagory.category_id}')" class="btn">${singleCatagory.category}</button>
          `;
      btnContainer.appendChild(div);
    });
  };
  
  const loadCatagorisDetail = async (category_id) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
  
    const phTubeDeatais = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${category_id}`
    );
    const res = await phTubeDeatais.json();
    const data = res.data;
  
    if (data.length === 0) {
      const noDataMessage = document.createElement("div");
      noDataMessage.innerHTML = `
      <img class='lg:ml-[600px] mt-[200px]' src="images/Icon.png" alt="">
        <h2 class='lg:ml-[530px] w-[300px]'>
          Oops!! Sorry, There is no content here
        </h2>
      `;
  
      cardContainer.appendChild(noDataMessage);
    } else {
      data.forEach((eachDetais) => {
        const div = document.createElement("div");
        div.classList = `card  bg-base-100 shadow-xl`;
        const isVerified = eachDetais.authors[0]?.verified;
        let hours = 0;
      let minutes = 0;
  
      if (eachDetais.others?.posted_date) {
        const totalSecond = parseFloat(eachDetais.others?.posted_date);
        hours = Math.floor(totalSecond / 3600);
        minutes = Math.floor((totalSecond % 3600) / 60);
      }
    
        let timeString = "";
        if (hours > 0) {
          timeString += `${hours}hrs `;
        }
        if (minutes > 0) {
          timeString += `${minutes}min `;
        }
    
        if (timeString) {
          timeString += "ago";
        }
    
        
        div.innerHTML = `
        <figure><img src=${eachDetais.thumbnail} /></figure>
        <div class="flex justify-end mt-[-40px] mr-[30px] text-white">
        <p class="text-sm py-2 px-4 rounded-xl">${timeString}</p>
      </div>
       
              <div class="card-body">
                <div class="flex gap-5">
                  <img class="justify-start h-12 w-12 rounded-full" src=${
                    eachDetais.authors[0]?.profile_picture
                  } />
                  <h2 class="card-title">
                    ${eachDetais.title}
                  </h2>
                </div>
                <div class='inline'>
                  <p class="inline">${eachDetais.authors[0]?.profile_name}</p>
                  ${
                    isVerified
                      ? '<img class="inline" id="verified-icon" src="icon.png" alt="Verified Icon" class="w-4 h-4 ml-1">'
                      : ""
                  }
                </div>
                <p>${eachDetais.others.views}</p>
              </div>
        `;
        cardContainer.appendChild(div);
      });
    }
  };
  const dataSorted = async () => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    let sortData = false;
    if (!sortData) {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/category/1000"
      );
      const data = await res.json();
      const eachData = data.data;
      sortData = eachData;
    }
    sortData.sort((a, b) => {
      const viewsA = parseFloat(a.others.views.replace("K", ""));
      const viewsB = parseFloat(b.others.views.replace("K", ""));
      return viewsB - viewsA;
    });
    sortData.forEach((singleData) => {
      const div = document.createElement("div");
      div.classList = `card  bg-base-100 shadow-xl`;
      const isVerified = singleData.authors[0]?.verified;
      let hours = 0;
      let minutes = 0;
  
      if (singleData.others?.posted_date) {
        const totalSecond = parseFloat(singleData.others?.posted_date);
        hours = Math.floor(totalSecond / 3600);
        minutes = Math.floor((totalSecond % 3600) / 60);
      }
    
        let timeString = "";
        if (hours > 0) {
          timeString += `${hours}hrs `;
        }
        if (minutes > 0) {
          timeString += `${minutes}min `;
        }
    
        if (timeString) {
          timeString += "ago";
        }
      div.innerHTML = `
        <figure><img src=${singleData.thumbnail} /></figure>
        <div class="flex justify-end mt-[-40px] mr-[30px] text-white">
        <p class="text-sm py-2 px-4 rounded-xl">${timeString}</p>
      </div>
              <div class="card-body">
                <div class="flex gap-5">
                  <img class="justify-start h-12 w-12 rounded-full" src=${
                    singleData.authors[0]?.profile_picture
                  } />
            
                  <h2 class="card-title">
                    ${singleData.title}
                  </h2>
                </div>
                <div class='inline'>
                  <p class="inline">${singleData.authors[0]?.profile_name}</p>
                  ${
                    isVerified
                      ? '<img class="inline" id="verified-icon" src="icon.png" alt="Verified Icon" class="w-4 h-4 ml-1">'
                      : ""
                  }
                </div>
                <p>${singleData.others.views}</p>
              </div>
        `;
      cardContainer.appendChild(div);
    });
  };
  
  const loadBlog = () => {
    const blogContainer = document.getElementById("card-container");
    blogContainer.innerHTML = ""; // Clear any existing content
  
    // Create a div element to hold the blog content
    const div = document.createElement("div");
    div.innerHTML = `
    <h3 class='text-4xl font-bold text-center w-full'> Discuss the scope of var, let, and const
      </h3>
      <p>In JavaScript, var, let, and const are used to declare variables, but they have different scopes and behaviors. Understanding their scope is crucial for writing clean and bug-free code. Let's discuss the scope of each:
    
       var:
      
      Function Scope: Variables declared with var are function-scoped, which means they are only accessible within the function in which they are defined. If declared outside any function, they become global variables.
      Hoisting: Variables declared with var are hoisted to the top of their containing function or global scope. This means you can access them before they are actually declared, although their value will be undefined.
      let:
    
     Block Scope: Variables declared with let have block scope, meaning they are only accessible within the block (usually defined by curly braces {}) in which they are declared. This includes loops, conditionals, and functions.
     No Hoisting: Unlike var, variables declared with let are not hoisted to the top of their containing block. You cannot access them before their declaration.
    
    const:
    
     Block Scope: Like let, variables declared with const also have block scope.
    Constant Value: Variables declared with const are constants, which means their value cannot be reassigned after they are declared. However, for objects and arrays declared with const, their properties or elements can be modified.
     No Hoisting: Similar to let, const variables are not hoisted.</p>
     <h3 class='text-4xl font-bold'>Tell us the use cases of null and undefined
       </h3>
      <p>
      In JavaScript, both null and undefined represent the absence of a value, but they are used in slightly different contexts and have distinct use cases:
    
    undefined:
    
     Default Value: When a variable is declared but not initialized, it has an undefined value by default
     Object Properties: If you try to access an object property that doesn't exist, it returns undefined.
     null:
    
    Explicit Absence of Value: Unlike undefined, null is usually assigned explicitly to indicate the absence of a value. It is often used to represent that a variable or object property intentionally has no meaningful value.
     In summary, undefined typically indicates that a variable or property has not been assigned a value, while null is used to represent the explicit absence of a value. It's important to be mindful of the differences between these two concepts and use them appropriately in your code to ensure clarity and avoid unexpected behavior.
    In summary, undefined typically indicates that a variable or property has not been assigned a value, while null is used to represent the explicit absence of a value. It's important to be mindful of the differences between these two concepts and use them appropriately in your code to ensure clarity and avoid unexpected behavior.
    
     In summary, undefined typically indicates that a variable or property has not been assigned a value, while null is used to represent the explicit absence of a value. It's important to be mindful of the differences between these two concepts and use them appropriately in your code to ensure clarity and avoid unexpected behavior.
    
     </p>
     <h3 class='text-4xl font-bold'>What do you mean by REST API?
       </h3>
       <p>An API, or application programming interface, is a set of rules that define how applications or devices can connect to and communicate with each other. A REST API is an API that conforms to the design principles of the REST, or representational state transfer architectural style.</p>
    
    `;
  
    // Append the div with blog content to the blogContainer
    blogContainer.appendChild(div);
  };
  
  
  
  
  
  loadCatagorisDetail("1000");
  loadCatagoris();