// The Prediction
const fileInput = document.getElementById("file-input");
const classifyBtn = document.getElementById("classify-btn");
const labelCell = document.querySelector("td:nth-child(2)");
const presentaseCell = labelCell.nextElementSibling;
const deskripsiCell = presentaseCell.nextElementSibling;

classifyBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Silakan pilih gambar terlebih dahulu!");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://web-production-02ce.up.railway.app/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Gagal memproses gambar");
    }

    const data = await response.json();
    const label = data.label;

    // Tampilkan hasil
    labelCell.textContent = label === 0 ? "Segar" : "Tidak Segar";
    presentaseCell.textContent = "-";
    deskripsiCell.textContent =
      label === 0
        ? "Ikan ini tergolong segar berdasarkan fitur visualnya."
        : "Ikan ini tidak segar, perhatikan perubahan warna dan tekstur.";
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengirim gambar ke API.");
  }
});

// Reset Button
const resetBtn = document.querySelector(".btn:nth-child(3)");
resetBtn.addEventListener("click", () => {
  fileInput.value = "";
  labelCell.textContent = "-";
  presentaseCell.textContent = "-";
  deskripsiCell.textContent = "-";
});

// Modal Interaction
const modal = document.getElementById("about-modal");
const aboutUsBtn = document.getElementById("about-us-btn");
const closeBtn = document.querySelector(".close-btn");

aboutUsBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
