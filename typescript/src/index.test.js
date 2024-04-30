"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe("updateSelectedServices.select", function () {
    test("should select when not selected", function () {
        var result = (0, _1.updateSelectedServices)([], { type: "Select", service: "Photography" });
        expect(result).toEqual(["Photography"]);
    });
    test("should not select the same service twice", function () {
        var result = (0, _1.updateSelectedServices)(["Photography"], { type: "Select", service: "Photography" });
        expect(result).toEqual(["Photography"]);
    });
    test("should not select related service when main service is not selected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession"], { type: "Select", service: "BlurayPackage" });
        expect(result).toEqual(["WeddingSession"]);
    });
    test("should select related service when main service is selected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "VideoRecording"], {
            type: "Select",
            service: "BlurayPackage"
        });
        expect(result).toEqual(["WeddingSession", "VideoRecording", "BlurayPackage"]);
    });
    test("should select related service when one of main services is selected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "Photography"], {
            type: "Select",
            service: "TwoDayEvent"
        });
        expect(result).toEqual(["WeddingSession", "Photography", "TwoDayEvent"]);
    });
});
describe("updateSelectedServices.deselect", function () {
    test("should deselect", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "Photography"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession"]);
    });
    test("should do nothing when service not selected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "Photography"], {
            type: "Deselect",
            service: "TwoDayEvent"
        });
        expect(result).toEqual(["WeddingSession", "Photography"]);
    });
    test("should deselect related when last main service deselected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "Photography", "TwoDayEvent"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession"]);
    });
    test("should not deselect related when at least one main service stays selected", function () {
        var result = (0, _1.updateSelectedServices)(["WeddingSession", "Photography", "VideoRecording", "TwoDayEvent"], {
            type: "Deselect",
            service: "Photography"
        });
        expect(result).toEqual(["WeddingSession", "VideoRecording", "TwoDayEvent"]);
    });
});
describe.each([2020, 2021, 2022])("calculatePrice.zero (%i)", function (year) {
    test("should be zero with no services selected", function () {
        var result = (0, _1.calculatePrice)([], year);
        expect(result).toEqual({ basePrice: 0, finalPrice: 0 });
    });
});
describe.each([
    ["WeddingSession", 2020, 600],
    ["WeddingSession", 2021, 600],
    ["WeddingSession", 2022, 600],
    ["Photography", 2020, 1700],
    ["Photography", 2021, 1800],
    ["Photography", 2022, 1900],
    ["VideoRecording", 2020, 1700],
    ["VideoRecording", 2021, 1800],
    ["VideoRecording", 2022, 1900]
])("calculatePrice.singleService (%s, %i)", function (service, year, expectedPrice) {
    test("no discount applied", function () {
        var result = (0, _1.calculatePrice)([service], year);
        expect(result.basePrice).toBeGreaterThan(0);
        expect(result.finalPrice).toBeGreaterThan(0);
        expect(result.basePrice).toBe(result.finalPrice);
    });
    test("price matches requirements", function () {
        var result = (0, _1.calculatePrice)([service], year);
        expect(result).toEqual({ basePrice: expectedPrice, finalPrice: expectedPrice });
    });
});
describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0]
])("calcularePrice.photographyWithWeddingSessionPrice (%i increase by %i)", function (year, increase) {
    test("price matches requirements", function () {
        var withoutSession = (0, _1.calculatePrice)(["Photography"], year);
        var withSession = (0, _1.calculatePrice)(["Photography", "WeddingSession"], year);
        var priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;
        expect(withSession.basePrice).toBeGreaterThan(0);
        expect(withSession.finalPrice).toBeGreaterThan(0);
        expect(priceChangeWithSession).toEqual(increase);
    });
    test("discount applied", function () {
        var withoutSession = (0, _1.calculatePrice)(["Photography"], year);
        var onlySession = (0, _1.calculatePrice)(["WeddingSession"], year);
        var withSession = (0, _1.calculatePrice)(["Photography", "WeddingSession"], year);
        var priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;
        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});
describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 300]
])("calcularePrice.videoRecordingWithWeddingSessionPrice (%i increase by %i)", function (year, increase) {
    test("price matches requirements", function () {
        var withoutSession = (0, _1.calculatePrice)(["VideoRecording"], year);
        var withSession = (0, _1.calculatePrice)(["VideoRecording", "WeddingSession"], year);
        var priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;
        expect(priceChangeWithSession).toEqual(increase);
    });
    test("discount applied", function () {
        var withoutSession = (0, _1.calculatePrice)(["VideoRecording"], year);
        var onlySession = (0, _1.calculatePrice)(["WeddingSession"], year);
        var withSession = (0, _1.calculatePrice)(["VideoRecording", "WeddingSession"], year);
        var priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;
        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});
describe.each([
    [2020, 500],
    [2021, 500],
    [2022, 600]
])("calcularePrice.videoRecordingWithPhotographyPrice (%i increase by %i)", function (year, increase) {
    test("price matches requirements", function () {
        var withoutPhotography = (0, _1.calculatePrice)(["VideoRecording"], year);
        var withPhotography = (0, _1.calculatePrice)(["VideoRecording", "Photography"], year);
        var priceChangeWithPhotography = withPhotography.finalPrice - withoutPhotography.finalPrice;
        expect(priceChangeWithPhotography).toEqual(increase);
    });
    test("discount applied", function () {
        var withoutPhotography = (0, _1.calculatePrice)(["VideoRecording"], year);
        var onlyPhotography = (0, _1.calculatePrice)(["Photography"], year);
        var withPhotography = (0, _1.calculatePrice)(["VideoRecording", "Photography"], year);
        var priceWithoutDiscounts = withoutPhotography.finalPrice + onlyPhotography.finalPrice;
        expect(priceWithoutDiscounts).toBeGreaterThan(withPhotography.finalPrice);
    });
});
describe.each([
    [2020, 300],
    [2021, 300],
    [2022, 0]
])("calcularePrice.videoRecordingWithPhotographyWithSessionPrice (%i increase by %i)", function (year, increase) {
    test("price matches requirements", function () {
        var withoutSession = (0, _1.calculatePrice)(["VideoRecording", "Photography"], year);
        var withSession = (0, _1.calculatePrice)(["VideoRecording", "Photography", "WeddingSession"], year);
        var priceChangeWithSession = withSession.finalPrice - withoutSession.finalPrice;
        expect(withSession.basePrice).toBeGreaterThan(0);
        expect(withSession.finalPrice).toBeGreaterThan(0);
        expect(priceChangeWithSession).toEqual(increase);
    });
    test("discount applied", function () {
        var withoutSession = (0, _1.calculatePrice)(["VideoRecording", "Photography"], year);
        var onlySession = (0, _1.calculatePrice)(["WeddingSession"], year);
        var withSession = (0, _1.calculatePrice)(["VideoRecording", "Photography", "WeddingSession"], year);
        var priceWithoutDiscounts = withoutSession.finalPrice + onlySession.finalPrice;
        expect(priceWithoutDiscounts).toBeGreaterThan(withSession.finalPrice);
    });
});
