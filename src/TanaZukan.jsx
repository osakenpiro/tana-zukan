import { useState, useMemo, useCallback, useEffect } from 'react'

/* ═══ Pokemon 151 Data ═══ */
const POKE_RAW = [
["p001","フシギダネ","くさ","そうげん","s","🌱"],["p002","フシギソウ","くさ","そうげん","m","🌿"],["p003","フシギバナ","くさ","そうげん","l","🌳"],
["p004","ヒトカゲ","ほのお","やま","s","🦎"],["p005","リザード","ほのお","やま","m","🔥"],["p006","リザードン","ほのお","やま","l","🐉"],
["p007","ゼニガメ","みず","みずべ","s","🐢"],["p008","カメール","みず","みずべ","m","💧"],["p009","カメックス","みず","みずべ","l","🐚"],
["p010","キャタピー","むし","もり","xs","🐛"],["p011","トランセル","むし","もり","s","🟢"],["p012","バタフリー","むし","もり","m","🦋"],
["p013","ビードル","むし","もり","xs","🐝"],["p014","コクーン","むし","もり","s","🟡"],["p015","スピアー","むし","もり","m","🐝"],
["p016","ポッポ","ノーマル","もり","xs","🐦"],["p017","ピジョン","ノーマル","もり","m","🕊️"],["p018","ピジョット","ノーマル","もり","l","🦅"],
["p019","コラッタ","ノーマル","そうげん","xs","🐀"],["p020","ラッタ","ノーマル","そうげん","s","🐀"],
["p021","オニスズメ","ノーマル","そうげん","xs","🦅"],["p022","オニドリル","ノーマル","そうげん","m","🦅"],
["p023","アーボ","どく","そうげん","s","🐍"],["p024","アーボック","どく","そうげん","l","🐍"],
["p025","ピカチュウ","でんき","もり","xs","⚡"],["p026","ライチュウ","でんき","もり","s","⚡"],
["p027","サンド","じめん","やま","s","🦔"],["p028","サンドパン","じめん","やま","m","🦔"],
["p029","ニドラン♀","どく","そうげん","xs","👑"],["p030","ニドリーナ","どく","そうげん","s","👑"],["p031","ニドクイン","どく","そうげん","l","👑"],
["p032","ニドラン♂","どく","そうげん","xs","👑"],["p033","ニドリーノ","どく","そうげん","m","👑"],["p034","ニドキング","どく","そうげん","l","👑"],
["p035","ピッピ","ノーマル","やま","xs","🧚"],["p036","ピクシー","ノーマル","やま","m","🧚"],
["p037","ロコン","ほのお","そうげん","s","🦊"],["p038","キュウコン","ほのお","そうげん","m","🦊"],
["p039","プリン","ノーマル","そうげん","xs","🎈"],["p040","プクリン","ノーマル","そうげん","m","🎈"],
["p041","ズバット","どく","どうくつ","s","🦇"],["p042","ゴルバット","どく","どうくつ","m","🦇"],
["p043","ナゾノクサ","くさ","もり","xs","🌺"],["p044","クサイハナ","くさ","もり","s","🌺"],["p045","ラフレシア","くさ","もり","m","🌺"],
["p046","パラス","むし","もり","xs","🍄"],["p047","パラセクト","むし","もり","m","🍄"],
["p048","コンパン","むし","もり","s","🦋"],["p049","モルフォン","むし","もり","m","🦋"],
["p050","ディグダ","じめん","どうくつ","xs","🌰"],["p051","ダグトリオ","じめん","どうくつ","s","🌰"],
["p052","ニャース","ノーマル","まち","xs","🐱"],["p053","ペルシアン","ノーマル","まち","m","🐱"],
["p054","コダック","みず","みずべ","s","🦆"],["p055","ゴルダック","みず","みずべ","m","🦆"],
["p056","マンキー","かくとう","やま","xs","🐵"],["p057","オコリザル","かくとう","やま","m","🐵"],
["p058","ガーディ","ほのお","そうげん","s","🐕"],["p059","ウインディ","ほのお","そうげん","l","🐕"],
["p060","ニョロモ","みず","みずべ","s","🐸"],["p061","ニョロゾ","みず","みずべ","m","🐸"],["p062","ニョロボン","みず","みずべ","l","🐸"],
["p063","ケーシィ","エスパー","まち","s","🔮"],["p064","ユンゲラー","エスパー","まち","m","🔮"],["p065","フーディン","エスパー","まち","l","🔮"],
["p066","ワンリキー","かくとう","やま","s","💪"],["p067","ゴーリキー","かくとう","やま","m","💪"],["p068","カイリキー","かくとう","やま","l","💪"],
["p069","マダツボミ","くさ","もり","s","🪴"],["p070","ウツドン","くさ","もり","m","🪴"],["p071","ウツボット","くさ","もり","l","🪴"],
["p072","メノクラゲ","みず","うみ","m","🪼"],["p073","ドククラゲ","みず","うみ","l","🪼"],
["p074","イシツブテ","いわ","どうくつ","xs","🪨"],["p075","ゴローン","いわ","どうくつ","m","🪨"],["p076","ゴローニャ","いわ","どうくつ","l","🪨"],
["p077","ポニータ","ほのお","そうげん","m","🐴"],["p078","ギャロップ","ほのお","そうげん","l","🐴"],
["p079","ヤドン","みず","みずべ","m","🦥"],["p080","ヤドラン","みず","みずべ","l","🦥"],
["p081","コイル","でんき","まち","xs","🧲"],["p082","レアコイル","でんき","まち","m","🧲"],
["p083","カモネギ","ノーマル","そうげん","s","🦆"],
["p084","ドードー","ノーマル","そうげん","m","🐦"],["p085","ドードリオ","ノーマル","そうげん","l","🐦"],
["p086","パウワウ","みず","うみ","m","🦭"],["p087","ジュゴン","みず","うみ","l","🦭"],
["p088","ベトベター","どく","まち","m","💜"],["p089","ベトベトン","どく","まち","l","💜"],
["p090","シェルダー","みず","うみ","xs","🐚"],["p091","パルシェン","みず","うみ","l","🐚"],
["p092","ゴース","ゴースト","どうくつ","m","👻"],["p093","ゴースト","ゴースト","どうくつ","l","👻"],["p094","ゲンガー","ゴースト","どうくつ","l","👻"],
["p095","イワーク","いわ","どうくつ","xl","🐍"],
["p096","スリープ","エスパー","そうげん","m","😴"],["p097","スリーパー","エスパー","そうげん","l","😴"],
["p098","クラブ","みず","うみ","xs","🦀"],["p099","キングラー","みず","うみ","l","🦀"],
["p100","ビリリダマ","でんき","まち","xs","⚡"],["p101","マルマイン","でんき","まち","m","⚡"],
["p102","タマタマ","くさ","もり","xs","🥚"],["p103","ナッシー","くさ","もり","l","🌴"],
["p104","カラカラ","じめん","やま","xs","💀"],["p105","ガラガラ","じめん","やま","m","💀"],
["p106","サワムラー","かくとう","まち","l","🦵"],["p107","エビワラー","かくとう","まち","l","🥊"],
["p108","ベロリンガ","ノーマル","どうくつ","l","👅"],
["p109","ドガース","どく","まち","s","💨"],["p110","マタドガス","どく","まち","l","💨"],
["p111","サイホーン","じめん","そうげん","m","🦏"],["p112","サイドン","じめん","そうげん","l","🦏"],
["p113","ラッキー","ノーマル","そうげん","m","🥚"],
["p114","モンジャラ","くさ","もり","m","🌿"],
["p115","ガルーラ","ノーマル","そうげん","xl","🦘"],
["p116","タッツー","みず","うみ","xs","🐴"],["p117","シードラ","みず","うみ","m","🐉"],
["p118","トサキント","みず","みずべ","s","🐠"],["p119","アズマオウ","みず","みずべ","m","🐠"],
["p120","ヒトデマン","みず","うみ","s","⭐"],["p121","スターミー","みず","うみ","m","⭐"],
["p122","バリヤード","エスパー","まち","l","🤹"],
["p123","ストライク","むし","そうげん","l","🦗"],
["p124","ルージュラ","こおり","どうくつ","l","💋"],
["p125","エレブー","でんき","まち","m","⚡"],
["p126","ブーバー","ほのお","やま","l","🔥"],
["p127","カイロス","むし","もり","l","🦗"],
["p128","ケンタロス","ノーマル","そうげん","l","🐂"],
["p129","コイキング","みず","みずべ","s","🐟"],["p130","ギャラドス","みず","みずべ","xl","🐉"],
["p131","ラプラス","みず","うみ","xl","🦕"],
["p132","メタモン","ノーマル","どうくつ","xs","🟣"],
["p133","イーブイ","ノーマル","まち","xs","🦊"],["p134","シャワーズ","みず","みずべ","m","💧"],["p135","サンダース","でんき","そうげん","s","⚡"],["p136","ブースター","ほのお","まち","m","🔥"],
["p137","ポリゴン","ノーマル","まち","s","💠"],
["p138","オムナイト","いわ","うみ","xs","🐚"],["p139","オムスター","いわ","うみ","m","🐚"],
["p140","カブト","いわ","うみ","xs","🦀"],["p141","カブトプス","いわ","うみ","l","🦀"],
["p142","プテラ","いわ","やま","xl","🦖"],
["p143","カビゴン","ノーマル","そうげん","xl","😴"],
["p144","フリーザー","こおり","レア","l","❄️"],["p145","サンダー","でんき","レア","l","⚡"],["p146","ファイヤー","ほのお","レア","l","🔥"],
["p147","ミニリュウ","ドラゴン","みずべ","s","🐍"],["p148","ハクリュー","ドラゴン","みずべ","l","🐲"],["p149","カイリュー","ドラゴン","みずべ","xl","🐉"],
["p150","ミュウツー","エスパー","レア","xl","🧬"],["p151","ミュウ","エスパー","レア","xs","✨"],
]

