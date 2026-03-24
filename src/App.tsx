/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Map, Skull, Sparkles, Moon, Crown, Leaf, Network } from "lucide-react";

// --- Data Models based on the provided PDFs ---
const WORLD_REGIONS = [
  {
    id: "aldion",
    name: "阿爾迪恩王國",
    enName: "Aldion Kingdom",
    desc: "王權與教廷並行的「聖潔外衣」文明圈。白石、金線、彩窗與鐘聲交織出規訓與秩序的牢籠。",
    icon: <Crown className="w-6 h-6 text-amber-400" />,
    color: "from-amber-900/40 to-zinc-950"
  },
  {
    id: "mistveil",
    name: "霧嶺密林",
    enName: "Mistveil Woods",
    desc: "迷霧厚重、物種豐富的自然境域。銀霧、濕冷與苔蘚掩蓋著古老的禁忌與魔女的庇護所。",
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    color: "from-emerald-900/40 to-zinc-950"
  },
  {
    id: "oathbone",
    name: "誓骨荒",
    enName: "Oathbone Wastes",
    desc: "荒土與部落文明。崇拜動物神祉，赤土、狂風與骨飾見證著誓約與反噬的鐵律。",
    icon: <Skull className="w-6 h-6 text-red-500" />,
    color: "from-red-900/40 to-zinc-950"
  },
  {
    id: "south",
    name: "南方板塊",
    enName: "Southern Plate",
    desc: "中立貿易核心與學者避風港。海藍與星光下，星軌群島與自由城邦維持著絕對的契約精神。",
    icon: <Map className="w-6 h-6 text-blue-400" />,
    color: "from-blue-900/40 to-zinc-950"
  }
];

const CHARACTERS = [
  {
    id: "adrian",
    name: "艾德里安・瓦勒里烏斯",
    enName: "Adrian Valerius",
    title: "嗜血王權 × 神聖囚籠",
    quote: "「我愛你，所以我不會放你走；我恨你，所以我會讓你記住代價。」",
    desc: "阿爾迪恩王國的年輕國王。曾是教廷最完美的「聖潔標本」與祭品，在經歷了極致的屈辱與背叛後，他親手割開了大主教的喉嚨，將神聖的祭壇化為自己的王座。他優雅、溫柔，卻將暴力與殘忍流程化，用最溫柔的語氣施加最殘酷的刑罰。",
    tags: ["ENTJ", "病態優雅", "支配者", "翠綠金瞳"],
    image: "https://media.discordapp.net/attachments/1352178147142930486/1484550130555162644/812d2017c3bba466.png?ex=69bea28c&is=69bd510c&hm=ce4267f6f6c0276b84515c27be15271c78755f649faa5647f782c8f1a16e95cc&=&format=webp&quality=lossless&width=705&height=940", 
    accent: "text-amber-500",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/30"
  },
  {
    id: "eli",
    name: "伊萊",
    enName: "Eli",
    title: "脆弱小狗 × 被奪目天賦",
    quote: "「我不是不想回去⋯⋯我是不知道我有沒有資格回去。」",
    desc: "魔女的徒弟，聖女未被承認的私生子。童年時作為祭品被奪去雙目，在黑暗與恐懼中被魔女救贖。他擁有極高的魔力天賦，卻極度缺乏安全感與自我價值。在「聖女」的血緣勒索與「魔女」的溫柔邊界之間，他是一隻渴望被愛卻又害怕被拋棄的脆弱幼犬。",
    tags: ["INFP", "銀白短髮", "粉紫雙瞳", "依附型親密"],
    image: "https://media.discordapp.net/attachments/1352178147142930486/1484550129532014652/3aede6be66d5ef3c.png?ex=69bea28c&is=69bd510c&hm=7e7373ee079764de4d323cf7602495e69876054ef6994f51ef41913486602a50&=&format=webp&quality=lossless&width=705&height=940", 
    accent: "text-purple-400",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/30"
  },
  {
    id: "langa",
    name: "嵐牙",
    enName: "Langa",
    title: "狂野首領 × 誓約至上",
    quote: "「月亮在上，我的誓不撒手；你要走，先付代價。」",
    desc: "東方誓骨荒「月牙狼庭」的首領。在殘酷的荒土中廝殺長大，曾被偽裝的聖女重傷，後被魔女所救。他極度厭惡虛偽與謊言，崇尚力量與絕對的誓約。他是一頭未經馴化的野獸，卻也是最重承諾的守護者。只要債務未清，他便是最鋒利的刀。",
    tags: ["ESTP", "黑紅長髮", "金琥珀瞳", "野性標記"],
    image: "https://media.discordapp.net/attachments/1352178147142930486/1484550131683426354/be9338b4aa0c7886.png?ex=69bea28d&is=69bd510d&hm=96bdb8e674012576238a32d8966b2504bd7e21fe7bcb5d6591b3cf1d02c9724c&=&format=webp&quality=lossless&width=705&height=940", 
    accent: "text-red-500",
    bgAccent: "bg-red-500/10",
    borderAccent: "border-red-500/30"
  }
];

