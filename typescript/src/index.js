"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.handleDiscounts = exports.updateSelectedServices = void 0;
//Objects to store pricing per year
var twentyTwenty = {
    "Photography": 1700,
    "VideoRecording": 1700,
    "BlurayPackage": 300,
    "TwoDayEvent": 400,
    "WeddingSession": 600
};
var twentyTwentyOne = {
    "Photography": 1800,
    "VideoRecording": 1800,
    "BlurayPackage": 300,
    "TwoDayEvent": 400,
    "WeddingSession": 600
};
var twentyTwentyTwo = {
    "Photography": 1900,
    "VideoRecording": 1900,
    "BlurayPackage": 300,
    "TwoDayEvent": 400,
    "WeddingSession": 600
};
/**
 * Updates the services selected
 * @param previouslySelectedServices
 * @param action
 * @returns []
 */
var updateSelectedServices = function (previouslySelectedServices, action) {
    console.log("1: " + previouslySelectedServices);
    if (action.type === "Select") {
        if (!previouslySelectedServices.includes(action.service)) {
            previouslySelectedServices.push(action.service);
            console.log("Select: " + previouslySelectedServices);
        }
        ;
        if ((!previouslySelectedServices.includes("Photography") && !previouslySelectedServices.includes("VideoRecording")) && previouslySelectedServices.includes("BlurayPackage")) {
            var index = previouslySelectedServices.indexOf("BlurayPackage");
            previouslySelectedServices.splice(index, 1);
            //console.log("3: " + previouslySelectedServices);
        }
        ;
        return previouslySelectedServices;
    }
    else if (action.type === "Deselect") {
        if (previouslySelectedServices.includes(action.service)) {
            var index = previouslySelectedServices.indexOf(action.service);
            previouslySelectedServices.splice(index, 1);
            //console.log("New Array: " + previouslySelectedServices)
        }
    }
    ;
    /*
    if((previouslySelectedServices.includes("BlurayPackage")) && (!previouslySelectedServices.includes("Photography") || !previouslySelectedServices.includes("VideoRecording"))){
            
            const index = previouslySelectedServices.indexOf("BlurayPackage");
            previouslySelectedServices.splice(index, 1);
            //console.log("3: " + previouslySelectedServices);
    };
    */
    if ((previouslySelectedServices.includes("TwoDayEvent")) && (!previouslySelectedServices.includes("Photography") && !previouslySelectedServices.includes("VideoRecording"))) {
        var index = previouslySelectedServices.indexOf("TwoDayEvent");
        previouslySelectedServices.splice(index, 1);
        //console.log("3: " + previouslySelectedServices);
    }
    ;
    //console.log("4: " + previouslySelectedServices);
    return previouslySelectedServices;
};
exports.updateSelectedServices = updateSelectedServices;
/**
 * Calculates the discounts from various service packages
 * @param services
 * @param year
 * @param basePrice
 * @returns number
 */
var handleDiscounts = function (services, year, basePrice) {
    var bPrice = 0;
    if (services.length === 1) {
        bPrice = 0;
        return bPrice;
    }
    var package1 = ["Photography", "VideoRecording"];
    var package2 = ["Photography", "WeddingSession"];
    var package3 = ["WeddingSession", "VideoRecording"];
    var package4 = ["BlurayPackage", "VideoRecording"];
    var package5 = ["TwoDayEvent", "Photography"];
    var package6 = ["TwoDayEvent", "VideoRecording"];
    if (basePrice != 0) {
        var discounter = function (arr1, arr2) { return arr2.every(function (value) { return arr1.includes(value); }); };
        if (!discounter(services, ["Photography"]) || !discounter(services, ["VideoRecording"]) && discounter(services, ["TwoDayEvent"])) {
            bPrice += 0;
        }
        if (discounter(services, ["BlurayPackage"]) && !discounter(services, ["VideoRecording"])) {
            bPrice += 300;
        }
        switch (year) {
            case 2020:
                if (discounter(services, package1)) {
                    bPrice += 1200;
                }
                ;
                if (discounter(services, package2) || discounter(services, package3)) {
                    bPrice += 300;
                }
                ;
                break;
            case 2021:
                if (discounter(services, package1)) {
                    bPrice += 1300;
                }
                ;
                if (discounter(services, package2) || discounter(services, package3)) {
                    bPrice += 300;
                }
                ;
                break;
            case 2022:
                if (discounter(services, package1)) {
                    bPrice += 1300;
                }
                ;
                if (discounter(services, package2)) {
                    bPrice += 600;
                }
                else if (discounter(services, package3)) {
                    bPrice += 300;
                }
                ;
                break;
        }
    }
    return bPrice;
};
exports.handleDiscounts = handleDiscounts;
/**
 * Calculates the base price and call the discount handler to calculate the final price
 * @param selectedServices
 * @param selectedYear
 * @returns {}
 */
var calculatePrice = function (selectedServices, selectedYear) {
    var basePrice = 0;
    var finalPrice = 0;
    var price = selectedServices.map(function (service, i) {
        if (selectedYear === 2020) {
            basePrice += twentyTwenty[selectedServices[i]];
        }
        if (selectedYear === 2021) {
            basePrice += twentyTwentyOne[selectedServices[i]];
        }
        if (selectedYear === 2022) {
            basePrice += twentyTwentyTwo[selectedServices[i]];
        }
    });
    var discountTotal = (0, exports.handleDiscounts)(selectedServices, selectedYear, basePrice);
    finalPrice = basePrice - discountTotal;
    return ({ "basePrice": basePrice, "finalPrice": finalPrice });
};
exports.calculatePrice = calculatePrice;
//({ basePrice: 0, finalPrice: 0 });
var result = (0, exports.updateSelectedServices)(["WeddingSession", "VideoRecording"], { type: "Select", service: "BlurayPackage" });
console.log(result);
//let price = calculatePrice(result, 2021);
//console.log(price);
