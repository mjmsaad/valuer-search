import { useState, useCallback, useRef, useMemo, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@400;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f0d0a;--surface:#1a1712;--card:#201d18;--border:#2e2a22;
  --gold:#c9a84c;--gold2:#e8c97a;--green:#4caf82;--red:#e07070;
  --text:#e8e2d6;--muted:#7a7060;--dim:#3d3828;
}
body{background:var(--bg);color:var(--text);font-family:'DM Mono',monospace;min-height:100vh}
.app{min-height:100vh;display:flex;flex-direction:column;
  background:radial-gradient(ellipse 70% 40% at 50% 0%,rgba(201,168,76,0.07),transparent),var(--bg)}
.header{padding:20px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:14px}
.brand-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--gold),var(--gold2));
  display:flex;align-items:center;justify-content:center;font-size:18px;color:#1a1400;border-radius:2px}
.brand-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--gold2)}
.brand-sub{font-size:10px;color:var(--muted);letter-spacing:.15em;text-transform:uppercase;margin-top:2px}
.header-right{display:flex;align-items:center;gap:12px}
.hbadge{font-size:10px;padding:4px 10px;border:1px solid;border-radius:2px;letter-spacing:.08em;font-weight:500}
.hbadge-empty{color:var(--muted);border-color:var(--dim)}
.hbadge-loaded{color:var(--gold);border-color:var(--gold)}
.hbadge-loading{color:var(--gold2);border-color:var(--gold2);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.btn-upload{padding:6px 14px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;
  letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border:1px solid var(--border);
  background:transparent;color:var(--muted);transition:all .15s;border-radius:2px}
.btn-upload:hover{color:var(--gold2);border-color:var(--gold2)}
.main{padding:24px 32px;flex:1;display:flex;flex-direction:column;gap:20px;max-width:1400px;width:100%;margin:0 auto}
.controls{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}
.search-wrap{flex:1;min-width:220px;position:relative}
.si{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:14px;pointer-events:none}
input[type=text]{background:var(--surface);border:1px solid var(--border);color:var(--text);
  padding:10px 12px;font-family:'DM Mono',monospace;font-size:13px;width:100%;outline:none;transition:border-color .2s}
input[type=text]:focus{border-color:var(--gold)}
input[type=text]::placeholder{color:var(--muted)}
.search-wrap input{padding-left:38px}
select{background:var(--surface);border:1px solid var(--border);color:var(--text);
  padding:0 12px;font-family:'DM Mono',monospace;font-size:11px;height:42px;outline:none;cursor:pointer}
select:focus{border-color:var(--gold)}
.btn{padding:10px 18px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
  letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border:1px solid;transition:all .15s}
.btn-ghost{background:transparent;color:var(--muted);border-color:var(--border)}
.btn-ghost:hover{color:var(--text);border-color:var(--text)}
.meta{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.count{font-size:11px;color:var(--muted)}
.count strong{color:var(--gold)}
.tags{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.kwtag{display:inline-flex;align-items:center;padding:2px 8px;background:rgba(201,168,76,.1);
  border:1px solid rgba(201,168,76,.2);border-radius:2px;font-size:10px;color:var(--gold2)}
.pagination{display:flex;gap:4px;align-items:center}
.pb{background:var(--surface);border:1px solid var(--border);color:var(--text);
  padding:4px 10px;font-family:'DM Mono',monospace;font-size:11px;cursor:pointer;transition:all .15s}
.pb:hover:not(:disabled){border-color:var(--gold);color:var(--gold)}
.pb.on{background:var(--gold);color:#1a1400;border-color:var(--gold)}
.pb:disabled{opacity:.3;cursor:not-allowed}
.table-wrap{overflow-x:auto;border:1px solid var(--border)}
table{width:100%;border-collapse:collapse;font-size:12px}
thead{background:var(--card);position:sticky;top:0;z-index:10}
th{padding:10px 12px;text-align:left;font-size:9px;letter-spacing:.15em;text-transform:uppercase;
  color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;cursor:pointer;user-select:none;transition:color .15s}
th:hover{color:var(--gold2)}
th.s{color:var(--gold)}
td{padding:9px 12px;border-bottom:1px solid rgba(46,42,34,.6);white-space:nowrap;max-width:320px;overflow:hidden;text-overflow:ellipsis}
tr:hover td{background:rgba(201,168,76,.03)}
tr:last-child td{border-bottom:none}
.wine-name{max-width:280px}
.vpill{display:inline-block;padding:2px 7px;background:var(--dim);border-radius:2px;font-size:10px;color:var(--muted)}
.price{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums}
.price-high{color:var(--green)}
.price-ave{color:var(--gold2)}
.price-zero{color:var(--dim)}
.achip{display:inline-block;padding:2px 7px;border-radius:2px;font-size:10px}
.chip-l{background:rgba(76,175,130,.12);color:var(--green)}
.chip-m{background:rgba(201,168,76,.12);color:var(--gold)}
.chip-o{background:rgba(122,112,96,.15);color:var(--muted)}
.qty{color:var(--muted);font-size:11px}
mark{background:rgba(201,168,76,.3);color:var(--gold2);border-radius:1px;padding:0 1px;font-style:normal}
.empty{text-align:center;padding:52px 20px;display:flex;flex-direction:column;align-items:center;gap:10px}
.ei{font-size:36px;opacity:.2}
.et{font-family:'Playfair Display',serif;font-size:17px;color:var(--text);opacity:.3}
.es{font-size:11px;color:var(--muted);opacity:.6}
.err{background:rgba(224,112,112,.07);border:1px solid rgba(224,112,112,.3);
  padding:12px 16px;font-size:12px;color:var(--red);display:flex;gap:8px;align-items:flex-start}
.notice{background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.15);
  padding:12px 16px;font-size:11px;color:var(--muted);display:flex;gap:8px;align-items:center;justify-content:space-between}
.notice code{color:var(--gold2);background:rgba(201,168,76,.1);padding:1px 5px}
.notice-btns{display:flex;gap:8px;align-items:center;flex-shrink:0}
.dismiss{background:none;border:none;color:var(--muted);cursor:pointer;font-size:13px}
.dismiss:hover{color:var(--text)}
.loading-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;
  flex:1;gap:16px;padding:60px}
.loading-spinner{width:32px;height:32px;border:2px solid var(--dim);border-top-color:var(--gold);
  border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{font-size:12px;color:var(--muted)}
input[type=file]{display:none}

/* Upload modal overlay */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px)}
.modal{background:var(--surface);border:1px solid var(--border);padding:28px;width:480px;max-width:90vw;position:relative}
.modal::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent)}
.modal-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:600;color:var(--gold2);margin-bottom:6px}
.modal-sub{font-size:11px;color:var(--muted);line-height:1.7;margin-bottom:20px}
.modal-sub code{color:var(--gold2);background:rgba(201,168,76,.1);padding:1px 5px}
.drop-zone{border:2px dashed var(--border);padding:32px 20px;text-align:center;
  cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:10px;border-radius:2px}
