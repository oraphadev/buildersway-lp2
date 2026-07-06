import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bw" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9c75ff"/>
      <stop offset="1" stop-color="#5e9bff"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="1.1" r="1">
      <stop offset="0" stop-color="#5e9bff" stop-opacity="0.22"/>
      <stop offset="0.55" stop-color="#9c75ff" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#080808"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(508 120) scale(0.17)" fill="url(#bw)">
    <path d="m979.93 601.91-2.11-1.56-256.23 256.8c-26.15 26.21-68.54 26.21-94.69 0s-26.15-68.69 0-94.9l275.68-276.29 124.49-124.77 6.9-6.91c1.9-2.14 3.69-4.41 5.42-6.73 57.99-71.14 53.88-176.15-12.31-242.49l-30.81-30.88A212 212 0 0 0 962.96 47C920.2 17.39 868.39 0 812.49 0H215.2C96.35 0 0 96.56 0 215.68v367.34l357.11-357.9c26.15-26.21 68.54-26.21 94.69 0s26.15 68.69 0 94.9L176.03 596.4 66.63 706.04c-86.3 86.49-86.6 226.51-.94 313.4l.05-.02c38.72 37.48 91.38 60.58 149.47 60.58h597.28c146.43 0 265.14-118.97 265.14-265.73v-28.09s-3.78-109.51-97.7-184.27M223.64 857.53c-26.15-26.21-26.15-68.69 0-94.9l536.73-537.9c26.15-26.21 68.54-26.21 94.69 0s26.15 68.69 0 94.9l-536.73 537.9c-26.15 26.21-68.54 26.21-94.69 0"/>
  </g>
  <text x="600" y="400" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#f5f5f5" letter-spacing="-1">BuildersWay</text>
  <text x="600" y="466" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" font-weight="400" fill="#a3a3a3">Impulsionamos negócios através da inteligência artificial</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(process.argv[2]);
console.log("ok");
