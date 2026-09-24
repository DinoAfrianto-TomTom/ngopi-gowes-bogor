# ngopi-gowes-bogor

A Next.js web app for discovering cyclist-friendly coffee shops in Bogor.

## MVP: NgopiGowes Bogor

Aplikasi ini adalah MVP web app untuk membantu pesepeda menemukan kedai kopi ramah gowes di Bogor.

### Fitur saat ini

- Landing page “NgopiGowes Bogor” dengan desain responsif
- Pencarian kedai berdasarkan nama atau area
- Filter amenitas pesepeda:
  - Parkir sepeda
  - Bike-friendly
  - Outdoor seating
  - Water refill
  - Bike repair
- Daftar kedai kopi Bogor dengan data demo (rating, harga, jam buka, alamat)
- Tombol favorit berbasis state di client
- Placeholder peta lokasi Bogor tanpa API key eksternal

> **Catatan:** Data kedai saat ini adalah **demo data statis** untuk kebutuhan MVP.

## Menjalankan project

### Prasyarat

- Node.js 20+
- npm 10+

### Instalasi

```bash
npm install
```

### Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run lint
npm run build
```

## Rencana integrasi berikutnya

- Integrasi backend/database (mis. Supabase/PostgreSQL) untuk data kedai dinamis
- Integrasi peta interaktif (MapLibre/Leaflet/OpenStreetMap)
- Menambahkan detail route/komunitas pesepeda dan kontribusi pengguna
