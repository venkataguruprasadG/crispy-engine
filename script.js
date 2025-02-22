function confirmLogout() {
    var result = confirm("Do you really want to log out?");
    if (result) {
        // Redirect to the actual logout function or page
        window.location.href = "logout.html";
    } else {
        // Do nothing if the user cancels
        alert("Logout canceled");
    }
}
