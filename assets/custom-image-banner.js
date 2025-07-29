let openDrawerIcon = document.getElementById("drawer-icon");

let closeDrawerIcon = document.getElementById("close-drawer-icon");

let drawer = document.getElementById("drawer-content");

openDrawerIcon.addEventListener("click", () => {
  openDrawerIcon.style.display = "none";
  closeDrawerIcon.style.display = "block";
  drawer.style.display = "block";
});

closeDrawerIcon.addEventListener("click", () => {
  openDrawerIcon.style.display = "block";
  closeDrawerIcon.style.display = "none";
  drawer.style.display = "none";
});
