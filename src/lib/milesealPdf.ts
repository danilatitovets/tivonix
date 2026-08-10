import type { jsPDF } from "jspdf";
import type { Lang } from "../i18n/LangProvider";

type PdfFontKey = "helvetica" | "notoSans" | "notoSansSc";

const fontCache = new Map<PdfFontKey, Promise<string>>();

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function loadFontBytes(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`font_fetch_failed:${url}`);
  return res.arrayBuffer();
}

function registerFont(doc: jsPDF, vfsName: string, fontId: PdfFontKey, base64: string): string {
  doc.addFileToVFS(vfsName, base64);
  doc.addFont(vfsName, fontId, "normal");
  return fontId;
}

async function ensurePdfFont(doc: jsPDF, lang: Lang): Promise<string> {
  const key: PdfFontKey = lang === "zh" ? "notoSansSc" : lang === "ru" ? "notoSans" : "helvetica";
  if (key === "helvetica") return "helvetica";

  if (!fontCache.has(key)) {
    fontCache.set(
      key,
      (async () => {
        const url =
          key === "notoSansSc"
            ? "/fonts/NotoSansSC-Regular.ttf"
            : "/fonts/NotoSans-Regular.ttf";
        const vfsName = key === "notoSansSc" ? "NotoSansSC-Regular.ttf" : "NotoSans-Regular.ttf";
        const bytes = await loadFontBytes(url);
        return registerFont(doc, vfsName, key, arrayBufferToBase64(bytes));
      })()
    );
  }

  return fontCache.get(key)!;
}

/** Normalize symbols missing from NotoSans SC so pdftotext/pypdf can extract amounts. */
function normalizeForPdfTextLayer(text: string): string {
  return text
    .replace(/\u00A0|\u202F/g, " ")
    .replace(/£/g, "GBP ")
    .replace(/\$/g, "USD ")
    .replace(/\u2013|\u2014/g, "-");
}

/** Adds a searchable (invisible) text layer for pdftotext and screen readers. */
export async function appendSearchableTextLayer(
  doc: jsPDF,
  plainText: string,
  lang: Lang
): Promise<void> {
  const trimmed = normalizeForPdfTextLayer(plainText.trim());
  if (!trimmed) return;

  const fontName = await ensurePdfFont(doc, lang);
  doc.setFont(fontName, "normal");
  doc.setFontSize(10);

  const margin = 8;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxWidth = pageW - margin * 2;
  const lineHeight = 4.2;
  const lines = doc.splitTextToSize(trimmed, maxWidth) as string[];

  let pageIndex = 0;
  let y = margin;
  doc.setPage(1);

  for (const line of lines) {
    if (y > pageH - margin) {
      pageIndex += 1;
      if (pageIndex >= doc.getNumberOfPages()) doc.addPage();
      doc.setPage(pageIndex + 1);
      y = margin;
    }
    doc.text(line, margin, y, { renderingMode: "invisible" });
    y += lineHeight;
  }
}

export async function savePdfWithTextLayer(
  doc: jsPDF,
  plainText: string,
  lang: Lang,
  fileName: string
): Promise<void> {
  await appendSearchableTextLayer(doc, plainText, lang);
  doc.save(fileName);
}
