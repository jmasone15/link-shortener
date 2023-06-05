"use strict";
const linkInput = document.getElementById("link-input");
const divEl = document.getElementById("result");
const pTag = document.getElementById("result-text");
const copyIcon = document.getElementById("copy");
const inputDiv = document.getElementById("expand");
const queryLinkAPI = async (longLink) => {
    const apiURL = "https://jlink.zip/l";
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
        const startsWithHttp = /^(?!https:\/\/|http:\/\/|ftp:\/\/).*/;
        if (startsWithHttp.test(linkInput.value)) {
            const shortLink = await queryLinkAPI(linkInput.value);
            divEl.setAttribute("class", "flex-col");
            pTag.textContent = shortLink;
            copyIcon.setAttribute("class", "fa-solid fa-copy");
        }
        else {
            console.log("Not a valid link");
        }
    }
});
