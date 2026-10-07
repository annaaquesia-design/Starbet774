const balanceEl = document.getElementById("balance");
const walletBalanceEl = document.getElementById("walletBalance");
const tokensEl = document.getElementById("tokens");
const statusEl = document.getElementById("gameStatus");
const modal = document.getElementById("depositModal");
const toast = document.getElementById("toast");

let balance = Number(localStorage.getItem("demoBalance") || 0);
let tokens = Number(localStorage.getItem("demoTokens") || 0);

function formatBRL(value) {
  return value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
}
function render() {
  balanceEl.textContent = formatBRL(balance);
  walletBalanceEl.textContent = formatBRL(balance);
  tokensEl.textContent = tokens;
  const unlocked = tokens > 0;
  statusEl.textContent = unlocked ? "1 ficha disponível" : "Bloqueados";
  document.querySelectorAll(".game-card").forEach(card => {
    card.classList.toggle("locked", !unlocked);
    card.querySelector(".play-btn").disabled = !unlocked;
  });
}
function save() {
  localStorage.setItem("demoBalance", balance);
  localStorage.setItem("demoTokens", tokens);
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("openDeposit").onclick = () => modal.classList.remove("hidden");
document.getElementById("closeDeposit").onclick = () => modal.classList.add("hidden");
modal.onclick = e => { if (e.target === modal) modal.classList.add("hidden"); };

document.getElementById("confirmDeposit").onclick = () => {
  balance += 20;
  tokens += 1;
  save();
  render();
  modal.classList.add("hidden");
  showToast("Ficha virtual de R$ 20,00 adicionada.");
};

document.querySelectorAll(".play-btn").forEach(btn => {
  btn.onclick = e => {
    if (tokens <= 0) return;
    const game = e.target.closest(".game-card").dataset.game;
    showToast(`${game}: modo demonstrativo.`);
  };
});

render();
