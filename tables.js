// const chosenAlgo = localStorage.getItem("chosenAlgo");
const chosenAlgo = localStorage.chosenAlgo
console.log(chosenAlgo)
let queryParam = null

var container = document.getElementById("array");


generatearray();



// set query Param to fetch scrollText from Dipan's microservice
if (chosenAlgo == 'bubble_sort') {
    queryParam = 'bubble-sort';
    BubbleSort();
} else if (chosenAlgo == 'selection_sort') {
    queryParam = 'selection-sort';
    SelectionSort();
} else if (chosenAlgo == 'insertion_sort') {
    queryParam = 'insertion-sort'
} else if (chosenAlgo == 'quick_sort') {
    queryParam = 'quick-sort'
} else if (chosenAlgo == 'merge_sort') {
    queryparam = 'merge-sort'
}





  
// Function to generate the array of blocks
function generatearray() {
    for (var i = 0; i < 20; i++) {
  
        // return random value between 1 and 100
        var value = Math.ceil(Math.random() * 100);
  
        // create div element
        var array_ele = document.createElement("div");
  

        array_ele.classList.add("block");
  
        // Adding style to div
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;
  
        // // Creating label element for displaying 
        // // size of particular block
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
  
        // Appending created elements to index.html 
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}
  
// Promise to swap two blocks
function swap(el1, el2) {
    return new Promise((resolve) => {
  
        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
  
        window.requestAnimationFrame(function() {
  
            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}
  
// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");
  
    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "blue";
            blocks[j + 1].style.backgroundColor = "blue";
  
            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
  
            console.log("run");
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "gray";
            blocks[j + 1].style.backgroundColor = "gray";
        }
  
        //changing the color of greatest element 
        //found in the above traversal
        blocks[blocks.length - i - 1]
                .style.backgroundColor = "green";
    }
}
  
// asynchronous function to perform "Selection Sort"
async function SelectionSort(delay = 300) {
    let blocks = document.querySelectorAll(".block");
    // Assign 0 to min_idx
     var min_idx = 0;
     for (var i = 0; i < blocks.length; i += 1) {
    
      // Assign i to min_idx
      min_idx = i;
    
      // Provide darkblue color to the ith bar
      blocks[i].style.backgroundColor = "darkblue";
      for (var j = i + 1; j < blocks.length; j += 1) {
    
        // Provide red color to the jth bar
        blocks[j].style.backgroundColor = "red";
          
        // To pause the execution of code for 300 milliseconds
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 300)
        );
    
        // To store the integer value of jth bar to var1 
        var val1 = parseInt(blocks[j].childNodes[0].innerHTML);
    
        // To store the integer value of (min_idx)th bar to var2 
        var val2 = parseInt(blocks[min_idx].childNodes[0].innerHTML);
          
        // Compare val1 & val2
        if (val1 < val2) {
          if (min_idx !== i) {
    
            // Provide skyblue color to the (min-idx)th bar
            blocks[min_idx].style.backgroundColor = "blue";
          }
          min_idx = j;
        } else {
    
          // Provide skyblue color to the jth bar
          blocks[j].style.backgroundColor = "blue";
        }
      }
    
      // To swap ith and (min_idx)th bar
      var temp1 = blocks[min_idx].style.height;
      var temp2 = blocks[min_idx].childNodes[0].innerText;
      blocks[min_idx].style.height = blocks[i].style.height;
      blocks[i].style.height = temp1;
      blocks[min_idx].childNodes[0].innerText = blocks[i].childNodes[0].innerText;
      blocks[i].childNodes[0].innerText = temp2;
        
      // To pause the execution of code for 300 milliseconds
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 300)
      );
    
      // Provide skyblue color to the (min-idx)th bar
      blocks[min_idx].style.backgroundColor = "blue";
    
      // Provide lightgreen color to the ith bar
      blocks[i].style.backgroundColor = "green";
    }
    
  }


const fetchScrollText = async() => {
    try {
        const res = await axios.get(`https://microservice-dipan.herokuapp.com/scrape?algorithm=` + queryParam)
        console.log(res)
        const text = res.data.description;
        return text;
    } catch(e) {
        console.log('error', e)
    }
}


const addScrollText = async() => {
    try {
        const ScrollText = await fetchScrollText();
        //create div that holds scrolltext 
        const scrollDiv = document.createElement('div')
        scrollDiv.classList.add('scrollbox')
        scrollDiv.innerText = ScrollText
        document.body.append(scrollDiv)
    } catch(e) {
        console.log('error', e)
    }
}

addScrollText();




// var resetValue = null;
// // reset chosenAlgo variable to null
// localStorage.setItem("chosenAlgo", resetValue);