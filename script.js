
let langData = {
  en: { title: "Number Analyzer", placeholder: "Enter numbers like 12 45 67", analyze: "Analyze", clear: "Clear History" },
  hi: { title: "नंबर विश्लेषक", placeholder: "संख्याएं दर्ज करें जैसे 12 45 67", analyze: "विश्लेषण करें", clear: "इतिहास साफ़ करें" },
  gu: { title: "નંબર વિશ્લેષક", placeholder: "આંકડા દાખલ કરો જેમ કે 12 45 67", analyze: "વિશ્લેષણ કરો", clear: "ઈતિહાસ સાફ કરો" }
};

function changeLanguage() {
  const lang = document.getElementById("language").value;
  document.getElementById("app-title").innerText = langData[lang].title;
  document.getElementById("numberInput").placeholder = langData[lang].placeholder;
  document.querySelector("button").innerText = langData[lang].analyze;
  document.querySelectorAll("button")[1].innerText = langData[lang].clear;
}

function analyze() {
  const input = document.getElementById("numberInput").value.trim();
  if (!input) return;
  const numbers = input.split(/\s+/).map(Number).filter(n => !isNaN(n));
  let resultMap = {};
  numbers.forEach(n => resultMap[n] = (resultMap[n] || 0) + 1);
  let result = Object.entries(resultMap).map(([num, count]) => num + ": " + count).join("<br>");
  document.getElementById("result").innerHTML = result;
  saveToHistory(numbers);
  showTrendChart();
}

function saveToHistory(numbers) {
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  history.push({ numbers, time: new Date().toLocaleString() });
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  let html = "<h3>History</h3>";
  history.slice().reverse().forEach(h => {
    html += `<div><strong>${h.time}</strong>: ${h.numbers.join(", ")}</div>`;
  });
  document.getElementById("history").innerHTML = html;
}

function clearHistory() {
  localStorage.removeItem("history");
  displayHistory();
}

function showTrendChart() {
  let history = JSON.parse(localStorage.getItem("history") || "[]");
  let freq = {};
  history.forEach(entry => entry.numbers.forEach(n => freq[n] = (freq[n] || 0) + 1));
  const labels = Object.keys(freq);
  const data = Object.values(freq);
  const ctx = document.getElementById("trendChart").getContext("2d");
  if (window.trendChart) window.trendChart.destroy();
  window.trendChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Number Frequency", data, backgroundColor: "#f00" }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

window.onload = () => {
  changeLanguage();
  displayHistory();
  showTrendChart();
};
