let i  = 0;
let w = 10;

function setup() {
    createCanvas(700, 200);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i ++){
        values[i] = random(height);
    }
    quickSort(values, 0, values.length - 1);
}

async function quickSort(ar, start, end){
    if (start >= end) {
        return;
    }

    let index = await part(ar, start, end);

    await Promise.all([
        quickSort(ar, start, index - 1),
        quickSort(ar, index + 1, end)
    ]);
}

async function part(ar, start, end){
    let pivotIndex = start;
    let pivotValue = ar[end];
    for (let i = start; i < end; i ++){
        if (ar[i] < pivotValue) {
            await swap(ar, pivotIndex, i)
            pivotIndex++;
        }
    }
    await swap(ar, pivotIndex, end)
    return pivotIndex;
}

async function swap(ar, a, b){
    await sleep(10);
    let temp = ar[a];
    ar[a] = ar[b];
    ar[b] = temp;
}

function draw() {
    background(51);

    for (let i = 0; i < values.length; i ++){
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}