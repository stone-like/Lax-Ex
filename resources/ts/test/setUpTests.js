import "./testServer";
import "@testing-library/jest-dom";
//react-mediaをmockしないとerror
beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
});
//setUpTestsから自動でtest.jsに読み込んでくれるみたい
