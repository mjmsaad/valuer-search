import { useState, useRef, useMemo, useEffect } from "react";

const SUPABASE_URL = "https://wpfwwgmicxcegooxkxtk.supabase.co";
const SUPABASE_KEY = "sb_publishable_c1mn9Pe5ltsToILat1bpiw_ITVFdn-d";
const TABLE = "wines";
const PAGE = 50;

async function fetchWines(keywords, auctionHouse, offset = 0) {
  let url = `${SUPABASE_URL}/rest/v1/${TABLE}?select=vintage,name,qty,size,reserve,low,high,ave,last_auction,auction_house&limit=${PAGE}&offset=${offset}&order=name.asc`;

  if (auctionHouse && auctionHouse !== "__all__") {
    url += `&auction_house=eq.${encodeURIComponent(auctionHouse)}`;
  }

  if (keywords.length > 0) {
    keywords.forEach(kw => {
      url += `&or=(name.ilike.*${encodeURIComponent(kw)}*,vintage.ilike.*${encodeURIComponent(kw)}*,auction_house.ilike.*${encodeURIComponent(kw)}*)`;
    });
  }

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "count=exact",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch from database");
  const count = parseInt(res.headers.get("content-range")?.split("/")[1] || "0");
  const data = await res.json();
  return { data, count };
}

async function fetchHouses() {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE}?select=auction_house&limit=1000`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return [...new Set(data.map(r => r.auction_house).filter(Boolean))].sort();
}

function cleanPrice(v) {
  if (!v || v === "#DIV/0!" || v === "#VALUE!") return null;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));
  return isNaN(n) || n === 0 ? null : n;
}

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
  const n = cleanPrice(v);
  if (n === null) return <span className="price-zero">—</span>;
  return <span className={"price " + (cls || "")}>{fmt(n)}</span>;
}

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
.hbadge{font-size:10px;padding:4px 10px;border:1px solid;border-radius:2px;letter-spacing:.08em;font-weight:500}
.hbadge-empty{color:var(--muted);border-color:var(--dim)}
.hbadge-loaded{color:var(--gold);border-color:var(--gold)}
.hbadge-loading{color:var(--gold2);border-color:var(--gold2);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes spin{to{transform:rotate(360deg)}}
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
  padding:12px 16px;font-size:12px;color:var(--red);display:flex;gap:8px;align-items:center}
.loading-state{text-align:center;padding:40px;color:var(--muted);font-size:12px;display:flex;align-items:center;justify-content:center;gap:8px}
.spinner{width:16px;height:16px;border:2px solid var(--dim);border-top-color:var(--gold);border-radius:50%;animation:spin .8s linear infinite;flex-shrink:0}
`;

export default function App() {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [houses, setHouses] = useState([]);

  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const debRef = useRef();

  const [house, setHouse] = useState("__all__");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const keywords = useMemo(() => dq.trim().split(/\s+/).filter(Boolean), [dq]);

  useEffect(() => {
    fetchHouses().then(setHouses);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const offset = (page - 1) * PAGE;
    fetchWines(keywords, house, offset)
      .then(({ data, count }) => {
        setRows(data);
        setTotalCount(count);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [dq, house, page]);

  const handleQ = v => {
    setQ(v);
    clearTimeout(debRef.current);
    debRef.current = setTimeout(() => { setDq(v); setPage(1); }, 400);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE));

  const sortedRows = useMemo(() => {
    if (!sortCol) return rows;
    return [...rows].sort((a, b) => {
      const an = cleanPrice(a[sortCol]), bn = cleanPrice(b[sortCol]);
      if (an !== null && bn !== null) return sortDir === "asc" ? an - bn : bn - an;
      if (an !== null) return sortDir === "asc" ? -1 : 1;
      if (bn !== null) return sortDir === "asc" ? 1 : -1;
      return sortDir === "asc"
        ? String(a[sortCol] ?? "").localeCompare(String(b[sortCol] ?? ""))
        : String(b[sortCol] ?? "").localeCompare(String(a[sortCol] ?? ""));
    });
  }, [rows, sortCol, sortDir]);

  const toggleSort = col => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const pageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  function Th({ col, label }) {
    return (
      <th onClick={() => toggleSort(col)} className={sortCol === col ? "s" : ""}>
        {label} {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : ""}
      </th>
    );
  }

  const status = loading ? "hbadge-loading" : error ? "hbadge-empty" : "hbadge-loaded";
  const statusText = loading ? "LOADING…" : error ? "ERROR" : `${totalCount.toLocaleString()} RESULTS`;

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
          <div className={"hbadge " + status}>{statusText}</div>
        </header>

        <main className="main">
          {error && (
            <div className="err">
              <span>⚠</span><span>{error}</span>
            </div>
          )}

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

          <div className="meta">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div className="count">
                <strong>{totalCount.toLocaleString()}</strong> wines
              </div>
              {keywords.length > 0 && (
                <div className="tags">
                  {keywords.map(k => <span key={k} className="kwtag">"{k}"</span>)}
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button className="pb" onClick={() => setPage(p => p - 1)} disabled={page === 1}>←</button>
                {pageNums().map((p, i) =>
                  p === "…"
                    ? <span key={"e" + i} style={{ color: "var(--muted)", fontSize: 11, padding: "0 3px" }}>…</span>
                    : <button key={p} className={"pb " + (page === p ? "on" : "")} onClick={() => setPage(p)}>{p}</button>
                )}
                <button className="pb" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>→</button>
              </div>
            )}
          </div>

          <div className="table-wrap">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                Searching database…
              </div>
            ) : sortedRows.length === 0 ? (
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
                    <Th col="last_auction" label="Last Sale" />
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((r, i) => (
                    <tr key={i}>
                      <td><span className="vpill"><Hl text={r.vintage} keywords={keywords} /></span></td>
                      <td className="wine-name" title={r.name}><Hl text={r.name} keywords={keywords} /></td>
                      <td><span className="qty">{r.qty}</span></td>
                      <td><span className="qty">{r.size}</span></td>
                      <td><Price v={r.reserve} /></td>
                      <td><Price v={r.low} /></td>
                      <td><Price v={r.high} cls="price-high" /></td>
                      <td><Price v={r.ave} cls="price-ave" /></td>
                      <td><span className="qty">{r.last_auction}</span></td>
                      <td><AuctionChip h={r.auction_house} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
