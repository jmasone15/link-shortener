"use strict";
const linkInput = document.getElementById("link-input");
const divEl = document.getElementById("result");
const pTag = document.getElementById("result-text");
const copyIcon = document.getElementById("copy");
const queryLinkAPI = async (longLink) => {
    const apiURL = "https://jordans-api-production.up.railway.app/l";
    const keyOptions = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let linkKey = "";
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * keyOptions.length);
        linkKey += keyOptions.charAt(randomIndex);
    }
    try {
        await fetch(apiURL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ target: longLink, key: linkKey })
        });
    }
    catch (error) {
        console.error(error);
    }
    finally {
        return `${apiURL}/${linkKey}`;
    }
};
linkInput.addEventListener("focus", () => {
    linkInput.setAttribute("style", "width: 80%");
});
linkInput.addEventListener("focusout", () => {
    if (!linkInput.value) {
        linkInput.removeAttribute("style");
    }
});
copyIcon.addEventListener("click", () => {
    navigator.clipboard.writeText(pTag.textContent);
    copyIcon.classList.remove("fa-copy");
    copyIcon.classList.add("fa-check");
});
document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        if (!linkInput.value) {
            console.log("Nothing entered");
        }
        const urlRegex = /^(?:(?:https?|ftp):\/\/)?[^\s/$.?#]+\.[^\s]*$/i;
        console.log(urlRegex.test(linkInput.value));
        if (urlRegex.test(linkInput.value)) {
            const shortLink = await queryLinkAPI(linkInput.value);
            divEl.setAttribute("class", "flex-col");
            pTag.textContent = shortLink;
        }
        else {
            console.log("Not a valid link");
        }
    }
});