const POKEMON = POKE_RAW.map((p, i) => ({ id:p[0], name:p[1], type:p[2], habitat:p[3], size:p[4], emoji:p[5], _idx:i }))
const POKEMON_BY_ID = Object.fromEntries(POKEMON.map(p => [p.id, p]))

/* ═══ Tier Defaults & Config ═══ */
const DEFAULT_TIERS = [
  { id:'S', label:'S', color:'#ef476f' },
  { id:'A', label:'A', color:'#ffd166' },
  { id:'B', label:'B', color:'#06d6a0' },
  { id:'C', label:'C', color:'#118ab2' },
  { id:'D', label:'D', color:'#8892b0' },
]
const MIN_TIERS = 2
const MAX_TIERS = 8
const TIER_ID_POOL = 'SABCDEFGHIJ'.split('')
const SIZE_TO_TIER = { xl:'S', l:'A', m:'B', s:'C', xs:'D' }

const TYPE_COLORS = {
  'くさ':'#78c850','ほのお':'#f08030','みず':'#6890f0','むし':'#a8b820',
  'ノーマル':'#a8a878','どく':'#a040a0','でんき':'#f8d030','じめん':'#e0c068',
  'かくとう':'#c03028','エスパー':'#f85888','いわ':'#b8a038','ゴースト':'#705898',
  'ドラゴン':'#7038f8','こおり':'#98d8d8',
}

