import {getProductDetail, getCurrentResult} from '../utils.js';

async function getInfo(name, manufacturer, categoryName) {
    const base = "http://localhost:78393/api/v1/getCarbon";
    const url = URL(base);
    url.searchParams.append("name", name);
    url.searchParams.append("manufacturer", manufacturer);
    url.searchParams.append("categoryName", categoryName);
    const response = await fetch(url);
    if (response.ok) {
        return await response.json()
    } else {
        console.error(response)
        return null;
    }
}

function getSearchResults() {
    // search for the contents of each search result, return the title and link url
    const result = document.evaluate("//div[@data-component-type='s-search-result']//div[contains(concat(' ', normalize-space(@class), ' '), ' s-title-instructions-style ')]//h2//a", dom, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        items.push({ title: node.innerText, url: node.href, node: node });
    }
    return items || null;
}

async function showCarbonForSearch(results) {
    const carbonInfo = []
    for (const item in results) {
        carbonInfo.push({ ...item, carbon: await getInfo(name, manufacturer, "") });
    }
    for (const item in results) {
        const btn = document.createElement('button');
        btn.setAttribute('content', carbonInfo[item] + "kg of carbon");
        item.appendChild(btn);
    }
}

function showCarbonForProduct(result) {
    const info = getInfo(result.title, result.manufacturer, result.categoryName)
    const button = document.createElement("div");
    button.setAttribute("style", "border: 1px #37c884; color: ")
    button.setAttribute("content", info.carbon + "kg of carbon");
    const priceDisplay = document.getElementById("corePriceDisplay_desktop_feature_div");
    priceDisplay.appendChild(button)
}

function getOrderConfirmationResults() {
    if (window.location.pathname.startsWith("/gp/buy/thankyou/handlers/display.html") || /* TODO */ true) {
        // this is an order confirmation page !! store the products bought
        // find all products purchased
        const result = document.evaluate("//span[contains(concat(' ', normalize-space(@class), ' '), ' checkout-quantity-badge ')]/..", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        let node = null;
        const items = [];
        while (node = result.iterateNext()) {
            items.push({ title: node.firstElementChild.alt, url: node.parentElement.href, count: parseInt(node.lastElementChild.innerText) });
        }
        return items || null;
    } else {
        return null;
    }
}

function sendOrderConfirmationData(items) {
    // TODO(lsheard)
}

export default async function Amazon() {
    // entrypoint
    console.log(getSearchResults())
    if (getSearchResults() !== null) {
        showCarbonForProduct()
    }
    console.log(getCurrentResult())
    console.log(getOrderConfirmationResults())
}
