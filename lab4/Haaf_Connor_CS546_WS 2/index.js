const bands = require('./data/bands');
const connections = require('./config/mongoConnection');



async function main() {
    let BTR = await bands.create("Big Time Rush", ["terrible pop", "tv", "I don't even know"], "http://www.BigTimeRush.com", "Disney", ["Person 1", "Person 2", "Person 3", "Person 4", "person 5" ], 2011);
    console.log(BTR);
    let LP = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"], "http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996);
    console.log(await bands.getAll());
    let pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
    console.log(pinkFloyd);
    console.log(await bands.rename(BTR._id.toString(), "BigTimeRush"));
    await bands.remove(LP._id.toString());
    console.log(await bands.getAll());
    try {
        let BadBand = await bands.create("hello there", ['General Kenobi']);
        console.log("needs to error");
    }
    catch (BadBand) {
        console.log("Errored Correctly");
    }
    try {
        let notThere = await bands.remove("4565sd4f6s8e43500000000")
        console.log("needs to error");
    }
    catch (notThere) {
        console.log("Errored Correctly");
    }
    try {
        let notThereR = await bands.rename("4565sd4f6s8e43500000000", "shouldn't work")
        console.log("needs to error");
    }
    catch (notThereR) {
        console.log("Errored Correctly");
    }
    try {
        let notThereR2 = await bands.rename("4565sd4f6s8e43500000000", CS546)
        console.log("needs to error");
    }
    catch (notThereR2) {
        console.log("Errored Correctly");
    }
    try {
        let failGet = await bands.get("4565sd4f6s8e43500000000");
        console.log("needs to error");
    }
    catch (failGet) {
        console.log("Errored Correctly");
    }
    connections.closeConnection();
} 
main();