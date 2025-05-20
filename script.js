document.addEventListener("DOMContentLoaded", () => {
  const lire = (cle) => JSON.parse(localStorage.getItem(cle)) || [];
  const sauver = (cle, val) => localStorage.setItem(cle, JSON.stringify(val));

  const deps = lire("depenses");
  const revs = lire("revenus");

  const totalDep = deps.reduce((s, d) => s + d.montant, 0);
  const totalRev = revs.reduce((s, r) => s + r.montant, 0);
  const solde = totalRev - totalDep;

  const [pRev, pDep, pSolde] = document.querySelectorAll(".summary .card p");
  pRev.textContent = totalRev.toLocaleString() + " F CFA";
  pDep.textContent = totalDep.toLocaleString() + " F CFA";
  pSolde.textContent = solde.toLocaleString() + " F CFA";

  const tDeps = document.querySelectorAll("table tbody")[0];
  const tRevs = document.querySelectorAll("table tbody")[1];

  deps.forEach((d, i) => {
    const row = `<tr>
      <td>${d.titre}</td>
      <td>${d.montant.toLocaleString()} F CFA</td>
      <td><button class="btn-supprimer" onclick="supprimer('depenses', ${i})">Supprimer</button></td>
    </tr>`;
    tDeps.insertAdjacentHTML("beforeend", row);
  });

  revs.forEach((r, i) => {
    const row = `<tr>
      <td>${r.titre}</td>
      <td>${r.montant.toLocaleString()} F CFA</td>
      <td><button class="btn-supprimer" onclick="supprimer('revenus', ${i})">Supprimer</button></td>
    </tr>`;
    tRevs.insertAdjacentHTML("beforeend", row);
  });

  window.supprimer = (cle, i) => {
    const liste = lire(cle);
    liste.splice(i, 1);
    sauver(cle, liste);
    location.reload();
  };

  document.getElementById("form-depense").addEventListener("submit", (e) => {
    e.preventDefault();
    const champs = e.target.querySelectorAll("input[type=text]");
    const titre = champs[0].value.trim();
    const montant = parseInt(champs[1].value.replace(/[^\d]/g, ""), 10);
    if (!titre || isNaN(montant)) return alert("Champs invalides");
    const liste = lire("depenses");
    liste.push({ titre, montant });
    sauver("depenses", liste);
    fermerModal("modal-depense");
    location.reload();
  });

  document.getElementById("form-revenu").addEventListener("submit", (e) => {
    e.preventDefault();
    const champs = e.target.querySelectorAll("input[type=text]");
    const titre = champs[0].value.trim();
    const montant = parseInt(champs[1].value.replace(/[^\d]/g, ""), 10);
    if (!titre || isNaN(montant)) return alert("Champs invalides");
    const liste = lire("revenus");
    liste.push({ titre, montant });
    sauver("revenus", liste);
    fermerModal("modal-revenu");
    location.reload();
  });
});

function ouvrirModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function fermerModal(id) {
  document.getElementById(id).classList.add("hidden");
}
