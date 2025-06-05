async function submitForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('form-status') || createStatusElement();
  
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  try {
    const formData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim()
    };

    const response = await fetch('/api/contact', {
      method: 'POST', // Ensure this is POST
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      statusDiv.textContent = 'Message sent successfully!';
      statusDiv.className = 'success';
      form.reset();
    } else {
      throw new Error(result.message || 'Failed to send message');
    }

  } catch (error) {
    console.error('Form submission error:', error);
    statusDiv.textContent = error.message || 'Failed to send message. Please try again.';
    statusDiv.className = 'error';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
}

function createStatusElement() {
  const statusDiv = document.createElement('div');
  statusDiv.id = 'form-status';
  const form = document.querySelector('form');
  form.parentNode.insertBefore(statusDiv, form.nextSibling);
  return statusDiv;
}

// Add form submit listener
document.querySelector('form').addEventListener('submit', submitForm);