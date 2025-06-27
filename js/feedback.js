 // Mobile menu toggle
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
    }

    // Form validation
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(msg => {
        msg.classList.add('hidden');
        msg.textContent = '';
      });

      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.classList.remove('border-red-500');
      });

      let isValid = true;

      // Validate name
      const name = document.getElementById('name');
      if (!name.value.trim()) {
        showError('nameError', 'Name is required');
        name.classList.add('border-red-500');
        isValid = false;
      } else if (name.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        name.classList.add('border-red-500');
        isValid = false;
      }

      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        showError('emailError', 'Email is required');
        email.classList.add('border-red-500');
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        email.classList.add('border-red-500');
        isValid = false;
      }

      // Validate subject
      const subject = document.getElementById('subject');
      if (!subject.value) {
        showError('subjectError', 'Please select a subject');
        subject.classList.add('border-red-500');
        isValid = false;
      }

      // Validate message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        showError('messageError', 'Message is required');
        message.classList.add('border-red-500');
        isValid = false;
      } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        message.classList.add('border-red-500');
        isValid = false;
      }

      if (isValid) {
        // Show success message
        document.getElementById('successMessage').classList.remove('hidden');

        // Reset form
        this.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById('successMessage').classList.add('hidden');
        }, 5000);

        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        // Scroll to first error
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          firstError.focus();
        }
      }
    });

    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }

    // Real-time validation
    document.getElementById('name').addEventListener('blur', function () {
      if (this.value.trim() && this.value.trim().length >= 2) {
        this.classList.remove('border-red-500');
        document.getElementById('nameError').classList.add('hidden');
      }
    });

    document.getElementById('email').addEventListener('blur', function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value.trim() && emailRegex.test(this.value)) {
        this.classList.remove('border-red-500');
        document.getElementById('emailError').classList.add('hidden');
      }
    });

    document.getElementById('subject').addEventListener('change', function () {
      if (this.value) {
        this.classList.remove('border-red-500');
        document.getElementById('subjectError').classList.add('hidden');
      }
    });

    document.getElementById('message').addEventListener('blur', function () {
      if (this.value.trim() && this.value.trim().length >= 10) {
        this.classList.remove('border-red-500');
        document.getElementById('messageError').classList.add('hidden');
      }
    });
