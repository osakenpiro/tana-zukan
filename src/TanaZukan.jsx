import { useState, useMemo, useCallback, useRef, useEffect } from 'react'

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

const POKEMON = POKE_RAW.map(p => ({ id:p[0], name:p[1], type:p[2], habitat:p[3], size:p[4], emoji:p[5] }))

/* ═══ Tier & Axis Config ═══ */
const TIERS = [
  { id:'S', label:'S', color:'#ef476f', bg:'#ef476f15' },
  { id:'A', label:'A', color:'#ffd166', bg:'#ffd16612' },
  { id:'B', label:'B', color:'#06d6a0', bg:'#06d6a010' },
  { id:'C', label:'C', color:'#118ab2', bg:'#118ab210' },
  { id:'D', label:'D', color:'#8892b0', bg:'#8892b00a' },
]
const TIER_IDS = TIERS.map(t=>t.id)

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

/* ═══ Main Component ═══ */
export default function TanaZukan() {
  const [axisIdx, setAxisIdx] = useState(0)
  const [tierMap, setTierMap] = useState(() => {
    const m = {}
    POKEMON.forEach(p => { m[p.id] = SIZE_TO_TIER[p.size] || 'B' })
    return m
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dragItem, setDragItem] = useState(null)
  const [hoverTier, setHoverTier] = useState(null)

  const axis = AXES[axisIdx]

  // VR共通検索
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return POKEMON.filter(p => {
      const hay = [p.name, p.id, p.emoji, p.type, p.habitat, p.size].join(' ').toLowerCase()
      return hay.includes(q)
    }).slice(0, 12)
  }, [searchQuery])

  // Grid data: tier × column → items
  const grid = useMemo(() => {
    const g = {}
    TIERS.forEach(t => {
      g[t.id] = {}
      axis.values.forEach(v => { g[t.id][v] = [] })
    })
    POKEMON.forEach(p => {
      const tier = tierMap[p.id] || 'B'
      const col = p[axis.key]
      if (g[tier] && g[tier][col]) g[tier][col].push(p)
    })
    return g
  }, [tierMap, axisIdx])

  // Column totals
  const colTotals = useMemo(() => {
    const t = {}
    axis.values.forEach(v => {
      t[v] = TIERS.reduce((sum, tier) => sum + (grid[tier.id]?.[v]?.length || 0), 0)
    })
    return t
  }, [grid, axisIdx])

  // Tier totals
  const tierTotals = useMemo(() => {
    const t = {}
    TIERS.forEach(tier => {
      t[tier.id] = axis.values.reduce((sum, v) => sum + (grid[tier.id]?.[v]?.length || 0), 0)
    })
    return t
  }, [grid, axisIdx])

  const cycleTier = useCallback((pid) => {
    setTierMap(prev => {
      const cur = prev[pid] || 'B'
      const idx = TIER_IDS.indexOf(cur)
      const next = TIER_IDS[(idx + 1) % TIER_IDS.length]
      return { ...prev, [pid]: next }
    })
  }, [])

  const setTier = useCallback((pid, tierId) => {
    setTierMap(prev => ({ ...prev, [pid]: tierId }))
  }, [])

  const handleSearchJump = useCallback((item) => {
    // Flash the item — just close search for now
    setSearchQuery('')
    setSearchOpen(false)
  }, [])

  // Search dim
  const searchMatchIds = useMemo(() => {
    if (!searchQuery.trim()) return null
    return new Set(searchResults.map(p => p.id))
  }, [searchQuery, searchResults])

  return (
    <div style={{
      minHeight:'100vh', background:'#0b0f1a', color:'#e4e8f0',
      fontFamily:"'Zen Kaku Gothic New','Noto Sans JP',system-ui,sans-serif",
      display:'flex', flexDirection:'column',
    }}>
      {/* ═══ Header ═══ */}
      <header style={{
        padding:'10px 16px', borderBottom:'1px solid #1e2640',
        display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
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

        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <a href="https://osakenpiro.github.io/wakkazukan/" target="_blank" rel="noreferrer"
            style={{color:'#8892b0',fontSize:11,textDecoration:'none'}}>🪐 わっかずかん</a>
          <a href="https://osakenpiro.github.io/banet-map/" target="_blank" rel="noreferrer"
            style={{color:'#8892b0',fontSize:11,textDecoration:'none'}}>🌀 バネットマップ</a>
          <span style={{fontSize:10,padding:'3px 8px',background:'#ffd166',color:'#0b0f1a',borderRadius:10,fontWeight:700}}>β</span>
        </div>
      </header>

      {/* ═══ Grid ═══ */}
      <div style={{flex:1,overflowX:'auto',padding:'8px'}}>
        <table style={{
          borderCollapse:'separate',borderSpacing:2,width:'100%',minWidth:800,
          tableLayout:'fixed',
        }}>
          {/* Column headers */}
          <thead>
            <tr>
              <th style={{width:52,padding:4}}/>
              {axis.values.map(v => {
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
            {TIERS.map(tier => (
              <tr key={tier.id}>
                {/* Tier label */}
                <td style={{
                  padding:'8px 4px',textAlign:'center',verticalAlign:'top',
                  background:tier.bg,borderRadius:6,position:'relative',
                }}
                onDragOver={e => {e.preventDefault();setHoverTier(tier.id)}}
                onDragLeave={() => setHoverTier(null)}
                onDrop={e => {
                  e.preventDefault()
                  const pid = e.dataTransfer.getData('text/plain')
                  if(pid) setTier(pid, tier.id)
                  setHoverTier(null); setDragItem(null)
                }}>
                  <div style={{
                    fontSize:24,fontWeight:900,color:tier.color,
                    lineHeight:1,marginBottom:2,
                    textShadow:`0 0 12px ${tier.color}44`,
                  }}>{tier.label}</div>
                  <div style={{fontSize:9,color:'#5a6378'}}>{tierTotals[tier.id]}</div>
                </td>
                {/* Cells */}
                {axis.values.map(v => {
                  const items = grid[tier.id]?.[v] || []
                  return (
                    <td key={v} style={{
                      padding:3,verticalAlign:'top',
                      background: hoverTier===tier.id ? tier.bg : '#0d1320',
                      borderRadius:4,minHeight:40,
                      transition:'background 0.15s',
                    }}
                    onDragOver={e => {e.preventDefault();setHoverTier(tier.id)}}
                    onDragLeave={() => setHoverTier(null)}
                    onDrop={e => {
                      e.preventDefault()
                      const pid = e.dataTransfer.getData('text/plain')
                      if(pid) setTier(pid, tier.id)
                      setHoverTier(null); setDragItem(null)
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
                              onDragEnd={() => setDragItem(null)}
                              onClick={() => cycleTier(p.id)}
                              title={`${p.name} (${p.type}) — クリックでTier変更`}
                              style={{
                                display:'flex',alignItems:'center',gap:2,
                                padding:'2px 5px',borderRadius:6,cursor:'grab',
                                background: dragItem===p.id ? '#ffd16633' : '#111827',
                                border:`1px solid ${dimmed?'#1e264033':dragItem===p.id?'#ffd166':'#1e2640'}`,
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
        display:'flex',alignItems:'center',gap:16,fontSize:10,color:'#5a6378',
      }}>
        <span>クリック → Tier変更</span>
        <span>ドラッグ → Tier移動</span>
        <span>軸切替で列が変わる</span>
        <a href="https://github.com/osakenpiro/tana-zukan" target="_blank" rel="noreferrer"
          style={{marginLeft:'auto',color:'#5a6378',textDecoration:'none'}}>GitHub</a>
      </footer>
    </div>
  )
}
