// Variabel untuk menyimpan data pesanan
let totalItem = 0;
let totalHarga = 0;

// Referensi elemen DOM untuk Pesanan
const elJumlahItem = document.getElementById('jumlah-item');
const elTotalHarga = document.getElementById('total-harga');
const btnReset = document.getElementById('btn-reset');
const btnPesanSemua = document.querySelectorAll('.btn-pesan');

// Fungsi untuk format angka ke mata uang Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// 1. FITUR TAMBAH PESANAN
btnPesanSemua.forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        // Mengambil elemen artikel (kartu menu) parent dari tombol yang diklik
        const kartu = tombol.parentElement;

        // Mengambil harga dari atribut data-harga, lalu ubah ke integer
        const harga = parseInt(kartu.getAttribute('data-harga'));

        // Kalkulasi
        totalItem += 1;
        totalHarga += harga;

        // Tampilkan ke layar (DOM)
        elJumlahItem.textContent = totalItem;
        elTotalHarga.textContent = formatRupiah(totalHarga);
    });
});

// 2. FITUR KOSONGKAN PESANAN (RESET)
btnReset.addEventListener('click', function () {
    // Kembalikan variabel ke 0
    totalItem = 0;
    totalHarga = 0;

    // Update tampilan
    elJumlahItem.textContent = totalItem;
    elTotalHarga.textContent = "Rp 0";
});

// 3. FITUR FILTER KATEGORI
const tombolFilter = document.querySelectorAll('.btn-filter');
const kartuMenuSemua = document.querySelectorAll('.kartu-menu');

tombolFilter.forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        // Hapus class 'active' dari semua tombol filter
        tombolFilter.forEach(btn => btn.classList.remove('active'));
        // Tambahkan class 'active' ke tombol yang sedang diklik
        this.classList.add('active');

        // Ambil nilai kategori dari atribut data-filter tombol
        const kategoriDipilih = this.getAttribute('data-filter');

        // Proses penyaringan (filter) menu
        kartuMenuSemua.forEach(function (kartu) {
            const kategoriMenu = kartu.getAttribute('data-kategori');

            // Jika filter "semua" dipilih atau kategori kartu cocok dengan tombol
            if (kategoriDipilih === 'semua' || kategoriDipilih === kategoriMenu) {
                kartu.style.display = 'block'; // Tampilkan kartu
            } else {
                kartu.style.display = 'none'; // Sembunyikan kartu
            }
        });
    });
});