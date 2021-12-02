

// get chosen algorithm from user input
const chosenAlgo = localStorage.chosenAlgo
console.log(chosenAlgo)

// queryParam used to call microservice
let queryParam = null

var container = document.getElementById("array");


makeArray();



// set query Param to fetch scrollText from Dipan's microservice,
// then call sorting visualizer function
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
    queryParam = 'quick-sort';
    QuickSort();
} else if (chosenAlgo == 'merge_sort') {
    queryParam = 'merge-sort';
    MergeSort();
}


addPic(chosenAlgo);

// function that adds pics representing single iteration
// to div below animation
function addPic(algo){
  const img = document.createElement("img");

    if (algo == 'bubble_sort'){
      img.src = "./pictures/bubble_sort.PNG"
    }else if (algo == 'selection_sort'){
      img.src = "./pictures/selection_sort.PNG"
    }else if (algo == 'insertion_sort'){
      img.src = "./pictures/insertion_sort.PNG"
    }else if (algo == 'quick_sort'){
      img.src = "./pictures/quick_sort.PNG"
    }else if (algo == 'merge_sort'){
      img.src = "./pictures/merge_sort.PNG"
    }
    const picDiv = document.createElement('div');
    img.classList.add('img')
    picDiv.appendChild(img);

    if (algo == 'quick_sort'){
      img.style.width = '35%'
    }
    document.body.append(picDiv);
  }

  
// Function to generate the array of blocks
function makeArray() {
    for (let i = 0; i < 20; i++) {
  
        //random value between 1 and 100
        let value = Math.ceil(Math.random() * 100);
  
        // create array element divs (i.e. blocks)
        let array_ele = document.createElement("div");
  
        array_ele.classList.add("block");
  
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;
        array_ele.innerText = value;
    
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
async function BubbleSort() {
    let blocks = document.querySelectorAll(".block");

    for (let i = 0; i < blocks.length; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
  
            blocks[j].style.backgroundColor = "blue";
            blocks[j + 1].style.backgroundColor = "blue";
  
            // set 100 ms delay
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            let value1 = parseInt(blocks[j].innerHTML);
            let value2 = parseInt(blocks[j+1].innerHTML);
  
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            blocks[j].style.backgroundColor = "gray";
            blocks[j + 1].style.backgroundColor = "gray";
        }
  
        // color change show max of pass
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
          
        // set 300 ms delay
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 300)
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
        blocks[j + 1].innerText = blocks[j].innerText;
    
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
        
      // turn ith bar light green
      blocks[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
  }


  function MergeSort(){
    let blocksArray = document.querySelectorAll('.block');
    MergeSortHelper(blocksArray, 0, blocksArray.length - 1)
  }


  async function MergeSortHelper(arr, left, right){
    if (left < right){

      let mid = Math.floor((left+right)/2)

      await MergeSortHelper(arr, left, mid);
      await MergeSortHelper(arr, mid+1, right);
      await Merge(arr, left, mid, right);

      for (let i=left; i<=right; i++){
        arr[i].style.backgroundColor = 'green';
      }
    }
  }


  // in place Merge function; no auxillary copy arrays needed
  async function Merge(arr, start, mid, end){
    let start2 = mid + 1;

    //if array is already merge sorted
    if(parseInt(arr[mid].innerHTML)<= parseInt(arr[start2].innerHTML)){
        return;
    }

    for (let i=start; i<=end; i++){
      arr[i].style.backgroundColor = 'lightblue';
    }

    while(start<=mid && start2<=end){

      // if elem at start less than elem at mid + 1, increment start ptr
      if(parseInt(arr[start].innerHTML) <= parseInt(arr[start2].innerHTML)){
        start += 1;

      }else{
        let value = arr[start2].innerText;
        let index = start2;

        //shift all elements between [start, start2) rightward by 1
        while (index!=start){

          arr[index].style.backgroundColor = 'blue'


          arr[index].style.height = arr[index - 1].style.height;
          arr[index].innerText = arr[index - 1].innerText;

          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 200)
          );

          arr[index].style.backgroundColor = arr[index - 1].style.backgroundColor;

          // dec index until we reach start of section being merged
          index -= 1;

          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 200)
          );
        }

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );
        // place block at start2 where block at start1 ptr used to be 
        // by restyling block at 'start'
        arr[start].innerText = value;
        arr[start].style.height = `${value * 3}px`;

        //increment all the ptrs
        start += 1;
        mid += 1;
        start2 += 1;
        
      }
    }
  }


  async function QuickSort(){
    let blocksArray = document.querySelectorAll('.block');
    await QuickSortHelper(blocksArray, 0, blocksArray.length - 1);

    await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 300)
      );

    for (let i = 0; i<blocksArray.length; i++){
      blocksArray[i].style.backgroundColor = 'green'
    }

    
  }

  
  async function QuickSortHelper(array, start, end){
    if (start >= end){
      return
    }
    let pIndex = await Partition(array, start, end);

    array[pIndex].style.backgroundColor = 'lightblue'

    await QuickSortHelper(array, start, pIndex - 1);

    await QuickSortHelper(array, pIndex + 1, end);
  }


  async function Partition(array, start, end)
  {
    let pivotVal = parseInt(array[end].innerHTML);

    array[end].style.backgroundColor = 'red'

    let pIndex = start;

    for(let i=start; i<end; i++)
    { 
      if (parseInt(array[i].innerHTML) <= pivotVal)
      { // swap array[i], array[pIndex] style.height and innerText

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 300)
        );

        let temp1 = array[i].style.height;
        let temp2 = array[i].innerText;
        array[i].style.height = array[pIndex].style.height;
        array[pIndex].style.height = temp1;
        array[i].innerText = array[pIndex].innerText;
        array[pIndex].innerText = temp2;

        pIndex += 1;

      }
    } // swap array[pIndex], array[end]

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 300)
      );

      array[end].style.backgroundColor = 'gray'

      let temp1 = array[end].style.height;
      let temp2 = array[end].innerText;
      array[end].style.height = array[pIndex].style.height;
      array[pIndex].style.height = temp1;
      array[end].innerText = array[pIndex].innerText;
      array[pIndex].innerText = temp2;

      return pIndex

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




