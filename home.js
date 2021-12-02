const enterButton = document.querySelector('#enterButton')

let validInput = true;
enterButton.addEventListener('click', algoSender);

if (validInput == true){
    enterButton.addEventListener('click', inputSizeSender);
    enterButton.addEventListener('click', redirectWindow);
} 




//send chosen algo to tables page
function algoSender()
    {
    let checkedValue = null; 
    const inputElements = document.getElementsByClassName('checkbox');
    let countChecked = 0
    for(let i=0; i < inputElements.length; i++){

            if(inputElements[i].checked){
                checkedValue = inputElements[i].name;
                countChecked += 1
                break;
            }
 
        }
    if (countChecked == 0){
        alert('Please select a value!');
        validInput = false;   
        return;
    }
    localStorage.setItem("chosenAlgo", checkedValue);
    }


function inputSizeSender()
    {
    let inputSize = null;
    const slider = document.getElementById('rangeSlider');
    const sliderValue = slider.value
    localStorage.setItem("sizeInput", `${sliderValue}`)
    }


function redirectWindow()
    {
        window.location.href="tables.html";
    }