const data = window.crmData;

const menu = [
  ["MAIN", [["Dashboard", "dashboard", "layout-dashboard", "⌂"]]],
  ["AI HUB", []],
  ["FRONTDESK", [["Dashboard", "frontdesk", "monitor", "▤"], ["Visitor Entry", "visitor-entry", "user-round-plus", "✎"], ["Visitor List", "visitor-list", "clipboard-list", "☷"]]],
  ["APPLICANT", [["Add New Applicant", "add-applicant", "user-round-plus", "＋"], ["Applicant List", "applicants", "users-round", "☰"], ["Class Bulk Attendance", "attendance", "calendar-check-2", "◷"]]],
  ["PAYMENT", [["Payment Dashboard", "payment-dashboard", "chart-no-axes-combined", "▣"], ["Payment List", "payment-list", "receipt-text", "≡"], ["Payment Followup", "payment-followup", "calendar-clock", "◈"]]],
  ["REPORTS", [["Account Statement (Draft)", "statement", "file-spreadsheet", "▥"], ["Follow-Up Report", "followup-report", "clipboard-clock", "↗"], ["Communication Summary", "communication", "messages-square", "✉"], ["SMS Report", "sms-report", "message-square-text", "✦"], ["Visualization", "visualization", "chart-column-increasing", "◉"], ["Document Log", "document-log", "file-clock", "▧"], ["CMB Report", "cmb-report", "chart-no-axes-column", "◫"], ["Document Process Report", "document-process-report", "file-check-2", "◌"], ["Quantum Students", "quantum-students", "orbit", "◇"], ["Special Japanese Students", "special-japanese-students", "graduation-cap", "✺"]]],
  ["MODULES", [["Bank", "bank", "landmark", "⌬"], ["Consultancy", "consultancy", "handshake", "♙"], ["Fiscal Year", "fiscal-year", "calendar-range", "⌁"], ["Intake", "intake", "calendar-days", "⧉"], ["School", "school", "school", "▰"], ["Document templates", "document-templates", "files", "▱"], ["Document Resources", "document-resources", "folder-open", "◍"], ["Data Import", "data-import", "database-zap", "⇪"], ["Settings", "settings", "settings-2", "⚙"], ["Trash", "trash", "trash-2", "⌫"], ["Excel File Validation Tool", "excel-validation", "file-check-2", "▦"], ["Excel to CSV Converter", "excel-csv", "file-spreadsheet", "⇄"], ["PDF to Word Converter", "pdf-word", "file-type-2", "⊞"], ["Download Rustdesk", "rustdesk", "monitor-down", "⇩"]]],
];

const appState = {
  applicantStatus: "",
  applicantColumnChooserOpen: false,
  applicantColumnSearch: "",
  accountColumnChooserOpen: "",
  accountColumnSearch: "",
  accountFileColumnChooserOpen: false,
  accountFileColumnSearch: "",
  accountOverflowOpen: false,
  accountTransactionPanel: "",
  accountTransactionPageSize: 10,
  accountCalendarField: "",
  accountCalendarMonth: "",
  accountCalendarSelected: "",
  incomeCalendarField: "",
  incomeCalendarMonth: "",
  incomeCalendarSelected: "",
  accountFamilyPickerOpen: false,
  familyAccountHolderSelectionMode: false,
  profileMoreCalendarOpen: false,
  profileMoreCalendarMonth: "",
  profileMoreCalendarSelected: "",
  applicantGridRowFilter: false,
  applicantGridWrapText: false,
  applicantAdvancedOpen: false,
  applicantDensity: "compact",
  applicantRowsPerPage: 25,
  applicantPage: 1,
  sidebarSearch: "",
  activeApplicant: null,
  commentsHidden: false,
  profileSidebarHidden: false,
  docPage: 1,
  profileMainTab: "Document Check",
  profilePinned: false,
  profileWindowOpen: false,
  darkMode: false,
  profileLeftWidth: 22,
  profileCommentsWidth: 22,
  profileSubTab: "File History",
  educationDateConverterInput: "2003-08-13",
  recentPage: 1,
  todoTab: "Overdue",
  applicantTodoColumnChooserOpen: false,
  applicantTodoColumnSearch: "",
  applicantTodoSearch: "",
  applicantTodoVisibleColumns: ["Applicant", "Progress", "Remaining", "Next task", "Owner", "Status"],
  applicantTaskWorkflow: { open: false, recordId: "", taskId: "" },
  documentChecklistSearch: "",
  documentChecklistCategory: "All",
  documentChecklistView: "master",
  documentChecklistExpanded: {},
  documentChecklistFullscreen: false,
  applicantFilters: {
    gender: "Gender",
    intake: "Select...",
    status: "Status",
    classBatch: "Select...",
    dataModule: "Applicant",
    pageSize: "250",
    branch: "",
    name: "",
    currentStatus: "",
    archived: false,
  },
  visitorGender: "Gender",
  templateUploadGroup: "Office Use",
  dataImportType: "Applicant List",
  dataImportDuplicate: "Skip existing records",
  settingsAssignee: "Amrit Sensei",
  settingsPageSize: "50",
  utilityProfile: "Default",
};

const storageKeys = {
  activeApplicant: "automationClone.activeApplicant",
  applicantVisibleColumns: "automationClone.applicantVisibleColumns",
  commentsHidden: "automationClone.commentsHidden",
  profileComments: "automationClone.profileComments",
  profileSidebarHidden: "automationClone.profileSidebarHidden",
  applicants: "automationClone.localApplicants",
  followups: "automationClone.localFollowups",
  modules: "automationClone.localModules",
  payments: "automationClone.localPayments",
  profileSections: "automationClone.profileSections",
  profileLogs: "automationClone.profileLogs",
  smsDrafts: "automationClone.localSmsDrafts",
  visitors: "automationClone.localVisitors",
  templates: "automationClone.localTemplates",
  theme: "automationClone.darkMode",
  profileLeftWidth: "automationClone.profileLeftWidth",
  profileCommentsWidth: "automationClone.profileCommentsWidth",
  applicantTodoVisibleColumns: "automationClone.applicantTodoVisibleColumns",
  documentChecklists: "automationClone.documentChecklists",
};

const localState = loadLocalState();
if (localState.activeApplicant?.name) {
  appState.activeApplicant = localState.activeApplicant;
}
appState.commentsHidden = localState.commentsHidden;
appState.profileSidebarHidden = localState.profileSidebarHidden;
appState.darkMode = localState.darkMode;
appState.profileLeftWidth = clampProfileWidth(localState.profileLeftWidth);
appState.profileCommentsWidth = clampProfileWidth(localState.profileCommentsWidth);
if (localState.visitors.length) {
  data.visitorRecords = [...localState.visitors, ...data.visitorRecords];
}
data.localApplicants = localState.applicants;
data.localFollowups = localState.followups;
data.localModules = localState.modules;
data.localPayments = localState.payments;
data.profileSections = localState.profileSections;
data.profileLogs = localState.profileLogs;
data.localSmsDrafts = localState.smsDrafts;
data.localTemplates = localState.templates;
data.applicantVisibleColumns = localState.applicantVisibleColumns;
data.documentChecklists = localState.documentChecklists;
appState.applicantTodoVisibleColumns = localState.applicantTodoVisibleColumns.length
  ? localState.applicantTodoVisibleColumns
  : [...appState.applicantTodoVisibleColumns];

const applicantDefaultColumns = [
  "#",
  "Applicant",
  "Avatar",
  "Application",
  "Official",
  "Income",
  "Created",
  "Phone No",
  "Complete Address",
  "Passport",
  "Bank and Annual Income Ratio",
  "Bank",
  "Passport No",
  "Passport Expiry Date",
];

const applicantOptionalColumns = ["Current Status", "Class/Batch", "Home"];

const statementRows = [
  ["Nirmala Shahi", "Mr. Khadka Bahadur Shahi", "01101648", "MSA", "8", "19 Jul, 2022", "1 Oct, 2023", "14 Months", "1293407.83", "23", "40", "2679945.4", "No"],
  ["Ranjita Magar", "Mr. Basanta Magar", "Kss-11453", "Kashmira PAN", "9", "11 Dec, 2024", "2 Feb, 2026", "13 Months", "1487006.63", "21", "37", "2486258.66", "No"],
  ["Bipana Rana", "Mr. Kumar Rana", "Kss-11557", "Kashmira PAN", "9", "5 Dec, 2024", "5 Feb, 2026", "14 Months", "1237067.69", "22", "39", "2454206.31", "No"],
  ["Mangal Bahadur Budha", "Mr. Birka Budha", "Kss-11464", "Kashmira PAN", "9", "13 Feb, 2025", "6 May, 2026", "14 Months", "1428903.62", "23", "38", "2504516.72", "No"],
  ["Sandeep Kumar Vishwakarma", "Mr. Shyam Sundar Vishwakarma", "1212abcd", "Lakuri PAN", "9", "13 Feb, 2025", "14 May, 2026", "15 Months", "1376119.08", "25", "40", "2531142.02", "No"],
  ["Hukum Bahadur Bam", "Mr. Prem Bam", "056-02219 NSA", "Trinetra PAN", "8", "14 May, 2025", "1 Sep, 2026", "15 Months", "1456541.51", "25", "40", "2616296.71", "No"],
  ["Shankar Mishra", "Mr. Prayag Raj Mishra", "-", "Trinetra PAN", "8", "18 Jun, 2025", "3 Sep, 2026", "14 Months", "1289000.00", "22", "36", "2335454.61", "No"],
  ["Ritik Karki", "Mr. Karki", "-", "Statement Template", "8", "2025", "2026", "15 Months", "0", "0", "0", "0", "No"],
];

const visualizationStats = [
  ["Total Records", "387", "blue"],
  ["Archived Records", "327", "orange"],
  ["Files", "155", "green"],
  ["Storage", "709.5 MB", "teal"],
  ["Tasks", "14", "indigo"],
  ["Archived - Data in Trash", "11", "red"],
];

const profileMainTabs = [
  "Document Check",
  "Detail",
  "Home",
  "Education",
  "Application",
  "Official",
  "Family",
  "Income",
  "Account Records",
  "Templating",
];

const profileSubTabs = [
  "Account Information",
  "Reference Number Setup",
  "Transaction Records",
  "File History",
];

const profileFormFields = {
  Home: [
    "Applicant*",
    "First Name*",
    "Middle Name",
    "Last Name*",
    "Gender*",
    "Name in Japanese",
    "First Name in Japanese",
    "Middle Name in Japanese",
    "Last Name in Japanese",
    "Name in Nepali",
    "First Name in Nepali",
    "Middle Name in Nepali",
    "Last Name in Nepali",
  ],
  Education: ["Pos Title"],
  "Document Check": [
    "Address in Citizenship",
    "Address in CC",
    "Father's Name in Citizenship",
    "Father's Name in CC",
    "Father's Address in Citizenship",
    "Father's DOB",
    "Mother's Name in Citizenship",
    "Mother's Name in CC",
    "Mother's Address in Citizenship",
    "Mother's DOB",
    "School Name in Trascript",
    "Address in Transcript",
    "School Name in Character Certificate",
    "School Address in CC",
    "School Name in Stamp CC",
    "Address in Stamp CC",
    "School Name in Logo CC",
    "School Address in Logo CC",
    "School Name in Letterpad",
    "Address in Letterpad",
    "School Name in Stamp of Letterpad",
    "School Address in Stamp of Letterpad",
    "School Name in Logo of Letterpad",
    "School Address in Logo of Letterpad",
  ],
  Application: [
    "Marital Status",
    "Spouse Name",
    "Spouse Dob",
    "Spouse Phone",
    "Spouse Occupation",
    "Birth Place",
    "Phone No",
    "Japan Entry Date",
    "Consultancy*",
    "School",
    "Form Date",
    "Mobile Number (SMS purpose)*",
    "Email",
    "Temporary Address",
    "Remarks",
    "Draft",
    "Proposed",
    "Review",
    "Approval",
    "Approved",
  ],
  Official: [
    "NID",
    "Palika",
    "Palika Type",
    "Ward No",
    "District",
    "Province",
    "New Address (Full)",
    "Complete Address",
    "Citizenship No",
    "DOB BS",
    "DOB",
    "NID No",
    "Intake",
    "Course",
    "Status",
    "Passport Issued Date",
    "Passport No",
    "Passport Expiry Date",
  ],
  Family: [
    "SNO (AUTO)*",
    "TYPE*",
    "NAME*",
    "GENDER*",
    "F-A RELATION*",
    "CONTACT",
    "OCCUPATION",
    "DOB*",
    "WORK NAME",
    "WORK ADDRESS",
    "WORK TEL NO",
    "CITIZENSHIP NO",
  ],
  Income: [
    "Year1",
    "Year2",
    "Year3",
    "Tax Paid Y1",
    "Tax Paid Y2",
    "Tax Paid Y3",
    "Document Date",
    "Exchange Date",
    "Exchange Rate",
    "Name of Ward Chairman",
    "Post Used in Stamp",
    "Ward Chairman's Contact No",
    "Ward Office Phone No",
    "Bank",
    "Bank and Annual Income Ratio",
  ],
  "Reference Number Setup": ["Reference Prefix", "Reference Start No", "Number of References", "Reference Notes"],
};

const profileGridSections = {
  Education: ["SNo", "Title", "Institution", "Started Year", "Started Month", "Ended Year", "Ended Month", "Address", "Contact", "GPA/Percent"],
  Family: ["SNO (AUTO)", "TYPE", "NAME", "GENDER", "F-A RELATION", "CONTACT", "OCCUPATION", "DOB", "WORK NAME", "WORK ADDRESS", "WORK TEL NO", "CITIZENSHIP NO"],
  Income: ["SNo", "Owner", "Income Head", "Income Detail", "Year1", "Year2", "Year3"],
  Classes: ["Class", "Batch", "Enroll Date", "Status"],
  Attachment: ["File name", "Position", "Category"],
  Payment: ["Invoice", "Payable", "Paid", "Due", "Remarks"],
  Templating: ["Template", "Type", "Exported On", "Action"],
  Communication: ["Date", "Mobile No", "Message", "Credit Count", "Scheduled"],
  Task: ["Task List", "Members", "Due date", "Status"],
  "Transaction Records": ["Date", "Particular", "Debit", "Credit", "Balance"],
};

const profileGridRequiredFields = {
  Education: ["SNo", "Title"],
  Family: ["SNO (AUTO)", "TYPE", "NAME", "GENDER", "F-A RELATION", "DOB"],
};

const accountOutputStyles = [
  { name: "Join PAN", dateFormat: "dd/MM/yyyy", accountType: "Normal Saving", interestRate: "8.50" },
  { name: "Kapri PAN", dateFormat: "dd/MM/yyyy", accountType: "General Saving", interestRate: "9" },
  { name: "Kashmira PAN", dateFormat: "dd/MM/yyyy", accountType: "Super Saving", interestRate: "9" },
  { name: "Lakuri PAN", dateFormat: "d/M/yyyy", accountType: "General Saving", interestRate: "9" },
  { name: "Lok Dharma PAN", dateFormat: "yyyy/MM/dd", accountType: "Current Savings", interestRate: "8" },
  { name: "Samanupatik PAN", dateFormat: "dd/MM/yyyy", accountType: "Normal Saving", interestRate: "9" },
  { name: "Santoshi Mata PAN", dateFormat: "dd/M/yyyy", accountType: "Normal Saving", interestRate: "9" },
  { name: "Sarba-pran PAN", dateFormat: "dd/MM/yyyy", accountType: "Special Saving", interestRate: "8" },
  { name: "Silver Star PAN", dateFormat: "dd-MMM-yyyy", accountType: "General Saving", interestRate: "8" },
  { name: "Sumarga PAN", dateFormat: "dd-MMM-yy", accountType: "Normal Saving", interestRate: "8" },
  { name: "Trinetra PAN", dateFormat: "d-MMM-yy", accountType: "Normal Saving", interestRate: "8" },
];

const accountTypeOptions = [
  "Select...",
  "Saving",
  "Current",
  "Fixed",
  "CMB",
  ...new Set(accountOutputStyles.map((style) => style.accountType).filter(Boolean)),
];

const accountInfoFields = [
  { label: "Output Document Style *", type: "select", options: ["Select...", ...accountOutputStyles.map((style) => style.name)] },
  { label: "Account Holder Name *", locked: true, autoImport: "Auto-imported from the selected Family account holder ($)" },
  { label: "Account Holder Address *", locked: true, autoImport: "Auto-imported from the selected Family account holder ($)" },
  { label: "Account Open Date", action: "account-select-field", actionLabel: "Select" },
  { label: "Account Reference No *" },
  { label: "Account Type", type: "select", options: accountTypeOptions, locked: true, autoImport: "Auto-imported from the selected Output Document Style" },
  { label: "Interest Rate *", locked: true, autoImport: "Auto-imported from the selected Output Document Style" },
  { label: "Tax Rate *" },
  { label: "Opening Date *", action: "account-select-field", actionLabel: "Select" },
  { label: "Opening Amount *", action: "calculate-opening-amount", actionLabel: "Calculate as per Annual Income" },
  { label: "Interest Calculation Days *", locked: true, autoImport: "Auto-calculated from Opening Date and the previous Nepali quarter-end interest posting" },
  { label: "Exchange Date *", action: "account-select-field", actionLabel: "Select" },
  { label: "Exchange Rate *", autoImport: "Auto-imported from NRB USD selling rate for the selected Exchange Date" },
  { label: "Draft Print Date", action: "account-select-field", actionLabel: "Select" },
  { label: "Closing Balance Date", action: "account-select-field", actionLabel: "Select" },
];

// The real date picker uses the Nepal holiday calendar while displaying Gregorian months.
// Keep the observed holiday dates local so transaction generation and date highlighting share one rule.
const nepalPublicHolidayDates = {
  "2025-08-29": "Krishna Janmashtami",
  "2025-09-07": "Gaura Parva",
  "2025-09-15": "Indra Jatra",
  "2025-09-20": "Constitution Day",
  "2025-10-02": "Ghatasthapana",
  "2025-10-03": "Fulpati",
  "2025-10-04": "Maha Astami",
  "2025-10-05": "Maha Navami",
  "2025-10-06": "Vijaya Dashami",
  "2025-10-07": "Dashain holiday",
  "2025-10-21": "Laxmi Puja",
  "2025-10-22": "Govardhan Puja",
  "2025-10-23": "Bhai Tika",
  "2025-10-28": "Chhath Parva",
  "2025-12-25": "Christmas Day",
  "2018-03-09": "Observed Nepal public holiday",
  "2018-03-12": "Observed Nepal public holiday",
  "2018-03-25": "Observed Nepal public holiday",
  "2018-03-29": "Observed Nepal public holiday",
  "2026-01-15": "Maghe Sankranti",
  "2026-02-15": "Maha Shivaratri",
  "2026-02-27": "Holi",
  "2026-03-02": "Holi (Terai)",
  "2026-04-14": "Nepali New Year",
  "2026-05-01": "Labour Day",
  "2026-05-27": "Buddha Jayanti",
  "2026-05-28": "Republic Day",
  // Dates visible in the captured September 2026 Automation picker.
  "2026-08-30": "Observed Nepal public holiday",
  "2026-09-08": "Teej",
  "2026-09-11": "Indra Jatra",
  "2026-09-14": "Constitution Day holiday",
  "2026-09-25": "Ghatasthapana",
  "2026-10-05": "Dashain holiday",
};

// Captured statement behavior: interest is posted at the end of every third
// Bikram Sambat month, then exported and displayed as an English/AD date.
// The map covers the BS years used by the captured workbook and clone demo.
const nepaliInterestQuarterEnds = [
  ["2079-06-31", "2022-10-17", "Asoj 31, 2079"],
  ["2079-09-30", "2023-01-14", "Poush 30, 2079"],
  ["2079-12-30", "2023-04-13", "Chaitra 30, 2079"],
  ["2079-03-32", "2022-07-16", "Asar 32, 2079"],
  ["2080-03-31", "2023-07-16", "Asar 31, 2080"],
  ["2080-06-30", "2023-10-17", "Asoj 30, 2080"],
  ["2080-09-29", "2024-01-14", "Poush 29, 2080"],
  ["2080-12-30", "2024-04-12", "Chaitra 30, 2080"],
  ["2081-03-31", "2024-07-15", "Asar 31, 2081"],
  ["2081-06-30", "2024-10-16", "Asoj 30, 2081"],
  ["2081-09-29", "2025-01-13", "Poush 29, 2081"],
  ["2081-12-31", "2025-04-13", "Chaitra 31, 2081"],
  ["2082-03-32", "2025-07-16", "Asar 32, 2082"],
  ["2082-06-31", "2025-10-17", "Asoj 31, 2082"],
  ["2082-09-30", "2026-01-14", "Poush 30, 2082"],
  ["2082-12-30", "2026-04-13", "Chaitra 30, 2082"],
  ["2083-03-32", "2026-07-16", "Asar 32, 2083"],
  ["2083-06-31", "2026-10-17", "Asoj 31, 2083"],
  ["2083-09-30", "2027-01-14", "Poush 30, 2083"],
  ["2083-12-30", "2027-04-13", "Chaitra 30, 2083"],
  ["2084-03-31", "2027-07-16", "Asar 31, 2084"],
  ["2084-06-30", "2027-10-17", "Asoj 30, 2084"],
  ["2084-09-29", "2028-01-14", "Poush 29, 2084"],
  ["2084-12-31", "2028-04-13", "Chaitra 31, 2084"],
  ["2085-03-31", "2028-07-15", "Asar 31, 2085"],
  ["2085-06-30", "2028-10-16", "Asoj 30, 2085"],
  ["2085-09-29", "2029-01-13", "Poush 29, 2085"],
  ["2085-12-31", "2029-04-13", "Chaitra 31, 2085"],
  ["2086-03-32", "2029-07-16", "Asar 32, 2086"],
  ["2086-06-31", "2029-10-17", "Asoj 31, 2086"],
  ["2086-09-30", "2030-01-14", "Poush 30, 2086"],
  ["2086-12-30", "2030-04-13", "Chaitra 30, 2086"],
].map(([bs, ad, label]) => ({ bs, ad, label }));

function currentNepaliFiscalYearStart(date = new Date()) {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const knownAsarEnds = nepaliInterestQuarterEnds
    .filter((entry) => /^Asar\s/i.test(entry.label))
    .map((entry) => ({ ...entry, adDate: parseAccountDate(entry.ad) }))
    .filter((entry) => entry.adDate)
    .sort((a, b) => a.adDate - b.adDate);
  const observed = knownAsarEnds.filter((entry) => entry.adDate <= target).at(-1);
  if (observed) return Number(String(observed.bs).split("-")[0]);
  const julyStart = new Date(target.getFullYear(), 6, 16);
  return target >= julyStart ? target.getFullYear() + 57 : target.getFullYear() + 56;
}

function fiscalYearAdLabelFromBsStart(startYear) {
  const bsYear = Number(startYear) || currentNepaliFiscalYearStart();
  const adYear = bsYear - 57;
  return `${adYear}/${adYear + 1}`;
}

function fiscalYearStartBsFromValue(value) {
  const startYear = Number(String(value || "").split("/")[0]);
  if (!Number.isFinite(startYear)) return NaN;
  return startYear >= 1900 ? startYear + 57 : startYear;
}

function normalizeFiscalYearValue(value) {
  const raw = String(value || "").trim();
  const startYear = fiscalYearStartBsFromValue(raw);
  return Number.isFinite(startYear) ? fiscalYearAdLabelFromBsStart(startYear) : raw;
}

function fiscalYearLabel(startYear) {
  return fiscalYearAdLabelFromBsStart(startYear);
}

function currentFiscalYearLabel() {
  return fiscalYearLabel(currentNepaliFiscalYearStart());
}

function fiscalYearOptions() {
  const current = currentNepaliFiscalYearStart();
  // Keep two prior years visible for reference while providing the requested
  // next twenty fiscal years from the live Nepali fiscal year onward.
  return Array.from({ length: 23 }, (_, index) => fiscalYearLabel(current - 2 + index));
}

function fiscalYearMarkers() {
  const current = currentNepaliFiscalYearStart();
  return { current: fiscalYearLabel(current), prior: fiscalYearLabel(current - 2) };
}

const accountTransactionHeaders = ["Calculate", "#", "Date", "#Days", "#Dr. Days", "Transaction By", "Debit", "Credit"];
const accountFileHistoryHeaders = ["Template", "File", "Exported On", "Export Mode"];
const accountTransactionPeople = ["Sarita", "Alok", "Deepika", "Srijana", "Arvind", "Sumi", "Anita", "Kamala", "Sajjan", "Sagar", "Pratik", "Self", "Sushmita"];
const twoA4PageTransactionRows = 60;
const twoA4PageEntriesPerSide = twoA4PageTransactionRows / 2;
const defaultSampleDebitFigures = [48000, 31500, 33000, 21100, 25800, 36900, 45000, 31100, 47500, 42500, 25800, 47500, 36900, 40000, 27800, 25800, 25800, 36000, 31500, 63200, 29000];
const defaultSampleCreditFigures = [26000, 47000, 42400, 42400, 32000, 52500, 21450, 42400, 35000, 25800, 29000, 36000, 31500, 26900, 28500, 31500, 40000, 28500, 29000, 27900, 45000, 33000, 27900, 52500, 20000, 49000, 38000, 45800, 30000, 40000, 31300, 47000, 42500, 30000];
const accountOverflowMenuItems = [
  ["delete-account-transactions", "trash-2", "Delete", ""],
  ["assign-reference-numbers", "list-ordered", "Assign Reference No.", ""],
  ["validate-transaction-duration", "clock-3", "Validate Duration", ""],
  ["open-import-transactions", "upload", "Import from CSV", ""],
  ["export-account-transactions", "download", "Export Records (CSV)", ""],
  ["open-sample-records", "layers-3", "Generate Sample Records", ""],
  ["open-prior-period-preview", "undo-2", "Prior Period Transaction Records (Preview)", "NEW"],
  ["open-transaction-analysis", "chart-no-axes-combined", "Transaction Analysis", ""],
  ["open-edit-transaction-person", "pencil-line", "Edit Transaction Person", ""],
  ["reset-transaction-layout", "rotate-ccw", "Reset Layout", ""],
];

const defaultAccountTransactions = [
  ["", "1", "21 Aug, 2025, Thu", "1", "", "Sarita", "42,500.00", ""],
  ["", "2", "2 Sep, 2025, Tue", "12", "", "Alok", "29,000.00", ""],
  ["", "3", "4 Sep, 2025, Thu", "2", "14", "Deepika", "19,000.00", ""],
  ["", "4", "14 Sep, 2025, Sun", "10", "", "Alok", "31,000.00", ""],
  ["", "5", "25 Sep, 2025, Thu", "11", "", "Srijana", "63,200.00", ""],
  ["", "6", "28 Sep, 2025, Sun", "3", "24", "Arvind", "21,100.00", ""],
  ["", "7", "7 Oct, 2025, Tue", "9", "", "Arvind", "49,000.00", ""],
  ["", "8", "14 Oct, 2025, Tue", "7", "16", "Sumi", "22,000.00", ""],
  ["", "9", "19 Oct, 2025, Sun", "5", "", "Anita", "52,000.00", ""],
  ["", "10", "2 Nov, 2025, Sun", "14", "", "Kamala", "31,800.00", ""],
  ["", "11", "6 Nov, 2025, Thu", "4", "23", "Sajjan", "30,800.00", ""],
  ["", "12", "9 Nov, 2025, Sun", "3", "", "Sagar", "42,000.00", ""],
  ["", "13", "19 Nov, 2025, Wed", "10", "", "Pratik", "29,000.00", ""],
  ["", "14", "24 Nov, 2025, Mon", "5", "18", "Sumi", "14,000.00", ""],
  ["", "15", "5 Dec, 2025, Fri", "11", "", "Self", "36,000.00", ""],
  ["", "16", "12 Dec, 2025, Fri", "7", "18", "Sushmita", "16,000.00", ""],
].map((row) => Object.fromEntries(accountTransactionHeaders.map((header, index) => [fieldKey(header), row[index]])));

const profileSelectOptions = {
  title: ["Elementary School", "Jr. High School", "High School", "Last", "NA"],
  gender: ["Select...", "Male", "Female", "Other"],
  marital_status: ["Select...", "Single", "Married", "Divorced"],
  palika_type: ["Select...", "Municipality", "Rural Municipality", "Metropolitan", "Sub Metropolitan"],
  status: ["Select...", "Inquiry", "Counseled", "Class Enrollment", "Application In Process", "Offer Received", "Visa Applied", "Visa Granted", "Visa Rejected"],
  type: ["Select...", "Sponsor", "Father", "Mother", "Brother", "Sister", "Husband", "Wife", "Other"],
  f_a_relation: ["Select...", "Daughter", "Son", "Brother", "Sister", "Spouse", "Other"],
  year1: ["Select...", ...fiscalYearOptions()],
  year2: ["Select...", ...fiscalYearOptions()],
  year3: ["Select...", ...fiscalYearOptions()],
  bank: ["Select...", "Trinetra PAN", "Kashmira PAN", "Lakuri PAN", "Trinetra Multipurpose Co-operative Ltd."],
  category: ["Select...", "Office Use", "Applicant", "Education", "Income", "Family", "Passport"],
};

const educationDateSelectOptions = {
  started_year: Array.from({ length: 201 }, (_, index) => String(1900 + index)),
  ended_year: Array.from({ length: 201 }, (_, index) => String(1900 + index)),
  started_month: Array.from({ length: 12 }, (_, index) => String(index + 1)),
  ended_month: Array.from({ length: 12 }, (_, index) => String(index + 1)),
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="brand">
      <div class="brand-mark">A</div>
      <div class="brand-copy">
        <div class="brand-title">${escapeHtml(data.project.name)}</div>
        <small class="brand-subtitle">Automation</small>
      </div>
    </div>
    <div class="side-search">
      <span class="side-search-icon" aria-hidden="true"><i data-lucide="search">⌕</i></span>
      <input type="search" value="${escapeHtml(appState.sidebarSearch)}" placeholder="Search menu..." aria-label="Search menu" autocomplete="off" />
      <button class="side-search-clear" type="button" data-action="clear-sidebar-search" title="Clear menu search" aria-label="Clear menu search"${appState.sidebarSearch ? "" : " hidden"}><i data-lucide="x" aria-hidden="true">×</i></button>
    </div>
    <div class="sms-card">
      <div class="sms-card-head">
        <div class="sms-card-label"><span>BULK SMS</span><small>SMS credit balance</small></div>
        <span class="sms-card-icon" aria-hidden="true"><i data-lucide="message-square-text">✦</i></span>
      </div>
      <strong>${data.project.smsCredit}</strong>
      <div class="sms-card-footer"><small>Available credits</small><button data-action="new-sms"><i data-lucide="send" aria-hidden="true">➤</i>New SMS</button></div>
    </div>
    ${menu.map(([section, links]) => `
      <div class="nav-section">${section}</div>
      ${links.map(([label, route, icon, fallback]) => `<a class="nav-link" href="#${route}" data-route="${route}"><span class="nav-icon"><i data-lucide="${icon}" aria-hidden="true">${fallback}</i></span>${label}</a>`).join("")}
    `).join("")}
  `;
  if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
}

function searchableSources() {
  return [
    ["Visitors", "visitor-list", data.visitorRecords, ["Visitor Name", "Date", "Gender", "Mobile No", "Email", "Address", "Course", "Branch", "Action"]],
    ["Applicants", "applicants", window.automationExtraData?.inquiryApplicants || [], window.automationExtraData?.inquiryApplicantHeaders || []],
    ["SMS", "sms-report", window.automationExtraData?.fullSmsReports || data.smsReports, window.automationExtraData?.fullSmsReportHeaders || []],
    ["Documents", "document-log", window.fullDocumentLogs || data.documentLogs, ["Template", "File", "Exported By", "Exported For", "Exported On", "Mode", "Size"]],
    ["Banks", "bank", data.banks, ["Bank", "Address", "Phone", "Manager", "Rate", "Uses"]],
    ["Schools", "school", window.automationExtraData?.fullSchools || data.schools, window.automationExtraData?.fullSchoolHeaders || []],
  ];
}

function table(headers, rows, options = {}) {
  const filter = options.filter?.toLowerCase() || "";
  const fullRows = options.fullRows || rows;
  const filtered = rows
    .map((row, index) => ({ row, fullRow: fullRows[index] || row }))
    .filter(({ row, fullRow }) => `${row.join(" ")} ${fullRow.join(" ")}`.toLowerCase().includes(filter));
  const dataHeaders = options.fullHeaders || headers;
  const rowAction = options.rowAction ? ` data-action="${escapeHtml(options.rowAction)}"` : "";
  return `
    <table class="data-table">
      <thead><tr>${headers.map((head, index) => `<th><button class="sort-button" data-action="sort-table" data-index="${index}">${escapeHtml(head)}</button></th>`).join("")}</tr></thead>
      <tbody>
        ${filtered.length ? filtered.map(({ row, fullRow }) => `
          <tr class="data-row"${rowAction} data-headers="${encodeURIComponent(JSON.stringify(dataHeaders))}" data-row="${encodeURIComponent(JSON.stringify(fullRow))}">${row.map((cell, index) => `<td>${renderCell(cell, index === row.length - 1)}</td>`).join("")}</tr>
        `).join("") : `<tr><td colspan="${headers.length}" class="empty">No data</td></tr>`}
      </tbody>
    </table>
  `;
}

function applicantTable(headers, rows, options = {}) {
  const fullRows = options.fullRows || rows;
  const dataHeaders = options.fullHeaders || headers;
  const rowAction = options.rowAction ? ` data-action="${escapeHtml(options.rowAction)}"` : "";
  const selectable = options.selectable === true;
  const identityHeaders = options.identityHeaders || ["#", "Applicant", "Avatar"];
  return `
    <table class="data-table applicant-data-table">
      <thead><tr>${selectable ? `<th class="applicant-selection-cell"><input type="checkbox" class="applicant-select-all" data-action="applicant-select-all" aria-label="Select all visible applicants" /></th>` : ""}${headers.map((head, index) => `<th><button class="sort-button" data-action="sort-table" data-index="${selectable ? index + 1 : index}">${escapeHtml(head)}</button></th>`).join("")}</tr></thead>
      <tbody>
        ${rows.length ? rows.map((row, rowIndex) => `
          <tr class="data-row"${rowAction} data-headers="${encodeURIComponent(JSON.stringify(dataHeaders))}" data-row="${encodeURIComponent(JSON.stringify(fullRows[rowIndex] || row))}">${selectable ? `<td class="applicant-selection-cell"><input type="checkbox" class="applicant-table-select" data-action="applicant-select-row" aria-label="Select applicant row ${rowIndex + 1}" /></td>` : ""}${row.map((cell, index) => `<td>${applicantCell(cell, headers[index], index === row.length - 1, { fullRow: fullRows[rowIndex] || row, dataHeaders, identityHeaders })}</td>`).join("")}</tr>
        `).join("") : `<tr><td colspan="${headers.length + (selectable ? 1 : 0)}" class="empty">No data</td></tr>`}
      </tbody>
    </table>
  `;
}

function applicantCell(cell, header, isLastCell, context = {}) {
  if (header === "Avatar") {
    const initials = String(cell || "-").trim().slice(0, 3).toUpperCase();
    return `<span class="applicant-avatar-badge" aria-label="Avatar ${escapeHtml(initials)}">${escapeHtml(initials)}</span>`;
  }
  if (header === "Applicant") {
    const fullRow = context.fullRow || [];
    const dataHeaders = context.dataHeaders || [];
    const identityHeaders = context.identityHeaders || ["#", "Applicant", "Avatar"];
    const name = fullRow[dataHeaders.indexOf("Applicant")] ?? cell ?? "Applicant";
    const initials = String(fullRow[dataHeaders.indexOf("Avatar")] || name || "-").trim().slice(0, 3).toUpperCase();
    const id = fullRow[dataHeaders.indexOf("#")] ?? "-";
    const avatar = identityHeaders.includes("Avatar") ? `<span class="applicant-avatar-badge" aria-hidden="true">${escapeHtml(initials)}</span>` : "";
    const identifier = identityHeaders.includes("#") ? `<small>ID: ${escapeHtml(id || "-")}</small>` : "";
    return `<div class="applicant-identity">${avatar}<span class="applicant-identity-copy"><span class="applicant-name-link">${escapeHtml(name || "Applicant")}</span>${identifier}</span></div>`;
  }
  const value = String(cell ?? "");
  const normalizedValue = value.trim().toLowerCase();
  const isEmptyEntry = !normalizedValue || ["-", "undefined", "null", "not submitted", "not entered"].includes(normalizedValue);
  if (isEmptyEntry) return `<span class="applicant-empty-badge" title="No data entered">Not Entered</span>`;
  const rendered = renderCell(cell, isLastCell);
  if (rendered !== escapeHtml(value) || !value) return rendered;
  const shouldTruncate = value.length > 28 || /address|official|income|passport/i.test(header);
  return shouldTruncate ? `<span class="applicant-cell-truncate" title="${escapeHtml(value)}">${escapeHtml(value)}</span>` : rendered;
}

function renderCell(cell, isLastCell) {
  const value = String(cell ?? "");
  if (isLastCell && ["Open", "Active"].includes(value)) {
    return `<span class="status">${escapeHtml(value)}</span>`;
  }
  if (isLastCell && value === "Convert to Applicant") {
    return `<button class="action-link" data-action="convert-visitor">Convert to Applicant</button>`;
  }
  if (isLastCell && value === "Take Attendance") {
    return `<button class="action-link" data-action="attendance">Take Attendance</button>`;
  }
  if (value === "Download | Preview" || value.replace(/\s/g, "") === "Download|Preview") {
    return `<button class="action-link" data-action="preview-document">Preview</button> <button class="action-link" data-action="download-document">Download</button>`;
  }
  return escapeHtml(value);
}

function panel(title, content, count) {
  return `
    <section class="panel">
      <div class="panel-title">
        <h2>${escapeHtml(title)}</h2>
        ${count === undefined ? "" : `<small>Data grid with ${count} rows</small>`}
      </div>
      ${content}
    </section>
  `;
}

function pageHead(title, subtitle, action = "") {
  return `
    <div class="page-head">
      <div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
      ${action}
    </div>
  `;
}

function renderDashboard() {
  const pageSize = 5;
  const recentPages = Math.max(1, Math.ceil(26 / pageSize));
  const visibleRecent = data.recentApplicants.slice((appState.recentPage - 1) * pageSize, appState.recentPage * pageSize);
  const followupRows = data.localFollowups.map((item) => [item.name, item.type, item.remarks, item.status]);
  const todoRows = {
    Overdue: [...followupRows, ["Follow up pending applicants", "Follow-up", "5 overdue items", "Open"]],
    "No Due Date": [["Assign due dates", "Task", "9 records without due date", "Open"]],
    Today: [],
    Tomorrow: [],
    "In Future (7 Days)": [],
  };
  return `
    ${pageHead("Dashboard", "Lifecycle overview, recent activity, followups and working data.")}
    <div class="metrics-grid">
      ${data.lifecycle.map(([label, count, color]) => `<button class="metric ${color}" data-action="lifecycle-filter" data-lifecycle="${escapeHtml(label)}"><span>${escapeHtml(label)}</span><strong>${count}</strong></button>`).join("")}
    </div>
    ${renderApplicantTodoDashboard()}
    <div class="layout-grid">
      <div>
        ${panel("Pinned data", `<div class="table-tools"><input placeholder="Filter..." /></div><div class="empty">No data</div>`, 0)}
        ${panel("Recently viewed data", `${table(["Applicant", "Project", "Viewed"], visibleRecent)}<div class="pager">${Array.from({ length: recentPages }, (_, index) => `<button class="page-btn ${appState.recentPage === index + 1 ? "active" : ""}" data-action="recent-page" data-page="${index + 1}">${index + 1}</button>`).join("")}</div>`, 26)}
        ${panel("Followup list", followupRows.length ? table(["Name", "Type", "Remarks", "Status"], followupRows) : `<div class="empty">No local followups yet</div>`, followupRows.length)}
      </div>
      <div>
        ${panel("Todo list", `<div class="tabs">${data.todos.map(([label, count]) => `<button class="tab-button ${appState.todoTab === label ? "active" : ""}" data-action="todo-tab" data-label="${escapeHtml(label)}"><span>${escapeHtml(label)}</span><strong>${count}</strong></button>`).join("")}</div>${table(["Name", "Type", "Remarks", "Status"], todoRows[appState.todoTab] || [])}`)}
        ${panel("Working data", `<div class="empty">No data</div>`, 0)}
      </div>
    </div>
  `;
}

function renderAttendance() {
  return `
    ${pageHead("Class Attendance", "Bulk attendance screen with observed class schedules.", `<button class="primary-btn" data-action="refresh-page">Refresh</button>`)}
    ${panel("Class Attendance", table(["Time", "Batch Code", "Course", "Total Students", "Teachers", "Action"], data.attendance.map((row) => [...row, "Take Attendance"])), data.attendance.length)}
  `;
}

function renderPaymentDashboard() {
  const extra = window.automationExtraData;
  const paymentRows = data.localPayments.map((item) => [item.name, item.amount, item.paid, item.due, item.dueDate, "Local", item.status]);
  const outstandingRows = [...paymentRows, ...(extra?.paymentOutstanding || data.outstandingDues)];
  const outstandingHeaders = extra?.paymentOutstandingHeaders || ["Applicant", "Net Bill", "Paid", "Due Amount", "Due Date", "Days Overdue", "Status"];
  return `
    ${pageHead("Payment Dashboard", "Billed, collected, outstanding and aging summaries.")}
    <section class="panel">
      <div class="table-tools">
        <input placeholder="Branch... (All)" />
        <input placeholder="Period" />
        <input placeholder="Pay Head... (All)" />
        <button class="primary-btn" data-action="search">Search</button>
        <button class="ghost-btn" data-action="refresh-page">Refresh</button>
      </div>
    </section>
    <div class="metrics-grid">
      <div class="metric blue"><span>Total Billed</span><strong>0.00</strong></div>
      <div class="metric green"><span>Total Collected</span><strong>0.00</strong></div>
      <div class="metric orange"><span>Outstanding</span><strong>817,000.00</strong></div>
      <div class="metric red"><span>Cancelled Bad Debt</span><strong>0.00</strong></div>
    </div>
    <div class="layout-grid">
      <div>
        ${panel("Fees Paid (by Date)", `<div class="empty">No payment rows observed for the selected period.</div>`)}
        ${panel("Net Billed: Collected vs Outstanding", `<div class="chart-bars">
          <div class="bar-row"><span>Total Billed</span><div><i style="width:0%"></i></div><strong>0</strong></div>
          <div class="bar-row"><span>Total Collected</span><div><i style="width:0%"></i></div><strong>0</strong></div>
          <div class="bar-row"><span>Outstanding</span><div><i style="width:100%"></i></div><strong>817k</strong></div>
        </div>`)}
      </div>
      <div>
        ${panel("Aging Buckets", `<div class="mini-list">
          ${["0-30 (0)", "31-60 (0)", "61-90 (0)", "90+ (0)", "Undefined (59)"].map((item, index) => `<div class="mini-card"><span>${item}</span><strong>${index === 4 ? "817,000.00" : "0.00"}</strong></div>`).join("")}
        </div>`)}
        ${panel("Exceptions", `<div class="empty">No exceptions</div>`)}
      </div>
    </div>
    ${panel("Outstanding Dues", table(outstandingHeaders, outstandingRows), outstandingRows.length)}
    ${panel("Recent Invoices", data.localPayments.length ? table(["Applicant", "Invoice", "Amount", "Status"], data.localPayments.map((item) => [item.name, item.invoice, item.amount, item.status])) : table(["Applicant", "Invoice", "Amount", "Status"], []), data.localPayments.length)}
  `;
}

function renderPaymentList(title, headers) {
  const rows = title === "Payment Followup"
    ? data.localPayments.map((item) => [item.name, item.amount, item.paid, item.due, item.dueDate, item.remarks])
    : data.localPayments.map((item) => [item.created, item.name, item.particulars, item.invoice, item.paid]);
  return `
    ${pageHead(title, "Automation-style grouped data grid.", `<button class="primary-btn" data-action="refresh-page">Refresh</button>`)}
    ${panel(title, `<div class="table-tools"><span>Drag a column header here to group by that column</span><button class="ghost-btn" data-action="group-grid">Group view</button></div>${table(headers, rows)}`, rows.length)}
  `;
}

function renderSmsReport() {
  const extra = window.automationExtraData;
  const headers = extra?.fullSmsReportHeaders || ["SMS To", "Numbers", "Message", "Count", "Date"];
  const localRows = data.localSmsDrafts.map((draft) => [draft.recipient, "Local", draft.numbers, draft.message, draft.count, draft.scheduled, draft.created, "Draft"]);
  const rows = [...localRows, ...(extra?.fullSmsReports || data.smsReports)];
  return `
    ${pageHead("SMS Report", "Observed SMS history with recipients, message body, count and age.", `<button class="primary-btn" data-action="new-sms">New SMS</button>`)}
    ${panel("SMS Report", `<div class="table-tools"><input class="filter-input" placeholder="Search keyword..." /><select class="page-size-select"><option>10</option><option>25</option><option selected>50</option><option>100</option></select><button class="primary-btn" data-action="search">Search</button><button class="ghost-btn" data-action="advanced-filter">Advanced filter</button></div>${table(headers, rows)}`, rows.length)}
  `;
}

function renderDocumentLog() {
  const logs = window.fullDocumentLogs || data.documentLogs;
  const meta = window.fullDocumentLogMeta || { totalCaptured: data.documentLogs.length, totalObserved: data.documentLogs.length, sizeObserved: "unknown" };
  const pageSize = 100;
  const pageCount = Math.max(1, Math.ceil(logs.length / pageSize));
  appState.docPage = Math.min(appState.docPage, pageCount);
  const pageRows = logs.slice((appState.docPage - 1) * pageSize, appState.docPage * pageSize);
  return `
    ${pageHead("Document Export Log", "Template exports, preview/download actions, users and file sizes.")}
    ${panel("Document Export Log", `<div class="table-tools"><input class="filter-input" placeholder="Filter..." /><select class="page-size-select"><option>25</option><option>50</option><option selected>100</option></select><button class="primary-btn" data-action="search">Search</button><button class="ghost-btn" data-action="advanced-filter">Advanced filter</button><span>Captured ${meta.totalCaptured} / observed ${meta.totalObserved}. ${escapeHtml(meta.sizeObserved)}</span></div>${table(["Template", "File", "Exported By", "Exported For", "Exported On", "Mode", "Size"], pageRows)}<div class="pager">${Array.from({ length: pageCount }, (_, index) => `<button class="page-btn ${appState.docPage === index + 1 ? "active" : ""}" data-action="doc-page" data-page="${index + 1}">${index + 1}</button>`).join("")}</div>`, meta.totalObserved)}
  `;
}

function renderModule(title, rows, headers) {
  const localRows = data.localModules[title] || [];
  const visibleRows = [...localRows, ...rows];
  return `
    ${pageHead(title, `Master data module for ${title}.`, `<button class="primary-btn" data-action="add-module" data-label="${escapeHtml(title)}">Add new ${escapeHtml(title)}</button>`)}
    ${panel(title, table(headers, visibleRows), visibleRows.length)}
  `;
}

function renderApplicants() {
  const statusLabel = appState.applicantStatus ? `Filtered by ${appState.applicantStatus}` : "Observed applicant list shell";
  const extra = window.automationExtraData;
  const capturedHeaders = extra?.inquiryApplicantHeaders || ["#", "Applicant", "Application", "Official", "Income", "Created", "Phone No", "Complete Address", "Passport", "Bank", "Passport No", "Passport Expiry Date"];
  const headers = applicantAllColumns(capturedHeaders);
  const visibleHeaders = applicantVisibleHeaders(headers);
  const localRows = data.localApplicants.map((applicant, index) => applicantListRow(applicant, index, headers));
  const captured = extra?.inquiryApplicants || [];
  const fixedApplicantRows = capturedApplicantNames(captured);
  const detailRows = fixedApplicantRows.length ? captured.slice(0, captured.length - fixedApplicantRows.length) : captured;
  const sourceRows = detailRows.map((row, index) => capturedApplicantRow(row, fixedApplicantRows[index], index, headers));
  const fallbackRows = !captured.length ? data.recentApplicants.map((row, index) => [
    index + 1, row[0], "", appState.applicantStatus || "Inquiry", row[1], "-", row[2], "-", "-", "-", "-", "-", "-", "-",
  ]) : [];
  const rows = [...localRows, ...(sourceRows.length ? sourceRows : fallbackRows)]
    .filter((row) => applicantRowMatchesFilters(row, headers, appState.applicantFilters));
  const filters = appState.applicantFilters;
  const requestLimit = Number(filters.pageSize) || rows.length;
  const fetchedRows = rows.slice(0, requestLimit);
  const displayHeaders = applicantDisplayHeaders(visibleHeaders);
  const rowsPerPage = Number(appState.applicantRowsPerPage) || 25;
  const pageCount = Math.max(1, Math.ceil(fetchedRows.length / rowsPerPage));
  const currentPage = Math.min(Math.max(1, Number(appState.applicantPage) || 1), pageCount);
  appState.applicantPage = currentPage;
  const pageRows = fetchedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const pageStart = fetchedRows.length ? (currentPage - 1) * rowsPerPage + 1 : 0;
  const pageEnd = Math.min(currentPage * rowsPerPage, fetchedRows.length);
  return `
    ${pageHead("Applicant List", "Filter-heavy applicant grid matching the Automation list structure.")}
    <section class="panel applicant-grid-panel density-${appState.applicantDensity === "comfortable" ? "comfortable" : "compact"}">
      <div class="panel-title"><h2>Applicant List</h2><small>${escapeHtml(statusLabel)} · captured ${sourceRows.length} · local ${localRows.length} · Total Fetch: 32</small></div>
      <div class="applicant-filter-row">
        <div class="applicant-filter-primary applicant-filter-core">
          <label class="applicant-main-search"><span>Applicant search</span><input class="applicant-filter-input" data-filter-key="name" placeholder="Search applicant name..." aria-label="Applicant name search" value="${escapeHtml(filters.name)}" /></label>
          <label><span>Gender</span><select class="applicant-filter-select" data-filter-key="gender" aria-label="Gender">${selectOptions(["Gender", "Male", "Female"], filters.gender)}</select></label>
          <label><span>Intake</span><select class="applicant-filter-select" data-filter-key="intake" aria-label="Intake">${selectOptions(["Select...", "April 2027", "July 2027", "October 2027"], filters.intake)}</select></label>
          <label><span>Status</span><select class="applicant-filter-select" data-filter-key="status" aria-label="Status">${selectOptions(["Status", "Inquiry", "Applied", "Accepted", "Archived"], filters.status)}</select></label>
          <label><span>Data Module</span><select class="applicant-filter-select" data-filter-key="dataModule" aria-label="Data Module">${selectOptions(["Applicant"], filters.dataModule)}</select></label>
        </div>
        <div class="applicant-filter-actions">
          <button class="primary-btn" data-action="search">Search</button>
          <button class="ghost-btn" data-action="reset-applicant-filters">Reset</button>
          <button class="ghost-btn applicant-advanced-toggle" data-action="toggle-applicant-advanced-filters" aria-expanded="${appState.applicantAdvancedOpen ? "true" : "false"}">${appState.applicantAdvancedOpen ? "Hide advanced filters" : "Advanced filters"}</button>
        </div>
      </div>
      ${appState.applicantAdvancedOpen ? `<div class="applicant-advanced-panel">
        <div class="applicant-advanced-heading"><strong>Advanced filters</strong><span>Additional search criteria</span></div>
        <div class="applicant-filter-secondary">
          <label><span>Class/Batch</span><select class="applicant-filter-select" data-filter-key="classBatch" aria-label="Class/Batch">${selectOptions(["Select...", "April 2027", "July 2027", "October 2027"], filters.classBatch)}</select></label>
          <label><span>Branch</span><input class="applicant-filter-input" data-filter-key="branch" placeholder="Branch... (All)" aria-label="Branch" value="${escapeHtml(filters.branch)}" /></label>
          <label><span>Current Status</span><input class="applicant-filter-input" data-filter-key="currentStatus" placeholder="Current Status... (All)" aria-label="Current status" value="${escapeHtml(filters.currentStatus)}" /></label>
          <label><span>Records per Request</span><select class="applicant-filter-select page-size-select" data-filter-key="pageSize" aria-label="Records per request">${selectOptions(["10", "25", "250", "50", "100", "300", "500"], filters.pageSize)}</select></label>
          <label class="applicant-archived-filter"><input type="checkbox" class="applicant-archived-checkbox" data-filter-key="archived" ${filters.archived ? "checked" : ""} /> <span>Search archived data</span></label>
        </div>
      </div>` : ""}
      <div class="automation-grid-shell">
        <div class="applicant-grid-meta">
          <div class="applicant-grid-count"><strong>Total Fetch: 32</strong><span>${fetchedRows.length} matching records</span></div>
          <div class="applicant-density-control" role="group" aria-label="Table density">
            <span>Density</span>
            <button class="density-btn${appState.applicantDensity === "compact" ? " active" : ""}" data-action="set-applicant-density" data-density="compact">Compact</button>
            <button class="density-btn${appState.applicantDensity === "comfortable" ? " active" : ""}" data-action="set-applicant-density" data-density="comfortable">Comfortable</button>
          </div>
        </div>
        <div class="automation-grid-toolbar">
          <button class="grid-icon-btn applicant-toolbar-icon" data-action="applicant-export-menu" title="Export" aria-label="Export"><i data-lucide="download" aria-hidden="true">⇩</i></button>
          <button class="grid-icon-btn applicant-toolbar-icon" data-action="applicant-column-chooser" title="Column Chooser" aria-label="Column Chooser"><i data-lucide="columns-3" aria-hidden="true">▤</i></button>
          <label class="applicant-grid-filter-wrap"><i data-lucide="search" aria-hidden="true">⌕</i><input class="filter-input applicant-grid-filter" placeholder="Filter..." aria-label="Filter applicant rows" /></label>
          <label class="applicant-rows-control"><span>Rows per page</span><select class="applicant-rows-per-page" aria-label="Rows per page">${selectOptions(["10", "25", "50", "100"], String(rowsPerPage))}</select></label>
          <button class="grid-icon-btn applicant-toolbar-icon" data-action="applicant-grid-menu" title="More" aria-label="More applicant table actions"><i data-lucide="ellipsis-vertical" aria-hidden="true">⋮</i></button>
        </div>
        ${renderApplicantColumnChooser(headers)}
        <div class="applicant-table-scroll">
          ${applicantTable(displayHeaders, pageRows.map((row) => projectApplicantRow(row, headers, displayHeaders)), { fullHeaders: headers, fullRows: pageRows, rowAction: "open-applicant", selectable: true, identityHeaders: visibleHeaders })}
        </div>
        <div class="applicant-grid-footer">
          <span>Showing ${pageStart}–${pageEnd} of ${fetchedRows.length}</span>
          <div class="applicant-pagination" aria-label="Applicant table pagination">
            <button class="page-btn" data-action="applicant-page" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
            <span>Page ${currentPage} of ${pageCount}</span>
            <button class="page-btn" data-action="applicant-page" data-page="${Math.min(pageCount, currentPage + 1)}" ${currentPage === pageCount ? "disabled" : ""}>Next</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function selectOptions(options, selected) {
  return options.map((option) => `<option${String(option) === String(selected) ? " selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

let themedSelectId = 0;

function enhanceNativeSelects(root = document) {
  root.querySelectorAll("select:not([data-native-select])").forEach((select) => {
    const options = [...select.options].map((option) => ({
      label: option.textContent || option.value,
      value: option.value,
    }));
    if (!options.length) return;
    const selectedIndex = Math.max(0, select.selectedIndex);
    const selectedValue = select.value;
    const field = select.name || select.id || `select-${++themedSelectId}`;
    const label = select.getAttribute("aria-label") || field;
    const wrapper = document.createElement("div");
    wrapper.className = "profile-select themed-select";
    wrapper.dataset.profileSelect = "";
    wrapper.dataset.sourceSelect = field;
    const hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.className = `themed-select-value ${select.className}`.trim();
    hidden.value = selectedValue;
    hidden.dataset.optionIndex = String(selectedIndex);
    for (const attribute of [...select.attributes]) {
      if (["class", "type", "value"].includes(attribute.name)) continue;
      hidden.setAttribute(attribute.name, attribute.value);
    }
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "profile-select-trigger";
    trigger.disabled = select.disabled;
    trigger.dataset.action = "toggle-profile-select";
    trigger.dataset.field = field;
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", label);
    trigger.innerHTML = `<span class="profile-select-value${selectedValue ? "" : " is-placeholder"}">${escapeHtml(options[selectedIndex]?.label || "")}</span><span class="profile-select-chevron" aria-hidden="true">⌄</span>`;
    const menu = document.createElement("div");
    menu.className = "profile-select-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-label", label);
    menu.hidden = true;
    menu.innerHTML = options.map((option, index) => `<button type="button" class="profile-select-option${index === selectedIndex ? " is-selected" : ""}" data-action="select-profile-option" data-field="${escapeHtml(field)}" data-value="${escapeHtml(option.value)}" data-option-index="${index}" role="option" aria-selected="${index === selectedIndex ? "true" : "false"}">${escapeHtml(option.label)}</button>`).join("");
    wrapper.append(hidden, trigger, menu);
    select.replaceWith(wrapper);
  });
}

function applicantRowMatchesFilters(row, headers, filters = {}) {
  const values = Object.fromEntries(headers.map((header, index) => [header, String(row[index] ?? "")]));
  const text = Object.values(values).join(" ").toLowerCase();
  const local = data.localApplicants.find((applicant) => String(applicant.name || "") === values.Applicant);
  const matches = (value, candidates) => {
    const query = String(value || "").trim().toLowerCase();
    return !query || candidates.some((candidate) => String(candidate || "").toLowerCase().includes(query));
  };
  const gender = String(filters.gender || "");
  if (gender !== "Gender" && gender && !matches(gender, [local?.gender, values.Gender, text])) return false;
  if (filters.intake !== "Select..." && !matches(filters.intake, [local?.intake, local?.classBatch, values.Intake, values["Class/Batch"], text])) return false;
  if (filters.classBatch !== "Select..." && !matches(filters.classBatch, [local?.classBatch, local?.intake, values["Class/Batch"], text])) return false;
  if (filters.status !== "Status" && !matches(filters.status, [local?.status, local?.currentStatus, values.Application, values["Current Status"], text])) return false;
  if (!matches(filters.branch, [local?.branch, values.Branch, text])) return false;
  if (!matches(filters.name, [values.Applicant, text])) return false;
  if (!matches(filters.currentStatus, [local?.currentStatus, local?.status, values["Current Status"], values.Application, text])) return false;
  if (filters.archived && !matches("Archived", [local?.status, local?.currentStatus, values["Current Status"], values.Application, text])) return false;
  return filters.dataModule === "Applicant" || !filters.dataModule;
}

function applicantAllColumns(capturedHeaders) {
  const columns = [...new Set([...capturedHeaders, ...applicantOptionalColumns])];
  const identityFirst = ["#", "Applicant", "Avatar"];
  return [...identityFirst.filter((column) => columns.includes(column)), ...columns.filter((column) => !identityFirst.includes(column))];
}

function applicantVisibleHeaders(headers) {
  const saved = Array.isArray(data.applicantVisibleColumns) && data.applicantVisibleColumns.length
    ? data.applicantVisibleColumns
    : applicantDefaultColumns;
  const visible = saved.filter((header) => headers.includes(header));
  const identity = ["#", "Applicant", "Avatar"];
  return [...identity.filter((header) => visible.includes(header)), ...visible.filter((header) => !identity.includes(header))];
}

function applicantDisplayHeaders(visibleHeaders) {
  return ["Applicant", ...visibleHeaders.filter((header) => !["#", "Applicant", "Avatar"].includes(header))];
}

function renderApplicantColumnChooser(headers) {
  if (!appState.applicantColumnChooserOpen) return "";
  const visible = applicantVisibleHeaders(headers);
  const query = appState.applicantColumnSearch.trim().toLowerCase();
  const filtered = headers.filter((header) => !query || header.toLowerCase().includes(query));
  return `
    <div class="column-chooser-popover">
      <h3>Column Chooser</h3>
      <label class="column-search-wrap"><i data-lucide="search" aria-hidden="true">⌕</i><input class="column-chooser-search" placeholder="Search" aria-label="Search columns" value="${escapeHtml(appState.applicantColumnSearch)}" /></label>
      <div class="column-chooser-list">
        ${filtered.map((header) => `
          <label class="${header === "Home" ? "column-group" : ""}">
            ${header === "Home" ? "<span>⌄</span>" : "<span></span>"}
            <input type="checkbox" data-action="toggle-applicant-column" data-column="${escapeHtml(header)}"${visible.includes(header) ? " checked" : ""} />
            <span>${escapeHtml(header)}</span>
          </label>
        `).join("")}
      </div>
      <button class="ghost-btn" data-action="close-column-chooser">Cancel</button>
    </div>
  `;
}

function openApplicantExportMenu() {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div><strong>Export</strong><small>Applicant List</small></div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="grid-command-list">
      <button data-action="applicant-export-all">Export all data to Excel</button>
      <button data-action="applicant-export-selected">Export selected rows to Excel</button>
    </div>
  `;
  drawer.classList.add("open");
}

function exportApplicantGrid(mode = "all") {
  const tableElement = document.querySelector(".applicant-grid-panel .data-table");
  if (!tableElement) {
    showToast("No applicant rows available to export.");
    return;
  }
  const rows = [...tableElement.querySelectorAll("tr")].filter((row) => mode === "all" || row.dataset.selected === "true");
  const exportRows = mode === "selected" && !rows.length
    ? [...tableElement.querySelectorAll("tr")].slice(0, 1)
    : rows;
  const csv = exportRows.map((row) => [...row.children].map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `applicant-list-${mode}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  closeDetailDrawer();
  showToast(mode === "all" ? "All applicant data exported locally." : "Selected applicant rows exported locally.");
}

function openApplicantGridMenu() {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div><strong>Applicant Grid</strong><small>Items</small></div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="grid-command-list">
      ${[["delete", "Delete"], ["restore", "Restore"], ["archive", "Archive"], ["fix-headers", "Fix Column Headers"], ["bulk-email", "Bulk Email"], ["update-reference", "Update Reference Values"], ["bulk-sms", "Bulk SMS"], ["reset-layout", "Reset Layout"]].map(([command, label]) => `<button data-action="applicant-grid-command" data-command="${command}">${label}</button>`).join("")}
      <label class="grid-command-check"><input type="checkbox" data-action="toggle-applicant-grid-option" data-command="wrap-text"${appState.applicantGridWrapText ? " checked" : ""} /> Wrap text</label>
      <label class="grid-command-check"><input type="checkbox" data-action="toggle-applicant-grid-option" data-command="row-filter"${appState.applicantGridRowFilter ? " checked" : ""} /> Row Filter</label>
    </div>
  `;
  drawer.classList.add("open");
}

function runApplicantGridCommand(command, checked = true) {
  if (command === "wrap-text") {
    appState.applicantGridWrapText = checked;
    document.querySelector(".applicant-grid-panel")?.classList.toggle("wrap-text", checked);
    showToast(`Wrap text ${checked ? "enabled" : "disabled"}.`);
    return;
  }
  if (command === "row-filter") {
    appState.applicantGridRowFilter = checked;
    showToast(`Row Filter ${checked ? "enabled" : "disabled"}.`);
    return;
  }
  if (command === "reset-layout") {
    data.applicantVisibleColumns = [...applicantDefaultColumns];
    storeArray(storageKeys.applicantVisibleColumns, data.applicantVisibleColumns);
    closeDetailDrawer();
    render();
    showToast("Applicant grid layout reset.");
    return;
  }
  const messages = {
    delete: "Select applicant rows to delete.",
    restore: "Select archived applicant rows to restore.",
    archive: "Select applicant rows to archive.",
    "fix-headers": "Applicant column headers fixed locally.",
    "bulk-email": "Bulk Email action opened locally.",
    "update-reference": "Reference values updated locally.",
    "bulk-sms": "Bulk SMS action opened locally.",
  };
  showToast(messages[command] || "Applicant grid action completed locally.");
}

function normalizeApplicantRow(row, sourceHeaders, targetHeaders) {
  const values = Object.fromEntries(sourceHeaders.map((header, index) => [header, row[index] ?? ""]));
  values["Current Status"] ||= values.Application || appState.applicantStatus || "Inquiry";
  values["Class/Batch"] ||= values["Class/Batch"] || "-";
  values.Home ||= values["Complete Address"] || "-";
  return targetHeaders.map((header) => values[header] ?? "");
}

function capturedApplicantNames(rows = []) {
  const start = rows.findIndex((row) => String(row?.[0] || "") === "1" && String(row?.[1] || "").trim());
  if (start < 0) return [];
  return rows.slice(start).filter((row) => /^\d+$/.test(String(row?.[0] || "")) && String(row?.[1] || "").trim());
}

function capturedApplicantRow(raw = [], fixed = [], index = 0, headers = applicantDefaultColumns) {
  const cells = raw.map((value) => String(value ?? "").trim()).filter(Boolean);
  const firstInitials = /^[A-Za-z]{1,3}$/.test(cells[0] || "") ? cells[0] : "";
  const phone = cells.find((value) => /^(?:\+?\d[\d\s-]{7,})$/.test(value) && !value.includes("%")) || "";
  const address = cells.find((value) => /(?:Municipality|Metropolitan|Rural Municipality|Province|Nepal)/i.test(value)) || "";
  const percent = cells.find((value) => /%$/.test(value)) || "";
  const date = cells.find((value) => /\b(?:19|20)\d{2}\b/.test(value) && !/ago$/i.test(value)) || "";
  const bank = cells.find((value) => /(?:bank|co-operative|cooperative|saving|credit)/i.test(value)) || "";
  const activity = cells.find((value) => /\b(?:a|\d+)\s+(?:day|days|month|months|year|years)\s+ago\b/i.test(value)) || "";
  const official = activity ? activity.replace(/\s+(?:a|\d+)\s+(?:day|days|month|months|year|years)\s+ago\b/i, "").trim() : "";
  const created = activity ? activity.slice(official.length).trim() : "";
  const passportNo = cells.find((value) => /^(?:PA|PP|PR)\d{5,}$/i.test(value) || /^\d{7,8}$/.test(value)) || "";
  const values = {
    "#": fixed?.[0] || String(index + 1),
    Applicant: fixed?.[1] || "Applicant",
    Avatar: firstInitials || "-",
    Application: "-",
    Official: official || "-",
    Income: "-",
    Created: created || "-",
    "Phone No": phone || "-",
    "Complete Address": address || "-",
    Passport: passportNo ? "Submitted" : "-",
    "Bank and Annual Income Ratio": percent || "-",
    Bank: bank || "-",
    "Passport No": passportNo || "-",
    "Passport Expiry Date": date || "-",
    "Current Status": "Inquiry",
    "Class/Batch": "-",
    Home: address || "-",
  };
  return headers.map((header) => values[header] ?? "");
}

function projectApplicantRow(row, sourceHeaders, visibleHeaders) {
  return visibleHeaders.map((header) => row[sourceHeaders.indexOf(header)] ?? "");
}

function renderFrontdesk() {
  const visitors = data.visitorRecords;
  const applyCount = visitors.filter((visitor) => visitor[6].includes("APPLY")).length;
  const femaleCount = visitors.filter((visitor) => visitor[2] === "Female").length;
  return `
    ${pageHead("Front Desk Dashboard", "Visitor metrics, entry records and communication history.")}
    <div class="metrics-grid">
      <div class="metric blue"><span>Total Visitors</span><strong>${visitors.length}</strong></div>
      <div class="metric green"><span>Apply Course Leads</span><strong>${applyCount}</strong></div>
      <div class="metric orange"><span>Female Visitors</span><strong>${femaleCount}</strong></div>
      <div class="metric red"><span>Male Visitors</span><strong>${visitors.length - femaleCount}</strong></div>
    </div>
    ${panel("Recent Visitors", table(["Visitor Name", "Date", "Gender", "Mobile No", "Email", "New Address (Full)", "Course", "Branch", "Action"], visitors.slice(-8).reverse()), visitors.length)}
  `;
}

function renderVisitorList() {
  return `
    ${pageHead("Visitor List", "All visitor records transferred from Automation Frontdesk.")}
    <section class="panel">
      <div class="panel-title"><h2>Visitor List</h2><small>Data grid with ${data.visitorRecords.length} rows and 9 columns</small></div>
      <div class="table-tools">
        <select class="visitor-filter-select" aria-label="Visitor gender">${selectOptions(["Gender", "Male", "Female"], appState.visitorGender)}</select>
        <select class="page-size-select"><option selected>250</option><option>100</option><option>50</option><option>25</option><option>10</option></select>
        <input class="filter-input" placeholder="Name..." />
        <button class="primary-btn" data-action="search">Search</button>
        <button class="ghost-btn" data-action="advanced-filter">Advanced filter</button>
      </div>
      ${table(["Visitor Name", "Date", "Gender", "Mobile No", "Email", "New Address (Full)", "Course", "Branch", "Action"], data.visitorRecords)}
    </section>
  `;
}

function renderVisitorEntry() {
  return `
    ${pageHead("Visitor Entry", "Automation visitor entry form with transferred Last 20 visitors.")}
    <section class="panel">
      <div class="panel-title"><h2>Visitor Entry</h2><small>Local form</small></div>
      <form class="entry-form" id="visitorForm">
        <label><span>${renderFieldLabel("Visitor Name *")}</span><input name="name" placeholder="Visitor name" required /></label>
        <label><span>${renderFieldLabel("Gender *")}</span><select name="gender" required><option>Select...</option><option>Male</option><option>Female</option></select></label>
        <label><span>${renderFieldLabel("Mobile Number (SMS purpose) *")}</span><input name="mobile" placeholder="Mobile No" required /></label>
        <label><span>Email</span><input name="email" placeholder="Email" /></label>
        <label><span>New Address (Full)</span><input name="address" placeholder="Address" /></label>
        <label><span>Course</span><input name="course" placeholder="Course" /></label>
        <label><span>Assign to User</span><select name="user"><option>Select user...</option><option>Amrit Sensei</option><option>Sabina Rijal</option><option>Manik Giri</option></select></label>
        <div class="form-actions">
          <button type="button" class="ghost-btn" data-action="modify-fields">Add/Modify fields</button>
          <button type="reset" class="ghost-btn" data-action="cancel">Cancel</button>
          <button type="button" class="primary-btn" data-action="save-visitor">Save</button>
        </div>
      </form>
    </section>
    ${panel("Last 20 visitors", table(["Visitor Name", "Date", "Gender", "Mobile No", "Email", "New Address (Full)", "Course", "Branch", "Action"], data.visitorRecords.slice(0, 20)), 20)}
  `;
}

function renderModulesHub() {
  const cards = [
    ["Bank", "18 rows", "bank"],
    ["Consultancy", "6 rows", "consultancy"],
    ["Fiscal Year", "10 rows", "fiscal-year"],
    ["Intake", "14 rows", "intake"],
    ["School", "10+ rows", "school"],
    ["Document Resources", "Templates and generated docs", "document-resources"],
  ];
  return `
    ${pageHead("Modules", "Reusable master-data modules and utility screens.")}
    <div class="module-grid">
      ${cards.map(([title, meta, route]) => `<a class="module-card" href="#${route}"><strong>${title}</strong><span>${meta}</span></a>`).join("")}
    </div>
  `;
}

function renderVisualization() {
  const consultancyRows = [
    ["Special Japanese Language And Computer Institute", 266],
    ["Quantum Abroad Studies Pvt. Ltd.", 115],
    ["Bright Lumbini International Education Pvt. Ltd.", 10],
    ["Global EDU Consultancy Pvt. Ltd.", 1],
  ];
  return `
    ${pageHead("Visualization", "Record, archive, file, task, gender and consultancy summaries observed in Automation.")}
    <div class="metrics-grid">
      ${visualizationStats.map(([label, value, color]) => `<div class="metric ${color}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
    </div>
    <div class="layout-grid">
      ${panel("Gender Ratio", `<div class="donut-row"><div class="donut"></div><div><strong>Female / Male</strong><p>Observed chart surface from Automation visualization.</p></div></div>`)}
      ${panel("Consultancy wise Student", `<div class="chart-bars">${consultancyRows.map(([label, value]) => `<div class="bar-row"><span>${escapeHtml(label)}</span><div><i style="width:${Math.max(6, value / 3)}%"></i></div><strong>${value}</strong></div>`).join("")}</div>`)}
    </div>
  `;
}

function renderStatement() {
  return `
    ${pageHead("Account Statement Draft Report", "Draft status and account-statement rows.", `<button class="primary-btn" data-action="export-report">Export</button>`)}
    ${panel("Statement Draft Status", `<div class="table-tools">
      <input class="filter-input" placeholder="Name..." />
      <input placeholder="Draft status" />
        <button class="primary-btn" data-action="search">Search</button>
      <button class="ghost-btn" data-action="advanced-filter">Advanced filter</button>
    </div>${table(["Applicant", "Accountholder Name", "Account No", "Format", "Interest Rate", "Opening Date", "Exchange Date", "Duration", "Opening Balance", "Debit Count", "Credit Count", "Closing Balance", "Edit Locked?"], statementRows)}`, statementRows.length)}
  `;
}

function renderPlaceholder(title) {
  return `
    ${pageHead(title, "Screen shell cloned; original workflow opens modals or utility panels inside Automation.")}
    ${panel(title, `<div class="tool-surface">
      <div class="empty">This module includes the observed navigation and workflow surface for ${escapeHtml(title)}.</div>
      <button class="primary-btn" data-action="open-tool" data-label="${escapeHtml(title)}">Open ${escapeHtml(title)}</button>
      <button class="ghost-btn" data-action="refresh-page">Refresh</button>
    </div>`)}
  `;
}

function renderAddApplicant() {
  return `
    <div class="modal-page">
      <section class="automation-modal" aria-label="Add New Applicant">
        <div class="modal-toolbar">
          <strong>Add New Applicant</strong>
          <button class="icon-button" data-action="close-applicant-modal" title="Close">x</button>
        </div>
        <form class="automation-entry-form" id="applicantForm">
          <label><span>${renderFieldLabel("Applicant*")}</span><input name="name" required /></label>
          <label><span>${renderFieldLabel("First Name*")}</span><input name="firstName" required /></label>
          <label><span>Middle Name</span><input name="middleName" /></label>
          <label><span>${renderFieldLabel("Last Name*")}</span><input name="lastName" required /></label>
          <label><span>${renderFieldLabel("Gender*")}</span><select name="gender" required><option>Select...</option><option>Male</option><option>Female</option><option>Other</option></select></label>
          <label><span>Name in Japanese</span><input name="nameJapanese" /></label>
          <label><span>First Name in Japanese</span><input name="firstNameJapanese" /></label>
          <label><span>Middle Name in Japanese</span><input name="middleNameJapanese" /></label>
          <label><span>Last Name in Japanese</span><input name="lastNameJapanese" /></label>
          <label><span>Name in Nepali</span><input name="nameNepali" /></label>
          <label><span>First Name in Nepali</span><input name="firstNameNepali" /></label>
          <label><span>Middle Name in Nepali</span><input name="middleNameNepali" /></label>
          <label><span>Last Name in Nepali</span><input name="lastNameNepali" /></label>
          <label><span>Assign to User</span><select name="assignUser"><option>Select user...</option><option>Amrit Sensei</option><option>Sabina Rijal</option><option>Manik Giri</option><option>Apsara Maharjan</option></select></label>
          <div class="modal-actions">
            <button type="button" class="ghost-btn" data-action="close-applicant-modal">Close</button>
            <button type="button" class="primary-btn" data-action="save-applicant">Save</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderApplicantProfile() {
  const record = appState.activeApplicant || { name: "Applicant", owner: "N/a", status: "N/a" };
  const name = record.name || "Applicant";
  const initials = initialsFor(name);
  const profileGender = profileSectionData(record).Home?.gender || "";
  const gender = String(record.gender || profileGender || "").trim().toLowerCase();
  const genderClass = gender.includes("female") ? "gender-female" : gender.includes("male") ? "gender-male" : "gender-other";
  const activeTab = profileMainTabs.includes(appState.profileMainTab) ? appState.profileMainTab : "Document Check";
  const activeSubTab = appState.profileSubTab || "File History";
  const paymentTotals = profilePaymentTotals(record);
  const comments = profileCommentsFor(record);
  const commentCount = comments.length;
  const applicantTasks = applicantDataTasks(record);
  const latestProfileEdit = profileLogEntries(record)[0] || null;
  const latestProfileEditor = latestProfileEdit?.user || "No edits yet";
  const photoSource = String(record.photo || record.avatar_url || record.avatar || "").trim();
  const hasPhoto = /^(?:data:image\/|https?:\/\/|blob:)/i.test(photoSource);
  const commentsHidden = appState.commentsHidden;
  const profileSidebarHidden = appState.profileSidebarHidden;
  return `
    <section class="applicant-profile-shell">
      <div class="profile-window-head">
        <h1>${escapeHtml(name)}</h1>
        <div>
          <button class="icon-button ${appState.profilePinned ? "active" : ""}" data-action="pin-profile" title="Pin" aria-label="Pin applicant">⌖</button>
          <button class="icon-button" data-action="profile-more" title="More" aria-label="More applicant actions">⋮</button>
          <button class="icon-button" data-action="applicant-profile-close" title="Close">×</button>
        </div>
      </div>
      <div class="profile-window-body ${commentsHidden ? "comments-hidden" : ""} ${profileSidebarHidden ? "profile-sidebar-hidden" : ""}" style="--profile-left-width: ${appState.profileLeftWidth}%; --profile-right-width: ${appState.profileCommentsWidth}%">
        ${profileSidebarHidden ? `<aside class="student-profile-left-collapsed">
          <button class="profile-sidebar-toggle profile-sidebar-show" data-action="show-profile-sidebar" title="Show applicant summary" aria-label="Show applicant summary">›</button>
        </aside>` : `<aside class="student-profile-left ${genderClass}">
          <button class="profile-resize-handle profile-rail-menu profile-resize-left" data-profile-resize="left" type="button" title="Drag to resize. Click to hide applicant summary." aria-label="Resize or hide applicant summary panel"><span aria-hidden="true"></span></button>
          <div class="student-card">
            <div class="student-photo${hasPhoto ? " has-photo" : ""}">${hasPhoto ? `<img src="${escapeHtml(photoSource)}" alt="${escapeHtml(name)}" />` : `<span>${escapeHtml(initials)}</span>`}</div>
            <button class="student-edit" data-action="edit-profile-photo" title="Edit photo" aria-label="Edit photo"><i data-lucide="pencil" aria-hidden="true">✎</i></button>
            <div class="student-identity">
              <strong>${escapeHtml(name)}</strong>
              <span><i data-lucide="fingerprint" aria-hidden="true">#</i>ID: ${escapeHtml(record.id || "67066")}</span>
              <span><i data-lucide="calendar-days" aria-hidden="true">▣</i>Regd.: ${escapeHtml(record.created || "March 3, 2024 11:24 AM")}</span>
            </div>
          </div>
          <div class="status-card">
            <div class="status-row"><span class="status-row-icon"><i data-lucide="user-round-cog" aria-hidden="true">♟</i></span><strong><small>Last edited by</small>${escapeHtml(latestProfileEditor)}</strong><span class="status-row-actions" aria-label="Last edit details"><i data-lucide="history" aria-hidden="true">◷</i></span></div>
          </div>
          <div class="profile-task-card">
            <div class="profile-task-card-head"><div class="sidebar-card-heading"><i data-lucide="clipboard-check" aria-hidden="true">☑</i><h3>Remaining Entries</h3></div><span class="profile-task-badge ${applicantTasks.length ? "has-tasks" : "is-clear"}">${applicantTasks.length}</span></div>
            <p>${applicantTasks.length ? `${applicantTasks.length} field${applicantTasks.length === 1 ? " is" : "s are"} still pending.` : "All tracked fields are complete."}</p>
            <button class="profile-task-open" data-action="open-applicant-tasks"><i data-lucide="list-checks" aria-hidden="true">☷</i>${applicantTasks.length ? "View remaining tasks" : "View checklist and log"}</button>
          </div>
          ${renderApplicantProgressPentagon(record)}
        </aside>`}
        <main class="student-profile-main">
          <nav class="profile-main-tabs">
            ${profileMainTabs.map((tab) => `<button class="${tab === activeTab ? "active" : ""}" data-action="profile-tab" data-tab="${escapeHtml(tab)}">${profileTabIcon(tab)}${escapeHtml(tab)}</button>`).join("")}
          </nav>
          ${activeTab === "Account Records" ? renderProfileSubTabs(activeSubTab) : ""}
          ${renderProfileTabContent(activeTab, activeSubTab, record)}
        </main>
        ${commentsHidden ? `<aside class="student-comments-collapsed" aria-label="Comments sidebar">
          <button class="comments-rail-toggle" data-action="show-comments" title="Show comments" aria-label="Show comments">${commentToggleIcon()}</button>
          <span class="comments-rail-speech" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="comments-rail-label" aria-hidden="true">COMMENTS</span>
          <span class="comments-rail-count ${commentCount ? "has-comments" : ""}" aria-label="${commentCount} comment${commentCount === 1 ? "" : "s"}">${commentCount}</span>
          <span class="comments-rail-collapse" aria-hidden="true">‹‹</span>
        </aside>` : `<aside class="student-comments">
          <button class="profile-resize-handle profile-rail-menu profile-resize-right" data-profile-resize="right" type="button" title="Drag to resize. Click to hide comments." aria-label="Resize or hide comments panel"><span aria-hidden="true"></span></button>
          <textarea class="profile-comment-input" placeholder="Write a comment... @User for mention"></textarea>
          <div class="comment-actions"><button class="comment-post-btn" data-action="post-profile-comment" type="button">Post comment</button><span class="comment-count-label">${commentCount} comment${commentCount === 1 ? "" : "s"}</span></div>
          ${renderProfileComments(comments)}
        </aside>`}
      </div>
    </section>
  `;
}

function commentToggleIcon() {
  return `<span class="comment-icon-bubble"><span></span><span></span></span>`;
}

function profileCommentKey(record = appState.activeApplicant) {
  return String(record?.id || record?.name || "default-applicant");
}

function profileCommentsFor(record = appState.activeApplicant) {
  const stored = readStoredObject(storageKeys.profileComments);
  const comments = stored[profileCommentKey(record)];
  return Array.isArray(comments) ? comments : [];
}

function renderProfileComments(comments) {
  if (!comments.length) return `<div class="comment-empty">Comments...</div>`;
  return `<div class="profile-comment-list">${comments.map((comment) => `
    <article class="profile-comment-item">
      <div class="profile-comment-meta"><strong>${escapeHtml(comment.author || "You")}</strong><time>${escapeHtml(comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "")}</time></div>
      <p>${escapeHtml(comment.text || "")}</p>
    </article>`).join("")}</div>`;
}

function postProfileComment() {
  const input = document.querySelector(".profile-comment-input");
  const text = String(input?.value || "").trim();
  if (!text) {
    showToast("Write a comment first.");
    return;
  }
  const stored = readStoredObject(storageKeys.profileComments);
  const key = profileCommentKey(appState.activeApplicant);
  const comments = Array.isArray(stored[key]) ? stored[key] : [];
  stored[key] = [...comments, { author: "You", text, createdAt: new Date().toISOString() }];
  storeObject(storageKeys.profileComments, stored);
  render();
  showToast("Comment posted.");
}

function documentChecklistMaster() {
  return window.SJLA_DOCUMENT_CHECKLIST_MASTER || { categories: [], instructions: "", total_documents: 0 };
}

function documentChecklistDocuments() {
  return documentChecklistMaster().categories.flatMap((group) => (group.documents || []).map((document) => ({
    ...document,
    category: group.category,
  })));
}

const documentWorkflowStages = [
  { id: "stage-1", label: "Stage 1", statuses: ["Not Started", "Preparing", "Check Due", "Check and Correction", "Sent to Student"], complete: "sent-to-student" },
  { id: "stage-2", label: "Stage 2", statuses: ["Scan Received", "Check Due", "Check and Correction", "Sent for Signature"], complete: "sent-for-signature" },
  { id: "stage-3", label: "Stage 3", statuses: ["Scan Received", "Check and Correction", "Sent for Correction", "Approved"], complete: "approved" },
];

const documentReceiptStatuses = [
  { id: "not-received", label: "Not Received" },
  { id: "received", label: "Received" },
];

function documentUsesReceiptStatus(document) {
  const name = String(document?.name || "").trim().toLowerCase();
  return name === "applicant's photo"
    || name.includes("transcript")
    || name.includes("character certificate")
    || name === "language proficiency test"
    || name === "tb clearance certificate"
    || name.includes("tuberclosis clearance certificate")
    || name.includes("tuberculosis clearance certificate");
}

function documentWorkflowStatusId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function documentStatusNeedsAttention(value) {
  return ["not-received", "not-started", "check-due"].includes(documentWorkflowStatusId(value));
}

function documentWorkflowActor() {
  return String(appState.currentUser?.name || appState.user?.name || "You");
}

function documentWorkflowDateTime(value) {
  const timestamp = new Date(value || "");
  return Number.isFinite(timestamp.getTime()) ? timestamp.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "Not selected yet";
}

function documentWorkflowDateLabel(value) {
  const timestamp = new Date(value || "");
  return Number.isFinite(timestamp.getTime()) ? timestamp.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" }) : "";
}

function documentWorkflowSkippedStatuses(stage, state) {
  const skipped = state?.skipped && typeof state.skipped === "object" ? state.skipped : {};
  return stage.statuses
    .map((status) => ({ status, id: documentWorkflowStatusId(status), meta: skipped[documentWorkflowStatusId(status)] }))
    .filter((item) => item.meta && item.id !== state?.status);
}

function renderDocumentWorkflowSkippedTags(stage, state) {
  const skipped = documentWorkflowSkippedStatuses(stage, state);
  if (!skipped.length) return "";
  return `<div class="document-workflow-skipped-tags" aria-label="Skipped workflow steps">${skipped.map((item) => `<span><i data-lucide="forward" aria-hidden="true"></i><b>${escapeHtml(item.status)}</b><small>Skipped by user${item.meta?.at ? ` · ${escapeHtml(documentWorkflowDateLabel(item.meta.at))}` : ""}${item.meta?.user ? ` · ${escapeHtml(item.meta.user)}` : ""}</small></span>`).join("")}</div>`;
}

function defaultDocumentWorkflow() {
  return {
    stages: Object.fromEntries(documentWorkflowStages.map((stage, index) => [stage.id, {
      status: index === 0 ? documentWorkflowStatusId("Not Started") : "",
      selectedAt: "",
      selectedBy: "",
      history: [],
    }])),
  };
}

function normalizeDocumentWorkflow(entry) {
  const base = defaultDocumentWorkflow();
  const stored = entry?.workflow && typeof entry.workflow === "object" ? entry.workflow : {};
  const legacyMap = {
    "not-started": "not-started",
    preparing: "preparing",
    "under-review": "check-due",
    "correction-required": "check-and-correction",
  };
  documentWorkflowStages.forEach((stage, index) => {
    const current = stored.stages?.[stage.id] && typeof stored.stages[stage.id] === "object" ? stored.stages[stage.id] : {};
    const legacyStatus = index === 0 ? legacyMap[entry?.status] : "";
    const migratedStatus = index === 0 && current.status === "sent-file-student" ? "sent-to-student" : current.status;
    base.stages[stage.id] = {
      ...base.stages[stage.id],
      ...current,
      status: migratedStatus || legacyStatus || base.stages[stage.id].status,
      history: Array.isArray(current.history) ? current.history : [],
    };
  });
  return base;
}

function documentWorkflowDisplayStatus(entry) {
  const workflow = normalizeDocumentWorkflow(entry);
  for (let index = documentWorkflowStages.length - 1; index >= 0; index -= 1) {
    const stage = documentWorkflowStages[index];
    const status = workflow.stages[stage.id]?.status;
    const label = stage.statuses.find((item) => documentWorkflowStatusId(item) === status);
    if (label && (index === 0 || workflow.stages[stage.id]?.selectedAt || status !== documentWorkflowStatusId("Not Started"))) return label;
  }
  return "Not Started";
}

function documentWorkflowStageComplete(stage, state) {
  return Boolean(state?.status && state.status === stage.complete);
}

function documentWorkflowElapsedLabel(startedAt) {
  const started = new Date(startedAt || "").getTime();
  if (!Number.isFinite(started)) return "Not selected yet";
  const elapsed = Math.max(0, Date.now() - started);
  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor((elapsed % 86400000) / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  if (days) return `${days}d ${hours}h ago`;
  if (hours) return `${hours}h ${minutes}m ago`;
  return `${minutes}m ago`;
}

function refreshDocumentWorkflowClocks() {
  document.querySelectorAll("[data-workflow-time]").forEach((node) => {
    node.textContent = documentWorkflowElapsedLabel(node.dataset.startedAt);
  });
}

function startDocumentWorkflowClock() {
  window.clearInterval(window.sjlaDocumentWorkflowClock);
  if (document.querySelector("[data-workflow-time]")) {
    window.sjlaDocumentWorkflowClock = window.setInterval(refreshDocumentWorkflowClocks, 60000);
  }
  refreshDocumentWorkflowClocks();
}

function captureChecklistScroll(documentId = "") {
  const scroller = document.querySelector(".student-profile-main");
  if (!scroller) return null;
  const card = [...scroller.querySelectorAll("[data-document-card]")].find((item) => String(item.dataset.documentCard) === String(documentId));
  return {
    top: scroller.scrollTop,
    cardId: documentId,
    cardOffset: card ? card.getBoundingClientRect().top - scroller.getBoundingClientRect().top : null,
  };
}

function restoreChecklistScroll(snapshot) {
  if (!snapshot) return;
  const apply = () => {
    const scroller = document.querySelector(".student-profile-main");
    if (!scroller) return;
    scroller.scrollTop = snapshot.top;
    if (snapshot.cardOffset === null || snapshot.cardOffset === undefined) return;
    const card = [...scroller.querySelectorAll("[data-document-card]")].find((item) => String(item.dataset.documentCard) === String(snapshot.cardId));
    if (!card) return;
    const currentOffset = card.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    scroller.scrollTop += currentOffset - snapshot.cardOffset;
  };
  apply();
  window.requestAnimationFrame(() => {
    apply();
    window.requestAnimationFrame(apply);
  });
  window.setTimeout(apply, 80);
}

function documentChecklistRecordKey(record = appState.activeApplicant) {
  return String(record?.id || record?.localId || record?.name || "default-applicant");
}

function defaultDocumentChecklistEntry(document) {
  return {
    requirement: "undecided",
    status: "not-started",
    pdfReceipt: false,
    originalReceipt: false,
    deadline: "",
    remarks: "",
    mistakeReport: "",
    correctionNotes: "",
    hidden: false,
    history: [],
    workflow: defaultDocumentWorkflow(),
    receiptStatus: "not-received",
    receiptSelectedAt: "",
    receiptSelectedBy: "",
    receiptHistory: [],
    documentName: document.name,
    category: document.category,
  };
}

function documentReceiptStatusLabel(entry) {
  return documentReceiptStatuses.find((item) => item.id === entry?.receiptStatus)?.label || "Not Received";
}

function setDocumentReceiptStatus(documentId, status) {
  const documentItem = documentChecklistDocuments().find((item) => String(item.id) === String(documentId));
  if (!documentItem || !documentUsesReceiptStatus(documentItem) || !documentReceiptStatuses.some((item) => item.id === status)) return;
  const currentEntry = checklistEntryFor(documentId);
  const now = new Date().toISOString();
  const actor = documentWorkflowActor();
  const history = Array.isArray(currentEntry.receiptHistory) ? currentEntry.receiptHistory : [];
  updateDocumentChecklistEntry(documentId, {
    receiptStatus: status,
    receiptSelectedAt: now,
    receiptSelectedBy: actor,
    receiptHistory: [...history, { status, at: now, user: actor }].slice(-30),
  }, `Receipt status: ${documentReceiptStatuses.find((item) => item.id === status)?.label || status}`);
}

function setDocumentWorkflowStatus(documentId, stageId, status) {
  const documentItem = documentChecklistDocuments().find((item) => String(item.id) === String(documentId));
  const stage = documentWorkflowStages.find((item) => item.id === stageId);
  if (!documentItem || !stage || !stage.statuses.some((item) => documentWorkflowStatusId(item) === status)) return;
  const currentEntry = checklistEntryFor(documentId);
  const workflow = normalizeDocumentWorkflow(currentEntry);
  const now = new Date().toISOString();
  const nextStage = workflow.stages[stageId] || { history: [] };
  const history = Array.isArray(nextStage.history) ? nextStage.history : [];
  const selectedIndex = stage.statuses.findIndex((item) => documentWorkflowStatusId(item) === status);
  const visitedStatuses = new Set(history.map((item) => String(item.status || "")));
  const skipped = { ...(nextStage.skipped && typeof nextStage.skipped === "object" ? nextStage.skipped : {}) };
  const skippedLabels = [];
  stage.statuses.forEach((item, index) => {
    const itemId = documentWorkflowStatusId(item);
    if (index <= selectedIndex) delete skipped[itemId];
    if (index > 0 && index < selectedIndex && !visitedStatuses.has(itemId)) {
      skipped[itemId] = { at: now, user: documentWorkflowActor() };
      skippedLabels.push(item);
    }
  });
  workflow.stages[stageId] = {
    ...nextStage,
    status,
    selectedAt: now,
    selectedBy: documentWorkflowActor(),
    skipped,
    history: [...history, { status, at: now, user: documentWorkflowActor() }].slice(-30),
  };
  const legacyStatus = stageId === "stage-3" && status === "approved" ? "verified" : stageId === "stage-1" ? ({ "not-started": "not-started", preparing: "preparing", "check-due": "under-review", "check-and-correction": "correction-required", "sent-to-student": "under-review", "sent-file-student": "under-review" }[status] || currentEntry.status || "not-started") : currentEntry.status || "not-started";
  updateDocumentChecklistEntry(documentId, { workflow, status: legacyStatus }, `${stage.label}: ${stage.statuses.find((item) => documentWorkflowStatusId(item) === status)}${skippedLabels.length ? ` · skipped: ${skippedLabels.join(", ")}` : ""}`);
}

function renderDocumentWorkflow(documentId, entry) {
  const workflow = normalizeDocumentWorkflow(entry);
  return `<div class="document-workflow">
    <div class="document-workflow-head"><div><strong>Document status workflow</strong><small>Complete each stage to unlock the next stage.</small></div><span><i data-lucide="timer" aria-hidden="true"></i>Live elapsed time</span></div>
    <div class="document-workflow-stages">${documentWorkflowStages.map((stage, index) => {
      const state = workflow.stages[stage.id] || {};
      const complete = documentWorkflowStageComplete(stage, state);
      const previousComplete = index === 0 || documentWorkflowStageComplete(documentWorkflowStages[index - 1], workflow.stages[documentWorkflowStages[index - 1].id]);
      const locked = !previousComplete || complete;
      const selected = state.status || "";
      const selectedLabel = stage.statuses.find((item) => documentWorkflowStatusId(item) === selected) || "Not selected";
      return `<section class="document-workflow-stage ${complete ? "is-complete" : ""} ${locked && !complete ? "is-locked" : ""}">
        <div class="document-workflow-stage-head"><div><span>${escapeHtml(stage.label)}</span><strong>${complete ? "Complete" : locked ? "Locked" : "Active"}</strong></div><i data-lucide="${complete ? "check-circle-2" : locked ? "lock-keyhole" : "circle-dot"}" aria-hidden="true"></i></div>
        <label class="document-workflow-status-field"><span>Status</span><select class="document-workflow-status" data-document-id="${escapeHtml(documentId)}" data-stage-id="${escapeHtml(stage.id)}" ${locked ? "disabled" : ""} aria-label="${escapeHtml(stage.label)} status"><option value="" ${selected ? "" : "selected"} disabled>Select status</option>${stage.statuses.map((status) => { const value = documentWorkflowStatusId(status); return `<option value="${value}" ${selected === value ? "selected" : ""}>${escapeHtml(status)}</option>`; }).join("")}</select></label>
        <div class="document-workflow-current"><b class="${documentStatusNeedsAttention(selectedLabel) ? "is-alert" : ""}">${escapeHtml(selectedLabel)}</b><span ${state.selectedAt ? `data-workflow-time data-started-at="${escapeHtml(state.selectedAt)}"` : ""}>${documentWorkflowElapsedLabel(state.selectedAt)}</span>${state.selectedBy ? `<em>· ${escapeHtml(state.selectedBy)}</em>` : ""}</div>
        ${renderDocumentWorkflowSkippedTags(stage, state)}
        ${stage.id === "stage-3" && selected === "sent-for-correction" && !complete ? `<button type="button" class="ghost-btn document-workflow-repeat" data-action="repeat-document-workflow-status" data-document-id="${escapeHtml(documentId)}" data-stage-id="${escapeHtml(stage.id)}" data-status="${escapeHtml(selected)}"><i data-lucide="rotate-cw" aria-hidden="true"></i>Repeat Sent for Correction</button>` : ""}
        ${locked && !complete ? `<small class="document-workflow-lock-note"><i data-lucide="info" aria-hidden="true"></i>Finish the previous stage to activate this stage.</small>` : complete ? `<small class="document-workflow-complete-note"><i data-lucide="check" aria-hidden="true"></i>Stage completed and archived in monochrome.</small>` : `<small class="document-workflow-active-note">Selection starts the timer and records the user.</small>`}
      </section>`;
    }).join("")}</div>
  </div>`;
}

function renderDocumentWorkflowSummary(documentId, entry) {
  const workflow = normalizeDocumentWorkflow(entry);
  let previousStageComplete = true;
  const flowNodes = documentWorkflowStages.flatMap((stage) => {
    const state = workflow.stages[stage.id] || {};
    const complete = documentWorkflowStageComplete(stage, state);
    const selectedIndex = stage.statuses.findIndex((item) => documentWorkflowStatusId(item) === state.status);
    const stageLocked = !previousStageComplete;
    const visibleStatuses = stageLocked ? [] : stage.statuses.slice(0, Math.max(selectedIndex + 1, 1));
    const nodes = visibleStatuses.map((status, statusIndex) => {
      const value = documentWorkflowStatusId(status);
      const current = !complete && selectedIndex === statusIndex;
      const passed = complete || selectedIndex > statusIndex;
      const skipped = Boolean(state.skipped?.[value]) && value !== state.status;
      const nodeClass = skipped ? "is-skipped" : complete ? "is-passed is-complete" : current ? "is-current" : passed ? "is-passed" : "is-next";
      const selectedDate = value === state.status ? documentWorkflowDateLabel(state.selectedAt) : "";
      const skippedDate = skipped ? documentWorkflowDateLabel(state.skipped[value]?.at) : "";
      return `<span class="document-workflow-flow-node ${nodeClass}" title="${escapeHtml(`${stage.label}: ${status}${skipped ? " · Skipped by user" : selectedDate ? ` · ${selectedDate}` : ""}`)}"><b>${escapeHtml(stage.label)}</b><em>${escapeHtml(status)}</em>${skipped ? `<small>Skipped by user${skippedDate ? ` · ${escapeHtml(skippedDate)}` : ""}</small>` : selectedDate ? `<small>${escapeHtml(selectedDate)}</small>` : ""}</span>`;
    });
    previousStageComplete = complete;
    return nodes;
  });
  return `<div class="document-workflow-summary" aria-label="Document stage status summary"><div class="document-workflow-flow" aria-label="Document workflow flow"><div class="document-workflow-flow-head"><strong>Workflow flow</strong><span>Updates live from the status dropdowns below</span></div><div class="document-workflow-flow-track">${flowNodes.join('<i class="document-workflow-flow-arrow" data-lucide="chevron-right" aria-hidden="true"></i>')}</div></div>${documentWorkflowStages.map((stage, index) => {
    const state = workflow.stages[stage.id] || {};
    const complete = documentWorkflowStageComplete(stage, state);
    const previousComplete = index === 0 || documentWorkflowStageComplete(documentWorkflowStages[index - 1], workflow.stages[documentWorkflowStages[index - 1].id]);
    const locked = !previousComplete || complete;
    const selected = state.status || "";
    const label = stage.statuses.find((item) => documentWorkflowStatusId(item) === state.status) || "Not selected";
    return `<span class="document-workflow-summary-item ${complete ? "is-complete" : locked ? "is-locked" : "is-active"} ${documentStatusNeedsAttention(label) ? "is-alert" : ""}"><b>${escapeHtml(stage.label)}</b><select class="document-workflow-status document-workflow-summary-select" data-document-id="${escapeHtml(documentId)}" data-stage-id="${escapeHtml(stage.id)}" ${locked ? "disabled" : ""} aria-label="${escapeHtml(stage.label)} status"><option value="" ${selected ? "" : "selected"} disabled>Select status</option>${stage.statuses.map((status) => { const value = documentWorkflowStatusId(status); return `<option value="${value}" ${selected === value ? "selected" : ""}>${escapeHtml(status)}</option>`; }).join("")}</select><em class="${documentStatusNeedsAttention(label) ? "is-alert" : ""}">${escapeHtml(label)}</em><small>${state.selectedAt ? `${escapeHtml(documentWorkflowDateTime(state.selectedAt))}${state.selectedBy ? ` · ${escapeHtml(state.selectedBy)}` : ""}` : "Not selected yet"}</small>${renderDocumentWorkflowSkippedTags(stage, state)}</span>`;
  }).join("")}</div>`;
}

function renderDocumentReceiptSummary(entry) {
  const label = documentReceiptStatusLabel(entry);
  return `<div class="document-receipt-summary ${documentStatusNeedsAttention(label) ? "is-alert" : ""}" aria-label="Document receipt status"><b>${escapeHtml(label)}</b><span>${entry.receiptSelectedAt ? escapeHtml(documentWorkflowDateTime(entry.receiptSelectedAt)) : "Not selected yet"}${entry.receiptSelectedBy ? ` · ${escapeHtml(entry.receiptSelectedBy)}` : ""}</span></div>`;
}

function renderDocumentReceiptControl(document, entry) {
  const selected = entry.receiptStatus || "not-received";
  return `<label class="document-receipt-status-control"><span>Receipt</span><select class="document-receipt-status" data-document-id="${escapeHtml(document.id)}" aria-label="${escapeHtml(document.name)} receipt status">${documentReceiptStatuses.map((item) => `<option value="${item.id}" ${selected === item.id ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}</select></label>`;
}

function documentWorkflowLastStatus(entry) {
  const workflow = normalizeDocumentWorkflow(entry);
  const updates = documentWorkflowStages.map((stage) => {
    const state = workflow.stages[stage.id] || {};
    const label = stage.statuses.find((item) => documentWorkflowStatusId(item) === state.status) || "Not selected";
    return { label, at: state.selectedAt || "", user: state.selectedBy || "" };
  }).filter((item) => item.at);
  if (!updates.length) return { label: documentWorkflowDisplayStatus(entry), at: "", user: "" };
  return updates.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())[0];
}

function renderDocumentLastStatus(entry, receiptMode) {
  const latest = receiptMode
    ? { label: documentReceiptStatusLabel(entry), at: entry.receiptSelectedAt || "", user: entry.receiptSelectedBy || "" }
    : documentWorkflowLastStatus(entry);
  const elapsed = latest.at ? `<span data-workflow-time data-started-at="${escapeHtml(latest.at)}">${documentWorkflowElapsedLabel(latest.at)}</span>` : "Not selected yet";
  return `<span class="document-last-status"><span>Last status</span><b class="${documentStatusNeedsAttention(latest.label) ? "is-alert" : ""}">${escapeHtml(latest.label)}</b><em>${elapsed}${latest.user ? ` · ${escapeHtml(latest.user)}` : ""}</em></span>`;
}

function documentChecklistFor(record = appState.activeApplicant) {
  data.documentChecklists ||= {};
  const key = documentChecklistRecordKey(record);
  const stored = data.documentChecklists[key] && typeof data.documentChecklists[key] === "object" ? data.documentChecklists[key] : {};
  let changed = false;
  documentChecklistDocuments().forEach((document) => {
    if (!stored[document.id]) {
      stored[document.id] = defaultDocumentChecklistEntry(document);
      changed = true;
    } else {
      stored[document.id] = { ...defaultDocumentChecklistEntry(document), ...stored[document.id], documentName: document.name, category: document.category };
    }
  });
  data.documentChecklists[key] = stored;
  if (changed) storeObject(storageKeys.documentChecklists, data.documentChecklists);
  return stored;
}

function checklistEntryFor(documentId, record = appState.activeApplicant) {
  return documentChecklistFor(record)[documentId] || {};
}

function checklistRequirementLabel(value) {
  return ({ required: "Required", "not-required": "Not Required", undecided: "Undecided" })[value] || "Undecided";
}

function updateDocumentChecklistEntry(documentId, patch, action = "Updated") {
  const record = appState.activeApplicant;
  if (!record) return;
  const checklist = documentChecklistFor(record);
  const current = checklist[documentId] || {};
  const next = { ...current, ...patch };
  const changedKeys = Object.keys(patch).filter((key) => String(current[key] ?? "") !== String(patch[key] ?? ""));
  if (!changedKeys.length) return;
  next.history = [...(Array.isArray(current.history) ? current.history : []), {
    at: new Date().toISOString(),
    action,
    changes: changedKeys.map((key) => `${key}: ${String(patch[key] ?? "")}`),
  }].slice(-20);
  checklist[documentId] = next;
  data.documentChecklists[documentChecklistRecordKey(record)] = checklist;
  storeObject(storageKeys.documentChecklists, data.documentChecklists);
  appendProfileLog(record, { type: "document-checklist", tab: "Document Check", dataModule: "Document Checklist", changes: [`${action}: ${next.documentName || documentId}`] });
}

function documentChecklistCounts(record = appState.activeApplicant) {
  const entries = Object.values(documentChecklistFor(record));
  return {
    required: entries.filter((entry) => entry.requirement === "required" && !entry.hidden).length,
    notRequired: entries.filter((entry) => entry.requirement === "not-required" && !entry.hidden).length,
    undecided: entries.filter((entry) => entry.requirement === "undecided" && !entry.hidden).length,
    hidden: entries.filter((entry) => entry.hidden).length,
    verified: entries.filter((entry) => entry.requirement === "required" && entry.status === "verified").length,
  };
}

function documentChecklistPentagonProgress(record = appState.activeApplicant) {
  const documents = documentChecklistDocuments();
  const checklist = documentChecklistFor(record);
  const requiredDocuments = documents.filter((document) => checklist[document.id]?.requirement === "required" && !checklist[document.id]?.hidden);
  const denominator = Math.max(requiredDocuments.length, 1);
  const phaseReached = (document, entry, phase) => {
    if (documentUsesReceiptStatus(document)) return entry.receiptStatus === "received";
    const workflow = normalizeDocumentWorkflow(entry);
    const stageIndex = (stageId) => {
      const stage = documentWorkflowStages.find((item) => item.id === stageId);
      const value = workflow.stages[stageId]?.status;
      return stage ? stage.statuses.findIndex((status) => documentWorkflowStatusId(status) === value) : -1;
    };
    const stage1 = stageIndex("stage-1");
    const stage2 = stageIndex("stage-2");
    const stage3 = stageIndex("stage-3");
    if (phase === "prepared") return stage1 >= 1 || stage2 >= 0 || stage3 >= 0;
    if (phase === "checked") return stage1 >= 2 || stage2 >= 1 || stage3 >= 1;
    if (phase === "sent") return stage1 >= 4 || stage2 >= 3 || stage3 >= 2;
    return stage3 >= 3;
  };
  const ratio = (phase) => Math.round((requiredDocuments.filter((document) => phaseReached(document, checklist[document.id], phase)).length / denominator) * 100);
  const axes = [
    { label: "Required", value: documents.length ? Math.round((requiredDocuments.length / documents.length) * 100) : 0 },
    { label: "Prepared", value: ratio("prepared") },
    { label: "Checked", value: ratio("checked") },
    { label: "Sent", value: ratio("sent") },
    { label: "Complete", value: ratio("complete") },
  ];
  return { axes, overall: Math.round(axes.reduce((sum, axis) => sum + axis.value, 0) / axes.length) };
}

function renderApplicantProgressPentagon(record) {
  const progress = documentChecklistPentagonProgress(record);
  const center = { x: 100, y: 86 };
  const radius = 54;
  const point = (index, scale = 1) => {
    const angle = (-Math.PI / 2) + (index * (Math.PI * 2 / 5));
    return `${(center.x + Math.cos(angle) * radius * scale).toFixed(1)},${(center.y + Math.sin(angle) * radius * scale).toFixed(1)}`;
  };
  const outer = progress.axes.map((_, index) => point(index)).join(" ");
  const middle = progress.axes.map((_, index) => point(index, .5)).join(" ");
  const values = progress.axes.map((axis, index) => point(index, Math.max(axis.value, 5) / 100)).join(" ");
  const labels = progress.axes.map((axis, index) => {
    const angle = (-Math.PI / 2) + (index * (Math.PI * 2 / 5));
    const x = center.x + Math.cos(angle) * (radius + 17);
    const y = center.y + Math.sin(angle) * (radius + 17);
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${escapeHtml(axis.label)}</text>`;
  }).join("");
  return `<section class="profile-pentagon-card" aria-label="Applicant checklist progress"><div class="profile-pentagon-head"><div><span>CHECKLIST PROGRESS</span><strong>5-point workflow</strong></div><b>${progress.overall}%</b></div><div class="profile-pentagon-chart"><svg viewBox="0 0 200 172" role="img" aria-label="${progress.overall}% checklist workflow progress"><polygon class="profile-pentagon-grid" points="${outer}"></polygon><polygon class="profile-pentagon-grid profile-pentagon-grid-mid" points="${middle}"></polygon>${progress.axes.map((_, index) => `<line class="profile-pentagon-axis" x1="${center.x}" y1="${center.y}" x2="${point(index).split(",")[0]}" y2="${point(index).split(",")[1]}"></line>`).join("")}<polygon class="profile-pentagon-value" points="${values}"></polygon>${progress.axes.map((axis, index) => `<circle class="profile-pentagon-dot" cx="${point(index, Math.max(axis.value, 5) / 100).split(",")[0]}" cy="${point(index, Math.max(axis.value, 5) / 100).split(",")[1]}" r="2.5"></circle>`).join("")}${labels}</svg></div><div class="profile-pentagon-legend">${progress.axes.map((axis) => `<span><b>${axis.value}%</b>${escapeHtml(axis.label)}</span>`).join("")}</div></section>`;
}

function renderApplicantChecklistSidebar(record) {
  const counts = documentChecklistCounts(record);
  return `<section class="profile-checklist-card">
    <div class="profile-checklist-card-head"><div><span class="profile-checklist-kicker">DOCUMENT CONTROL</span><h3><i data-lucide="clipboard-check" aria-hidden="true"></i>Checklist</h3></div><span class="profile-checklist-count">${counts.required}</span></div>
    <div class="profile-checklist-stats"><span><b>${counts.required}</b> Required</span><span><b>${counts.undecided}</b> Undecided</span><span><b>${counts.verified}</b> Verified</span></div>
    <p>Applicant-specific document requirements, receipts, deadlines and review notes.</p>
    <button class="profile-task-open profile-checklist-open" data-action="profile-tab" data-tab="Document Check"><i data-lucide="arrow-up-right" aria-hidden="true"></i>Open document checklist</button>
  </section>`;
}

function documentChecklistFilteredDocuments(record = appState.activeApplicant) {
  const query = String(appState.documentChecklistSearch || "").trim().toLowerCase();
  const category = appState.documentChecklistCategory || "All";
  return documentChecklistDocuments().filter((document) => {
    const entry = checklistEntryFor(document.id, record);
    if (category !== "All" && document.category !== category) return false;
    if (query && !`${document.name} ${document.category} ${document.note || ""} ${(document.subitems || []).join(" ")}`.toLowerCase().includes(query)) return false;
    if (appState.documentChecklistView === "master" && entry.requirement === "not-required") return false;
    if (appState.documentChecklistView !== "master" && entry.hidden && appState.documentChecklistView !== "hidden") return false;
    if (appState.documentChecklistView === "required" && entry.requirement !== "required") return false;
    if (appState.documentChecklistView === "not-required" && (entry.requirement !== "not-required" || entry.hidden)) return false;
    if (appState.documentChecklistView === "undecided" && (entry.requirement !== "undecided" || entry.hidden)) return false;
    if (appState.documentChecklistView === "hidden" && !entry.hidden) return false;
    return true;
  });
}

function renderDocumentChecklistCard(document, record) {
  const entry = checklistEntryFor(document.id, record);
  const receiptMode = documentUsesReceiptStatus(document);
  const workflowDisplayStatus = documentWorkflowDisplayStatus(entry);
  const displayStatus = receiptMode ? documentReceiptStatusLabel(entry) : workflowDisplayStatus;
  const expanded = Boolean(appState.documentChecklistExpanded[document.id]);
  const details = entry.requirement === "required" && expanded ? `<div class="document-checklist-details">
      <div class="document-checklist-field-grid">
        <label><span>Submission deadline</span><input type="date" data-checklist-entry-value="${document.id}" data-checklist-key="deadline" value="${escapeHtml(entry.deadline || "")}" /></label>
      </div>
      ${receiptMode ? `<div class="document-receipt-note"><i data-lucide="info" aria-hidden="true"></i><span>This document uses a simple Received / Not Received status. Correction stages are not required.</span></div>` : renderDocumentWorkflow(document.id, entry)}
      <div class="document-checklist-receipts"><span>Receipts</span><button type="button" class="checklist-receipt ${entry.pdfReceipt ? "is-checked" : ""}" data-action="toggle-checklist-receipt" data-document-id="${document.id}" data-receipt="pdf"><i data-lucide="file-text" aria-hidden="true"></i>PDF / Copy ${entry.pdfReceipt ? "✓" : ""}</button><button type="button" class="checklist-receipt ${entry.originalReceipt ? "is-checked" : ""}" data-action="toggle-checklist-receipt" data-document-id="${document.id}" data-receipt="original"><i data-lucide="file-check-2" aria-hidden="true"></i>Original ${entry.originalReceipt ? "✓" : ""}</button></div>
      <label class="document-checklist-wide-field"><span>Remarks</span><textarea data-checklist-entry-value="${document.id}" data-checklist-key="remarks" placeholder="Document-wise remarks">${escapeHtml(entry.remarks || "")}</textarea></label>
      <label class="document-checklist-wide-field"><span>Mistake report / correction notes</span><textarea data-checklist-entry-value="${document.id}" data-checklist-key="correctionNotes" placeholder="Record issues and corrections">${escapeHtml(entry.correctionNotes || entry.mistakeReport || "")}</textarea></label>
      <div class="document-checklist-card-actions"><button type="button" class="primary-btn" data-action="save-checklist-entry" data-document-id="${document.id}"><i data-lucide="save" aria-hidden="true"></i>Save document</button><button type="button" class="ghost-btn" data-action="show-checklist-history" data-document-id="${document.id}"><i data-lucide="history" aria-hidden="true"></i>Review history (${(entry.history || []).length})</button></div>
    </div>` : "";
  return `<article class="document-checklist-card ${expanded ? "is-expanded" : ""} status-${escapeHtml(entry.status || "not-started")}" data-document-card="${document.id}">
    <div class="document-checklist-card-head"><div class="document-checklist-title"><span class="document-checklist-icon"><i data-lucide="file-check-2" aria-hidden="true"></i></span><div><h3>${escapeHtml(document.name)}</h3><small>${escapeHtml(document.category)}${document.note ? ` · ${escapeHtml(document.note)}` : ""}</small>${entry.requirement === "required" ? renderDocumentLastStatus(entry, receiptMode) : ""}</div></div><div class="document-checklist-card-tools">${entry.requirement === "required" && receiptMode ? renderDocumentReceiptControl(document, entry) : ""}<span class="document-checklist-status-badge ${entry.requirement === "required" && documentStatusNeedsAttention(displayStatus) ? "is-alert" : ""}">${escapeHtml(entry.requirement === "required" ? displayStatus : checklistRequirementLabel(entry.requirement))}</span><button type="button" class="icon-button" data-action="toggle-checklist-card" data-document-id="${document.id}" aria-label="${expanded ? "Collapse" : "Expand"} ${escapeHtml(document.name)}">${expanded ? "⌃" : "⌄"}</button></div></div>
    ${document.subitems?.length ? `<div class="document-checklist-subitems">${document.subitems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
    ${entry.requirement === "required" ? (receiptMode ? renderDocumentReceiptSummary(entry) : renderDocumentWorkflowSummary(document.id, entry)) : ""}
    ${entry.requirement === "required" ? details : `<div class="document-checklist-decision-actions"><button type="button" class="primary-btn checklist-require-btn" data-action="set-checklist-requirement" data-document-id="${document.id}" data-requirement="required"><i data-lucide="circle-check" aria-hidden="true"></i>Required</button>${entry.requirement === "undecided" ? `<button type="button" class="ghost-btn checklist-not-required-btn" data-action="set-checklist-requirement" data-document-id="${document.id}" data-requirement="not-required">Not Required</button>` : ""}</div>`}
  </article>`;
}

function renderDocumentChecklistWorkspace(record) {
  const master = documentChecklistMaster();
  const counts = documentChecklistCounts(record);
  const categories = ["All", ...master.categories.map((group) => group.category)];
  const documents = documentChecklistFilteredDocuments(record);
  const grouped = categories.filter((category) => category !== "All" && documents.some((document) => document.category === category));
  const list = grouped.map((category) => `<section class="document-checklist-group"><div class="document-checklist-group-head"><h3>${escapeHtml(category)}</h3><span>${documents.filter((document) => document.category === category).length} shown</span></div>${documents.filter((document) => document.category === category).map((document) => renderDocumentChecklistCard(document, record)).join("")}</section>`).join("") || `<div class="document-checklist-empty">No documents match this view. Use the tabs above to review Required, Not Required, Undecided or Hidden documents.</div>`;
  return `<section class="profile-workspace document-checklist-workspace ${appState.documentChecklistFullscreen ? "is-fullscreen" : ""}">
    <div class="document-checklist-header"><div><span class="document-checklist-kicker">APPLICANT-SPECIFIC DOCUMENT CONTROL</span><h2>Document Checklist</h2><p>${escapeHtml(master.instructions || "")}</p></div><div class="document-checklist-header-actions"><button class="ghost-btn" data-action="print-document-checklist" data-report="summary"><i data-lucide="printer" aria-hidden="true"></i>A4 Summary</button><button class="ghost-btn" data-action="print-document-checklist" data-report="detail"><i data-lucide="file-text" aria-hidden="true"></i>Detailed Report</button><button class="icon-button" data-action="toggle-checklist-fullscreen" title="Full-screen workspace" aria-label="Full-screen workspace"><i data-lucide="maximize-2" aria-hidden="true"></i></button></div></div>
    <div class="document-checklist-metrics"><div><b>${documentChecklistDocuments().length}</b><span>Master documents</span></div><div class="is-required"><b>${counts.required}</b><span>Required</span></div><div class="is-undecided"><b>${counts.undecided}</b><span>Undecided</span></div><div class="is-verified"><b>${counts.verified}</b><span>Verified</span></div></div>
    <div class="document-checklist-toolbar"><div class="document-checklist-view-tabs"><button class="${appState.documentChecklistView === "master" ? "active" : ""}" data-action="set-checklist-view" data-view="master">Master <b>${documentChecklistDocuments().length}</b></button><button class="${appState.documentChecklistView === "required" ? "active" : ""}" data-action="set-checklist-view" data-view="required">Required <b>${counts.required}</b></button><button class="${appState.documentChecklistView === "not-required" ? "active" : ""}" data-action="set-checklist-view" data-view="not-required">Not Required <b>${counts.notRequired}</b></button><button class="${appState.documentChecklistView === "undecided" ? "active" : ""}" data-action="set-checklist-view" data-view="undecided">Undecided <b>${counts.undecided}</b></button><button class="${appState.documentChecklistView === "hidden" ? "active" : ""}" data-action="set-checklist-view" data-view="hidden">Hidden <b>${counts.hidden}</b></button></div><div class="document-checklist-filters"><input class="document-checklist-search" placeholder="Search documents..." value="${escapeHtml(appState.documentChecklistSearch)}" /><select class="document-checklist-category"><option value="All">All categories</option>${categories.slice(1).map((category) => `<option value="${escapeHtml(category)}" ${appState.documentChecklistCategory === category ? "selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select><button class="ghost-btn" data-action="toggle-checklist-details">${Object.keys(appState.documentChecklistExpanded).length ? "Collapse all" : "Expand all"}</button></div></div>
    <div class="document-checklist-note"><i data-lucide="shield-check" aria-hidden="true"></i><span>Master checklist is preserved per applicant. Changing a requirement keeps prior status and review history.</span></div>
    <div class="document-checklist-body">${list}</div>
  </section>`;
}

function toggleDocumentChecklistDetails(documentId) {
  const checklistScroll = captureChecklistScroll(documentId);
  appState.documentChecklistExpanded[documentId] = !appState.documentChecklistExpanded[documentId];
  render();
  restoreChecklistScroll(checklistScroll);
}

function saveDocumentChecklistEntry(button) {
  const documentId = String(button.dataset.documentId || "");
  const card = button.closest("[data-document-card]");
  if (!documentId || !card) return;
  const patch = {};
  card.querySelectorAll("[data-checklist-entry-value]").forEach((control) => { patch[control.dataset.checklistKey] = control.value; });
  const status = card.querySelector("[data-checklist-entry][data-checklist-key='status']");
  if (status) patch.status = status.value;
  const checklistScroll = captureChecklistScroll(documentId);
  updateDocumentChecklistEntry(documentId, patch, "Saved document checklist details");
  render();
  restoreChecklistScroll(checklistScroll);
  showToast("Document checklist saved.");
}

function showDocumentChecklistHistory(documentId) {
  const documentItem = documentChecklistDocuments().find((item) => String(item.id) === String(documentId));
  const entry = checklistEntryFor(documentId);
  const history = Array.isArray(entry.history) ? entry.history : [];
  const modal = document.createElement("div");
  modal.className = "document-checklist-history-backdrop";
  modal.innerHTML = `<div class="document-checklist-history" role="dialog" aria-label="Review history"><div class="account-action-head"><div><strong>${escapeHtml(documentItem?.name || "Document")} history</strong><small>Applicant-specific review timeline</small></div><button class="icon-button" data-action="close-checklist-history" title="Close">×</button></div>${history.length ? `<div class="document-checklist-history-list">${history.slice().reverse().map((item) => `<article><time>${escapeHtml(new Date(item.at).toLocaleString())}</time><strong>${escapeHtml(item.action)}</strong><p>${escapeHtml((item.changes || []).join(" · "))}</p></article>`).join("")}</div>` : `<div class="document-checklist-empty">No review history yet.</div>`}</div>`;
  document.body.appendChild(modal);
}

function printDocumentChecklist(report = "summary") {
  const record = appState.activeApplicant;
  const checklist = documentChecklistFor(record);
  const documents = documentChecklistDocuments().filter((document) => report === "detail" || checklist[document.id]?.requirement === "required");
  const rows = documents.map((document) => { const entry = checklist[document.id]; const status = entry.requirement === "required" ? documentWorkflowDisplayStatus(entry) : "—"; return `<tr><td>${escapeHtml(document.category)}</td><td>${escapeHtml(document.name)}</td><td>${escapeHtml(checklistRequirementLabel(entry.requirement))}</td><td>${escapeHtml(status)}</td><td>${escapeHtml(entry.deadline || "—")}</td><td>${escapeHtml(entry.remarks || entry.correctionNotes || "—")}</td></tr>`; }).join("");
  const reportWindow = window.open("", "sjla-document-checklist-report", "width=1100,height=800");
  if (!reportWindow) { showToast("Allow pop-ups to print the checklist report."); return; }
  reportWindow.document.write(`<title>${escapeHtml(record?.name || "Applicant")} — Document Checklist</title><style>body{font-family:Arial,sans-serif;color:#25374d;padding:28px}h1{font-size:22px}p{color:#61758b}table{border-collapse:collapse;width:100%;font-size:11px}th,td{border:1px solid #b9c8d8;padding:7px;text-align:left;vertical-align:top}th{background:#e8f0f7}@media print{@page{size:A4;margin:12mm}}</style><h1>${escapeHtml(record?.name || "Applicant")} — ${report === "detail" ? "Detailed" : "Summary"} Document Checklist</h1><p>Generated ${escapeHtml(new Date().toLocaleString())}</p><table><thead><tr><th>Category</th><th>Document</th><th>Requirement</th><th>Status</th><th>Deadline</th><th>Remarks</th></tr></thead><tbody>${rows}</tbody></table>`);
  reportWindow.document.close(); reportWindow.focus(); reportWindow.print();
}

function renderApplicantProfileWindow() {
  return `
    <div class="profile-window-overlay" role="dialog" aria-label="Applicant profile window">
      <div class="profile-window-frame">
        ${renderApplicantProfile()}
      </div>
    </div>
  `;
}

function profileTabIcon(tab) {
  const icons = {
    Detail: "contact-round",
    Home: "house",
    Education: "graduation-cap",
    "Document Check": "file-check-2",
    Application: "file-pen-line",
    Official: "landmark",
    Family: "users-round",
    Income: "wallet",
    "Account Records": "book-open-check",
    Templating: "layout-template",
  };
  return icons[tab] ? `<span class="profile-tab-icon" aria-hidden="true"><i data-lucide="${icons[tab]}"></i></span>` : "";
}

function renderProfileSubTabs(activeSubTab) {
  return `
    <nav class="profile-sub-tabs">
      ${profileSubTabs.map((tab) => `<button class="${tab === activeSubTab ? "active" : ""}" data-action="profile-sub-tab" data-tab="${escapeHtml(tab)}">${profileSubTabIcon(tab)}${escapeHtml(tab)}</button>`).join("")}
    </nav>
  `;
}

function profileSubTabIcon(tab) {
  const icons = {
    "Account Information": "contact-round",
    "Reference Number Setup": "list-ordered",
    "Transaction Records": "list-checks",
    "File History": "history",
  };
  return icons[tab] ? `<span class="profile-tab-icon" aria-hidden="true"><i data-lucide="${icons[tab]}"></i></span>` : "";
}

function renderProfileTabContent(tab, subTab, record) {
  if (tab === "Detail") return renderDetailOverview();
  if (tab === "Account Records") return renderAccountRecordsSubTab(subTab, record);
  if (tab === "Templating") return renderApplicantTemplating(record);
  if (tab === "Income") return renderIncomeSection(record);
  if (tab === "Document Check") return renderDocumentChecklistWorkspace(record);
  if (profileGridSections[tab]) return renderProfileGridSection(tab, record);
  return renderProfileFormSection(tab, profileFormFields[tab] || [], record);
}

function templateIsAssigned(entry, record = appState.activeApplicant) {
  if (!record) return false;
  const rows = profileSectionData(record).Templating?.rows || [];
  return rows.some((row) => String(row?.[0] || row?.Template || "") === String(entry?.name || ""));
}

function renderApplicantTemplating(record) {
  const entries = templateEntries();
  const assignedEntries = entries.filter((entry) => templateIsAssigned(entry, record));
  const assignedCount = assignedEntries.length;
  const assignedMarkup = assignedEntries.length
    ? `<section class="assigned-template-panel">
        <div class="assigned-template-head">
          <div><h3><span class="assigned-template-icon" aria-hidden="true">▣</span> Assigned templates <span class="assigned-template-count">${assignedCount}</span></h3><p>Templates ready for this applicant's saved data.</p></div>
          <span class="assigned-template-note">Download generates the applicant-ready file.</span>
        </div>
        <div class="assigned-template-grid">
          ${assignedEntries.map((entry) => `<article class="assigned-template-card">
            <div class="assigned-template-card-head">
              <span class="template-file-badge ${String(entry.format || "").toLowerCase().includes("excel") ? "is-excel" : "is-word"}" aria-hidden="true">${String(entry.format || "").toLowerCase().includes("excel") ? "X" : "W"}</span>
              <div><button class="assigned-template-title" data-action="template-preview" data-template-name="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</button><small>${escapeHtml(entry.group || "Uncategorized")}</small></div>
            </div>
            <div class="assigned-template-meta"><span>${escapeHtml(entry.format || "Document")}</span>${entry.codes?.length ? `<span>${entry.codes.length} codes</span>` : ""}</div>
            <div class="assigned-template-actions">
              <button class="template-download-btn" data-action="template-generate" data-template-name="${escapeHtml(entry.name)}">⇩ Download</button>
              <button class="template-preview-btn" data-action="template-preview" data-template-name="${escapeHtml(entry.name)}">◉ Preview</button>
              <button class="template-unassign-btn" data-action="template-unassign" data-template-name="${escapeHtml(entry.name)}" aria-label="Un-assign ${escapeHtml(entry.name)}">×</button>
            </div>
          </article>`).join("")}
        </div>
      </section>`
    : `<section class="assigned-template-panel assigned-template-empty"><div class="assigned-template-head"><div><h3><span class="assigned-template-icon" aria-hidden="true">▣</span> Assigned templates <span class="assigned-template-count">0</span></h3><p>Assign a template from the library below to make it available here.</p></div></div></section>`;
  return `<section class="profile-workspace templating-workspace">
    <div class="profile-section-head"><div><h2>Templating</h2><span>${assignedCount} assigned · ${entries.length} available</span></div></div>
    <p class="profile-note">Templates assigned here use Automation special codes. Preview resolves those codes against this applicant's saved profile data before a generated document is downloaded.</p>
    ${assignedMarkup}
    ${renderTemplateLibrary(entries, record, { showUpload: false })}
  </section>`;
}

function renderDetailOverview() {
  const detailTabs = ["Home", "Education", "Document Check", "Application", "Official", "Family", "Income"];
  const record = appState.activeApplicant || {};
  const sections = profileSectionData(record);
  const sectionConfig = [
    { name: "Home", fields: profileFormFields.Home },
    { name: "Education", fields: profileFormFields.Education, grids: [{ title: "Education", headers: profileGridSections.Education, rows: sections.Education?.rows }] },
    { name: "Document Check", fields: profileFormFields["Document Check"] },
    {
      name: "Application",
      fields: profileFormFields.Application,
      grids: [
        { title: "Japanese Course", headers: detailOverviewGridHeaders["Japanese Course"], rows: sections.Application?.japanese_course_rows },
        { title: "Work Experience", headers: detailOverviewGridHeaders["Work Experience"], rows: sections.Application?.work_experience_rows },
        { title: "Japanese Exam", headers: detailOverviewGridHeaders["Japanese Exam"], rows: sections.Application?.japanese_exam_rows },
      ],
    },
    { name: "Official", fields: profileFormFields.Official },
    { name: "Family", fields: profileFormFields.Family, grids: [{ title: "Family", headers: detailOverviewGridHeaders.Family, rows: sections.Family?.rows }] },
    { name: "Income", fields: profileFormFields.Income, grids: [{ title: "Income", headers: profileGridSections.Income, rows: sections.Income?.rows }] },
  ];
  return `
    <section class="profile-workspace detail-overview">
      <div class="detail-overview-header">
        <div>
          <h2>Detail</h2>
          <p>Saved applicant information collected from every profile section.</p>
        </div>
        <div class="detail-overview-identity">
          <span><b>ID</b> ${escapeHtml(record.id || "-")}</span>
          <span><b>Registered</b> ${escapeHtml(record.created || "-")}</span>
        </div>
      </div>
      <nav class="detail-overview-nav" aria-label="Detail sections">
        ${detailTabs.map((tab) => `<button class="detail-overview-nav-item" data-action="profile-tab" data-tab="${escapeHtml(tab)}">${profileTabIcon(tab)}<span>${escapeHtml(tab)}</span></button>`).join("")}
      </nav>
      <div class="detail-overview-sections">
        ${sectionConfig.map((config) => renderDetailOverviewSection(config, record)).join("")}
      </div>
    </section>
  `;
}

const detailOverviewGridHeaders = {
  "Japanese Course": ["#", "Title", "Started Date", "Ended Date", "Course Hour", "Studied Hour", "Grammar marks", "Listening marks", "Reading marks"],
  "Work Experience": ["#", "Title", "Company Name", "Post", "Address", "Started Date", "Ended Date", "Contact"],
  "Japanese Exam": ["#", "Title", "Exam Date", "Score", "Exam Level"],
  Family: ["#", "Type", "Name", "Gender", "A-F Relation", "F-A Relation", "Contact", "Occupation", "Dob", "Work Name", "Work Address", "Work Tel No", "Citizenship No"],
};

function detailOverviewValue(value) {
  if (value === 0 || value === "0") return "0";
  const normalized = String(value ?? "").trim();
  return normalized || "-";
}

function detailOverviewFallback(section, key, record) {
  const nameParts = String(record?.name || "").trim().split(/\s+/).filter(Boolean);
  const home = {
    applicant: record?.name,
    first_name: record?.firstName || nameParts[0],
    middle_name: record?.middleName || nameParts.slice(1, -1).join(" "),
    last_name: record?.lastName || nameParts.at(-1),
    gender: record?.gender,
  };
  const application = {
    phone_no: record?.phone,
    mobile_number_sms_purpose: record?.phone,
    temporary_address: record?.address || record?.completeAddress,
  };
  const official = {
    complete_address: record?.address || record?.completeAddress,
    passport_no: record?.passport,
    passport_expiry_date: record?.passportExpiry,
  };
  return ({ Home: home, Application: application, Official: official }[section] || {})[key] || "";
}

function renderDetailOverviewSection(config, record) {
  const section = profileSectionData(record)[config.name] || {};
  const fields = (config.fields || []).map((label) => {
    const key = fieldKey(label);
    const rawValue = section[key] ?? detailOverviewFallback(config.name, key, record);
    const value = config.name === "Income" && ["year1", "year2", "year3"].includes(key)
      ? normalizeFiscalYearValue(rawValue)
      : rawValue;
    return `<div class="detail-overview-field"><dt>${escapeHtml(String(label).replace(/\s*\*+\s*$/, ""))}</dt><dd>${escapeHtml(detailOverviewValue(value))}</dd></div>`;
  }).join("");
  const grids = (config.grids || []).map((grid) => renderDetailOverviewGrid(grid)).join("");
  return `
    <section class="detail-overview-section" id="detail-overview-${fieldKey(config.name)}">
      <div class="detail-overview-section-head">
        <div><span class="detail-overview-kicker">Profile section</span><h3>${escapeHtml(config.name)}</h3></div>
        <button class="ghost-btn detail-overview-open" data-action="profile-tab" data-tab="${escapeHtml(config.name)}">Edit &amp; save</button>
      </div>
      ${fields ? `<dl class="detail-overview-fields">${fields}</dl>` : ""}
      ${grids}
    </section>
  `;
}

function renderDetailOverviewGrid(grid) {
  const headers = grid.headers || [];
  const rows = Array.isArray(grid.rows) ? grid.rows : [];
  const rowValue = (row, header) => {
    if (Array.isArray(row)) return row[headers.indexOf(header)];
    const key = fieldKey(header);
    return row?.[key] ?? row?.[header];
  };
  return `
    <div class="detail-overview-grid">
      <div class="detail-overview-grid-head"><h4>${escapeHtml(grid.title || "Records")}</h4><span>${rows.length} record${rows.length === 1 ? "" : "s"}</span></div>
      <div class="detail-overview-table-wrap">
        <table class="detail-overview-table">
          <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>${rows.length ? rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHtml(detailOverviewValue(rowValue(row, header)))}</td>`).join("")}</tr>`).join("") : `<tr><td class="detail-overview-empty" colspan="${headers.length || 1}">No data</td></tr>`}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAccountRecordsSubTab(subTab, record) {
  if (subTab === "Account Information") return renderAccountInformation(record);
  if (subTab === "Reference Number Setup") return renderReferenceNumberSetup(record);
  if (subTab === "Transaction Records") return renderTransactionRecords(record);
  return renderFileHistory(record);
}

function renderAccountInformation(record) {
  const saved = accountSectionData(record, "Account Information");
  const exchangeDate = saved.exchange_date || accountInfoDefaultValue("Exchange Date *", record);
  const openingDate = saved.opening_date || accountInfoDefaultValue("Opening Date *", record);
  const interestCalculationDays = interestCalculationDaysForOpeningDate(openingDate);
  const accountValues = {
    ...saved,
    exchange_date: exchangeDate,
    draft_print_date: saved.draft_print_date || exchangeDate,
    interest_calculation_days: interestCalculationDays || saved.interest_calculation_days || "",
  };
  if (interestCalculationDays && String(saved.interest_calculation_days || "") !== String(interestCalculationDays)) {
    saved.interest_calculation_days = String(interestCalculationDays);
    storeObject(storageKeys.profileSections, data.profileSections);
  }
  const autoUpdateLocked = saved.auto_update_locked !== false;
  const savedInformationLocked = saved.saved_information_locked === true;
  return `
    <section class="profile-workspace account-records-workspace">
      <div class="profile-section-head">
        <h2>Account Information</h2>
      </div>
      <p class="profile-note">Information entered here is used for internal records, automation, calculation, and account draft formatting.</p>
      <div class="account-info-controls" aria-label="Account information controls">
        <label class="account-info-toggle"><input type="checkbox" data-action="toggle-account-info-auto-lock"${autoUpdateLocked ? " checked" : ""}${savedInformationLocked ? " disabled" : ""} /><span class="account-info-toggle-icon" aria-hidden="true">↻</span><span><strong>Automatic date &amp; rate sync</strong><small>${autoUpdateLocked ? "Closing date sets the next working day and NRB rate." : "Manual override enabled for dates and exchange rate."}</small></span></label>
        <label class="account-info-toggle lock-saved-toggle"><input type="checkbox" data-action="toggle-account-info-saved-lock"${savedInformationLocked ? " checked" : ""} /><span class="account-info-toggle-icon" aria-hidden="true">${savedInformationLocked ? "🔒" : "🔓"}</span><span><strong>Lock saved information</strong><small>${savedInformationLocked ? "Unlock to edit this Account Information." : "Lock after saving to prevent accidental edits."}</small></span></label>
      </div>
      <form class="profile-entry-form account-info-form" data-profile-section="Account Information">
        ${accountInfoFields.map((field) => renderAccountInfoField(field, accountValues[fieldKey(field.label)] ?? accountInfoDefaultValue(field.label, record), { autoUpdateLocked, savedInformationLocked, interestPosting: fieldKey(field.label) === "interest_calculation_days" ? previousInterestPostingForOpeningDate(openingDate) : null })).join("")}
      </form>
      <div class="account-info-actions">
        <button class="primary-btn" data-action="save-account-info"${savedInformationLocked ? " disabled" : ""}>Save</button>
      </div>
      ${renderAccountCalendar(saved)}
      ${renderAccountFamilyPicker(record)}
    </section>
  `;
}

function familyRowsForAccountImport(record = appState.activeApplicant) {
  const rows = profileSectionData(record).Family?.rows;
  return Array.isArray(rows) ? rows : [];
}

function familyRowValue(row, ...keys) {
  for (const key of keys) {
    const value = row?.[key] ?? row?.[fieldKey(key)];
    if (String(value ?? "").trim()) return String(value).trim();
  }
  return "";
}

function familyMemberAddress(row) {
  return familyRowValue(row, "Address", "Family Address", "Work Address", "F-A Address", "address", "work_address", "f_a_address");
}

function familyRowIsAccountHolder(row) {
  const value = row?.account_holder ?? row?.accountHolder ?? row?.is_account_holder ?? row?.account_holder_tag;
  return value === true || /^(?:true|yes|1|\$|account holder)$/i.test(String(value ?? "").trim());
}

function familyAccountHolderIndex(record = appState.activeApplicant) {
  return familyRowsForAccountImport(record).findIndex((row) => familyRowIsAccountHolder(row));
}

function syncAccountHolderFromFamily(record = appState.activeApplicant, rowIndex = familyAccountHolderIndex(record), { log = true } = {}) {
  if (!record || rowIndex < 0) return false;
  const row = familyRowsForAccountImport(record)[rowIndex];
  const name = familyRowValue(row, "Name", "name");
  if (!name) return false;
  const address = familyMemberAddress(row);
  const section = accountSectionData(record, "Account Information");
  const changes = [];
  [["account_holder_name", name, "Account Holder Name"], ["account_holder_address", address, "Account Holder Address"]].forEach(([field, value, label]) => {
    const nextValue = String(value || "").trim();
    const previousValue = String(section[field] || "").trim();
    if (previousValue !== nextValue) changes.push({ field: label, oldValue: previousValue, newValue: nextValue });
    section[field] = nextValue;
  });
  storeObject(storageKeys.profileSections, data.profileSections);
  if (log && changes.length) {
    appendProfileLog(record, { type: "changed", tab: "Family", dataModule: "Family", changes: [{ field: "Account holder ($) sync", oldValue: "", newValue: `${name}${address ? ` · ${address}` : ""}` }, ...changes] });
  }
  return true;
}

function renderFamilyAccountHolderControl(record, selectedIndex) {
  const rows = familyRowsForAccountImport(record);
  const selectionMode = appState.familyAccountHolderSelectionMode === true;
  const selected = selectedIndex >= 0 ? rows[selectedIndex] : null;
  const selectedName = selected ? familyRowValue(selected, "Name", "name") : "No family member selected";
  return `<div class="family-account-holder-bar" role="status">
    <div class="family-account-holder-copy"><span class="family-account-holder-symbol" aria-hidden="true">$</span><span><strong>Account holder</strong><small>${escapeHtml(selectedName)}${selected ? " · synced to Account Records" : " · select a family member below"}</small></span></div>
    ${selected ? `<button type="button" class="ghost-btn family-account-holder-change" data-action="change-family-account-holder">${selectionMode ? "Cancel" : "Change"}</button>` : `<span class="family-account-holder-help">Use $ to select one</span>`}
  </div>`;
}

function renderAccountFamilyPicker(record) {
  if (!appState.accountFamilyPickerOpen) return "";
  const rows = familyRowsForAccountImport(record);
  return `
    <div class="account-family-picker-backdrop" data-account-family-picker-dismiss>
      <div class="account-family-picker" role="dialog" aria-modal="true" aria-label="Import account holder from family">
        <div class="account-family-picker-head">
          <div><strong>Import Account Holder</strong><small>Select a saved family member</small></div>
          <button type="button" class="icon-button" data-action="close-account-family-picker" title="Close" aria-label="Close">×</button>
        </div>
        <div class="account-family-picker-list">
          ${rows.length ? rows.map((row, index) => {
            const name = familyRowValue(row, "Name", "name") || `${familyRowValue(row, "Type", "type") || "Family member"} ${index + 1}`;
            const relation = familyRowValue(row, "Type", "type", "F-A Relation", "f_a_relation");
            const address = familyMemberAddress(row);
            return `<button type="button" class="account-family-choice" data-action="select-account-family" data-family-index="${index}"><span class="account-family-choice-name">${escapeHtml(name)}</span><span class="account-family-choice-meta">${escapeHtml(relation || "Family member")} · ${escapeHtml(address || "Address not entered")}</span></button>`;
          }).join("") : `<p class="account-family-empty">No family members have been saved yet. Add a family member first.</p>`}
        </div>
      </div>
    </div>
  `;
}

function renderAccountInfoField(field, value = "", options = {}) {
  const name = fieldKey(field.label);
  const required = field.label.includes("*") ? "required" : "";
  const isDateField = field.action === "account-select-field";
  const isFamilyImport = field.action === "open-account-family-picker";
  const autoImport = field.autoImport || (name === "exchange_date" ? "Auto-set to the next working day after Closing Balance Date" : name === "draft_print_date" ? "Mirrors Exchange Date while automatic sync is locked" : name === "exchange_rate" ? "Auto-imported from NRB USD selling rate for the selected Exchange Date" : "");
  const interestPostingNote = name === "interest_calculation_days" && options.interestPosting?.date
    ? `<small class="interest-posting-alert">Last interest was posted on ${escapeHtml(formatLongAccountDate(options.interestPosting.date))}</small>`
    : "";
  const autoManaged = ["exchange_date", "draft_print_date", "exchange_rate"].includes(name);
  const locked = options.savedInformationLocked || field.locked === true || (options.autoUpdateLocked && autoManaged);
  const disabled = locked && (options.savedInformationLocked || name !== "exchange_rate");
  const input = field.type === "select"
    ? `<select name="${escapeHtml(name)}" ${required}${disabled ? " disabled" : ""}>${field.options.map((option) => `<option${String(option) === String(value) ? " selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`
    : `<input name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${required} ${locked ? `readonly aria-readonly="true" class="profile-locked-field" title="${escapeHtml(autoImport || "Automatically imported")}"` : ""} ${isDateField ? `data-action="open-account-calendar" data-field="${escapeHtml(name)}" readonly` : ""} />`;
  const action = field.action
    ? `<button type="button" class="ghost-btn account-inline-action ${isDateField ? "date-picker-trigger" : ""}" data-action="${escapeHtml(isDateField ? "open-account-calendar" : field.action)}" data-field="${escapeHtml(name)}" title="${isDateField ? "Open calendar" : escapeHtml(field.actionLabel)}"${(locked || options.savedInformationLocked) ? " disabled" : ""}>${isDateField ? '<span class="calendar-trigger-glyph" aria-hidden="true">🗓️</span>' : isFamilyImport ? `${escapeHtml(field.actionLabel)}` : escapeHtml(field.actionLabel)}</button>`
    : "";
  const hint = autoImport ? `<small class="auto-import-hint" title="${escapeHtml(autoImport)}"><span class="auto-import-icon" aria-hidden="true">↥</span>${escapeHtml(autoImport)}</small>` : "";
  const classes = [action ? "with-inline-action" : "", autoImport ? "auto-import-field" : ""].filter(Boolean).join(" ");
  return `<label class="${classes}"><span class="profile-field-label">${renderFieldLabel(field.label)}${hint}${interestPostingNote}</span><div>${input}${action}</div></label>`;
}

function renderAccountCalendar() {
  const field = appState.accountCalendarField;
  if (!field) return "";
  const selected = parseAccountDate(appState.accountCalendarSelected) || new Date();
  const monthDate = parseCalendarMonth(appState.accountCalendarMonth) || new Date(selected.getFullYear(), selected.getMonth(), 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());
  const cells = Array.from({ length: 42 }, (_, index) => new Date(year, month, 1 - firstDay.getDay() + index));
  const selectedKey = selected ? isoCalendarDate(selected) : "";
  const todayKey = isoCalendarDate(new Date());
  return `
    <div class="account-calendar" role="dialog" aria-label="Nepal holiday calendar">
      <div class="account-calendar-head">
        <button type="button" class="icon-button" data-action="calendar-prev-month" title="Previous month" aria-label="Previous month">‹</button>
        <strong>${escapeHtml(monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }))}</strong>
        <button type="button" class="icon-button" data-action="calendar-next-month" title="Next month" aria-label="Next month">›</button>
      </div>
      <div class="account-calendar-weekdays">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="account-calendar-grid">
        ${cells.map((date) => {
          const key = isoCalendarDate(date);
          const holiday = holidayNameForDate(date);
          const outside = date.getMonth() !== month;
          const selectedClass = key === selectedKey ? "is-selected" : "";
          const todayClass = key === todayKey ? "is-today" : "";
          const holidayClass = holiday ? "is-holiday" : "";
          return `<button type="button" class="account-calendar-day ${outside ? "is-outside" : ""} ${holidayClass} ${selectedClass} ${todayClass}" data-action="calendar-select-date" data-date="${key}" title="${escapeHtml(holiday || (key === todayKey ? "Today" : "Select date"))}">${date.getDate()}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function renderReferenceNumberSetup(record) {
  const saved = accountSectionData(record, "Reference Number Setup");
  const prefix = saved.reference_prefix ?? "";
  const startNo = saved.reference_start_no ?? "26366";
  const count = saved.number_of_references ?? "70";
  const notes = saved.reference_notes ?? generatedReferenceNumbers(prefix, startNo, count).join(", ");
  return `
    <section class="profile-workspace account-records-workspace">
      <div class="profile-section-head">
        <h2>Reference Number Setup</h2>
        <button class="primary-btn" data-action="generate-reference-numbers">Generate</button>
      </div>
      <p class="profile-note">This section is used to generate internal reference numbers for record linking and document formatting only.</p>
      <form class="profile-entry-form reference-setup-form" data-profile-section="Reference Number Setup">
        ${renderProfileField("Reference Prefix", prefix)}
        ${renderProfileField("Reference Start No", startNo)}
        ${renderProfileField("Number of References", count)}
        <label class="full-span"><span>Reference Notes</span><textarea name="reference_notes" placeholder="or Type reference numbers CSV (separated with comma)">${escapeHtml(notes)}</textarea></label>
      </form>
    </section>
  `;
}

function renderTransactionRecords(record) {
  const section = accountSectionData(record, "Transaction Records");
  const rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions;
  const visibleHeaders = accountVisibleColumns(section, "transaction", accountTransactionHeaders);
  const pageSize = Number(appState.accountTransactionPageSize) || 10;
  const filteredRows = accountFilteredRows(rows);
  const pageRows = filteredRows.slice(0, pageSize);
  return `
    <section class="profile-workspace account-records-workspace">
      <div class="account-record-toolbar">
        <div class="account-record-toolbar-primary">
          <button class="primary-btn" data-action="add-account-transaction"><i data-lucide="plus" aria-hidden="true">+</i>Add row</button>
          <button class="ghost-btn" data-action="copy-account-transactions"><i data-lucide="copy" aria-hidden="true">▣</i>Copy</button>
          <button class="primary-btn" data-action="calculate-account-transactions"><i data-lucide="calculator" aria-hidden="true">▦</i>Calculate</button>
          <button class="icon-button" data-action="account-overflow-menu" title="More" aria-label="More transaction actions"><i data-lucide="ellipsis-vertical" aria-hidden="true">⋮</i></button>
        </div>
        <div class="account-record-toolbar-secondary">
          <label class="account-record-search"><i data-lucide="search" aria-hidden="true">⌕</i><input class="filter-input account-record-filter" placeholder="Search to import..." aria-label="Search to import" /></label>
          <button class="icon-button" data-action="account-column-chooser" data-scope="transaction" title="Column Chooser" aria-label="Column Chooser"><i data-lucide="columns-3" aria-hidden="true">▤</i></button>
        </div>
      </div>
      ${renderAccountOverflowMenu()}
      ${renderAccountColumnChooser("transaction", accountTransactionHeaders, visibleHeaders)}
      <div class="profile-balance account-summary-bar"><i data-lucide="wallet-cards" aria-hidden="true">▣</i><span>${escapeHtml(accountBalanceLabel(rows, section))}</span></div>
      ${renderAccountTransactionPanel(appState.accountTransactionPanel, section)}
      <form class="profile-entry-form compact account-transaction-form" data-profile-section="Transaction Records">
        ${["Date", "#Days", "#Dr. Days", "Transaction By", "Debit", "Credit"].map((label) => renderProfileField(label, "")).join("")}
      </form>
      ${renderAccountTable(accountTransactionHeaders, visibleHeaders, pageRows, rows.length, rows)}
      <div class="account-page-sizes">
        ${[10, 25, 50, 100, 300].map((size) => `<button class="page-btn ${pageSize === size ? "active" : ""}" data-action="account-page-size" data-size="${size}">${size}</button>`).join("")}
        <button class="page-btn active" data-action="account-page-size" data-size="${pageSize}">1</button>
      </div>
    </section>
  `;
}

function renderAccountOverflowMenu() {
  if (!appState.accountOverflowOpen) return "";
  return `
    <div class="account-overflow-popover" role="menu" aria-label="Transaction Records actions">
      ${accountOverflowMenuItems.map(([action, icon, label, badge]) => `
        <button data-action="${escapeHtml(action)}" role="menuitem">
          <span class="account-menu-icon" aria-hidden="true"><i data-lucide="${escapeHtml(icon)}"></i></span>
          <span>${escapeHtml(label)}</span>
          ${badge ? `<b>${escapeHtml(badge)}</b>` : ""}
        </button>
      `).join("")}
    </div>
  `;
}

function renderAccountTransactionPanel(panel, section) {
  if (panel === "sample") return renderSampleRecordsPanel(section);
  if (panel === "import") return renderImportTransactionsPanel();
  if (panel === "prior") return renderPriorPeriodPanel(section);
  if (panel === "analysis") return renderTransactionAnalysisPanel(section);
  if (panel === "edit-person") return renderEditTransactionPersonPanel(section);
  return "";
}

function renderSampleRecordsPanel(section) {
  const settings = { ...defaultSampleRecordSettings(), ...(section.sample_settings || {}) };
  const rows = Array.isArray(section.sample_preview) ? section.sample_preview : [];
  const summary = sampleRecordSummary(rows);
  const figuresHidden = section.sample_figures_hidden === true;
  const selectedStyle = selectedAccountOutputStyle(appState.activeApplicant);
  const outputStyle = selectedStyle || "Not selected";
  const outputEntry = selectedStyle ? findTemplateEntry(selectedStyle) : null;
  const outputValidation = validateAccountOutput(appState.activeApplicant, selectedStyle, rows, outputEntry);
  return `
    <div class="account-action-panel sample-records-panel">
      <div class="account-action-head sample-records-head">
        <div><span class="sample-records-kicker">INTERNAL PREVIEW WORKSPACE</span><strong>Generate Sample Records</strong><small>Build, validate, preview, and save calculated transaction data.</small></div>
        <button class="icon-button" data-action="close-account-panel" title="Close" aria-label="Close sample records"><i data-lucide="x" aria-hidden="true">×</i></button>
      </div>
      <p class="profile-note sample-disclaimer">This section is used to generate sample records for internal testing, calculation, automation, and document preview purposes only. All figures are system-calculated estimates based on user-provided inputs. This system does not verify, certify, or validate any banking, financial, visa, or legal document.</p>
      <form class="profile-entry-form compact sample-records-form">
        ${renderSampleFigureField("Credit Amount Figures (CSV) *", "credit_amount_figures", settings.credit_amount_figures, figuresHidden)}
        ${renderSampleFigureField("Debit Amount Figures (CSV) *", "debit_amount_figures", settings.debit_amount_figures, figuresHidden)}
        <div class="sample-number-group full-span">
          <div class="sample-number-group-head"><strong>Generation controls</strong><span>Use separate entry counts and duration gaps for each side.</span></div>
          <div class="sample-number-grid">
            ${renderSampleNumberField("Credit Entries *", "credit_entries", settings.credit_entries)}
            ${renderSampleNumberField("Debit Entries *", "debit_entries", settings.debit_entries)}
            ${renderSampleNumberField("Total Credit Upto *", "total_credit_upto", settings.total_credit_upto)}
            ${renderSampleNumberField("Total Debit Upto *", "total_debit_upto", settings.total_debit_upto)}
            ${renderSampleNumberField("Credit gap (Minimum 5 days)", "credit_gap", settings.credit_gap)}
            ${renderSampleNumberField("Debit gap (Minimum 5 days)", "debit_gap", settings.debit_gap)}
          </div>
        </div>
      </form>
      <div class="sample-summary-grid">
        ${[
          ["Opening Balance (Estimated)", formatMoney(summary.opening)],
          ["Duration", `${summary.durationMonths} Months`],
          ["Total Credit (Calculated)", formatMoney(summary.credit)],
          ["Total Debit (Calculated)", formatMoney(summary.debit)],
          ["Calculated Balance", formatMoney(summary.balance)],
          ["Opening Date", summary.openingDate],
          ["Credit Entries", summary.creditEntries],
          ["Debit Entries", summary.debitEntries],
          ["Total Interest (Estimated)", formatMoney(summary.interest)],
          ["Tax (Estimated)", formatMoney(summary.tax)],
          ["Maximum Gap (Days)", `${summary.maximumGap} Day`],
        ].map(([label, value], index) => `<div class="${index < 5 ? "is-priority" : ""}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
      </div>
      <div class="sample-preview-heading">
        <div><span class="sample-records-kicker">CALCULATED OUTPUT</span><strong>Sample Generated Records</strong><small>Internal preview only · ${rows.length} records</small></div>
        <span class="sample-record-count">${rows.length}</span>
      </div>
      ${renderAccountOutputValidation(outputValidation)}
      <div class="account-style-output-card">
        <div class="account-style-output-info"><span>Output Document Style</span><strong>${escapeHtml(outputStyle)}</strong><small>${outputEntry ? `${escapeHtml(outputEntry.format)} template · transaction rows placed in [data]` : "Template not uploaded yet"}</small></div>
        <div class="account-panel-actions">
          <button class="ghost-btn" data-action="preview-account-style" ${outputEntry && !outputValidation.errors.length ? "" : "disabled"}>◉ Preview ${escapeHtml(outputStyle)}</button>
          <button class="primary-btn" data-action="download-account-style" ${outputEntry && !outputValidation.errors.length ? "" : "disabled"}>⇩ Download ${escapeHtml(outputStyle)}</button>
        </div>
      </div>
      <div class="sample-record-actions">
        <button class="ghost-btn" data-action="reset-sample-record-data">Reset template data to default</button>
        <button class="ghost-btn" data-action="regenerate-sample-records">Re-Generate</button>
        <button class="primary-btn" data-action="save-sample-records">Save</button>
      </div>
      ${renderSamplePreviewTable(rows)}
    </div>
  `;
}

function renderSampleFigureField(label, name, value, hidden) {
  const tone = name.startsWith("credit") ? "credit" : "debit";
  const icon = hidden ? "eye" : "eye-off";
  return `<div class="sample-figure-field full-span is-${tone}"><div class="sample-figure-head"><div><span>${escapeHtml(label)}</span><small>Comma-separated amounts used for randomized generation.</small></div><button type="button" class="ghost-btn sample-figure-toggle" data-action="toggle-sample-figures" title="${hidden ? "Show figures" : "Hide figures"}" aria-label="${hidden ? "Show figures" : "Hide figures"}"><i data-lucide="${icon}" aria-hidden="true">◉</i><span>Show / Hide</span></button></div><textarea name="${escapeHtml(name)}" class="${hidden ? "sample-figures-hidden" : ""}">${escapeHtml(value || "")}</textarea></div>`;
}

function renderSampleNumberField(label, name, value) {
  return `<label><span>${escapeHtml(label)}</span><input type="number" min="0" step="1" name="${escapeHtml(name)}" value="${escapeHtml(value ?? "")}" /></label>`;
}

function renderSamplePreviewTable(rows) {
  const headers = ["#", "Date", "Days", "Person", "Debit", "Credit"];
  return `<table class="profile-file-table account-record-table sample-preview-table">
    <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
    <tbody>${rows.length ? rows.map((row, index) => `<tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(row.date || "-")}</td>
      <td>${escapeHtml(row.days || "0")}</td>
      <td>${escapeHtml(row.transaction_by || "-")}</td>
      <td>${escapeHtml(row.debit || "-")}</td>
      <td>${escapeHtml(row.credit || "-")}</td>
    </tr>`).join("") : `<tr><td colspan="6">No generated records</td></tr>`}</tbody>
    <tfoot><tr><td colspan="6">Count ${rows.length}.</td></tr></tfoot></table>`;
}

function selectedAccountOutputStyle(record = appState.activeApplicant) {
  const saved = accountSectionData(record, "Account Information");
  const value = String(saved.output_document_style || "").trim();
  return accountOutputStyles.some((style) => style.name === value) ? value : "";
}

const accountStyleBankMap = {
  "Join PAN": "Join Saving & Credit Co-operative Ltd.",
  "Kapri PAN": "Kapri Saving & Credit Co-operative Ltd.",
  "Kashmira PAN": "Kashmira Saving & Credit Co-operative Ltd.",
  "Lakuri PAN": "Lakuri Saving and Credit Co-operative Ltd.",
  "Lok Dharma PAN": "Lok Dharma Saving & Credit Co-operative Ltd.",
  "Samanupatik PAN": "Samanupatik Saving & Credit Co-operative Ltd.",
  "Santoshi Mata PAN": "Santoshi Mata Saving & Credit Co-operative Ltd.",
  "Sarba-pran PAN": "Sarba-pran Saving & Credit Co-operative Ltd.",
  "Silver Star PAN": "Silver Star Saving & Credit Co-operative Ltd.",
  "Sumarga PAN": "Sumarga Saving & Credit Co-operative Ltd.",
  "Trinetra PAN": "Trinetra Multipurpose Co-operative Ltd.",
};

function accountBankForStyle(styleName) {
  const normalized = String(styleName || "").trim();
  if (!accountOutputStyles.some((style) => style.name === normalized)) return "";
  return accountStyleBankMap[normalized] || normalized;
}

function accountBankForRecord(record = appState.activeApplicant) {
  return accountBankForStyle(selectedAccountOutputStyle(record));
}

// NRB publishes daily foreign-exchange rates with separate buy and sell values.
// The automation's Exchange Rate field uses the USD selling rate, keyed to the
// selected Exchange Date.
const nrbExchangeRateCache = new Map();
const nrbFallbackSellingRates = {
  "2026-10-01": "153.64",
};

function nrbDateKey(value) {
  const date = parseAccountDate(value);
  return date ? isoCalendarDate(date) : "";
}

function nrbFallbackSellingRate(dateKey, record = appState.activeApplicant) {
  if (nrbFallbackSellingRates[dateKey]) return nrbFallbackSellingRates[dateKey];
  const account = record ? accountSectionData(record, "Account Information") : {};
  const savedDate = nrbDateKey(account.exchange_date);
  if (savedDate === dateKey && Number.isFinite(Number(String(account.exchange_rate || "").replace(/,/g, "")))) {
    return String(account.exchange_rate).replace(/,/g, "");
  }
  return "";
}

async function fetchNrbUsdSellingRate(exchangeDate) {
  const dateKey = nrbDateKey(exchangeDate);
  if (!dateKey) return null;
  if (nrbExchangeRateCache.has(dateKey)) return nrbExchangeRateCache.get(dateKey);
  const selected = parseAccountDate(exchangeDate);
  const from = new Date(selected);
  from.setDate(from.getDate() - 7);
  const fromKey = isoCalendarDate(from);
  const endpoint = `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=100&from=${fromKey}&to=${dateKey}`;
  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`NRB returned ${response.status}`);
    const payload = await response.json();
    const entries = Array.isArray(payload?.data?.payload) ? payload.data.payload : [];
    const matching = entries
      .filter((entry) => entry?.date && entry.date <= dateKey)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    for (const entry of matching) {
      const usd = (entry.rates || []).find((rate) => String(rate?.currency?.iso3 || "").toUpperCase() === "USD");
      const selling = Number.parseFloat(String(usd?.sell ?? "").replace(/,/g, ""));
      if (Number.isFinite(selling) && selling > 0) {
        const result = { rate: selling.toFixed(2), sourceDate: entry.date, exact: entry.date === dateKey, source: "NRB" };
        nrbExchangeRateCache.set(dateKey, result);
        return result;
      }
    }
  } catch (error) {
    console.warn("NRB exchange-rate lookup failed", error);
  }
  const fallback = nrbFallbackSellingRate(dateKey);
  const result = fallback ? { rate: Number(fallback).toFixed(2), sourceDate: dateKey, exact: false, source: "saved fallback" } : null;
  nrbExchangeRateCache.set(dateKey, result);
  return result;
}

async function applyNrbExchangeRateForDate(record, exchangeDate, { appendLog = true, target = "both" } = {}) {
  if (!record || !exchangeDate) return null;
  const result = await fetchNrbUsdSellingRate(exchangeDate);
  if (!result?.rate) return result;
  const profile = profileSectionData(record);
  const income = profile.Income || (profile.Income = {});
  const account = accountSectionData(record, "Account Information");
  const changes = [];
  const dateKey = nrbDateKey(exchangeDate);
  const updateAccount = target === "both" || target === "account" || (target === "income" && nrbDateKey(account.exchange_date) === dateKey);
  const updateIncome = target === "both" || target === "income" || (target === "account" && nrbDateKey(income.exchange_date) === dateKey);
  [[account, "Account Information", updateAccount], [income, "Income", updateIncome]].forEach(([section, tab, shouldUpdate]) => {
    if (!shouldUpdate) return;
    const previous = String(section.exchange_rate || "").trim();
    if (previous !== result.rate) {
      section.exchange_rate = result.rate;
      changes.push({ tab, oldValue: previous, newValue: result.rate });
    }
  });
  storeObject(storageKeys.profileSections, data.profileSections);
  if (appendLog && changes.length) {
    changes.forEach((change) => appendProfileLog(record, {
      type: "changed",
      tab: change.tab,
      dataModule: change.tab === "Income" ? "Income" : "Account Records",
      changes: [{ field: "Exchange Rate", oldValue: change.oldValue, newValue: change.newValue }],
    }));
  }
  return { ...result, changes };
}

function syncIncomeBankForStyle(record, styleName) {
  const bank = accountBankForStyle(styleName);
  if (!record || !bank) return null;
  const income = profileSectionData(record).Income || (profileSectionData(record).Income = {});
  const oldValue = String(income.bank || "").trim();
  if (oldValue === bank) return null;
  income.bank = bank;
  return { field: "Bank", oldValue, newValue: bank };
}

function validateAccountOutput(record, styleName, rows, entry, overrides = {}) {
  const account = overrides.accountInfo || accountSectionData(record, "Account Information");
  const transactionSection = overrides.transactionSection || accountSectionData(record, "Transaction Records");
  const errors = [];
  const required = [
    ["output_document_style", "Output Document Style"],
    ["account_holder_name", "Account Holder Name"],
    ["account_holder_address", "Account Holder Address"],
    ["account_reference_no", "Account Reference No"],
    ["interest_rate", "Interest Rate"],
    ["tax_rate", "Tax Rate"],
    ["opening_date", "Opening Date"],
    ["opening_amount", "Opening Amount"],
    ["interest_calculation_days", "Interest Calculation Days"],
    ["exchange_date", "Exchange Date"],
    ["exchange_rate", "Exchange Rate"],
  ];
  required.forEach(([key, label]) => {
    if (!String(account[key] ?? "").trim()) errors.push(`${label} is required.`);
  });
  if (!accountOutputStyles.some((style) => style.name === styleName)) errors.push("Choose a valid output document style.");
  if (!entry) errors.push(`${styleName || "Selected"} template is not uploaded.`);

  const openingDate = parseAccountDate(account.opening_date);
  const closingDate = parseAccountDate(account.closing_balance_date);
  if (account.opening_date && !openingDate) errors.push("Opening Date is not a valid date.");
  if (account.exchange_date && !parseAccountDate(account.exchange_date)) errors.push("Exchange Date is not a valid date.");
  if (account.draft_print_date && !parseAccountDate(account.draft_print_date)) errors.push("Print Date is not a valid date.");
  if (openingDate && closingDate && closingDate < openingDate) errors.push("Closing Balance Date must be on or after Opening Date.");

  const positiveNumbers = [
    ["interest_rate", "Interest Rate"],
    ["tax_rate", "Tax Rate"],
    ["opening_amount", "Opening Amount"],
    ["interest_calculation_days", "Interest Calculation Days"],
    ["exchange_rate", "Exchange Rate"],
  ];
  positiveNumbers.forEach(([key, label]) => {
    const value = Number(String(account[key] ?? "").replace(/,/g, "").trim());
    if (!Number.isFinite(value) || value < 0) errors.push(`${label} must be a non-negative number.`);
  });

  if (!Array.isArray(rows) || !rows.length) {
    errors.push("Generate or save transaction records before printing.");
  }
  const seenAmounts = new Set();
  const sampleMode = Array.isArray(transactionSection.sample_preview) && transactionSection.sample_preview.length > 0;
  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const rowLabel = `Transaction row ${index + 1}`;
    const date = parseAccountDate(row.date);
    if (!date) errors.push(`${rowLabel} has an invalid date.`);
    if (date && openingDate && date < openingDate) errors.push(`${rowLabel} is before the Opening Date.`);
    if (date && closingDate && date > closingDate) errors.push(`${rowLabel} is after the Closing Balance Date.`);
    const debit = moneyValue(row.debit);
    const credit = moneyValue(row.credit);
    if (debit > 0 && credit > 0) errors.push(`${rowLabel} cannot contain both Debit and Credit.`);
    if (debit < 0 || credit < 0) errors.push(`${rowLabel} contains a negative amount.`);
    if (debit > 0 || credit > 0) {
      const amount = debit > 0 ? debit : credit;
      if (!Number.isFinite(amount)) errors.push(`${rowLabel} has an invalid amount.`);
      if (sampleMode) {
        const amountKey = amount.toFixed(2);
        if (seenAmounts.has(amountKey)) errors.push(`${rowLabel} repeats an amount already used in the generated sample.`);
        seenAmounts.add(amountKey);
      }
    }
  });
  const financials = calculateTransactionFinancials(Array.isArray(rows) ? rows : [], account);
  if (!Number.isFinite(financials.balance)) errors.push("Calculated balance is not a valid number.");
  if (Number.isFinite(financials.balance) && financials.balance < 0) errors.push("Calculated balance cannot be negative.");
  if (sampleMode && Number.isFinite(financials.balance) && (financials.balance < 2300000 || financials.balance > 2800000)) {
    errors.push(`Generated sample balance must stay between 2,300,000.00 and 2,800,000.00 (calculated ${formatMoney(financials.balance)}).`);
  }
  return { errors: [...new Set(errors)], financials };
}

function renderAccountOutputValidation(validation) {
  if (!validation?.errors?.length) {
    return `<div class="account-output-validation is-valid"><strong>✓ Ready for preview and download</strong><span>Required account fields and transaction values passed the print check.</span></div>`;
  }
  return `<div class="account-output-validation has-errors" role="alert"><strong>Print blocked — fix ${validation.errors.length} issue${validation.errors.length === 1 ? "" : "s"} first</strong><ul>${validation.errors.slice(0, 8).map((error) => `<li>${escapeHtml(error)}</li>`).join("")}</ul>${validation.errors.length > 8 ? `<small>+ ${validation.errors.length - 8} more issue${validation.errors.length - 8 === 1 ? "" : "s"}</small>` : ""}</div>`;
}

function blockInvalidAccountOutput(validation) {
  const count = validation?.errors?.length || 0;
  if (!count) return false;
  showToast(`Print blocked: ${count} account record issue${count === 1 ? "" : "s"} must be fixed first.`);
  requestAnimationFrame(() => document.querySelector(".account-output-validation.has-errors")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  return true;
}

function withAccountOutputReferences(rows, record = appState.activeApplicant) {
  const referenceSection = accountSectionData(record, "Reference Number Setup");
  const configured = String(referenceSection.reference_notes || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const fallback = generatedReferenceNumbers(
    referenceSection.reference_prefix || "",
    referenceSection.reference_start_no || "26366",
    Math.max(rows.length, Number(referenceSection.number_of_references) || rows.length),
  );
  let transactionIndex = 0;
  return rows.map((row) => {
    const isPosting = ["interest", "tax", "opening"].includes(String(row._entry_type || "").toLowerCase());
    const reference = isPosting ? "" : (row.reference_no || configured[transactionIndex] || fallback[transactionIndex] || "");
    if (!isPosting) transactionIndex += 1;
    return { ...row, reference_no: reference };
  });
}

function sampleRowsForOutputStyle(record = appState.activeApplicant) {
  const section = accountSectionData(record, "Transaction Records");
  if (Array.isArray(section.sample_preview) && section.sample_preview.length) return withAccountOutputReferences(section.sample_preview.map((row) => ({ ...row })), record);
  if (Array.isArray(section.rows) && section.rows.length && section.rows.length > 1) return withAccountOutputReferences(section.rows.map((row) => ({ ...row })), record);
  const settings = sampleRecordSettings();
  const accountInfo = accountSectionData(record, "Account Information");
  return withAccountOutputReferences(buildStatementRows(generateSampleTransactions(settings, accountInfo), accountInfo).rows, record);
}

const accountStyleDateFormats = Object.fromEntries(accountOutputStyles.map((style) => [style.name, style.dateFormat]));

function formatTemplateAccountDate(value, styleName) {
  const date = parseAccountDate(value);
  if (!date) return String(value || "-");
  const pattern = accountStyleDateFormats[styleName] || "dd/MM/yyyy";
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const tokens = {
    yyyy: String(date.getFullYear()),
    yy: String(date.getFullYear()).slice(-2),
    MMM: month,
    MM: String(date.getMonth() + 1).padStart(2, "0"),
    M: String(date.getMonth() + 1),
    dd: String(date.getDate()).padStart(2, "0"),
    d: String(date.getDate()),
  };
  return pattern.replace(/yyyy|MMM|yy|MM|dd|M|d/g, (token) => tokens[token] || token);
}

function accountStatementDescription(row) {
  const entryType = String(row?._entry_type || "").toLowerCase();
  if (entryType === "interest") return "Interest Credit";
  if (entryType === "tax") return "Tax Deduction";
  const explicit = row?.description || row?.Description || row?.particular || row?.Particular;
  if (String(explicit || "").trim()) return String(explicit).trim();
  if (moneyValue(row?.debit) > 0) return "Cash Withdrawal";
  if (moneyValue(row?.credit) > 0) return "Cash Deposit";
  return "Opening Balance";
}

function accountStatementReference(row) {
  return String(row?.reference_no || row?.cheque_no || row?.cheque || "").trim() || "-";
}

function accountPreviewRows(styleName, rows, info) {
  const financials = calculateTransactionFinancials(rows, info);
  let runningBalance = moneyValue(info.opening_amount);
  return rows.map((row, index) => {
    const debit = moneyValue(row.debit);
    const credit = moneyValue(row.credit);
    runningBalance += credit - debit;
    const sourceBalance = moneyValue(row.balance);
    const balance = sourceBalance || runningBalance;
    return {
      number: index + 1,
      date: formatTemplateAccountDate(row.date, styleName),
      description: accountStatementDescription(row),
      reference: accountStatementReference(row),
      debit: debit > 0 ? formatMoney(debit) : "-",
      credit: credit > 0 ? formatMoney(credit) : "-",
      balance: formatMoney(balance || (index === rows.length - 1 ? financials.balance : 0)),
      entryType: String(row?._entry_type || "").toLowerCase(),
    };
  });
}

function accountPreviewDocumentPage(styleName, pageRows, pageNumber, pageCount, record, info, financials, showHeader) {
  const bank = accountBankForStyle(styleName) || "Account Statement";
  const holder = info.account_holder_name || record?.name || "Selected applicant";
  const address = info.account_holder_address || "-";
  const accountNo = info.account_reference_no || "-";
  const openingBalance = moneyValue(info.opening_amount);
  const printDate = info.draft_print_date || info.exchange_date || info.closing_balance_date;
  return `<article class="account-preview-page" data-page="${pageNumber}">
    ${showHeader ? `<header class="account-preview-header">
      <div class="account-preview-brand"><strong>${escapeHtml(bank)}</strong><span>${escapeHtml(styleName)} · Statement of Account</span></div>
      <div class="account-preview-currency">Currency: NPR</div>
      <h2>Statement of Account</h2>
      <div class="account-preview-meta-grid">
        <div><span>Account No.</span><strong>${escapeHtml(accountNo)}</strong></div>
        <div><span>Account Type</span><strong>${escapeHtml(info.account_type || "-")}</strong></div>
        <div><span>Interest Rate</span><strong>${escapeHtml(info.interest_rate || "-")}%</strong></div>
        <div><span>Tax Rate</span><strong>${escapeHtml(info.tax_rate || "-")}%</strong></div>
        <div class="wide"><span>Name</span><strong>${escapeHtml(holder)}</strong></div>
        <div class="wide"><span>Permanent Address</span><strong>${escapeHtml(address)}</strong></div>
        <div><span>From</span><strong>${escapeHtml(formatTemplateAccountDate(info.opening_date, styleName))}</strong></div>
        <div><span>To</span><strong>${escapeHtml(formatTemplateAccountDate(info.closing_balance_date, styleName))}</strong></div>
        <div><span>Printed Date</span><strong>${escapeHtml(formatTemplateAccountDate(printDate, styleName))}</strong></div>
        <div><span>Account Opening Date</span><strong>${escapeHtml(formatTemplateAccountDate(info.account_open_date, styleName))}</strong></div>
      </div>
    </header>` : `<div class="account-preview-repeat-head"><strong>${escapeHtml(styleName)}</strong><span>Statement of Account · ${escapeHtml(holder)}</span></div>`}
    <table class="account-preview-transactions"><thead><tr><th>#</th><th>Date</th><th>Cheque No.</th><th>Particulars</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead>
      <tbody>${pageRows.length ? pageRows.map((row) => `<tr class="${row.entryType ? `is-${escapeHtml(row.entryType)}` : ""}"><td>${row.number}</td><td>${escapeHtml(row.date)}</td><td>${escapeHtml(row.reference)}</td><td>${escapeHtml(row.description)}</td><td class="money">${escapeHtml(row.debit)}</td><td class="money">${escapeHtml(row.credit)}</td><td class="money">${escapeHtml(row.balance)}</td></tr>`).join("") : `<tr><td colspan="7">No generated records</td></tr>`}</tbody>
    </table>
    ${pageNumber === pageCount ? `<footer class="account-preview-summary"><div><span>Opening Balance</span><strong>${escapeHtml(formatMoney(openingBalance))}</strong></div><div><span>Total Debit</span><strong>${escapeHtml(formatMoney(financials.debit))}</strong></div><div><span>Total Credit</span><strong>${escapeHtml(formatMoney(financials.credit))}</strong></div><div><span>Closing Balance</span><strong>${escapeHtml(formatMoney(financials.balance))}</strong></div><div><span>Interest / Tax</span><strong>${escapeHtml(formatMoney(financials.interest))} / ${escapeHtml(formatMoney(financials.tax))}</strong></div></footer>` : ""}
    <div class="account-preview-page-number">Page ${pageNumber} of ${pageCount}</div>
  </article>`;
}

function outputStylePreviewHtml(styleName, rows, record) {
  const info = accountSectionData(record, "Account Information");
  const financials = calculateTransactionFinancials(rows, info);
  const preparedRows = accountPreviewRows(styleName, rows, info);
  const pageSize = 18;
  const pages = [];
  for (let index = 0; index < preparedRows.length; index += pageSize) pages.push(preparedRows.slice(index, index + pageSize));
  if (!pages.length) pages.push([]);
  return `<div class="document-preview account-style-preview rendered-account-document">
    <div class="account-preview-toolbar"><div><strong>${escapeHtml(styleName)} · rendered template preview</strong><span>${preparedRows.length} generated records · ${pages.length} A4 pages</span></div><span class="account-preview-live-dot">● Live data</span></div>
    <div class="account-preview-pages">${pages.map((pageRows, index) => accountPreviewDocumentPage(styleName, pageRows, index + 1, pages.length, record, info, financials, index === 0)).join("")}</div>
  </div>`;
}

function previewAccountStyleDocument() {
  const record = appState.activeApplicant;
  if (!record) return;
  const styleName = selectedAccountOutputStyle(record);
  const rows = sampleRowsForOutputStyle(record);
  const validation = validateAccountOutput(record, styleName, rows, findTemplateEntry(styleName));
  if (blockInvalidAccountOutput(validation)) return;
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `<div class="drawer-head"><div><strong>${escapeHtml(styleName)} Preview</strong><small>Generated sample records</small></div><div class="drawer-head-actions"><button class="icon-button" data-action="toggle-account-preview-fullscreen" title="Full screen" aria-label="Open preview in full screen"><i data-lucide="maximize-2" aria-hidden="true">⛶</i></button><button class="icon-button" data-action="close-drawer" title="Close" aria-label="Close preview">×</button></div></div>${outputStylePreviewHtml(styleName, rows, record)}`;
  drawer.classList.add("open");
  if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
}

function renderImportTransactionsPanel() {
  return `
    <div class="account-action-panel">
      <div class="account-action-head">
        <strong>Import from CSV</strong>
        <button class="icon-button" data-action="close-account-panel" title="Close">×</button>
      </div>
      <p class="profile-note">Paste CSV in Automation order: Date, #Days, #Dr. Days, Transaction By, Debit, Credit.</p>
      <textarea class="account-csv-input" placeholder="21 Aug, 2025, Thu,1,,Sarita,42500,"></textarea>
      <div class="account-panel-actions"><button class="primary-btn" data-action="apply-csv-import">Import from CSV</button></div>
    </div>
  `;
}

function renderPriorPeriodPanel(section) {
  const rows = ensurePriorPeriodPreview(section);
  const meta = section.prior_period_meta || priorPeriodMeta(section, rows);
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  const financials = calculateTransactionFinancials(rows, {
    ...accountInfo,
    opening_date: meta.start,
    closing_balance_date: meta.end,
  });
  const dates = rows.map((row) => parseAccountDate(row.date)).filter(Boolean).sort((a, b) => a - b);
  const gaps = rows.map((row) => Number(row.days) || 0).filter(Boolean);
  return `
    <div class="account-action-panel prior-period-panel">
      <div class="account-action-head">
        <strong>Prior Period Transaction Records (Preview)</strong>
        <span class="account-new-badge">NEW</span>
        <button class="icon-button" data-action="close-account-panel" title="Close">×</button>
      </div>
      <p class="profile-note">Derived from the current Transaction Records using the immediately preceding period. It does not change current records until imported.</p>
      <div class="sample-summary-grid prior-period-summary-grid">
        ${[
          ["Prior Period Start", meta.start],
          ["Prior Period End", meta.end],
          ["Duration", `${meta.durationDays} days`],
          ["Debit Entries", financials.debitEntries],
          ["Credit Entries", financials.creditEntries],
          ["Total Debit", formatMoney(financials.debit)],
          ["Total Credit", formatMoney(financials.credit)],
          ["Estimated Balance", formatMoney(financials.balance)],
          ["Interest (Estimated)", formatMoney(financials.interest)],
          ["Tax (Estimated)", formatMoney(financials.tax)],
          ["Maximum Gap", `${gaps.length ? Math.max(...gaps) : 0} days`],
          ["Source Records", `${meta.sourceCount} current rows`],
        ].map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
      </div>
      <div class="account-panel-actions">
        <button class="ghost-btn" data-action="regenerate-prior-period">Re-Generate Preview</button>
        <button class="primary-btn" data-action="import-prior-period">Import Prior Period</button>
      </div>
      ${renderAccountTable(accountTransactionHeaders, accountTransactionHeaders, rows, rows.length, rows)}
    </div>
  `;
}

function ensurePriorPeriodPreview(section) {
  if (!Array.isArray(section.prior_period_preview) || !section.prior_period_preview.length) {
    section.prior_period_preview = generatePriorPeriodTransactions(section);
    section.prior_period_meta = priorPeriodMeta(section, section.prior_period_preview);
    storeObject(storageKeys.profileSections, data.profileSections);
  }
  return section.prior_period_preview;
}

function clearPriorPeriodPreview(section) {
  section.prior_period_preview = [];
  section.prior_period_meta = null;
}

function priorPeriodMeta(section, rows = []) {
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  const currentRows = (Array.isArray(section.rows) ? section.rows : [])
    .map((row) => ({ row, date: parseAccountDate(row.date) }))
    .filter((item) => item.date)
    .sort((a, b) => a.date - b.date);
  const currentStart = currentRows[0]?.date || parseAccountDate(accountInfo.opening_date) || new Date(2025, 7, 20);
  const currentEnd = currentRows.at(-1)?.date || parseAccountDate(accountInfo.closing_balance_date) || new Date(2026, 7, 19);
  const durationDays = Math.max(1, Math.round((currentEnd - currentStart) / 86400000) + 1);
  const priorStart = new Date(currentStart.getTime() - durationDays * 86400000);
  const priorEnd = new Date(currentEnd.getTime() - durationDays * 86400000);
  const previewDates = rows.map((row) => parseAccountDate(row.date)).filter(Boolean).sort((a, b) => a - b);
  return {
    start: formatAccountDate(previewDates[0] || priorStart),
    end: formatAccountDate(previewDates.at(-1) || priorEnd),
    durationDays,
    sourceCount: currentRows.length || rows.length,
  };
}

function generatePriorPeriodTransactions(section) {
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  const sourceRows = (Array.isArray(section.rows) ? section.rows : [])
    .map((row) => ({ ...row, dateObject: parseAccountDate(row.date) }))
    .filter((row) => row.dateObject)
    .sort((a, b) => a.dateObject - b.dateObject);
  const currentStart = sourceRows[0]?.dateObject || parseAccountDate(accountInfo.opening_date) || new Date(2025, 7, 20);
  const currentEnd = sourceRows.at(-1)?.dateObject || parseAccountDate(accountInfo.closing_balance_date) || new Date(2026, 7, 19);
  const durationDays = Math.max(1, Math.round((currentEnd - currentStart) / 86400000) + 1);
  const priorStart = new Date(currentStart.getTime() - durationDays * 86400000);
  const priorEnd = new Date(currentEnd.getTime() - durationDays * 86400000);
  const rows = sourceRows.length ? sourceRows : generateSampleTransactions({
    ...defaultSampleRecordSettings(),
    opening_date: formatAccountDate(priorStart),
    closing_balance_date: formatAccountDate(priorEnd),
    sample_seed: `prior-period-${appState.activeApplicant?.id || "applicant"}`,
  }).map((row) => ({ ...row, dateObject: parseAccountDate(row.date) }));
  const shifted = rows.map((row, index) => {
    const shiftedDate = new Date(row.dateObject.getTime() - durationDays * 86400000);
    const date = nearestWorkingDate(shiftedDate, priorStart, priorEnd);
    return {
      calculate: "",
      [fieldKey("#")]: String(index + 1),
      date: formatAccountDate(date),
      days: "0",
      dr_days: row.dr_days || "",
      transaction_by: row.transaction_by || "Self",
      debit: row.debit || "",
      credit: row.credit || "",
      reference_no: "",
      _entry_type: row._entry_type || "transaction",
      _bs_date: row._bs_date || "",
      _source: "prior-period",
    };
  });
  shifted.sort((a, b) => parseAccountDate(a.date) - parseAccountDate(b.date));
  shifted.forEach((row, index) => {
    row[fieldKey("#")] = String(index + 1);
    const current = parseAccountDate(row.date);
    const previous = index ? parseAccountDate(shifted[index - 1].date) : current;
    row.days = String(index ? Math.max(0, Math.round((current - previous) / 86400000)) : 0);
  });
  return shifted;
}

function nearestWorkingDate(date, start, end) {
  const candidate = new Date(date);
  if (candidate >= start && candidate <= end && isTransactionWorkingDay(candidate)) return candidate;
  for (let offset = 1; offset <= 31; offset += 1) {
    const earlier = new Date(candidate.getTime() - offset * 86400000);
    if (earlier >= start && isTransactionWorkingDay(earlier)) return earlier;
    const later = new Date(candidate.getTime() + offset * 86400000);
    if (later <= end && isTransactionWorkingDay(later)) return later;
  }
  return candidate < start ? new Date(start) : new Date(end);
}

function renderTransactionAnalysisPanel(section) {
  const rows = Array.isArray(section.rows) ? section.rows : [];
  const debit = rows.reduce((sum, row) => sum + moneyValue(row.debit), 0);
  const credit = rows.reduce((sum, row) => sum + moneyValue(row.credit), 0);
  const people = [...new Set(rows.map((row) => row.transaction_by).filter(Boolean))];
  return `
    <div class="account-action-panel transaction-analysis-panel">
      <div class="account-action-head">
        <strong>Transaction Analysis</strong>
        <button class="icon-button" data-action="close-account-panel" title="Close">×</button>
      </div>
      <div class="account-analysis-grid">
        <div><span>Debit Entries</span><strong>${rows.filter((row) => moneyValue(row.debit) > 0).length}</strong></div>
        <div><span>Credit Entries</span><strong>${rows.filter((row) => moneyValue(row.credit) > 0).length}</strong></div>
        <div><span>Total Debit</span><strong>${formatMoney(debit)}</strong></div>
        <div><span>Total Credit</span><strong>${formatMoney(credit)}</strong></div>
        <div><span>Transaction Persons</span><strong>${people.length}</strong></div>
        <div><span>Duration</span><strong>${section.duration_months || "-"} months</strong></div>
      </div>
    </div>
  `;
}

function renderEditTransactionPersonPanel(section) {
  const rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions;
  const people = [...new Set(rows.map((row) => row.transaction_by).filter(Boolean))];
  return `
    <div class="account-action-panel">
      <div class="account-action-head">
        <strong>Edit Transaction Person</strong>
        <button class="icon-button" data-action="close-account-panel" title="Close">×</button>
      </div>
      <form class="profile-entry-form compact edit-person-form">
        <label><span>Current Person</span><select name="current_person">${people.map((person) => `<option>${escapeHtml(person)}</option>`).join("")}</select></label>
        ${renderProfileField("New Person", people[0] || "Self")}
      </form>
      <div class="account-panel-actions"><button class="primary-btn" data-action="apply-transaction-person-edit">Save Person</button></div>
    </div>
  `;
}

function renderAccountTable(headers, visibleHeaders, rows, totalRows, sourceRows = rows) {
  return `
    <table class="profile-file-table account-record-table">
      <thead><tr>${visibleHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.length ? rows.map((row) => `<tr>${visibleHeaders.map((header) => `<td>${renderAccountCell(header, row[fieldKey(header)], sourceRows.indexOf(row), row)}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${visibleHeaders.length}">No data</td></tr>`}
      </tbody>
      <tfoot><tr><td colspan="${visibleHeaders.length}">Count ${totalRows}.</td></tr></tfoot>
    </table>
  `;
}

function renderAccountCell(header, value, index, row) {
  if (header === "Calculate") return `<input type="checkbox" data-action="toggle-account-transaction-select" data-index="${index}" aria-label="Select transaction" ${row?._selected ? "checked" : ""} />`;
  return escapeHtml(value || "-");
}

function renderAccountColumnChooser(scope, headers, visibleHeaders) {
  const isOpen = scope === "transaction" ? appState.accountColumnChooserOpen === scope : appState.accountFileColumnChooserOpen;
  if (!isOpen) return "";
  const query = (scope === "transaction" ? appState.accountColumnSearch : appState.accountFileColumnSearch).trim().toLowerCase();
  const filtered = headers.filter((header) => !query || header.toLowerCase().includes(query));
  return `
    <div class="column-chooser-popover account-column-chooser">
      <h3>Column Chooser</h3>
      <div class="column-search-wrap"><span>⌕</span><input class="account-column-chooser-search" data-scope="${escapeHtml(scope)}" placeholder="Search" value="${escapeHtml(scope === "transaction" ? appState.accountColumnSearch : appState.accountFileColumnSearch)}" /></div>
      <div class="column-chooser-list">
        ${filtered.map((header) => `
          <label>
            <span></span>
            <input type="checkbox" data-action="toggle-account-column" data-scope="${escapeHtml(scope)}" data-column="${escapeHtml(header)}"${visibleHeaders.includes(header) ? " checked" : ""} />
            <span>${escapeHtml(header)}</span>
          </label>
        `).join("")}
      </div>
      <button class="ghost-btn" data-action="close-account-column-chooser" data-scope="${escapeHtml(scope)}">Cancel</button>
    </div>
  `;
}

function renderProfileFormSection(section, fields, record, options = {}) {
  const saved = profileSectionData(record)[section] || {};
  return `
    <section class="profile-workspace">
      <div class="profile-section-head">
        <h2>${escapeHtml(section)}</h2>
      </div>
      ${options.notes ? `<p class="profile-note">This section is used to generate internal reference numbers for record linking and document formatting only.</p>` : ""}
      <form class="profile-entry-form" data-profile-section="${escapeHtml(section)}">
        ${fields.map((label) => renderProfileField(label, saved[fieldKey(label)] ?? profileInitialValue(section, label, record), { translation: section === "Home" ? homeTranslationFor(label) : null })).join("")}
      </form>
      <div class="profile-section-actions">
        <button class="primary-btn" data-action="save-profile-form" data-section="${escapeHtml(section)}">Save</button>
        ${options.action ? `<button class="primary-btn" data-action="save-profile-form" data-section="${escapeHtml(section)}">${escapeHtml(options.action)}</button>` : ""}
      </div>
    </section>
  `;
}

function renderIncomeCalendar() {
  const field = appState.incomeCalendarField;
  if (!field) return "";
  const selected = parseAccountDate(appState.incomeCalendarSelected) || new Date();
  const monthDate = parseCalendarMonth(appState.incomeCalendarMonth) || new Date(selected.getFullYear(), selected.getMonth(), 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const cells = Array.from({ length: 42 }, (_, index) => new Date(year, month, 1 - firstDay.getDay() + index));
  const selectedKey = isoCalendarDate(selected);
  const todayKey = isoCalendarDate(new Date());
  return `
    <div class="account-calendar income-calendar" role="dialog" aria-label="Income date calendar">
      <div class="account-calendar-head">
        <button type="button" class="icon-button" data-action="income-calendar-prev-month" title="Previous month" aria-label="Previous month">‹</button>
        <strong>${escapeHtml(monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }))}</strong>
        <button type="button" class="icon-button" data-action="income-calendar-next-month" title="Next month" aria-label="Next month">›</button>
      </div>
      <div class="account-calendar-weekdays">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="account-calendar-grid">
        ${cells.map((date) => {
          const key = isoCalendarDate(date);
          const holiday = holidayNameForDate(date);
          const outside = date.getMonth() !== month;
          const selectedClass = key === selectedKey ? "is-selected" : "";
          const todayClass = key === todayKey ? "is-today" : "";
          const holidayClass = holiday ? "is-holiday" : "";
          return `<button type="button" class="account-calendar-day ${outside ? "is-outside" : ""} ${holidayClass} ${selectedClass} ${todayClass}" data-action="income-calendar-select-date" data-date="${key}" title="${escapeHtml(holiday || (key === todayKey ? "Today" : "Select date"))}">${date.getDate()}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function openIncomeCalendar(field) {
  const input = document.querySelector(`.profile-entry-form[data-profile-section="Income"] [name="${cssEscape(field)}"]`);
  if (!input) return;
  const selected = input.value ? parseAccountDate(input.value) : new Date();
  appState.incomeCalendarField = field;
  appState.incomeCalendarSelected = input.value || "";
  appState.incomeCalendarMonth = isoCalendarDate(new Date(selected.getFullYear(), selected.getMonth(), 1));
  render();
}

function closeIncomeCalendar() {
  appState.incomeCalendarField = "";
  appState.incomeCalendarMonth = "";
  appState.incomeCalendarSelected = "";
  render();
}

function moveIncomeCalendarMonth(offset) {
  const current = parseCalendarMonth(appState.incomeCalendarMonth) || new Date();
  appState.incomeCalendarMonth = isoCalendarDate(new Date(current.getFullYear(), current.getMonth() + offset, 1));
  render();
}

async function selectIncomeCalendarDate(value) {
  const date = parseCalendarMonth(value);
  if (!date) return;
  const field = appState.incomeCalendarField;
  const input = document.querySelector(`.profile-entry-form[data-profile-section="Income"] [name="${cssEscape(field)}"]`);
  const record = appState.activeApplicant;
  if (!input || !record) return;
  const selectedValue = formatLongAccountDate(date);
  const section = profileSectionData(record).Income || (profileSectionData(record).Income = {});
  const previous = String(section[field] || "").trim();
  section[field] = selectedValue;
  let rateResult = null;
  if (field === "exchange_date") {
    rateResult = await applyNrbExchangeRateForDate(record, selectedValue, { target: "income" });
  }
  storeObject(storageKeys.profileSections, data.profileSections);
  if (previous !== selectedValue) {
    appendProfileLog(record, {
      type: "changed",
      tab: "Income",
      dataModule: "Income",
      changes: [{ field: field === "document_date" ? "Document Date" : "Exchange Date", oldValue: previous, newValue: selectedValue }],
    });
  }
  appState.incomeCalendarField = "";
  appState.incomeCalendarMonth = "";
  appState.incomeCalendarSelected = "";
  render();
  const rateMessage = field === "exchange_date" && rateResult?.rate
    ? ` NRB USD selling rate ${rateResult.rate}${rateResult.exact ? "" : ` (latest available rate on ${rateResult.sourceDate})`} applied.`
    : field === "exchange_date" ? " NRB rate was not available for this date." : "";
  showToast(`${selectedValue} selected for ${field === "document_date" ? "Document Date" : "Exchange Date"}.${rateMessage}`);
}

function syncIncomeFiscalYearsFromDom(year1Value) {
  const startYear = fiscalYearStartBsFromValue(year1Value);
  if (!Number.isFinite(startYear)) return;
  const form = document.querySelector('.profile-entry-form[data-profile-section="Income"]');
  if (!form) return;
  const derivedYears = {
    year1: fiscalYearLabel(startYear),
    year2: fiscalYearLabel(startYear + 1),
    year3: fiscalYearLabel(startYear + 2),
  };
  const section = profileSectionData(appState.activeApplicant).Income || (profileSectionData(appState.activeApplicant).Income = {});
  Object.entries(derivedYears).forEach(([field, value]) => {
    section[field] = value;
    const input = form.elements[field];
    if (input) input.value = value;
  });
  storeObject(storageKeys.profileSections, data.profileSections);
}

function renderIncomeSection(record) {
  const saved = profileSectionData(record).Income || {};
  const rows = Array.isArray(saved.rows) ? saved.rows : [];
  const totals = ["year1", "year2", "year3"].map((year) => rows.reduce(
    (total, row) => total + incomeAmountValue(row[year] ?? row[year.replace("year", "Year")]),
    0,
  ));
  const headers = profileGridSections.Income;
  const visibleHeaders = profileVisibleColumns("Income", headers, record);
  const incomeAutoImportNotes = {
    year2: "Auto-selected as the fiscal year after Year 1",
    year3: "Auto-selected as the second fiscal year after Year 1",
    bank: "Auto-imported from Account Records output document style",
    exchange_rate: "Auto-imported from NRB USD selling rate for the selected Exchange Date",
  };
  const incomeDateFields = new Set(["document_date", "exchange_date"]);
  return `
    <section class="profile-workspace income-workspace">
      <div class="profile-section-head"><h2>Income</h2></div>
      <p class="profile-note income-ratio-note"><strong>Bank and Annual Income Ratio:</strong> This value is used by account records and document templates to compare bank-supported annual income with the declared annual income. Formula: <code>(bank-supported annual income ÷ declared annual income) × 100</code>. The Bank field is locked and follows the bank mapped to the selected Account Records output template.</p>
      <form class="profile-entry-form" data-profile-section="Income">
        ${profileFormFields.Income.map((label) => {
          const name = fieldKey(label);
          const options = {};
          if (label === "Bank" || name === "exchange_rate") {
            options.locked = true;
            options.autoImport = incomeAutoImportNotes[name] || incomeAutoImportNotes.bank;
          } else if (incomeAutoImportNotes[name]) {
            options.locked = true;
            options.autoImport = incomeAutoImportNotes[name];
          }
          if (incomeDateFields.has(name)) options.datePicker = true;
          const account = accountSectionData(record, "Account Information");
          const rawValue = label === "Bank"
            ? accountBankForRecord(record)
            : name === "exchange_rate"
            ? saved[name] || account.exchange_rate || profileInitialValue("Income", label, record)
            : saved[name] ?? profileInitialValue("Income", label, record);
          const value = ["year1", "year2", "year3"].includes(name) ? normalizeFiscalYearValue(rawValue) : rawValue;
          return renderProfileField(label, value, options);
        }).join("")}
      </form>
      ${renderIncomeCalendar()}
      <div class="profile-section-actions">
        <button class="primary-btn" data-action="save-profile-form" data-section="Income">Save</button>
      </div>
      <div class="profile-section-head income-grid-head">
        <h3>Income</h3>
        <button class="primary-btn" data-action="add-profile-row" data-section="Income">Add New Income</button>
      </div>
      <table class="profile-file-table income-table">
        <thead><tr>${visibleHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}<th class="profile-row-actions-head">Actions</th></tr></thead>
        <tbody>
          ${rows.length ? rows.map((row, rowIndex) => `<tr>${visibleHeaders.map((header) => `<td>${escapeHtml(profileRowValue(row, header, headers) || "-")}</td>`).join("")}<td class="profile-row-actions">${profileRowEditButton("Income", rowIndex)}</td></tr>`).join("") : `<tr><td colspan="${visibleHeaders.length + 1}">No data</td></tr>`}
        </tbody>
        <tfoot><tr><td colspan="${visibleHeaders.length + 1}">Totals · Year1 ${formatMoney(totals[0])} · Year2 ${formatMoney(totals[1])} · Year3 ${formatMoney(totals[2])}</td></tr></tfoot>
      </table>
    </section>
  `;
}

function renderProfileField(label, value = "", options = {}) {
  const name = fieldKey(label);
  const isLong = !options.singleLine && /remarks|address|notes/i.test(label);
  const required = label.includes("*") ? "required" : "";
  const selectOptions = profileSelectOptions[name] || educationDateSelectOptions[name];
  const isEducationTitle = name === "title";
  const isEducationDate = Object.prototype.hasOwnProperty.call(educationDateSelectOptions, name);
  const selectPlaceholder = isEducationTitle ? "Title" : String(label).replace(/\s*\*+\s*$/, "");
  const locked = options.locked === true;
  const isDatePicker = options.datePicker === true;
  const input = locked
    ? `<input name="${escapeHtml(name)}" value="${escapeHtml(value)}" placeholder=" " ${required} readonly aria-readonly="true" class="profile-locked-field" title="${escapeHtml(options.autoImport || "Automatically imported")}" />`
    : isDatePicker
    ? `<div class="profile-date-control"><input name="${escapeHtml(name)}" value="${escapeHtml(value)}" placeholder=" " ${required} readonly data-action="open-income-calendar" data-field="${escapeHtml(name)}" /><button type="button" class="ghost-btn date-picker-trigger" data-action="open-income-calendar" data-field="${escapeHtml(name)}" title="Open calendar" aria-label="Open calendar"><span class="calendar-trigger-glyph" aria-hidden="true">🗓️</span></button></div>`
    : selectOptions
    ? renderProfileSelect(name, label, value, selectOptions, required, isEducationTitle || isEducationDate ? selectPlaceholder : "")
    : isLong
    ? `<textarea name="${escapeHtml(name)}" ${required}>${escapeHtml(value)}</textarea>`
    : `<input name="${escapeHtml(name)}" value="${escapeHtml(value)}" placeholder=" " ${required} />`;
  const translation = options.translation;
  const translatedInput = translation && !selectOptions && !isLong
    ? `<div class="translated-field-control">${input}<button type="button" class="translate-field-btn" data-action="open-translation" data-source-field="${escapeHtml(translation.source)}" data-target-field="${escapeHtml(name)}" data-language="${escapeHtml(translation.language)}" title="Translate text to ${escapeHtml(translation.language)}" aria-label="Translate text to ${escapeHtml(translation.language)}">文</button></div>`
    : input;
  const autoImport = options.autoImport
    ? `<small class="auto-import-hint" title="${escapeHtml(options.autoImport)}"><span class="auto-import-icon" aria-hidden="true">↥</span>${escapeHtml(options.autoImport)}</small>`
    : "";
  return `<label class="${options.autoImport ? "auto-import-field" : ""}"><span class="profile-field-label">${renderFieldLabel(label)}${autoImport}</span>${translatedInput}</label>`;
}

function renderProfileSelect(name, label, value, options, required, placeholder = "") {
  const firstOption = options[0] || "";
  const selectedValue = String(value || (placeholder ? "" : firstOption));
  const displayValue = selectedValue || placeholder || firstOption;
  const fiscalMarkers = ["year1", "year2", "year3"].includes(name) ? fiscalYearMarkers() : null;
  return `
    <div class="profile-select" data-profile-select>
      <input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(selectedValue)}" ${required} />
      <button type="button" class="profile-select-trigger" data-action="toggle-profile-select" data-field="${escapeHtml(name)}" aria-haspopup="listbox" aria-expanded="false">
        <span class="profile-select-value${selectedValue ? "" : " is-placeholder"}">${escapeHtml(displayValue)}</span>
        <span class="profile-select-chevron" aria-hidden="true">⌄</span>
      </button>
      <div class="profile-select-menu" role="listbox" aria-label="${escapeHtml(label.replace(/\s*\*+\s*$/, ""))}" hidden>
        ${options.map((option) => {
          const isCurrent = fiscalMarkers?.current === String(option);
          const isPrior = fiscalMarkers?.prior === String(option);
          const classes = ["profile-select-option", String(option) === selectedValue ? "is-selected" : "", isCurrent ? "is-current-fiscal" : "", isPrior ? "is-prior-fiscal" : ""].filter(Boolean).join(" ");
          const marker = isCurrent ? " · Current" : isPrior ? " · Two years back" : "";
          return `<button type="button" class="${classes}" data-action="select-profile-option" data-field="${escapeHtml(name)}" data-value="${escapeHtml(option)}" role="option" aria-selected="${String(option) === selectedValue ? "true" : "false"}">${escapeHtml(option)}${marker ? `<small class="fiscal-option-marker">${escapeHtml(marker)}</small>` : ""}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function closeProfileSelectMenus(except = null) {
  document.querySelectorAll("[data-profile-select].is-open").forEach((root) => {
    if (root === except) return;
    root.classList.remove("is-open");
    root.querySelector(".profile-select-menu")?.setAttribute("hidden", "");
    root.querySelector(".profile-select-trigger")?.setAttribute("aria-expanded", "false");
  });
}

function toggleProfileSelect(button) {
  const root = button.closest("[data-profile-select]");
  if (!root) return;
  const willOpen = !root.classList.contains("is-open");
  closeProfileSelectMenus(root);
  root.classList.toggle("is-open", willOpen);
  root.querySelector(".profile-select-menu")?.toggleAttribute("hidden", !willOpen);
  button.setAttribute("aria-expanded", String(willOpen));
}

function selectProfileOption(button) {
  const root = button.closest("[data-profile-select]");
  const hidden = root?.querySelector("input[type=hidden]");
  const trigger = root?.querySelector(".profile-select-trigger");
  const value = button.dataset.value || "";
  if (!root || !hidden || !trigger) return;
  hidden.value = value;
  hidden.dataset.optionIndex = button.dataset.optionIndex || "0";
  const display = root.querySelector(".profile-select-value");
  if (display) {
    display.textContent = value;
    display.classList.toggle("is-placeholder", !value);
  }
  root.querySelectorAll(".profile-select-option").forEach((option) => {
    const selected = option === button;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-selected", String(selected));
  });
  if (root.closest('.profile-entry-form[data-profile-section="Income"]') && hidden.name === "year1") {
    syncIncomeFiscalYearsFromDom(value);
  }
  closeProfileSelectMenus();
  hidden.dispatchEvent(new Event("change", { bubbles: true }));
}

function homeTranslationFor(label) {
  const normalized = String(label || "").replace(/\s*\*+\s*$/, "");
  const match = normalized.match(/^(Name|First Name|Middle Name|Last Name) in (Japanese|Nepali)$/);
  if (!match) return null;
  return { source: match[1] === "Name" ? "Applicant" : match[1], language: match[2] };
}

const localTranslationWords = {
  Japanese: {
    susan: "スーザン",
    danuwar: "ダヌワール",
    tirkha: "ティルカ",
    dhan: "ダン",
    kumari: "クマリ",
    kanwar: "カンワール",
    adhikari: "アディカリ",
    adhikary: "アディカリ",
    karki: "カルキ",
    shrestha: "シュレスタ",
    tamang: "タマン",
    lama: "ラマ",
    magar: "マガル",
    test: "テスト",
    kumar: "クマール",
  },
  Nepali: {
    susan: "सुसन",
    danuwar: "दनुवार",
    tirkha: "तिर्खा",
    dhan: "धन",
    kumari: "कुमारी",
    kanwar: "कंवर",
    adhikari: "अधिकारी",
    adhikary: "अधिकारी",
    karki: "कार्की",
    shrestha: "श्रेष्ठ",
    tamang: "तामाङ",
    lama: "लामा",
    magar: "मगर",
    test: "टेस्ट",
    kumar: "कुमार",
  },
};

const localTranslationPhrases = {
  Japanese: { "susan danuwar": "スーザン ダヌワール", "tirkha b.k.": "ティルカ B.K.", "dhan kumari kanwar": "ダン クマリ カンワール", "test test test kumar": "テスト テスト テスト クマール", "adhikari": "アディカリ" },
  Nepali: { "susan danuwar": "सुसन दनुवार", "tirkha b.k.": "तिर्खा वि.के.", "dhan kumari kanwar": "धन कुमारी कंवर", "test test test kumar": "टेस्ट टेस्ट टेस्ट कुमार", "adhikari": "अधिकारी" },
};

const nepaliRomanConsonants = [
  ["ksh", "क्ष"], ["gny", "ज्ञ"], ["gy", "ज्ञ"], ["chh", "छ"], ["jh", "झ"], ["kh", "ख"], ["gh", "घ"], ["th", "थ"], ["dh", "ध"], ["ph", "फ"], ["bh", "भ"], ["sh", "श"],
  ["k", "क"], ["g", "ग"], ["c", "क"], ["j", "ज"], ["t", "त"], ["d", "द"], ["n", "न"], ["p", "प"], ["b", "ब"], ["m", "म"], ["y", "य"], ["r", "र"], ["l", "ल"], ["v", "व"], ["w", "व"], ["s", "स"], ["h", "ह"],
].sort((a, b) => b[0].length - a[0].length);

const nepaliRomanVowels = [
  ["aa", "आ", "ा"], ["ii", "ई", "ी"], ["ee", "ई", "ी"], ["uu", "ऊ", "ू"], ["oo", "ऊ", "ू"], ["ai", "ऐ", "ै"], ["au", "औ", "ौ"], ["ri", "ऋ", "ृ"],
  ["a", "अ", ""], ["i", "इ", "ि"], ["u", "उ", "ु"], ["e", "ए", "े"], ["o", "ओ", "ो"],
].sort((a, b) => b[0].length - a[0].length);

function transliterateNepaliWord(value) {
  const lower = String(value || "").toLowerCase();
  if (!lower) return "";
  const direct = localTranslationWords.Nepali[lower];
  if (direct) return direct;
  let output = "";
  let index = 0;
  while (index < lower.length) {
    const consonant = nepaliRomanConsonants.find(([roman]) => lower.startsWith(roman, index));
    if (consonant) {
      output += consonant[1];
      index += consonant[0].length;
      const vowel = nepaliRomanVowels.find(([roman]) => lower.startsWith(roman, index));
      if (vowel) {
        output += vowel[2];
        index += vowel[0].length;
      }
      continue;
    }
    const vowel = nepaliRomanVowels.find(([roman]) => lower.startsWith(roman, index));
    if (vowel) {
      output += vowel[1];
      index += vowel[0].length;
      continue;
    }
    output += lower[index];
    index += 1;
  }
  return output;
}

const japaneseRomanSyllables = [
  ["dhi", "ディ"], ["kya", "キャ"], ["sha", "シャ"], ["shi", "シ"], ["shu", "シュ"], ["sho", "ショ"],
  ["cha", "チャ"], ["chi", "チ"], ["chu", "チュ"], ["cho", "チョ"], ["tsu", "ツ"], ["thi", "ティ"],
  ["khu", "ク"], ["kha", "カ"], ["bha", "バ"], ["bhi", "ビ"], ["ph", "フ"], ["kh", "ク"],
  ["aa", "アー"], ["ee", "イー"], ["oo", "ウー"], ["a", "ア"], ["i", "イ"], ["u", "ウ"], ["e", "エ"], ["o", "オ"],
  ["ka", "カ"], ["ki", "キ"], ["ku", "ク"], ["ke", "ケ"], ["ko", "コ"], ["ga", "ガ"], ["gi", "ギ"], ["gu", "グ"], ["ge", "ゲ"], ["go", "ゴ"],
  ["ta", "タ"], ["ti", "ティ"], ["tu", "トゥ"], ["te", "テ"], ["to", "ト"], ["da", "ダ"], ["di", "ディ"], ["du", "ドゥ"], ["de", "デ"], ["do", "ド"],
  ["na", "ナ"], ["ni", "ニ"], ["nu", "ヌ"], ["ne", "ネ"], ["no", "ノ"], ["ma", "マ"], ["mi", "ミ"], ["mu", "ム"], ["me", "メ"], ["mo", "モ"],
  ["ra", "ラ"], ["ri", "リ"], ["ru", "ル"], ["re", "レ"], ["ro", "ロ"], ["la", "ラ"], ["li", "リ"], ["lu", "ル"], ["le", "レ"], ["lo", "ロ"],
  ["sa", "サ"], ["si", "シ"], ["su", "ス"], ["se", "セ"], ["so", "ソ"], ["ha", "ハ"], ["hi", "ヒ"], ["hu", "フ"], ["he", "ヘ"], ["ho", "ホ"],
  ["ba", "バ"], ["bi", "ビ"], ["bu", "ブ"], ["be", "ベ"], ["bo", "ボ"], ["pa", "パ"], ["pi", "ピ"], ["pu", "プ"], ["pe", "ペ"], ["po", "ポ"],
  ["ya", "ヤ"], ["yu", "ユ"], ["yo", "ヨ"], ["wa", "ワ"], ["wo", "ヲ"], ["n", "ン"],
].sort((a, b) => b[0].length - a[0].length);

function transliterateJapaneseWord(value) {
  const lower = String(value || "").toLowerCase();
  let output = "";
  let index = 0;
  while (index < lower.length) {
    const match = japaneseRomanSyllables.find(([roman]) => lower.startsWith(roman, index));
    if (!match) {
      output += lower[index];
      index += 1;
      continue;
    }
    output += match[1];
    index += match[0].length;
  }
  return output;
}

function translateHomeText(value, language) {
  const text = String(value || "").trim();
  if (!text) return "";
  const phrase = localTranslationPhrases[language]?.[text.toLowerCase()];
  if (phrase) return phrase;
  const words = localTranslationWords[language] || {};
  return text.split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part)) return part;
    return part.replace(/[A-Za-z]+/g, (rawWord) => {
      const word = rawWord.toLowerCase();
      return words[word] || (language === "Japanese" ? transliterateJapaneseWord(word) : transliterateNepaliWord(word));
    });
  }).join("");
}

function openTranslationPanel(button) {
  const homeForm = document.querySelector('.profile-entry-form[data-profile-section="Home"]');
  if (!homeForm) return;
  const sourceField = button.dataset.sourceField || "";
  const targetField = button.dataset.targetField || "";
  const language = button.dataset.language || "Japanese";
  const sourceInput = homeForm.elements[fieldKey(sourceField)];
  const source = String(sourceInput?.value || "").trim();
  const output = translateHomeText(source, language);
  closeTranslationPanel();
  const modal = document.createElement("div");
  modal.id = "translationModal";
  modal.className = "translation-modal-backdrop";
  modal.dataset.sourceField = sourceField;
  modal.dataset.targetField = targetField;
  modal.dataset.language = language;
  modal.innerHTML = `
    <div class="translation-modal" role="dialog" aria-modal="true" aria-label="Translate to ${escapeHtml(language)}">
      <div class="translation-modal-head"><strong>Translate to ${escapeHtml(language)}</strong><button class="icon-button" data-action="translation-close" title="Close" aria-label="Close">×</button></div>
      <div class="translation-modal-body">
        <strong class="translation-result-title">Translation Result</strong>
        <label><span>Input</span><div class="translation-input-preview">${escapeHtml(source || "-")}</div></label>
        <label><span>Output</span><textarea class="translation-output" spellcheck="false">${escapeHtml(output)}</textarea></label>
      </div>
      <div class="translation-modal-actions">
        <button class="ghost-btn" data-action="translation-copy">▣ Copy</button>
        <button class="primary-btn" data-action="translation-ok">✓ Ok</button>
        <button class="ghost-btn" data-action="translation-close">× Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".translation-output")?.focus();
}

function closeTranslationPanel() {
  document.getElementById("translationModal")?.remove();
}

function copyTranslationResult() {
  const output = document.querySelector("#translationModal .translation-output")?.value || "";
  const done = () => showToast("Translation copied locally.");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(output).then(done).catch(done);
  else done();
}

function applyTranslationResult() {
  const modal = document.getElementById("translationModal");
  if (!modal) return;
  const targetField = modal.dataset.targetField || "";
  const target = document.querySelector(`.profile-entry-form[data-profile-section="Home"] [name="${cssEscape(targetField)}"]`);
  if (!target) return;
  target.value = document.querySelector("#translationModal .translation-output")?.value || "";
  target.dispatchEvent(new Event("input", { bubbles: true }));
  closeTranslationPanel();
  showToast("Translation applied. Click Home Save to keep it.");
}

function renderFieldLabel(label) {
  const text = String(label || "");
  if (!text.includes("*")) return escapeHtml(text);
  return `${escapeHtml(text.replace(/\s*\*+\s*$/, ""))} <b class="required-mark">*</b>`;
}

function renderProfileGridField(section, label, value = "") {
  if (section === "Attachment" && label === "File name") {
    return `<label><span>File name</span><input name="file_name" type="file" /></label>`;
  }
  const requiredLabel = profileGridRequiredFields[section]?.includes(label) ? `${label}*` : label;
  return renderProfileField(requiredLabel, value, { singleLine: section === "Education" && label === "Address" });
}

function profileRowValue(row, header, headers = []) {
  if (Array.isArray(row)) return row[headers.indexOf(header)] ?? "";
  return row?.[fieldKey(header)] ?? row?.[header] ?? "";
}

function profileRowEditButton(section, rowIndex) {
  return `<button type="button" class="ghost-btn profile-row-edit-btn" data-action="edit-profile-row" data-section="${escapeHtml(section)}" data-row-index="${rowIndex}" aria-label="Edit ${escapeHtml(section)} row ${rowIndex + 1}">✎ Edit</button>`;
}

function renderProfileGridSection(section, record, options = {}) {
  const saved = profileSectionData(record)[section] || {};
  const rows = saved.rows || [];
  const headers = profileGridSections[section] || [];
  const visibleHeaders = profileVisibleColumns(section, headers, record);
  const isFamily = section === "Family";
  const selectedFamilyIndex = isFamily ? familyAccountHolderIndex(record) : -1;
  return `
    <section class="profile-workspace">
      <div class="profile-section-head">
        <h2>${escapeHtml(section)}</h2>
        <button class="primary-btn" data-action="add-profile-row" data-section="${escapeHtml(section)}">${profileGridAction(section)}</button>
      </div>
      ${isFamily ? renderFamilyAccountHolderControl(record, selectedFamilyIndex) : ""}
      ${options.balance ? `<div class="profile-balance">${escapeHtml(options.balance)}</div>` : ""}
      <form class="profile-entry-form compact" data-profile-section="${escapeHtml(section)}">
        ${headers.map((label) => renderProfileGridField(section, label)).join("")}
      </form>
      ${section === "Education" ? `
        <div class="profile-section-actions education-row-actions">
          <button type="button" class="primary-btn" data-action="add-profile-row" data-section="Education">Save</button>
        </div>
      ` : ""}
      <div class="file-history-tools">
        <button class="icon-button" data-action="profile-column-chooser" data-section="${escapeHtml(section)}" title="Column Chooser">▤</button>
        <input class="filter-input" placeholder="Filter..." />
        ${section === "Education" ? `<button class="icon-button education-date-converter-trigger" data-action="open-education-date-converter" title="Date convertor" aria-label="Date convertor"><span class="date-converter-logo date-converter-logo--compact" aria-hidden="true">मिति</span></button>` : ""}
      </div>
      <table class="profile-file-table">
        <thead><tr>${isFamily ? `<th class="family-account-holder-head" title="Account holder selector">$</th>` : ""}${visibleHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}<th class="profile-row-actions-head">Actions</th></tr></thead>
        <tbody>
          ${rows.length ? rows.map((row, rowIndex) => {
            const rowSelected = isFamily && familyRowIsAccountHolder(row);
            const otherSelected = isFamily && selectedFamilyIndex >= 0 && !rowSelected && appState.familyAccountHolderSelectionMode !== true;
            const accountHolderButtonState = otherSelected ? ` disabled title="Click Change to select another family member"` : ` title="${rowSelected ? "Selected account holder" : "Use as account holder"}"`;
            const accountHolderButton = isFamily ? `<td class="family-account-holder-cell"><button type="button" class="family-account-holder-btn${rowSelected ? " is-selected" : ""}" data-action="select-family-account-holder" data-row-index="${rowIndex}" aria-label="${rowSelected ? "Selected account holder" : "Select as account holder"}" aria-pressed="${rowSelected ? "true" : "false"}"${accountHolderButtonState}>$</button></td>` : "";
            return `<tr>${accountHolderButton}${visibleHeaders.map((header) => `<td>${escapeHtml(profileRowValue(row, header, headers) || "-")}</td>`).join("")}<td class="profile-row-actions">${profileRowEditButton(section, rowIndex)}</td></tr>`;
          }).join("") : `<tr><td colspan="${visibleHeaders.length + (isFamily ? 2 : 1)}">No data</td></tr>`}
        </tbody>
        <tfoot><tr><td colspan="${visibleHeaders.length + (isFamily ? 2 : 1)}">#${rows.length}</td></tr></tfoot>
      </table>
    </section>
  `;
}

function openProfileRowEditor(section, rowIndex) {
  const record = appState.activeApplicant;
  const profile = profileSectionData(record);
  const rows = Array.isArray(profile[section]?.rows) ? profile[section].rows : [];
  const row = rows[rowIndex];
  const headers = profileGridSections[section] || [];
  if (!record || !row || !headers.length) {
    showToast("This table row could not be opened for editing.");
    return;
  }
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.dataset.mode = "profile-row-editor";
  drawer.innerHTML = `
    <div class="drawer-head">
      <div><strong>Edit ${escapeHtml(section)} record</strong><small>Update the saved row and keep the changes locally</small></div>
      <button class="icon-button" data-action="close-drawer" title="Close" aria-label="Close">×</button>
    </div>
    <form class="profile-entry-form compact profile-row-editor-form" data-profile-row-editor="true" data-profile-section="${escapeHtml(section)}" data-row-index="${rowIndex}">
      ${headers.map((label) => renderProfileGridField(section, label, profileRowValue(row, label, headers))).join("")}
      <div class="form-actions">
        <button type="button" class="ghost-btn" data-action="close-drawer">Cancel</button>
        <button type="button" class="primary-btn" data-action="save-profile-row" data-section="${escapeHtml(section)}" data-row-index="${rowIndex}">Save changes</button>
      </div>
    </form>
  `;
  drawer.classList.add("open");
  drawer.querySelector("input, textarea, .profile-select-trigger")?.focus();
}

const educationDateConverterFixtures = {
  // This is the value shown by the real Automation popover when it opens
  // from Education, including both directions for the same raw input.
  "2003-08-13": { bsToAd: "28 Nov 1946", adToBs: "2060/04/28" },
};

function dateConverterDateKey(value) {
  const match = String(value || "").trim().match(/^(\d{4})[-/]([01]?\d)[-/]([0-3]?\d)$/);
  return match ? `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}` : "";
}

function formatConverterAdDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "NA";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

function educationDateConverterResults(value) {
  const input = dateConverterDateKey(value);
  if (!input) return { input: String(value || "").trim(), bsToAd: "NA", adToBs: "NA" };
  if (educationDateConverterFixtures[input]) return { input, ...educationDateConverterFixtures[input] };

  const quarterEndByBs = nepaliInterestQuarterEnds.find((entry) => entry.bs === input);
  const quarterEndByAd = nepaliInterestQuarterEnds.find((entry) => entry.ad === input);
  return {
    input,
    bsToAd: quarterEndByBs ? formatConverterAdDate(quarterEndByBs.ad) : "NA",
    adToBs: quarterEndByAd ? quarterEndByAd.bs.replace(/-/g, "/") : "NA",
  };
}

function openEducationDateConverter() {
  closeEducationDateConverter();
  const initial = appState.educationDateConverterInput || "2003-08-13";
  const results = educationDateConverterResults(initial);
  const modal = document.createElement("div");
  modal.id = "educationDateConverterModal";
  modal.className = "education-date-converter-backdrop";
  modal.innerHTML = `
    <div class="education-date-converter" role="dialog" aria-modal="true" aria-label="Date convertor">
      <div class="education-date-converter-head">
        <strong>Date convertor</strong>
        <button class="icon-button" data-action="close-education-date-converter" title="Close" aria-label="Close">×</button>
      </div>
      <div class="education-date-converter-body">
        <input class="education-date-converter-input" data-date-converter-input value="${escapeHtml(results.input)}" placeholder="Type date and press enter" aria-label="Type date and press enter" />
        <div class="education-conversion-info">
          <p>Your Conversion</p>
          <table class="education-conversion-table">
            <tbody>
              <tr><td>Input</td><td colspan="2" data-conversion-result="input">${escapeHtml(results.input || "-")}</td></tr>
              <tr><td>BS to AD</td><td data-conversion-result="bsToAd">${escapeHtml(results.bsToAd)}</td><td><button class="conversion-copy-link" data-action="copy-education-date-conversion" data-conversion-key="bsToAd">copy</button></td></tr>
              <tr><td>AD to BS</td><td data-conversion-result="adToBs">${escapeHtml(results.adToBs)}</td><td><button class="conversion-copy-link" data-action="copy-education-date-conversion" data-conversion-key="adToBs">copy</button></td></tr>
            </tbody>
          </table>
        </div>
        <div class="hamropatro-widget" aria-label="Hamro Patro date converter">
          <div class="hamropatro-brand"><span class="date-converter-logo" aria-hidden="true">मिति</span><strong>हाम्रो पात्रो</strong></div>
          <div class="hamropatro-tabs">
            <button class="active" data-action="education-date-widget-tab" data-widget-tab="convert">↔ परिवर्तन</button>
            <button data-action="education-date-widget-tab" data-widget-tab="difference">▣ मिति फरक</button>
            <button data-action="education-date-widget-tab" data-widget-tab="age">♙ उमेर</button>
          </div>
          <div class="hamropatro-widget-note" data-widget-panel="convert">मिति परिवर्तनका लागि माथि मिति लेखेर Enter थिच्नुहोस्।</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector("[data-date-converter-input]")?.focus();
}

function closeEducationDateConverter() {
  document.getElementById("educationDateConverterModal")?.remove();
}

function updateEducationDateConverter(value) {
  const modal = document.getElementById("educationDateConverterModal");
  if (!modal) return;
  const results = educationDateConverterResults(value);
  appState.educationDateConverterInput = results.input;
  modal.querySelector('[data-conversion-result="input"]').textContent = results.input || "-";
  modal.querySelector('[data-conversion-result="bsToAd"]').textContent = results.bsToAd;
  modal.querySelector('[data-conversion-result="adToBs"]').textContent = results.adToBs;
  modal.querySelectorAll("[data-action=\"copy-education-date-conversion\"]").forEach((button) => {
    button.dataset.conversionValue = results[button.dataset.conversionKey] || "NA";
  });
}

function copyEducationDateConversion(button) {
  const value = button.dataset.conversionValue || document.querySelector(`[data-conversion-result="${cssEscape(button.dataset.conversionKey || "")}"]`)?.textContent || "";
  const done = () => showToast(`${button.dataset.conversionKey === "adToBs" ? "AD to BS" : "BS to AD"} copied locally.`);
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(value).then(done).catch(done);
  else done();
}

function profileVisibleColumns(section, headers, record = appState.activeApplicant) {
  const saved = profileSectionData(record)[section]?.visible_columns;
  return Array.isArray(saved) && saved.length ? headers.filter((header) => saved.includes(header)) : headers;
}

function openProfileColumnChooser(section) {
  const record = appState.activeApplicant;
  const headers = profileGridSections[section] || [];
  const visible = profileVisibleColumns(section, headers, record);
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div><strong>Column Chooser</strong><small>${escapeHtml(section)}</small></div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="column-chooser-list">
      ${headers.map((header) => `<label><span></span><input type="checkbox" data-action="profile-column-toggle" data-section="${escapeHtml(section)}" data-column="${escapeHtml(header)}"${visible.includes(header) ? " checked" : ""} /> <span>${escapeHtml(header)}</span></label>`).join("")}
    </div>
  `;
  drawer.classList.add("open");
}

function toggleProfileColumn(section, column, checked) {
  const headers = profileGridSections[section] || [];
  const profile = profileSectionData(appState.activeApplicant);
  const current = new Set(profileVisibleColumns(section, headers));
  if (checked) current.add(column);
  else if (current.size > 1) current.delete(column);
  profile[section] ||= {};
  profile[section].visible_columns = headers.filter((header) => current.has(header));
  storeObject(storageKeys.profileSections, data.profileSections);
  render();
  openProfileColumnChooser(section);
}

function renderFileHistory(record) {
  const section = accountSectionData(record, "File History");
  const fileRows = Array.isArray(section.rows) ? section.rows : [];
  const visibleHeaders = accountVisibleColumns(section, "file", accountFileHistoryHeaders);
  const rows = fileRows.map((row) => Object.fromEntries(accountFileHistoryHeaders.map((header, index) => [fieldKey(header), row[index]])));
  return `
    <section class="profile-workspace account-records-workspace">
      <div class="file-history-tools">
        <button class="icon-button" data-action="account-column-chooser" data-scope="file" title="Column Chooser">▤</button>
        <input class="filter-input account-record-filter" placeholder="Filter..." />
      </div>
      ${renderAccountColumnChooser("file", accountFileHistoryHeaders, visibleHeaders)}
      <table class="profile-file-table account-record-table">
        <thead><tr>${visibleHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.length ? rows.map((row) => `<tr>${visibleHeaders.map((header) => `<td>${header === "File" ? `<button class="action-link" data-action="download-document" data-file-history-template="${escapeHtml(row.Template || "Generated Document")}" data-file-history-mode="${escapeHtml(row["Export Mode"] || "Account draft Template")}">Download</button> | <button class="action-link" data-action="preview-document" data-file-history-template="${escapeHtml(row.Template || "Generated Document")}" data-file-history-mode="${escapeHtml(row["Export Mode"] || "Account draft Template")}">Preview</button>` : escapeHtml(row[fieldKey(header)] || "-")}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${visibleHeaders.length}">No data</td></tr>`}
        </tbody>
        <tfoot><tr><td colspan="${visibleHeaders.length}">Count ${fileRows.length}.</td></tr></tfoot>
      </table>
    </section>
  `;
}

function profileGridAction(section) {
  const labels = {
    Education: "Add New Education",
    Family: "Add New Family Member",
    Income: "Add New Income",
    Classes: "Enroll",
    Attachment: "Upload file(s)",
    Payment: "Add new Invoice",
    Communication: "New SMS",
    Task: "Add task",
  };
  return labels[section] || "Add new";
}

function fieldKey(label) {
  return String(label || "")
    .toLowerCase()
    .replace(/\*/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function requiredFieldIsEmpty(input) {
  if (!input) return true;
  const value = String(input.value ?? "").trim();
  return !value || value === "Select..." || value === "Select user..." || value === "Title";
}

function validateRequiredFields(form, labels, section) {
  const requiredLabels = (labels || []).filter((label) => String(label).includes("*"));
  const missing = requiredLabels.filter((label) => requiredFieldIsEmpty(form.elements[fieldKey(label)]));
  if (!missing.length) return true;
  const firstMissing = form.elements[fieldKey(missing[0])];
  const selectRoot = firstMissing?.closest?.("[data-profile-select]");
  if (selectRoot) {
    const trigger = selectRoot.querySelector(".profile-select-trigger");
    trigger?.focus();
    if (trigger) toggleProfileSelect(trigger);
  } else {
    firstMissing?.focus();
  }
  showToast(`Complete required field(s): ${missing.map((label) => String(label).replace(/\s*\*+\s*$/, "")).join(", ")}`);
  return false;
}

function profileInitialValue(section, label, record) {
  const key = fieldKey(label);
  const homeDefaults = {
    applicant: record.name || "",
    first_name: record.firstName || String(record.name || "").split(" ")[0] || "",
    middle_name: record.middleName || String(record.name || "").split(" ").slice(1, -1).join(" "),
    last_name: record.lastName || String(record.name || "").split(" ").slice(-1)[0] || "",
    gender: record.gender || "",
  };
  const defaults = {
    Home: homeDefaults,
    Education: { pos_title: "Mass Communication" },
    Application: { marital_status: "Single", birth_place: "Nawalparasi (West)" },
    Official: { palika: "Sunwal", palika_type: "Municipality", ward_no: "13", district: "Nawalparasi", province: "Lumbini" },
    Income: {
      year1: currentFiscalYearLabel(),
      year2: fiscalYearLabel(currentNepaliFiscalYearStart() + 1),
      year3: fiscalYearLabel(currentNepaliFiscalYearStart() + 2),
      tax_paid_y1: "0",
      tax_paid_y2: "0",
      tax_paid_y3: "0",
    },
    "Reference Number Setup": { number_of_references: "70", reference_notes: "26366, 26367, 26368, 26369, 26370" },
  };
  return defaults[section]?.[key] || "";
}

function profileSectionData(record = appState.activeApplicant) {
  const key = profileRecordKey(record);
  data.profileSections[key] ||= {};
  seedTestStudentProfile(record, data.profileSections[key]);
  const profile = data.profileSections[key];
  const family = profile.Family;
  if (family && !Array.isArray(family.rows)) {
    const legacyFamily = { ...family };
    delete legacyFamily.rows;
    family.rows = Object.values(legacyFamily).some((value) => String(value ?? "").trim()) ? [legacyFamily] : [];
    storeObject(storageKeys.profileSections, data.profileSections);
  }
  const income = profile.Income;
  if (income) {
    let fiscalYearChanged = false;
    ["year1", "year2", "year3"].forEach((field) => {
      if (!income[field]) return;
      const normalized = normalizeFiscalYearValue(income[field]);
      if (normalized !== income[field]) {
        income[field] = normalized;
        fiscalYearChanged = true;
      }
    });
    if (fiscalYearChanged) storeObject(storageKeys.profileSections, data.profileSections);
  }
  return profile;
}

// These are the fields that most often block a profile from being ready for
// documents, account records, or downstream review.  The task list is derived
// from the saved profile on every render, so it never becomes stale.
const applicantTaskRules = [
  { section: "Home", fields: ["Applicant*", "First Name*", "Last Name*", "Gender*"], priority: "Required" },
  { section: "Application", fields: ["Consultancy*", "School", "Mobile Number (SMS purpose)*", "Email", "Temporary Address"], priority: "Important" },
  { section: "Official", fields: ["Complete Address", "Citizenship No", "DOB", "Intake", "Course", "Status", "Passport No", "Passport Expiry Date"], priority: "Important" },
  { section: "Document Check", fields: ["Address in Citizenship", "Father's Name in Citizenship", "Mother's Name in Citizenship", "School Name in Trascript", "Address in Transcript"], priority: "Document" },
  { section: "Family", fields: ["NAME*", "GENDER*", "DOB*"], priority: "Recommended" },
  { section: "Education", fields: ["Education record"], priority: "Recommended", row: true },
  { section: "Income", fields: ["Year1", "Year2", "Year3", "Bank", "Bank and Annual Income Ratio"], priority: "Financial" },
];

const applicantTodoColumns = ["Applicant", "Progress", "Remaining", "Next task", "Owner", "Status", "Registration date"];

function applicantProgressForRecord(record) {
  const total = applicantTaskRules.reduce((count, rule) => count + rule.fields.length, 0);
  const tasks = applicantDataTasks(record);
  const completed = Math.max(0, total - tasks.length);
  return {
    total,
    completed,
    remaining: tasks.length,
    percent: total ? Math.round((completed / total) * 100) : 100,
    tasks,
  };
}

function applicantProgressRecords() {
  const records = data.localApplicants.map((record, index) => ({
    ...record,
    id: record.id || record.localId || `LOCAL-${index + 1}`,
    created: record.created || todayLabel(),
  }));
  const extra = window.automationExtraData || {};
  const headers = extra.inquiryApplicantHeaders || ["#", "Applicant", "Application", "Official", "Income", "Created", "Phone No", "Complete Address", "Passport", "Bank", "Passport No", "Passport Expiry Date"];
  const captured = Array.isArray(extra.inquiryApplicants) ? extra.inquiryApplicants : [];
  const fixedNames = capturedApplicantNames(captured);
  const detailRows = fixedNames.length ? captured.slice(0, captured.length - fixedNames.length) : captured;
  detailRows.forEach((raw, index) => {
    const row = capturedApplicantRow(raw, fixedNames[index], index, headers);
    const capturedRecord = profileRecord(headers, row);
    const value = (header) => row[headers.indexOf(header)] || "";
    capturedRecord.id = value("#") || `CAPTURED-${index + 1}`;
    capturedRecord.created = value("Created") || "";
    capturedRecord.phone = value("Phone No") || capturedRecord.phone || "";
    capturedRecord.address = value("Complete Address") || capturedRecord.address || "";
    capturedRecord.passportNo = value("Passport No") || "";
    capturedRecord.passportExpiryDate = value("Passport Expiry Date") || "";
    capturedRecord.gender = value("Gender") || "";
    capturedRecord.avatar = value("Avatar") || initialsFor(capturedRecord.name);
    records.push(capturedRecord);
  });
  const seen = new Set();
  return records.filter((record) => {
    const key = String(record.id || record.name || "").trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function applicantTodoColumnValue(record, progress, column) {
  if (column === "Applicant") return record.name || "Applicant";
  if (column === "Progress") return `${progress.percent}%`;
  if (column === "Remaining") return `${progress.remaining} task${progress.remaining === 1 ? "" : "s"}`;
  if (column === "Next task") return progress.tasks[0] ? `${progress.tasks[0].field.replace(/\*+$/, "")} · ${progress.tasks[0].section}` : "Ready for review";
  if (column === "Owner") return isBlankApplicantValue(record.owner) ? "Unassigned" : record.owner;
  if (column === "Status") return progress.percent >= 100 ? "Complete" : "In progress";
  if (column === "Registration date") return record.created || "—";
  return "—";
}

function applicantTodoAvatar(record) {
  const source = String(record.photo || record.avatar_url || record.avatar || "").trim();
  const hasPhoto = /^(?:data:image\/|https?:\/\/|blob:)/i.test(source);
  return hasPhoto
    ? `<img src="${escapeHtml(source)}" alt="${escapeHtml(record.name || "Applicant")}" />`
    : `<span>${escapeHtml(initialsFor(record.name || record.avatar || "Applicant"))}</span>`;
}

function renderApplicantTodoDashboard() {
  const records = applicantProgressRecords();
  const query = String(appState.applicantTodoSearch || "").trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    if (!query) return true;
    const progress = applicantProgressForRecord(record);
    return [record.name, record.id, record.owner, applicantTodoColumnValue(record, progress, "Next task")]
      .join(" ").toLowerCase().includes(query);
  });
  const visibleColumns = applicantTodoColumns.filter((column) => appState.applicantTodoVisibleColumns.includes(column));
  const chooserQuery = String(appState.applicantTodoColumnSearch || "").trim().toLowerCase();
  const chooserColumns = applicantTodoColumns.filter((column) => !chooserQuery || column.toLowerCase().includes(chooserQuery));
  return `<section class="panel applicant-todo-dashboard-panel">
    <div class="applicant-todo-dashboard-head">
      <div class="panel-title"><div><h2>Remaining Entries</h2><small>${filteredRecords.length} of ${records.length} applicants · based on tracked fields</small></div></div>
      <div class="applicant-todo-dashboard-actions">
        <label class="applicant-todo-search-wrap"><i data-lucide="search" aria-hidden="true">⌕</i><input class="applicant-todo-search" placeholder="Search applicants or remaining entries..." aria-label="Search remaining entries" value="${escapeHtml(appState.applicantTodoSearch)}" /></label>
        <button class="grid-icon-btn applicant-todo-column-toggle" data-action="applicant-todo-column-chooser" title="Choose visible details" aria-label="Choose visible remaining entry details"><i data-lucide="columns-3" aria-hidden="true">▤</i></button>
      </div>
    </div>
    ${appState.applicantTodoColumnChooserOpen ? `<div class="applicant-todo-column-chooser" role="dialog" aria-label="Remaining entry visible details">
      <div class="applicant-todo-column-chooser-head"><strong>Visible details</strong><button class="icon-button" data-action="close-applicant-todo-column-chooser" aria-label="Close visible details">×</button></div>
      <input class="applicant-todo-column-search" placeholder="Search details..." aria-label="Search to-do details" value="${escapeHtml(appState.applicantTodoColumnSearch)}" />
      <div class="applicant-todo-column-options">${chooserColumns.map((column) => `<label class="applicant-todo-column-option"><input type="checkbox" data-action="toggle-applicant-todo-column" data-column="${escapeHtml(column)}" ${visibleColumns.includes(column) ? "checked" : ""} ${column === "Applicant" ? "disabled" : ""} /> <span>${escapeHtml(column)}</span></label>`).join("")}</div>
      <small>Applicant identity stays visible with photo and name.</small>
    </div>` : ""}
    <div class="applicant-todo-table-scroll"><table class="data-table applicant-todo-table"><thead><tr>${visibleColumns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead><tbody>
      ${filteredRecords.length ? filteredRecords.map((record) => {
        const progress = applicantProgressForRecord(record);
        return `<tr class="applicant-todo-row" data-applicant-todo-text="${escapeHtml(`${record.name || ""} ${record.id || ""} ${record.owner || ""}`.toLowerCase())}">${visibleColumns.map((column) => {
          if (column === "Applicant") return `<td><button class="applicant-todo-identity" data-action="open-applicant-progress" data-progress-id="${escapeHtml(record.id || "")}"><span class="applicant-todo-avatar">${applicantTodoAvatar(record)}</span><span><strong>${escapeHtml(record.name || "Applicant")}</strong><small>ID: ${escapeHtml(record.id || "—")}</small></span></button></td>`;
          if (column === "Progress") return `<td><div class="applicant-progress-value"><strong>${progress.percent}%</strong><span>${progress.completed}/${progress.total} fields</span></div><div class="progress-track applicant-progress-track" aria-label="${progress.percent}% complete"><span class="progress-fill" style="width:${progress.percent}%"></span></div></td>`;
          if (column === "Remaining") return `<td><span class="applicant-todo-count ${progress.remaining ? "has-pending" : "is-clear"}">${progress.remaining}</span></td>`;
          if (column === "Status") return `<td><span class="applicant-progress-status ${progress.percent >= 100 ? "is-complete" : "is-progress"}">${escapeHtml(applicantTodoColumnValue(record, progress, column))}</span></td>`;
          return `<td><span class="applicant-todo-text" title="${escapeHtml(applicantTodoColumnValue(record, progress, column))}">${escapeHtml(applicantTodoColumnValue(record, progress, column))}</span></td>`;
        }).join("")}</tr>`;
      }).join("") : `<tr><td colspan="${visibleColumns.length}" class="empty">No applicants match this remaining entry search.</td></tr>`}
    </tbody></table></div>
  </section>`;
}

function isBlankApplicantValue(value) {
  const text = String(value ?? "").trim().toLowerCase();
  return !text || ["-", "—", "n/a", "na", "none", "null", "undefined", "select...", "select user...", "title"].includes(text);
}

function applicantTaskFallback(record, section, label) {
  const key = fieldKey(label);
  if (section === "Home") {
    return profileInitialValue(section, label, record);
  }
  if (section === "Application" && ["phone_no", "mobile_number_sms_purpose", "temporary_address"].includes(key)) {
    if (key === "temporary_address") return record?.address || record?.completeAddress || "";
    return record?.phone || record?.phoneNo || "";
  }
  if (section === "Official") {
    if (key === "complete_address") return record?.address || record?.completeAddress || "";
    if (key === "passport_no") return record?.passportNo || "";
    if (key === "passport_expiry_date") return record?.passportExpiryDate || "";
  }
  return "";
}

function applicantTaskValue(record, section, label) {
  const profile = profileSectionData(record)[section] || {};
  if (label === "Education record") return Array.isArray(profile.rows) && profile.rows.length ? "complete" : "";
  if (section === "Family" && ["name", "gender", "dob"].includes(fieldKey(label))) {
    const rows = Array.isArray(profile.rows) ? profile.rows : [];
    const key = fieldKey(label);
    const matching = rows.find((row) => !isBlankApplicantValue(profileRowValue(row, key, profileGridSections.Family)));
    if (matching) return profileRowValue(matching, key, profileGridSections.Family);
  }
  let value = profile[fieldKey(label)];
  if (isBlankApplicantValue(value)) value = applicantTaskFallback(record, section, label);
  return value;
}

function applicantDataTasks(record = appState.activeApplicant) {
  if (!record) return [];
  return applicantTaskRules.flatMap((rule) => rule.fields
    .filter((field) => isBlankApplicantValue(applicantTaskValue(record, rule.section, field)))
    .map((field) => ({
      id: `${rule.section}-${fieldKey(field)}`,
      section: rule.section,
      field,
      priority: rule.priority,
      row: Boolean(rule.row || rule.section === "Family"),
    })));
}

function commonBlankApplicantFields() {
  const extra = window.automationExtraData || {};
  const headers = extra.inquiryApplicantHeaders || applicantDefaultColumns;
  const captured = Array.isArray(extra.inquiryApplicants) ? extra.inquiryApplicants : [];
  const fixedNames = capturedApplicantNames(captured);
  const detailRows = fixedNames.length ? captured.slice(0, captured.length - fixedNames.length) : captured;
  // Use the same normalization as Applicant List so the audit does not count
  // a phone/address as blank merely because the raw capture is ragged.
  const rows = detailRows.map((row, index) => capturedApplicantRow(row, fixedNames[index], index, headers));
  if (!rows.length) return [];
  return headers
    .map((header, index) => ({
      header,
      blank: rows.filter((row) => isBlankApplicantValue(row?.[index])).length,
      total: rows.length,
    }))
    .filter((item) => !["#", "Applicant", "Avatar"].includes(item.header) && item.blank / item.total >= 0.7)
    .sort((a, b) => (b.blank / b.total) - (a.blank / a.total) || b.blank - a.blank)
    .slice(0, 8);
}

function seedTestStudentProfile(record, profile) {
  if (record?.name !== "Test Test Test Kumar" || (profile.__test_student_seeded === "v6" && Array.isArray(profile.Income?.rows) && profile.Income.rows.length)) return;
  const sections = {
    Home: {
      applicant: "Test Test Test Kumar",
      first_name: "Test",
      middle_name: "Test",
      last_name: "Kumar",
      gender: "Female",
      name_in_japanese: "Test Kumar",
      first_name_in_japanese: "Test",
      middle_name_in_japanese: "Test",
      last_name_in_japanese: "Kumar",
      name_in_nepali: "Test Test Test Kumar",
      first_name_in_nepali: "Test",
      middle_name_in_nepali: "Test",
      last_name_in_nepali: "Kumar",
    },
    Education: {
      rows: [
        { sno: "1", title: "Secondary Education", institution: "Sample Valley School", started_year: "2019", started_month: "April", ended_year: "2021", ended_month: "March", address: "Sample Road, Kathmandu" },
        { sno: "2", title: "Higher Secondary Education", institution: "Fictional City College", started_year: "2021", started_month: "April", ended_year: "2023", ended_month: "March", address: "Demo Chowk, Lalitpur" },
      ],
    },
    "Document Check": {
      address_in_citizenship: "123 Sample Street, Kathmandu",
      address_in_cc: "123 Sample Street, Kathmandu",
      father_s_name_in_citizenship: "Sample Father Kumar",
      father_s_name_in_cc: "Sample Father Kumar",
      father_s_address_in_citizenship: "456 Fiction Lane, Kathmandu",
      father_s_dob: "15 May, 1970",
      mother_s_name_in_citizenship: "Sample Mother Kumar",
      mother_s_name_in_cc: "Sample Mother Kumar",
      mother_s_address_in_citizenship: "456 Fiction Lane, Kathmandu",
      mother_s_dob: "20 July, 1975",
      school_name_in_trascript: "Fictional City College",
      address_in_transcript: "Demo Chowk, Lalitpur",
      school_name_in_character_certificate: "Fictional City College",
      school_address_in_cc: "Demo Chowk, Lalitpur",
      school_name_in_stamp_cc: "Fictional City College",
      address_in_stamp_cc: "Demo Chowk, Lalitpur",
      school_name_in_logo_cc: "Fictional City College",
      school_address_in_logo_cc: "Demo Chowk, Lalitpur",
      school_name_in_letterpad: "Fictional City College",
      address_in_letterpad: "Demo Chowk, Lalitpur",
      school_name_in_stamp_of_letterpad: "Fictional City College",
      school_address_in_stamp_of_letterpad: "Demo Chowk, Lalitpur",
      school_name_in_logo_of_letterpad: "Fictional City College",
      school_address_in_logo_of_letterpad: "Demo Chowk, Lalitpur",
    },
    Application: {
      marital_status: "Single",
      spouse_name: "Not Applicable",
      spouse_dob: "Not Applicable",
      spouse_phone: "Not Applicable",
      spouse_occupation: "Not Applicable",
      birth_place: "Sample Valley, Kathmandu",
      phone_no: "9800000001",
      japan_entry_date: "01 April, 2027",
      consultancy: "Sample Education Consultancy",
      school: "Fictional Tokyo Language School",
      form_date: "15 October, 2026",
      mobile_number_sms_purpose: "9800000001",
      email: "test.student@example.test",
      temporary_address: "789 Demo Avenue, Lalitpur",
      remarks: "Fictional test applicant for local verification.",
      draft: "Prepared",
      proposed: "Fictional study plan",
      review: "Reviewed for test",
      approval: "Pending test approval",
      approved: "No",
    },
    Official: {
      nid: "TEST-NID-0001",
      palika: "Sample Municipality",
      palika_type: "Municipality",
      ward_no: "5",
      district: "Kathmandu",
      province: "Bagmati",
      new_address_full: "123 Sample Street, Ward 5, Kathmandu",
      complete_address: "123 Sample Street, Ward 5, Kathmandu, Bagmati Province, Nepal",
      citizenship_no: "TEST-CIT-0001",
      dob_bs: "2059-05-12",
      dob: "28 August, 2002",
      nid_no: "TEST-NID-0001",
      intake: "April 2027",
      course: "Japanese Language Course",
      status: "Inquiry",
      passport_issued_date: "15 October, 2026",
      passport_no: "TESTP0001",
      passport_expiry_date: "14 October, 2036",
    },
    Summary: { college_name: "Fictional Tokyo Language School" },
    Family: {
      sno_auto: "1",
      type: "Father",
      name: "Sample Father Kumar",
      gender: "Male",
      f_a_relation: "Son",
      contact: "9800000002",
      occupation: "Sample Business",
      dob: "15 May, 1970",
      work_name: "Fictional Sample Trading",
      work_address: "456 Fiction Lane, Kathmandu",
      work_tel_no: "0100000001",
      citizenship_no: "TEST-FAM-0001",
    },
    Income: {
      year1: "2020/2021",
      year2: "2021/2022",
      year3: "2022/2023",
      tax_paid_y1: "15000",
      tax_paid_y2: "18000",
      tax_paid_y3: "21000",
      document_date: "15 October, 2026",
      exchange_date: "01 October, 2026",
      exchange_rate: "153.64",
      name_of_ward_chairman: "Sample Ward Chair",
      post_used_in_stamp: "Ward Chairperson",
      ward_chairman_s_contact_no: "9800000003",
      ward_office_phone_no: "0100000002",
      bank: "Trinetra Multipurpose Co-operative Ltd.",
      bank_and_annual_income_ratio: "42.50",
      rows: [
        { sno: "1", owner: "Sample Father Kumar", income_head: "Fictional Farming Income", income_detail: "Demo crop income", year1: "", year2: "", year3: "985700" },
        { sno: "2", owner: "Sample Father Kumar", income_head: "Fictional Trading Income", income_detail: "Demo local trading", year1: "", year2: "", year3: "765020" },
        { sno: "3", owner: "Sample Father Kumar", income_head: "Fictional Seasonal Income", income_detail: "Demo seasonal produce", year1: "", year2: "", year3: "614380" },
      ],
    },
  };
  Object.entries(sections).forEach(([section, values]) => {
    if (section === "Education") {
      profile[section] = { rows: values.rows.map((row) => ({ ...row })) };
      return;
    }
    profile[section] = { ...values };
  });
  profile.__test_student_seeded = "v6";
  storeObject(storageKeys.profileSections, data.profileSections);
}

function accountSectionData(record, section) {
  const profile = profileSectionData(record);
  profile[section] ||= accountSectionDefaults(section, record);
  if (section === "Account Information") normalizeAccountInformationDefaults(profile[section]);
  if (section === "Transaction Records") migrateTestStudentTransactions(record, profile[section]);
  return profile[section];
}

function accountOutputStyleMetadata(styleName) {
  const normalized = String(styleName || "").trim();
  return accountOutputStyles.find((style) => style.name === normalized) || accountOutputStyles.find((style) => style.name === "Trinetra PAN") || null;
}

function normalizeAccountInformationDefaults(section) {
  if (!section || typeof section !== "object") return;
  const style = accountOutputStyleMetadata(section.output_document_style || "Trinetra PAN");
  if (style) {
    section.output_document_style ||= style.name;
    section.account_type = style.accountType || section.account_type || "Normal Saving";
    section.interest_rate = style.interestRate || section.interest_rate || "8";
  }
  // v1 of the clone used 5% as its placeholder. Move that old placeholder to
  // the template-observed 6% default while preserving a deliberate non-default override.
  if (!String(section.tax_rate || "").trim() || (section.tax_defaults_version !== "v6" && String(section.tax_rate).trim() === "5")) {
    section.tax_rate = "6";
  }
  section.tax_defaults_version = "v6";
}

function applyAccountOutputStyleDefaults(record, section, styleName) {
  const style = accountOutputStyleMetadata(styleName);
  if (!style || !section) return [];
  const changes = [];
  [["account_type", style.accountType || "Normal Saving"], ["interest_rate", style.interestRate || "8"]].forEach(([key, nextValue]) => {
    const oldValue = String(section[key] || "").trim();
    if (oldValue !== String(nextValue)) changes.push({ field: key === "account_type" ? "Account Type" : "Interest Rate", oldValue, newValue: String(nextValue) });
    section[key] = String(nextValue);
  });
  return changes;
}

function invalidateSampleRecordPreview(record) {
  const transactionSection = accountSectionData(record, "Transaction Records");
  if (Array.isArray(transactionSection.sample_preview) && transactionSection.sample_preview.length) {
    transactionSection.sample_preview = [];
    storeObject(storageKeys.profileSections, data.profileSections);
  }
}

function migrateTestStudentTransactions(record, section) {
  if (record?.name !== "Test Test Test Kumar" || !Array.isArray(section.rows) || ![55, 60, 63, 140].includes(section.rows.length)) return;
  if (section.random_amounts_version === "v10") return;
  const oneYearSettings = {
    ...(section.sample_settings || {}),
    debit_entries: String(twoA4PageEntriesPerSide),
    credit_entries: String(twoA4PageEntriesPerSide),
    opening_date: "20 August, 2025",
    closing_balance_date: "19 August, 2026",
    debit_gap: "5",
    credit_gap: "5",
    total_credit_upto: "2100000",
    total_debit_upto: "2100000",
    transaction_persons: accountTransactionPeople.join(", "),
    sample_seed: `test-student-one-year-a4-v10-${record.id || record.name}`,
  };
  const generatedRows = buildStatementRows(
    generateSampleTransactions(oneYearSettings),
    accountSectionData(record, "Account Information"),
  ).rows.map((row, index) => ({
    ...row,
    [fieldKey("#")]: String(index + 1),
    _selected: false,
  }));
  section.rows = generatedRows;
  section.sample_settings = sampleSettingsWithGeneratedFigures(oneYearSettings, generatedRows);
  section.sample_preview = generatedRows.map((row) => ({ ...row }));
  section.duration_months = "12";
  section.random_amounts_version = "v10";
  section.summary_updated_at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  storeObject(storageKeys.profileSections, data.profileSections);
}

function accountSectionDefaults(section, record) {
  if (section === "Account Information") {
    return Object.fromEntries(accountInfoFields.map((field) => [fieldKey(field.label), accountInfoDefaultValue(field.label, record)]));
  }
  if (section === "Reference Number Setup") {
    return {
      reference_prefix: "",
      reference_start_no: "26366",
      number_of_references: "70",
      reference_notes: generatedReferenceNumbers("", "26366", "70").join(", "),
    };
  }
  if (section === "Transaction Records") {
    return {
      rows: defaultAccountTransactions.map((row) => ({ ...row })),
      summary_updated_at: "",
      visible_columns_transaction: [...accountTransactionHeaders],
      random_amounts_version: "v10",
    };
  }
  if (section === "File History") {
    return { rows: [], visible_columns_file: [...accountFileHistoryHeaders] };
  }
  return {};
}

function accountInfoDefaultValue(label, record = appState.activeApplicant) {
  const today = "01 October, 2026";
  const defaults = {
    "Output Document Style *": "Trinetra PAN",
    "Account Holder Name *": record?.name || "",
    "Account Holder Address *": record?.address || record?.completeAddress || "-",
    "Account Open Date": "20 August, 2025",
    "Account Reference No *": record?.accountRef || "056-02010",
    "Account Type": "Saving",
    "Interest Rate *": "8",
    "Tax Rate *": "6",
    "Opening Date *": "20 August, 2025",
    "Opening Amount *": "1653403.78",
    "Interest Calculation Days *": interestCalculationDaysForOpeningDate("20 August, 2025") || "35",
    "Exchange Date *": today,
    "Exchange Rate *": "153.64",
    "Draft Print Date": today,
    "Closing Balance Date": "30 September, 2026",
  };
  return defaults[label] || "";
}

function generatedReferenceNumbers(prefix, startNo, count) {
  const start = Number(String(startNo || "").replace(/\D/g, "")) || 1;
  const total = Math.max(1, Math.min(Number(count) || 1, 500));
  return Array.from({ length: total }, (_, index) => `${prefix || ""}${start + index}`);
}

function accountVisibleColumns(section, scope, headers) {
  const key = `visible_columns_${scope}`;
  const saved = Array.isArray(section[key]) && section[key].length ? section[key] : headers;
  return headers.filter((header) => saved.includes(header));
}

function accountFilteredRows(rows) {
  const input = document.querySelector(".account-record-filter");
  const query = String(input?.value || "").trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((row) => Object.values(row).join(" ").toLowerCase().includes(query));
}

function accountBalanceLabel(rows, section = {}) {
  const summary = calculateTransactionFinancials(rows, accountSectionData(appState.activeApplicant, "Account Information"));
  const stamp = section.summary_updated_at ? ` Updated ${section.summary_updated_at}.` : "";
  return `Balance Npr. ${formatMoney(summary.balance)} (system estimate for internal reference). Debit Entries ${summary.debitEntries} Credit Entries ${summary.creditEntries} Duration ${section.duration_months || ""} (months).${stamp}`;
}

function profileRecordKey(record = appState.activeApplicant) {
  return String(record?.id || record?.name || "applicant").replace(/\s+/g, "-").toLowerCase();
}

function profilePaymentTotals(record = appState.activeApplicant) {
  const rows = profileSectionData(record).Payment?.rows || [];
  return rows.reduce((totals, row) => {
    totals.payable += moneyValue(row.payable);
    totals.paid += moneyValue(row.paid);
    totals.due += moneyValue(row.due);
    return totals;
  }, { payable: 0, paid: 0, due: 0 });
}

function moneyValue(value) {
  const amount = Number(String(value || "0").replace(/,/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function incomeAmountValue(value) {
  const text = String(value ?? "").replace(/,/g, "").trim();
  if (!text || /^\d{4}\/\d{4}$/.test(text)) return 0;
  const amount = Number(text);
  return Number.isFinite(amount) && amount > 0 ? amount : 0;
}

function annualIncomeYear3Total(record = appState.activeApplicant) {
  const income = profileSectionData(record).Income || {};
  const rows = Array.isArray(income.rows) ? income.rows : [];
  const rowTotal = rows.reduce((total, row) => total + incomeAmountValue(
    row.year3 ?? row.Year3 ?? row["Year3"] ?? row.year_3,
  ), 0);
  if (rowTotal > 0) return rowTotal;

  // Captured profiles may store the annual value directly instead of using the grid.
  return incomeAmountValue(income.annual_income_year3 ?? income.year3_amount ?? income.year3);
}

function profileLogEntries(record = appState.activeApplicant) {
  const key = profileRecordKey(record);
  const logs = data.profileLogs?.[key];
  return Array.isArray(logs) ? logs : [];
}

function logValue(value) {
  const text = String(value ?? "").trim();
  return text || "-";
}

function summarizeProfileRow(row) {
  return Object.entries(row || {})
    .filter(([key, value]) => key !== "_selected" && key !== "calculate" && String(value ?? "").trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");
}

function appendProfileLog(record, details = {}) {
  if (!record) return;
  data.profileLogs ||= {};
  const key = profileRecordKey(record);
  data.profileLogs[key] ||= [];
  data.profileLogs[key].unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    user: "You",
    type: details.type || "update",
    changes: Array.isArray(details.changes) ? details.changes : [],
    tab: details.tab || appState.profileMainTab || "Detail",
    dataModule: details.dataModule || details.tab || appState.profileMainTab || "Detail",
    dateTime: new Date().toISOString(),
  });
  data.profileLogs[key] = data.profileLogs[key].slice(0, 200);
  storeObject(storageKeys.profileLogs, data.profileLogs);
}

function appendAccountRecordsLog(record, details = {}) {
  appendProfileLog(record, {
    ...details,
    tab: details.tab || "Transaction Records",
    dataModule: details.dataModule || "Account Records",
  });
}

function profileLogRelativeTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

function profileLogChangeText(change, type) {
  const field = escapeHtml(change.field || "record");
  const oldValue = escapeHtml(logValue(change.oldValue));
  const newValue = escapeHtml(logValue(change.newValue));
  if (["new", "add", "added", "create", "created", "set"].includes(type)) {
    return `set <b>${field}</b> to <span class="log-value-new">${newValue}</span>`;
  }
  if (["delete", "deleted", "clear", "cleared", "remove", "removed"].includes(type)) {
    return `cleared <b>${field}</b> <span class="log-value-muted">(was <span class="log-value-old">${oldValue}</span>)</span>`;
  }
  if (["export", "exported"].includes(type)) {
    return `exported <b>${field}</b> to <span class="log-value-new">${newValue}</span>`;
  }
  return `changed <b>${field}</b> from <span class="log-value-old">${oldValue}</span> to <span class="log-value-new">${newValue}</span>`;
}

function renderProfileLogEntry(entry) {
  const type = String(entry.type || "update").toLowerCase();
  const changes = Array.isArray(entry.changes) ? entry.changes : [];
  const displayed = changes.slice(0, 2).map((change) => profileLogChangeText(change, type)).join(' <span class="log-separator">·</span> ');
  const more = changes.length > 2 ? ` <span class="log-more-count">+${changes.length - 2} more</span>` : "";
  const activity = displayed || "updated the record";
  const timestamp = new Date(entry.dateTime);
  const exact = Number.isNaN(timestamp.getTime()) ? "" : timestamp.toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  const searchText = `${entry.user || "You"} ${activity} ${entry.tab || ""} ${entry.dataModule || ""}`.replace(/<[^>]+>/g, " ");
  return `<article class="profile-log-entry" data-log-text="${escapeHtml(searchText)}">
    <div class="profile-log-icon">✎</div>
    <div class="profile-log-body">
      <div class="profile-log-title"><strong>${escapeHtml(entry.user || "You")}</strong> ${activity}${more}</div>
      <div class="profile-log-meta"><span class="log-chip">${escapeHtml(entry.dataModule || "Data")}</span><span class="log-chip">${escapeHtml(entry.tab || "Detail")}</span><time title="${escapeHtml(exact)}">${escapeHtml(profileLogRelativeTime(entry.dateTime))}</time></div>
    </div>
  </article>`;
}

function openApplicantTasksPanel(record = appState.activeApplicant) {
  if (!record) return;
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const tasks = applicantDataTasks(record);
  const commonFields = commonBlankApplicantFields();
  const logs = profileLogEntries(record);
  drawer.innerHTML = `
    <div class="drawer-head applicant-task-drawer-head">
    <div><strong>Remaining Entries</strong><small>${escapeHtml(record.name || "Applicant")}</small></div>
      <button class="icon-button" data-action="close-drawer" title="Close" aria-label="Close">×</button>
    </div>
    <div class="applicant-task-drawer-body">
      <section class="applicant-task-summary ${tasks.length ? "has-tasks" : "is-clear"}">
        <div><span class="applicant-task-summary-icon">${tasks.length ? "!" : "✓"}</span><div><strong>${tasks.length} remaining</strong><small>${tasks.length ? "Complete these fields before the applicant is ready for review." : "This applicant has completed all tracked fields."}</small></div></div>
      </section>
      <section class="applicant-task-section">
        <div class="applicant-task-section-head"><h3>Fields to complete</h3><span>${tasks.length}</span></div>
        ${tasks.length ? `<div class="applicant-task-list">${tasks.map((task) => `
          <button class="applicant-task-item" data-action="open-applicant-task" data-section="${escapeHtml(task.section)}" data-task-field="${escapeHtml(task.field)}">
            <span class="applicant-task-priority">${escapeHtml(task.priority)}</span>
            <span class="applicant-task-copy"><strong>${escapeHtml(task.field.replace(/\*+$/, ""))}</strong><small>${escapeHtml(task.section)}${task.row ? " · add a row" : " · blank"}</small></span>
            <span class="applicant-task-arrow" aria-hidden="true">›</span>
          </button>`).join("")}</div>` : `<div class="applicant-task-empty">Nothing is waiting for this applicant.</div>`}
      </section>
      <section class="applicant-task-section applicant-common-fields">
        <div class="applicant-task-section-head"><h3>Common blank fields in Applicant List</h3><span>captured ${commonFields.length ? "· 70%+ blank" : ""}</span></div>
        ${commonFields.length ? `<div class="applicant-common-field-list">${commonFields.map((item) => `<div class="applicant-common-field"><strong>${escapeHtml(item.header)}</strong><span>${item.blank}/${item.total} blank</span></div>`).join("")}</div>` : `<div class="applicant-task-empty">No common blank-field pattern was detected in the captured list.</div>`}
      </section>
      <section class="applicant-task-section applicant-task-audit">
        <div class="applicant-task-section-head"><h3>Activity log</h3><button class="ghost-btn" data-action="open-tool" data-label="Log">Open full log</button></div>
        ${logs.length ? logs.slice(0, 8).map(renderProfileLogEntry).join("") : `<div class="applicant-task-empty">No data-entry activity has been recorded for this applicant yet.</div>`}
      </section>
    </div>
  `;
  drawer.dataset.mode = "applicant-tasks";
  drawer.classList.add("open");
}

function applicantTaskWorkflowRecord() {
  const id = String(appState.applicantTaskWorkflow.recordId || "");
  return applicantProgressRecords().find((record) => String(record.id || "") === id) || appState.activeApplicant;
}

function applicantTaskWorkflowTask(record = applicantTaskWorkflowRecord()) {
  const tasks = applicantDataTasks(record);
  const selectedId = String(appState.applicantTaskWorkflow.taskId || "");
  return {
    tasks,
    index: Math.max(0, tasks.findIndex((task) => task.id === selectedId)),
    task: tasks.find((task) => task.id === selectedId) || tasks[0],
  };
}

function applicantTaskWorkflowFieldMarkup(task, record) {
  if (!task) return "";
  if (task.row) {
    const headers = profileGridSections[task.section] || [];
    const savedRows = profileSectionData(record)[task.section]?.rows;
    const row = Array.isArray(savedRows) && savedRows.length ? savedRows[0] : {};
    return `<div class="applicant-task-workflow-row-fields">
      <p class="applicant-task-workflow-help">This pending item is stored as a table row. Fill the row details below, then save to add it to ${escapeHtml(task.section)}.</p>
      ${headers.map((label) => renderProfileGridField(task.section, label, profileRowValue(row, label, headers))).join("")}
    </div>`;
  }
  const key = fieldKey(task.field);
  const saved = profileSectionData(record)[task.section] || {};
  const value = applicantTaskValue(record, task.section, task.field);
  const locked = task.section === "Income" && task.field === "Bank";
  const options = locked ? { locked: true, autoImport: "Auto-imported from Account Records" } : {};
  return `<div class="applicant-task-workflow-field-wrap">
    ${renderProfileField(task.field, saved[key] ?? value, options)}
    ${locked && !value ? `<small class="applicant-task-workflow-warning">Complete Account Records first; this value is controlled there.</small>` : ""}
  </div>`;
}

function renderApplicantTaskWorkflow() {
  const modal = document.getElementById("applicantTaskWorkflowModal");
  if (!modal) return;
  const record = applicantTaskWorkflowRecord();
  const { tasks, index, task } = applicantTaskWorkflowTask(record);
  const progress = applicantProgressForRecord(record || {});
  if (!record) {
    modal.innerHTML = "";
    modal.classList.remove("open");
    return;
  }
  if (!tasks.length) {
    modal.innerHTML = `<div class="applicant-task-workflow-backdrop" data-action="close-applicant-task-workflow"></div><section class="applicant-task-workflow-window applicant-task-workflow-complete" role="dialog" aria-modal="true" aria-label="Applicant tasks complete">
      <div class="applicant-task-workflow-head"><div><span class="applicant-task-workflow-kicker">${escapeHtml(record.name || "Applicant")}</span><h2>All tracked tasks complete</h2></div><button class="icon-button" data-action="close-applicant-task-workflow" aria-label="Close">×</button></div>
      <div class="applicant-task-workflow-complete-body"><span class="applicant-task-workflow-complete-icon">✓</span><strong>${progress.percent}% complete</strong><p>There are no remaining data-entry fields for this applicant.</p><button class="primary-btn" data-action="close-applicant-task-workflow">Done</button></div>
    </section>`;
    modal.classList.add("open");
    return;
  }
  const currentTask = task || tasks[0];
  appState.applicantTaskWorkflow.taskId = currentTask.id;
  modal.innerHTML = `<div class="applicant-task-workflow-backdrop" data-action="close-applicant-task-workflow"></div><section class="applicant-task-workflow-window" role="dialog" aria-modal="true" aria-label="Applicant remaining entries">
    <div class="applicant-task-workflow-head"><div><span class="applicant-task-workflow-kicker">Remaining Entries workflow</span><h2>${escapeHtml(record.name || "Applicant")}</h2><small>${escapeHtml(record.id || "—")} · ${progress.percent}% complete</small></div><button class="icon-button" data-action="close-applicant-task-workflow" aria-label="Close">×</button></div>
    <div class="applicant-task-workflow-progress"><div><strong>${index + 1} of ${tasks.length}</strong><span>pending fields</span></div><span class="progress-track"><span class="progress-fill" style="width:${progress.percent}%"></span></span></div>
    <div class="applicant-task-workflow-layout">
      <aside class="applicant-task-workflow-list" aria-label="Pending fields"><div class="applicant-task-workflow-list-head"><strong>Pending fields</strong><span>${tasks.length}</span></div>${tasks.map((item, taskIndex) => `<button class="applicant-task-workflow-list-item${item.id === currentTask.id ? " is-active" : ""}" data-action="select-applicant-task" data-task-id="${escapeHtml(item.id)}"><span class="applicant-task-workflow-number">${taskIndex + 1}</span><span><strong>${escapeHtml(item.field.replace(/\*+$/, ""))}</strong><small>${escapeHtml(item.section)}${item.row ? " · table row" : ""}</small></span><i data-lucide="chevron-right" aria-hidden="true">›</i></button>`).join("")}</aside>
      <main class="applicant-task-workflow-editor"><div class="applicant-task-workflow-editor-head"><span class="applicant-task-priority">${escapeHtml(currentTask.priority)}</span><h3>${escapeHtml(currentTask.field.replace(/\*+$/, ""))}</h3><p>${escapeHtml(currentTask.section)} · ${currentTask.row ? "Add or complete a table row" : "Complete this field and save"}</p></div><form id="applicantTaskWorkflowForm" class="profile-entry-form compact applicant-task-workflow-form" data-task-workflow-section="${escapeHtml(currentTask.section)}" data-task-workflow-id="${escapeHtml(currentTask.id)}">${applicantTaskWorkflowFieldMarkup(currentTask, record)}<div class="applicant-task-workflow-actions"><button type="button" class="ghost-btn" data-action="close-applicant-task-workflow">Cancel</button>${index > 0 ? `<button type="button" class="ghost-btn" data-action="select-previous-applicant-task">Previous</button>` : ""}<button type="button" class="primary-btn" data-action="save-applicant-task">Save</button><button type="button" class="primary-btn applicant-task-workflow-next" data-action="save-applicant-task-next">Save &amp; Next <span aria-hidden="true">→</span></button></div></form></main>
    </div>
  </section>`;
  modal.classList.add("open");
  if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
}

function openApplicantTaskWorkflow(record = appState.activeApplicant, taskId = "") {
  if (!record) return;
  appState.activeApplicant = record;
  appState.applicantTaskWorkflow = { open: true, recordId: String(record.id || ""), taskId: taskId || applicantDataTasks(record)[0]?.id || "" };
  let modal = document.getElementById("applicantTaskWorkflowModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "applicantTaskWorkflowModal";
    modal.className = "applicant-task-workflow-modal";
    document.body.appendChild(modal);
  }
  renderApplicantTaskWorkflow();
}

function closeApplicantTaskWorkflow() {
  appState.applicantTaskWorkflow = { open: false, recordId: "", taskId: "" };
  document.getElementById("applicantTaskWorkflowModal")?.classList.remove("open");
}

function saveApplicantTaskWorkflow(goNext = false) {
  const record = applicantTaskWorkflowRecord();
  const { task } = applicantTaskWorkflowTask(record);
  const form = document.getElementById("applicantTaskWorkflowForm");
  if (!record || !task || !form) return false;
  const formData = new FormData(form);
  const profile = profileSectionData(record);
  profile[task.section] ||= {};
  if (task.row) {
    const required = (profileGridRequiredFields[task.section] || []).map((label) => `${label}*`);
    if (!validateRequiredFields(form, required, task.section)) return false;
    const row = {};
    for (const [key, value] of formData.entries()) row[key] = String(value || "").trim();
    if (!Object.values(row).some(Boolean)) {
      showToast(`Fill at least one ${task.section} field first.`);
      return false;
    }
    profile[task.section].rows ||= [];
    profile[task.section].rows.unshift(row);
    appendProfileLog(record, { type: "new", tab: task.section, dataModule: task.section, changes: [{ field: `${task.section} row`, oldValue: "", newValue: summarizeProfileRow(row) }] });
  } else {
    const key = fieldKey(task.field);
    const nextValue = String(formData.get(key) || "").trim();
    if (!nextValue || nextValue === "Select..." || nextValue === "Title") {
      showToast(`Complete ${task.field.replace(/\*+$/, "")} before saving.`);
      form.elements[key]?.focus();
      return false;
    }
    const previousValue = String(profile[task.section][key] || "").trim();
    profile[task.section][key] = nextValue;
    appendProfileLog(record, { type: "changed", tab: task.section, dataModule: task.section, changes: [{ field: task.field.replace(/\s*\*+\s*$/, ""), oldValue: previousValue, newValue: nextValue }] });
  }
  storeObject(storageKeys.profileSections, data.profileSections);
  const remaining = applicantDataTasks(record);
  if (goNext && remaining.length) {
    appState.applicantTaskWorkflow.taskId = remaining[0].id;
  } else if (!goNext && remaining.length) {
    appState.applicantTaskWorkflow.taskId = remaining[0].id;
  } else {
    appState.applicantTaskWorkflow.taskId = "";
  }
  render();
  renderApplicantTaskWorkflow();
  showToast(`${task.field.replace(/\*+$/, "")} saved. ${remaining.length ? `${remaining.length} task${remaining.length === 1 ? "" : "s"} remaining.` : "All tracked tasks complete."}`);
  return true;
}

function filterProfileLogPanel(input) {
  const query = String(input.value || "").trim().toLowerCase();
  input.closest(".profile-log-drawer")?.querySelectorAll(".profile-log-entry").forEach((entry) => {
    entry.style.display = entry.dataset.logText.toLowerCase().includes(query) ? "" : "none";
  });
}

function formatMoney(value) {
  return moneyValue(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function applicantFileHistoryRows(name) {
  return [];
}

function recordFileHistoryDownload(template, mode = "Account draft Template") {
  const record = appState.activeApplicant;
  if (!record) return;
  const section = accountSectionData(record, "File History");
  section.rows ||= [];
  const timestamp = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  section.rows.unshift([String(template || "Generated Document"), "Download | Preview", timestamp, String(mode || "Account draft Template")]);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, {
    type: "export",
    tab: "File History",
    dataModule: "Account Records",
    changes: [{ field: String(template || "Generated Document"), oldValue: "", newValue: String(mode || "Account draft Template") }],
  });
}

function templateApplicantValue(code, record = appState.activeApplicant) {
  const raw = String(code || "").replace(/^\{+|\}+$/g, "").trim();
  const sections = record ? profileSectionData(record) : {};
  const home = sections.Home || {};
  const official = sections.Official || {};
  const application = sections.Application || {};
  const income = sections.Income || {};
  const account = sections["Account Information"] || {};
  const direct = {
    Name: record?.name || home.applicant || "",
    "First Name": record?.firstName || home.first_name || "",
    "Middle Name": record?.middleName || home.middle_name || "",
    "Last Name": record?.lastName || home.last_name || "",
    Gender: record?.gender || home.gender || "",
    Dob: official.dob || official.dob_bs || "",
    "Birth Place": application.birth_place || "",
    "Citizenship No": official.citizenship_no || "",
    NID: official.nid || official.nid_no || "",
    "Passport No": record?.passport || official.passport_no || "",
    "Passport Issued Date": official.passport_issued_date || "",
    "Passport Expiry Date": record?.passportExpiry || official.passport_expiry_date || "",
    "Phone No": record?.phone || application.phone_no || "",
    "Mobile Number (SMS Purpose)": application.mobile_number_sms_purpose || record?.phone || "",
    Email: application.email || "",
    "Complete Address": record?.address || official.complete_address || "",
    "Temporary Address": application.temporary_address || "",
    "Japan Entry Date": application.japan_entry_date || "",
    "Ward No": official.ward_no || "",
    District: official.district || "",
    Province: official.province || "",
    Bank: account.account_holder_name || record?.bank || "",
    "Interest Rate": account.interest_rate || "",
    "Account Reference No": account.account_reference_no || "",
    "Opening Amount": account.opening_amount || "",
    "Closing Balance": account.closing_balance || "",
    "Income>Sum: Year3": formatMoney(annualIncomeYear3Total(record)),
    "Form Date": application.form_date || todayLabel(),
  };
  const words = String(direct.Name || "").split(/\s+/).filter(Boolean);
  if (/\^\^\^?Name>\s*Last-word/i.test(raw)) return words.at(-1) || "";
  if (/\^\^\^?Name>\s*First-word/i.test(raw)) return words[0] || "";
  if (/\^\^\^?Name>\s*Middle-word/i.test(raw)) return words.slice(1, -1).join(" ");
  if (/Dob>\s*Duration-year/i.test(raw)) return "";
  if (/Form Date>\s*Year/i.test(raw)) return String(direct["Form Date"]).match(/\d{4}/)?.[0] || "";
  if (/Form Date>\s*Month/i.test(raw)) return String(direct["Form Date"]).split(/\s+/)[1] || "";
  if (/Form Date>\s*Day/i.test(raw)) return String(direct["Form Date"]).match(/^\d{1,2}/)?.[0] || "";
  if (/^Income>\s*Sum:\s*Year3/i.test(raw)) return direct["Income>Sum: Year3"];
  if (/^Family>/i.test(raw)) {
    const familyRows = Array.isArray(sections.Family?.rows) ? sections.Family.rows : [];
    const sponsor = familyRows.find((row) => /sponsor/i.test(String(row.type || row.f_a_relation || row["F-A Relation"] || ""))) || familyRows[0] || {};
    const familyKey = raw.split(">").slice(-1)[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
    return sponsor[familyKey] || sponsor[fieldKey(familyKey)] || "";
  }
  if (/^Education>/i.test(raw)) {
    const educationRows = Array.isArray(sections.Education?.rows) ? sections.Education.rows : [];
    const last = educationRows.at(-1) || {};
    const educationKey = raw.split(">").slice(-1)[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
    return last[educationKey] || last[fieldKey(educationKey)] || "";
  }
  if (/^~/.test(raw)) {
    const rowKey = fieldKey(raw.replace(/^~+/, ""));
    const educationKeys = new Set(["title", "institution", "started_year", "started_month", "ended_year", "ended_month", "address", "contact", "gpa_percent"]);
    const rows = educationKeys.has(rowKey)
      ? (Array.isArray(sections.Education?.rows) ? sections.Education.rows : [])
      : (Array.isArray(sections.Family?.rows) ? sections.Family.rows : []);
    return rows.map((row) => row[rowKey] || row[fieldKey(rowKey)] || "").filter(Boolean).join(", ");
  }
  const directKey = Object.keys(direct).find((key) => key.toLowerCase() === raw.toLowerCase());
  if (directKey) return direct[directKey];
  const value = direct[fieldKey(raw)] || home[fieldKey(raw)] || official[fieldKey(raw)] || application[fieldKey(raw)] || income[fieldKey(raw)];
  return value || "";
}

function templateCodeRows(entry, record = appState.activeApplicant) {
  return (entry?.codes || []).map((code) => [code, templateApplicantValue(code, record) || "-"]);
}

function downloadBlob(filename, content, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadTemplateAsset(entry, generated = false, sectionsOverride = null) {
  if (!entry) return;
  const applicant = appState.activeApplicant;
  if (generated && applicant) {
    try {
      const sourceResponse = await fetch(templateAssetUrl(entry));
      if (!sourceResponse.ok) throw new Error("Template source is unavailable");
      const sourceBytes = new Uint8Array(await sourceResponse.arrayBuffer());
      let binary = "";
      const chunkSize = 0x8000;
      for (let offset = 0; offset < sourceBytes.length; offset += chunkSize) {
        binary += String.fromCharCode(...sourceBytes.subarray(offset, Math.min(offset + chunkSize, sourceBytes.length)));
      }
      const renderResponse = await fetch("/api/render-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: entry.filename,
          contentBase64: btoa(binary),
          record: applicant,
          sections: sectionsOverride || profileSectionData(applicant),
        }),
      });
      const result = await renderResponse.json();
      if (!renderResponse.ok || !result.ok) throw new Error(result.error || "Template rendering failed");
      const encoded = atob(result.contentBase64);
      const bytes = new Uint8Array(encoded.length);
      for (let index = 0; index < encoded.length; index += 1) bytes[index] = encoded.charCodeAt(index);
      downloadBlob(result.filename || entry.filename, bytes, result.mime || "application/octet-stream");
      recordFileHistoryDownload(entry.name, "Generated Template");
      showToast(`${entry.name} filled for ${applicant.name || "the applicant"} (${result.replaced || 0} codes placed).`);
    } catch (error) {
      const values = templateCodeRows(entry, applicant);
      const body = [
        `Template: ${entry.name}`,
        `Applicant: ${applicant.name || "Selected applicant"}`,
        `Renderer status: ${error.message}`,
        "",
        ...values.map(([code, value]) => `${code} = ${value}`),
      ].join("\n");
      downloadBlob(`${String(applicant.name || "applicant").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${entry.name.replace(/[^a-z0-9]+/gi, "-")}-code-map.txt`, body);
      showToast("The filled file could not be generated; a diagnostic code map was downloaded.");
    }
    return;
  }
  const anchor = document.createElement("a");
  try {
    const response = await fetch(templateAssetUrl(entry));
    if (!response.ok) throw new Error("Template asset unavailable");
    const blob = await response.blob();
    anchor.href = URL.createObjectURL(blob);
  } catch {
    anchor.href = templateAssetUrl(entry);
  }
  anchor.download = entry.filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  if (anchor.href.startsWith("blob:")) setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
  if (applicant) recordFileHistoryDownload(entry.name, "Template");
}

async function downloadAccountStyleDocument() {
  const record = appState.activeApplicant;
  if (!record) return;
  const styleName = selectedAccountOutputStyle(record);
  const rows = sampleRowsForOutputStyle(record);
  const sections = JSON.parse(JSON.stringify(profileSectionData(record)));
  const account = sections["Account Information"] || {};
  const official = sections.Official || {};
  const referenceSetup = sections["Reference Number Setup"] || {};
  const references = String(referenceSetup.reference_notes || "").split(",").map((item) => item.trim()).filter(Boolean);
  const accountReference = String(account.account_reference_no || account.account_no || "").trim();
  if (!account.account_holder_address || /^(?:-|n\/a|na|not applicable)$/i.test(String(account.account_holder_address).trim())) {
    account.account_holder_address = official.complete_address || official.new_address_full || record.address || record.completeAddress || "";
  }
  if (!accountReference || references.includes(accountReference) || accountReference === String(referenceSetup.reference_start_no || "26366")) {
    account.account_reference_no = record.accountRef || "056-02010";
  }
  sections["Account Information"] = account;
  sections["Transaction Records"] = { ...(sections["Transaction Records"] || {}), rows };
  const entry = styleName ? findTemplateEntry(styleName) : null;
  if (!entry && styleName) {
    showToast(`${styleName} template is not uploaded yet.`);
    return;
  }
  const validation = validateAccountOutput(record, styleName, rows, entry, {
    accountInfo: account,
    transactionSection: sections["Transaction Records"],
  });
  if (blockInvalidAccountOutput(validation)) return;
  await downloadTemplateAsset(entry, true, sections);
}

function templateDrawer(title, entry, body) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `<div class="drawer-head"><div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(entry.name)} · ${escapeHtml(entry.format)} · ${escapeHtml(entry.group || "Uncategorized")}</small></div><button class="icon-button" data-action="close-drawer" title="Close">x</button></div>${body}`;
  drawer.classList.add("open");
}

function openTemplatePreview(entry) {
  const rows = templateCodeRows(entry);
  templateDrawer("Template Preview", entry, `<div class="template-preview-panel"><div class="template-preview-file"><strong>${escapeHtml(entry.filename)}</strong><span>${escapeHtml(entry.source || "Automation")}</span></div><p>Special codes resolve against the active applicant. This is the same code map used by generated document actions.</p>${table(["Special code", "Resolved value"], rows)}<div class="form-actions"><button class="ghost-btn" data-action="template-download" data-template-name="${escapeHtml(entry.name)}">Download source</button><button class="primary-btn" data-action="template-generate" data-template-name="${escapeHtml(entry.name)}">Generate for applicant</button></div></div>`);
}

function openTemplateKeywords(entry) {
  const rows = (entry.codes || []).map((code) => [code, templateApplicantValue(code) || "-"]);
  templateDrawer("Keywords & Values", entry, `<div class="template-keywords-panel"><p>Captured Automation special-code vocabulary for this template.</p>${table(["Keyword", "Current value"], rows)}<button class="primary-btn" data-action="close-drawer">Done</button></div>`);
}

function openTemplateEditor(entry) {
  templateDrawer("Edit Template", entry, `<form class="advanced-filter template-editor-form"><label><span>Template title</span><input name="name" value="${escapeHtml(entry.name)}" required /></label><label><span>Document group</span><input name="group" value="${escapeHtml(entry.group || "")}" /></label><label><span>Special codes</span><textarea name="codes" rows="5">${escapeHtml((entry.codes || []).join("\n"))}</textarea></label><div class="form-actions"><button type="button" class="ghost-btn" data-action="close-drawer">Cancel</button><button type="button" class="primary-btn" data-action="save-template-edit" data-template-name="${escapeHtml(entry.name)}">Save Template</button></div></form>`);
}

function saveTemplateEdit(entry) {
  const form = document.querySelector(".template-editor-form");
  if (!form) return false;
  const values = new FormData(form);
  const edited = { ...entry, sourceName: entry.sourceName || entry.name, name: String(values.get("name") || entry.name).trim(), group: String(values.get("group") || "").trim(), codes: String(values.get("codes") || "").split(/\n|,/).map((value) => value.trim()).filter(Boolean) };
  data.localTemplates = (data.localTemplates || []).filter((item) => (item.sourceName || item.name) !== (entry.sourceName || entry.name));
  data.localTemplates.push(edited);
  storeArray(storageKeys.templates, data.localTemplates);
  closeDetailDrawer();
  render();
  showToast(`${edited.name} template saved locally.`);
  return true;
}

function assignTemplate(entry, assigned) {
  const record = appState.activeApplicant;
  if (!record) {
    showToast("Open an applicant profile before assigning a template.");
    return;
  }
  const profile = profileSectionData(record);
  profile.Templating ||= {};
  profile.Templating.rows ||= [];
  if (assigned) {
    if (!templateIsAssigned(entry, record)) profile.Templating.rows.push([entry.name, entry.format, todayLabel(), "Download | Preview"]);
  } else {
    profile.Templating.rows = profile.Templating.rows.filter((row) => String(row?.[0] || "") !== entry.name);
  }
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, { type: assigned ? "new" : "delete", tab: "Templating", dataModule: "Templating", changes: [{ field: entry.name, oldValue: assigned ? "" : "Assigned", newValue: assigned ? "Assigned" : "" }] });
  render();
  showToast(`${entry.name} ${assigned ? "assigned" : "un-assigned"} locally.`);
}

async function uploadTemplates() {
  const input = document.getElementById("template-upload-input");
  const group = document.getElementById("template-upload-group")?.value || "Uncategorized";
  const files = [...(input?.files || [])];
  if (!files.length) {
    showToast("Choose at least one Word or Excel template file first.");
    return;
  }
  const uploaded = [];
  for (const file of files) {
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
    const name = file.name.replace(/\.(docx|xlsx|xls|csv|txt|html?)$/i, "");
    const format = /\.(xlsx?|csv)$/i.test(file.name) ? "Excel" : "Word";
    try {
      const uploadResponse = await fetch("/api/upload-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentBase64: dataUrl.split(",")[1] || "" }),
      });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadResult.ok) throw new Error(uploadResult.error || "Upload failed");
      uploaded.push({ name, sourceName: name, filename: file.name, format, extension: file.name.split(".").pop().toLowerCase(), group, updated: todayLabel(), source: "Uploaded in clone Document templates", serverUrl: uploadResult.url, codes: [...(templateCodeSets.core || []), ...(templateCodeSets.rows || [])] });
    } catch (error) {
      showToast(`${file.name}: ${error?.message || "Upload failed"}`);
    }
  }
  const names = new Set(uploaded.map((entry) => entry.sourceName));
  data.localTemplates = [...(data.localTemplates || []).filter((entry) => !names.has(entry.sourceName || entry.name)), ...uploaded];
  storeArray(storageKeys.templates, data.localTemplates);
  render();
  showToast(`${uploaded.length} template${uploaded.length === 1 ? "" : "s"} uploaded locally and added to applicant Templating.`);
}

function handleTemplateAction(action, button) {
  if (action === "upload-templates") {
    uploadTemplates();
    return;
  }
  const entry = findTemplateEntry(button.dataset.templateName || "");
  if (!entry) {
    showToast("Template metadata could not be found.");
    return;
  }
  if (action === "template-download") downloadTemplateAsset(entry);
  else if (action === "template-generate") downloadTemplateAsset(entry, true);
  else if (action === "template-preview") openTemplatePreview(entry);
  else if (action === "template-keywords") openTemplateKeywords(entry);
  else if (action === "template-edit") openTemplateEditor(entry);
  else if (action === "template-assign") assignTemplate(entry, true);
  else if (action === "template-unassign") assignTemplate(entry, false);
  else if (action === "save-template-edit") saveTemplateEdit(entry);
}

function renderReport(title, rows = data.recentApplicants) {
  return `
    ${pageHead(title, "Read-only cloned report surface with Automation-style search and export controls.", `<button class="primary-btn" data-action="export-report">Export</button>`)}
    ${panel(title, `<div class="table-tools">
      <input class="filter-input" placeholder="Search report..." />
        <button class="primary-btn" data-action="search">Search</button>
      <button class="ghost-btn" data-action="advanced-filter">Advanced filter</button>
    </div>${table(["Name", "Project", "Updated"], rows)}`, rows.length)}
  `;
}

function renderCmbReport() {
  const rows = statementRows.map((row) => [row[0], row[3], row[8], row[11], row[12]]);
  return `
    ${pageHead("CMB Report", "Bank statement and CMB-oriented financial report surface.", `<button class="primary-btn" data-action="export-report">Export</button>`)}
    <div class="metrics-grid">
      <div class="metric blue"><span>Statement Drafts</span><strong>${statementRows.length}</strong></div>
      <div class="metric green"><span>Bank Modules</span><strong>${data.banks.length}</strong></div>
      <div class="metric orange"><span>Formats</span><strong>${new Set(statementRows.map((row) => row[3])).size}</strong></div>
      <div class="metric red"><span>Locked</span><strong>0</strong></div>
    </div>
    ${panel("CMB Statement Rows", `<div class="table-tools"><input class="filter-input" placeholder="Search applicant..." /><button class="primary-btn" data-action="search">Search</button><button class="ghost-btn" data-action="advanced-filter">Advanced filter</button></div>${table(["Applicant", "Format", "Opening Balance", "Closing Balance", "Edit Locked"], rows)}`, rows.length)}
  `;
}

function renderDocumentProcessReport() {
  const logs = window.fullDocumentLogs || data.documentLogs;
  const templateCounts = logs.reduce((acc, row) => {
    const key = row[0] || "Unknown Template";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const groupedRows = Object.entries(templateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([template, count]) => [template, count, "Generated", "Preview / Download"]);
  const recentRows = logs.slice(0, 12).map((row) => [row[0], row[3], row[4], row[5], row[6]]);
  return `
    ${pageHead("Document Process Report", "Grouped document generation process report from captured export logs.", `<button class="primary-btn" data-action="export-report">Export</button>`)}
    <div class="metrics-grid">
      <div class="metric blue"><span>Captured Exports</span><strong>${logs.length}</strong></div>
      <div class="metric green"><span>Templates</span><strong>${Object.keys(templateCounts).length}</strong></div>
      <div class="metric orange"><span>Observed Total</span><strong>${window.fullDocumentLogMeta?.totalObserved || logs.length}</strong></div>
      <div class="metric red"><span>Storage</span><strong>${window.fullDocumentLogMeta?.sizeObserved || "515.1 MB"}</strong></div>
    </div>
    ${panel("Template Process Summary", `<div class="table-tools"><input class="filter-input" placeholder="Template..." /><button class="primary-btn" data-action="search">Search</button></div>${table(["Template", "Generated Count", "Status", "Action"], groupedRows)}`, groupedRows.length)}
    ${panel("Recent Process Rows", table(["Template", "Exported For", "Exported On", "Mode", "Size"], recentRows), recentRows.length)}
  `;
}

function renderConsultancyStudents(title, consultancyName, count) {
  const smsRows = (window.automationExtraData?.fullSmsReports || data.smsReports).filter((row) => row.join(" ").toLowerCase().includes(title.split(" ")[0].toLowerCase())).slice(0, 8);
  const applicantRows = (window.automationExtraData?.inquiryApplicants || []).slice(0, 12).map((row, index) => [
    index + 1,
    row[0] || "Applicant",
    row[1] || "-",
    row[2] || "-",
    row[3] || "-",
  ]);
  return `
    ${pageHead(title, `${consultancyName} report surface recreated from observed consultancy totals.`, `<button class="primary-btn" data-action="export-report">Export</button>`)}
    <div class="metrics-grid">
      <div class="metric blue"><span>Total Students</span><strong>${count}</strong></div>
      <div class="metric green"><span>Inquiry Rows</span><strong>${window.automationExtraData?.inquiryApplicants?.length || 64}</strong></div>
      <div class="metric orange"><span>SMS Rows</span><strong>${window.automationExtraData?.fullSmsReports?.length || data.smsReports.length}</strong></div>
      <div class="metric red"><span>Documents</span><strong>${(window.fullDocumentLogs || data.documentLogs).length}</strong></div>
    </div>
    ${panel("Student Report", `<div class="table-tools"><input class="filter-input" placeholder="Search student..." /><button class="primary-btn" data-action="search">Search</button><button class="ghost-btn" data-action="advanced-filter">Advanced filter</button></div>${table(["#", "Applicant", "Phone / Code", "Address / Status", "Official"], applicantRows)}`, count)}
    ${panel("Related Communication", smsRows.length ? table(window.automationExtraData?.fullSmsReportHeaders || ["SMS To", "Numbers", "Message", "Count", "Date"], smsRows) : `<div class="empty">No consultancy-specific SMS text captured; use SMS Report for all communication rows.</div>`, smsRows.length)}
  `;
}

function renderFollowupReport() {
  const localRows = data.localFollowups.map((item) => [item.name, item.type, `${item.remarks} · ${item.dueDate}`, item.status]);
  return renderReport("Follow-Up Report", [
    ...localRows,
    ["Follow up pending applicants", "Task", "Overdue 5"],
    ["No due date applicants", "Task", "No Due Date 9"],
    ["Inquiry pipeline", "Applicant", "54"],
  ]);
}

function renderCommunication() {
  return `
    ${pageHead("Communication Summary", "SMS, call and visitor communication overview.")}
    <div class="metrics-grid">
      <div class="metric blue"><span>SMS Credit</span><strong>${data.project.smsCredit}</strong></div>
      <div class="metric green"><span>SMS Rows</span><strong>${data.smsReports.length}</strong></div>
      <div class="metric orange"><span>Visitors</span><strong>${data.visitorRecords.length}</strong></div>
      <div class="metric red"><span>Followups</span><strong>${14 + data.localFollowups.length}</strong></div>
    </div>
    ${panel("Recent Communication", table(["Name", "Channel", "Message", "Age"], data.smsReports.slice(0, 6).map((row) => [row[0], "SMS", row[2], row[4]])), data.smsReports.length)}
  `;
}

function templateEntries() {
  const base = (window.templateLibrary || []).map((entry) => ({ ...entry }));
  const local = Array.isArray(data.localTemplates) ? data.localTemplates : [];
  const overridden = new Set(local.map((entry) => entry.sourceName || entry.name));
  return [...base.filter((entry) => !overridden.has(entry.name)), ...local]
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

async function hydrateServerTemplates() {
  try {
    const response = await fetch("/api/uploaded-templates", { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload.ok || !Array.isArray(payload.entries) || !payload.entries.length) return;
    const masters = new Map((window.templateLibrary || []).map((entry) => [entry.name, entry]));
    const uploaded = payload.entries.map((entry) => ({
      ...(masters.get(entry.name) || {}),
      ...entry,
      sourceName: entry.sourceName || entry.name,
      codes: entry.codes || masters.get(entry.name)?.codes || [],
    }));
    const names = new Set(uploaded.map((entry) => entry.sourceName || entry.name));
    data.localTemplates = [...(data.localTemplates || []).filter((entry) => !names.has(entry.sourceName || entry.name)), ...uploaded];
    storeArray(storageKeys.templates, data.localTemplates);
    render();
  } catch {
    // The clone still works with bundled templates when the optional upload index is unavailable.
  }
}

function findTemplateEntry(name) {
  return templateEntries().find((entry) => entry.name === name) || null;
}

function templateAssetUrl(entry) {
  if (!entry) return "";
  return entry.serverUrl || entry.dataUrl || `./templates/${encodeURIComponent(entry.filename)}`;
}

function templateRowsMarkup(entries, record = appState.activeApplicant) {
  return entries.map((entry) => {
    const assigned = templateIsAssigned(entry, record);
    const source = entry.serverUrl || entry.dataUrl ? "Uploaded" : "Downloaded master";
    return `<tr class="template-row${assigned ? " is-assigned" : ""}" data-template-row="${escapeHtml(entry.name.toLowerCase())}">
      <td><button class="template-title-link" data-action="template-preview" data-template-name="${escapeHtml(entry.name)}">${escapeHtml(entry.name)}</button><small class="template-format">${escapeHtml(entry.format)} · ${escapeHtml(source)}</small></td>
      <td>${escapeHtml(entry.group || "-")}</td>
      <td>${escapeHtml(entry.updated || "-")}</td>
      <td class="template-actions">
        <button class="action-link template-download-link" data-action="template-generate" data-template-name="${escapeHtml(entry.name)}">⇩ Download</button>
        <button class="action-link template-preview-link" data-action="template-preview" data-template-name="${escapeHtml(entry.name)}">◉ Preview</button>
        <button class="action-link template-action-btn template-edit-link" data-action="template-edit" data-template-name="${escapeHtml(entry.name)}">Edit Template</button>
        ${entry.codes?.length ? `<button class="action-link template-action-btn template-keywords-link" data-action="template-keywords" data-template-name="${escapeHtml(entry.name)}">Keywords &amp; Values</button>` : ""}
        <button class="action-link template-action-btn ${assigned ? "template-unassign-link" : "template-assign-link"}" data-action="${assigned ? "template-unassign" : "template-assign"}" data-template-name="${escapeHtml(entry.name)}">${assigned ? "Un-assign" : "Assign"}</button>
      </td>
    </tr>`;
  }).join("");
}

function renderTemplateLibrary(entries = templateEntries(), record = null, options = {}) {
  const orderedEntries = record
    ? [...entries].sort((a, b) => Number(templateIsAssigned(b, record)) - Number(templateIsAssigned(a, record)) || String(a.name).localeCompare(String(b.name)))
    : entries;
  const categories = [...new Set(entries.map((entry) => entry.group || "Uncategorized"))].sort();
  return `<div class="template-settings-toolbar">
    ${options.showUpload === false ? "" : `<label class="template-upload-field"><span>Upload template file(s)</span><input id="template-upload-input" type="file" multiple accept=".docx,.xlsx,.xls,.csv,.txt,.html" /></label>
    <label><span>Document group</span><select id="template-upload-group" class="template-group-select">${selectOptions(["Office Use", "School Forms", "Office Files", "After COE", "Bank", "Uncategorized"], appState.templateUploadGroup)}</select></label>
    <button class="primary-btn" data-action="upload-templates">Upload</button>`}
    <input class="filter-input template-filter" placeholder="Filter..." aria-label="Filter templates" />
    <span class="template-count">${entries.length} templates · ${categories.length} groups</span>
  </div>
  <table class="data-table template-library-table">
    <thead><tr><th>Template Title</th><th>Document group</th><th>Last updated</th><th>Action</th></tr></thead>
    <tbody>${templateRowsMarkup(orderedEntries, record)}</tbody>
    <tfoot><tr><td colspan="4">Template Total: ${entries.length}</td></tr></tfoot>
  </table>`;
}

function renderDocumentResources() {
  const entries = templateEntries();
  return `
    ${pageHead("Document templates", "Master templates captured from Automation Settings. Uploads are available in applicant Templating.")}
    ${panel("Document templates", renderTemplateLibrary(entries), entries.length)}
  `;
}

function renderDataImport() {
  return `
    ${pageHead("Data Import", "Automation-style data import wizard for applicants, visitors and module records.")}
    ${panel("Import Wizard", `<div class="tool-grid">
      <label><span>Import Type</span><select class="data-import-select" data-import-key="type">${selectOptions(["Applicant List", "Visitor List", "Bank Module", "School Module"], appState.dataImportType)}</select></label>
      <label><span>Duplicate Handling</span><select class="data-import-select" data-import-key="duplicate">${selectOptions(["Skip existing records", "Update matching records", "Import as new records"], appState.dataImportDuplicate)}</select></label>
      <label><span>Spreadsheet File</span><input type="file" /></label>
	      <div class="form-actions"><button class="ghost-btn" data-action="map-columns">Map Columns</button><button class="primary-btn" data-action="open-tool" data-label="Data import">Validate Import</button></div>
    </div>`)}
  `;
}

function renderSettings() {
  const rows = [
    ["Project", data.project.name, "Active"],
    ["SMS Balance", data.project.smsCredit, "Active"],
    ["Fiscal Year", "2082/2083", "Active"],
  ];
  return `
    ${pageHead("Settings", "Project settings and project metadata.")}
    ${panel("Project Settings", table(["Setting", "Value", "Status"], rows), rows.length)}
    ${panel("Workflow Settings", `<div class="tool-grid">
      <label><span>Default Branch</span><input value="Special Japanese Language Academy" /></label>
      <label><span>Default Assignee</span><select class="settings-select" data-settings-key="assignee">${selectOptions(["Amrit Sensei", "Sabina Rijal", "Manik Giri"], appState.settingsAssignee)}</select></label>
      <label><span>Records per request</span><select class="settings-select" data-settings-key="pageSize">${selectOptions(["50", "100", "250", "500"], appState.settingsPageSize)}</select></label>
      <div class="form-actions"><button class="primary-btn" data-action="open-tool" data-label="Settings">Save Settings Locally</button></div>
    </div>`)}
  `;
}

function renderTrash() {
  return `
    ${pageHead("Trash", "Archived data and deleted workflow records.")}
    ${panel("Archived - Data in Trash", `<div class="table-tools"><input class="filter-input" placeholder="Filter..." /><button class="primary-btn" data-action="search">Search</button></div>${table(["Name", "Type", "Archived On", "Status"], [
      ["Archived applicant sample", "Applicant", "2026", "Open"],
      ["Old visitor entry", "Visitor", "2026", "Open"],
      ["Unused document resource", "Document", "2026", "Open"],
    ])}`, 11)}
  `;
}

function renderExcelValidation() {
  return renderUtility("Excel File Validation Tool", "Validate uploaded Excel data before import.", ["Upload Excel file", "Select validation profile", "Validate"]);
}

function renderExcelCsv() {
  return renderUtility("Excel to CSV Converter", "Convert spreadsheet files into CSV for data import.", ["Upload Excel file", "Select sheet", "Convert to CSV"]);
}

function renderPdfWord() {
  return renderUtility("PDF to Word Converter", "Convert PDF documents into editable Word drafts.", ["Upload PDF file", "Choose OCR mode", "Convert to Word"]);
}

function renderUtility(title, subtitle, steps) {
  return `
    ${pageHead(title, subtitle)}
    ${panel(title, `<div class="tool-grid">
      <label><span>${escapeHtml(steps[0])}</span><input type="file" /></label>
      <label><span>${escapeHtml(steps[1])}</span><select class="utility-select">${selectOptions(["Default", "Strict", "Flexible"], appState.utilityProfile)}</select></label>
      <div class="tool-surface"><button class="primary-btn" data-action="open-tool" data-label="${escapeHtml(title)}">${escapeHtml(steps[2])}</button><button class="ghost-btn" data-action="refresh-page">Reset</button></div>
    </div>`)}
  `;
}

function renderRustdesk() {
  return `
    ${pageHead("Download Rustdesk", "Remote support launcher represented safely in this workspace.")}
    ${panel("Remote Support", `<div class="tool-surface">
      <div class="empty">The real Automation menu downloads Rustdesk. This workspace keeps it as a safe local action.</div>
      <button class="primary-btn" data-action="rustdesk">Download Rustdesk</button>
    </div>`)}
  `;
}

function render() {
  const route = location.hash.replace("#", "").split("?")[0] || "dashboard";
  const profileRouteOpen = route === "applicant-profile" || (appState.profileWindowOpen && route === "applicants");
  document.body.classList.toggle("applicant-dashboard", route === "applicants");
  document.documentElement.classList.toggle("profile-open", profileRouteOpen);
  document.body.classList.toggle("profile-open", profileRouteOpen);
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.route === route));
  const routes = {
    dashboard: renderDashboard,
    frontdesk: renderFrontdesk,
    "visitor-entry": renderVisitorEntry,
    "visitor-list": renderVisitorList,
    "add-applicant": renderAddApplicant,
    applicants: renderApplicants,
    "applicant-profile": renderApplicantProfile,
    attendance: renderAttendance,
    "payment-dashboard": renderPaymentDashboard,
    "payment-list": () => renderPaymentList("Payment List", ["Payment Date", "Applicant", "Particulars", "Ref. Number", "Payment Amount"]),
    "payment-followup": () => renderPaymentList("Payment Followup", ["Applicant", "Total Payable", "Total Paid", "Total Due", "Due Date", "Due Remarks"]),
    "sms-report": renderSmsReport,
    "document-log": renderDocumentLog,
    "cmb-report": renderCmbReport,
    "document-process-report": renderDocumentProcessReport,
    "quantum-students": () => renderConsultancyStudents("Quantum Students", "Quantum Abroad Studies Pvt. Ltd.", 115),
    "special-japanese-students": () => renderConsultancyStudents("Special Japanese Students", "Special Japanese Language And Computer Institute", 266),
    bank: () => renderModule("Bank", data.banks, ["Bank Name", "Address", "Phone", "Manager's Name", "Interest Rate", "Data Uses Count"]),
    consultancy: () => renderModule("Consultancy", data.consultancies, ["Consultancy Name", "Address", "Phone No", "Teacher's Name", "Data Uses Count"]),
    intake: () => renderModule("Intake", data.intakes, ["Intake Name", "Month", "Year", "Data Uses Count"]),
    school: () => renderModule("School", window.automationExtraData?.fullSchools || data.schools, window.automationExtraData?.fullSchoolHeaders || ["School Name", "Address", "Phone Number", "School Fee", "City Name", "Data Uses Count"]),
    "fiscal-year": () => renderModule("Fiscal Year", window.automationExtraData?.fiscalYears || [["2081/2082", "Active", 31], ["2082/2083", "Active", 54], ["2083/2084", "Draft", 0]], window.automationExtraData?.fiscalYearHeaders || ["Fiscal Year", "Status", "Data Uses Count"]),
    "document-resources": renderDocumentResources,
    "document-templates": renderDocumentResources,
    "data-import": renderDataImport,
    settings: renderSettings,
    trash: renderTrash,
    "excel-validation": renderExcelValidation,
    "excel-csv": renderExcelCsv,
    "pdf-word": renderPdfWord,
    rustdesk: renderRustdesk,
    statement: renderStatement,
    "followup-report": renderFollowupReport,
    communication: renderCommunication,
    visualization: renderVisualization,
  };
  const view = document.getElementById("view");
  view.innerHTML = (routes[route] || renderDashboard)();
  if (appState.profileWindowOpen && route === "applicants") {
    view.insertAdjacentHTML("beforeend", renderApplicantProfileWindow());
  }
  enhanceNativeSelects(view);
  if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
  startDocumentWorkflowClock();
}

renderSidebar();
applyTheme();
window.addEventListener("hashchange", render);

document.addEventListener("pointerdown", (event) => {
  const handle = event.target.closest("[data-profile-resize]");
  const body = handle?.closest(".profile-window-body");
  if (!handle || !body) return;
  profileResizeState.side = handle.dataset.profileResize || "";
  profileResizeState.startX = event.clientX;
  profileResizeState.startLeft = appState.profileLeftWidth;
  profileResizeState.startRight = appState.profileCommentsWidth;
  profileResizeState.moved = false;
  profileResizeState.rail = handle.classList.contains("profile-rail-menu");
  document.documentElement.classList.add("profile-is-resizing");
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  if (!profileResizeState.side) return;
  const body = document.querySelector(".profile-window-body");
  if (!body) return;
  const width = body.getBoundingClientRect().width || 1;
  if (Math.abs(event.clientX - profileResizeState.startX) > 3) profileResizeState.moved = true;
  const delta = ((event.clientX - profileResizeState.startX) / width) * 100;
  const next = profileResizeState.side === "left"
    ? profileResizeState.startLeft + delta
    : profileResizeState.startRight - delta;
  setProfilePanelWidth(profileResizeState.side, next, body);
  event.preventDefault();
});

function finishProfileResize() {
  if (!profileResizeState.side) return;
  const side = profileResizeState.side;
  const wasRail = profileResizeState.rail;
  const wasMoved = profileResizeState.moved;
  storeNumber(side === "left" ? storageKeys.profileLeftWidth : storageKeys.profileCommentsWidth, side === "left" ? appState.profileLeftWidth : appState.profileCommentsWidth);
  profileResizeState.side = "";
  profileResizeState.rail = false;
  profileResizeState.moved = false;
  document.documentElement.classList.remove("profile-is-resizing");
  if (wasRail && !wasMoved) {
    if (side === "left") {
      appState.profileSidebarHidden = true;
      storeBoolean(storageKeys.profileSidebarHidden, true);
      render();
      showToast("Applicant summary hidden");
    } else {
      appState.commentsHidden = true;
      storeBoolean(storageKeys.commentsHidden, true);
      render();
      showToast("Comments panel hidden");
    }
  }
}

document.addEventListener("pointerup", finishProfileResize);
document.addEventListener("pointercancel", finishProfileResize);
document.addEventListener("dblclick", (event) => {
  const handle = event.target.closest("[data-profile-resize]");
  if (!handle || handle.classList.contains("profile-rail-menu")) return;
  resetProfilePanelWidth(handle.dataset.profileResize || "left");
});

document.getElementById("globalSearch").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll(".data-table tbody tr").forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
  });
  renderGlobalResults(query);
});
render();
hydrateServerTemplates();

const themedSelectObserver = new MutationObserver((mutations) => {
  const hasNewSelect = mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
    node.nodeType === Node.ELEMENT_NODE
    && (node.matches?.("select") || node.querySelector?.("select"))
  )));
  if (hasNewSelect) enhanceNativeSelects(document);
});
themedSelectObserver.observe(document.body, { childList: true, subtree: true });

// Match the captured date-picker behavior: dismiss an open calendar when the
// user clicks anywhere outside the picker or its trigger.
document.addEventListener("click", (event) => {
  if (!appState.accountCalendarField) return;
  if (event.target.closest(".account-calendar, [data-action=\"open-account-calendar\"]")) return;
  closeAccountCalendar();
});

document.addEventListener("click", (event) => {
  if (!appState.incomeCalendarField) return;
  if (event.target.closest(".income-calendar, [data-action=\"open-income-calendar\"]")) return;
  closeIncomeCalendar();
});

document.addEventListener("click", (event) => {
  if (!appState.accountFamilyPickerOpen) return;
  if (event.target.closest(".account-family-picker")) return;
  closeAccountFamilyPicker();
});

document.addEventListener("click", (event) => {
  if (!appState.profileMoreCalendarOpen) return;
  if (event.target.closest(".profile-more-calendar, [data-action=\"open-profile-more-calendar\"]")) return;
  closeProfileMoreCalendar();
});

document.addEventListener("input", (event) => {
  if (event.target.matches(".document-checklist-search")) {
    appState.documentChecklistSearch = event.target.value;
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-document-card]").forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  } else if (event.target.matches(".profile-log-search")) {
    filterProfileLogPanel(event.target);
  } else if (event.target.matches(".side-search input")) {
    const query = event.target.value.toLowerCase();
    appState.sidebarSearch = event.target.value;
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.style.display = link.textContent.toLowerCase().includes(query) ? "" : "none";
    });
    const clearButton = document.querySelector(".side-search-clear");
    if (clearButton) clearButton.hidden = !event.target.value;
  } else if (event.target.matches(".column-chooser-search")) {
    appState.applicantColumnSearch = event.target.value;
    filterColumnChooser(event.target.value);
  } else if (event.target.matches(".applicant-todo-search")) {
    appState.applicantTodoSearch = event.target.value;
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".applicant-todo-row").forEach((row) => {
      row.style.display = !query || row.dataset.applicantTodoText.includes(query) ? "" : "none";
    });
  } else if (event.target.matches(".applicant-todo-column-search")) {
    appState.applicantTodoColumnSearch = event.target.value;
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll(".applicant-todo-column-option").forEach((option) => {
      option.style.display = !query || option.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  } else if (event.target.matches(".account-column-chooser-search")) {
    const scope = event.target.dataset.scope || "transaction";
    if (scope === "file") appState.accountFileColumnSearch = event.target.value;
    else appState.accountColumnSearch = event.target.value;
    filterColumnChooser(event.target.value);
  } else if (event.target.matches(".account-record-filter")) {
    filterAccountRecordTable(event.target);
  } else if (event.target.matches(".template-filter")) {
    const query = String(event.target.value || "").toLowerCase().trim();
    document.querySelectorAll(".template-row").forEach((row) => {
      row.style.display = row.dataset.templateRow.includes(query) ? "" : "none";
    });
  } else if (event.target.matches(".applicant-filter-input")) {
    const key = event.target.dataset.filterKey;
    if (key) appState.applicantFilters[key] = event.target.value;
    filterNearestTable(event.target);
  } else if (event.target.matches(".filter-input") || event.target.closest(".table-tools") && event.target.matches("input:not([type='file'])")) {
    filterNearestTable(event.target);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches(".document-checklist-category")) {
    appState.documentChecklistCategory = event.target.value || "All";
    render();
  } else if (event.target.matches(".document-workflow-status")) {
    const documentId = String(event.target.dataset.documentId || "");
    const stageId = String(event.target.dataset.stageId || "");
    const checklistScroll = captureChecklistScroll(documentId);
    setDocumentWorkflowStatus(documentId, stageId, event.target.value);
    render();
    restoreChecklistScroll(checklistScroll);
    showToast(`${checklistEntryFor(documentId).documentName || "Document"} workflow updated.`);
  } else if (event.target.matches(".document-receipt-status")) {
    const documentId = String(event.target.dataset.documentId || "");
    const checklistScroll = captureChecklistScroll(documentId);
    setDocumentReceiptStatus(documentId, event.target.value);
    render();
    restoreChecklistScroll(checklistScroll);
    showToast(`${checklistEntryFor(documentId).documentName || "Document"} receipt status updated.`);
  } else if (event.target.matches('.account-info-form .themed-select-value')) {
    persistAccountInfoSelection(event.target);
    if (event.target.name === "output_document_style") {
      render();
      showToast(`${event.target.value || "Output document style"} selected.`);
    }
  } else if (event.target.matches(".applicant-table-select")) {
    const row = event.target.closest(".data-row");
    if (row) row.dataset.selected = event.target.checked ? "true" : "false";
    const all = document.querySelector(".applicant-select-all");
    if (all) {
      const checkboxes = [...document.querySelectorAll(".applicant-table-select")];
      all.checked = checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox.checked);
      all.indeterminate = checkboxes.some((checkbox) => checkbox.checked) && !all.checked;
    }
  } else if (event.target.matches(".applicant-select-all")) {
    const checked = event.target.checked;
    document.querySelectorAll(".applicant-table-select").forEach((checkbox) => {
      checkbox.checked = checked;
      const row = checkbox.closest(".data-row");
      if (row) row.dataset.selected = checked ? "true" : "false";
    });
  } else if (event.target.matches(".applicant-archived-checkbox")) {
    appState.applicantFilters.archived = event.target.checked;
    appState.applicantPage = 1;
    render();
    showToast(`Archived data ${event.target.checked ? "included" : "excluded"}`);
  } else if (event.target.matches(".applicant-rows-per-page")) {
    appState.applicantRowsPerPage = Number(event.target.value) || 25;
    appState.applicantPage = 1;
    render();
  } else if (event.target.matches(".applicant-filter-select")) {
    const key = event.target.dataset.filterKey;
    if (key) appState.applicantFilters[key] = event.target.value;
    appState.applicantPage = 1;
    render();
    if (key === "pageSize") applyGridLimit(document.querySelector(".applicant-grid-panel"));
    showToast(`${event.target.getAttribute("aria-label") || "Applicant filter"} set to ${event.target.value}`);
  } else if (event.target.matches(".visitor-filter-select")) {
    appState.visitorGender = event.target.value;
    filterNearestTable(event.target);
    showToast(`Visitor gender filter set to ${event.target.value}`);
  } else if (event.target.matches(".template-group-select")) {
    appState.templateUploadGroup = event.target.value;
    showToast(`Uploaded templates will be filed under ${event.target.value}`);
  } else if (event.target.matches(".data-import-select")) {
    const key = event.target.dataset.importKey;
    if (key === "type") appState.dataImportType = event.target.value;
    if (key === "duplicate") appState.dataImportDuplicate = event.target.value;
    showToast(`${event.target.value} selected for import`);
  } else if (event.target.matches(".settings-select")) {
    const key = event.target.dataset.settingsKey;
    if (key === "assignee") appState.settingsAssignee = event.target.value;
    if (key === "pageSize") appState.settingsPageSize = event.target.value;
    showToast(`${event.target.value} selected in settings`);
  } else if (event.target.matches(".utility-select")) {
    appState.utilityProfile = event.target.value;
    showToast(`${event.target.value} validation profile selected`);
  } else if (event.target.matches(".page-size-select")) {
    applyGridLimit(event.target.closest(".panel"));
    showToast(`Showing up to ${event.target.value} rows`);
  } else if (event.target.closest(".table-tools") && event.target.matches("select")) {
    filterNearestTable(event.target);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.getElementById("educationDateConverterModal")) {
    closeEducationDateConverter();
    return;
  }
  if (event.key === "Enter" && event.target.matches("[data-date-converter-input]")) {
    event.preventDefault();
    updateEducationDateConverter(event.target.value);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches(".education-date-converter-backdrop")) {
    closeEducationDateConverter();
    return;
  }
  if (!event.target.closest("[data-profile-select]")) closeProfileSelectMenus();
  const lifecycleButton = event.target.closest("[data-lifecycle]");
  if (lifecycleButton) {
    appState.applicantStatus = lifecycleButton.dataset.lifecycle;
    location.hash = "applicants";
    render();
    showToast(`${appState.applicantStatus} applicant list opened`);
    return;
  }

  const actionButton = event.target.closest("[data-action], button");
  if (!actionButton) return;
  const action = actionButton.dataset.action || actionButton.textContent.trim().toLowerCase();
  const label = actionButton.dataset.label || actionButton.title || actionButton.textContent.trim();

  if (action.startsWith("save-") && !["save-applicant-task", "save-applicant-task-next"].includes(action)) {
    runSaveAction(actionButton, action);
  } else if (action === "clear-sidebar-search") {
    appState.sidebarSearch = "";
    const searchInput = document.querySelector(".side-search input");
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    document.querySelectorAll(".nav-link").forEach((link) => { link.style.display = ""; });
    actionButton.hidden = true;
  } else if (action === "new-sms") {
    location.hash = "sms-report";
    render();
    openSmsComposer();
  } else if (action === "save-visitor") {
    saveVisitor();
  } else if (action === "convert-visitor") {
    convertVisitor(actionButton);
  } else if (["template-download", "template-preview", "template-edit", "template-keywords", "template-assign", "template-unassign", "upload-templates", "save-template-edit", "template-generate"].includes(action)) {
    handleTemplateAction(action, actionButton);
  } else if (action === "preview-document" || action === "download-document") {
    previewDocument(actionButton, action);
  } else if (action === "attendance") {
    openAttendancePanel(actionButton);
  } else if (action === "rustdesk") {
    showToast("Rustdesk download is represented safely; the clone will not download executables.");
  } else if (action === "toggle-theme") {
    appState.darkMode = !appState.darkMode;
    storeBoolean(storageKeys.theme, appState.darkMode);
    applyTheme();
    showToast(appState.darkMode ? "Dark mode enabled" : "Light mode enabled");
  } else if (action === "search") {
    if (actionButton.closest(".applicant-filter-row")) {
      syncApplicantFiltersFromDom();
      appState.applicantPage = 1;
      render();
      showToast("Applicant filters applied");
    } else {
      filterNearestTable(actionButton);
    }
  } else if (action === "reset-applicant-filters") {
    appState.applicantFilters = {
      gender: "Gender",
      intake: "Select...",
      status: "Status",
      classBatch: "Select...",
      dataModule: "Applicant",
      pageSize: "250",
      branch: "",
      name: "",
      currentStatus: "",
      archived: false,
    };
    appState.applicantPage = 1;
    render();
    showToast("Applicant filters reset");
  } else if (action === "toggle-applicant-advanced-filters") {
    syncApplicantFiltersFromDom();
    appState.applicantAdvancedOpen = !appState.applicantAdvancedOpen;
    render();
  } else if (action === "set-applicant-density") {
    appState.applicantDensity = actionButton.dataset.density === "comfortable" ? "comfortable" : "compact";
    render();
  } else if (action === "applicant-page") {
    appState.applicantPage = Number(actionButton.dataset.page) || 1;
    render();
  } else if (action === "applicant-select-row" || action === "applicant-select-all") {
    // Selection state is handled by the change listener so row clicks remain separate.
  } else if (action === "open-applicant") {
    openApplicantProfile(actionButton);
  } else if (action === "sort-table") {
    sortTable(actionButton);
  } else if (action === "applicant-column-chooser") {
    appState.applicantColumnChooserOpen = !appState.applicantColumnChooserOpen;
    render();
  } else if (action === "close-column-chooser") {
    appState.applicantColumnChooserOpen = false;
    appState.applicantColumnSearch = "";
    render();
  } else if (action === "toggle-applicant-column") {
    toggleApplicantColumn(actionButton.dataset.column, actionButton.checked);
    render();
  } else if (action === "applicant-todo-column-chooser") {
    appState.applicantTodoColumnChooserOpen = !appState.applicantTodoColumnChooserOpen;
    appState.applicantTodoColumnSearch = "";
    render();
  } else if (action === "close-applicant-todo-column-chooser") {
    appState.applicantTodoColumnChooserOpen = false;
    appState.applicantTodoColumnSearch = "";
    render();
  } else if (action === "toggle-applicant-todo-column") {
    toggleApplicantTodoColumn(actionButton.dataset.column || "", Boolean(actionButton.checked));
  } else if (action === "open-applicant-progress") {
    const record = applicantProgressRecords().find((item) => String(item.id || "") === String(actionButton.dataset.progressId || ""));
    if (record) {
      appState.activeApplicant = record;
      appState.profileWindowOpen = true;
      storeObject(storageKeys.activeApplicant, record);
      location.hash = "applicants";
      render();
    }
  } else if (action === "profile-column-chooser") {
    openProfileColumnChooser(actionButton.dataset.section || "");
  } else if (action === "profile-column-toggle") {
    toggleProfileColumn(actionButton.dataset.section || "", actionButton.dataset.column || "", actionButton.checked);
  } else if (action === "toggle-profile-select") {
    toggleProfileSelect(actionButton);
  } else if (action === "select-profile-option") {
    selectProfileOption(actionButton);
  } else if (action === "applicant-export-menu") {
    openApplicantExportMenu();
  } else if (action === "applicant-export-all") {
    exportApplicantGrid("all");
  } else if (action === "applicant-export-selected") {
    exportApplicantGrid("selected");
  } else if (action === "applicant-grid-menu") {
    openApplicantGridMenu();
  } else if (action === "toggle-applicant-greeting") {
    const banner = actionButton.closest(".applicant-greeting");
    banner?.classList.toggle("collapsed");
    actionButton.textContent = banner?.classList.contains("collapsed") ? "⌄ Show" : "⌃ Hide";
  } else if (action === "applicant-school-group") {
    showToast("School grouping is active for the applicant grid.");
  } else if (action === "applicant-grid-command") {
    runApplicantGridCommand(actionButton.dataset.command || "");
  } else if (action === "toggle-applicant-grid-option") {
    runApplicantGridCommand(actionButton.dataset.command || "", actionButton.checked);
  } else if (action === "recent-page") {
    appState.recentPage = Number(actionButton.dataset.page) || 1;
    render();
    showToast(`Recently viewed page ${appState.recentPage}`);
  } else if (action === "doc-page") {
    appState.docPage = Number(actionButton.dataset.page) || 1;
    render();
    showToast(`Document Log page ${appState.docPage}`);
  } else if (action === "todo-tab") {
    appState.todoTab = actionButton.dataset.label || "Overdue";
    render();
    showToast(`${appState.todoTab} todo list opened`);
  } else if (action === "drawer-tab") {
    const drawer = actionButton.closest("#detailDrawer");
    drawer?.querySelectorAll(".profile-tabs .tab-button").forEach((button) => button.classList.toggle("active", button === actionButton));
    if (drawer) drawer.dataset.activeTab = actionButton.dataset.tab || "Profile";
    showToast(`${actionButton.dataset.tab || label} tab selected locally.`);
  } else if (action === "apply-advanced-filter") {
    applyAdvancedFilter();
  } else if (action === "save-sms-draft") {
    saveSmsDraft();
  } else if (action === "record-sms") {
    openSmsComposer(recordFromDrawer(actionButton));
  } else if (action === "record-convert") {
    convertRecordVisitor(actionButton);
  } else if (action === "record-followup") {
    openRecordActionPanel(actionButton, "followup");
  } else if (action === "record-payment") {
    openRecordActionPanel(actionButton, "payment");
  } else if (action === "record-document") {
    openRecordActionPanel(actionButton, "document");
  } else if (action === "save-record-followup") {
    saveRecordFollowup();
  } else if (action === "save-record-payment") {
    saveRecordPayment();
  } else if (action === "save-record-document") {
    saveRecordDocument();
  } else if (action === "top-notifications") {
    openTopbarPanel("notifications");
  } else if (action === "top-apps") {
    openTopbarPanel("apps");
  } else if (action === "top-profile") {
    openTopbarPanel("profile");
  } else if (action === "launcher-route") {
    location.hash = actionButton.dataset.route || "dashboard";
    render();
    closeDetailDrawer();
    showToast(`${label || "App"} opened`);
  } else if (action === "global-result") {
    location.hash = actionButton.dataset.route || "dashboard";
    render();
    const input = document.querySelector(".view .filter-input");
    if (input) {
      input.value = actionButton.dataset.query || "";
      filterNearestTable(input);
    }
    document.getElementById("globalResults")?.classList.remove("open");
    showToast(`Opened ${label || "matching record"}`);
  } else if (action.includes("advanced") || action.includes("advance")) {
    openAdvancedFilter(actionButton);
  } else if (action === "refresh" || action === "refresh-page") {
    showToast(`Refreshed ${new Date().toLocaleTimeString()}`);
  } else if (action === "modify-fields") {
    showToast("Field editor opened locally.");
  } else if (action === "pin-profile") {
    appState.profilePinned = !appState.profilePinned;
    showToast(appState.profilePinned ? "Applicant profile pinned locally." : "Applicant profile unpinned locally.");
    render();
  } else if (action === "profile-more") {
    openApplicantMorePanel(appState.activeApplicant);
  } else if (action === "open-applicant-tasks") {
    openApplicantTaskWorkflow(appState.activeApplicant);
  } else if (action === "open-applicant-task") {
    const section = actionButton.dataset.section || "Detail";
    const field = actionButton.dataset.taskField || "";
    openApplicantTaskWorkflow(appState.activeApplicant, `${section}-${fieldKey(field)}`);
  } else if (action === "close-applicant-task-workflow") {
    closeApplicantTaskWorkflow();
  } else if (action === "select-applicant-task") {
    appState.applicantTaskWorkflow.taskId = actionButton.dataset.taskId || "";
    renderApplicantTaskWorkflow();
  } else if (action === "select-previous-applicant-task") {
    const { tasks, index } = applicantTaskWorkflowTask();
    appState.applicantTaskWorkflow.taskId = tasks[Math.max(0, index - 1)]?.id || tasks[0]?.id || "";
    renderApplicantTaskWorkflow();
  } else if (action === "save-applicant-task") {
    saveApplicantTaskWorkflow(false);
  } else if (action === "save-applicant-task-next") {
    saveApplicantTaskWorkflow(true);
  } else if (action === "set-checklist-view") {
    appState.documentChecklistView = actionButton.dataset.view || "required";
    render();
  } else if (action === "set-checklist-requirement") {
    const documentId = String(actionButton.dataset.documentId || "");
    const requirement = actionButton.dataset.requirement || "undecided";
    const checklistScroll = captureChecklistScroll(documentId);
    updateDocumentChecklistEntry(documentId, { requirement }, `Marked ${checklistRequirementLabel(requirement)}`);
    render();
    restoreChecklistScroll(checklistScroll);
    showToast(`${checklistEntryFor(documentId).documentName || "Document"} marked ${checklistRequirementLabel(requirement)}.`);
  } else if (action === "toggle-checklist-visibility") {
    const documentId = String(actionButton.dataset.documentId || "");
    const current = checklistEntryFor(documentId);
    const checklistScroll = captureChecklistScroll(documentId);
    updateDocumentChecklistEntry(documentId, { hidden: !current.hidden }, current.hidden ? "Document unhidden" : "Document hidden");
    render();
    restoreChecklistScroll(checklistScroll);
  } else if (action === "toggle-checklist-receipt") {
    const documentId = String(actionButton.dataset.documentId || "");
    const key = actionButton.dataset.receipt === "original" ? "originalReceipt" : "pdfReceipt";
    const current = checklistEntryFor(documentId);
    const checklistScroll = captureChecklistScroll(documentId);
    updateDocumentChecklistEntry(documentId, { [key]: !current[key] }, `${key === "originalReceipt" ? "Original" : "PDF / Copy"} receipt updated`);
    render();
    restoreChecklistScroll(checklistScroll);
  } else if (action === "repeat-document-workflow-status") {
    const documentId = String(actionButton.dataset.documentId || "");
    const stageId = String(actionButton.dataset.stageId || "");
    const status = String(actionButton.dataset.status || "");
    const checklistScroll = captureChecklistScroll(documentId);
    setDocumentWorkflowStatus(documentId, stageId, status);
    render();
    restoreChecklistScroll(checklistScroll);
    showToast("Sent for Correction repeated and timer restarted.");
  } else if (action === "toggle-checklist-card") {
    toggleDocumentChecklistDetails(String(actionButton.dataset.documentId || ""));
  } else if (action === "toggle-checklist-details") {
    const checklistScroll = captureChecklistScroll();
    const documents = documentChecklistFilteredDocuments(appState.activeApplicant);
    const allExpanded = documents.length && documents.every((document) => appState.documentChecklistExpanded[document.id]);
    documents.forEach((document) => { appState.documentChecklistExpanded[document.id] = !allExpanded; });
    render();
    restoreChecklistScroll(checklistScroll);
  } else if (action === "save-checklist-entry") {
    saveDocumentChecklistEntry(actionButton);
  } else if (action === "show-checklist-history") {
    showDocumentChecklistHistory(String(actionButton.dataset.documentId || ""));
  } else if (action === "close-checklist-history") {
    actionButton.closest(".document-checklist-history-backdrop")?.remove();
  } else if (action === "toggle-checklist-fullscreen") {
    appState.documentChecklistFullscreen = !appState.documentChecklistFullscreen;
    render();
  } else if (action === "print-document-checklist") {
    printDocumentChecklist(actionButton.dataset.report || "summary");
  } else if (action === "share-profile-link") {
    shareApplicantProfile(appState.activeApplicant);
  } else if (action === "edit-profile-photo") {
    chooseApplicantPhoto();
  } else if (action === "post-profile-comment") {
    postProfileComment();
  } else if (action === "save-profile-more") {
    saveApplicantMoreSettings();
  } else if (action === "copy-applicant") {
    copyApplicantProfile(appState.activeApplicant);
  } else if (action === "open-profile-more-calendar") {
    openProfileMoreCalendar();
  } else if (action === "profile-more-calendar-prev-month" || action === "profile-more-calendar-next-month") {
    moveProfileMoreCalendarMonth(action === "profile-more-calendar-prev-month" ? -1 : 1);
  } else if (action === "profile-more-calendar-select-date") {
    selectProfileMoreCalendarDate(actionButton.dataset.date);
  } else if (action === "open-translation") {
    openTranslationPanel(actionButton);
  } else if (action === "translation-copy") {
    copyTranslationResult();
  } else if (action === "translation-ok") {
    applyTranslationResult();
  } else if (action === "translation-close") {
    closeTranslationPanel();
  } else if (action === "open-education-date-converter") {
    openEducationDateConverter();
  } else if (action === "close-education-date-converter") {
    closeEducationDateConverter();
  } else if (action === "copy-education-date-conversion") {
    copyEducationDateConversion(actionButton);
  } else if (action === "education-date-widget-tab") {
    const widget = actionButton.closest(".hamropatro-widget");
    widget?.querySelectorAll(".hamropatro-tabs button").forEach((button) => button.classList.toggle("active", button === actionButton));
    const messages = { convert: "मिति परिवर्तनका लागि माथि मिति लेखेर Enter थिच्नुहोस्।", difference: "दुई मितिबीचको फरक यहाँ देखाइनेछ।", age: "जन्ममिति लेखेपछि उमेर यहाँ देखाइनेछ।" };
    const note = widget?.querySelector("[data-widget-panel]");
    if (note) note.textContent = messages[actionButton.dataset.widgetTab] || messages.convert;
  } else if (action === "save-applicant") {
    saveApplicant();
  } else if (action === "close-applicant-modal") {
    location.hash = "applicants";
    render();
    showToast("Add New Applicant closed");
  } else if (action === "applicant-profile-close") {
    if (appState.profileWindowOpen) {
      appState.profileWindowOpen = false;
      closeDetailDrawer();
      render();
      showToast("Applicant profile window closed");
      return;
    }
    location.hash = "applicants";
    render();
  } else if (action === "hide-comments") {
    appState.commentsHidden = true;
    storeBoolean(storageKeys.commentsHidden, true);
    render();
    showToast("Comments panel hidden");
  } else if (action === "show-comments") {
    appState.commentsHidden = false;
    storeBoolean(storageKeys.commentsHidden, false);
    render();
    showToast("Comments panel shown");
  } else if (action === "hide-profile-sidebar") {
    appState.profileSidebarHidden = true;
    storeBoolean(storageKeys.profileSidebarHidden, true);
    render();
    showToast("Applicant summary hidden");
  } else if (action === "show-profile-sidebar") {
    appState.profileSidebarHidden = false;
    storeBoolean(storageKeys.profileSidebarHidden, false);
    render();
    showToast("Applicant summary shown");
  } else if (action === "profile-tab") {
    appState.profileMainTab = actionButton.dataset.tab || "Account Records";
    if (appState.profileMainTab === "Account Records" && !profileSubTabs.includes(appState.profileSubTab)) {
      appState.profileSubTab = "File History";
    }
    render();
  } else if (action === "profile-sub-tab") {
    appState.profileMainTab = "Account Records";
    appState.profileSubTab = actionButton.dataset.tab || "File History";
    render();
  } else if (action === "save-profile-form") {
    saveProfileForm(actionButton.dataset.section);
  } else if (action === "edit-profile-row") {
    openProfileRowEditor(actionButton.dataset.section, Number(actionButton.dataset.rowIndex));
  } else if (action === "add-profile-row") {
    addProfileRow(actionButton.dataset.section);
  } else if (action === "save-account-info") {
    saveAccountInfo();
  } else if (action === "toggle-account-info-auto-lock") {
    toggleAccountInfoAutoLock(Boolean(actionButton.checked));
  } else if (action === "toggle-account-info-saved-lock") {
    toggleAccountInfoSavedLock(Boolean(actionButton.checked));
  } else if (action === "open-account-family-picker") {
    openAccountFamilyPicker();
  } else if (action === "close-account-family-picker") {
    closeAccountFamilyPicker();
  } else if (action === "select-account-family") {
    selectAccountFamily(Number(actionButton.dataset.familyIndex));
  } else if (action === "select-family-account-holder") {
    selectFamilyAccountHolder(Number(actionButton.dataset.rowIndex));
  } else if (action === "change-family-account-holder") {
    appState.familyAccountHolderSelectionMode = !appState.familyAccountHolderSelectionMode;
    render();
  } else if (action === "account-import-name") {
    importAccountField("account_holder_name", appState.activeApplicant?.name || "");
  } else if (action === "account-import-address") {
    importAccountField("account_holder_address", appState.activeApplicant?.address || appState.activeApplicant?.completeAddress || "-");
  } else if (action === "account-select-field") {
    selectAccountDate(actionButton.dataset.field);
  } else if (action === "open-account-calendar") {
    openAccountCalendar(actionButton.dataset.field);
  } else if (action === "close-account-calendar") {
    closeAccountCalendar();
  } else if (action === "calendar-prev-month" || action === "calendar-next-month") {
    moveAccountCalendarMonth(action === "calendar-prev-month" ? -1 : 1);
  } else if (action === "calendar-select-date") {
    selectAccountCalendarDate(actionButton.dataset.date);
  } else if (action === "open-income-calendar") {
    openIncomeCalendar(actionButton.dataset.field);
  } else if (action === "close-income-calendar") {
    closeIncomeCalendar();
  } else if (action === "income-calendar-prev-month" || action === "income-calendar-next-month") {
    moveIncomeCalendarMonth(action === "income-calendar-prev-month" ? -1 : 1);
  } else if (action === "income-calendar-select-date") {
    selectIncomeCalendarDate(actionButton.dataset.date);
  } else if (action === "calculate-opening-amount") {
    calculateOpeningAmount();
  } else if (action === "generate-reference-numbers") {
    generateReferenceNumbers();
  } else if (action === "add-account-transaction") {
    addAccountTransaction();
  } else if (action === "calculate-account-transactions") {
    calculateAccountTransactions();
  } else if (action === "copy-account-transactions") {
    copyAccountTransactions();
  } else if (action === "account-column-chooser") {
    toggleAccountColumnChooser(actionButton.dataset.scope || "transaction");
  } else if (action === "close-account-column-chooser") {
    closeAccountColumnChooser(actionButton.dataset.scope || "transaction");
  } else if (action === "toggle-account-column") {
    toggleAccountColumn(actionButton.dataset.scope || "transaction", actionButton.dataset.column, actionButton.checked);
  } else if (action === "account-page-size") {
    appState.accountTransactionPageSize = Number(actionButton.dataset.size) || 10;
    render();
    showToast(`Showing up to ${appState.accountTransactionPageSize} transaction rows`);
  } else if (action === "account-overflow-menu") {
    appState.accountOverflowOpen = !appState.accountOverflowOpen;
    render();
  } else if (action === "toggle-account-transaction-select") {
    toggleAccountTransactionSelect(actionButton.dataset.index, actionButton.checked);
  } else if (action === "delete-account-transactions") {
    deleteSelectedAccountTransactions();
  } else if (action === "assign-reference-numbers") {
    assignAccountReferenceNumbers();
  } else if (action === "validate-transaction-duration") {
    validateTransactionDuration();
  } else if (action === "open-import-transactions") {
    openAccountPanel("import");
  } else if (action === "export-account-transactions") {
    exportAccountTransactionsCsv();
  } else if (action === "open-sample-records") {
    openAccountPanel("sample");
  } else if (action === "preview-sample-records") {
    previewSampleRecords();
  } else if (action === "apply-sample-records") {
    applySampleRecords();
  } else if (action === "regenerate-sample-records") {
    regenerateSampleRecords();
  } else if (action === "reset-sample-record-data") {
    resetSampleRecordData();
  } else if (action === "toggle-sample-figures") {
    toggleSampleFigures();
  } else if (action === "save-sample-records") {
    saveSampleRecords();
  } else if (action === "preview-account-style") {
    previewAccountStyleDocument();
  } else if (action === "download-account-style") {
    downloadAccountStyleDocument();
  } else if (action === "open-prior-period-preview") {
    openAccountPanel("prior");
  } else if (action === "regenerate-prior-period") {
    regeneratePriorPeriodPreview();
  } else if (action === "import-prior-period") {
    importPriorPeriodPreview();
  } else if (action === "open-transaction-analysis") {
    openAccountPanel("analysis");
  } else if (action === "open-edit-transaction-person") {
    openAccountPanel("edit-person");
  } else if (action === "apply-transaction-person-edit") {
    applyTransactionPersonEdit();
  } else if (action === "apply-csv-import") {
    applyCsvImport();
  } else if (action === "reset-transaction-layout") {
    resetTransactionLayout();
  } else if (action === "toggle-account-preview-fullscreen") {
    toggleAccountPreviewFullscreen();
  } else if (action === "close-account-panel") {
    openAccountPanel("");
  } else if (action === "add-module") {
    openModuleForm(label);
  } else if (action === "save-module-row") {
    saveModuleRow();
  } else if (action === "map-columns") {
    openColumnMapping();
  } else if (action === "open-tool") {
    openToolPanel(actionButton, label);
  } else if (action === "export-report") {
    exportNearestTable(actionButton, label);
  } else if (action === "copy") {
    copyNearestTable(actionButton);
  } else if (action === "column chooser") {
    openToolPanel(actionButton, "Column Chooser");
  } else if (action === "cancel") {
    closeDetailDrawer();
    showToast("Cancelled locally.");
  } else if (action.includes("upload") || action === "validate" || action.includes("convert")) {
    openToolPanel(actionButton, label);
  } else if (/^(page|items per page|\d+$)/.test(action)) {
    showToast(`${label} selected locally.`);
  } else if (action === "group-grid") {
    showToast("Grouping bar is active; drag behavior is represented visually.");
  } else if (action === "close-drawer") {
    closeDetailDrawer();
  } else {
    showToast(`${label} opened locally.`);
  }
});

document.addEventListener("click", (event) => {
  const row = event.target.closest(".data-row");
  if (!row || event.target.closest("button, input, select, a")) return;
  const route = location.hash.replace("#", "").split("?")[0] || "dashboard";
  if (route === "applicants") {
    openApplicantProfile(row);
    return;
  }
  openDetailDrawer(row);
});

document.addEventListener("reset", (event) => {
  if (event.target.matches("#visitorForm")) {
    showToast("Visitor form cleared");
  } else if (event.target.matches("#applicantForm")) {
    showToast("Applicant form cleared");
  }
});

function filterNearestTable(button) {
  const panelElement = button.closest(".panel");
  const terms = toolbarFilterTerms(panelElement);
  panelElement?.querySelectorAll(".data-table tbody tr").forEach((row) => {
    const haystack = row.textContent.toLowerCase();
    row.dataset.filterHidden = terms.every((term) => haystack.includes(term)) ? "false" : "true";
  });
  applyGridLimit(panelElement);
  if (!button.matches(".filter-input")) {
    showToast(terms.length ? `Filtered results for "${terms.join(", ")}"` : "Showing all rows");
  }
}

function syncApplicantFiltersFromDom() {
  const scope = document.querySelector(".applicant-filter-row");
  if (!scope) return;
  scope.querySelectorAll("[data-filter-key]").forEach((control) => {
    const key = control.dataset.filterKey;
    if (key) appState.applicantFilters[key] = control.type === "checkbox" ? control.checked : control.value;
  });
}

function filterColumnChooser(value) {
  const query = String(value || "").trim().toLowerCase();
  document.querySelectorAll(".column-chooser-list label").forEach((label) => {
    label.style.display = label.textContent.toLowerCase().includes(query) ? "" : "none";
  });
}

function filterAccountRecordTable(input) {
  const query = String(input.value || "").trim().toLowerCase();
  const workspace = input.closest(".account-records-workspace");
  workspace?.querySelectorAll(".account-record-table tbody tr").forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
  });
}

function toggleApplicantColumn(column, checked) {
  if (!column) return;
  const headers = applicantAllColumns(window.automationExtraData?.inquiryApplicantHeaders || applicantDefaultColumns);
  const current = new Set(applicantVisibleHeaders(headers));
  if (checked) {
    current.add(column);
  } else if (current.size > 1) {
    current.delete(column);
  }
  data.applicantVisibleColumns = headers.filter((header) => current.has(header));
  storeArray(storageKeys.applicantVisibleColumns, data.applicantVisibleColumns);
  showToast(`${column} column ${checked ? "shown" : "hidden"}`);
}

function toolbarFilterTerms(panelElement) {
  if (!panelElement) return [];
  const terms = [];
  panelElement.querySelectorAll(".table-tools input:not([type='file']), .applicant-filter-row input:not([type='file']), .automation-grid-toolbar input:not([type='file'])").forEach((input) => {
    const value = String(input.value || "").trim().toLowerCase();
    if (value) terms.push(value);
  });
  panelElement.querySelectorAll(".table-tools select:not(.page-size-select), .applicant-filter-row select:not(.page-size-select), .table-tools .themed-select-value:not(.page-size-select), .applicant-filter-row .themed-select-value:not(.page-size-select)").forEach((select) => {
    const value = String(select.value || "").trim().toLowerCase();
    const optionIndex = Number(select.dataset.optionIndex ?? select.selectedIndex ?? 0);
    if (optionIndex > 0 && value && !/all|select|gender|status|intake|branch|class|module|records/.test(value)) {
      terms.push(value);
    }
  });
  return terms;
}

function applyGridLimit(panelElement) {
  if (!panelElement) return;
  const select = panelElement.querySelector(".page-size-select");
  const limit = Number(select?.value);
  const rows = [...panelElement.querySelectorAll(".data-table tbody tr")];
  let visibleIndex = 0;
  rows.forEach((row) => {
    const filterHidden = row.dataset.filterHidden === "true";
    const limitHidden = Number.isFinite(limit) && limit > 0 && visibleIndex >= limit;
    row.style.display = filterHidden || limitHidden ? "none" : "";
    if (!filterHidden) visibleIndex += 1;
  });
}

function sortTable(button) {
  const tableElement = button.closest("table");
  const body = tableElement?.querySelector("tbody");
  if (!tableElement || !body) return;
  const columnIndex = Number(button.dataset.index) || 0;
  const direction = button.dataset.direction === "asc" ? "desc" : "asc";
  tableElement.querySelectorAll(".sort-button").forEach((item) => {
    item.dataset.direction = "";
    item.removeAttribute("aria-sort");
  });
  button.dataset.direction = direction;
  button.setAttribute("aria-sort", direction);
  const rows = [...body.querySelectorAll("tr")].filter((row) => !row.querySelector(".empty"));
  rows.sort((a, b) => {
    const av = a.children[columnIndex]?.textContent.trim() || "";
    const bv = b.children[columnIndex]?.textContent.trim() || "";
    return av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" }) * (direction === "asc" ? 1 : -1);
  });
  rows.forEach((row) => body.appendChild(row));
  showToast(`Sorted ${button.textContent.trim()} ${direction}`);
}

function rowPayloadFromControl(control) {
  const row = control.closest(".data-row");
  if (!row) return { headers: [], values: [] };
  try {
    return {
      headers: JSON.parse(decodeURIComponent(row.dataset.headers || "[]")),
      values: JSON.parse(decodeURIComponent(row.dataset.row || "[]")),
    };
  } catch {
    return { headers: [], values: [] };
  }
}

function rowPayloadFromRow(row) {
  try {
    return {
      headers: JSON.parse(decodeURIComponent(row.dataset.headers || "[]")),
      values: JSON.parse(decodeURIComponent(row.dataset.row || "[]")),
    };
  } catch {
    return { headers: [], values: [] };
  }
}

function openApplicantProfile(row) {
  const { headers, values } = rowPayloadFromRow(row);
  const record = profileRecord(headers, values);
  record.id = values[0] || "67066";
  record.created = values[6] || record.created || "March 3, 2024 11:24 AM";
  appState.activeApplicant = record;
  appState.profileWindowOpen = true;
  closeDetailDrawer();
  storeObject(storageKeys.activeApplicant, record);
  render();
}

function loadLocalState() {
  return {
    activeApplicant: readStoredObject(storageKeys.activeApplicant),
    applicantVisibleColumns: readStoredArray(storageKeys.applicantVisibleColumns),
    commentsHidden: readStoredBoolean(storageKeys.commentsHidden),
    profileSidebarHidden: readStoredBoolean(storageKeys.profileSidebarHidden),
    applicants: readStoredArray(storageKeys.applicants),
    followups: readStoredArray(storageKeys.followups),
    modules: readStoredObject(storageKeys.modules),
    payments: readStoredArray(storageKeys.payments),
    profileSections: readStoredObject(storageKeys.profileSections),
    profileLogs: readStoredObject(storageKeys.profileLogs),
    smsDrafts: readStoredArray(storageKeys.smsDrafts),
    visitors: readStoredArray(storageKeys.visitors),
    templates: readStoredArray(storageKeys.templates),
    documentChecklists: readStoredObject(storageKeys.documentChecklists),
    darkMode: readStoredBoolean(storageKeys.theme),
    profileLeftWidth: readStoredNumber(storageKeys.profileLeftWidth, 22),
    profileCommentsWidth: readStoredNumber(storageKeys.profileCommentsWidth, 22),
    applicantTodoVisibleColumns: readStoredArray(storageKeys.applicantTodoVisibleColumns),
  };
}

function applyTheme() {
  document.documentElement.classList.toggle("dark-mode", Boolean(appState.darkMode));
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.textContent = appState.darkMode ? "☀" : "◐";
    toggle.title = appState.darkMode ? "Switch to light mode" : "Switch to dark mode";
    toggle.setAttribute("aria-label", toggle.title);
  }
}

const profileResizeState = {
  side: "",
  startX: 0,
  startLeft: 22,
  startRight: 22,
  moved: false,
  rail: false,
};

function clampProfileWidth(value) {
  return Math.min(38, Math.max(12, Number(value) || 22));
}

function setProfilePanelWidth(side, value, body = document.querySelector(".profile-window-body")) {
  const width = clampProfileWidth(value);
  if (side === "left") {
    appState.profileLeftWidth = width;
    body?.style.setProperty("--profile-left-width", `${width}%`);
  } else if (side === "right") {
    appState.profileCommentsWidth = width;
    body?.style.setProperty("--profile-right-width", `${width}%`);
  }
}

function resetProfilePanelWidth(side) {
  setProfilePanelWidth(side, 22);
  storeNumber(side === "left" ? storageKeys.profileLeftWidth : storageKeys.profileCommentsWidth, 22);
  showToast(`${side === "left" ? "Applicant summary" : "Comments"} panel width reset`);
}

function readStoredArray(key) {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readStoredObject(key) {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readStoredBoolean(key) {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function readStoredNumber(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw.trim() === "") return fallback;
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function storeArray(key, rows) {
  try {
    localStorage.setItem(key, JSON.stringify(rows));
  } catch {
    showToast("Local browser storage is unavailable.");
  }
}

function storeBoolean(key, value) {
  try {
    localStorage.setItem(key, value ? "true" : "false");
  } catch {
    showToast("Local browser storage is unavailable.");
  }
}

function storeNumber(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    showToast("Local browser storage is unavailable.");
  }
}

function storeObject(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Local browser storage is unavailable.");
  }
}

function todayLabel() {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).replace(" ", " ");
}

const saveAnimationDuration = 3000;

function saveButtonForAction(action, sourceButton) {
  if (sourceButton?.isConnected) return sourceButton;
  if (action === "save-profile-form") {
    const section = sourceButton?.dataset.section || "";
    return [...document.querySelectorAll('[data-action="save-profile-form"]')].find((button) => button.dataset.section === section) || null;
  }
  if (action === "save-template-edit") return document.querySelector('[data-action="save-template-edit"]');
  return document.querySelector(`[data-action="${cssEscape(action)}"]`);
}

function runSaveAction(button, action) {
  if (button?.dataset.saveBusy === "true") return;
  const section = button?.dataset.section || "";
  let result;
  switch (action) {
    case "save-visitor": result = saveVisitor(); break;
    case "save-sms-draft": result = saveSmsDraft(); break;
    case "save-record-followup": result = saveRecordFollowup(); break;
    case "save-record-payment": result = saveRecordPayment(); break;
    case "save-record-document": result = saveRecordDocument(); break;
    case "save-applicant": result = saveApplicant(); break;
    case "save-profile-more": result = saveApplicantMoreSettings(); break;
    case "save-profile-form": result = saveProfileForm(section); break;
    case "save-profile-row": result = saveProfileRow(section, Number(button?.dataset.rowIndex)); break;
    case "save-account-info": result = saveAccountInfo(); break;
    case "save-sample-records": result = saveSampleRecords(); break;
    case "save-module-row": result = saveModuleRow(); break;
    case "save-template-edit": {
      const entry = (data.localTemplates || []).find((item) => (item.sourceName || item.name) === button.dataset.templateName);
      result = entry ? saveTemplateEdit(entry) : false;
      break;
    }
    default: return;
  }
  if (result === false) return;
  const saveButton = saveButtonForAction(action, button);
  const originalHtml = saveButton?.innerHTML || "";
  if (saveButton) {
    saveButton.dataset.saveBusy = "true";
    saveButton.classList.add("is-saving");
    saveButton.setAttribute("aria-busy", "true");
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="save-spinner" aria-hidden="true"></span> Saving…';
  }
  const indicator = document.createElement("div");
  indicator.className = "save-progress-indicator";
  indicator.setAttribute("role", "status");
  indicator.innerHTML = '<span class="save-spinner" aria-hidden="true"></span><span>Saving changes…</span>';
  document.body.appendChild(indicator);
  window.setTimeout(() => {
    const successMarkup = '<span class="save-success-burst" aria-hidden="true"><span class="save-tick-mark">✓</span><i class="save-spark spark-1"></i><i class="save-spark spark-2"></i><i class="save-spark spark-3"></i><i class="save-spark spark-4"></i><i class="save-spark spark-5"></i><i class="save-spark spark-6"></i><i class="save-spark spark-7"></i><i class="save-spark spark-8"></i></span><span>Saved successfully</span>';
    if (saveButton?.isConnected) {
      saveButton.innerHTML = '<span class="save-success-inline" aria-hidden="true">✓</span> Saved';
      saveButton.disabled = false;
      saveButton.classList.remove("is-saving");
      saveButton.classList.add("is-saved");
      saveButton.removeAttribute("aria-busy");
      delete saveButton.dataset.saveBusy;
    }
    indicator.classList.add("is-success");
    indicator.innerHTML = successMarkup;
    window.setTimeout(() => {
      if (saveButton?.isConnected) {
        saveButton.innerHTML = originalHtml || "Save";
        saveButton.classList.remove("is-saved");
      }
      indicator.remove();
      showToast("Saved successfully.");
    }, 900);
  }, saveAnimationDuration);
}

function saveApplicant() {
  const form = document.getElementById("applicantForm");
  if (!form) return false;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const gender = String(formData.get("gender") || "").trim();
  if (!name || !firstName || !lastName || gender === "Select...") {
    showToast("Applicant, First Name, Last Name and Gender are required.");
    return false;
  }
  const applicant = {
    name,
    firstName,
    middleName: String(formData.get("middleName") || "").trim(),
    lastName,
    gender,
    nameJapanese: String(formData.get("nameJapanese") || "").trim(),
    firstNameJapanese: String(formData.get("firstNameJapanese") || "").trim(),
    middleNameJapanese: String(formData.get("middleNameJapanese") || "").trim(),
    lastNameJapanese: String(formData.get("lastNameJapanese") || "").trim(),
    nameNepali: String(formData.get("nameNepali") || "").trim(),
    firstNameNepali: String(formData.get("firstNameNepali") || "").trim(),
    middleNameNepali: String(formData.get("middleNameNepali") || "").trim(),
    lastNameNepali: String(formData.get("lastNameNepali") || "").trim(),
    assignUser: String(formData.get("assignUser") || "").trim(),
    status: "Inquiry",
    official: String(formData.get("assignUser") || "").trim(),
    created: todayLabel(),
  };
  data.localApplicants.unshift(applicant);
  storeArray(storageKeys.applicants, data.localApplicants);
  form.reset();
  location.hash = "applicants";
  render();
  showToast("Applicant draft saved locally and added to Applicant List.");
  return true;
}

function saveProfileForm(section) {
  if (!section) {
    showToast("Choose a profile section first.");
    return false;
  }
  if (section === "Account Information") return saveAccountInfo();
  const form = document.querySelector(`.profile-entry-form[data-profile-section="${cssEscape(section)}"]`);
  if (!form) return false;
  if (!validateRequiredFields(form, profileFormFields[section], section)) return false;
  const formData = new FormData(form);
  const sectionData = profileSectionData();
  sectionData[section] ||= {};
  const lockedIncomeBank = section === "Income" ? accountBankForRecord(appState.activeApplicant) : "";
  const changes = [];
  for (const [key, value] of formData.entries()) {
    const nextValue = section === "Income" && key === "bank"
      ? lockedIncomeBank
      : String(value || "").trim();
    const previousValue = String(sectionData[section][key] || "").trim();
    if (previousValue !== nextValue) {
      const label = profileFormFields[section]?.find((item) => fieldKey(item) === key) || key;
      changes.push({ field: label.replace(/\s*\*+\s*$/, ""), oldValue: previousValue, newValue: nextValue });
    }
    sectionData[section][key] = nextValue;
  }
  storeObject(storageKeys.profileSections, data.profileSections);
  if (changes.length) appendProfileLog(appState.activeApplicant, { type: "changed", tab: section, dataModule: section, changes });
  if (changes.length) render();
  showToast(`${section} saved locally.`);
  return true;
}

function addProfileRow(section) {
  if (!section) return;
  const form = document.querySelector(`.profile-entry-form[data-profile-section="${cssEscape(section)}"]`);
  if (!form) return;
  if (!validateRequiredFields(form, (profileGridRequiredFields[section] || []).map((label) => `${label}*`), section)) return;
  const formData = new FormData(form);
  const row = {};
  for (const [key, value] of formData.entries()) {
    if (value && typeof value === "object" && "name" in value) {
      row[key] = value.name || "";
    } else {
      row[key] = String(value || "").trim();
    }
  }
  form.querySelectorAll('input[type="file"]').forEach((input) => {
    const names = [...(input.files || [])].map((file) => file.name).filter(Boolean);
    if (names.length) row[input.name] = names.join(", ");
  });
  if (section === "Family") row.account_holder = "false";
  if (!Object.values(row).some(Boolean)) {
    showToast(`Fill at least one ${section} field first.`);
    return;
  }
  const sectionData = profileSectionData();
  sectionData[section] ||= {};
  sectionData[section].rows ||= [];
  sectionData[section].rows.unshift(row);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(appState.activeApplicant, {
    type: "new",
    tab: section,
    dataModule: section,
    changes: [{ field: `${section} (Sno ${row.sno || row[fieldKey("SNo")] || "-"})`, oldValue: "", newValue: summarizeProfileRow(row) }],
  });
  form.reset();
  render();
  showToast(`${section} row added locally.`);
}

function saveProfileRow(section, rowIndex) {
  const record = appState.activeApplicant;
  const form = document.querySelector('form[data-profile-row-editor="true"]');
  const rows = Array.isArray(profileSectionData(record)[section]?.rows) ? profileSectionData(record)[section].rows : [];
  const index = Number.isInteger(rowIndex) ? rowIndex : Number(form?.dataset.rowIndex);
  const row = rows[index];
  const headers = profileGridSections[section] || [];
  if (!record || !form || !row || !headers.length || !Number.isInteger(index) || index < 0) {
    showToast("Choose a saved table row before saving.");
    return false;
  }
  if (!validateRequiredFields(form, (profileGridRequiredFields[section] || []).map((label) => `${label}*`), section)) return false;
  const formData = new FormData(form);
  const changes = [];
  headers.forEach((header) => {
    const key = fieldKey(header);
    const previousValue = String(profileRowValue(row, header, headers) ?? "").trim();
    const nextValue = String(formData.get(key) || "").trim();
    if (previousValue !== nextValue) {
      changes.push({ field: header, oldValue: previousValue, newValue: nextValue });
    }
    row[key] = nextValue;
  });
  if (section === "Family" && familyRowIsAccountHolder(row)) {
    syncAccountHolderFromFamily(record, index, { log: false });
  }
  if (!changes.length) {
    closeDetailDrawer();
    showToast(`${section} row is already up to date.`);
    return true;
  }
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, {
    type: "changed",
    tab: section,
    dataModule: section,
    changes,
  });
  closeDetailDrawer();
  render();
  showToast(`${section} row updated locally.`);
  return true;
}

function saveAccountInfo() {
  const form = document.querySelector('.account-info-form[data-profile-section="Account Information"]');
  if (!form) return false;
  const section = accountSectionData(appState.activeApplicant, "Account Information");
  if (section.saved_information_locked === true) {
    showToast("Account Information is locked. Unlock it before saving changes.");
    return false;
  }
  if (!validateRequiredFields(form, accountInfoFields.map((field) => field.label), "Account Information")) return false;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  const calculatedInterestDays = interestCalculationDaysForOpeningDate(values.opening_date || section.opening_date);
  if (calculatedInterestDays) values.interest_calculation_days = calculatedInterestDays;
  const exchangeDate = String(values.exchange_date || "").trim();
  if (exchangeDate) {
    values.draft_print_date = exchangeDate;
    const printDateInput = form.elements.draft_print_date;
    if (printDateInput) printDateInput.value = exchangeDate;
  }
  const changes = [];
  for (const [key, value] of Object.entries(values)) {
    const nextValue = String(value || "").trim();
    const previousValue = String(section[key] || "").trim();
    if (previousValue !== nextValue) {
      const label = accountInfoFields.find((field) => fieldKey(field.label) === key)?.label || key;
      changes.push({ field: label.replace(/\s*\*+\s*$/, ""), oldValue: previousValue, newValue: nextValue });
    }
    section[key] = nextValue;
  }
  if (changes.some((change) => ["Output Document Style", "Account Type", "Interest Rate", "Tax Rate"].includes(change.field))) {
    applyAccountOutputStyleDefaults(appState.activeApplicant, section, section.output_document_style);
    invalidateSampleRecordPreview(appState.activeApplicant);
  }
  const bankSyncChange = syncIncomeBankForStyle(appState.activeApplicant, section.output_document_style);
  storeObject(storageKeys.profileSections, data.profileSections);
  if (changes.length) appendProfileLog(appState.activeApplicant, { type: "changed", tab: "Account Information", dataModule: "Account Records", changes });
  if (bankSyncChange) appendProfileLog(appState.activeApplicant, { type: "changed", tab: "Income", dataModule: "Income", changes: [bankSyncChange] });
  if (changes.length || bankSyncChange) render();
  showToast("Account Information saved locally.");
  return true;
}

function persistAccountInfoSelection(input) {
  const record = appState.activeApplicant;
  const field = String(input?.name || "").trim();
  if (!record || !field) return;
  const value = String(input.value || "").trim();
  const section = accountSectionData(record, "Account Information");
  const previous = String(section[field] || "").trim();
  section[field] = value;
  const changes = [];
  if (field === "output_document_style" && value) {
    changes.push(...applyAccountOutputStyleDefaults(record, section, value));
    invalidateSampleRecordPreview(record);
    const bankSyncChange = syncIncomeBankForStyle(record, value);
    if (bankSyncChange) appendProfileLog(record, {
      type: "changed",
      tab: "Income",
      dataModule: "Income",
      changes: [bankSyncChange],
    });
  }
  if (field === "exchange_date" && value) section.draft_print_date = value;
  storeObject(storageKeys.profileSections, data.profileSections);
  if (previous !== value) {
    const label = accountInfoFields.find((item) => fieldKey(item.label) === field)?.label || field;
    changes.unshift({ field: label.replace(/\s*\*+\s*$/, ""), oldValue: previous, newValue: value });
  }
  if (changes.length) appendProfileLog(record, {
    type: "changed",
    tab: "Account Information",
    dataModule: "Account Records",
    changes,
  });
}

function importAccountField(field, value) {
  const input = document.querySelector(`.account-info-form [name="${cssEscape(field)}"]`);
  if (!input) return;
  input.value = value || "-";
  saveAccountInfo();
  render();
  showToast("Imported applicant value into Account Information.");
}

function toggleAccountInfoAutoLock(locked) {
  const record = appState.activeApplicant;
  if (!record) return;
  const section = accountSectionData(record, "Account Information");
  section.auto_update_locked = locked;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, {
    type: "changed",
    tab: "Account Information",
    dataModule: "Account Records",
    changes: [{ field: "Automatic date and rate sync", oldValue: locked ? "Manual override" : "Locked", newValue: locked ? "Locked" : "Manual override" }],
  });
  render();
  showToast(locked ? "Automatic date and NRB rate sync locked." : "Manual override enabled for automatic fields.");
}

function toggleAccountInfoSavedLock(locked) {
  const record = appState.activeApplicant;
  if (!record) return;
  const section = accountSectionData(record, "Account Information");
  section.saved_information_locked = locked;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, {
    type: locked ? "changed" : "changed",
    tab: "Account Information",
    dataModule: "Account Records",
    changes: [{ field: "Saved information lock", oldValue: locked ? "Unlocked" : "Locked", newValue: locked ? "Locked" : "Unlocked" }],
  });
  render();
  showToast(locked ? "Account Information locked." : "Account Information unlocked for editing.");
}

function selectAccountDate(field) {
  openAccountCalendar(field);
}

function openAccountFamilyPicker() {
  appState.accountFamilyPickerOpen = true;
  render();
}

function closeAccountFamilyPicker() {
  appState.accountFamilyPickerOpen = false;
  render();
}

function selectFamilyAccountHolder(rowIndex) {
  const record = appState.activeApplicant;
  const rows = familyRowsForAccountImport(record);
  const row = rows[rowIndex];
  if (!record || !row) return;
  const name = familyRowValue(row, "Name", "name");
  if (!name) {
    showToast("Enter this family member's name before using the $ tag.");
    return;
  }
  const previousIndex = familyAccountHolderIndex(record);
  rows.forEach((familyRow, index) => {
    familyRow.account_holder = index === rowIndex ? "true" : "false";
  });
  appState.familyAccountHolderSelectionMode = false;
  syncAccountHolderFromFamily(record, rowIndex, { log: false });
  storeObject(storageKeys.profileSections, data.profileSections);
  appendProfileLog(record, {
    type: "changed",
    tab: "Family",
    dataModule: "Family",
    changes: [{
      field: "Account holder ($)",
      oldValue: previousIndex >= 0 ? familyRowValue(rows[previousIndex], "Name", "name") : "None",
      newValue: name,
    }],
  });
  render();
  showToast(`${name} selected as account holder. Name and address synced to Account Records.`);
}

function selectAccountFamily(index) {
  const record = appState.activeApplicant;
  const row = familyRowsForAccountImport(record)[index];
  if (!record || !row) return;
  const name = familyRowValue(row, "Name", "name");
  const address = familyMemberAddress(row);
  if (!name) {
    showToast("This family member does not have a name yet.");
    return;
  }
  const section = accountSectionData(record, "Account Information");
  const changes = [];
  [
    ["account_holder_name", name],
    ["account_holder_address", address],
  ].forEach(([field, value]) => {
    const nextValue = String(value || "").trim();
    const previousValue = String(section[field] || "").trim();
    if (previousValue !== nextValue) {
      changes.push({
        field: field === "account_holder_name" ? "Account Holder Name" : "Account Holder Address",
        oldValue: previousValue,
        newValue: nextValue,
      });
    }
    section[field] = nextValue;
  });
  storeObject(storageKeys.profileSections, data.profileSections);
  if (changes.length) {
    appendProfileLog(record, {
      type: "changed",
      tab: "Account Information",
      dataModule: "Account Records",
      changes,
    });
  }
  appState.accountFamilyPickerOpen = false;
  render();
  showToast(`${name} imported from Family. ${address ? "Address imported too." : "Add an address in Family to import it."}`);
}

function openAccountCalendar(field) {
  if (!field) return;
  const input = document.querySelector(`.account-info-form [name="${cssEscape(field)}"]`);
  const selected = input?.value ? parseAccountDate(input.value) : new Date();
  appState.accountCalendarField = field;
  appState.accountCalendarSelected = input?.value || "";
  appState.accountCalendarMonth = isoCalendarDate(new Date(selected.getFullYear(), selected.getMonth(), 1));
  render();
}

function closeAccountCalendar() {
  appState.accountCalendarField = "";
  appState.accountCalendarMonth = "";
  appState.accountCalendarSelected = "";
  render();
}

function moveAccountCalendarMonth(offset) {
  const current = parseCalendarMonth(appState.accountCalendarMonth) || new Date();
  appState.accountCalendarMonth = isoCalendarDate(new Date(current.getFullYear(), current.getMonth() + offset, 1));
  render();
}

async function selectAccountCalendarDate(value) {
  const field = appState.accountCalendarField;
  const input = document.querySelector(`.account-info-form [name="${cssEscape(appState.accountCalendarField)}"]`);
  const date = parseCalendarMonth(value);
  if (!input || !date) return;
  const account = accountSectionData(appState.activeApplicant, "Account Information");
  const autoUpdateLocked = account.auto_update_locked !== false;
  const selectedValue = formatLongAccountDate(date);
  input.value = selectedValue;
  let exchangeDateValue = field === "exchange_date" ? selectedValue : "";
  if (field === "closing_balance_date" && autoUpdateLocked) {
    exchangeDateValue = formatLongAccountDate(nextWorkingDay(date));
    const exchangeInput = document.querySelector('.account-info-form [name="exchange_date"]');
    const printDateInput = document.querySelector('.account-info-form [name="draft_print_date"]');
    if (exchangeInput) exchangeInput.value = exchangeDateValue;
    if (printDateInput) printDateInput.value = exchangeDateValue;
  } else if (field === "exchange_date" && autoUpdateLocked) {
    const printDateInput = document.querySelector('.account-info-form [name="draft_print_date"]');
    if (printDateInput) printDateInput.value = selectedValue;
  } else if (field === "draft_print_date" && autoUpdateLocked) {
    const exchangeInput = document.querySelector('.account-info-form [name="exchange_date"]');
    const printDateInput = document.querySelector('.account-info-form [name="draft_print_date"]');
    if (exchangeInput) input.value = exchangeInput.value;
    if (printDateInput) input.value = printDateInput.value;
  }
  let rateResult = null;
  if (autoUpdateLocked && exchangeDateValue) {
    rateResult = await applyNrbExchangeRateForDate(appState.activeApplicant, exchangeDateValue, { target: "account" });
    const rateInput = document.querySelector('.account-info-form [name="exchange_rate"]');
    if (rateInput && rateResult?.rate) rateInput.value = rateResult.rate;
  }
  saveAccountInfo();
  appState.accountCalendarField = "";
  appState.accountCalendarMonth = "";
  appState.accountCalendarSelected = "";
  render();
  const rateMessage = (field === "exchange_date" || field === "closing_balance_date") && rateResult?.rate
    ? ` NRB USD selling rate ${rateResult.rate}${rateResult.exact ? "" : ` (latest available rate on ${rateResult.sourceDate})`} applied.`
    : (field === "exchange_date" || field === "closing_balance_date") ? " NRB rate was not available for this date." : "";
  const syncMessage = field === "closing_balance_date" && autoUpdateLocked
    ? ` Exchange Date and Draft Print Date set to ${exchangeDateValue}.`
    : "";
  showToast(`${formatLongAccountDate(date)} selected.${syncMessage}${rateMessage}`);
}

function calculateOpeningAmount() {
  const amountInput = document.querySelector('.account-info-form [name="opening_amount"]');
  const annualIncome = annualIncomeYear3Total();
  if (!annualIncome) {
    showToast("No income data found to calculate opening amount.");
    return;
  }

  // REA capture: the original uses a fresh 42%-45% factor on every calculation.
  const factor = 0.42 + Math.random() * (0.45 - 0.42);
  const calculated = Number((annualIncome * factor).toFixed(2));
  if (amountInput) amountInput.value = calculated.toFixed(2);
  showToast(`Opening amount calculated: ${formatMoney(calculated)}. Based on annual income: ${formatMoney(annualIncome)} x ${(factor * 100).toFixed(2)}%. Standard guideline: 42%-45%.`);
}

function generateReferenceNumbers() {
  const form = document.querySelector('.reference-setup-form[data-profile-section="Reference Number Setup"]');
  if (!form) return;
  const formData = new FormData(form);
  const prefix = String(formData.get("reference_prefix") || "").trim();
  const startNo = String(formData.get("reference_start_no") || "").trim();
  const count = String(formData.get("number_of_references") || "1").trim();
  const refs = generatedReferenceNumbers(prefix, startNo, count).join(", ");
  const section = accountSectionData(appState.activeApplicant, "Reference Number Setup");
  const previousRefs = String(section.reference_notes || "");
  section.reference_prefix = prefix;
  section.reference_start_no = startNo;
  section.number_of_references = count;
  section.reference_notes = refs;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "changed",
    tab: "Reference Number Setup",
    changes: [{ field: "Reference numbers", oldValue: previousRefs, newValue: refs }],
  });
  render();
  showToast(`Generated ${generatedReferenceNumbers(prefix, startNo, count).length} reference numbers.`);
}

function addAccountTransaction() {
  const form = document.querySelector('.account-transaction-form[data-profile-section="Transaction Records"]');
  if (!form) return;
  const formData = new FormData(form);
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  const next = section.rows.length + 1;
  const row = Object.fromEntries(accountTransactionHeaders.map((header) => [fieldKey(header), ""]));
  row[fieldKey("#")] = String(next);
  row.calculate = "";
  row.date = String(formData.get("date") || todayLabel()).trim();
  row.days = String(formData.get("days") || "").trim();
  row.dr_days = String(formData.get("dr_days") || "").trim();
  row.transaction_by = String(formData.get("transaction_by") || "").trim();
  row.debit = String(formData.get("debit") || "").trim();
  row.credit = String(formData.get("credit") || "").trim();
  if (!Object.values(row).some((value) => value && value !== String(next))) {
    showToast("Fill at least one transaction field first.");
    return;
  }
  section.rows.unshift(row);
  clearPriorPeriodPreview(section);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "new",
    changes: [{ field: `Transaction (Sno ${next})`, oldValue: "", newValue: summarizeProfileRow(row) }],
  });
  form.reset();
  render();
  showToast("Transaction row added locally.");
}

function calculateAccountTransactions() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const sourceRows = Array.isArray(section.rows) && section.rows.length
    ? section.rows
    : defaultAccountTransactions.map((row) => ({ ...row }));
  section.rows = buildStatementRows(
    sourceRows,
    accountSectionData(appState.activeApplicant, "Account Information"),
  ).rows;
  clearPriorPeriodPreview(section);
  section.summary_updated_at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "update",
    changes: [{ field: "Transaction Records", oldValue: "", newValue: `Calculated ${section.rows.length} records` }],
  });
  render();
  showToast("Transaction Records calculated.");
}

function copyAccountTransactions() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions;
  const text = [accountTransactionHeaders.join("\t"), ...rows.map((row) => accountTransactionHeaders.map((header) => row[fieldKey(header)] || "").join("\t"))].join("\n");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast("Transaction Records copied.")).catch(() => showToast("Copy prepared locally."));
  } else {
    showToast("Copy prepared locally.");
  }
}

function openAccountPanel(panel) {
  appState.accountTransactionPanel = panel;
  appState.accountOverflowOpen = false;
  if (panel === "sample") {
    const section = accountSectionData(appState.activeApplicant, "Transaction Records");
    section.sample_settings = { ...defaultSampleRecordSettings(), ...(section.sample_settings || {}) };
    const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
    if (!samplePreviewIsValid(section.sample_preview, section.sample_settings, accountInfo)) {
      section.sample_preview = buildStatementRows(
        generateSampleTransactions(section.sample_settings, accountInfo),
        accountInfo,
      ).rows;
      section.sample_settings = sampleSettingsWithGeneratedFigures(section.sample_settings, section.sample_preview);
    }
    storeObject(storageKeys.profileSections, data.profileSections);
  }
  if (panel === "prior") {
    const section = accountSectionData(appState.activeApplicant, "Transaction Records");
    ensurePriorPeriodPreview(section);
  }
  render();
}

function regeneratePriorPeriodPreview() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.prior_period_preview = generatePriorPeriodTransactions(section);
  section.prior_period_meta = priorPeriodMeta(section, section.prior_period_preview);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "update",
    changes: [{ field: "Prior Period Records", oldValue: "", newValue: `Previewed ${section.prior_period_preview.length} derived records` }],
  });
  render();
  showToast(`Re-generated ${section.prior_period_preview.length} prior-period records.`);
}

function importPriorPeriodPreview() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const preview = ensurePriorPeriodPreview(section);
  if (!preview.length) {
    showToast("No prior-period records available to import.");
    return;
  }
  const currentRows = (Array.isArray(section.rows) ? section.rows : defaultAccountTransactions).filter((row) => row._source !== "prior-period");
  const importedRows = preview.map((row) => ({ ...row, _source: "prior-period", _selected: false }));
  section.rows = [...currentRows, ...importedRows]
    .sort((a, b) => (parseAccountDate(a.date) || new Date(0)) - (parseAccountDate(b.date) || new Date(0)))
    .map((row, index) => ({ ...row, [fieldKey("#")]: String(index + 1) }));
  section.prior_period_imported_at = new Date().toLocaleString();
  section.prior_period_preview = [];
  section.prior_period_meta = null;
  section.duration_months = String(Math.max(1, Math.round((parseAccountDate(section.rows.at(-1)?.date) - parseAccountDate(section.rows[0]?.date)) / (86400000 * 30))));
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "new",
    changes: [{ field: "Prior Period Records", oldValue: "Preview", newValue: `Imported ${importedRows.length} records` }],
  });
  appState.accountTransactionPanel = "";
  render();
  showToast(`Imported ${importedRows.length} prior-period records.`);
}

function toggleAccountTransactionSelect(index, checked) {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  const row = section.rows[Number(index)];
  if (!row) return;
  row._selected = checked;
  storeObject(storageKeys.profileSections, data.profileSections);
}

function deleteSelectedAccountTransactions() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  const before = section.rows.length;
  section.rows = section.rows.filter((row) => !row._selected);
  appState.accountOverflowOpen = false;
  storeObject(storageKeys.profileSections, data.profileSections);
  if (before !== section.rows.length) {
    appendAccountRecordsLog(appState.activeApplicant, {
      type: "delete",
      changes: [{ field: "Transaction Records", oldValue: `${before - section.rows.length} selected records`, newValue: "" }],
    });
  }
  render();
  showToast(before === section.rows.length ? "Select transaction rows first." : "Selected transaction records deleted.");
}

function assignAccountReferenceNumbers() {
  const transactionSection = accountSectionData(appState.activeApplicant, "Transaction Records");
  const referenceSection = accountSectionData(appState.activeApplicant, "Reference Number Setup");
  transactionSection.rows = Array.isArray(transactionSection.rows) && transactionSection.rows.length ? transactionSection.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  const refs = String(referenceSection.reference_notes || "").split(",").map((item) => item.trim()).filter(Boolean);
  const fallback = generatedReferenceNumbers(referenceSection.reference_prefix || "", referenceSection.reference_start_no || "26366", transactionSection.rows.length);
  transactionSection.rows.forEach((row, index) => {
    row.reference_no = refs[index] || fallback[index] || "";
  });
  appState.accountOverflowOpen = false;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "changed",
    changes: [{ field: "Reference numbers", oldValue: "", newValue: `Assigned to ${transactionSection.rows.length} records` }],
  });
  render();
  showToast("Reference numbers assigned to transaction records.");
}

function validateTransactionDuration() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  const datedRows = section.rows.map((row) => ({ row, date: parseAccountDate(row.date) })).filter((item) => item.date);
  datedRows.sort((a, b) => a.date - b.date);
  datedRows.forEach((item, index) => {
    const previous = datedRows[index - 1]?.date || item.date;
    item.row.days = String(Math.max(0, Math.round((item.date - previous) / 86400000)) || (index === 0 ? 1 : 0));
  });
  if (datedRows.length > 1) {
    section.duration_months = String(Math.max(1, Math.round((datedRows.at(-1).date - datedRows[0].date) / (86400000 * 30))));
  }
  section.summary_updated_at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  appState.accountOverflowOpen = false;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "changed",
    changes: [{ field: "Transaction duration", oldValue: "", newValue: `${section.duration_months || "-"} months validated` }],
  });
  render();
  showToast("Duration validated from transaction dates.");
}

function exportAccountTransactionsCsv() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions;
  const headers = ["Date", "#Days", "#Dr. Days", "Transaction By", "Debit", "Credit", "Reference No."];
  const csv = [headers, ...rows.map((row) => [row.date, row.days, row.dr_days, row.transaction_by, row.debit, row.credit, row.reference_no || ""])].map((row) => row.map(csvCell).join(",")).join("\n");
  appState.accountOverflowOpen = false;
  const slug = String(appState.activeApplicant?.name || "applicant").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug || "applicant"}-transaction-records.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "export",
    changes: [{ field: "Transaction Records", oldValue: "", newValue: `${rows.length} records CSV` }],
  });
  showToast(`Downloaded ${rows.length} transaction records as CSV.`);
}

function previewSampleRecords() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const settings = sampleRecordSettings();
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  section.sample_settings = settings;
  section.sample_preview = buildStatementRows(
    generateSampleTransactions(settings, accountInfo),
    accountInfo,
  ).rows;
  section.sample_settings = sampleSettingsWithGeneratedFigures(settings, section.sample_preview);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "update",
    changes: [{ field: "Sample Records", oldValue: "", newValue: `Previewed ${section.sample_preview.length} records` }],
  });
  render();
  showToast(`Previewed ${section.sample_preview.length} sample records.`);
}

function regenerateSampleRecords() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const settings = sampleRecordSettings();
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  settings.sample_seed = `${Date.now()}-${Math.random()}`;
  section.sample_settings = settings;
  section.sample_preview = buildStatementRows(
    generateSampleTransactions(settings, accountInfo),
    accountInfo,
  ).rows;
  section.sample_settings = sampleSettingsWithGeneratedFigures(settings, section.sample_preview);
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "update",
    changes: [{ field: "Sample Records", oldValue: "", newValue: `Re-generated ${section.sample_preview.length} records` }],
  });
  render();
  showToast(`Re-generated ${section.sample_preview.length} sample records.`);
}

function resetSampleRecordData() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.sample_settings = defaultSampleRecordSettings();
  section.sample_figures_hidden = false;
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  section.sample_preview = buildStatementRows(
    generateSampleTransactions(section.sample_settings, accountInfo),
    accountInfo,
  ).rows;
  section.sample_settings = sampleSettingsWithGeneratedFigures(section.sample_settings, section.sample_preview);
  storeObject(storageKeys.profileSections, data.profileSections);
  render();
  showToast("Sample generator reset to default template data.");
}

function toggleSampleFigures() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.sample_figures_hidden = section.sample_figures_hidden !== true;
  storeObject(storageKeys.profileSections, data.profileSections);
  render();
}

function saveSampleRecords() {
  return applySampleRecords();
}

function applySampleRecords() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const settings = sampleRecordSettings();
  const rows = section.sample_preview?.length
    ? section.sample_preview
    : buildStatementRows(
      generateSampleTransactions(settings),
      accountSectionData(appState.activeApplicant, "Account Information"),
    ).rows;
  section.sample_settings = sampleSettingsWithGeneratedFigures(settings, rows);
  section.rows = rows.map((row, index) => ({ ...row, [fieldKey("#")]: String(index + 1), _selected: false }));
  clearPriorPeriodPreview(section);
  section.sample_preview = [];
  section.summary_updated_at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  validateTransactionDurationWithoutRender(section);
  appState.accountTransactionPanel = "";
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "new",
    changes: [{ field: "Sample Records", oldValue: "", newValue: `Generated ${section.rows.length} random transaction records` }],
  });
  render();
  showToast(`${section.rows.length} sample transaction records generated.`);
  return true;
}

function applyCsvImport() {
  const input = document.querySelector(".account-csv-input");
  const csv = String(input?.value || "").trim();
  if (!csv) {
    showToast("Paste CSV records first.");
    return;
  }
  const rows = csv.split(/\n+/).map((line, index) => {
    const cells = normalizeTransactionCsvCells(parseCsvLine(line));
    return {
      calculate: "",
      [fieldKey("#")]: String(index + 1),
      date: cells[0] || todayLabel(),
      days: cells[1] || "",
      dr_days: cells[2] || "",
      transaction_by: cells[3] || "Imported",
      debit: cells[4] || "",
      credit: cells[5] || "",
    };
  });
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = rows;
  clearPriorPeriodPreview(section);
  section.summary_updated_at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  appState.accountTransactionPanel = "";
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "new",
    changes: [{ field: "Transaction Records", oldValue: "", newValue: `Imported ${rows.length} CSV records` }],
  });
  render();
  showToast(`${rows.length} CSV transaction records imported.`);
}

function applyTransactionPersonEdit() {
  const form = document.querySelector(".edit-person-form");
  if (!form) return;
  const formData = new FormData(form);
  const current = String(formData.get("current_person") || "").trim();
  const next = String(formData.get("new_person") || "").trim();
  if (!current || !next) {
    showToast("Choose current and new transaction person.");
    return;
  }
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.rows = Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions.map((row) => ({ ...row }));
  section.rows.forEach((row) => {
    if (row.transaction_by === current) row.transaction_by = next;
  });
  appState.accountTransactionPanel = "";
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "changed",
    changes: [{ field: "Transaction Person", oldValue: current, newValue: next }],
  });
  render();
  showToast(`${current} changed to ${next}.`);
}

function resetTransactionLayout() {
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  section.visible_columns_transaction = [...accountTransactionHeaders];
  section.rows = (Array.isArray(section.rows) && section.rows.length ? section.rows : defaultAccountTransactions).map((row, index) => ({ ...row, [fieldKey("#")]: String(index + 1), _selected: false }));
  clearPriorPeriodPreview(section);
  section.sample_preview = [];
  appState.accountOverflowOpen = false;
  appState.accountTransactionPanel = "";
  appState.accountTransactionPageSize = 10;
  storeObject(storageKeys.profileSections, data.profileSections);
  appendAccountRecordsLog(appState.activeApplicant, {
    type: "update",
    changes: [{ field: "Transaction Records layout", oldValue: "", newValue: "Reset layout" }],
  });
  render();
  showToast("Transaction Records layout reset.");
}

function sampleRecordSettings() {
  const form = document.querySelector(".sample-records-form");
  const formData = form ? new FormData(form) : new FormData();
  const section = accountSectionData(appState.activeApplicant, "Transaction Records");
  const current = section.sample_settings || defaultSampleRecordSettings();
  const currentCreditFigures = parseSampleFigures(current.credit_amount_figures);
  const currentDebitFigures = parseSampleFigures(current.debit_amount_figures);
  const enteredCreditFigures = parseSampleFigures(formData.get("credit_amount_figures") || current.credit_amount_figures);
  const enteredDebitFigures = parseSampleFigures(formData.get("debit_amount_figures") || current.debit_amount_figures);
  const creditEntries = Math.max(1, Number(formData.get("credit_entries")) || Number(current.credit_entries) || enteredCreditFigures.length || currentCreditFigures.length || twoA4PageEntriesPerSide);
  const debitEntries = Math.max(1, Number(formData.get("debit_entries")) || Number(current.debit_entries) || enteredDebitFigures.length || currentDebitFigures.length || twoA4PageEntriesPerSide);
  return {
    credit_amount_figures: String(formData.get("credit_amount_figures") || current.credit_amount_figures || defaultSampleCreditFigures.join(", ")).trim(),
    debit_amount_figures: String(formData.get("debit_amount_figures") || current.debit_amount_figures || defaultSampleDebitFigures.join(", ")).trim(),
    credit_entries: String(creditEntries),
    debit_entries: String(debitEntries),
    total_credit_upto: String(formData.get("total_credit_upto") || current.total_credit_upto || "2100000").trim(),
    total_debit_upto: String(formData.get("total_debit_upto") || current.total_debit_upto || "2100000").trim(),
    debit_gap: String(formData.get("debit_gap") || current.debit_gap || "5").trim(),
    credit_gap: String(formData.get("credit_gap") || current.credit_gap || "5").trim(),
    opening_date: String(current.opening_date || "20 August, 2025").trim(),
    closing_balance_date: String(current.closing_balance_date || "19 August, 2026").trim(),
    transaction_persons: String(current.transaction_persons || accountTransactionPeople.join(", ")).trim(),
    sample_seed: String(current.sample_seed || "Dhan-Account").trim(),
  };
}

function sampleSettingsWithGeneratedFigures(settings, rows) {
  const userRows = rows.filter((row) => !["interest", "tax"].includes(row._entry_type));
  const debit = userRows.filter((row) => moneyValue(row.debit) > 0).map((row) => moneyValue(row.debit));
  const credit = userRows.filter((row) => moneyValue(row.credit) > 0).map((row) => moneyValue(row.credit));
  return {
    ...settings,
    debit_amount_figures: debit.join(", "),
    credit_amount_figures: credit.join(", "),
    debit_entries: String(debit.length),
    credit_entries: String(credit.length),
  };
}

function defaultSampleRecordSettings() {
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  return {
    credit_amount_figures: defaultSampleCreditFigures.join(", "),
    debit_amount_figures: defaultSampleDebitFigures.join(", "),
    credit_entries: String(twoA4PageEntriesPerSide),
    debit_entries: String(twoA4PageEntriesPerSide),
    total_credit_upto: "2100000",
    total_debit_upto: "2100000",
    debit_gap: "5",
    credit_gap: "5",
    opening_date: accountInfo.opening_date || "20 August, 2025",
    closing_balance_date: "19 August, 2026",
    transaction_persons: accountTransactionPeople.join(", "),
    sample_seed: "Dhan-Account",
  };
}

function parseSampleFigures(value) {
  return String(value || "")
    .split(/[\s,;]+/)
    .map((item) => moneyValue(item))
    .filter((amount) => amount > 0)
    .slice(0, 500);
}

function cappedSampleFigures(values, cap) {
  const limit = Math.max(0, moneyValue(cap));
  if (!limit) return values;
  const result = [];
  let total = 0;
  values.forEach((value) => {
    if (total >= limit) return;
    const amount = Math.min(value, limit - total);
    if (amount > 0) {
      result.push(amount);
      total += amount;
    }
  });
  return result;
}

function sampleRandom(seed) {
  let state = 2166136261;
  for (const char of String(seed || "Dhan-Account")) state = Math.imul(state ^ char.charCodeAt(0), 16777619);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}

function shuffleSampleRows(rows, random) {
  const shuffled = [...rows];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
  }
  return shuffled;
}

function randomAmountFigures(count, random, cap = "", usedAmounts = new Set()) {
  const total = Math.max(0, Number(count) || 0);
  if (!total) return [];
  const minimum = 10000;
  const maximum = 99900;
  const minimumUniqueTotal = total * minimum + (total * (total - 1) / 2) * 100;
  const maximumUniqueTotal = total * maximum - (total * (total - 1) / 2) * 100;
  const requestedCap = moneyValue(cap);
  const defaultTarget = Math.round((minimumUniqueTotal + maximumUniqueTotal) / 2);
  const targetTotal = Math.min(maximumUniqueTotal, Math.max(minimumUniqueTotal, requestedCap || defaultTarget));
  const values = [];
  let runningTotal = 0;
  for (let index = 0; index < total; index += 1) {
    const remaining = total - index - 1;
    const remainingTarget = targetTotal - runningTotal;
    const lower = Math.max(minimum, Math.ceil((remainingTarget - maximum * remaining) / 100) * 100);
    const upper = Math.min(maximum, Math.floor((remainingTarget - minimum * remaining) / 100) * 100);
    let candidate = 0;
    for (let attempt = 0; attempt < 300 && !candidate; attempt += 1) {
      const next = lower + Math.floor(random() * Math.max(1, (upper - lower) / 100 + 1)) * 100;
      if (next >= minimum && next <= maximum && !usedAmounts.has(next) && !values.includes(next)) candidate = next;
    }
    if (!candidate) {
      for (let next = lower; next <= upper && !candidate; next += 100) {
        if (!usedAmounts.has(next) && !values.includes(next)) candidate = next;
      }
    }
    if (!candidate) {
      for (let next = minimum; next <= maximum && !candidate; next += 100) {
        if (!usedAmounts.has(next) && !values.includes(next)) candidate = next;
      }
    }
    if (!candidate) break;
    values.push(candidate);
    usedAmounts.add(candidate);
    runningTotal += candidate;
  }
  return shuffleSampleRows(values, random);
}

function generateSampleTransactions(settings, accountInfo = {}) {
  const effectiveAccountInfo = Object.keys(accountInfo).length
    ? accountInfo
    : (appState.activeApplicant ? accountSectionData(appState.activeApplicant, "Account Information") : {});
  const debitConfigured = parseSampleFigures(settings.debit_amount_figures || defaultSampleDebitFigures.join(","));
  const creditConfigured = parseSampleFigures(settings.credit_amount_figures || defaultSampleCreditFigures.join(","));
  const start = parseAccountDate(settings.opening_date) || new Date(2025, 7, 20);
  const end = parseAccountDate(settings.closing_balance_date) || new Date(2026, 8, 30);
  const people = String(settings.transaction_persons || "").split(",").map((person) => person.trim()).filter(Boolean);
  const random = sampleRandom(settings.sample_seed || "Dhan-Account");
  const debitCount = Math.max(1, Number(settings.debit_entries) || Math.max(twoA4PageEntriesPerSide, debitConfigured.length));
  const creditCount = Math.max(1, Number(settings.credit_entries) || Math.max(twoA4PageEntriesPerSide, creditConfigured.length));
  const usedAmounts = new Set();
  const debitFigures = randomAmountFigures(debitCount, random, settings.total_debit_upto, usedAmounts);
  const creditFigures = randomAmountFigures(creditCount, random, settings.total_credit_upto, usedAmounts);
  const typedRows = shuffleSampleRows([
    ...debitFigures.map((amount) => ({ kind: "debit", amount })),
    ...creditFigures.map((amount) => ({ kind: "credit", amount })),
  ], random);
  const dateSeries = randomTransactionDateSeries(typedRows, { ...settings, opening_date: start, closing_balance_date: end }, random);
  const generated = typedRows.map((item, index) => {
    const dateInfo = dateSeries[index];
    return {
      calculate: "",
      [fieldKey("#")]: String(index + 1),
      date: dateInfo.date,
      days: String(dateInfo.days),
      dr_days: item.kind === "debit" && random() > 0.4 ? String(14 + Math.floor(random() * 11)) : "",
      transaction_by: people[Math.floor(random() * people.length)] || accountTransactionPeople[index % accountTransactionPeople.length],
      debit: item.kind === "debit" ? formatMoney(item.amount) : "",
      credit: item.kind === "credit" ? formatMoney(item.amount) : "",
      reference_no: "",
    };
  });
  return balanceTargetedSampleTransactions(generated, effectiveAccountInfo, random);
}

function balanceTargetedSampleTransactions(rows, accountInfo = {}, random = Math.random) {
  const minimumBalance = 2300000;
  const maximumBalance = 2800000;
  const targetBalance = 2550000 + Math.floor(random() * 200) * 100;
  const output = rows.map((row) => ({ ...row }));
  const currentMetrics = () => calculateTransactionFinancials(output, accountInfo);
  const amountFor = (row, kind) => moneyValue(row[kind]);
  const writeAmount = (row, kind, amount) => {
    row[kind] = formatMoney(amount);
  };

  // Change several existing figures in one pass. The old implementation
  // changed one value per loop and could get stuck on an already-used amount,
  // leaving the calculated balance below the requested range. This allocator
  // recalculates the available capacity after every write and always preserves
  // the 10,000–99,900 range plus cross-side uniqueness.
  const applyBalanceDifference = (difference) => {
    if (Math.abs(difference) < 100) return 0;
    const increaseBalance = difference > 0;
    const operations = increaseBalance
      ? [{ kind: "credit", direction: 1 }, { kind: "debit", direction: -1 }]
      : [{ kind: "credit", direction: -1 }, { kind: "debit", direction: 1 }];
    let remaining = Math.floor(Math.abs(difference) / 100) * 100;

    for (const operation of operations) {
      const candidates = output
        .map((row) => ({ row, amount: amountFor(row, operation.kind) }))
        .filter((item) => item.amount >= 10000)
        .map((item) => ({
          ...item,
          capacity: operation.direction > 0 ? 99900 - item.amount : item.amount - 10000,
        }))
        .filter((item) => item.capacity >= 100)
        .sort((a, b) => b.capacity - a.capacity);

      for (const candidate of candidates) {
        if (remaining < 100) break;
        const used = new Set(output.flatMap((row) => [moneyValue(row.debit), moneyValue(row.credit)].filter((amount) => amount > 0)));
        used.delete(candidate.amount);
        const maximumChange = Math.min(candidate.capacity, remaining);
        let change = Math.floor(maximumChange / 100) * 100;
        let next = candidate.amount + operation.direction * change;
        while (change >= 100 && (next < 10000 || next > 99900 || used.has(next))) {
          change -= 100;
          next = candidate.amount + operation.direction * change;
        }
        if (change < 100 || next === candidate.amount) continue;
        writeAmount(candidate.row, operation.kind, next);
        remaining -= change;
      }
      if (remaining < 100) break;
    }
    return remaining;
  };

  // Tune against the same statement calculation used by the preview. Interest
  // and tax are date-dependent, so a second pass corrects their small effect.
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const balance = currentMetrics().balance;
    if (balance > minimumBalance && balance <= maximumBalance) break;
    const remaining = applyBalanceDifference(targetBalance - balance);
    if (remaining >= 100) break;
  }
  return output;
}

function samplePreviewIsValid(rows, settings, accountInfo) {
  const userRows = (Array.isArray(rows) ? rows : []).filter((row) => !["interest", "tax"].includes(row._entry_type));
  const expectedDebit = Math.max(1, Number(settings.debit_entries) || 0);
  const expectedCredit = Math.max(1, Number(settings.credit_entries) || 0);
  const debit = userRows.filter((row) => moneyValue(row.debit) > 0).map((row) => moneyValue(row.debit));
  const credit = userRows.filter((row) => moneyValue(row.credit) > 0).map((row) => moneyValue(row.credit));
  const amounts = [...debit, ...credit];
  const unique = new Set(amounts);
  const balance = calculateTransactionFinancials(rows, accountInfo).balance;
  return debit.length === expectedDebit
    && credit.length === expectedCredit
    && amounts.every((amount) => amount >= 10000 && amount <= 99900)
    && unique.size === amounts.length
    && balance > 2300000
    && balance < 2800000;
}

function randomTransactionDateSeries(items, settings, random) {
  const start = parseAccountDate(settings.opening_date) || new Date(2025, 7, 20);
  const end = parseAccountDate(settings.closing_balance_date) || new Date(2026, 8, 30);
  const dayMs = 86400000;
  const gapCount = Math.max(0, items.length - 1);
  const workingDates = transactionWorkingDates(start, end);
  if (!workingDates.length) return items.map(() => ({ date: formatAccountDate(start), days: 0 }));
  const firstWorkingIndex = 0;
  const lastWorkingIndex = workingDates.length - 1;
  const totalWorkingDays = Math.max(0, lastWorkingIndex - firstWorkingIndex);
  const maximumGap = Math.min(30, Math.max(1, totalWorkingDays));
  const minimumGap = totalWorkingDays >= gapCount ? 1 : 0;
  const averageGap = totalWorkingDays / Math.max(1, gapCount);
  const randomGapMaximum = Math.min(maximumGap, Math.max(minimumGap + 2, Math.ceil(averageGap * 2)));
  let gaps = [];
  for (let attempt = 0; attempt < 200 && !gaps.length; attempt += 1) {
    const candidateGaps = [];
    for (let index = 0; index < gapCount; index += 1) {
      const options = Array.from(
        { length: randomGapMaximum - minimumGap + 1 },
        (_, offset) => minimumGap + offset,
      ).filter((gap) => gap !== candidateGaps[index - 1]);
      candidateGaps.push(options[Math.floor(random() * options.length)]);
    }
    let difference = totalWorkingDays - candidateGaps.reduce((sum, gap) => sum + gap, 0);
    let guard = 10000;
    while (difference && guard > 0) {
      const direction = difference > 0 ? 1 : -1;
      const indices = candidateGaps.map((gap, index) => {
        const next = gap + direction;
        const previous = candidateGaps[index - 1];
        const following = candidateGaps[index + 1];
        return next >= minimumGap && next <= randomGapMaximum && next !== previous && next !== following ? index : -1;
      }).filter((index) => index >= 0);
      if (!indices.length) break;
      const index = indices[Math.floor(random() * indices.length)];
      candidateGaps[index] += direction;
      difference -= direction;
      guard -= 1;
    }
    if (!difference && candidateGaps.every((gap, index) => index === 0 || gap !== candidateGaps[index - 1])) gaps = candidateGaps;
  }
  if (!gaps.length) gaps = Array.from({ length: gapCount }, () => Math.max(minimumGap, Math.floor(averageGap)));
  let cursorIndex = firstWorkingIndex;
  return items.map((item, index) => {
    if (index) cursorIndex = Math.min(lastWorkingIndex, cursorIndex + gaps[index - 1]);
    const current = workingDates[cursorIndex];
    const previous = index ? workingDates[Math.max(firstWorkingIndex, cursorIndex - gaps[index - 1])] : current;
    const calendarGap = index ? Math.round((current - previous) / dayMs) : 0;
    return { date: formatAccountDate(current), days: calendarGap };
  });
}

function interestPostingSchedule(start, end) {
  const startTime = start?.getTime?.() || 0;
  const endTime = end?.getTime?.() || Number.MAX_SAFE_INTEGER;
  return nepaliInterestQuarterEnds
    .map((entry) => ({ ...entry, date: parseCalendarMonth(entry.ad) }))
    .filter((entry) => entry.date && entry.date.getTime() >= startTime && entry.date.getTime() <= endTime)
    .sort((a, b) => a.date - b.date);
}

// The automation's Interest Calculation Days is the exact elapsed AD-day
// count from the immediately preceding Nepali quarter-end interest posting to
// the selected Opening Date. Keep it derived from the same BS→AD posting map
// used by statement generation so the displayed value cannot drift from the
// interest schedule.
function previousInterestPostingForOpeningDate(openingDateValue) {
  const openingDate = parseAccountDate(openingDateValue);
  if (!openingDate) return null;
  return nepaliInterestQuarterEnds
    .map((entry) => ({ ...entry, date: parseAccountDate(entry.ad) }))
    .filter((entry) => entry.date && entry.date < openingDate)
    .sort((a, b) => a.date - b.date)
    .at(-1);
}

function interestCalculationDaysForOpeningDate(openingDateValue) {
  const openingDate = parseAccountDate(openingDateValue);
  const previousPosting = previousInterestPostingForOpeningDate(openingDateValue);
  if (!openingDate || !previousPosting?.date) return "";
  return String(Math.max(0, Math.round((openingDate - previousPosting.date) / 86400000)));
}

function buildStatementRows(rows, accountInfo = {}) {
  const sourceRows = (Array.isArray(rows) ? rows : [])
    .filter((row) => !["interest", "tax"].includes(row._entry_type))
    .map((row) => ({ ...row, dateObject: parseAccountDate(row.date) }))
    .filter((row) => row.dateObject)
    .sort((a, b) => a.dateObject - b.dateObject);
  const opening = moneyValue(accountInfo.opening_amount || "1653403.78");
  const openingDate = parseAccountDate(accountInfo.opening_date) || sourceRows[0]?.dateObject || new Date();
  const closingDate = parseAccountDate(accountInfo.closing_balance_date) || sourceRows.at(-1)?.dateObject || openingDate;
  const annualRate = moneyValue(accountInfo.interest_rate || "8");
  const taxRate = moneyValue(accountInfo.tax_rate || "6");
  const output = [];
  const firstVisibleDate = sourceRows[0]?.dateObject || openingDate;
  const schedule = interestPostingSchedule(firstVisibleDate, closingDate);
  const priorQuarterEnd = nepaliInterestQuarterEnds
    .map((entry) => ({ ...entry, date: parseCalendarMonth(entry.ad) }))
    .filter((entry) => entry.date && entry.date < firstVisibleDate)
    .sort((a, b) => a.date - b.date)
    .at(-1);
  let balanceCents = Math.round(opening * 100);
  let accruedInterestCents = 0;
  let postedInterestCents = 0;
  let taxCents = 0;
  let cursor = new Date(priorQuarterEnd?.date || firstVisibleDate);
  let rawIndex = 0;

  const dayGap = (date) => Math.max(0, Math.round((date - cursor) / 86400000));
  const accrue = (date) => {
    const days = dayGap(date);
    if (days && balanceCents > 0 && annualRate > 0) {
      accruedInterestCents += Math.round(balanceCents * (annualRate / 100) * days / 365);
    }
    cursor = new Date(date);
    return days;
  };
  const appendRow = (row, date, days) => {
    output.push({
      ...row,
      date: formatAccountDate(date),
      days: String(days),
      _generated_statement: true,
    });
  };

  const appendUserRow = (sourceRow) => {
    const date = sourceRow.dateObject;
    const days = accrue(date);
    const row = { ...sourceRow };
    delete row.dateObject;
    row[fieldKey("#")] = "";
    row.days = String(days);
    row._entry_type = "transaction";
    appendRow(row, date, days);
    balanceCents += Math.round((moneyValue(row.credit) - moneyValue(row.debit)) * 100);
  };

  schedule.forEach((posting) => {
    while (rawIndex < sourceRows.length && sourceRows[rawIndex].dateObject <= posting.date) {
      appendUserRow(sourceRows[rawIndex]);
      rawIndex += 1;
    }
    const days = accrue(posting.date);
    if (accruedInterestCents <= 0) return;
    const interestAmount = accruedInterestCents / 100;
    appendRow({
      calculate: "",
      [fieldKey("#")]: "",
      dr_days: "",
      transaction_by: "System",
      debit: "",
      credit: formatMoney(interestAmount),
      reference_no: "",
      _entry_type: "interest",
      _bs_date: posting.bs,
      _posting_label: posting.label,
    }, posting.date, days);
    balanceCents += accruedInterestCents;
    postedInterestCents += accruedInterestCents;
    const taxAmountCents = Math.round(accruedInterestCents * (taxRate / 100));
    if (taxAmountCents > 0) {
      appendRow({
        calculate: "",
        [fieldKey("#")]: "",
        dr_days: "",
        transaction_by: "System",
        debit: formatMoney(taxAmountCents / 100),
        credit: "",
        reference_no: "",
        _entry_type: "tax",
        _bs_date: posting.bs,
        _posting_label: posting.label,
      }, posting.date, 0);
      balanceCents -= taxAmountCents;
      taxCents += taxAmountCents;
    }
    accruedInterestCents = 0;
  });

  while (rawIndex < sourceRows.length) {
    appendUserRow(sourceRows[rawIndex]);
    rawIndex += 1;
  }
  if (closingDate > cursor) accrue(closingDate);

  const normalizedRows = output.map((row, index) => ({
    ...row,
    [fieldKey("#")]: String(index + 1),
  }));
  const debit = normalizedRows.reduce((sum, row) => sum + moneyValue(row.debit), 0);
  const credit = normalizedRows.reduce((sum, row) => sum + moneyValue(row.credit), 0);
  return {
    rows: normalizedRows,
    metrics: {
      opening,
      debit,
      credit,
      debitEntries: normalizedRows.filter((row) => moneyValue(row.debit) > 0).length,
      creditEntries: normalizedRows.filter((row) => moneyValue(row.credit) > 0).length,
      interest: (postedInterestCents + accruedInterestCents) / 100,
      postedInterest: postedInterestCents / 100,
      unpostedInterest: accruedInterestCents / 100,
      tax: taxCents / 100,
      balance: balanceCents / 100,
      postingDates: schedule.map((entry) => ({ bs: entry.bs, ad: entry.ad, label: entry.label })),
    },
  };
}

function sampleRecordSummary(rows) {
  const accountInfo = accountSectionData(appState.activeApplicant, "Account Information");
  const financials = calculateTransactionFinancials(rows, accountInfo);
  const userRows = (Array.isArray(rows) ? rows : []).filter((row) => !["interest", "tax"].includes(row._entry_type));
  const dates = rows.map((row) => parseAccountDate(row.date)).filter(Boolean).sort((a, b) => a - b);
  const gaps = rows.map((row) => Number(row.days) || 0).filter(Boolean);
  const openingDate = parseAccountDate(accountInfo.opening_date) || dates[0];
  const closingDate = parseAccountDate(accountInfo.closing_balance_date) || dates.at(-1);
  const months = openingDate && closingDate ? Math.max(1, Math.round((closingDate - openingDate) / (86400000 * 30))) : 0;
  return {
    opening: financials.opening,
    debit: financials.debit,
    credit: financials.credit,
    balance: financials.balance,
    debitEntries: userRows.filter((row) => moneyValue(row.debit) > 0).length,
    creditEntries: userRows.filter((row) => moneyValue(row.credit) > 0).length,
    durationMonths: months,
    openingDate: openingDate ? `${openingDate.getDate()} ${openingDate.toLocaleDateString("en-US", { month: "long" })}, ${openingDate.getFullYear()}` : "-",
    interest: financials.interest,
    tax: financials.tax,
    maximumGap: gaps.length ? Math.max(...gaps) : 0,
  };
}

function calculateTransactionFinancials(rows, accountInfo = {}) {
  return buildStatementRows(rows, accountInfo).metrics;
}

function validateTransactionDurationWithoutRender(section) {
  const datedRows = section.rows.map((row) => ({ row, date: parseAccountDate(row.date) })).filter((item) => item.date);
  datedRows.sort((a, b) => a.date - b.date);
  datedRows.forEach((item, index) => {
    const previous = datedRows[index - 1]?.date || item.date;
    item.row.days = String(Math.max(0, Math.round((item.date - previous) / 86400000)) || (index === 0 ? 1 : 0));
  });
  if (datedRows.length > 1) {
    section.duration_months = String(Math.max(1, Math.round((datedRows.at(-1).date - datedRows[0].date) / (86400000 * 30))));
  }
}

function parseAccountDate(value) {
  const cleaned = String(value || "").replace(/,\s*(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/i, "").trim();
  const parsed = new Date(cleaned);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseCalendarMonth(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoCalendarDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function formatLongAccountDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `${day} ${month}, ${date.getFullYear()}`;
}

function holidayNameForDate(date) {
  if (date.getDay() === 6) return "Saturday public holiday";
  return nepalPublicHolidayDates[isoCalendarDate(date)] || "";
}

function isTransactionHoliday(date) {
  return Boolean(holidayNameForDate(date));
}

function isTransactionWorkingDay(date) {
  return !isTransactionHoliday(date);
}

function nextWorkingDay(date) {
  const next = new Date(date);
  next.setHours(12, 0, 0, 0);
  do {
    next.setDate(next.getDate() + 1);
  } while (!isTransactionWorkingDay(next));
  return next;
}

function transactionWorkingDates(start, end) {
  const dates = [];
  for (let date = new Date(start); date <= end; date = new Date(date.getTime() + 86400000)) {
    if (isTransactionWorkingDay(date)) dates.push(new Date(date));
  }
  return dates;
}

function formatAccountDate(date) {
  const day = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const week = date.toLocaleDateString("en-GB", { weekday: "short" });
  return `${day}, ${week}`;
}

function csvCell(value) {
  const text = String(value || "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (const char of String(line || "")) {
    if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function normalizeTransactionCsvCells(cells) {
  const parts = [...cells];
  const yearLike = /^\d{4}$/.test(parts[1] || "");
  const dayLike = /^(mon|tue|wed|thu|fri|sat|sun)$/i.test(parts[2] || "");
  if (parts.length >= 8 && yearLike && dayLike) {
    return [`${parts[0]}, ${parts[1]}, ${parts[2]}`, ...parts.slice(3)];
  }
  return parts;
}

function toggleAccountColumnChooser(scope) {
  if (scope === "file") {
    appState.accountFileColumnChooserOpen = !appState.accountFileColumnChooserOpen;
  } else {
    appState.accountColumnChooserOpen = appState.accountColumnChooserOpen === scope ? "" : scope;
  }
  render();
}

function closeAccountColumnChooser(scope) {
  if (scope === "file") {
    appState.accountFileColumnChooserOpen = false;
    appState.accountFileColumnSearch = "";
  } else {
    appState.accountColumnChooserOpen = "";
    appState.accountColumnSearch = "";
  }
  render();
}

function toggleAccountColumn(scope, column, checked) {
  const sectionName = scope === "file" ? "File History" : "Transaction Records";
  const headers = scope === "file" ? accountFileHistoryHeaders : accountTransactionHeaders;
  const section = accountSectionData(appState.activeApplicant, sectionName);
  const key = `visible_columns_${scope}`;
  const current = new Set(accountVisibleColumns(section, scope, headers));
  if (checked) {
    current.add(column);
  } else if (current.size > 1) {
    current.delete(column);
  }
  section[key] = headers.filter((header) => current.has(header));
  storeObject(storageKeys.profileSections, data.profileSections);
  render();
  showToast(`${column} column ${checked ? "shown" : "hidden"}`);
}

function toggleApplicantTodoColumn(column, checked) {
  const current = new Set(appState.applicantTodoVisibleColumns);
  if (checked) current.add(column);
  else if (column !== "Applicant" && current.size > 1) current.delete(column);
  appState.applicantTodoVisibleColumns = applicantTodoColumns.filter((item) => current.has(item));
  storeArray(storageKeys.applicantTodoVisibleColumns, appState.applicantTodoVisibleColumns);
  render();
  showToast(`${column} detail ${checked ? "shown" : "hidden"}`);
}

function cssEscape(value) {
  return String(value || "").replace(/["\\]/g, "\\$&");
}

function applicantListRow(applicant, index, headers) {
  const values = {
    "#": applicant.localId || `LOCAL-${index + 1}`,
    Applicant: applicant.name || "Local Applicant",
    Avatar: applicant.avatar || initialsFor(applicant.name),
    Application: applicant.status || "Inquiry",
    Official: applicant.official || "Local draft",
    Income: applicant.income || "-",
    Created: applicant.created || todayLabel(),
    "Phone No": applicant.phone || "-",
    "Complete Address": applicant.address || "-",
    Passport: applicant.passportStatus || (applicant.passport ? "Submitted" : "Not Submitted"),
    "Bank and Annual Income Ratio": applicant.bankRatio || "-",
    Bank: applicant.bank || "-",
    "Passport No": applicant.passport || "-",
    "Passport Expiry Date": applicant.passportExpiry || "-",
    "Current Status": applicant.currentStatus || applicant.status || "Inquiry",
    "Class/Batch": applicant.classBatch || "-",
    Home: applicant.home || applicant.address || "-",
  };
  return headers.map((header) => values[header] ?? "");
}

function initialsFor(name) {
  const words = String(name || "LA").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() || "").join("") || "LA";
}

function convertVisitor(button) {
  const { values } = rowPayloadFromControl(button);
  if (!values.length) {
    showToast("Visitor row could not be read.");
    return;
  }
  const applicant = {
    name: values[0] || "Converted Visitor",
    gender: values[2] || "",
    phone: values[3] || "",
    address: values[5] || "",
    status: "Inquiry",
    intake: "",
    school: "",
    bank: "",
    income: "",
    bankRatio: "",
    passport: "",
    passportStatus: "Not Submitted",
    passportExpiry: "",
    official: "Local conversion",
    created: todayLabel(),
  };
  data.localApplicants.unshift(applicant);
  storeArray(storageKeys.applicants, data.localApplicants);
  showToast(`${applicant.name} converted to local Applicant draft.`);
}

function convertRecordVisitor(button) {
  const record = recordFromDrawer(button);
  const applicant = {
    name: record.name || "Converted Visitor",
    gender: "",
    phone: record.phone || "",
    address: record.address || "",
    status: "Inquiry",
    intake: "",
    school: "",
    bank: "",
    income: "",
    bankRatio: "",
    passport: "",
    passportStatus: "Not Submitted",
    passportExpiry: "",
    official: "Local conversion",
    created: todayLabel(),
  };
  data.localApplicants.unshift(applicant);
  storeArray(storageKeys.applicants, data.localApplicants);
  closeDetailDrawer();
  showToast(`${applicant.name} converted to local Applicant draft.`);
}

function previewDocument(button, action) {
  const payload = rowPayloadFromControl(button);
  const historyTemplate = button.dataset.fileHistoryTemplate || "";
  const historyMode = button.dataset.fileHistoryMode || "Account draft Template";
  const headers = payload.headers.length ? payload.headers : ["Template", "File", "Exported On", "Export Mode"];
  const values = payload.values.length ? payload.values : [historyTemplate, "Download | Preview", new Date().toLocaleString("en-US"), historyMode];
  if (!payload.values.length && !historyTemplate) {
    showToast("Document row could not be read.");
    return;
  }
  if (action === "download-document") recordFileHistoryDownload(values[0], historyMode);
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>${action === "download-document" ? "Document Download" : "Document Preview"}</strong>
        <small>Local-safe document action</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="document-preview">
      <h3>${escapeHtml(values[0] || "Document")}</h3>
      <p>${escapeHtml(values[3] || values[2] || "Automation document export")}</p>
      <dl>
        ${headers.map((header, index) => `<div><dt>${escapeHtml(header)}</dt><dd>${escapeHtml(values[index] || "-")}</dd></div>`).join("")}
      </dl>
      <div class="empty">No real file was downloaded. The exported record is previewed locally.</div>
    </div>
  `;
  drawer.classList.add("open");
}

function openAttendancePanel(button) {
  const { values } = rowPayloadFromControl(button);
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const className = values[2] || "Class";
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>Take Attendance</strong>
        <small>${escapeHtml(className)} · local session</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="attendance-list">
      ${["Present", "Absent", "Late"].map((status) => `<label><input type="radio" name="attendance" ${status === "Present" ? "checked" : ""} /> ${status}</label>`).join("")}
      <label><span>Remarks</span><textarea rows="4" placeholder="Attendance remarks"></textarea></label>
      <button class="primary-btn" data-action="close-drawer">Save Attendance Locally</button>
    </div>
  `;
  drawer.classList.add("open");
}

function openModuleForm(label) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>Add new ${escapeHtml(label)}</strong>
        <small>Local master-data draft</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <form class="advanced-filter" id="moduleForm" data-module="${escapeHtml(label)}">
      <label><span>Name</span><input name="name" placeholder="${escapeHtml(label)} name" /></label>
      <label><span>Address / Details</span><input name="details" placeholder="Details" /></label>
      <label><span>Phone / Value</span><input name="phone" placeholder="Phone or value" /></label>
      <div class="form-actions">
        <button type="button" class="ghost-btn" data-action="close-drawer">Cancel</button>
        <button type="button" class="primary-btn" data-action="save-module-row">Save Locally</button>
      </div>
    </form>
  `;
  drawer.classList.add("open");
}

function saveModuleRow() {
  const form = document.getElementById("moduleForm");
  if (!form) return false;
  const formData = new FormData(form);
  const moduleName = form.dataset.module || "Module";
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    showToast("Name is required.");
    return false;
  }
  const details = String(formData.get("details") || "");
  const phone = String(formData.get("phone") || "");
  const row = moduleDraftRow(moduleName, name, details, phone);
  data.localModules[moduleName] = [row, ...(data.localModules[moduleName] || [])];
  storeObject(storageKeys.modules, data.localModules);
  closeDetailDrawer();
  location.hash = moduleName.toLowerCase().replace(/\s+/g, "-");
  render();
  showToast(`${moduleName} draft "${name}" saved locally.`);
  return true;
}

function moduleDraftRow(moduleName, name, details, phone) {
  const rows = {
    Bank: [name, details, phone, "", "", "Local"],
    Consultancy: [name, details, phone, "", "Local"],
    "Fiscal Year": [name, "Active", "Local"],
    Intake: [name, details, phone, "Local"],
    School: [name, details, phone, "", "", "Local"],
  };
  return rows[moduleName] || [name, details, phone, "Local"];
}

function openColumnMapping() {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const mappings = [
    ["Applicant Name", "name", "Required"],
    ["Phone No", "phone", "Required"],
    ["Complete Address", "address", "Optional"],
    ["Passport No", "passport", "Optional"],
    ["Official", "official", "Optional"],
  ];
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>Map Columns</strong>
        <small>Local import mapping preview</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    ${table(["Automation Field", "Incoming Column", "Rule"], mappings)}
    <div class="tool-result">
      <strong>Mapping ready</strong>
      <span>Required fields are represented locally before import validation.</span>
    </div>
  `;
  drawer.classList.add("open");
}

function openApplicantLogPanel(record = appState.activeApplicant) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const entries = profileLogEntries(record);
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>Data Log/History</strong>
        <small>${escapeHtml(record?.name || "Applicant")}</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="profile-log-drawer">
      <div class="profile-log-toolbar"><span>⌕</span><input class="profile-log-search" placeholder="Search..." /></div>
      <div class="profile-log-list">
        ${entries.length ? entries.map(renderProfileLogEntry).join("") : `<div class="profile-log-empty">No log found!</div>`}
      </div>
    </div>
  `;
  drawer.dataset.mode = "profile-log";
  drawer.classList.add("open");
}

function openApplicantMorePanel(record = appState.activeApplicant) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const section = profileSectionData(record);
  const selectedDate = parseAccountDate(section.profile_more_date);
  const displayDate = selectedDate ? formatLongAccountDate(selectedDate) : "";
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>More</strong>
        <small>${escapeHtml(record?.name || "Applicant")}</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="profile-more-panel">
      <label class="profile-more-date-field">
        <span>Date duration compare date in document (i.e. calculate Age)</span>
        <div class="profile-more-date-control">
          <input name="profile_more_date" value="${escapeHtml(displayDate)}" placeholder=" " readonly data-action="open-profile-more-calendar" aria-haspopup="true" aria-expanded="${appState.profileMoreCalendarOpen ? "true" : "false"}" />
          <button type="button" class="date-picker-trigger profile-more-date-trigger" data-action="open-profile-more-calendar" title="Select date" aria-label="Select date"><span class="calendar-trigger-glyph" aria-hidden="true">▦</span></button>
        </div>
      </label>
      ${renderProfileMoreCalendar(selectedDate)}
      <button class="primary-btn" data-action="save-profile-more">Save</button>
      <hr />
      <p><strong>Copy Applicant to new Applicant</strong></p>
      <small>Attachment, Activity, Communication and Comment will not be copied.</small>
      <button class="ghost-btn" data-action="copy-applicant">Copy Applicant</button>
    </div>
  `;
  drawer.classList.add("open");
}

function renderProfileMoreCalendar(selectedDate = null) {
  if (!appState.profileMoreCalendarOpen) return "";
  const selected = selectedDate || parseCalendarMonth(appState.profileMoreCalendarSelected) || new Date();
  const monthDate = parseCalendarMonth(appState.profileMoreCalendarMonth) || new Date(selected.getFullYear(), selected.getMonth(), 1);
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const cells = Array.from({ length: 42 }, (_, index) => new Date(year, month, 1 - firstDay.getDay() + index));
  const selectedKey = selectedDate ? isoCalendarDate(selectedDate) : appState.profileMoreCalendarSelected;
  const todayKey = isoCalendarDate(new Date());
  return `
    <div class="profile-more-calendar" role="dialog" aria-label="Calendar">
      <div class="profile-more-calendar-head">
        <button type="button" class="icon-button" data-action="profile-more-calendar-prev-month" title="Previous month" aria-label="Previous month">‹</button>
        <strong>${escapeHtml(monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }))}</strong>
        <button type="button" class="icon-button" data-action="profile-more-calendar-next-month" title="Next month" aria-label="Next month">›</button>
      </div>
      <div class="profile-more-calendar-weekdays">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="profile-more-calendar-grid">
        ${cells.map((date) => {
          const key = isoCalendarDate(date);
          const outside = date.getMonth() !== month;
          const holiday = holidayNameForDate(date);
          const selectedClass = key === selectedKey ? "is-selected" : "";
          const todayClass = key === todayKey ? "is-today" : "";
          const holidayClass = holiday ? "is-holiday" : "";
          return `<button type="button" class="profile-more-calendar-day ${outside ? "is-outside" : ""} ${holidayClass} ${selectedClass} ${todayClass}" data-action="profile-more-calendar-select-date" data-date="${key}" title="${escapeHtml(holiday || (key === todayKey ? "Today" : "Select date"))}">${date.getDate()}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function openProfileMoreCalendar() {
  const record = appState.activeApplicant;
  const selected = parseAccountDate(profileSectionData(record).profile_more_date) || new Date();
  appState.profileMoreCalendarOpen = true;
  appState.profileMoreCalendarSelected = isoCalendarDate(selected);
  appState.profileMoreCalendarMonth = isoCalendarDate(new Date(selected.getFullYear(), selected.getMonth(), 1));
  openApplicantMorePanel(record);
}

function closeProfileMoreCalendar() {
  appState.profileMoreCalendarOpen = false;
  appState.profileMoreCalendarMonth = "";
  appState.profileMoreCalendarSelected = "";
  const drawer = document.getElementById("detailDrawer");
  if (drawer?.classList.contains("open") && drawer.querySelector(".profile-more-panel")) openApplicantMorePanel(appState.activeApplicant);
}

function moveProfileMoreCalendarMonth(offset) {
  const current = parseCalendarMonth(appState.profileMoreCalendarMonth) || new Date();
  appState.profileMoreCalendarMonth = isoCalendarDate(new Date(current.getFullYear(), current.getMonth() + offset, 1));
  openApplicantMorePanel(appState.activeApplicant);
}

function selectProfileMoreCalendarDate(value) {
  const date = parseCalendarMonth(value);
  if (!date) return;
  const section = profileSectionData(appState.activeApplicant);
  section.profile_more_date = isoCalendarDate(date);
  appState.profileMoreCalendarOpen = false;
  appState.profileMoreCalendarMonth = "";
  appState.profileMoreCalendarSelected = "";
  openApplicantMorePanel(appState.activeApplicant);
}

function saveApplicantMoreSettings() {
  const record = appState.activeApplicant;
  if (!record) return false;
  const input = document.querySelector('#detailDrawer [name="profile_more_date"]');
  const section = profileSectionData(record);
  const previousDate = section.profile_more_date || "";
  const selectedDate = parseAccountDate(input?.dataset.iso || input?.value);
  section.profile_more_date = selectedDate ? isoCalendarDate(selectedDate) : "";
  storeObject(storageKeys.profileSections, data.profileSections);
  if (previousDate !== section.profile_more_date) {
    appendProfileLog(record, { type: "changed", tab: "More", dataModule: "Applicant", changes: [{ field: "Date duration compare date in document", oldValue: previousDate || "-", newValue: section.profile_more_date || "-" }] });
  }
  appState.profileMoreCalendarOpen = false;
  closeDetailDrawer();
  showToast("Applicant date comparison setting saved locally.");
  return true;
}

function copyApplicantProfile(record = appState.activeApplicant) {
  if (!record) return;
  const copy = {
    ...record,
    id: `LOCAL-${Date.now()}`,
    name: `${record.name || "Applicant"} Copy`,
    created: todayLabel(),
  };
  data.localApplicants.unshift(copy);
  storeArray(storageKeys.applicants, data.localApplicants);
  const sourceKey = profileRecordKey(record);
  const copyKey = profileRecordKey(copy);
  const sourceSections = data.profileSections?.[sourceKey];
  if (sourceSections) {
    const clonedSections = JSON.parse(JSON.stringify(sourceSections));
    delete clonedSections["File History"];
    delete clonedSections.Attachment;
    delete clonedSections.Communication;
    delete clonedSections.Task;
    data.profileSections[copyKey] = clonedSections;
    storeObject(storageKeys.profileSections, data.profileSections);
  }
  delete data.profileLogs?.[copyKey];
  closeDetailDrawer();
  showToast(`${copy.name} copied locally. Attachments, activity, communication and comments were not copied.`);
}

function shareApplicantProfile(record = appState.activeApplicant) {
  if (!record) return;
  const url = new URL(window.location.href);
  url.hash = `applicants?applicant=${encodeURIComponent(record.id || record.name || "applicant")}`;
  const text = url.toString();
  const done = () => showToast("Applicant profile link copied locally.");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(done);
  else done();
}

function chooseApplicantPhoto() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (file) showToast(`${file.name} selected for applicant photo locally.`);
  }, { once: true });
  input.click();
}

function openToolPanel(button, label) {
  if (String(label || "").trim().toLowerCase() === "log") {
    openApplicantLogPanel(appState.activeApplicant);
    return;
  }
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const toolName = label || "Tool";
  const lower = toolName.toLowerCase();
  const route = location.hash.replace("#", "") || "dashboard";
  const panels = {
    validation: {
      title: "Data Validation Report",
      subtitle: "Applicant and account checks are summarized locally before export or review.",
      rows: [
        ["Required fields", "Profile and account entry rules", "Ready"],
        ["Transaction dates", "Working-day and duration rules", "Ready"],
        ["Reference values", "Local reference mappings", "Ready"],
        ["File history", "Generated files are tracked only after download", "Ready"],
      ],
      message: "Data validation report prepared locally.",
    },
    import: {
      title: "Import Validation",
      subtitle: "Rows are checked locally before any data is added.",
      rows: [["Import type", appState.dataImportType, "Ready"], ["Applicant Name", "Mapped", "Ready"], ["Phone No", "Mapped", "Ready"], ["Duplicate rule", appState.dataImportDuplicate, "Ready"], ["File", "No real file uploaded", "Local simulation"]],
      message: "Import validation finished locally.",
    },
    excel: {
      title: lower.includes("csv") ? "CSV Conversion" : "Excel Validation",
      subtitle: lower.includes("csv") ? "Spreadsheet conversion is represented without writing files." : "Excel file checks are represented locally.",
      rows: [["Workbook", "Local placeholder", "Ready"], ["Validation profile", appState.utilityProfile, "Ready"], ["Headers", "Detected", "Ready"], ["Output", lower.includes("csv") ? "CSV preview" : "Validation report", "Ready"]],
      message: lower.includes("csv") ? "CSV conversion preview prepared locally." : "Excel validation report prepared locally.",
    },
    pdf: {
      title: "PDF to Word Conversion",
      subtitle: "Conversion request is previewed safely in this workspace.",
      rows: [["PDF", "Local placeholder", "Ready"], ["OCR Mode", appState.utilityProfile, "Ready"], ["Output", ".docx draft", "Queued locally"]],
      message: "Word conversion request prepared locally.",
    },
    settings: {
      title: "Settings Saved",
      subtitle: "Project settings are stored only in this browser.",
      rows: [["Project", data.project.name, "Active"], ["Default Branch", "Special Japanese Language Academy", "Saved"], ["Default Assignee", appState.settingsAssignee, "Saved"], ["Records per request", appState.settingsPageSize, "Saved"]],
      message: "Settings saved locally.",
    },
    document: {
      title: "Template Upload",
      subtitle: "Document upload is represented without sending files.",
      rows: [["Template", "Local placeholder", "Ready"], ["Category", "Document Resources", "Ready"], ["Availability", "Preview only", "Local"]],
      message: "Template upload draft prepared locally.",
    },
  };
  const mode = lower.includes("data validation") ? "validation"
    : lower.includes("data import") ? "import"
    : lower.includes("excel") ? "excel"
    : lower.includes("pdf") ? "pdf"
    : lower.includes("settings") ? "settings"
    : lower.includes("document") || route.includes("document") ? "document"
    : "import";
  const panelData = panels[mode];
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>${escapeHtml(panelData.title)}</strong>
        <small>${escapeHtml(panelData.subtitle)}</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    ${table(["Check", "Value", "Status"], panelData.rows)}
    <div class="tool-result">
      <strong>Completed locally</strong>
      <span>${escapeHtml(panelData.message)} No backend request was sent.</span>
    </div>
    <div class="form-actions">
      <button class="primary-btn" data-action="close-drawer">Done</button>
    </div>
  `;
  drawer.classList.add("open");
  showToast(panelData.message);
}

function openSmsComposer(record = {}) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const recentVisitorOptions = data.visitorRecords.slice(0, 8).map((row) => `<option value="${escapeHtml(row[3])}">${escapeHtml(row[0])} · ${escapeHtml(row[3])}</option>`).join("");
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>New SMS</strong>
        <small>Local draft composer; no real SMS is sent</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <form class="advanced-filter" id="smsForm">
      <label><span>Recipient</span><input name="recipient" placeholder="Recipient name" value="${escapeHtml(record.name || "Individual")}" /></label>
      <label><span>Numbers</span><select name="numbers">${record.phone ? `<option value="${escapeHtml(record.phone)}">${escapeHtml(record.name || "Selected record")} · ${escapeHtml(record.phone)}</option>` : ""}${recentVisitorOptions}<option value="">Custom number...</option></select></label>
      <label><span>Custom Numbers</span><input name="customNumbers" placeholder="Comma separated numbers" value="${escapeHtml(record.phone || "")}" /></label>
      <label><span>Message</span><textarea name="message" rows="6" placeholder="SMS message">Special Japanese Language Academy मा भ्रमण गर्नु भएकोमा धन्यवाद !</textarea></label>
      <label><span>Schedule</span><input name="scheduled" placeholder="Now" /></label>
      <div class="form-actions">
        <button type="button" class="ghost-btn" data-action="close-drawer">Cancel</button>
        <button type="button" class="primary-btn" data-action="save-sms-draft">Save SMS Draft</button>
      </div>
    </form>
  `;
  drawer.classList.add("open");
}

function saveSmsDraft() {
  const form = document.getElementById("smsForm");
  if (!form) return false;
  const formData = new FormData(form);
  const message = String(formData.get("message") || "").trim();
  const numbers = String(formData.get("customNumbers") || formData.get("numbers") || "").trim();
  if (!message || !numbers) {
    showToast("Numbers and Message are required.");
    return false;
  }
  const draft = {
    recipient: String(formData.get("recipient") || "Individual"),
    numbers,
    message,
    count: Math.max(1, Math.ceil(message.length / 160)),
    scheduled: String(formData.get("scheduled") || "Now"),
    created: todayLabel(),
  };
  data.localSmsDrafts.unshift(draft);
  storeArray(storageKeys.smsDrafts, data.localSmsDrafts);
  closeDetailDrawer();
  location.hash = "sms-report";
  render();
  showToast("SMS draft saved locally. No real SMS was sent.");
  return true;
}

function saveVisitor() {
  const form = document.getElementById("visitorForm");
  if (!form) return false;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const gender = String(formData.get("gender") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  if (!name || !mobile || gender === "Select...") {
    showToast("Visitor Name, Gender and Mobile Number are required.");
    return false;
  }
  const row = [
    name,
    todayLabel(),
    gender,
    mobile,
    String(formData.get("email") || ""),
    String(formData.get("address") || ""),
    String(formData.get("course") || ""),
    "Local",
    "Convert to Applicant",
  ];
  localState.visitors.unshift(row);
  storeArray(storageKeys.visitors, localState.visitors);
  data.visitorRecords.unshift(row);
  form.reset();
  render();
  showToast("Visitor saved locally and added to Visitor List.");
  return true;
}

function openDetailDrawer(row) {
  let headers = [];
  let values = [];
  try {
    headers = JSON.parse(decodeURIComponent(row.dataset.headers || "[]"));
    values = JSON.parse(decodeURIComponent(row.dataset.row || "[]"));
  } catch {
    return;
  }
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const record = profileRecord(headers, values);
  const route = location.hash.replace("#", "") || "dashboard";
  const isVisitor = route.includes("visitor") || headers.some((header) => /visitor/i.test(header));
  const isApplicant = route.includes("applicant") || headers.some((header) => /applicant|passport|official/i.test(header));
  const isProfile = isVisitor || isApplicant || route.includes("followup") || route.includes("payment");
  const title = record.name || values.find((value) => String(value || "").trim()) || "Record";
  const payload = encodeURIComponent(JSON.stringify(record));
  const actionButtons = `
    <div class="profile-actions" data-record="${payload}">
      ${isVisitor ? `<button class="ghost-btn" data-action="record-convert">Convert</button>` : ""}
      <button class="ghost-btn" data-action="record-followup">Followup</button>
      ${isApplicant || route.includes("payment") ? `<button class="ghost-btn" data-action="record-payment">Payment</button>` : ""}
      <button class="ghost-btn" data-action="record-document">Document</button>
      <button class="primary-btn" data-action="record-sms">SMS</button>
    </div>
  `;
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>${escapeHtml(title)}</strong>
        <small>${isProfile ? "CRM profile workspace" : "Local record preview"}</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    ${isProfile ? actionButtons : ""}
    ${isProfile ? `
      <div class="profile-tabs">
        <button class="tab-button active" data-action="drawer-tab" data-tab="Profile"><span>Profile</span><strong>${escapeHtml(record.status || record.type || "Open")}</strong></button>
        <button class="tab-button" data-action="drawer-tab" data-tab="Communication"><span>Communication</span><strong>${data.localSmsDrafts.filter((item) => item.recipient === record.name).length}</strong></button>
        <button class="tab-button" data-action="drawer-tab" data-tab="Payments"><span>Payments</span><strong>${data.localPayments.filter((item) => item.name === record.name).length}</strong></button>
        <button class="tab-button" data-action="drawer-tab" data-tab="Documents"><span>Documents</span><strong>${matchingDocumentCount(record.name)}</strong></button>
      </div>
      <div class="profile-summary">
        <div><span>Phone</span><strong>${escapeHtml(record.phone || "-")}</strong></div>
        <div><span>Address</span><strong>${escapeHtml(record.address || "-")}</strong></div>
        <div><span>Owner</span><strong>${escapeHtml(record.owner || "Unassigned")}</strong></div>
      </div>
    ` : ""}
    <dl>
      ${headers.map((header, index) => `<div><dt>${escapeHtml(header)}</dt><dd>${escapeHtml(values[index] || "-")}</dd></div>`).join("")}
    </dl>
  `;
  drawer.dataset.record = JSON.stringify(record);
  drawer.classList.add("open");
}

function profileRecord(headers, values) {
  const get = (...patterns) => {
    const index = headers.findIndex((header) => patterns.some((pattern) => pattern.test(String(header))));
    return index >= 0 ? String(values[index] || "").trim() : "";
  };
  const firstText = values.find((value) => String(value || "").trim() && !String(value).startsWith("LOCAL-"));
  return {
    name: get(/visitor name/i, /^applicant$/i, /name/i) || firstText || "Selected record",
    phone: get(/mobile/i, /phone/i, /number/i),
    address: get(/address/i),
    status: get(/status/i, /application/i, /action/i),
    owner: get(/official/i, /assign/i, /user/i, /branch/i),
    type: location.hash.replace("#", "") || "record",
  };
}

function recordFromDrawer(button) {
  const source = button.closest("[data-record]")?.dataset.record || document.getElementById("detailDrawer")?.dataset.record || "{}";
  try {
    return JSON.parse(decodeURIComponent(source));
  } catch {
    try {
      return JSON.parse(source);
    } catch {
      return {};
    }
  }
}

function matchingDocumentCount(name) {
  if (!name) return 0;
  const needle = String(name).toLowerCase();
  return (window.fullDocumentLogs || data.documentLogs).filter((row) => row.join(" ").toLowerCase().includes(needle)).length;
}

function openRecordActionPanel(button, type) {
  const record = recordFromDrawer(button);
  const drawer = document.getElementById("detailDrawer");
  if (!drawer) return;
  const titles = {
    followup: "Add Followup",
    payment: "Add Payment",
    document: "Generate Document",
  };
  const bodies = {
    followup: `
      <label><span>Due Date</span><input name="dueDate" value="${todayLabel()}" /></label>
      <label><span>Type</span><select name="type"><option>Phone Followup</option><option>Office Visit</option><option>Document Followup</option><option>Payment Followup</option></select></label>
      <label><span>Remarks</span><textarea name="remarks" rows="5" placeholder="Followup remarks">Follow up with ${escapeHtml(record.name || "selected record")}</textarea></label>
    `,
    payment: `
      <label><span>Particulars</span><input name="particulars" value="Admission / processing fee" /></label>
      <label><span>Total Payable</span><input name="amount" value="0" /></label>
      <label><span>Total Paid</span><input name="paid" value="0" /></label>
      <label><span>Due Date</span><input name="dueDate" value="${todayLabel()}" /></label>
      <label><span>Remarks</span><textarea name="remarks" rows="4" placeholder="Payment remarks">Local payment followup</textarea></label>
    `,
    document: `
      <label><span>Template</span><select name="template"><option>Admission Form</option><option>Municipality Format-1</option><option>BANK REASON -2</option><option>Statement Template</option></select></label>
      <label><span>Mode</span><select name="mode"><option>Preview</option><option>Download request</option><option>Print</option></select></label>
      <label><span>Remarks</span><textarea name="remarks" rows="4">Generated locally for ${escapeHtml(record.name || "selected record")}</textarea></label>
    `,
  };
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>${titles[type]}</strong>
        <small>${escapeHtml(record.name || "Selected record")} · local workflow</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <form class="advanced-filter" id="recordActionForm" data-record="${encodeURIComponent(JSON.stringify(record))}">
      <label><span>Name</span><input name="name" value="${escapeHtml(record.name || "")}" /></label>
      <label><span>Phone</span><input name="phone" value="${escapeHtml(record.phone || "")}" /></label>
      ${bodies[type]}
      <div class="form-actions">
        <button type="button" class="ghost-btn" data-action="close-drawer">Cancel</button>
        <button type="button" class="primary-btn" data-action="save-record-${type}">Save Locally</button>
      </div>
    </form>
  `;
  drawer.dataset.record = JSON.stringify(record);
}

function saveRecordFollowup() {
  const form = document.getElementById("recordActionForm");
  if (!form) return false;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    showToast("Name is required.");
    return false;
  }
  const followup = {
    name,
    phone: String(formData.get("phone") || ""),
    dueDate: String(formData.get("dueDate") || todayLabel()),
    type: String(formData.get("type") || "Followup"),
    remarks: String(formData.get("remarks") || ""),
    status: "Open",
    created: todayLabel(),
  };
  data.localFollowups.unshift(followup);
  storeArray(storageKeys.followups, data.localFollowups);
  closeDetailDrawer();
  showToast(`${followup.name} followup saved locally.`);
  return true;
}

function saveRecordPayment() {
  const form = document.getElementById("recordActionForm");
  if (!form) return false;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    showToast("Name is required.");
    return false;
  }
  const amount = Number(String(formData.get("amount") || "0").replace(/,/g, "")) || 0;
  const paid = Number(String(formData.get("paid") || "0").replace(/,/g, "")) || 0;
  const payment = {
    name,
    phone: String(formData.get("phone") || ""),
    particulars: String(formData.get("particulars") || "Fee"),
    invoice: `LOCAL-${Date.now()}`,
    amount: amount.toLocaleString("en-IN"),
    paid: paid.toLocaleString("en-IN"),
    due: Math.max(0, amount - paid).toLocaleString("en-IN"),
    dueDate: String(formData.get("dueDate") || todayLabel()),
    remarks: String(formData.get("remarks") || ""),
    status: "Open",
    created: todayLabel(),
  };
  data.localPayments.unshift(payment);
  storeArray(storageKeys.payments, data.localPayments);
  closeDetailDrawer();
  showToast(`${payment.name} payment saved locally.`);
  return true;
}

function saveRecordDocument() {
  const form = document.getElementById("recordActionForm");
  if (!form) return false;
  const formData = new FormData(form);
  const name = String(formData.get("name") || "Selected record").trim();
  const template = String(formData.get("template") || "Document");
  closeDetailDrawer();
  showToast(`${template} prepared locally for ${name}.`);
  return true;
}

function openTopbarPanel(type) {
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  const notifications = [
    ...data.localFollowups.slice(0, 3).map((item) => [`Followup`, item.name, item.dueDate || item.created || "Local"]),
    ...data.localPayments.slice(0, 3).map((item) => [`Payment due`, item.name, item.due || item.amount || "0"]),
    ["Document Log", `${(window.fullDocumentLogs || data.documentLogs).length} captured exports`, "Review"],
    ["SMS", `${data.localSmsDrafts.length} local drafts`, "Drafts"],
  ];
  const appLaunchers = [
    ["Dashboard", "dashboard", "Lifecycle and recent activity"],
    ["Visitor Entry", "visitor-entry", "Frontdesk intake"],
    ["Visitor List", "visitor-list", "28 transferred records"],
    ["Applicant List", "applicants", "64 captured inquiry records"],
    ["Payment Dashboard", "payment-dashboard", "Outstanding dues and aging"],
    ["SMS Report", "sms-report", "36 captured SMS rows"],
    ["Document Log", "document-log", "833 captured export rows"],
    ["Data Import", "data-import", "Import wizard"],
    ["Settings", "settings", "Project controls"],
  ];
  const panels = {
    notifications: `
      <div class="drawer-head">
        <div><strong>Notifications</strong><small>Local activity center</small></div>
        <button class="icon-button" data-action="close-drawer" title="Close">x</button>
      </div>
      ${table(["Type", "Record", "Status"], notifications)}
      <div class="tool-result"><strong>Synced locally</strong><span>Followups, payment drafts, SMS drafts and document-log counts are summarized here.</span></div>
    `,
    apps: `
      <div class="drawer-head">
        <div><strong>Apps</strong><small>Automation module launcher</small></div>
        <button class="icon-button" data-action="close-drawer" title="Close">x</button>
      </div>
      <div class="launcher-grid">
        ${appLaunchers.map(([title, route, note]) => `
          <button data-action="launcher-route" data-route="${route}" data-label="${escapeHtml(title)}">
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(note)}</span>
          </button>
        `).join("")}
      </div>
    `,
    profile: `
      <div class="drawer-head">
        <div><strong>Special Japanese</strong><small>Logged-in project profile</small></div>
        <button class="icon-button" data-action="close-drawer" title="Close">x</button>
      </div>
      ${table(["Setting", "Value", "Status"], [
        ["Project", data.project.name, "Active"],
        ["SMS Credit", data.project.smsCredit, "Available"],
        ["Local Applicants", data.localApplicants.length, "Drafts"],
        ["Local Followups", data.localFollowups.length, "Open"],
        ["Local Payments", data.localPayments.length, "Open"],
      ])}
      <div class="tool-result"><strong>Read-only account panel</strong><span>This panel shows project/account state without touching the real Automation backend.</span></div>
    `,
  };
  drawer.innerHTML = panels[type] || panels.notifications;
  drawer.classList.add("open");
}

function openAdvancedFilter(button) {
  const panelElement = button.closest(".panel") || document.querySelector(".view .panel");
  const headers = [...(panelElement?.querySelectorAll(".sort-button") || [])].map((item) => item.textContent.trim()).filter(Boolean);
  let drawer = document.getElementById("detailDrawer");
  if (!drawer) {
    drawer = document.createElement("aside");
    drawer.id = "detailDrawer";
    drawer.className = "detail-drawer";
    document.body.appendChild(drawer);
  }
  drawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <strong>Advanced Filter</strong>
        <small>Local Automation-style filter panel</small>
      </div>
      <button class="icon-button" data-action="close-drawer" title="Close">x</button>
    </div>
    <div class="advanced-filter">
      <label><span>Column</span><select>${(headers.length ? headers : ["Name", "Status", "Date"]).map((header) => `<option>${escapeHtml(header)}</option>`).join("")}</select></label>
      <label><span>Condition</span><select><option>Contains</option><option>Equals</option><option>Starts with</option><option>Is empty</option></select></label>
      <label><span>Value</span><input class="drawer-filter-value" placeholder="Type filter value..." /></label>
      <div class="form-actions">
        <button class="ghost-btn" data-action="close-drawer">Cancel</button>
        <button class="primary-btn" data-action="apply-advanced-filter">Apply Filter</button>
      </div>
    </div>
  `;
  drawer.dataset.targetPanel = panelElement ? "1" : "";
  openAdvancedFilter.panel = panelElement;
  drawer.classList.add("open");
}

function closeDetailDrawer() {
  const drawer = document.getElementById("detailDrawer");
  const restoreApplicant = drawer?.dataset.mode === "profile-log" && appState.profileWindowOpen && location.hash.replace("#", "").split("?")[0] === "applicants";
  if (drawer?.classList.contains("account-preview-fullscreen")) {
    drawer.classList.remove("account-preview-fullscreen");
    if (document.fullscreenElement === drawer) document.exitFullscreen?.().catch(() => {});
  }
  drawer?.classList.remove("open");
  if (restoreApplicant) {
    delete drawer.dataset.mode;
    render();
  }
}

function toggleAccountPreviewFullscreen() {
  const drawer = document.getElementById("detailDrawer");
  if (!drawer) return;
  const entering = !drawer.classList.contains("account-preview-fullscreen");
  drawer.classList.toggle("account-preview-fullscreen", entering);
  const button = drawer.querySelector('[data-action="toggle-account-preview-fullscreen"]');
  if (button) {
    button.title = entering ? "Exit full screen" : "Full screen";
    button.setAttribute("aria-label", entering ? "Exit full screen" : "Open preview in full screen");
    button.innerHTML = `<i data-lucide="${entering ? "minimize-2" : "maximize-2"}" aria-hidden="true">${entering ? "⛶" : "⛶"}</i>`;
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
  }
  if (entering && drawer.requestFullscreen) {
    drawer.requestFullscreen().catch(() => {});
  } else if (!entering && document.fullscreenElement === drawer) {
    document.exitFullscreen?.().catch(() => {});
  }
}

document.addEventListener("fullscreenchange", () => {
  const drawer = document.getElementById("detailDrawer");
  if (!drawer || document.fullscreenElement === drawer) return;
  drawer.classList.remove("account-preview-fullscreen");
  const button = drawer.querySelector('[data-action="toggle-account-preview-fullscreen"]');
  if (button) {
    button.title = "Full screen";
    button.setAttribute("aria-label", "Open preview in full screen");
    button.innerHTML = '<i data-lucide="maximize-2" aria-hidden="true">⛶</i>';
    if (window.lucide?.createIcons) window.lucide.createIcons({ attrs: { "stroke-width": "1.8" } });
  }
});

function applyAdvancedFilter() {
  const drawer = document.getElementById("detailDrawer");
  const value = drawer?.querySelector(".drawer-filter-value")?.value || "";
  const panelElement = openAdvancedFilter.panel;
  const selects = drawer?.querySelectorAll(".advanced-filter .themed-select-value, .advanced-filter select") || [];
  const column = selects[0]?.value || "";
  const condition = selects[1]?.value || "Contains";
  const table = panelElement?.querySelector(".data-table");
  const headers = [...(table?.querySelectorAll("thead th") || [])].map((header) => header.textContent.trim());
  const columnIndex = headers.findIndex((header) => header === column);
  const query = String(value).trim().toLowerCase();
  if (table) {
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      const cell = String(row.children[columnIndex >= 0 ? columnIndex : 0]?.textContent || "").trim().toLowerCase();
      const matches = !query
        || condition === "Contains" && cell.includes(query)
        || condition === "Equals" && cell === query
        || condition === "Starts with" && cell.startsWith(query)
        || condition === "Is empty" && !cell;
      row.dataset.filterHidden = matches ? "false" : "true";
    });
    applyGridLimit(panelElement);
  }
  closeDetailDrawer();
  showToast(value ? `Advanced filter applied: ${column || "first column"} ${condition.toLowerCase()} "${value}"` : "Advanced filter cleared");
}

function renderGlobalResults(query) {
  let results = document.getElementById("globalResults");
  if (!results) {
    results = document.createElement("div");
    results.id = "globalResults";
    results.className = "global-results";
    document.querySelector(".quick-search").appendChild(results);
  }
  if (!query) {
    results.classList.remove("open");
    results.innerHTML = "";
    return;
  }
  const matches = [];
  searchableSources().forEach(([source, route, rows, headers]) => {
    rows.forEach((row) => {
      const joined = row.join(" ");
      if (joined.toLowerCase().includes(query)) {
        matches.push({ source, route, title: row.find((cell) => String(cell || "").trim()) || source, subtitle: headers.map((header, index) => `${header}: ${row[index] || "-"}`).slice(0, 3).join(" · ") });
      }
    });
  });
  results.innerHTML = matches.slice(0, 8).map((match) => `
    <button class="result-item" data-action="global-result" data-route="${escapeHtml(match.route)}" data-query="${escapeHtml(query)}">
      <strong>${escapeHtml(match.title)}</strong>
      <span>${escapeHtml(match.source)} · ${escapeHtml(match.subtitle)}</span>
    </button>
  `).join("") || `<div class="empty">No matching records</div>`;
  results.classList.add("open");
}

function copyNearestTable(button) {
  const tableElement = button.closest(".panel, .account-records-workspace")?.querySelector("table") || document.querySelector(".view table");
  if (!tableElement) {
    showToast("No table available to copy.");
    return;
  }
  const text = [...tableElement.querySelectorAll("tr")]
    .map((row) => [...row.children].map((cell) => cell.textContent.trim()).join("\t"))
    .join("\n");
  const done = () => showToast("Table copied locally.");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(done);
  else done();
}

function exportNearestTable(button, label) {
  const tableElement = button.closest(".page-head")?.nextElementSibling?.querySelector(".data-table") || document.querySelector(".view .data-table");
  if (!tableElement) {
    showToast("No table available to export.");
    return;
  }
  const rows = [...tableElement.querySelectorAll("tr")].map((row) => [...row.children].map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`).join(","));
  const csv = rows.join("\n");
  if (typeof URL !== "undefined" && typeof Blob !== "undefined") {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = `${String(label || "automation-export").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
  showToast("CSV export prepared locally.");
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}
