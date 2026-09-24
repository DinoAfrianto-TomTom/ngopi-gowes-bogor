"use client";

import { useMemo, useState } from "react";

type AmenityKey =
  | "parkirSepeda"
  | "bikeFriendly"
  | "outdoorSeating"
  | "waterRefill"
  | "bikeRepair";

type CoffeeShop = {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  rating: number;
  priceRange: string;
  openingHours: string;
  description: string;
  gradient: string;
  amenities: Record<AmenityKey, boolean>;
};

const amenityOptions: { key: AmenityKey; label: string }[] = [
  { key: "parkirSepeda", label: "Parkir Sepeda" },
  { key: "bikeFriendly", label: "Bike-Friendly" },
  { key: "outdoorSeating", label: "Outdoor Seating" },
  { key: "waterRefill", label: "Water Refill" },
  { key: "bikeRepair", label: "Bike Repair" },
];

const coffeeShops: CoffeeShop[] = [
  {
    id: 1,
    name: "Kedai Kopi Taman Kencana",
    neighborhood: "Taman Kencana",
    address: "Jl. Taman Kencana No. 7, Bogor Tengah",
    rating: 4.7,
    priceRange: "Rp25.000 - Rp45.000",
    openingHours: "06.30 - 22.00",
    description: "Pit stop favorit komunitas gowes pagi dengan area duduk rindang.",
    gradient: "from-[#6f4e37] to-[#355e3b]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: true,
      waterRefill: true,
      bikeRepair: false,
    },
  },
  {
    id: 2,
    name: "Pedal & Pour Baranangsiang",
    neighborhood: "Baranangsiang",
    address: "Jl. Pajajaran No. 21, Baranangsiang",
    rating: 4.5,
    priceRange: "Rp28.000 - Rp50.000",
    openingHours: "07.00 - 23.00",
    description: "Dekat jalur utama sepeda dengan rak sepeda dan menu sarapan ringan.",
    gradient: "from-[#7a5c3d] to-[#3b6d5b]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: false,
      waterRefill: true,
      bikeRepair: true,
    },
  },
  {
    id: 3,
    name: "Kopi Kebun Raya Corner",
    neighborhood: "Paledang",
    address: "Jl. Ir. H. Juanda No. 15, Paledang",
    rating: 4.6,
    priceRange: "Rp22.000 - Rp40.000",
    openingHours: "06.00 - 21.00",
    description: "Suasana hijau dekat Kebun Raya, cocok untuk pendinginan setelah gowes.",
    gradient: "from-[#5f4634] to-[#4e7f4b]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: true,
      waterRefill: false,
      bikeRepair: false,
    },
  },
  {
    id: 4,
    name: "Saddle Brew Yasmin",
    neighborhood: "Yasmin",
    address: "Jl. KH. Abdullah Bin Nuh No. 9, Yasmin",
    rating: 4.4,
    priceRange: "Rp24.000 - Rp42.000",
    openingHours: "07.00 - 22.30",
    description: "Nyaman untuk rombongan, halaman luas dan jalur masuk ramah pesepeda.",
    gradient: "from-[#8a6646] to-[#3f6b4f]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: true,
      waterRefill: true,
      bikeRepair: false,
    },
  },
  {
    id: 5,
    name: "Roda Dua Roastery",
    neighborhood: "Bantarjati",
    address: "Jl. Achmad Adnawijaya No. 3, Bantarjati",
    rating: 4.3,
    priceRange: "Rp20.000 - Rp38.000",
    openingHours: "08.00 - 21.30",
    description: "Tempat santai dengan teknisi sepeda mitra setiap akhir pekan.",
    gradient: "from-[#6d4f39] to-[#2f5f47]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: false,
      waterRefill: false,
      bikeRepair: true,
    },
  },
  {
    id: 6,
    name: "Pitstop Kopi Bogor Selatan",
    neighborhood: "Batutulis",
    address: "Jl. Batutulis Raya No. 18, Bogor Selatan",
    rating: 4.8,
    priceRange: "Rp30.000 - Rp55.000",
    openingHours: "05.30 - 20.00",
    description: "Buka lebih pagi untuk rute subuh, lengkap dengan refill air gratis.",
    gradient: "from-[#7c5638] to-[#3f7a4f]",
    amenities: {
      parkirSepeda: true,
      bikeFriendly: true,
      outdoorSeating: true,
      waterRefill: true,
      bikeRepair: true,
    },
  },
];

