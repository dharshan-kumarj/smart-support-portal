document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("supportForm");
  const subjectInput = document.getElementById("subject");
  const descriptionInput = document.getElementById("description");

  const subjectError = document.getElementById("subjectError");
  const descriptionError = document.getElementById("descriptionError");

  const subjectCount = document.getElementById("subjectCount");
  const descriptionCount = document.getElementById("descriptionCount");

  const successMessage = document.getElementById("formSuccess");

  // Validation rules
  const validateSubject = () => {
    const val = subjectInput.value.trim();
    if (!val) {
      showError(subjectInput, subjectError, "Subject is required.");
      return false;
    }
    if (val.length < 5) {
      showError(subjectInput, subjectError, "Subject must be at least 5 characters.");
      return false;
    }
    if (val.length > 100) {
      showError(subjectInput, subjectError, "Subject must be at most 100 characters.");
      return false;
    }
    clearError(subjectInput, subjectError);
    return true;
  };

  const validateDescription = () => {
    const val = descriptionInput.value.trim();
    if (!val) {
      showError(descriptionInput, descriptionError, "Description is required.");
      return false;
    }
    if (val.length < 20) {
      showError(descriptionInput, descriptionError, "Description must be at least 20 characters.");
      return false;
    }
    if (val.length > 1000) {
      showError(descriptionInput, descriptionError, "Description must be at most 1000 characters.");
      return false;
    }
    clearError(descriptionInput, descriptionError);
    return true;
  };

  // Show error message and styling
  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.add("error-input");
    input.setAttribute("aria-invalid", "true");
  }

  // Clear error message and styling
  function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("error-input");
    input.removeAttribute("aria-invalid");
  }

  // Update character count
  function updateCharCount(input, counterEl) {
    counterEl.textContent = `${input.value.length} / ${input.maxLength}`;
  }

  // Real-time validation on input/blur
  subjectInput.addEventListener("input", () => {
    updateCharCount(subjectInput, subjectCount);
    validateSubject();
  });
  subjectInput.addEventListener("blur", validateSubject);

  descriptionInput.addEventListener("input", () => {
    updateCharCount(descriptionInput, descriptionCount);
    validateDescription();
  });
  descriptionInput.addEventListener("blur", validateDescription);

  // Initial char count update
  updateCharCount(subjectInput, subjectCount);
  updateCharCount(descriptionInput, descriptionCount);

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const subjectValid = validateSubject();
    const descriptionValid = validateDescription();

    if (subjectValid && descriptionValid) {
      successMessage.style.display = "block";

      // Optionally clear form and errors
      form.reset();
      updateCharCount(subjectInput, subjectCount);
      updateCharCount(descriptionInput, descriptionCount);
      clearError(subjectInput, subjectError);
      clearError(descriptionInput, descriptionError);
    } else {
      successMessage.style.display = "none";
    }
  });
});
