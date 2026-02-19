
console.log("Hello TensorFlow");
const tensor = tf.tensor([1,2,3,4]) // create a 1-D tensor
console.log(tensor); // print it
console.log(tensor.shape); // find the shape of the tensor
console.log(tensor.dtype); // find the data type of the tensor
console.log(tensor.rank) // find the rank of the tensor (number of dimensions)
console.log(tensor.size); // find the size
console.log("Printing tensor values:");
tensor.print(); // print the values of the tensor in a nice format
// Create a 2-D tensor
const str = tf.tensor(['Hello', 'TensorFlow', 'JS']);
str.print(); // print the string tensor


/**
 * Get the car data, map to only the variables 
 * we are interested in
 * and clean any missing data
 */
async function loadData() { // async is for asynchronous code, 
// it allows us to use the await keyword inside the function
    const carsDataResponse = await fetch 
    ("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
    const carsData = await carsDataResponse.json();
    const cleaned = carsData.map(car=>({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    }))
    .filter(car=> (car.mpg != null && car.horsepower != null));
    return cleaned;
}



/**
 * Convert input data to tensors that we can use for the ML training
 *  We also perform the recomended practice of normalisation and shuffling.
 * 
 * @param {*} data 
 */
function convertToTensor(data) {
    // Wrapping in these calculations in a tidy function
    // will dispose any intermediate tensors.
    return tf.tidy(() =>{
        //Step 1: Shuffle the data
        tf.util.shuffle(data);
        // Step 2: Convert the data to Tensor
        const x_inputs = data.map((d)=> d.horsepower);
        const y_lables= data.map((d)=>d.mpg);
        const inputTensor = tf.tensor2d(x_inputs, [x_inputs.length, 1]);
        const labelTensor = tf.tensor2d(y_lables,[y_lables.length, 1]);

        console.log(`lengths of inputs: ${x_inputs.length} and labels: ${y_lables.length}`);
        console.log("Input Tensor: "+inputTensor);

        // Step 3: Normalize the data to the range of 0 - 1
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = labelTensor.max();
        const labelMin = labelTensor.min();
        const normalizeInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
        return {
            inputs: normalizeInputs,
            labels: normalizedLabels,
            //Return min-max so we can use them later
            inputMin,
            inputMax,
            labelMin,
            labelMax,
        }
    }
 );
}

function createModel () {
    // First create a sequential model
    const model = tf.sequential();

    // Add one single input layer
    model.add(tf.layers.dense({inputShape:[1], units:1, useBias: true}));

    // Add a hidden layer
    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}))

    // Add an output Layer
     model.add(tf.layers.dense({units: 1, useBias:true}));

    return model;
}

async function trainModel(model, inputs, labels) {
    // Prepare the model for training
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    const batchSize = 32;
    const epochs = 50;

    return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
            {name: 'Training Performance'},
            ['loss','mse'],
            {height: 200, callbacks: ['onEpochEnd']}
        )
    });
}
function testModel(model, inputData, normalizationData) {
    const {inputMax, inputMin, labelMin, labelMax} = normalizationData;

    // Generate predictions for a uniform range of values between 0 and 1
    //We un-normalize data by doing the inverse of the min-max scaling we did earlier

    const [xs, preds] = tf.tidy(() =>{

    const xsNorm = tf.linspace(0, 1, 100);
    const predictions = model.predict(xsNorm.reshape([100, 1]));

    const unNormXs = xsNorm
        .mul(inputMax.sub(inputMin))
        .add(inputMin);

    const unNormPreds = predictions
        .mul(labelMax.sub(labelMin))
        .add(labelMin);

    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()]

    });

    const predictedPoints = Array.from(xs).map((val, i) =>{
        return {x : val, y:preds[i]}
    });
    const originalPoints = inputData.map(d=>({
        x: d.horsepower, y: d.mpg,
    }));

    // Plot scatter plot to compare original data and model predictions
    tfvis.render.scatterplot(
        {name: 'Model Predictions vs Original Data'},
        {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
        {
            xLabel: 'Horsepower',
            yLabel: 'MPG',
            height: 300
        }
    )
}

async function run() {
    // load and plot the original input data we are going to train on
    const data = await loadData();
    const values = data.map(d=>({
        x: d.horsepower,
        y: d.mpg,
    }));
    // Scatter plot of horsepower vs MPG
    tfvis.render.scatterplot(
        {name: 'Scatter plot of Horsepower vs MPG'},
        {values},
        {
            xLabel: 'Horsepower',
            yLabel: 'MPG',
            height: 300
        }
    );
    // create the model
    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Summary'}, model);
    const tensorData =  convertToTensor(data);
    const {inputs, labels} = tensorData;

    //Train the model
    await trainModel(model, inputs, labels);
    console.log('Done Training!!!');

    // Make some predictions using the model and compare them to the original data
    testModel(model, data, tensorData);
     
    // Prepare the data and convert to appropriate 
    // format for barchart
    const barchartValues = data.map((d, i) =>({
        index: i,
        value: d.mpg,
    }));
    
    // Show a barchart of the MPG values
    tfvis.render.barchart(
        {name: 'Bar Chart of the MPG values'},
        barchartValues, {height: 300, width: 800, 
            fontSize:16,xLabel:"Index", yLabel:"MPG"}, 
            series=['mpg']
    )
    // Show a line chart of the MPG values
    tfvis.render.linechart(
        {name: 'Sample Line Chart'},
        {values,series: ['mpg']},
        {
            xLabel: 'Horsepower',
            yLabel: 'MPG',
            height: 1000,
            width: 800,
        }
    );
    // Prepare the data and convert to appropriate 
    // format for histogram
    const histData = data
    .map(d => d.horsepower);
    console.log("histData max=="+Math.max(...histData))
    console.log("histData min=="+Math.min(...histData))
    tfvis.render.histogram({name:"Histogram of the car's MPG"},
        histData,{
            maxBin:20,
            height:450,
            fontSize:16
        })
}

document.addEventListener('DOMContentLoaded', run);