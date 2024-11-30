function saveChanges() {
  const userName = document.getElementById("userName").innerText;
  const userEmail = document.getElementById("userEmail").innerText;
  const Password = document.getElementById("Password").innerText;

  fetch("/profile/update", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
          user_name: userName,
          user_email: userEmail,
          pass: Password
      })
  })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Profile updated successfully!");
              toggleEditMode(); // Exit edit mode
          } else {
              alert("Failed to update profile. Please try again.");
          }
      })
      .catch(error => {
          console.error("Error updating profile:", error);
          alert("An error occurred. Please try again.");
      });
}

function toggleEditMode() {
  const fields = document.querySelectorAll('[contenteditable]');
  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');

  if (editButton.style.display === "none") {
      fields.forEach(field => {
          field.setAttribute('contenteditable', 'false');
          field.style.borderBottom = 'none';
      });
      editButton.style.display = "inline-block";
      saveButton.style.display = "none";
  } else {
      fields.forEach(field => {
          field.setAttribute('contenteditable', 'true');
          field.style.borderBottom = '1px solid #3498db';
      });
      editButton.style.display = "none";
      saveButton.style.display = "inline-block";
  }
}
