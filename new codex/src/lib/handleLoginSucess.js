"use client";

function getCookie(name) {
  if (typeof document === "undefined") return null;

  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";")[0]);
  }

  return null;
}

const handleLoginSuccess = () => {
  try {
    const redirect = getCookie("redirect") || "/";

    console.log("Redirecting to:", redirect);

    // Delete cookie after using it
    document.cookie = "redirect=; Max-Age=0; path=/";

    // IMPORTANT: Use window.location instead of useRouter()
    window.location.href = redirect;

  } catch (err) {
    console.log("error while redirecting on login success", err);
    window.location.href = "/";
  }
};

export default handleLoginSuccess;
