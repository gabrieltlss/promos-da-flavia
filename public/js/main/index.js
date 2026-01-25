const tabs = document.getElementsByClassName("tab");

function openTab(tabName) {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("w3-hide");
        tabs[i].classList.add("w3-hide");
    }
    const tab = document.getElementById(tabName);
    tab.classList.remove("w3-hide");
}
