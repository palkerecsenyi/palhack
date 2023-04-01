import Amazon from "./amazon.js";

const currentUrl = window.location.origin
switch (currentUrl) {
    case "https://www.amazon.co.uk":
    case "https://www.amazon.com":
        Amazon()
        break
}
