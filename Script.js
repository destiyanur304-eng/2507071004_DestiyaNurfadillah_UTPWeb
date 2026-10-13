const BATAS_HARI = 7;
const DENDA_PER_HARI = 1000;

const daftarBuku = [
    {
        judul: "Dasar-Dasar HTML",
        kategori: "Pemrograman"
    },
    {
        judul: "Belajar CSS",
        kategori: "Pemrograman"
    },
    {
        judul: "Pengantar SQL",
        kategori: "Basis Data"
    },
    {
        judul: "Desain Basis Data",
        kategori: "Basis Data"
    }
];

console.log("Daftar Buku Pustaka Lampung:", daftarBuku);

const btnInfo = document.getElementById("btn-info");
const infoAturan = document.getElementById("info-aturan");

const namaAnggota = document.getElementById("nama-anggota");
const previewNama = document.getElementById("preview-nama");

const lamaPinjam = document.getElementById("lama-pinjam");
const btnHitung = document.getElementById("btn-hitung");
const hasilDenda = document.getElementById("hasil-denda");

const btnTambah = document.getElementById("btn-tambah");
const btnKurang = document.getElementById("btn-kurang");
const jumlahBuku = document.getElementById("jumlah-buku");

const formPeminjaman = document.getElementById("form-peminjaman");
const statusPinjam = document.getElementById("status-pinjam");

btnInfo.addEventListener("click", function () {
    infoAturan.classList.toggle("tersembunyi");

    if (infoAturan.classList.contains("tersembunyi")) {
        btnInfo.textContent = "Tampilkan Aturan";
    } else {
        btnInfo.textContent = "Sembunyikan Aturan";
    }
});

namaAnggota.addEventListener("input", function () {
    const nama = namaAnggota.value.trim();

    if (nama === "") {
        previewNama.textContent = "Belum diisi";
    } else {
        previewNama.textContent = nama;
    }
});

function hitungDenda(lamaPinjam) {
    if (lamaPinjam <= BATAS_HARI) {
        return 0;
    }

    return (lamaPinjam - BATAS_HARI) * DENDA_PER_HARI;
}

const cekStatus = (hari) =>
    hari > BATAS_HARI ? "Terlambat" : "Tepat Waktu";

btnHitung.addEventListener("click", function () {
    const lama = Number(lamaPinjam.value);

    if (
        lamaPinjam.value === "" ||
        !Number.isFinite(lama) ||
        lama < 1
    ) {
        hasilDenda.innerHTML =
            "<b>Masukkan lama peminjaman minimal 1 hari.</b>";
        hasilDenda.style.color = "red";
        return;
    }

    const denda = hitungDenda(lama);
    const status = cekStatus(lama);

    hasilDenda.innerHTML = `
        <p>Status: <b>${status}</b></p>
        <p>Lama peminjaman: <b>${lama} hari</b></p>
        <p>Total denda: <b>Rp${denda.toLocaleString("id-ID")}</b></p>
    `;

    hasilDenda.style.color = "#176B52";
});

let jumlah = 0;

btnTambah.addEventListener("click", function () {
    if (jumlah < 3) {
        jumlah++;
        jumlahBuku.textContent = jumlah;
    }

    if (jumlah === 3) {
        statusPinjam.textContent ="Perhatian: jumlah buku sudah mencapai batas maksimal 3 buku.";
        statusPinjam.style.color = "red";
    } else {
        statusPinjam.textContent = "";
        statusPinjam.style.color = "";
    }
});

btnKurang.addEventListener("click", function () {
    if (jumlah > 0) {
        jumlah--;
        jumlahBuku.textContent = jumlah;
    }

    if (jumlah < 3) {
        statusPinjam.textContent = "";
        statusPinjam.style.color = "";
    }
});

formPeminjaman.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = namaAnggota.value.trim();

    if (nama === "") {
        statusPinjam.textContent =
            "Pengajuan gagal. Nama anggota wajib diisi.";
        statusPinjam.style.color = "red";
    } else {
        statusPinjam.textContent =
            "Pengajuan peminjaman berhasil dibuat atas nama " + nama + ".";
        statusPinjam.style.color = "green";
    }
});

formPeminjaman.addEventListener("reset", function () {
    jumlah = 0;
    jumlahBuku.textContent = "0";

    previewNama.textContent = "Belum diisi";

    hasilDenda.innerHTML = "";
    hasilDenda.style.color = "";

    statusPinjam.textContent = "";
    statusPinjam.style.color = "";
});

const kartu = document.querySelectorAll(".kartu");
kartu.forEach(function (elemen) {
    elemen.addEventListener("mouseover", function () {
        elemen.style.backgroundColor = "#F3F8EF";
    });

    elemen.addEventListener("mouseout", function () {
        elemen.style.backgroundColor = "white";
    });
});

const semuaBarisTabel = document.querySelectorAll("table tr");
semuaBarisTabel.forEach(function (baris) {
    baris.addEventListener("mouseover", function () {
        baris.style.backgroundColor = "#DCE9D8";
    });

    baris.addEventListener("mouseout", function () {
        baris.style.backgroundColor = "";
    });
});