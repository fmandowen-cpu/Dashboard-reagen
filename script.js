let dataReagen = [];

const form = document.getElementById("formReagen");
const tabelBody = document.querySelector("#tabelReagen tbody");
const filter = document.getElementById("kategori");

// Fungsi tambah reagen
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const kategori = document.getElementById("kategoriReagen").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const tanggalMasuk = document.getElementById("tanggalMasuk").value;
  const tanggalKeluar = document.getElementById("tanggalKeluar").value;
  const expDate = document.getElementById("expDate").value;

  // Cek apakah reagen sudah ada
  const existing = dataReagen.find(r => r.nama === nama && r.kategori === kategori);

  if (existing) {
    existing.jumlah += jumlah;
    existing.detail.push({tanggalMasuk, tanggalKeluar, expDate, jumlah});
  } else {
    dataReagen.push({
      nama, kategori, jumlah,
      detail: [{tanggalMasuk, tanggalKeluar, expDate, jumlah}]
    });
  }

  renderTable();
  form.reset();
});

// Fungsi render tabel
function renderTable() {
  tabelBody.innerHTML = "";

  const kategoriFilter = filter.value;

  dataReagen
    .filter(r => kategoriFilter === "all" || r.kategori === kategoriFilter)
    .forEach(reagen => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${reagen.nama}</td>
        <td>${reagen.kategori}</td>
        <td>${reagen.jumlah}</td>
        <td>${reagen.detail.map(d => d.tanggalMasuk).join("<br>")}</td>
        <td>${reagen.detail.map(d => d.tanggalKeluar || "-").join("<br>")}</td>
        <td>${reagen.detail.map(d => d.expDate).join("<br>")}</td>
      `;
      tabelBody.appendChild(row);
    });
}

// Filter kategori
filter.addEventListener("change", renderTable);
