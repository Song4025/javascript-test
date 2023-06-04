const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.querySelector("#btn");
const color = document.querySelector(".color");

btn.addEventListener("click", () => {
    // 0-3사이 랜덤한 숫자 얻기
    const randomNumber = getRandomNumber();
    console.log("getRandomNumber", getRandomNumber());
    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
});

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}
