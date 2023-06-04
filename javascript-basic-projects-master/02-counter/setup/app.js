//  set initial count
let count = 0;
// select value and buttons
const value = document.querySelector("#value");
value.style.color = "blue";
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
    btn.addEventListener("click", (e) => {
        const styles = e.currentTarget.classList;
        console.log("styles", styles);
        if (styles.contains("decrease")) {
            count--;
        } else if (styles.contains("increase")) {
            count++;
        } else {
            count = 0;
        }
        if (count > 0) {
            value.style.color = "green";
        }
        if (count < 0) {
            value.style.color = "red";
        }
        if (count === 0) {
            value.style.color = "blue";
        }
        value.textContent = count;
    });
});
