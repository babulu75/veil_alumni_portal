

function showModal1() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("signin-modal").style.display = "block";
}

function closePopup1() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("signin-modal").style.display = "none";
}
function showModal2() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("signup-modal").style.display = "block";
}

function closePopup2() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("signup-modal").style.display = "none";
}

function signinSubmit(){
	alert("sign in successful");
}
function signupSubmit(){
	alert("sign up successful");
}