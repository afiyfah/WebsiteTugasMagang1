# Portfolio 3D — Raka Aditya

Website portofolio 3D interaktif dibangun dengan **Next.js + React Three Fiber + Three.js + GSAP/ScrollTrigger + Drei + Lenis**, terinspirasi dari david-hckh.com.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Untuk build produksi:

```bash
npm run build
npm run start
```

## Struktur

- app/page.tsx — merangkai semua section (Hero, About, Projects, Contact)
- components/canvas/Experience.tsx — scene 3D: kamera, lighting, laptop, drag-to-rotate
- components/canvas/useGSAPRig.ts — animasi laptop yang terikat scroll (posisi/rotasi/scale)
- components/canvas/SceneLayer.tsx — canvas fixed full-screen + fade sebelum section Projects
- components/sections/* — Hero, About (bubble skill/asal), Projects (6 card), Contact
- lib/SmoothScroller.tsx — Lenis dihubungkan ke GSAP ticker & ScrollTrigger
- public/models/laptop_gaming.glb — model laptop yang kamu upload

## Yang bisa kamu ganti

- Nama & role: components/sections/Hero.tsx
- Bubble (asal, role, skill): components/sections/About.tsx (array BUBBLES)
- 6 project card: components/sections/Projects.tsx (array PROJECTS)
- Email & social link: components/sections/Contact.tsx
- Warna/aksen: variabel di app/globals.css (--cyan, --violet, --amber, dst)
- Pose laptop di tiap tahap scroll: components/canvas/useGSAPRig.ts

## Interaksi

- Laptop bisa digeser (drag) dengan mouse/jari untuk diputar — aktif di semua tahap.
- Scroll dari Hero ke About: laptop pindah dari kanan, berputar menghadap depan, dan membesar (zoom), lalu muncul bubble asal/role/skill di sekitarnya.
- Scroll lanjut ke Projects: canvas 3D fade out, muncul 6 card project, lalu Contact.

Catatan: di sandbox pembuatan ini Google Fonts tidak bisa diakses sehingga font fallback ke sistem — begitu dijalankan dengan akses internet normal, font Space Grotesk, Inter, dan JetBrains Mono akan otomatis termuat.
