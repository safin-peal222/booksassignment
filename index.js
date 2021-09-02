
document.getElementById('search-result').style.display = "none";

const displayCover = (coverID) => {
  const url = `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
  return url;
}





  const loadButton = () => {
  const showDescription = document.getElementById('show-desc');
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;
  searchField.value = '';
  document.getElementById('search-result').style.display = "none";

  
  showDescription.textContent = '';
  if (searchText === '') {


    document.getElementById('search-result').style.display = "block";
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const div = document.createElement('div');

    div.innerHTML = `
   <h1 class="text-warning col-md-6 mx-auto">No Input</h1>
   
   `
    searchResult.appendChild(div);


  } else {
    

    url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url).then(res => res.json()).then(data => displayData(data)).catch(error => displayError(error));
  }
}



const displayError =(error)=>{
  document.getElementById('search-result').style.display = "block";
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const div = document.createElement('div');

    div.innerHTML = `
   <h1 class="text-danger col-md-6 mx-auto">${error}</h1>
   
   `
    searchResult.appendChild(div);
}








    const displayData = (getData) => {
      const data = getData.docs.slice(0,40);
  const showDescription = document.getElementById('show-desc');
  showDescription.textContent = '';

  //show search result
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  if (data.length > 0) {
    const div = document.createElement('div');
    document.getElementById('search-result').style.display = "block";
    div.innerHTML = `
    <h1 class="text-warning col-md-6 mx-auto">Total ${getData.numFound} result Found</h1>
    
    `
    searchResult.appendChild(div);
  } 
  else {
    const div = document.createElement('div');
    document.getElementById('search-result').style.display = "block";
    div.innerHTML = `
    <h1 class="text-success col-md-6 mx-auto">No result Found Search Again</h1>
    
    `
    searchResult.appendChild(div);
      }

  showDescription.textContent = '';

  data.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card rounded-5 shadow-lg">
            <img src="${displayCover(result.cover_i)}" class="card-img-top" alt="...">
           <div>
            <div class="card-body">
              <h5 class="card-title"><span class="text-success">Book Name:</span> ${result.title}</h5>
              <p class="card-text"><span class="text-success">Author Name :</span> ${result.author_name ? result.author_name:'Not Available'}</p>
              <p class="card-text"><span class="text-success">Publisher :</span> ${result.publisher ? result.publisher: 'Not Available'}</p>
              <p class="card-text"><span class="text-success">First Publish Year:</span> ${result.first_publish_year? result.first_publish_year:'Not Available'}</p>
              
            </div>
           </div>
          </div>
        
        `
    showDescription.appendChild(div);
  });
}


