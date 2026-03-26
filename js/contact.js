const form = document.getElementById("hotelForm");
const formPanel = document.getElementById("formPanel");
const successMessage = document.getElementById("successMessage");
const submitButton = document.getElementById("submitButton");
const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");
const phone = document.getElementById("phone");

function toISO(date) {
    return date.toISOString().split("T")[0];
}

function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function formatDate(value) {
    return new Date(value + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
    });
}

function syncDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const defaultCheckIn = addDays(today, 1);
    const defaultCheckOut = addDays(defaultCheckIn, 1);

    checkIn.min = toISO(today);

    if (!checkIn.value) {
    checkIn.value = toISO(defaultCheckIn);
    }

    const inDate = new Date(checkIn.value + "T00:00:00");
    const minOutDate = addDays(inDate, 1);

    checkOut.min = toISO(minOutDate);

    if (!checkOut.value || new Date(checkOut.value + "T00:00:00") <= inDate) {
    checkOut.value = toISO(minOutDate);
    }
}

function validatePhone() {
    const digits = phone.value.replace(/\D/g, "");
    if (phone.value.trim() && digits.length < 7) {
    phone.setCustomValidity("Please enter a valid phone number.");
    } else {
    phone.setCustomValidity("");
    }
}

syncDates();

checkIn.addEventListener("change", () => {
    checkOut.setCustomValidity("");
    syncDates();
});

checkOut.addEventListener("change", () => {
    const inDate = new Date(checkIn.value + "T00:00:00");
    const outDate = new Date(checkOut.value + "T00:00:00");
    if (outDate <= inDate) {
    checkOut.setCustomValidity("Check-out must be after check-in.");
    } else {
    checkOut.setCustomValidity("");
    }
});

phone.addEventListener("input", validatePhone);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validatePhone();

    const inDate = new Date(checkIn.value + "T00:00:00");
    const outDate = new Date(checkOut.value + "T00:00:00");

    if (outDate <= inDate) {
    checkOut.setCustomValidity("Check-out must be after check-in.");
    } else {
    checkOut.setCustomValidity("");
    }

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const fullName = data.get("name").trim();
    const firstName = fullName.split(" ")[0] || "Guest";
    const start = formatDate(data.get("checkin"));
    const end = formatDate(data.get("checkout"));

    successMessage.classList.remove("show");
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.querySelector("span").textContent = "Sending request";

    setTimeout(() => {
    successMessage.textContent = `Thank you, ${firstName}. Your stay request for ${start} to ${end} has been received.`;
    successMessage.classList.add("show");
    form.reset();
    syncDates();

    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
    submitButton.querySelector("span").textContent = "Request stay";

    formPanel.classList.add("submitted");
    setTimeout(() => formPanel.classList.remove("submitted"), 1200);
    }, 1100);
});