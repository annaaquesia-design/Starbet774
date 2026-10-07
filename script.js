const modal=document.getElementById("gameModal");
const area=document.getElementById("gameArea");
const title=document.getElementById("modalTitle");
const tag=document.getElementById("modalTag");
const tokensEl=document.getElementById("tokens");
const balanceEl=document.getElementById("balance");
let tokens=Number(localStorage.getItem("demoTokens")||1);
let balance=Number(localStorage.getItem("demoBalance")||20);
let currentGame="";

function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}
function render(){tokensEl.textContent=tokens;balanceEl.textContent=money(balance);}
function openGame(game){
  currentGame=game;
  modal.classList.remove("hidden");
  const names={tiger:"Fortune Tiger",rabbit:"Fortune Rabbit",aviator:"Aviator"};
  title.textContent=names[game];
  tag.textContent="JOGO DEMONSTRATIVO";
  if(game==="tiger") tiger();
  if(game==="rabbit") rabbit();
  if(game==="aviator") aviator();
}
function tiger(){
  area.innerHTML=`<div class="reels"><div class="reel" id="r1">?</div><div class="reel" id="r2">?</div><div class="reel" id="r3">?</div></div><div class="result" id="result">Toque em “Jogar novamente” para iniciar a rodada virtual.</div><p class="notice">Resultado puramente aleatório e sem valor financeiro.</p>`;
  spin(["🐯","🍀","💎","⭐","🍊"],"tiger");
}
function rabbit(){
  area.innerHTML=`<div class="reels"><div class="reel" id="r1">?</div><div class="reel" id="r2">?</div><div class="reel" id="r3">?</div></div><div class="result" id="result">Girando...</div><p class="notice">Resultado puramente demonstrativo.</p>`;
  spin(["🐰","🥕","💎","⭐","🍀"],"rabbit");
}
function spin(items,type){
  const reels=[document.getElementById("r1"),document.getElementById("r2"),document.getElementById("r3")];
  let i=0;
  const timer=setInterval(()=>{
    reels.forEach(r=>r.textContent=items[Math.floor(Math.random()*items.length)]);
    i++;
    if(i>=12){
      clearInterval(timer);
      const values=reels.map(r=>r.textContent);
      const win=values[0]===values[1]&&values[1]===values[2];
      document.getElementById("result").innerHTML=win?`Combinação: <strong>Você encontrou 3 iguais!</strong>`:`Resultado: <strong>Rodada concluída</strong>`;
    }
  },110);
}
function aviator(){
  area.innerHTML=`<div class="aviator"><div class="multiplier" id="mult">1.00x</div><div class="plane">✈️</div></div><div class="result" id="result">Simulação iniciada...</div><p class="notice">Nenhuma aposta ou dinheiro real é utilizado.</p>`;
  let value=1, steps=0;
  const timer=setInterval(()=>{
    value+=Math.random()*.35+.05;
    document.getElementById("mult").textContent=value.toFixed(2)+"x";
    steps++;
    if(steps>=18){
      clearInterval(timer);
      document.getElementById("result").innerHTML=`Avião encerrou em <strong>${value.toFixed(2)}x</strong>`;
    }
  },180);
}
document.querySelectorAll(".play-btn").forEach(b=>b.onclick=()=>openGame(b.dataset.game));
document.getElementById("closeGame").onclick=()=>modal.classList.add("hidden");
document.getElementById("playAgain").onclick=()=>openGame(currentGame);
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
render();
