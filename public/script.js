

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
	const email=document.getElementById("email").value;
	const pass=document.getElementById("password").value;
	
	const response=await fetch('/login',{
		method:'post',
		headers:{'content-Type':'application/json'},
		body:JSON.strinfy({email,pass})
	});
	
	if (response.ok){
		widow.location.href="dashboard.html"'
	}
	else{
		alert("invaild login credentials");
	}
}
function validatePassword(){
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    // Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
        alert("Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    return true;
}

async function signup(){
	if (!validatePassword())return;
	
	let userDate={
		name:document.getElementById("name").value,
		email:document.getElementById("email").value,
		loca:document.getElementById("location").value,
		password:document.getElementById("password").value
	};
	const response=await fetch('/signup',{
		method:'POST',
		headers:{'content-Type':'application/json'},
		body:JSON.stringfy(userDate)
	});
	
	if (response.ok){
		alert("sign up successful");
		window.location.href="index.html";
	}
	else{
		alert("signup failed.Tryagain.");
	}
}

async function signin(){
	const email=document.getElementById('email').value;
	const pass=document.getElementById('email').value;
	
	const response=await fetch('/signin',{
		method:'POST',
		headers:{'content-Type':'application/json'}
		body:JSON.stringfy(email,pass);
	}
	
	if(response.ok){
		alert("sign in succesful");
		window.location.href="dashboard.html";
	}
	
	else{
		alert("invalid credentials");
	}
}
