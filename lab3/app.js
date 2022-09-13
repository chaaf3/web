const axios = require ('axios');
const people = require('./people');
const stocks = require('./stocks');

async function main() {
    //getPersonById
    try{
    let x = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"); 
    console.log("good")
    }
    catch(x){
        console.log("bad")
    }
    try{
    let e = await people.getPersonById(-1); 
    console.log(e)
    }
    catch(e){
        console.log("good")
    }
    try{
        let e = await people.getPersonById(1001); 
        console.log(e)
        }
        catch(e){
            console.log("good")
        }

    try{
        let e = await people.getPersonById(); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff'); 
        console.log(e)
        }
        catch(e){
            console.log("good");
    }

    // sameEmail
    try{
        let e = await people.sameEmail("harvard.edu"); 
        console.log("good");
        }
        catch(e){
            console.log("problem ")
    }
    try{
        let e = await people.sameEmail("google.co.jp"); 
        console.log("good");
        }
        catch(e){
            console.log("problem")
    }
    try{
        let e = await people.sameEmail("foobar"); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail("foobar ."); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail("foobar.123"); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail(".com"); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail(); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail("           "); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameEmail("google.com.hk"); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    //manipulatelp
    try{
        let e = await people.manipulatelp(); 
        console.log("good")
        }
        catch(e){
            console.log(e)
    }
    //birthday
    try{
        let e = await people.sameBirthday("9", "25"); 
        console.log("good")
        }
        catch(e){
            console.log("problems")
    }
    try{
        let e = await people.sameBirthday(9, 31); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await people.sameBirthday(13,25); 
        console.log(e)
        }
        catch(e){
            console.log("good")
    }


    //listShareholders

    try{
        let e = await stocks.listShareholders("Aeglea BioTherapeutics, Inc."); 
        console.log("good")
        }
        catch(e){
            console.log("problem")
    }
    try{
        let e = await stocks.listShareholders('foobar'); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.listShareholders(); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
        
    try{
        let e = await stocks.totalShares(43); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.totalShares('    '); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.totalShares('foobar Inc'); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.totalShares('Aeglea BioTherapeutics, Inc.'); 
        console.log("good")
        }
        catch(e){
            console.log("problem")
    }

    try{
        let e = await stocks.listStocks("Grenville", "Pawelke"); 
        console.log("good")
        }
        catch(e){
            console.log("problem")
    }

    try{
        let e = await stocks.listStocks('Patric', "Hill"); 
        console.log("issues")
        }
        catch(e){
            console.log("good")
    } try{
        let e = await stocks.listStocks(); 
        console.log("issues")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.listStocks("foo"); 
        console.log("issues")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.listStocks("    ", "    "); 
        console.log("issues")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.listStocks(1,2); 
        console.log("issues")
        }
        catch(e){
            console.log("good")
    }

     //get stock by id
     try{
        let e = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"); 
        console.log("good")
        }
        catch(e){
            console.log("problem")
    }
    try{
        let e = await stocks.getStockById(-1); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.getStockById(1001); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.getStockById(); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
    try{
        let e = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff'); 
        console.log("problem")
        }
        catch(e){
            console.log("good")
    }
}
main();