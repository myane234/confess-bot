const venom = require('venom-bot');

// Inisialisasi bot dan buat sesi baru
venom.create({
  session: 'session-name', // Simpan sesi agar tidak perlu scan QR setiap kali
}).then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    // Tambahkan pengecekan untuk memastikan message dan message.body ada
    if (!message || !message.body) {
      console.error('Pesan tidak valid:', message);
      return;
    }

    // Cek apakah pesan dimulai dengan '!confess'
    if (message.body.startsWith('!confess')) {
      const [_, nomor, ...pesan] = message.body.split(' ');

      // Cek apakah nomor dan pesan sudah dimasukkan
      if (!nomor || pesan.length === 0) {
        client.sendText(message.from, 'Format salah! Gunakan: !confess <nomor> <pesan>');
        return;
      }

      const pesanConfess = pesan.join(' ');

      try {
        // Kirim pesan ke nomor tujuan
        await client.sendText(`${nomor}@c.us`, `Pesan anonim: ${pesanConfess}`);
        client.sendText(message.from, 'Pesan confess berhasil dikirim secara anonim.');
      } catch (error) {
        console.error('Error saat mengirim pesan:', error);
        client.sendText(message.from, 'Gagal mengirim pesan confess. Pastikan nomor tujuan valid.');
      }
    }
  });
}
