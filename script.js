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