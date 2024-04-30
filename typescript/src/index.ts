export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

//Objects to store pricing per year
const twentyTwenty = {
    "Photography" : 1700,
    "VideoRecording" : 1700,
    "BlurayPackage" : 300,
    "TwoDayEvent" : 400,
    "WeddingSession" : 600
}

const twentyTwentyOne = {
    "Photography" : 1800,
    "VideoRecording" : 1800,
    "BlurayPackage" : 300,
    "TwoDayEvent" : 400,
    "WeddingSession" : 600
}

const twentyTwentyTwo = {
    "Photography" : 1900,
    "VideoRecording" : 1900,
    "BlurayPackage" : 300,
    "TwoDayEvent" : 400,
    "WeddingSession" : 600
}


/**
 * Updates the services selected
 * @param previouslySelectedServices 
 * @param action 
 * @returns []
 */
export const updateSelectedServices = (previouslySelectedServices: ServiceType[], action: { type: "Select" | "Deselect"; service: ServiceType }) => {
    console.log("1: " + previouslySelectedServices);
    if(action.type === "Select"){
        if(!previouslySelectedServices.includes(action.service)){
           previouslySelectedServices.push(action.service);
        };

    }
    else if(action.type === "Deselect"){
        if(previouslySelectedServices.includes(action.service)){
            const index = previouslySelectedServices.indexOf(action.service);
            previouslySelectedServices.splice(index, 1);
            console.log("New Array: " + previouslySelectedServices)
        }
    };
    if((previouslySelectedServices.includes("BlurayPackage")) && (!previouslySelectedServices.includes("Photography") || !previouslySelectedServices.includes("VideoRecording"))){
            
            const index = previouslySelectedServices.indexOf("BlurayPackage");
            previouslySelectedServices.splice(index, 1);
            console.log("3: " + previouslySelectedServices);
    };
    if((previouslySelectedServices.includes("TwoDayEvent")) && (!previouslySelectedServices.includes("Photography") && !previouslySelectedServices.includes("VideoRecording"))){
            
            const index = previouslySelectedServices.indexOf("TwoDayEvent");
            previouslySelectedServices.splice(index, 1);
            console.log("3: " + previouslySelectedServices);
    };
    console.log("4: " + previouslySelectedServices);
   
    return previouslySelectedServices;
};

/**
 * Calculates the discounts from various service packages
 * @param services 
 * @param year 
 * @param basePrice 
 * @returns number 
 */
export const handleDiscounts = (services: ServiceType[], year: ServiceYear, basePrice) => {

    let bPrice: number = 0;

    if(services.length === 1){
        bPrice = 0;
        return bPrice;
    }

    const package1: ServiceType[] = ["Photography", "VideoRecording"];
    const package2: ServiceType[] = ["Photography", "WeddingSession"];
    const package3: ServiceType[] = ["WeddingSession", "VideoRecording"];
    const package4: ServiceType[] = ["BlurayPackage", "VideoRecording"];
    const package5: ServiceType[] = ["TwoDayEvent", "Photography"];
    const package6: ServiceType[] = ["TwoDayEvent", "VideoRecording"];
    
    if(basePrice != 0){
        let discounter = (arr1: ServiceType[], arr2: ServiceType[]) => arr2.every(value => arr1.includes(value));
    
    
        if(!discounter(services, ["Photography"] ) || !discounter(services, ["VideoRecording"]) && discounter(services, ["TwoDayEvent"]) ) {
            bPrice += 0;
        }
        if(discounter(services, ["BlurayPackage"]) && !discounter(services, ["VideoRecording"])){
            bPrice += 300;
        }

        switch(year) {
            case 2020 :
                if(discounter(services, package1)){ bPrice += 1200; };
                if(discounter(services, package2) || discounter(services, package3)){ bPrice += 300; };
                break;

            case 2021 :
                if(discounter(services, package1)){ bPrice += 1300; };
                if(discounter(services, package2) || discounter(services, package3)){ bPrice += 300; };
                break;

            case 2022: 
                if(discounter(services, package1)){ bPrice += 1300; };
                if(discounter(services, package2)){ bPrice += 600;}
                else if(discounter(services, package3)){bPrice += 300;};
                break;
        }
    }
    return bPrice;
};

/**
 * Calculates the base price and call the discount handler to calculate the final price
 * @param selectedServices 
 * @param selectedYear 
 * @returns {}
 */

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    let basePrice: number = 0;
    let finalPrice: number = 0;
    
    const price = selectedServices.map((service, i) => {
        if(selectedYear === 2020){
            basePrice += twentyTwenty[selectedServices[i]];
        }
        if(selectedYear === 2021){
            basePrice += twentyTwentyOne[selectedServices[i]];
        } 
        if(selectedYear === 2022){
            basePrice += twentyTwentyTwo[selectedServices[i]];
        } 
    });
    
    let discountTotal: number = handleDiscounts(selectedServices, selectedYear, basePrice);
    finalPrice = basePrice - discountTotal;
    
    return ({"basePrice": basePrice, "finalPrice": finalPrice });
};
     //({ basePrice: 0, finalPrice: 0 });

//let result = updateSelectedServices(["WeddingSession", "Photography"], { type : "Deselect", service: "Photography" });
//console.log(result);
//let price = calculatePrice(result, 2021);
//console.log(price);