// --- Relationship Map Data ---
const NODES = [
  { id: "maiden", label: "聖女", sub: "Holy Maiden", x: 50, y: 15, color: "text-amber-400", border: "border-amber-400/50", bg: "bg-amber-950/50" },
  { id: "witch", label: "魔女", sub: "The Witch", x: 85, y: 40, color: "text-purple-400", border: "border-purple-400/50", bg: "bg-purple-950/50" },
  { id: "adrian", label: "艾德里安", sub: "Adrian", x: 15, y: 40, color: "text-emerald-500", border: "border-emerald-500/50", bg: "bg-emerald-950/30" },
  { id: "eli", label: "伊萊", sub: "Eli", x: 30, y: 85, color: "text-fuchsia-400", border: "border-fuchsia-500/50", bg: "bg-fuchsia-950/30" },
  { id: "langa", label: "嵐牙", sub: "Langa", x: 70, y: 85, color: "text-red-500", border: "border-red-500/50", bg: "bg-red-950/30" },
];

const LINKS = [
  { 
    id: "adrian-maiden", 
    source: "adrian", 
    target: "maiden", 
    label: "支配與囚禁", 
    shortDesc: "愛恨交織",
    desc: "他將她拉下神壇，用最溫柔的語氣施加最殘酷的刑罰，形成傷害與撫慰的閉環。",
    history: "艾德里安曾是教廷最完美的「聖潔標本」與獻給聖女的祭品。在經歷了極致的屈辱與背叛後，他發動叛亂，將高高在上的聖女囚禁於自己的王座之下。",
    impact: "這段關係讓艾德里安在施虐中尋找病態的掌控感，而聖女則在無盡的折磨與虛假的溫柔中逐漸崩潰，兩人的命運被仇恨與扭曲的愛意死死綁定。",
    labelPos: 0.5
  },
  { 
    id: "eli-maiden", 
    source: "eli", 
    target: "maiden", 
    label: "血緣枷鎖", 
    shortDesc: "恐懼與利用",
    desc: "她是奪走他雙目的母親，用「歸還雙目」作為籌碼，將他視為精準聽話的利刃。",
    history: "伊萊是聖女未被承認的私生子。為了掩蓋醜聞並獲取力量，聖女在伊萊童年時殘忍地奪走了他的雙目，並將他作為工具驅使。",
    impact: "這份血緣成為了伊萊內心最深的恐懼與夢魘。聖女的冷酷利用讓他極度缺乏自我價值，一生都在渴望母愛與恐懼被拋棄的矛盾中掙扎。",
    labelPos: 0.35
  },
  { 
    id: "eli-witch", 
    source: "eli", 
    target: "witch", 
    label: "救贖與依附", 
    shortDesc: "師徒",
    desc: "她在黑暗中給予他安寧與界線。他極度渴望這份溫暖，卻又自卑地害怕玷污她的生活。",
    history: "在伊萊失去雙目、最絕望的時刻，魔女將他從黑暗中救出，收留他為徒，並教導他控制龐大的魔力。",
    impact: "魔女成為了伊萊生命中唯一的光芒。他對魔女產生了極度病態的依附心理，願意為她做任何事，卻又因為自卑而不敢跨越師徒的界線。",
    labelPos: 0.65
  },
  { 
    id: "langa-maiden", 
    source: "langa", 
    target: "maiden", 
    label: "血仇", 
    shortDesc: "偽善的刺客",
    desc: "她曾偽裝成貢品混入部落重傷他。他極度厭惡這份用神聖包裝的虛偽與毒刃。",
    history: "聖女為了擴張教廷的勢力，曾偽裝成柔弱的貢品潛入月牙狼庭，在嵐牙毫無防備時給予他致命一擊，差點導致狼庭覆滅。",
    impact: "這次背叛讓嵐牙徹底看清了教廷的虛偽。他對聖女充滿了極致的殺意與厭惡，發誓要撕碎她那層神聖虛偽的面具。",
    labelPos: 0.65
  },
  { 
    id: "langa-witch", 
    source: "langa", 
    target: "witch", 
    label: "救命債", 
    shortDesc: "絕對的誓約",
    desc: "她救了他的命，他以血契為代價。他不輕易動手，但為了還債，他會成為她最鋒利的刀。",
    history: "在嵐牙被聖女重傷瀕死之際，是魔女出手相救。為了報答這份救命之恩，嵐牙以狼族的古老血契向魔女宣誓效忠。",
    impact: "這份誓約成為了嵐牙行動的最高準則。只要魔女一聲令下，他隨時準備為她赴湯蹈火，展現出野獸最絕對的忠誠與守護。",
    labelPos: 0.35
  },
];

