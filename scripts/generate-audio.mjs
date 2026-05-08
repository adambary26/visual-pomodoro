import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");

function writeWAV(filePath, sampleRate, samples) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * (bitsPerSample / 8);
  const buf = Buffer.alloc(44 + dataSize);

  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }

  fs.writeFileSync(filePath, buf);
}

// chime: two-tone ascending (C5, E5) with fade out, 0.6s
const sr = 44100;
const chimeLen = Math.round(sr * 0.6);
const chime = new Float32Array(chimeLen);
for (let i = 0; i < chimeLen; i++) {
  const t = i / sr;
  const envelope = Math.max(0, 1 - t / 0.6);
  const freq1 = 523.25;
  const freq2 = 659.25;
  const mix = Math.min(1, t / 0.15) * (t < 0.3 ? 1 : Math.max(0, 1 - (t - 0.3) / 0.15));
  chime[i] = (Math.sin(2 * Math.PI * freq1 * t) * 0.4 + Math.sin(2 * Math.PI * freq2 * t) * 0.3) * envelope * 0.6 + (Math.sin(2 * Math.PI * (freq1 * 2) * t) * 0.1) * envelope * 0.5;
}
writeWAV(path.join(assetsDir, "chime.wav"), sr, chime);

// rain: brown noise, 4s loopable
const rainLen = Math.round(sr * 4);
const rain = new Float32Array(rainLen);
let val = 0;
for (let i = 0; i < rainLen; i++) {
  val += (Math.random() - 0.5) * 0.08;
  val = Math.max(-1, Math.min(1, val));
  rain[i] = val * 0.3;
}
writeWAV(path.join(assetsDir, "rain.wav"), sr, rain);

console.log("Generated chime.wav and rain.wav");
