import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const JSZip = require("/Users/specialjapaneselanguageacademy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/jszip");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8765);
const HOST = process.env.HOST || "0.0.0.0";
const UPLOAD_DIR = path.join(__dirname, "uploads");
const UPLOAD_INDEX = path.join(UPLOAD_DIR, "index.json");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
  ".csv": "text/csv; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function xmlDecode(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, "&");
}

function xmlEncode(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isUuidLike(value) {
  return /^[0-9a-f]{8}-[0-9a-f-]{20,}$/i.test(String(value || "").trim());
}

function fieldKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function asText(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value).trim();
}

function usableText(value) {
  const text = asText(value);
  return /^(?:-|—|n\/a|na|not applicable|null|undefined)$/i.test(text) ? "" : text;
}

function money(value) {
  const n = Number(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function parseDateParts(value) {
  const text = asText(value);
  if (!text) return { day: "", month: "", year: "" };
  const iso = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (iso) return { year: iso[1], month: iso[2].padStart(2, "0"), monthName: new Date(Number(iso[1]), Number(iso[2]) - 1, 1).toLocaleString("en-US", { month: "long" }), day: iso[3].padStart(2, "0") };
  const named = text.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})(?:,\s*[A-Za-z]+)?$/);
  if (named) {
    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const monthIndex = monthNames.findIndex((month) => month === named[2].toLowerCase() || month.slice(0, 3) === named[2].toLowerCase());
    return { day: named[1], month: monthIndex >= 0 ? String(monthIndex + 1) : named[2], monthName: monthIndex >= 0 ? new Date(2000, monthIndex, 1).toLocaleString("en-US", { month: "long" }) : named[2], year: named[3] };
  }
  const slash = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (slash) return { day: slash[1], month: slash[2], monthName: slash[2], year: slash[3] };
  return { day: "", month: "", monthName: "", year: "" };
}

function formatDateValue(value, pattern = "dd/MM/yyyy") {
  const parts = parseDateParts(value);
  if (!parts.year || !parts.day || !parts.month) return asText(value);
  const monthNumber = Number(parts.month);
  const shortMonth = Number.isFinite(monthNumber) ? new Date(2000, monthNumber - 1, 1).toLocaleString("en-US", { month: "short" }) : parts.monthName;
  const tokens = {
    yyyy: parts.year,
    yy: String(parts.year).slice(-2),
    MMMM: parts.monthName,
    MMM: shortMonth,
    MM: String(monthNumber).padStart(2, "0"),
    M: String(monthNumber),
    dd: String(Number(parts.day)).padStart(2, "0"),
    d: String(Number(parts.day)),
  };
  return String(pattern).replace(/yyyy|MMMM|MMM|yy|MM|dd|M|d/g, (token) => tokens[token] ?? token);
}

function dateFromParts(parts) {
  const day = Number(parts.day);
  const month = Number(parts.month);
  const year = Number(parts.year);
  return day && month && year ? new Date(year, month - 1, day) : null;
}

function durationYears(start, end = new Date()) {
  const date = dateFromParts(parseDateParts(start));
  if (!date) return "";
  let years = end.getFullYear() - date.getFullYear();
  const anniversary = new Date(end.getFullYear(), date.getMonth(), date.getDate());
  if (end < anniversary) years -= 1;
  return String(Math.max(0, years));
}

function rowValue(row, key) {
  if (!row || !key) return "";
  const wanted = fieldKey(key);
  const hit = Object.entries(row).find(([name]) => fieldKey(name) === wanted);
  return hit ? asText(hit[1]) : "";
}

function rowsFrom(sections, name) {
  const rows = sections?.[name]?.rows;
  return Array.isArray(rows) ? rows : [];
}

