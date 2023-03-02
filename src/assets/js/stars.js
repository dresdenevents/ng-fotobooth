// Adds and removes animation to star every few seconds, also randomly changes its position on screen


function LoopAnimate() {
  // Add animation class to star after 5 secons
  setTimeout(function() {
    document.getElementById("mr_star").className += " animate";
  }, 800);
  // remove animation class after 9seconds
  setTimeout(function() {
    var star = document.getElementById("mr_star"),
      starCont = document.getElementById("star-cont");

    star.className = " star";
    randomMargin(); //add random margin
  }, 2000);

}
// Call LoopAnimate every 15seconds
LoopAnimate();
window.setInterval(function() {
  LoopAnimate();

}, 3000);

//function to add a random margin
function randomMargin() {
  var num = Math.floor(Math.random() * 161) - 100,
    starCont = document.getElementById("star-cont"),
    starContMargin = getComputedStyle(starCont).getPropertyValue("margin-left");
  num += "%"

  var rand = (Math.floor(Math.random() * 181) + 100),
    star = document.getElementById("mr_star"),
    starWidth = getComputedStyle(star).getPropertyValue("width");
  rand += "px";

  starCont.style.marginLeft = num;
  star.style.width = rand;
}