export default function App() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getLinkState = (link: typeof LINKS[0]) => {
    if (!activeNode && !activeLink) return { active: false, dimmed: false };
    if (activeLink === link.id) return { active: true, dimmed: false };
    if (activeNode && (link.source === activeNode || link.target === activeNode)) return { active: true, dimmed: false };
    return { active: false, dimmed: true };
  };

  const getNodeState = (nodeId: string) => {
    if (!activeNode && !activeLink) return { active: false, dimmed: false };
    if (activeNode === nodeId) return { active: true, dimmed: false };
    if (activeNode) {
      const isConnected = LINKS.some(l => (l.source === activeNode && l.target === nodeId) || (l.target === activeNode && l.source === nodeId));
      if (isConnected) return { active: true, dimmed: false };
    }
    if (activeLink) {
      const link = LINKS.find(l => l.id === activeLink);
      if (link?.source === nodeId || link?.target === nodeId) return { active: true, dimmed: false };
    }
    return { active: false, dimmed: true };
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-serif selection:bg-amber-900/50 selection:text-amber-100 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="text-xl font-bold tracking-widest text-zinc-100">MORANA</div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest text-zinc-400">
          <button onClick={() => scrollTo('world')} className="hover:text-amber-400 transition-colors">WORLD</button>
          <button onClick={() => scrollTo('paths')} className="hover:text-amber-400 transition-colors">PATHS</button>
          <button onClick={() => scrollTo('relations')} className="hover:text-amber-400 transition-colors">RELATIONS</button>
          <button onClick={() => scrollTo('characters')} className="hover:text-amber-400 transition-colors">CHARACTERS</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,39,42,0.4)_0%,rgba(9,9,11,1)_70%)]" />
          <img 
            src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2000&auto=format&fit=crop" 
            alt="Dark Forest Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 mb-8 rounded-full border border-zinc-700/50 p-2 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
             <img 
               src="./emblem.png" 
               alt="Morana Emblem" 
               className="w-full h-full object-cover rounded-full opacity-90"
               referrerPolicy="no-referrer"
             />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-100 tracking-widest mb-4 drop-shadow-lg">
            莫拉納物語
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 tracking-[0.3em] uppercase mb-12 font-light">
            Morana Story
          </p>
          
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-12" />
          
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed font-light">
            在光輝的聖壇下掩埋著腐朽的謊言，在迷霧的深處隱藏著救贖的微光。
            <br/>這是一場關於背叛、誓約與極致愛恨的黑暗奇幻譚。
          </p>

          <motion.button 
            onClick={() => scrollTo('world')}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-24 text-zinc-500 hover:text-amber-400 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </section>

      {/* World Section */}
      <section id="world" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl text-zinc-100 tracking-widest mb-4">世界資訊</h2>
          <p className="text-zinc-500 tracking-widest uppercase text-sm">The Continent of Morana</p>
          <div className="h-px w-12 bg-amber-500/50 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WORLD_REGIONS.map((region, idx) => (
            <motion.div 
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`p-8 rounded-2xl border border-zinc-800/50 bg-gradient-to-br ${region.color} backdrop-blur-sm hover:border-zinc-600/50 transition-colors group`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-zinc-900/80 border border-zinc-700/50 group-hover:scale-110 transition-transform">
                  {region.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 tracking-wider">{region.name}</h3>
                  <p className="text-xs text-zinc-500 tracking-widest uppercase">{region.enName}</p>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {region.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Player Paths Section */}
      <section id="paths" className="py-32 bg-zinc-900/30 border-y border-zinc-800/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl text-zinc-100 tracking-widest mb-4">初始命途</h2>
            <p className="text-zinc-500 tracking-widest uppercase text-sm">Choose Your Path</p>
            <div className="h-px w-12 bg-amber-500/50 mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Holy Maiden Path */}
            <div className="relative p-10 rounded-3xl border border-amber-900/30 bg-zinc-950/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
              <Sparkles className="w-8 h-8 text-amber-500 mb-6" />
              <h3 className="text-3xl text-zinc-100 mb-2 tracking-widest">聖女</h3>
              <p className="text-amber-500/80 text-sm tracking-widest mb-8">The Holy Maiden</p>
              
              <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
                <div>
                  <strong className="text-zinc-300 block mb-1">表面身分</strong>
                  阿爾迪恩王國的聖女，光輝與純潔的化身。
                </div>
                <div>
                  <strong className="text-zinc-300 block mb-1">實際身分</strong>
                  惡魔的僕從、操弄人心的惡女。
                </div>
                <div className="pt-4 border-t border-zinc-800/50">
                  <strong className="text-amber-500 block mb-2">主要任務</strong>
                  攻略艾德里安，避免死亡結局。
                </div>
              </div>
            </div>

            {/* Witch Path */}
            <div className="relative p-10 rounded-3xl border border-purple-900/30 bg-zinc-950/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
              <Moon className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-3xl text-zinc-100 mb-2 tracking-widest">魔女</h3>
              <p className="text-purple-400/80 text-sm tracking-widest mb-8">The Witch</p>
              
              <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
                <div>
                  <strong className="text-zinc-300 block mb-1">表面身分</strong>
                  住在北方森林的魔女，世俗害怕及厭惡的對象。
                </div>
                <div>
                  <strong className="text-zinc-300 block mb-1">實際身分</strong>
                  比聖女還要仁慈，卻也不主動多管閒事，守護著森林的秩序。
                </div>
                <div className="pt-4 border-t border-zinc-800/50">
                  <strong className="text-purple-400 block mb-2">主要任務</strong>
                  撫養伊萊，攻略他或是被他攻略。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relationships Section */}
      <section id="relations" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <Network className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-3xl md:text-5xl text-zinc-100 tracking-widest mb-4">角色關係網</h2>
          <p className="text-zinc-500 tracking-widest uppercase text-sm">Character Relationships</p>
          <div className="h-px w-12 bg-amber-500/50 mx-auto mt-8" />
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          <div className="relative w-full aspect-square md:aspect-[16/10] bg-zinc-900/20 rounded-3xl border border-zinc-800/50 p-4 md:p-8 overflow-hidden shadow-2xl">
            {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {LINKS.map(link => {
              const sourceNode = NODES.find(n => n.id === link.source)!;
              const targetNode = NODES.find(n => n.id === link.target)!;
              const { active, dimmed } = getLinkState(link);

              return (
                <g key={link.id}>
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    className={`transition-all duration-500 ${active ? 'stroke-zinc-400' : 'stroke-zinc-700'} ${dimmed ? 'opacity-10' : 'opacity-60'}`}
                    strokeWidth={active ? 3 : 1.5}
                    strokeDasharray={active ? "none" : "4 4"}
                  />
                  {/* Invisible thicker line for easier hovering */}
                  <line
                    x1={`${sourceNode.x}%`}
                    y1={`${sourceNode.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    className="stroke-transparent cursor-pointer pointer-events-auto"
                    strokeWidth={40}
                    onMouseEnter={() => setActiveLink(link.id)}
                    onMouseLeave={() => setActiveLink(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Link Labels */}
          {LINKS.map(link => {
            const sourceNode = NODES.find(n => n.id === link.source)!;
            const targetNode = NODES.find(n => n.id === link.target)!;
            const { active, dimmed } = getLinkState(link);
            const x = sourceNode.x + (targetNode.x - sourceNode.x) * link.labelPos;
            const y = sourceNode.y + (targetNode.y - sourceNode.y) * link.labelPos;

            return (
              <div
                key={`label-${link.id}`}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-500 ${dimmed ? 'opacity-10 scale-95' : 'opacity-100 scale-100'} ${active ? 'z-30 scale-110' : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => setActiveLink(link.id)}
                onMouseLeave={() => setActiveLink(null)}
              >
                <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg border backdrop-blur-md text-center shadow-lg ${active ? 'bg-zinc-800/90 border-zinc-500' : 'bg-zinc-900/70 border-zinc-700/50'}`}>
                  <div className="text-[10px] md:text-sm font-bold text-zinc-200 whitespace-nowrap">{link.label}</div>
                  <div className="text-[8px] md:text-[10px] text-zinc-400 whitespace-nowrap">{link.shortDesc}</div>
                </div>
              </div>
            );
          })}

          {/* Nodes */}
          {NODES.map(node => {
            const { active, dimmed } = getNodeState(node.id);

            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${dimmed ? 'opacity-20 scale-95' : 'opacity-100 scale-100'} ${active ? 'z-20 scale-110' : 'z-10'}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`flex flex-col items-center justify-center w-16 h-16 md:w-28 md:h-28 rounded-full border-2 backdrop-blur-md ${node.bg} ${node.border} shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-colors`}>
                  <span className={`text-xs md:text-lg font-bold tracking-widest ${node.color}`}>{node.label}</span>
                  <span className="text-[8px] md:text-xs text-zinc-400 tracking-wider mt-1">{node.sub}</span>
                </div>
              </div>
            );
          })}

          </div>

          {/* Dynamic Description Box */}
          <div className="w-full bg-zinc-950/95 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 text-left min-h-[180px] flex flex-col justify-center transition-opacity duration-300 shadow-2xl overflow-y-auto max-h-[280px] z-40">
            {activeLink ? (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h4 className="text-zinc-100 font-bold tracking-widest text-lg text-center mb-4">{LINKS.find(l => l.id === activeLink)?.label} <span className="text-zinc-500 text-sm font-normal ml-2">{LINKS.find(l => l.id === activeLink)?.shortDesc}</span></h4>
                <p className="text-zinc-300 text-sm leading-relaxed"><strong className="text-zinc-500 mr-2">關係：</strong>{LINKS.find(l => l.id === activeLink)?.desc}</p>
                <p className="text-zinc-400 text-sm leading-relaxed"><strong className="text-zinc-500 mr-2">過往：</strong>{LINKS.find(l => l.id === activeLink)?.history}</p>
                <p className="text-zinc-400 text-sm leading-relaxed"><strong className="text-zinc-500 mr-2">影響：</strong>{LINKS.find(l => l.id === activeLink)?.impact}</p>
              </motion.div>
            ) : activeNode ? (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <h4 className={`font-bold tracking-widest mb-3 text-lg ${NODES.find(n => n.id === activeNode)?.color}`}>{NODES.find(n => n.id === activeNode)?.label}</h4>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {activeNode === 'maiden' && "阿爾迪恩王國的聖女。光輝的化身，卻也是操弄人心的惡女。"}
                  {activeNode === 'witch' && "霧嶺密林的魔女。守護著森林的秩序，給予流亡者庇護。"}
                  {activeNode === 'adrian' && "阿爾迪恩國王。曾是聖女的祭品，如今是將她囚禁的暴君。"}
                  {activeNode === 'eli' && "魔女的徒弟，聖女的私生子。在兩股力量間拉扯的脆弱靈魂。"}
                  {activeNode === 'langa' && "月牙狼庭首領。極度厭惡聖女的虛偽，因救命之恩受制於魔女。"}
                </p>
              </motion.div>
            ) : (
              <div className="text-zinc-500 text-sm tracking-widest flex flex-col items-center gap-2 justify-center h-full">
                <Network className="w-5 h-5 opacity-50" />
                懸停於角色或關係標籤上，查看詳細過往與影響
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl text-zinc-100 tracking-widest mb-4">登場角色</h2>
          <p className="text-zinc-500 tracking-widest uppercase text-sm">Main Characters</p>
          <div className="h-px w-12 bg-amber-500/50 mx-auto mt-8" />
        </div>

        <div className="space-y-32">
          {CHARACTERS.map((char, idx) => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              {/* Character Image */}
              <div className="w-full lg:w-1/2 relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-80`} />
                <div className={`absolute inset-0 border border-white/10 rounded-3xl z-20 transition-colors duration-500 group-hover:${char.borderAccent}`} />
                <img 
                  src={char.image} 
                  alt={char.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Character Info */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <div className={`inline-flex items-center px-3 py-1 rounded-full ${char.bgAccent} ${char.accent} text-xs tracking-widest uppercase w-fit mb-6 border ${char.borderAccent}`}>
                  {char.title}
                </div>
                
                <h3 className="text-4xl md:text-5xl text-zinc-100 tracking-widest mb-2">{char.name}</h3>
                <p className="text-zinc-500 tracking-widest uppercase text-sm mb-8">{char.enName}</p>
                
                <blockquote className={`text-xl md:text-2xl ${char.accent} italic font-light leading-relaxed mb-8 border-l-2 ${char.borderAccent} pl-6`}>
                  {char.quote}
                </blockquote>
                
                <p className="text-zinc-400 leading-loose text-sm md:text-base mb-10 text-justify">
                  {char.desc}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {char.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-md bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center relative z-10 bg-zinc-950">
        <div className="w-12 h-12 mx-auto mb-6 opacity-60">
          <img 
            src="./emblem.png" 
            alt="Morana Emblem" 
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-zinc-600 text-sm tracking-widest uppercase">
          © 2026 Morana Story. All rights reserved.
        </p>
        <p className="text-zinc-700 text-xs mt-4 tracking-wider">
          A Dark Fantasy Visual Novel Experience
        </p>
      </footer>
    </div>
  );
}
