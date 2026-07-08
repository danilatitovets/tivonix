export type AiModel = {
  id: string;
  name: string;
  src: string;
  x: number;
  y: number;
  rowX: number;
  rowY: number;
  /** Множитель к базовому размеру (1 = как у Claude/Ollama). */
  scale: number;
  brighten?: boolean;
  colorful?: boolean;
};

const ORBIT_RX = 33;
const ORBIT_RY = 31;
export const ORBIT_RX_MOBILE = 35;
export const ORBIT_RY_MOBILE = 25;
export const ORBIT_RX_PHONE = 36;
export const ORBIT_RY_PHONE = 24;
const ROW_Y = 84;
export const ROW_Y_MOBILE = 86;
/** Ширина серой плашки в ряду (см. .ai-logo-row-item--row .ai-logo-block-slot) */
export const ROW_BLOCK_REF = 136;
export const ROW_BLOCK_REF_MOBILE = 120;
export const ROW_BLOCK_REF_MOBILE_ROW = 76;
export const ROW_COLS_MOBILE = 5;
const ROW_Y_MOBILE_TOP = 62;
const ROW_Y_MOBILE_BOTTOM = 84;
/** Лёгкое наезжание плашек друг на друга */
export const ROW_OVERLAP = 10;
export const ROW_OVERLAP_MOBILE = 0;
export const ROW_BLOCK_REF_PHONE = 72;
export const ROW_OVERLAP_PHONE = 0;
export const ROW_BLOCK_REF_TABLET = 80;
export const ROW_OVERLAP_TABLET = 6;
/** Шаг между логотипами в горизонтальной ленте (телефон, шире экрана → drift-скролл) */
export const ROW_STEP_PHONE = 112;
export const ROW_STEP_TABLET = 92;
export const ROW_Y_PHONE = 80;
export const ROW_STRIP_LEADING_PHONE = 32;
export const ROW_STRIP_LEADING_TABLET = 32;

export function orbitPosition(index: number, total: number, rx = ORBIT_RX, ry = ORBIT_RY) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + rx * Math.cos(angle),
    y: 50 + ry * Math.sin(angle),
  };
}

export function rowPosition(
  index: number,
  total: number,
  blockRef = ROW_BLOCK_REF,
  overlap = ROW_OVERLAP,
  rowY = ROW_Y
) {
  const step = blockRef - overlap;
  const layoutW = blockRef + (total - 1) * step;
  const centerPx = blockRef / 2 + index * step;
  const rowX = (centerPx / layoutW) * 100;
  return { rowX, rowY };
}

/** Лента шире экрана: позиции в % от stage, могут быть > 100% */
export function rowPositionScrollStrip(
  index: number,
  itemStep: number,
  stageWidth: number,
  rowY: number,
  leadingPad = 28
) {
  const centerPx = leadingPad + itemStep * 0.5 + index * itemStep;
  const rowX = stageWidth > 0 ? (centerPx / stageWidth) * 100 : 50;
  return { rowX, rowY };
}

export const ROW_Y_MOBILE_ROWS = [ROW_Y_MOBILE_TOP, 78, ROW_Y_MOBILE_BOTTOM] as const;
export function rowPositionTwoRows(
  index: number,
  total: number,
  colsPerRow: number,
  blockRef: number,
  overlap = ROW_OVERLAP_MOBILE
) {
  const rowIndex = Math.floor(index / colsPerRow);
  const colIndex = index % colsPerRow;
  const itemsInRow = Math.min(colsPerRow, total - rowIndex * colsPerRow);

  const step = blockRef - overlap;
  const layoutW = blockRef + Math.max(0, itemsInRow - 1) * step;
  const centerPx = blockRef / 2 + colIndex * step;
  const rowX = itemsInRow === 1 ? 50 : (centerPx / layoutW) * 100;
  const rowY = rowIndex === 0 ? ROW_Y_MOBILE_TOP : ROW_Y_MOBILE_BOTTOM;

  return { rowX, rowY };
}

/** Несколько рядов на мобилке (например 4 + 4 + 2). */
export function rowPositionMultiRow(
  index: number,
  total: number,
  colsPerRow: number,
  blockRef: number,
  rowYs: readonly number[],
  overlap = ROW_OVERLAP_MOBILE
) {
  const rowIndex = Math.floor(index / colsPerRow);
  const colIndex = index % colsPerRow;
  const itemsInRow = Math.min(colsPerRow, total - rowIndex * colsPerRow);

  const step = blockRef - overlap;
  const layoutW = blockRef + Math.max(0, itemsInRow - 1) * step;
  const centerPx = blockRef / 2 + colIndex * step;
  const rowX = itemsInRow === 1 ? 50 : (centerPx / layoutW) * 100;
  const rowY = rowYs[Math.min(rowIndex, rowYs.length - 1)] ?? rowYs[rowYs.length - 1];

  return { rowX, rowY };
}

function orbitPositionLegacy(index: number, total: number) {
  return orbitPosition(index, total, ORBIT_RX, ORBIT_RY);
}

function rowPositionLegacy(index: number, total: number) {
  return rowPosition(index, total, ROW_BLOCK_REF, ROW_OVERLAP);
}

const MODEL_DEFS = [
  { id: "openai", name: "OpenAI", file: "openai.webp", scale: 1.88 },
  { id: "claude", name: "Claude", file: "claude.webp", scale: 1.08, colorful: true },
  { id: "gemini", name: "Gemini", file: "gemini.webp", scale: 2.12 },
  { id: "grok", name: "Grok", file: "grok.webp", scale: 2.65 },
  { id: "deepseek", name: "DeepSeek", file: "deepseek.webp", scale: 1.72, brighten: true },
  { id: "copilot", name: "Copilot", file: "copilot.webp", scale: 1.06 },
  { id: "meta", name: "Meta AI", file: "meta.webp", scale: 1.45 },
  { id: "mistral", name: "Mistral", file: "mistral.webp", scale: 0.96 },
  { id: "ollama", name: "Ollama", file: "ollama.webp", scale: 1.02 },
  { id: "perplexity", name: "Perplexity", file: "perplexity.webp", scale: 1.28 },
] as const;

export const AI_MODELS: AiModel[] = MODEL_DEFS.map((model, index) => {
  const { x, y } = orbitPositionLegacy(index, MODEL_DEFS.length);
  const { rowX, rowY } = rowPositionLegacy(index, MODEL_DEFS.length);
  return {
    id: model.id,
    name: model.name,
    src: `/images/ai-logos/${model.file}`,
    x,
    y,
    rowX,
    rowY,
    scale: model.scale,
    brighten: "brighten" in model ? model.brighten : undefined,
    colorful: "colorful" in model ? model.colorful : undefined,
  };
});

export const AI_MODEL_COUNT = AI_MODELS.length;
