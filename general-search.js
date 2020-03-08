var res = JSON.parse(localStorage.getItem('output'))
console.log(res)

var displayAll = document.getElementById("displayAll")
for(var i = 0; i < res.Search.length; i++){

    var title = res.Search[i].Title
    var year = res.Search[i].Year
    var imdbIDTag = res.Search[i].imdbID
    var poster = res.Search[i].Poster
    if(poster == "N/A"){
        poster = "resources/no-poster.png"
    }

    var div1 = document.createElement('div')
    div1.setAttribute('class', 'col-12 col-sm-6 col-xl-3 my-5')

    var div2 = document.createElement('div')
    div2.setAttribute('class', 'card border-dark mx-auto shadow')
    div2.setAttribute('style', 'width: 18rem;')

    var div3 = document.createElement('div')
    div3.setAttribute('class', 'card-body bg-warning')

    var div4 = document.createElement('div')
    div4.setAttribute('class', 'h5 card-title font-weight-bold')

    var span = document.createElement('span')
    span.setAttribute('class', 'font-weight-bold')

    var button = document.createElement('button')
    button.setAttribute('class', 'btn btn-dark offset-7 viewBtn')
    button.setAttribute('id', imdbIDTag)
    button.setAttribute('onclick', 'viewContent(event)')

    var img = document.createElement('img')
    img.setAttribute('class', 'card-img-top')
    img.setAttribute('src', poster)

    div4.textContent = title
    span.textContent = year
    button.textContent = "View"

    div3.appendChild(div4)
    div3.appendChild(span)
    div3.appendChild(button)

    div2.appendChild(img)
    div2.appendChild(div3)

    div1.appendChild(div2)

    displayAll.appendChild(div1)
}

function viewContent(event){
    // alert(event.target.id)
    var output = null
    var movieID = event.target.id
    console.log(movieID)
    var xhr = new XMLHttpRequest()
    var url = 'http://www.omdbapi.com/?i='+movieID+'&apikey=1921ab67'
    console.log(url)
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        output = JSON.parse(xhr.response)
        if(output.Response == "False"){
            alert(output.Error)
        }
        else{
            localStorage.setItem('output',JSON.stringify(output))
            location.replace('/home/saikiran/projects/masai/sprint-3/title-search.html')
        }
    }
}

function generalSearch(){
    var output = null
    var xhr = new XMLHttpRequest()
    var tempTitle = document.getElementById("title").value
    tempTitle = tempTitle.split(" ")
    console.log(tempTitle)
    var title = ""
    for(var i = 0; i < tempTitle.length; i++){
        if(i != tempTitle.length-1){
            title = title + tempTitle[i] + "+"
        }
        else{
            title = title + tempTitle[i]
        }
    }
    var url = 'http://www.omdbapi.com/?s='+title+'&apikey=1921ab67'
    console.log(url)
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        output = JSON.parse(xhr.response)
        if(output.Response == "False"){
            alert(output.Error)
        }
        else{
            localStorage.setItem('output',JSON.stringify(output))
            location.replace('/home/saikiran/projects/masai/sprint-3/general-search.html')
        }
    }
}

function searchMovie(){
    var output = null
    var xhr = new XMLHttpRequest()
    var tempTitle = document.getElementById("title").value
    tempTitle = tempTitle.split(" ")
    console.log(tempTitle)
    var title = ""
    for(var i = 0; i < tempTitle.length; i++){
        if(i != tempTitle.length-1){
            title = title + tempTitle[i] + "+"
        }
        else{
            title = title + tempTitle[i]
        }
    }
    var url = 'http://www.omdbapi.com/?t='+title+'&apikey=1921ab67'
    console.log(url)
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        output = JSON.parse(xhr.response)
        if(output.Response == "False"){
            alert(output.Error)
        }
        else{
            localStorage.setItem('output',JSON.stringify(output))
            location.replace('/home/saikiran/projects/masai/sprint-3/title-search.html')
        }
    }
}

var searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener('click', function(){
    event.preventDefault()
    var input = document.getElementById("title").value
    var selectChoice = document.getElementById("selectChoice").value
    if(input == ""){
        alert("Your Request is Invalid! Try again!")
    }
    else{
        if(selectChoice == 1){
            localStorage.clear()
            searchMovie()
        }
        else if(selectChoice == 2){
            localStorage.clear()
            generalSearch()
        }
    }
})