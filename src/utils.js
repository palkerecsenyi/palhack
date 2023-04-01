export async function getProductDetail(product) {
    const response = await fetch(product.url);
    if (response.ok) {
        const responseXml = new DOMParser().parseFromString(await response.text(), "text/html");
        return getCurrentResult(responseXml);
    } else {
        console.error(response)
        return null;
    }
}

function getCurrency(currencySymbol) {
    switch(currencySymbol) {
        case "£":
            return "GBP"
        case "$":
            return "USD"
    }
    return ""
}

export function getCurrentResult(dom = document) {
    // get the title and url of current page, if it is a product
    let title = dom.getElementById("productTitle");
    if (title == null) {
        return null;
    }
    title = title.innerText;
    let manufacturer = dom.getElementsByClassName("po-brand");
    if (manufacturer.length) {
        manufacturer = manufacturer[0].lastElementChild.innerText;
    } else {
        manufacturer = null;
    }
    let series = dom.getElementsByClassName("po-model_name");
    if (series.length) {
        series = series[0].lastElementChild.innerText;
    } else {
        series = null;
    }
    const itemWeight = dom.getElementsByClassName("po-item_weight")
    let weight = null;
    if (itemWeight.length) {
        const weightStr = itemWeight[0].lastElementChild.innerText;
        if (weightStr.endsWith(" grams")) {
            weight = parseFloat(weightStr);
        }
    }
    if (weight === null) {
        const unitCount = dom.getElementsByClassName("po-unit_count");
        if (unitCount.length) {
            const weightStr = unitCount[0].lastElementChild.innerText;
            if (weightStr.endsWith(" gram")) {
                weight = parseFloat(weightStr);
            }
        }
    }
    const originalPrice = dom.getElementsByClassName("a-text-price");
    let price;
    if (originalPrice.length && originalPrice[0].dataset.aStrike) {
        price = originalPrice[0].innerText;
    } else {
        price = dom.getElementById("corePrice_feature_div");
        if (price == null) {
            return null;
        }
        price = dom.getElementById("corePrice_feature_div").getElementsByClassName("a-offscreen")[0].innerText;
    }
    const categoryNumber = document.getElementById("searchDropdownBox").dataset.navSelected;
    const category = document.getElementById("searchDropdownBox").children[categoryNumber].innerText
    if (title === null) {
        return null;
    } else {
        return { title: dom.getElementById("productTitle").innerText, manufacturer: manufacturer, name: series ? series : title, category: category, series: series, weight: weight, url: window.location.href, price: price.replaceAll(/^[0-9]/g, ""), currency: getCurrency(price[0]) };
    }
}

/**
 * return output of parseCart
 */
export async function getCart() {
    const response = await fetch("https://www.amazon.co.uk/gp/cart/view.html");
    if (response.ok) {
        const responseXml = new DOMParser().parseFromString(await response.text(), "text/html");
        return parseCart(responseXml);
    } else {
        console.error(response)
        return null;
    }
}

/**
 * returns a list of {title, url, node}
 * get the full details via [getInfo] compose [getProductDetail]
 */
export function parseCart(dom = document) {
    const result = document.evaluate("//div[contains(concat(' ', normalize-space(@class), ' '), ' sc-list-body ')]/div[@data-itemid!='']", dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let node = null;
    const items = [];
    while (node = result.iterateNext()) {
        const title = node.getElementsByClassName("sc-list-item-content")[0].getElementsByTagName("a")[0];
        items.push({ title: title.getElementsByClassName("a-truncate-full").innerText, url: title.href, node: node });
    }
    return items || null;
}
