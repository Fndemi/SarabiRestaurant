// In-memory storage for reservations, loaded from localStorage
    let reservations = [];

    // Load existing reservations on page load
    document.addEventListener('DOMContentLoaded', function () {
      const savedReservations = localStorage.getItem('reservations');
      if (savedReservations) {
        reservations = JSON.parse(savedReservations);
      }

      displayReservations();
      loadFormData();
      setupFormValidation();
    });

    // Setup real-time form validation
    function setupFormValidation() {
      const form = document.getElementById('reservationForm');
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        field.addEventListener('blur', function () {
          validateField(field);
        });

        field.addEventListener('input', function () {
          if (field.classList.contains('border-red-500')) {
            validateField(field);
          }
        });
      });
    }

    // Validate individual field
    function validateField(field) {
      const errorElement = document.getElementById(field.id + '-error');
      let isValid = true;
      let errorMessage = '';

      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `${field.labels[0].textContent.replace('*', '').trim()} is required.`;
      } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
      }

      if (isValid) {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
        field.setAttribute('aria-invalid', 'false');
      } else {
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-300');
        errorElement.textContent = errorMessage;
        errorElement.classList.remove('hidden');
        field.setAttribute('aria-invalid', 'true');
      }

      return isValid;
    }

    // Email validation
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Phone validation
    function isValidPhone(phone) {
      return /^[\+]?[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // Save form data as user types
    function saveFormData() {
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        specialRequests: document.getElementById('specialRequests').value
      };

      localStorage.setItem('reservationFormData', JSON.stringify(formData));
    }

    // Load saved form data
    function loadFormData() {
      const savedData = localStorage.getItem('reservationFormData');
      if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('fullName').value = formData.fullName || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('phone').value = formData.phone || '';
        document.getElementById('date').value = formData.date || '';
        document.getElementById('time').value = formData.time || '';
        document.getElementById('guests').value = formData.guests || '';
        document.getElementById('specialRequests').value = formData.specialRequests || '';
      }
    }

    // Add event listeners to save form data as user types
    document.querySelectorAll('#reservationForm input, #reservationForm select, #reservationForm textarea').forEach(field => {
      field.addEventListener('input', saveFormData);
      field.addEventListener('change', saveFormData);
    });

    // Handle form submission
    document.getElementById('reservationForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const form = e.target;
      const requiredFields = form.querySelectorAll('[required]');
      let isFormValid = true;

      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        const firstInvalidField = form.querySelector('.border-red-500');
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      const formData = {
        id: Date.now(),
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        specialRequests: document.getElementById('specialRequests').value,
        createdAt: new Date().toISOString()
      };

      reservations.push(formData);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      localStorage.removeItem('reservationFormData');

      document.getElementById('successMessage').classList.remove('hidden');
      document.querySelector('#successMessage button').focus();

      form.reset();
      form.querySelectorAll('.border-red-500').forEach(field => field.classList.remove('border-red-500'));

      displayReservations();
    });

    function displayReservations() {
      const reservationsList = document.getElementById('reservationsList');

      if (reservations.length === 0) {
        reservationsList.innerHTML = '<p class="text-center text-gray-600">No reservations found.</p>';
        return;
      }

      reservationsList.innerHTML = reservations.map(reservation => `
            <article class="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30" role="listitem">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900">${escapeHtml(reservation.fullName)}</h3>
                        <p class="text-gray-700">${escapeHtml(reservation.email)}</p>
                    </div>
                    <button onclick="deleteReservation(${reservation.id})" class="text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1" aria-label="Delete reservation for ${escapeHtml(reservation.fullName)}">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
                <dl class="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <dt class="font-medium text-gray-800">Date:</dt>
                        <dd class="text-gray-700">
                            <time datetime="${reservation.date}">${new Date(reservation.date).toLocaleDateString()}</time>
                        </dd>
                    </div>
                    <div>
                        <dt class="font-medium text-gray-800">Time:</dt>
                        <dd class="text-gray-700">${escapeHtml(reservation.time)}</dd>
                    </div>
                    <div>
                        <dt class="font-medium text-gray-800">Guests:</dt>
                        <dd class="text-gray-700">${escapeHtml(reservation.guests)}</dd>
                    </div>
                </dl>
                ${reservation.specialRequests ? `
                    <div class="mt-4">
                        <dt class="font-medium text-gray-800">Special Requests:</dt>
                        <dd class="text-gray-700">${escapeHtml(reservation.specialRequests)}</dd>
                    </div>
                ` : ''}
            </article>
        `).join('');
    }
   
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function deleteReservation(id) {
      if (confirm('Are you sure you want to delete this reservation?')) {
        reservations = reservations.filter(r => r.id !== id);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        displayReservations();
      }
    }

    function closeSuccessMessage() {
      document.getElementById('successMessage').classList.add('hidden');
      document.getElementById('fullName').focus();
    }

    // Set minimum date to today
    document.getElementById('date').min = new Date().toISOString().split('T')[0];

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('successMessage');
        if (!modal.classList.contains('hidden')) {
          closeSuccessMessage();
        }
      }
    });