let newList =[]
let page = 1;
let apiKey= '77440cc514994e3aa4d6d141e3b9b528'

let callAPI=async()=>{
    if(page >5){
        return;
    }
    let url=`https://newsapi.org/v2/everything?q=china&page=${page}&apiKey=${apiKey}`
    
    let data = await fetch(url);
    let result = await data.json();
    
    
    newList = result.articles;

    searchbySource();
    render(newList);
    
}

let searchByCategory = async () =>{
    let category = document.getElementById("category").value;
    let url = `https://newsapi.org/v2/everything?category=${category}&apiKey=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();

    newList = result.articles;
    render(newList);
}

let searchbySource = () => {
    let sourceName = newList.map (item=> item.source.name);

    let sourceObject = sourceName.reduce((total,name)=> {
        if (name in total){
            total[name]++;
        }else {
            total[name]=1;
        }
        return total;
    },
{});

let sourceArray = Object.keys(sourceObject);

  let htmlForSource = sourceArray.map(
    item =>
      `<input onchange='sourceClicked("${item}")' type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})`
  );

  document.getElementById("sourceArea").innerHTML = htmlForSource;
};

let render =(array) => {
    let htmlForNews = array.map((item)=>{
        return ` 
        <div class="card mb-3" style="width: 100vh" id="newsArea">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${item.urlToImage}" class="img-fluid width: 100%;" alt="Responsive image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.content}</p>
              
              <p class="card-text"><small class="text-muted">${item.publishedAt}</small> <a href="${item.url}" class="btn btn-primary float-right">Learn More</a></p>
              
            </div>
          </div>
        </div>
      </div> `
   
    }).join("");
    document.getElementById('newsArea').innerHTML=htmlForNews
};

let loadMore =async() =>{
    page ++;
    let url=`https://newsapi.org/v2/everything?q=china&page=${page}&apiKey=${apiKey}`
    
    let data = await fetch(url);
    let result = await data.json();
    
    
    newList = newList.concat(result.articles);
    
    render(newList);
}

searchByCategory()
callAPI()