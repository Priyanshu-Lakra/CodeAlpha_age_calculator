let interval;

function startLiveAge() {
  clearInterval(interval);
  calculateAge();
  interval = setInterval(calculateAge, 1000);
}

function calculateAge() {
  const dobValue = document.getElementById("dob").value;
  const result = document.getElementById("result");
  const extra = document.getElementById("extra");
  const countdown = document.getElementById("countdown");

  if (!dobValue) {
    result.innerHTML = "Please select your Date of Birth";
    return;
  }

  const dob = new Date(dobValue);
  const now = new Date();

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Total calculations
  const diff = now - dob;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diff / (1000 * 60));

  result.innerHTML = `
    ${years} Years, ${months} Months, ${days} Days
  `;

  extra.innerHTML = `
    📊 ${totalDays} Days | ${totalHours} Hours | ${totalMinutes} Minutes
  `;

  // Birthday Countdown
  let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());

  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const timeLeft = nextBirthday - now;

  const cdDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const cdHours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

  countdown.innerHTML = `🎉 Next Birthday in ${cdDays} days, ${cdHours} hours`;
}

// 🌙 Dark Mode Toggle
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};