const neighborhoodOptions = [
  "Semua area",
  ...Array.from(new Set(coffeeShops.map((shop) => shop.neighborhood))),
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Semua area");
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const filteredShops = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return coffeeShops.filter((shop) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        shop.name.toLowerCase().includes(normalizedSearch) ||
        shop.neighborhood.toLowerCase().includes(normalizedSearch);

      const matchesNeighborhood =
        selectedNeighborhood === "Semua area" ||
        shop.neighborhood === selectedNeighborhood;

      const matchesAmenities = selectedAmenities.every(
        (amenity) => shop.amenities[amenity],
      );

      return matchesSearch && matchesNeighborhood && matchesAmenities;
    });
  }, [search, selectedNeighborhood, selectedAmenities]);

  const favoritesCount = favoriteIds.length;

  const toggleAmenity = (amenity: AmenityKey) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const toggleFavorite = (shopId: number) => {
    setFavoriteIds((current) =>
      current.includes(shopId)
        ? current.filter((item) => item !== shopId)
        : [...current, shopId],
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] text-[#2b2118]">
      <header className="sticky top-0 z-20 border-b border-[#dcc9b1] bg-[#f7f1e8]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a className="text-lg font-bold tracking-tight text-[#3f6d48]" href="#beranda">
            NgopiGowes Bogor
          </a>
          <nav aria-label="Navigasi utama" className="flex flex-wrap items-center gap-2 text-sm">
            <a className="rounded-full px-3 py-2 hover:bg-[#e9dbc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48]" href="#jelajah">
              Jelajah
            </a>
            <a className="rounded-full px-3 py-2 hover:bg-[#e9dbc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48]" href="#peta">
              Peta
            </a>
            <a className="rounded-full px-3 py-2 hover:bg-[#e9dbc9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48]" href="#favorit">
              Favorit
            </a>
            <span
              id="indikator-favorit"
              aria-live="polite"
              className="rounded-full bg-[#3f6d48] px-3 py-1 font-semibold text-white"
            >
              {favoritesCount} favorit
            </span>
          </nav>
        </div>
      </header>

      <main id="beranda" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-[#533421] to-[#3f6d48] p-6 text-white shadow-lg sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              Komunitas pesepeda Bogor
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Temukan spot ngopi ramah pesepeda di Bogor.
            </h1>
            <p className="max-w-xl text-sm text-[#f6efe8] sm:text-base">
              Cari kedai kopi favorit untuk pit stop, meet-up, atau recovery ride.
              Data saat ini masih demo untuk MVP NgopiGowes Bogor.
            </p>
          </div>
          <form className="flex h-full flex-col justify-end gap-3" role="search">
            <label htmlFor="cari-kedai" className="text-sm font-semibold">
              Cari kedai atau area
            </label>
            <input
              id="cari-kedai"
              name="cari-kedai"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Contoh: Yasmin atau Pitstop"
              className="w-full rounded-xl border border-white/30 bg-white/95 px-4 py-3 text-sm text-[#2b2118] placeholder:text-[#6f6358] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fdbad]"
            />
          </form>
        </section>

        <section id="jelajah" className="space-y-4" aria-labelledby="judul-filter">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="judul-filter" className="text-2xl font-bold text-[#2f2a25]">
              Jelajahi Kedai
            </h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="filter-area" className="text-sm font-medium">
                Area
              </label>
              <select
                id="filter-area"
                value={selectedNeighborhood}
                onChange={(event) => setSelectedNeighborhood(event.target.value)}
                className="rounded-xl border border-[#ccb59a] bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48]"
              >
                {neighborhoodOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter amenitas pesepeda">
            {amenityOptions.map((amenity) => {
              const isActive = selectedAmenities.includes(amenity.key);

              return (
                <button
                  key={amenity.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleAmenity(amenity.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48] ${
                    isActive
                      ? "border-[#3f6d48] bg-[#3f6d48] text-white"
                      : "border-[#ccb59a] bg-white text-[#3c3026] hover:bg-[#efe4d4]"
                  }`}
                >
                  {amenity.label}
                </button>
              );
            })}
          </div>
        </section>

        <section id="peta" aria-labelledby="judul-peta" className="rounded-3xl border border-[#dcc9b1] bg-white p-6 shadow-sm">
          <h2 id="judul-peta" className="text-xl font-bold text-[#2f2a25]">
            Gambaran Lokasi Bogor
          </h2>
          <p className="mt-2 text-sm text-[#64584d]">
            Peta interaktif belum diaktifkan. Bagian ini adalah placeholder visual untuk
            rencana integrasi peta (MapLibre/Leaflet + backend lokasi) pada iterasi
            berikutnya.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-gradient-to-br from-[#d8f0df] to-[#f3e6d4] p-4">
              <div className="grid h-48 place-items-center rounded-xl border border-dashed border-[#6ca27a] bg-white/70 text-center text-sm text-[#35563e]">
                Placeholder peta Bogor (tanpa API key eksternal)
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              {neighborhoodOptions
                .filter((area) => area !== "Semua area")
                .map((area) => {
                  const total = coffeeShops.filter(
                    (shop) => shop.neighborhood === area,
                  ).length;

                  return (
                    <li
                      key={area}
                      className="flex items-center justify-between rounded-xl bg-[#f8f3ec] px-3 py-2"
                    >
                      <span>{area}</span>
                      <span className="font-semibold text-[#3f6d48]">{total} kedai</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <section id="favorit" aria-labelledby="judul-daftar" className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <h2 id="judul-daftar" className="text-2xl font-bold text-[#2f2a25]">
              Daftar Kedai
            </h2>
            <p className="text-sm text-[#5f5449]">
              {filteredShops.length} hasil ditemukan
            </p>
          </div>

          {filteredShops.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#c3ad92] bg-white p-8 text-center text-sm text-[#6b5f53]">
              Belum ada kedai yang cocok. Coba ubah kata kunci atau nonaktifkan beberapa
              filter amenitas.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredShops.map((shop) => {
                const isFavorite = favoriteIds.includes(shop.id);

                return (
                  <article
                    key={shop.id}
                    className="overflow-hidden rounded-2xl border border-[#dcc9b1] bg-white shadow-sm"
                  >
                    <div
                      className={`h-28 bg-gradient-to-br ${shop.gradient}`}
                      aria-hidden="true"
                    />
                    <div className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-[#2e241c]">{shop.name}</h3>
                          <p className="text-sm text-[#6d6257]">{shop.neighborhood}</p>
                        </div>
                        <button
                          type="button"
                          aria-pressed={isFavorite}
                          aria-label={`${isFavorite ? "Hapus dari" : "Tambah ke"} favorit ${shop.name}`}
                          onClick={() => toggleFavorite(shop.id)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6d48] ${
                            isFavorite
                              ? "border-[#3f6d48] bg-[#3f6d48] text-white"
                              : "border-[#ccb59a] text-[#6d6257] hover:bg-[#f4e9d9]"
                          }`}
                        >
                          {isFavorite ? "★ Favorit" : "☆ Favorit"}
                        </button>
                      </div>

                      <p className="text-sm text-[#5d5147]">{shop.description}</p>
                      <dl className="space-y-1 text-sm text-[#4f453c]">
                        <div className="flex justify-between gap-2">
                          <dt>Alamat</dt>
                          <dd className="text-right">{shop.address}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Rating</dt>
                          <dd>{shop.rating} / 5</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Harga</dt>
                          <dd>{shop.priceRange}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>Jam buka</dt>
                          <dd>{shop.openingHours}</dd>
                        </div>
                      </dl>

                      <ul className="flex flex-wrap gap-2 pt-1 text-xs font-medium">
                        {amenityOptions
                          .filter((amenity) => shop.amenities[amenity.key])
                          .map((amenity) => (
                            <li
                              key={amenity.key}
                              className="rounded-full bg-[#e4f4e8] px-2 py-1 text-[#305f3b]"
                            >
                              {amenity.label}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
