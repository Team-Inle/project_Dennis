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
    queryParam = 'insertion-sort';
    InsertionSort();
} else if (chosenAlgo == 'quick_sort') {
    queryParam = 'quick-sort'
} else if (chosenAlgo == 'merge_sort') {
    queryParam = 'merge-sort';
    MergeSort();
}





  
// Function to generate the array of blocks
function generatearray() {
    for (let i = 0; i < 20; i++) {
  
        // return random value between 1 and 100
        let value = Math.ceil(Math.random() * 100);
  
        // create div element
        let array_ele = document.createElement("div");
  

        array_ele.classList.add("block");
  
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;



        array_ele.innerText = value;
    
  
        // create label element for displaying 
        // size of particular block

        // let array_ele_label = document.createElement("label");
        // array_ele_label.classList.add("block_id");
        // array_ele_label.innerText = value;
        
  
        // append elements to index.html 

        // array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}
  
// Promise to swap two blocks
function swap(block1, block2) {
    return new Promise((resolve) => {
  
        // exchange styles of two blocks
        let temp = block1.style.transform;
        block1.style.transform = block2.style.transform;
        block2.style.transform = temp;
  
        window.requestAnimationFrame(function() {
  
            // wait for 250 ms to continue 
            setTimeout(() => {
                container.insertBefore(block2, block1);
                resolve();
            }, 250);
        });
    });
}
  
// async bubblesort
async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");

    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            // change color of blocks currently being prepared
            blocks[j].style.backgroundColor = "blue";
            blocks[j + 1].style.backgroundColor = "blue";
  
            // set 0.1 sec delay
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
  
            // var value1 = Number(blocks[j].childNodes[0].innerHTML);
            // var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            let value1 = Number(blocks[j].innerHTML);
            let value2 = Number(blocks[j+1].innerHTML);
  
            // compare values
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            // change color back
            blocks[j].style.backgroundColor = "gray";
            blocks[j + 1].style.backgroundColor = "gray";
        }
  
        // color change to identify max found in current pass
        blocks[blocks.length - i - 1]
                .style.backgroundColor = "green";
    }
}
  
// async selection sort 
async function SelectionSort(delay = 300) {
    let blocks = document.querySelectorAll(".block");

     var min_idx = 0;
     for (var i = 0; i < blocks.length; i += 1) {
    
      min_idx = i;
    
      // ith bar is dark blue
      blocks[i].style.backgroundColor = "darkblue";
      for (let j = i + 1; j < blocks.length; j += 1) {
    
        // jth bar is red
        blocks[j].style.backgroundColor = "red";
          
        // set 200 ms delay
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );
     
        let val1 = parseInt(blocks[j].innerHTML);
     
        let val2 = parseInt(blocks[min_idx].innerHTML);
          

        if (val1 < val2) {
          if (min_idx !== i) {
    
            // min indexth bar is blue
            blocks[min_idx].style.backgroundColor = "blue";
          }
          min_idx = j;
        } else {
    
          // jth bar is blue
          blocks[j].style.backgroundColor = "blue";
        }
      }
    
      // swap ith and (min_idx)th block
      let temp1 = blocks[min_idx].style.height;
      let temp2 = blocks[min_idx].innerText;
      blocks[min_idx].style.height = blocks[i].style.height;
      blocks[i].style.height = temp1;
      blocks[min_idx].innerText = blocks[i].innerText;
      blocks[i].innerText = temp2;
        
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 300)
      );
    
      // min-indexth bar turns blue
      blocks[min_idx].style.backgroundColor = "blue";
    
      // ith bar turns green
      blocks[i].style.backgroundColor = "green";
    }
    
  }

  async function InsertionSort(delay = 600) {
    let blocks = document.querySelectorAll(".block");
    
    // 0th bar is lightgreen
    blocks[0].style.backgroundColor = " rgb(49, 226, 13)";
    for (var i = 1; i < blocks.length; i += 1) {

      let j = i - 1;
    
      let key = 
      parseInt(blocks[i].innerHTML);
    
      let height = blocks[i].style.height;
      blocks[i].style.backgroundColor = "darkblue";
        
      await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 300)
    );
    
      while (j >= 0 && parseInt(blocks[j].innerHTML) > key) {
          
        // jth bar is darkblue
        blocks[j].style.backgroundColor = "darkblue";
          
        // swap jth and (j+1)th element
        blocks[j + 1].style.height = blocks[j].style.height;
        blocks[j + 1].innerText = 
        blocks[j].innerText;
    
        j = j - 1;
    
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );
          
        // turn sorted portion lightgreen
        for(let k=i;k>=0;k--){
          blocks[k].style.backgroundColor = " rgb(49, 226, 13)";
        }
      }
    
      // move selected element to correct position
      blocks[j + 1].style.height = height;
      blocks[j + 1].innerHTML = key;
         
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );
        
      // Provide light green color to the ith bar
      blocks[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
  }

  function MergeSort(){
    let blocks = document.querySelectorAll('.block')
    let numArray = [];

    // extract all the number values from the block labels
    for (let i=0; i<blocks.length; i++){
      numArray.push(parseInt(blocks[i].innerText))
    }
    MergeSortHelper(numArray);
  }

  async function MergeSortHelper(numArr){
    let len = numArr.length
    if (len<2){
      return
    }
    let mid = Math.floor(len/2)
    let leftArr = [];
    let rightArr = [];
    for (let i = 0; i <= mid - 1; i++){
      leftArr.push(numArr[i])
    }
    for (let j = mid; j <= len - 1; j++){
      rightArr.push(numArr[j])
    }
    MergeSortHelper(leftArr);
    MergeSortHelper(rightArr);
    await Merge(leftArr, rightArr);
    }

  async function Merge(left, right){
    let blocks = document.querySelectorAll('.block')
    let nL = left.length;
    let nR = right.length;
    let i=0; let j=0; let k=0;
    while (i < nL && j < nR){

      if (left[i] <= right[j]){
        //instead of overwriting to outarray, 
        //manipulate blocks themselves
        blocks[k].style.height = `${left[i] * 3}px`;
        blocks[k].innerText = left[i];
        i++; k++;

      } else {
        blocks[k].style.height = `${right[j] * 3}px`;
        blocks[k].innerText = right[j];
        j++; k++;
      } //take care of the leftovers
    } //case where there are leftovers from the left array
    while (i < nL){
      blocks[k].style.height = `${left[i] * 3}px`;
      blocks[k].innerText = left[i];
      i++; k++
    } // case where there are leftovers from the right array
    while (j < nR) {
      blocks[k].style.height = `${right[i] * 3}px`
      blocks[k].innerText = right[j];
      j++; k++;
    }
  }
  

// code to grab text from Dipan's microservice 
const fetchScrollText = async() => {
    try {
        const res = await axios.get(`https://microservice-dipan.herokuapp.com/scrape?algorithm=` + queryParam)
        console.log(res.data)
        const text = res.data.description;
        return text;
    } catch(e) {
        console.log('error', e)
    }
}

// code to push fetched scrolltext into scrollbox
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

