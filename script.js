function analyzeResults() {
  const input = document.getElementById("resultInput").value;
  const numbers = input.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));

  if (numbers.length < 5) {
    document.getElementById("output").innerText = "⚠️ Please enter at least 5 numbers.";
    return;
  }

  const counts = {};
  numbers.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map(([num, count]) => `${num} (x${count})`);

  document.getElementById("output").innerHTML = `
    ✅ Top predicted numbers: <b>${top3.join(", ")}</b><br/>
    🔁 Total analyzed: ${numbers.length}
  `;
}
