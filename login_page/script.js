const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");

    togglePassword.addEventListener("click", () => {
      const showing = password.type === "text";
      password.type = showing ? "password" : "text";
      togglePassword.textContent = showing ? "Show" : "Hide";
    });

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      message.textContent =
        "This is the frontend demo. Connect a secure authentication backend to sign in.";
      message.classList.add("show");
    });

    document.getElementById("googleBtn").addEventListener("click", () => {
      message.textContent =
        "Google sign-in needs to be configured with an authentication provider.";
      message.classList.add("show");
    });