const AXES = [
  { id:'type', label:'タイプ別', key:'type', values:['ノーマル','ほのお','みず','くさ','でんき','こおり','かくとう','どく','じめん','エスパー','むし','いわ','ゴースト','ドラゴン'] },
  { id:'habitat', label:'生息地別', key:'habitat', values:['もり','そうげん','やま','みずべ','うみ','どうくつ','まち','レア'] },
  { id:'size', label:'サイズ別', key:'size', values:['xs','s','m','l','xl'] },
]
const HABITAT_EMOJI = { 'もり':'🌲','そうげん':'🌾','やま':'⛰️','みずべ':'💧','うみ':'🌊','どうくつ':'🕳️','まち':'🏙️','レア':'✨' }
const SIZE_LABELS = { 'xs':'XS','s':'S','m':'M','l':'L','xl':'XL' }

const LS_PREFIX = 'tanaZukan.v02'
const LS_KEYS = {
  tierMap: `${LS_PREFIX}.tierMap`,
  tiers: `${LS_PREFIX}.tiers`,
  cellOrder: `${LS_PREFIX}.cellOrder`,
  axisIdx: `${LS_PREFIX}.axisIdx`,
}

/* ═══ VR CSV Standard v0.1 primitives (shared with banet-map) ═══ */
function csvStringify(rows) {
  if (!rows.length) return ''
  const cols = Object.keys(rows[0])
  const escape = v => {
    const s = v == null ? '' : String(v)
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  return [cols.map(escape).join(','), ...rows.map(r => cols.map(c => escape(r[c])).join(','))].join('\n')
}
function csvParse(text) {
  const lines = []; let cur = ''; let inQ = false
  for (const ch of text) {
    if (ch === '"') { inQ = !inQ; cur += ch }
    else if (ch === '\n' && !inQ) { lines.push(cur); cur = '' }
    else { cur += ch }
  }
  if (cur.trim()) lines.push(cur)
  const parseRow = (line) => {
    const cells = []; let cell = ''; let q = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') { if (q && line[i+1] === '"') { cell += '"'; i++ } else { q = !q } }
      else if (ch === ',' && !q) { cells.push(cell); cell = '' }
      else { cell += ch }
    }
    cells.push(cell)
    return cells
  }
  if (!lines.length) return []
  const header = parseRow(lines[0])
  return lines.slice(1).filter(l => l.trim()).map(l => {
    const vals = parseRow(l)
    const obj = {}
    header.forEach((h, i) => { obj[h.trim()] = (vals[i] ?? '').trim() })
    return obj
  })
}
function downloadFile(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = filename
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ═══ Utilities ═══ */
const withAlpha = (hex, alpha='15') => hex + alpha // append hex alpha (e.g. 15 = ~8%)

function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch { return fallback }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

function initialTierMap() {
  const m = {}
  POKEMON.forEach(p => { m[p.id] = SIZE_TO_TIER[p.size] || 'B' })
  return m
}

/* ═══ Main Component ═══ */
export default function TanaZukan() {
  const [axisIdx, setAxisIdx] = useState(() => loadLS(LS_KEYS.axisIdx, 0))
  const [tiers, setTiers] = useState(() => loadLS(LS_KEYS.tiers, DEFAULT_TIERS))
  const [tierMap, setTierMap] = useState(() => loadLS(LS_KEYS.tierMap, initialTierMap()))
  const [cellOrder, setCellOrder] = useState(() => loadLS(LS_KEYS.cellOrder, {})) // {cellKey: [pid,...]}
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dragItem, setDragItem] = useState(null)
  const [dragOver, setDragOver] = useState(null) // {tier, col, beforePid?}
  const [showSettings, setShowSettings] = useState(false)
  const [showImport, setShowImport] = useState(false)

  // Persist to localStorage
  useEffect(() => { saveLS(LS_KEYS.axisIdx, axisIdx) }, [axisIdx])
  useEffect(() => { saveLS(LS_KEYS.tiers, tiers) }, [tiers])
  useEffect(() => { saveLS(LS_KEYS.tierMap, tierMap) }, [tierMap])
  useEffect(() => { saveLS(LS_KEYS.cellOrder, cellOrder) }, [cellOrder])

  const axis = AXES[axisIdx]
  const tierIds = tiers.map(t => t.id)
  const fallbackTier = tierIds[tierIds.length - 1]

  // VR共通検索
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return POKEMON.filter(p => {
      const hay = [p.name, p.id, p.emoji, p.type, p.habitat, p.size].join(' ').toLowerCase()
      return hay.includes(q)
    }).slice(0, 12)
  }, [searchQuery])

  // Grid data: tier × column → items (sorted by cellOrder then POKEMON._idx)
  const grid = useMemo(() => {
    const g = {}
    tiers.forEach(t => {
      g[t.id] = {}
      axis.values.forEach(v => { g[t.id][v] = [] })
    })
    POKEMON.forEach(p => {
      const tier = tierIds.includes(tierMap[p.id]) ? tierMap[p.id] : fallbackTier
      const col = p[axis.key]
      if (g[tier] && g[tier][col]) g[tier][col].push(p)
    })
    // Sort each cell by cellOrder then _idx
    Object.keys(g).forEach(t => {
      Object.keys(g[t]).forEach(c => {
        const key = `${t}|${c}`
        const order = cellOrder[key] || []
        const orderIdx = Object.fromEntries(order.map((pid, i) => [pid, i]))
        g[t][c].sort((a, b) => {
          const ai = orderIdx[a.id] ?? Infinity
          const bi = orderIdx[b.id] ?? Infinity
          if (ai !== bi) return ai - bi
          return a._idx - b._idx
        })
      })
    })
    return g
  }, [tierMap, axisIdx, tiers, cellOrder, axis.key, axis.values, tierIds.join(','), fallbackTier])

  const colTotals = useMemo(() => {
    const t = {}
    axis.values.forEach(v => {
      t[v] = tiers.reduce((sum, tier) => sum + (grid[tier.id]?.[v]?.length || 0), 0)
    })
    return t
  }, [grid, axisIdx, tiers])

  const tierTotals = useMemo(() => {
    const t = {}
    tiers.forEach(tier => {
      t[tier.id] = axis.values.reduce((sum, v) => sum + (grid[tier.id]?.[v]?.length || 0), 0)
    })
    return t
  }, [grid, axisIdx, tiers])

  const cycleTier = useCallback((pid) => {
    setTierMap(prev => {
      const cur = tierIds.includes(prev[pid]) ? prev[pid] : fallbackTier
      const idx = tierIds.indexOf(cur)
      const next = tierIds[(idx + 1) % tierIds.length]
      return { ...prev, [pid]: next }
    })
  }, [tierIds.join(','), fallbackTier])

  // Move pid to (destTier, destCol) at position index (or end if undefined)
  const moveTo = useCallback((pid, destTier, destCol, beforePid) => {
    const p = POKEMON_BY_ID[pid]
    if (!p) return
    const srcTier = tierIds.includes(tierMap[pid]) ? tierMap[pid] : fallbackTier
    const srcCol = p[axis.key]

    setTierMap(prev => ({ ...prev, [pid]: destTier }))

    setCellOrder(prev => {
      const next = { ...prev }
      const srcKey = `${srcTier}|${srcCol}`
      const destKey = `${destTier}|${destCol}`

      // Remove from src
      const srcList = (next[srcKey] || grid[srcTier]?.[srcCol]?.map(x=>x.id) || []).filter(x => x !== pid)
      next[srcKey] = srcList

      // Build dest list
      const destCurrent = grid[destTier]?.[destCol]?.map(x => x.id) || []
      let destList = next[destKey] || destCurrent
      destList = destList.filter(x => x !== pid)
      // Ensure all current dest items are in the list (new items fall into play)
      destCurrent.forEach(id => { if (id !== pid && !destList.includes(id)) destList.push(id) })

      // Insert at position
      if (beforePid && destList.includes(beforePid)) {
        const at = destList.indexOf(beforePid)
        destList.splice(at, 0, pid)
      } else {
        destList.push(pid)
      }
      next[destKey] = destList
      return next
    })
  }, [tierMap, axis.key, grid, tierIds.join(','), fallbackTier])

  const handleSearchJump = useCallback(() => {
    setSearchQuery(''); setSearchOpen(false)
  }, [])

  const searchMatchIds = useMemo(() => {
    if (!searchQuery.trim()) return null
    return new Set(searchResults.map(p => p.id))
  }, [searchQuery, searchResults])

  /* ── Export CSV ── */
  const handleExport = useCallback(() => {
    // Build position map: for each pid, find its index in its current cell order
    const rows = POKEMON.map(p => {
      const tier = tierIds.includes(tierMap[p.id]) ? tierMap[p.id] : fallbackTier
      const col = p[axis.key]
      const key = `${tier}|${col}`
      const list = grid[tier]?.[col]?.map(x => x.id) || []
      const idx = list.indexOf(p.id)
      return {
        id: p.id,
        name: p.name,
        emoji: p.emoji,
        type: p.type,
        habitat: p.habitat,
        size: p.size,
        tier,
        col_order: idx >= 0 ? idx : ''
      }
    })
    const csv = csvStringify(rows)
    const ts = new Date().toISOString().slice(0, 10)
    downloadFile(csv, `tana-zukan-${ts}.csv`)
  }, [tierMap, grid, tierIds.join(','), fallbackTier, axis.key])

  /* ── Reset to defaults ── */
  const handleReset = useCallback(() => {
    if (!confirm('Tier/順序を初期状態に戻します。よろしいですか？')) return
    setTiers(DEFAULT_TIERS)
    setTierMap(initialTierMap())
    setCellOrder({})
  }, [])

  const supportedByCurrentAxis = axis.values

  return (
    <div style={{
      minHeight:'100vh', background:'#0b0f1a', color:'#e4e8f0',
      fontFamily:"'Zen Kaku Gothic New','Noto Sans JP',system-ui,sans-serif",
      display:'flex', flexDirection:'column',
    }}>
      {/* ═══ Header ═══ */}
      <header style={{
        padding:'10px 16px', borderBottom:'1px solid #1e2640',
        display:'flex', alignItems:'center', gap:10, flexWrap:'wrap',
        background:'#0b0f1a', position:'sticky', top:0, zIndex:10,
      }}>
        <div style={{fontSize:18,fontWeight:700,whiteSpace:'nowrap'}}>📚 たなずかん</div>

        {/* Axis switcher */}
        <div style={{display:'flex',gap:5}}>
          {AXES.map((a,i) => (
            <button key={a.id} onClick={() => setAxisIdx(i)} style={{
              padding:'4px 12px',fontSize:11,fontWeight:600,borderRadius:10,cursor:'pointer',
              border:'none',transition:'all .2s',
              background:i===axisIdx?'#ffd166':'#1e2640',
              color:i===axisIdx?'#0b0f1a':'#5a6378',
            }}>{a.label}</button>
          ))}
        </div>

        {/* Search */}
        <div style={{position:'relative',minWidth:140}}>
          <input value={searchQuery}
            onChange={e => {setSearchQuery(e.target.value);setSearchOpen(true)}}
            onFocus={() => setSearchOpen(true)}
            placeholder="🔍 検索…"
            style={{
              width:'100%',padding:'5px 24px 5px 8px',fontSize:12,
              background:'#111827',border:`1px solid ${searchQuery?'#ffd166':'#1e2640'}`,
              borderRadius:8,color:'#e4e8f0',outline:'none',
            }}/>
          {searchQuery && <button onClick={() => {setSearchQuery('');setSearchOpen(false)}} style={{
            position:'absolute',right:4,top:'50%',transform:'translateY(-50%)',
            background:'none',border:'none',color:'#5a6378',fontSize:10,cursor:'pointer',
          }}>✕</button>}
          {searchOpen && searchQuery.trim() && (
            <div style={{
              position:'absolute',top:'100%',left:0,marginTop:4,width:220,maxHeight:260,
              overflowY:'auto',background:'rgba(17,24,39,0.98)',border:'1px solid #ffd16644',
              borderRadius:10,boxShadow:'0 8px 32px rgba(0,0,0,0.5)',zIndex:20,
            }}>
              <div style={{padding:'5px 10px',fontSize:10,color:'#5a6378',borderBottom:'1px solid #1e2640'}}>
                {searchResults.length}件
              </div>
              {searchResults.map(p => (
                <div key={p.id} onClick={() => handleSearchJump(p)} style={{
                  padding:'6px 10px',cursor:'pointer',display:'flex',alignItems:'center',gap:6,
                  borderBottom:'1px solid #111827',fontSize:12,
                }} onMouseEnter={e => e.currentTarget.style.background='#1a1f35'}
                   onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <span style={{fontSize:14}}>{p.emoji}</span>
                  <span style={{fontWeight:600}}>{p.name}</span>
                  <span style={{marginLeft:'auto',fontSize:10,color:TYPE_COLORS[p.type]||'#888'}}>{p.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span style={{fontSize:11,color:'#5a6378'}}>{POKEMON.length}匹</span>

        {/* Toolbar */}
        <div style={{display:'flex',gap:4,marginLeft:'auto',alignItems:'center'}}>
          <button onClick={() => setShowImport(true)} title="CSV インポート" style={btnIcon}>📥 CSV</button>
          <button onClick={handleExport} title="CSV エクスポート" style={btnIcon}>📤 CSV</button>
          <button onClick={() => setShowSettings(true)} title="Tier設定" style={btnIcon}>⚙ Tier</button>
          <button onClick={handleReset} title="初期化" style={{...btnIcon, color:'#ef476f'}}>↺</button>
          <a href="https://osakenpiro.github.io/wakkazukan/" target="_blank" rel="noreferrer"
            style={{color:'#8892b0',fontSize:11,textDecoration:'none',marginLeft:6}}>🪐 わっか</a>
          <a href="https://osakenpiro.github.io/banet-map/" target="_blank" rel="noreferrer"
            style={{color:'#8892b0',fontSize:11,textDecoration:'none'}}>🌀 バネット</a>
          <span style={{fontSize:10,padding:'3px 8px',background:'#ffd166',color:'#0b0f1a',borderRadius:10,fontWeight:700}}>v0.2</span>
        </div>
      </header>

      {/* ═══ Grid ═══ */}
      <div style={{flex:1,overflowX:'auto',padding:'8px'}}>
        <table style={{
          borderCollapse:'separate',borderSpacing:2,width:'100%',minWidth:800,
          tableLayout:'fixed',
        }}>
          <thead>
            <tr>
              <th style={{width:52,padding:4}}/>
              {supportedByCurrentAxis.map(v => {
                const colColor = axis.id==='type' ? (TYPE_COLORS[v]||'#888') : '#8892b0'
                return (
                  <th key={v} style={{
                    padding:'6px 4px',fontSize:11,fontWeight:700,color:colColor,
                    textAlign:'center',background:'#111827',borderRadius:6,
                    position:'relative',
                  }}>
                    {axis.id==='habitat' && <span style={{marginRight:3}}>{HABITAT_EMOJI[v]||''}</span>}
                    {axis.id==='size' ? SIZE_LABELS[v] : v}
                    <div style={{fontSize:9,color:'#5a6378',fontWeight:400}}>{colTotals[v]}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {tiers.map(tier => (
              <tr key={tier.id}>
                <td style={{
                  padding:'8px 4px',textAlign:'center',verticalAlign:'top',
                  background:withAlpha(tier.color, '15'),borderRadius:6,position:'relative',
                }}
                onDragOver={e => {e.preventDefault();setDragOver({tier:tier.id,col:null})}}
                onDragLeave={() => setDragOver(null)}
                onDrop={e => {
                  e.preventDefault()
                  const pid = e.dataTransfer.getData('text/plain')
                  // Drop on tier label → move to end of first column cell of this tier
                  if(pid) {
                    const p = POKEMON_BY_ID[pid]
                    if (p) moveTo(pid, tier.id, p[axis.key], null)
                  }
                  setDragOver(null); setDragItem(null)
                }}>
                  <div style={{
                    fontSize:22,fontWeight:900,color:tier.color,
                    lineHeight:1,marginBottom:2,
                    textShadow:`0 0 12px ${tier.color}44`,
                  }}>{tier.label}</div>
                  <div style={{fontSize:9,color:'#5a6378'}}>{tierTotals[tier.id]}</div>
                </td>
                {supportedByCurrentAxis.map(v => {
                  const items = grid[tier.id]?.[v] || []
                  const isHoverCell = dragOver?.tier===tier.id && dragOver?.col===v
                  return (
                    <td key={v} style={{
                      padding:3,verticalAlign:'top',
                      background: isHoverCell ? withAlpha(tier.color, '25') : '#0d1320',
                      borderRadius:4,minHeight:40,
                      transition:'background 0.15s',
                    }}
                    onDragOver={e => {e.preventDefault();setDragOver({tier:tier.id,col:v})}}
                    onDragLeave={e => {
                      // Only clear if leaving to outside td
                      if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null)
                    }}
                    onDrop={e => {
                      e.preventDefault()
                      const pid = e.dataTransfer.getData('text/plain')
                      if(pid) moveTo(pid, tier.id, v, null)
                      setDragOver(null); setDragItem(null)
                    }}>
                      <div style={{display:'flex',flexWrap:'wrap',gap:2,minHeight:28}}>
                        {items.map(p => {
                          const dimmed = searchMatchIds && !searchMatchIds.has(p.id)
                          return (
                            <div key={p.id}
                              draggable
                              onDragStart={e => {
                                e.dataTransfer.setData('text/plain', p.id)
                                setDragItem(p.id)
                              }}
                              onDragEnd={() => { setDragItem(null); setDragOver(null) }}
                              onDragOver={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setDragOver({tier:tier.id,col:v,beforePid:p.id})
                              }}
                              onDrop={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                const pid = e.dataTransfer.getData('text/plain')
                                if (pid && pid !== p.id) moveTo(pid, tier.id, v, p.id)
                                setDragOver(null); setDragItem(null)
                              }}
                              onClick={() => cycleTier(p.id)}
                              title={`${p.name} (${p.type}) — クリックでTier変更 / D&Dで移動・並び替え`}
                              style={{
                                display:'flex',alignItems:'center',gap:2,
                                padding:'2px 5px',borderRadius:6,cursor:'grab',
                                background: dragItem===p.id ? '#ffd16633' : '#111827',
                                border:`1px solid ${
                                  dimmed?'#1e264033':
                                  dragOver?.beforePid===p.id?'#ffd166':
                                  dragItem===p.id?'#ffd166':'#1e2640'
                                }`,
                                borderLeft: dragOver?.beforePid===p.id ? `3px solid #ffd166` : undefined,
                                opacity: dimmed ? 0.15 : 1,
                                transition:'opacity 0.2s, border-color 0.15s',
                                fontSize:11,whiteSpace:'nowrap',
                              }}>
                              <span style={{fontSize:13}}>{p.emoji}</span>
                              <span style={{fontSize:10,color:'#c4c9d4',maxWidth:56,overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ═══ Footer ═══ */}
      <footer style={{
        padding:'8px 16px',borderTop:'1px solid #1e2640',
        display:'flex',alignItems:'center',gap:16,fontSize:10,color:'#5a6378',flexWrap:'wrap',
      }}>
        <span>クリック → Tier変更</span>
        <span>D&D → Tier移動 / セル内並び替え</span>
        <span>💾 自動保存中</span>
        <a href="https://github.com/osakenpiro/tana-zukan" target="_blank" rel="noreferrer"
          style={{marginLeft:'auto',color:'#5a6378',textDecoration:'none'}}>GitHub</a>
      </footer>

      {/* ═══ Settings Modal ═══ */}
      {showSettings && (
        <SettingsModal
          tiers={tiers} setTiers={setTiers}
          tierMap={tierMap} setTierMap={setTierMap}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* ═══ Import Modal ═══ */}
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={(rows) => {
            // Apply tier and col_order from rows
            const newMap = { ...tierMap }
            const orderBuckets = {} // {cellKey: [{pid, idx}]}
            const validTiers = new Set(tiers.map(t => t.id))
            rows.forEach(r => {
              const pid = r.id
              if (!POKEMON_BY_ID[pid]) return
              const tier = validTiers.has(r.tier) ? r.tier : fallbackTier
              newMap[pid] = tier
              const p = POKEMON_BY_ID[pid]
              const col = p[axis.key]
              const idx = r.col_order !== '' && r.col_order != null ? Number(r.col_order) : null
              if (idx != null && !Number.isNaN(idx)) {
                const key = `${tier}|${col}`
                if (!orderBuckets[key]) orderBuckets[key] = []
                orderBuckets[key].push({ pid, idx })
              }
            })
            // Build new cellOrder
            const newCellOrder = { ...cellOrder }
            Object.entries(orderBuckets).forEach(([key, arr]) => {
              arr.sort((a,b) => a.idx - b.idx)
              newCellOrder[key] = arr.map(x => x.pid)
            })
            setTierMap(newMap)
            setCellOrder(newCellOrder)
            setShowImport(false)
          }}
        />
      )}
    </div>
  )
}

/* ═══ Settings Modal ═══ */
function SettingsModal({ tiers, setTiers, tierMap, setTierMap, onClose }) {
  const [draft, setDraft] = useState(tiers)

  const updateTier = (i, patch) => {
    setDraft(prev => prev.map((t,j) => j===i ? {...t, ...patch} : t))
  }
  const addTier = () => {
    if (draft.length >= MAX_TIERS) return
    const usedIds = new Set(draft.map(t => t.id))
    const newId = TIER_ID_POOL.find(id => !usedIds.has(id)) || `T${draft.length+1}`
    setDraft(prev => [...prev, { id:newId, label:newId, color:'#8892b0' }])
  }
  const removeTier = (i) => {
    if (draft.length <= MIN_TIERS) return
    setDraft(prev => prev.filter((_, j) => j !== i))
  }
  const moveTier = (i, dir) => {
    setDraft(prev => {
      const next = [...prev]
      const j = i + dir
      if (j < 0 || j >= next.length) return prev
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  const apply = () => {
    // Migrate tierMap: any pid in removed tier → last remaining tier
    const newIds = new Set(draft.map(t => t.id))
    const fallback = draft[draft.length - 1].id
    const newMap = {}
    Object.entries(tierMap).forEach(([pid, tier]) => {
      newMap[pid] = newIds.has(tier) ? tier : fallback
    })
    setTiers(draft)
    setTierMap(newMap)
    onClose()
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div style={{...modal, maxWidth:520}} onClick={e => e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:16,fontWeight:700}}>⚙ Tier設定</div>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>
        <div style={{fontSize:11,color:'#5a6378',marginBottom:12}}>
          段数 {MIN_TIERS}〜{MAX_TIERS}。削除されたTierの駒は最下段へ自動移動。
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {draft.map((t, i) => (
            <div key={t.id} style={{
              display:'flex',alignItems:'center',gap:8,padding:'6px 8px',
              background:'#111827',borderRadius:8,border:`1px solid ${t.color}44`,
            }}>
              <div style={{
                width:32,height:32,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',
                background:withAlpha(t.color,'30'),color:t.color,fontWeight:900,fontSize:16,
              }}>{t.label[0] || '?'}</div>
              <input value={t.label} onChange={e => updateTier(i, {label:e.target.value.slice(0,4)})}
                style={{...input, width:60}} placeholder="ラベル"/>
              <input type="color" value={t.color} onChange={e => updateTier(i, {color:e.target.value})}
                style={{width:36,height:28,border:'none',background:'none',cursor:'pointer'}}/>
              <span style={{fontSize:10,color:'#5a6378',minWidth:40}}>ID:{t.id}</span>
              <div style={{marginLeft:'auto',display:'flex',gap:4}}>
                <button onClick={() => moveTier(i,-1)} disabled={i===0} style={miniBtn}>↑</button>
                <button onClick={() => moveTier(i,1)} disabled={i===draft.length-1} style={miniBtn}>↓</button>
                <button onClick={() => removeTier(i)} disabled={draft.length<=MIN_TIERS}
                  style={{...miniBtn, color:'#ef476f'}}>🗑</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addTier} disabled={draft.length>=MAX_TIERS} style={{
          marginTop:10,padding:'8px 12px',fontSize:12,width:'100%',
          background:'#1e2640',border:'1px dashed #5a6378',borderRadius:8,
          color:'#8892b0',cursor:draft.length>=MAX_TIERS?'not-allowed':'pointer',
          opacity:draft.length>=MAX_TIERS?0.4:1,
        }}>+ Tier追加 ({draft.length}/{MAX_TIERS})</button>

        <div style={{display:'flex',gap:8,marginTop:16,justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{...input,background:'#1e2640',padding:'8px 16px',cursor:'pointer'}}>キャンセル</button>
          <button onClick={apply} style={{
            padding:'8px 20px',background:'#ffd166',color:'#0b0f1a',
            border:'none',borderRadius:8,fontWeight:700,cursor:'pointer',
          }}>適用</button>
        </div>
      </div>
    </div>
  )
}

/* ═══ Import Modal ═══ */
function ImportModal({ onClose, onImport }) {
  const [rows, setRows] = useState(null)
  const [filename, setFilename] = useState('')
  const [error, setError] = useState('')

  const handleFile = (file) => {
    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = csvParse(String(reader.result))
        if (!parsed.length) { setError('空のCSVです'); return }
        if (!parsed[0].id) { setError('id カラムが見つかりません'); return }
        setRows(parsed)
        setFilename(file.name)
      } catch (e) { setError('パースエラー: ' + e.message) }
    }
    reader.readAsText(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const stats = useMemo(() => {
    if (!rows) return null
    const hasId = rows.filter(r => r.id).length
    const hasTier = rows.filter(r => r.tier).length
    const hasOrder = rows.filter(r => r.col_order !== '' && r.col_order != null).length
    return { total: rows.length, hasId, hasTier, hasOrder }
  }, [rows])

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',marginBottom:14}}>
          <div style={{fontSize:16,fontWeight:700}}>📥 CSV インポート</div>
          <span style={{marginLeft:8,fontSize:10,color:'#5a6378'}}>VR CSV Standard v0.1</span>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>

        <div
          onDragOver={e => e.preventDefault()}
          onDrop={onDrop}
          style={{
            border:'2px dashed #1e2640',borderRadius:12,padding:20,
            textAlign:'center',marginBottom:12,background:'#0d1320',
          }}>
          <div style={{fontSize:11,color:'#8892b0',marginBottom:8}}>
            CSVファイルをドロップ、または選択
          </div>
          <input type="file" accept=".csv,.tsv,.txt"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            style={{fontSize:11,color:'#8892b0'}}/>
        </div>

        {error && <div style={{color:'#ef476f',fontSize:12,marginBottom:8}}>⚠ {error}</div>}

        {rows && stats && (
          <div style={{
            background:'#111827',borderRadius:8,padding:10,marginBottom:12,fontSize:11,
          }}>
            <div style={{color:'#06d6a0',marginBottom:4}}>✓ {filename} ({stats.total}行)</div>
            <div style={{color:'#8892b0'}}>
              id: {stats.hasId} / tier: {stats.hasTier} / col_order: {stats.hasOrder}
            </div>
          </div>
        )}

        <div style={{fontSize:10,color:'#5a6378',marginBottom:12}}>
          スキーマ: <code style={{color:'#ffd166'}}>id, name, emoji, type, habitat, size, tier, col_order</code><br/>
          必須: <code>id</code>（POKEMON IDと照合）/ 反映: <code>tier</code>, <code>col_order</code>
        </div>

        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{...input,background:'#1e2640',padding:'8px 16px',cursor:'pointer'}}>キャンセル</button>
          <button onClick={() => rows && onImport(rows)} disabled={!rows} style={{
            padding:'8px 20px',
            background: rows ? '#ffd166' : '#1e2640',
            color: rows ? '#0b0f1a' : '#5a6378',
            border:'none',borderRadius:8,fontWeight:700,
            cursor: rows ? 'pointer' : 'not-allowed',
          }}>インポート</button>
        </div>
      </div>
    </div>
  )
}

/* ═══ Shared Styles ═══ */
const btnIcon = {
  padding:'4px 10px',fontSize:11,fontWeight:600,borderRadius:8,cursor:'pointer',
  border:'1px solid #1e2640',background:'#111827',color:'#c4c9d4',
}
const input = {
  padding:'5px 8px',fontSize:12,background:'#0d1320',
  border:'1px solid #1e2640',borderRadius:6,color:'#e4e8f0',outline:'none',
}
const miniBtn = {
  padding:'3px 7px',fontSize:11,border:'1px solid #1e2640',
  background:'#0d1320',color:'#8892b0',borderRadius:5,cursor:'pointer',
}
const overlay = {
  position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',
  display:'flex',alignItems:'center',justifyContent:'center',
  zIndex:100,padding:20,
}
const modal = {
  background:'#0b0f1a',border:'1px solid #1e2640',borderRadius:16,
  padding:20,maxWidth:480,width:'100%',maxHeight:'85vh',overflowY:'auto',
  boxShadow:'0 16px 48px rgba(0,0,0,0.6)',
}
const closeBtn = {
  marginLeft:'auto',background:'none',border:'none',color:'#5a6378',
  fontSize:18,cursor:'pointer',padding:4,
}
