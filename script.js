class LIFO {
    constructor(capacity) {
        this.capacity = capacity;
        this.stack = [];
    }

    push(item) {
        if (this.stack.length < this.capacity) {
            this.stack.push(item);
        } else {
        // If the stack is full, remove the last element (LIFO)
            this.stack.pop();
            this.stack.push(item);
        }
        }
    
    contains(item) {
        return this.stack.includes(item);
    }

    getStack() {
        return this.stack;
    }
}

    function runOptimalPageReplacement() {
        const pagesInput = document.getElementById("pages");
        const capacityInput = document.getElementById("capacity");
        const output = document.getElementById("output");
    
        const pagesString = pagesInput.value.trim();
        const capacity = parseInt(capacityInput.value, 10);
    
        if (!pagesString || isNaN(capacity) || capacity <= 0) {
        output.innerHTML = "<p class='text-red-500 font-semibold'>Please enter valid inputs.</p>";
        return;
    }
  
    const pages = pagesString.split(" ").map(item => parseInt(item.trim(), 10));
  
    let pageFaults = 0;
    let hits = 0;
    const memory = new LIFO(capacity);
    const pageResults = [];
  
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      let result;
  
      if (memory.contains(page)) {
        result = "Hit";
        hits++;
      } else {
        result = "Fault";
        pageFaults++;
        memory.push(page);
      }
  
      pageResults.push({ page, result });
    }
  
    const totalReferences = hits + pageFaults;
    const hitRatio = (hits / totalReferences).toFixed(2);
    const faultRatio = (pageFaults / totalReferences).toFixed(2);
  
    let resultHTML = `
      <h2 class="text-xl font-bold mb-4">Results:</h2>
      <p>Page Reference Sequence: ${pages.join(" ")}</p>
      <p>Number of Frames: ${capacity}</p>
      <p>Total Page Faults: ${pageFaults}</p>
      <p>Total Hits: ${hits}</p>
      <p>Total References: ${totalReferences}</p>
      <p>Hit Ratio: ${hitRatio}</p>
      <p>Fault Ratio: ${faultRatio}</p>
      <h3 class="text-xl font-bold mt-6 mb-2 text-center">LIFO Hit & Fault Visualization:</h3>
      <table class="border-collapse border border-purple-500 rounded">
        <thead>
          <tr>
    `;
    // First row: Page sequence numbers
    for (let i = 0; i < pages.length; i++) {
      resultHTML += `
            <th class="border border-gray-500 px-4 py-2">${pages[i]}</th>
      `;
    }
  
    resultHTML += `
          </tr>
        </thead>
        <tbody>
          <tr>
    `;
  
    // Second row: Results (Hit or Fault)
    for (let { page, result } of pageResults) {
      const hitClass = result === "Hit" ? "bg-green-200" : "bg-red-200";
      resultHTML += `
            <td class="border border-gray-500 px-4 py-2 ${hitClass}">${result}</td>
      `;
    }
  
    resultHTML += `
          </tr>
        </tbody>
      </table>
    `;
  
    output.innerHTML = resultHTML;
  }