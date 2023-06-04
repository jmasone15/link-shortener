const linkInput = document.getElementById("link-input") as HTMLInputElement;
const divEl = document.getElementById("result") as HTMLElement;
const pTag = document.getElementById("result-text") as HTMLElement;
const copyIcon = document.getElementById("copy") as HTMLElement;

const queryLinkAPI = async (longLink: string) => {
    const apiURL = "https://jordans-api-production.up.railway.app/l";
    const keyOptions = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let linkKey = "";

    for (let i = 0; i < 4; i++) {
        const randomIndex: number = Math.floor(Math.random() * keyOptions.length);
        linkKey += keyOptions.charAt(randomIndex);
    }

    try {
        // Update to new website
        await fetch(apiURL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ target: longLink, key: linkKey })
        });
    } catch (error) {
        console.error(error);
    } finally {
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
    navigator.clipboard.writeText(pTag.textContent as string);
    copyIcon.classList.remove("fa-copy");
    copyIcon.classList.add("fa-check");
});
document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        if (!linkInput.value) {
            console.log("Nothing entered");
        }

        const urlRegex: RegExp = /^(?:(?:https?|ftp):\/\/)?[^\s/$.?#]+\.[^\s]*$/i;
        console.log(urlRegex.test(linkInput.value));

        if (urlRegex.test(linkInput.value)) {
            const shortLink = await queryLinkAPI(linkInput.value);

            divEl.setAttribute("class", "flex-col");
            pTag.textContent = shortLink;
        } else {
            console.log("Not a valid link");
        }
    }
});
