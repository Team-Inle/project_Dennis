const enterButton = document.querySelector('#enterButton')
enterButton.addEventListener('click', valueSender)


//send chosen algo to tables page
function valueSender()
    {
    let checkedValue = null; 
    const inputElements = document.getElementsByClassName('checkbox');
    for(let i=0; i < inputElements.length; i++){
            if(inputElements[i].checked){
                checkedValue = inputElements[i].name;
                break;
            }
    }
    localStorage.setItem("chosenAlgo", checkedValue);
    window.location.href="tables.html";
    }