.drop-zone:hover,.drop-zone.over{border-color:var(--gold);background:rgba(201,168,76,.04)}
.di{font-size:28px;opacity:.35}
.dl{font-size:13px;color:var(--muted)}
.dl strong{color:var(--gold2)}
.ds{font-size:11px;color:var(--muted);opacity:.6}
.modal-footer{display:flex;justify-content:flex-end;margin-top:16px}
.btn-cancel{padding:8px 16px;font-family:'DM Mono',monospace;font-size:11px;cursor:pointer;
  border:1px solid var(--border);background:transparent;color:var(--muted);transition:all .15s}
.btn-cancel:hover{color:var(--text);border-color:var(--text)}
`;

/* ── CSV parser ── */
function parseCSVRow(line) {
  const fields = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { fields.push(field.trim()); field = ""; }
      else field += c;
    }
  }
  fields.push(field.trim());
  return fields;
}

function cleanPrice(v) {
  if (!v || v === "#DIV/0!" || v === "#VALUE!") return null;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));
  return isNaN(n) || n === 0 ? null : n;
}

function parseValuerCSV(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const f = parseCSVRow(line);
    if (!f[2] || f[2] === "#VALUE!" || f[0] === "#VALUE!") continue;
    const name = f[2].replace(/,\s*$/, "").trim();
    if (!name) continue;
    rows.push({
      name,
      vintage: String(f[1] || "").trim(),
      qty: String(f[3] || "").trim(),
      size: String(f[4] || "").trim(),
      reserve: cleanPrice(f[5]),
      low: cleanPrice(f[6]),
      high: cleanPrice(f[7]),
      ave: cleanPrice(f[8]),
      lastAuction: String(f[9] || "").trim(),
      auctionHouse: String(f[10] || f[11] || "").trim(),
    });
  }
  return rows;
}

/* ── Helpers ── */
const PAGE = 50;
const DEFAULT_CSV = import.meta.env.BASE_URL + "wines.csv"; // put your CSV in public/data/valuer.csv

function fmt(n) {
  if (n === null) return null;
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Hl({ text, keywords }) {
  const s = String(text ?? "");
  if (!keywords || keywords.length === 0) return <>{s}</>;
  const escaped = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp("(" + escaped.join("|") + ")", "gi");
  const parts = s.split(re);
  return <>{parts.map((part, i) => re.test(part) ? <mark key={i}>{part}</mark> : part)}</>;
}

function AuctionChip({ h }) {
  if (!h) return null;
  const lo = h.toLowerCase();
  const cls = lo.includes("langton") ? "chip-l" : lo.includes("mw") ? "chip-m" : "chip-o";
  return <span className={"achip " + cls}>{h}</span>;
}

function Price({ v, cls }) {
  if (v === null) return <span className="price-zero">—</span>;
  return <span className={"price " + (cls || "")}>{fmt(v)}</span>;
}

/* ── App ── */
export default function App() {
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState(null); // "default" | "upload"
  const [loadingDefault, setLoadingDefault] = useState(true);
  const [defaultFailed, setDefaultFailed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const debRef = useRef();

  const [house, setHouse] = useState("__all__");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  // Auto-load default CSV on startup
  useEffect(() => {
    fetch(DEFAULT_CSV)
      .then(res => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then(text => {
        const rows = parseValuerCSV(text);
        setData(rows);
        setDataSource("default");
        setLoadingDefault(false);
      })
      .catch(() => {
        setDefaultFailed(true);
        setLoadingDefault(false);
      });
  }, []);

  const handleQ = v => {
    setQ(v);
    clearTimeout(debRef.current);
    debRef.current = setTimeout(() => { setDq(v); setPage(1); }, 220);
  };

  const loadText = useCallback((text, source = "upload") => {
    try {
      setError(null);
      const rows = parseValuerCSV(text);
      setData(rows);
      setDataSource(source);
      setQ(""); setDq(""); setPage(1); setSortCol(null); setHouse("__all__");
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const loadFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => loadText(e.target.result, "upload");
    reader.onerror = () => setError("Could not read file.");
    reader.readAsText(file);
  }, [loadText]);

  const houses = useMemo(() => {
    if (!data) return [];
    const s = new Set(data.map(r => r.auctionHouse).filter(Boolean));
    return [...s].sort();
  }, [data]);

  const keywords = useMemo(() => dq.trim().split(/\s+/).filter(Boolean), [dq]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let rows = data;
    if (house !== "__all__") rows = rows.filter(r => r.auctionHouse === house);
    if (keywords.length > 0) {
      rows = rows.filter(r => {
        const haystack = [r.name, r.vintage, r.auctionHouse, r.lastAuction, r.size]
          .join(" ").toLowerCase();
        return keywords.every(kw => haystack.includes(kw.toLowerCase()));
      });
    }
    if (sortCol) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        if (av === null && bv === null) return 0;
        if (av === null) return 1;
        if (bv === null) return -1;
        const cmp = typeof av === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, keywords, house, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const sp = Math.min(page, totalPages);
  const rows = filtered.slice((sp - 1) * PAGE, sp * PAGE);

  const toggleSort = col => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const pageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (sp <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (sp >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", sp - 1, sp, sp + 1, "…", totalPages];
  };

  function Th({ col, label }) {
    return (
      <th onClick={() => toggleSort(col)} className={sortCol === col ? "s" : ""}>
        {label} {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : ""}
      </th>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="brand">
            <div className="brand-icon">🍷</div>
            <div>
              <div className="brand-name">Valuer Search</div>
              <div className="brand-sub">Wine Auction Database</div>
            </div>
          </div>
          <div className="header-right">
            <div className={"hbadge " + (loadingDefault ? "hbadge-loading" : data ? "hbadge-loaded" : "hbadge-empty")}>
              {loadingDefault ? "LOADING…" : data ? data.length.toLocaleString() + " ENTRIES" : "NO DATA"}
            </div>
            <button className="btn-upload" onClick={() => setShowModal(true)}>
              ↑ Load New CSV
            </button>
          </div>
        </header>

        <main className="main">
          {/* Loading state */}
          {loadingDefault && (
            <div className="loading-screen">
              <div className="loading-spinner" />
              <div className="loading-text">Loading wine database…</div>
            </div>
          )}

          {/* Setup notice — shown when default CSV not found */}
          {!loadingDefault && defaultFailed && !data && (
            <div className="notice">
              <span>
                No default database found. Place your CSV at <code>public/data/valuer.csv</code> in the project,
                or load one manually now.
              </span>
              <div className="notice-btns">
                <button className="btn btn-ghost" onClick={() => setShowModal(true)}>Load CSV</button>
              </div>
            </div>
          )}

          {/* Uploaded override notice */}
          {dataSource === "upload" && (
            <div className="notice">
              <span>Showing uploaded CSV. <strong>Reload the page</strong> to return to the default database.</span>
            </div>
          )}

          {error && <div className="err"><span>⚠</span><span>{error}</span></div>}

          {/* Search controls */}
          {data && (
            <div className="controls">
              <div className="search-wrap">
                <span className="si">⌕</span>
                <input
                  type="text"
                  placeholder="Type keywords e.g: grange 1998  or  penfolds shiraz 2010"
                  value={q}
                  onChange={e => handleQ(e.target.value)}
                />
              </div>
              <select value={house} onChange={e => { setHouse(e.target.value); setPage(1); }}>
                <option value="__all__">All Sources</option>
                {houses.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              {(q || house !== "__all__") && (
                <button className="btn btn-ghost"
                  onClick={() => { setQ(""); setDq(""); setHouse("__all__"); setPage(1); }}>
                  Clear
                </button>
              )}
            </div>
          )}

          {data && (
            <div className="meta">
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div className="count">
                  <strong>{filtered.length.toLocaleString()}</strong> of <strong>{data.length.toLocaleString()}</strong> wines
                </div>
                {keywords.length > 0 && (
                  <div className="tags">
                    {keywords.map(k => <span key={k} className="kwtag">"{k}"</span>)}
                  </div>
                )}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button className="pb" onClick={() => setPage(p => p - 1)} disabled={sp === 1}>←</button>
                  {pageNums().map((p, i) =>
                    p === "…"
                      ? <span key={"e" + i} style={{ color: "var(--muted)", fontSize: 11, padding: "0 3px" }}>…</span>
                      : <button key={p} className={"pb " + (sp === p ? "on" : "")} onClick={() => setPage(p)}>{p}</button>
                  )}
                  <button className="pb" onClick={() => setPage(p => p + 1)} disabled={sp === totalPages}>→</button>
                </div>
              )}
            </div>
          )}

          {data && (
            <div className="table-wrap">
              {rows.length === 0 ? (
                <div className="empty">
                  <div className="ei">🍾</div>
                  <div className="et">No wines found</div>
                  <div className="es">Try fewer or different keywords</div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <Th col="vintage" label="Vintage" />
                      <Th col="name" label="Wine" />
                      <Th col="qty" label="Qty" />
                      <th>Size</th>
                      <Th col="reserve" label="Reserve" />
                      <Th col="low" label="Low" />
                      <Th col="high" label="High" />
                      <Th col="ave" label="Ave" />
                      <Th col="lastAuction" label="Last Sale" />
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <span className="vpill">
                            <Hl text={r.vintage} keywords={keywords} />
                          </span>
                        </td>
                        <td className="wine-name" title={r.name}>
                          <Hl text={r.name} keywords={keywords} />
                        </td>
                        <td><span className="qty">{r.qty}</span></td>
                        <td><span className="qty">{r.size}</span></td>
                        <td><Price v={r.reserve} /></td>
                        <td><Price v={r.low} /></td>
                        <td><Price v={r.high} cls="price-high" /></td>
                        <td><Price v={r.ave} cls="price-ave" /></td>
                        <td><span className="qty">{r.lastAuction}</span></td>
                        <td><AuctionChip h={r.auctionHouse} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {!loadingDefault && !data && !defaultFailed && (
            <div className="empty">
              <div className="ei" style={{ fontSize: 44 }}>🍷</div>
              <div className="et">Wine Valuation Database</div>
              <div className="es">Upload your CSV to get started</div>
            </div>
          )}
        </main>

        {/* Upload modal */}
        {showModal && (
          <div className="overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className="modal">
              <div className="modal-title">Load a New CSV</div>
              <div className="modal-sub">
                Drop an updated export here to temporarily override the default database.
                The default will be restored on next page load.<br /><br />
                To update the default permanently, replace <code>public/data/valuer.csv</code> in your project and redeploy.
              </div>
              <div
                className={"drop-zone " + (dragging ? "over" : "")}
                onClick={() => fileRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); }}
              >
                <div className="di">📄</div>
                <div className="dl"><strong>Drop CSV here</strong> or click to browse</div>
                <div className="ds">Exported from Google Sheets → File → Download → CSV</div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
              <input ref={fileRef} type="file" accept=".csv,.tsv,.txt"
                onChange={e => loadFile(e.target.files[0])} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
