function toggleEditMode() {
    const fields = document.querySelectorAll('[contenteditable]');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
  
    fields.forEach(field => {
      field.setAttribute('contenteditable', 'true');
      field.style.borderBottom = '1px solid #3498db';
    });
  
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
  }
  
  function saveChanges() {
    const fields = document.querySelectorAll('[contenteditable]');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
  
    fields.forEach(field => {
      field.setAttribute('contenteditable', 'false');
      field.style.borderBottom = 'none';
    });
  
    // Here, you can send data to the server if needed, using an AJAX request or form submission.
  
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
  }
  