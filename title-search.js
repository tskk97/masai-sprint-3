var res = JSON.parse(localStorage.getItem('output'))
console.log(res)

var title = res.Title
var year = res.Year
var rated = res.Rated
var released = res.Released
var runtime = res.Runtime
var genre = res.Genre
var director = res.Director
var writer = res.Writer
var actors = res.Actors
var plot = res.Plot
var language = res.Language
var country = res.Country
var awards = res.Awards
var dvd = res.DVD

var poster = res.Poster
if(poster == "N/A"){
    poster = "resources/no-poster.png"
}
else{
    tempPoster = poster.split("")
    tempPoster[tempPoster.length-7] = "10"
    poster = []
    for(var i = 0; i < tempPoster.length; i++){
        poster.push(tempPoster[i])
    }
    poster = poster.join("")
    poster = String(poster)
}

var imdb = res.imdbRating
if(res.Ratings[1] == undefined){
    var rottentomatoes = "N/A"
}
else{
    var rottentomatoes = res.Ratings[1].Value
}

var metascore = res.Metascore

var type = res.Type
var tempType = type.split("")
tempType[0] = tempType[0].toUpperCase()
type = tempType.join("")

var boxoffice = res.BoxOffice
var production = res.Production

var moviePoster = document.getElementById("moviePoster")
var img = document.createElement('img')
img.setAttribute('src', poster)
img.setAttribute('class', 'img-fluid')
moviePoster.appendChild(img)

document.getElementById("movieName").textContent = title
document.getElementById("movieYear").textContent = " "+year
document.getElementById("movieRated").textContent = " "+rated
document.getElementById("movieReleased").textContent = " "+released
document.getElementById("movieRuntime").textContent = " "+runtime
document.getElementById("movieGenre").textContent = " "+genre
document.getElementById("movieDirector").textContent = " "+director
document.getElementById("movieWriter").textContent = " "+writer
document.getElementById("movieActors").textContent = " "+actors
document.getElementById("moviePlot").textContent = " "+plot
document.getElementById("movieLanguage").textContent = " "+language
document.getElementById("movieCountry").textContent = " "+country
document.getElementById("movieAwards").textContent = " "+awards
document.getElementById("movieDvd").textContent = " "+dvd
document.getElementById("movieImdb").textContent = " "+imdb
document.getElementById("movieRottenTomatoes").textContent = " "+rottentomatoes
document.getElementById("movieMetascore").textContent = " "+metascore
document.getElementById("movieType").textContent = " "+type
document.getElementById("movieBoxOffice").textContent = " "+boxoffice
document.getElementById("movieProduction").textContent = " "+production

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