function transactionRowsFrom(sections) {
  const rows = rowsFrom(sections, "Transaction Records");
  const account = sections?.["Account Information"] || {};
  let runningBalance = money(account.opening_amount || account.opening_balance);
  const referenceSetup = sections?.["Reference Number Setup"] || {};
  const configuredReferences = String(referenceSetup.reference_notes || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const referencePrefix = asText(referenceSetup.reference_prefix);
  const referenceStart = Number(String(referenceSetup.reference_start_no || "26366").replace(/\D/g, "")) || 26366;
  let transactionIndex = 0;
  return rows.map((row) => {
    const debit = money(row.debit || row.Debit);
    const credit = money(row.credit || row.Credit);
    runningBalance += credit - debit;
    const entryType = asText(row._entry_type || row.entry_type).toLowerCase();
    const isPosting = entryType === "interest" || entryType === "tax";
    const configuredReference = configuredReferences[transactionIndex] || `${referencePrefix}${referenceStart + transactionIndex}`;
    const explicitDescription = usableText(row.description || row.Description || row.descriptions || row.Descriptions || row.particular || row.Particular);
    const generatedDescription = entryType === "interest"
      ? "Interest Credit"
      : entryType === "tax"
        ? "Tax Deduction"
        : debit > 0
          ? "Cash Withdrawal"
          : credit > 0
            ? "Cash Deposit"
            : "Opening Balance";
    const reference = isPosting ? "" : (row.reference_no || row.cheque_no || row.cheque || row.reference || configuredReference);
    if (!isPosting) transactionIndex += 1;
    return {
      date: row.date || row.Date || "",
      person: row.transaction_by || row.TransactionBy || row.particular || row.Particular || "System",
      description: explicitDescription || generatedDescription,
      entryType,
      debit,
      credit,
      balance: money(row.balance || row.Balance) || runningBalance,
      reference,
    };
  });
}

const ACCOUNT_STYLE_DATE_FORMATS = {
  "Join PAN": "dd/MM/yyyy",
  "Kapri PAN": "dd/MM/yyyy",
  "Kashmira PAN": "dd/MM/yyyy",
  "Lakuri PAN": "d/M/yyyy",
  "Lok Dharma PAN": "yyyy/MM/dd",
  "Samanupatik PAN": "dd/MM/yyyy",
  "Santoshi Mata PAN": "dd/M/yyyy",
  "Sarba-pran PAN": "dd/MM/yyyy",
  "Silver Star PAN": "dd-MMM-yyyy",
  "Sumarga PAN": "dd-MMM-yy",
  "Trinetra PAN": "d-MMM-yy",
};

const ACCOUNT_STYLE_LAYOUTS = {
  "Join PAN": { columns: 6, description: 2, cheque: 1, debit: 3, credit: 4, balance: 5 },
  "Kapri PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Kashmira PAN": { columns: 6, description: 5, cheque: 1, debit: 2, credit: 3, balance: 4 },
  "Lakuri PAN": { columns: 5, description: 1, cheque: -1, debit: 2, credit: 3, balance: 4 },
  "Lok Dharma PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Samanupatik PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Santoshi Mata PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Sarba-pran PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Silver Star PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Sumarga PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
  "Trinetra PAN": { columns: 6, description: 1, cheque: 2, debit: 3, credit: 4, balance: 5 },
};

function accountStyleName(filename) {
  const base = path.basename(String(filename || ""), path.extname(String(filename || "")));
  return ACCOUNT_STYLE_DATE_FORMATS[base] ? base : "Trinetra PAN";
}

function accountStyleLayout(filename) {
  return ACCOUNT_STYLE_LAYOUTS[accountStyleName(filename)] || ACCOUNT_STYLE_LAYOUTS["Trinetra PAN"];
}

function rowsWithOpeningBalance(rows, sections) {
  const account = sections?.["Account Information"] || {};
  const opening = money(account.opening_amount || account.opening_balance);
  const hasOpening = rows.some((row) => /opening balance|balance b\/?f|balance brought/i.test(String(row.description || "")));
  if (hasOpening || !rows.length) return rows;
  return [{
    date: account.opening_date || rows[0].date,
    description: "Opening Balance",
    person: "",
    debit: 0,
    credit: 0,
    balance: opening,
    reference: "",
    entryType: "opening",
  }, ...rows];
}

function findSponsor(sections) {
  const rows = rowsFrom(sections, "Family");
  return rows.find((row) => /sponsor|father|mother/i.test(`${row.type || ""} ${row.f_a_relation || ""} ${row["F-A Relation"] || ""}`)) || rows[0] || sections?.Family || {};
}

function findEducationRow(rows, title) {
  if (!rows.length) return {};
  const wanted = fieldKey(title);
  return rows.find((row) => fieldKey(row.title) === wanted || fieldKey(row.title).includes(wanted) || wanted.includes(fieldKey(row.title))) || rows[0];
}

function resolveTemplateCode(rawCode, record = {}, sections = {}) {
  const raw = asText(rawCode).replace(/^\{+|\}+$/g, "").trim();
  const clean = raw.replace(/^[<^~]+/, "").trim();
  const lower = clean.toLowerCase();
  const normalized = lower.replace(/\s*>\s*/g, ">").replace(/\s*:\s*/g, ":").replace(/\s+/g, " ");
  const home = sections.Home || {};
  const official = sections.Official || {};
  const application = sections.Application || {};
  const income = sections.Income || {};
  const account = sections["Account Information"] || {};
  const transactionRows = transactionRowsFrom(sections);
  const totalDebit = transactionRows.reduce((sum, row) => sum + row.debit, 0);
  const totalCredit = transactionRows.reduce((sum, row) => sum + row.credit, 0);
  const openingBalance = money(account.opening_amount || account.opening_balance);
  const closingBalance = money(account.closing_balance) || transactionRows.at(-1)?.balance || openingBalance + totalCredit - totalDebit;
  const accountReference = usableText(account.account_reference_no || account.account_no);
  const referenceSetup = sections["Reference Number Setup"] || {};
  const configuredReferences = String(referenceSetup.reference_notes || "").split(",").map((item) => item.trim()).filter(Boolean);
  const referenceStartNo = String(referenceSetup.reference_start_no || "26366").replace(/\D/g, "") || "26366";
  const safeAccountReference = !accountReference || configuredReferences.includes(accountReference) || accountReference === referenceStartNo ? "056-02010" : accountReference;
  const direct = {
    name: record.name || home.applicant,
    applicant: record.name || home.applicant,
    "first name": record.firstName || home.first_name,
    "middle name": record.middleName || home.middle_name,
    "last name": record.lastName || home.last_name,
    gender: record.gender || home.gender,
    dob: official.dob || official.dob_bs,
    "birth place": application.birth_place,
    "citizenship no": official.citizenship_no,
    nid: official.nid || official.nid_no,
    "passport no": record.passport || official.passport_no,
    "passport issued date": official.passport_issued_date,
    "passport expiry date": record.passportExpiry || official.passport_expiry_date,
    "phone no": record.phone || application.phone_no,
    "mobile number (sms purpose)": application.mobile_number_sms_purpose || record.phone,
    email: application.email,
    consultancy: application.consultancy,
    "consultancy> address": application.consultancy_address,
    "consultancy> phone no": application.consultancy_phone,
    "complete address": record.address || official.complete_address,
    "permanent address": usableText(account.account_holder_address) || record.address || official.complete_address || home.complete_address || "",
    "account holder permanent address": usableText(account.account_holder_address) || record.address || official.complete_address || home.complete_address || "",
    "temporary address": application.temporary_address,
    "japan entry date": application.japan_entry_date,
    "ward no": official.ward_no,
    palika: official.palika,
    "palika type": official.palika_type,
    district: official.district,
    province: official.province,
    intake: official.intake,
    bank: account.account_holder_name || account.bank || record.bank || income.bank,
    "bank> address": account.account_holder_address,
    "bank> interest rate": account.interest_rate,
    "account no": account.account_reference_no,
    "account reference no": account.account_reference_no,
    "opening amount": formatStatementAmount(money(account.opening_amount)),
    "opening balance": formatStatementAmount(openingBalance),
    "closing balance": formatStatementAmount(closingBalance),
    "bank balance": formatStatementAmount(closingBalance),
    "total credit": formatStatementAmount(totalCredit),
    "credit total": formatStatementAmount(totalCredit),
    "total debit": formatStatementAmount(totalDebit),
    "debit total": formatStatementAmount(totalDebit),
    "account holder name": account.account_holder_name || record.name || home.applicant,
    "account holder address": usableText(account.account_holder_address) || record.address || official.complete_address || home.complete_address || "",
    "account no": safeAccountReference,
    "account type": account.account_type || "Saving",
    "account open date": account.account_open_date || account.opening_date || "",
    "opening date": account.opening_date || "",
    "closing balance date": account.closing_balance_date || "",
    "statement print date": account.draft_print_date || account.exchange_date || "",
    "a/c from": account.opening_date || "",
    "a/c to": account.closing_balance_date || "",
    "tax rate": account.tax_rate || "",
    "interest rate": account.interest_rate || "",
    "income>sum: year3": rowsFrom(sections, "Income").reduce((sum, row) => sum + money(row.year3), 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    "form date": application.form_date || income.document_date || "",
    "document date": income.document_date || application.form_date || "",
    "name of signatory": income.name_of_signatory || "",
    "post of signatory": income.post_of_signatory || income.post_used_in_stamp || "",
    "post used in stamp": income.post_used_in_stamp || "",
    "name of ward chairman": income.name_of_ward_chairman || "",
    "ward chairman's contact no": income.ward_chairman_s_contact_no || "",
    "ward chairman’s contact no": income.ward_chairman_s_contact_no || "",
    "ward office phone no": income.ward_office_phone_no || "",
    "exchange rate": income.exchange_rate || "",
    "tax paid y1": income.tax_paid_y1 || "",
    "tax paid y2": income.tax_paid_y2 || "",
    "tax paid y3": income.tax_paid_y3 || "",
  };
  if (lower.includes("name> first-word")) return String(direct.name || "").split(/\s+/).filter(Boolean)[0] || "";
  if (lower.includes("name> last-word")) return String(direct.name || "").split(/\s+/).filter(Boolean).at(-1) || "";
  if (lower.includes("name> middle-word")) return String(direct.name || "").split(/\s+/).filter(Boolean).slice(1, -1).join(" ");
  if (lower.includes("gender> title")) return /^female$/i.test(asText(direct.gender)) ? "Ms." : "Mr.";
  if (lower.includes("gender> pos-ref")) return /^female$/i.test(asText(direct.gender)) ? "F" : "M";
  const dateMatch = clean.match(/^(dob|form date|document date|passport issued date|passport expiry date|japan entry date|opening date|closing balance date|statement print date|account open date|a\/c from|a\/c to)(?:>\s*([^}]+))?/i);
  if (dateMatch) {
    const dateKey = dateMatch[1].toLowerCase();
    const value = direct[dateKey] || "";
    const parts = parseDateParts(value);
    const part = dateMatch[2]?.trim().toLowerCase();
    if (!part) return asText(value);
    if (part === "day") return parts.day;
    if (part === "year") return parts.year;
    if (part === "daysuffix") return parts.day ? (Number(parts.day) % 10 === 1 ? "st" : Number(parts.day) % 10 === 2 ? "nd" : Number(parts.day) % 10 === 3 ? "rd" : "th") : "";
    if (part === "month") return parts.month;
    if (part === "mmmm") return parts.monthName;
    return formatDateValue(value, dateMatch[2].trim());
  }
  if (lower.includes("dob> duration-year")) return durationYears(direct.dob);
  if (/^(?:\$\*|\*)?sum:year[123](?:-tax paid y[123])?$/i.test(normalized)) {
    const year = normalized.match(/year([123])/i)?.[1] || "3";
    const tax = /tax paid/i.test(normalized);
    const field = tax ? `tax_paid_y${year}` : `year${year}`;
    return tax ? asText(income[field]) : rowsFrom(sections, "Income").reduce((sum, row) => sum + money(row[field]), 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (lower.startsWith("family>")) {
    const relationMatch = clean.match(/Family>\s*Relation\s*(\d+)\s*>\s*(.*)$/i);
    const sponsor = relationMatch ? rowsFrom(sections, "Family")[Math.max(0, Number(relationMatch[1]) - 1)] || {} : findSponsor(sections);
    const key = (relationMatch ? relationMatch[2] : clean.split(">").slice(-1)[0]).replace(/^\s*>\s*/, "").trim();
    const familyDate = key.match(/^dob>\s*(day|month|year|duration-year|yyyy\/mm\/dd)$/i);
    if (familyDate) {
      const dob = rowValue(sponsor, "dob");
      if (familyDate[1].toLowerCase() === "duration-year") return durationYears(dob);
      if (familyDate[1].toLowerCase() === "yyyy/mm/dd") return dob;
      const parts = parseDateParts(dob);
      return familyDate[1].toLowerCase() === "day" ? parts.day : familyDate[1].toLowerCase() === "year" ? parts.year : parts.month;
    }
    if (/^gender>\s*(title|pos-ref)$/i.test(key)) return /^female$/i.test(rowValue(sponsor, "gender")) ? (key.toLowerCase().includes("pos-ref") ? "F" : "Ms.") : (key.toLowerCase().includes("pos-ref") ? "M" : "Mr.");
    return rowValue(sponsor, key) || asText(sponsor[fieldKey(key)]) || "";
  }
  if (lower.startsWith("education>")) {
    const pieces = clean.split(">").map((item) => item.trim());
    const rows = rowsFrom(sections, "Education");
    const row = pieces.length > 2 ? findEducationRow(rows, pieces[1]) : rows.at(-1) || {};
    return rowValue(row, pieces.at(-1));
  }
  if (lower.startsWith("work experience>")) {
    const pieces = clean.split(">").map((item) => item.trim());
    const match = pieces.find((piece) => /^experience\d+$/i.test(piece));
    const index = match ? Math.max(0, Number(match.replace(/\D/g, "")) - 1) : 0;
    const rows = Array.isArray(application.work_experience_rows) ? application.work_experience_rows : [];
    return rowValue(rows[index] || {}, pieces.at(-1));
  }
  if (lower.startsWith("japanese course>") || lower.startsWith("japanese exam>")) {
    const rows = lower.startsWith("japanese exam>") ? (Array.isArray(application.japanese_exam_rows) ? application.japanese_exam_rows : []) : (Array.isArray(application.japanese_course_rows) ? application.japanese_course_rows : []);
    const match = clean.match(/(?:Course|Exam)\s*(\d+)/i);
    const index = match ? Math.max(0, Number(match[1]) - 1) : 0;
    return rowValue(rows[index] || {}, clean.split(">").at(-1));
  }
  if (raw.startsWith("~")) {
    const key = clean.replace(/^~+/, "");
    const educationKeys = new Set(["title", "institution", "started year", "started month", "ended year", "ended month", "address", "contact", "gpa/percent"]);
    const rows = educationKeys.has(key.toLowerCase()) ? rowsFrom(sections, "Education") : rowsFrom(sections, "Family");
    return rows.map((row) => rowValue(row, key)).filter(Boolean).join(", ");
  }
  const formattedField = clean.match(/^(.+?)>\s*(.+)$/);
  if (formattedField) {
    const baseKey = formattedField[1].trim().toLowerCase();
    const value = direct[baseKey];
    if (value !== undefined) return asText(value);
  }
  const directKey = Object.keys(direct).find((key) => key.toLowerCase() === lower || key.toLowerCase().replace(/\s*>\s*/g, ">").replace(/\s*:\s*/g, ":") === normalized);
  if (directKey) return asText(direct[directKey]);
  const key = fieldKey(clean);
  return asText(home[key] ?? official[key] ?? application[key] ?? income[key] ?? account[key] ?? "");
}

function replaceTextNodes(segment, resolve) {
  const nodePattern = /(<(?:w:t|t|v)\b[^>]*>)([\s\S]*?)(<\/(?:w:t|t|v)>)/g;
  let nodes = [];
  let match;
  while ((match = nodePattern.exec(segment))) nodes.push({ start: match.index, end: nodePattern.lastIndex, open: match[1], raw: match[2], close: match[3], text: xmlDecode(match[2]) });
  if (!nodes.length) return segment;
  for (let pass = 0; pass < 100; pass += 1) {
    const combined = nodes.map((node) => node.text).join("");
    const codeMatch = [...combined.matchAll(/\{[^{}]{1,220}\}/g)].find((candidate) => !isUuidLike(candidate[0].slice(1, -1)));
    if (!codeMatch) break;
    const from = codeMatch.index;
    const to = from + codeMatch[0].length;
    let cursor = 0;
    let startNode = -1;
    let endNode = -1;
    let startOffset = 0;
    let endOffset = 0;
    nodes.forEach((node, index) => {
      const next = cursor + node.text.length;
      if (startNode < 0 && from >= cursor && from <= next) { startNode = index; startOffset = from - cursor; }
      if (to >= cursor && to <= next && endNode < 0) { endNode = index; endOffset = to - cursor; }
      cursor = next;
    });
    if (startNode < 0 || endNode < 0) break;
    const replacement = asText(resolve(codeMatch[0].slice(1, -1)));
    if (startNode === endNode) nodes[startNode].text = nodes[startNode].text.slice(0, startOffset) + replacement + nodes[startNode].text.slice(endOffset);
    else {
      nodes[startNode].text = nodes[startNode].text.slice(0, startOffset) + replacement;
      nodes[endNode].text = nodes[endNode].text.slice(endOffset);
      for (let index = startNode + 1; index < endNode; index += 1) nodes[index].text = "";
    }
  }
  let output = segment;
  for (let index = nodes.length - 1; index >= 0; index -= 1) {
    const node = nodes[index];
    output = output.slice(0, node.start) + node.open + xmlEncode(node.text) + node.close + output.slice(node.end);
  }
  return output;
}

function replaceXml(xml, resolve) {
  let output = xml.replace(/(<w:p\b[^>]*>[\s\S]*?<\/w:p>)/g, (paragraph) => replaceTextNodes(paragraph, resolve));
  output = output.replace(/(<si\b[^>]*>[\s\S]*?<\/si>)/g, (sharedString) => replaceTextNodes(sharedString, resolve));
  output = output.replace(/(<c\b[^>]*>[\s\S]*?<\/c>)/g, (cell) => replaceTextNodes(cell, resolve));
  // Some Word exports keep a placeholder in a text node outside the normal
  // paragraph shape. A final text-node pass catches those without touching
  // the surrounding document structure or formatting.
  return replaceTextNodes(output, resolve);
}

function sharedStringValues(xml) {
  const values = [];
  for (const match of String(xml || "").matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
    const text = [...match[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((item) => xmlDecode(item[1])).join("");
    values.push(text);
  }
  return values;
}

function spreadsheetCellStyleMap(rowXml) {
  const styles = {};
  for (const match of String(rowXml || "").matchAll(/<c\b([^>]*)>/g)) {
    const ref = match[1].match(/\br="([A-Z]+)\d+"/i)?.[1];
    if (!ref) continue;
    styles[ref] = match[1].match(/\bs="(\d+)"/)?.[1] || "0";
  }
  return styles;
}

function spreadsheetInlineCell(column, rowNumber, value, style = "0") {
  const text = xmlEncode(value ?? "");
  return `<c r="${column}${rowNumber}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${text}</t></is></c>`;
}

function formatStatementAmount(value) {
  const amount = Number(value || 0);
  return amount ? amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "";
}

function statementDataRowXml(rowNumber, row, styleMap, rowAttributes, filename) {
  const layout = accountStyleLayout(filename);
  const values = Array.from({ length: layout.columns }, () => "");
  values[0] = formatDateValue(row.date || "", ACCOUNT_STYLE_DATE_FORMATS[accountStyleName(filename)]);
  if (layout.description >= 0) values[layout.description] = row.description || row.person || "";
  if (layout.cheque >= 0) values[layout.cheque] = row.reference || "";
  if (layout.debit >= 0) values[layout.debit] = formatStatementAmount(row.debit);
  if (layout.credit >= 0) values[layout.credit] = formatStatementAmount(row.credit);
  if (layout.balance >= 0) values[layout.balance] = formatStatementAmount(row.balance);
  const cells = values.map((value, index) => spreadsheetInlineCell(String.fromCharCode(65 + index), rowNumber, value, styleMap[String.fromCharCode(65 + index)] || styleMap.A || "0")).join("");
  return `<row ${rowAttributes} r="${rowNumber}">${cells}</row>`;
}

function injectSpreadsheetTransactionRows(xml, sections, filename) {
  const rows = rowsWithOpeningBalance(transactionRowsFrom(sections), sections);
  if (!rows.length || !/<worksheet\b/.test(xml)) return xml;
  const sharedXml = sections.__sharedStrings || "";
  const sharedValues = sharedStringValues(sharedXml);
  const rowMatches = [...xml.matchAll(/<row\b[^>]*>[\s\S]*?<\/row>/g)];
  const marker = rowMatches.find((match) => {
    const cells = [...match[0].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)];
    return cells.some((cell) => {
      const index = cell[2].match(/<v>(\d+)<\/v>/)?.[1];
      const inline = cell[2].match(/<t\b[^>]*>([\s\S]*?)<\/t>/)?.[1];
      const value = index !== undefined ? sharedValues[Number(index)] : xmlDecode(inline || "");
      return /^\[data\]$/i.test(String(value || "").trim());
    });
  });
  if (!marker) return xml;
  const markerRowNumber = Number(marker[0].match(/<row\b[^>]*\br="(\d+)"/)?.[1]);
  if (!markerRowNumber) return xml;
  const markerAttrs = marker[0].match(/<row\b([^>]*)>/)?.[1] || "";
  const previous = rowMatches[rowMatches.indexOf(marker) - 1]?.[0] || marker[0];
  const styleMap = { ...spreadsheetCellStyleMap(previous), ...spreadsheetCellStyleMap(marker[0]) };
  const extraRows = rows.length - 1;
  const replaceRows = (rowXml) => {
    const rowNumber = Number(rowXml.match(/<row\b[^>]*\br="(\d+)"/)?.[1]);
    if (!rowNumber) return rowXml;
    if (rowNumber === markerRowNumber) {
      return rows.map((row, index) => statementDataRowXml(markerRowNumber + index, row, styleMap, markerAttrs.replace(/\br="\d+"/, "").trim(), filename)).join("");
    }
    if (rowNumber < markerRowNumber || !extraRows) return rowXml;
    const shifted = rowNumber + extraRows;
    return rowXml
      .replace(/(<row\b[^>]*\br=")\d+(")/, `$1${shifted}$2`)
      .replace(/\br="([A-Z]+)\d+"/g, (_, column) => `r="${column}${shifted}"`);
  };
  let output = xml.replace(/<row\b[^>]*>[\s\S]*?<\/row>/g, replaceRows);
  output = output.replace(/(<dimension\b[^>]*\bref="[A-Z]+\d+:[A-Z]+)(\d+)(")/, (_, start, end, close) => `${start}${Number(end) + extraRows}${close}`);
  return output;
}

async function renderTemplate(body) {
  const filename = String(body.filename || "template.docx");
  const input = Buffer.from(String(body.contentBase64 || ""), "base64");
  const extension = path.extname(filename).toLowerCase();
  const record = body.record || {};
  const sections = body.sections || {};
  const styleName = accountStyleName(filename);
  const resolve = (code) => {
    // Sumarga's supplied workbook labels its account-number marker as
    // {Account Type}; preserve the visible label but fill it with the
    // account number, as the original Automation export does.
    if (styleName === "Sumarga PAN" && /^account type$/i.test(asText(code))) {
      const account = sections["Account Information"] || {};
      const references = String((sections["Reference Number Setup"] || {}).reference_notes || "").split(",").map((item) => item.trim()).filter(Boolean);
      const candidate = usableText(account.account_reference_no || account.account_no);
      return !candidate || references.includes(candidate) ? "056-02010" : candidate;
    }
    return resolveTemplateCode(code, record, sections);
  };
  let replaced = 0;
  if (extension === ".docx" || extension === ".xlsx") {
    const zip = await JSZip.loadAsync(input);
    let sharedStrings = "";
    if (extension === ".xlsx" && zip.file("xl/sharedStrings.xml")) sharedStrings = await zip.file("xl/sharedStrings.xml").async("string");
    const files = Object.values(zip.files).filter((file) => !file.dir && file.name.endsWith(".xml"));
    for (const file of files) {
      const xml = await file.async("string");
      const next = extension === ".xlsx"
        ? injectSpreadsheetTransactionRows(replaceXml(xml, resolve), Object.assign({}, sections, { __sharedStrings: sharedStrings }), filename)
        : replaceXml(xml, resolve);
      if (next !== xml) {
        replaced += (xml.match(/\{[^{}]{1,220}\}/g) || []).length - (next.match(/\{[^{}]{1,220}\}/g) || []).length;
        zip.file(file.name, next);
      }
    }
    if (extension === ".xlsx" && zip.file("xl/sharedStrings.xml")) {
      const currentSharedStrings = await zip.file("xl/sharedStrings.xml").async("string");
      const cleanedSharedStrings = currentSharedStrings.replace(/\[data\]/gi, "");
      if (cleanedSharedStrings !== currentSharedStrings) zip.file("xl/sharedStrings.xml", cleanedSharedStrings);
    }
    const out = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
    return { filename: filename.replace(/(\.[^.]+)$/, "-filled$1"), mime: MIME_TYPES[extension] || "application/octet-stream", contentBase64: out.toString("base64"), replaced };
  }
  const text = input.toString("utf8");
  const next = text.replace(/\{[^{}]{1,220}\}/g, (match) => {
    if (isUuidLike(match.slice(1, -1))) return match;
    replaced += 1;
    return resolve(match.slice(1, -1));
  });
  return { filename: filename.replace(/(\.[^.]+)$/, "-filled$1"), mime: MIME_TYPES[extension] || "text/plain; charset=utf-8", contentBase64: Buffer.from(next).toString("base64"), replaced };
}

function sendJson(response, status, payload) {
  const data = JSON.stringify(payload);
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(data);
}

function safeUploadName(filename) {
  const base = path.basename(String(filename || "template.docx"));
  return base.replace(/[^a-zA-Z0-9._()\-\u0080-\uFFFF ]/g, "_") || "template.docx";
}

function readUploadIndex() {
  try {
    const parsed = JSON.parse(fs.readFileSync(UPLOAD_INDEX, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUploadIndex(entries) {
  fs.writeFileSync(UPLOAD_INDEX, JSON.stringify(entries, null, 2));
}

async function readRequestBody(request) {
  let raw = "";
  for await (const chunk of request) raw += chunk;
  return raw;
}

function serveStatic(request, response) {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  const filePath = path.resolve(__dirname, relative);
  if (!filePath.startsWith(`${__dirname}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404); response.end("Not found"); return;
  }
  response.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  if (request.method === "GET" && pathname === "/api/uploaded-templates") {
    sendJson(response, 200, { ok: true, entries: readUploadIndex() });
    return;
  }
  if (request.method === "POST" && pathname === "/api/upload-template") {
    try {
      const body = JSON.parse(await readRequestBody(request));
      const filename = safeUploadName(body.filename);
      const content = Buffer.from(String(body.contentBase64 || ""), "base64");
      if (!content.length) throw new Error("Uploaded template is empty");
      fs.writeFileSync(path.join(UPLOAD_DIR, filename), content);
      const name = filename.replace(/\.(docx|xlsx|xls|csv|txt|html?)$/i, "");
      const format = /\.(xlsx?|csv)$/i.test(filename) ? "Excel" : "Word";
      const entry = { name, sourceName: name, filename, format, extension: path.extname(filename).slice(1).toLowerCase(), updated: new Date().toISOString().slice(0, 10), source: "Uploaded in clone Document templates", serverUrl: `/uploads/${encodeURIComponent(filename)}` };
      const entries = readUploadIndex().filter((item) => (item.sourceName || item.name) !== name);
      entries.push(entry);
      writeUploadIndex(entries);
      sendJson(response, 200, { ok: true, ...entry, bytes: content.length });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error?.message || "Template upload failed" });
    }
    return;
  }
  if (request.method === "POST" && new URL(request.url, `http://${request.headers.host}`).pathname === "/api/render-template") {
    try {
      const result = await renderTemplate(JSON.parse(await readRequestBody(request)));
      sendJson(response, 200, { ok: true, ...result });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error?.message || "Template rendering failed" });
    }
    return;
  }
  serveStatic(request, response);
});

server.listen(PORT, HOST, () => console.log(`Automation clone serving on ${HOST}:${PORT}`));
