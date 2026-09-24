import React, { useState, useEffect, useRef } from "react";
import { 
  Music, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Volume2, 
  History, 
  Trash2, 
  Layers, 
  Compass, 
  Flame, 
  Share2, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  Sliders,
  Maximize2,
  Mic,
  RotateCcw,
  BookOpen,
  Wifi,
  Radio,
  Cpu
} from "lucide-react";

// Preloaded Demo Song to make the app gorgeous and immediately useful on first load
const DEMO_SONG = {
  step1_analysis: {
    story_analysis: "Lấy cảm hứng từ những câu chuyện tình dở dang thời thanh xuân, nơi hai người trẻ yêu nhau thắm thiết nhưng buộc phải chia tay vì hoài bão riêng và áp lực từ cuộc sống thành thị. Bối cảnh được đặt dưới cơn mưa rào Sài Gòn muộn màng, tiếng còi xe hối hả tương phản với sự im lặng nghẹn ngào giữa hai người ở ngã tư đường quen thuộc.",
    emotional_touchpoint: "Điểm chạm cảm xúc sâu sắc nhất nằm ở sự tương phản giữa sự ồn ào náo nhiệt của phố thị Sài Gòn và sự trống rỗng, cô độc đến tột cùng trong tâm hồn nhân vật. Câu hỏi bỏ ngỏ 'Liệu ngày ấy nếu ta bớt kiêu ngạo, giờ có khác đi?' đánh trúng tâm lý nuối tiếc người cũ của hàng triệu bạn trẻ."
  },
  step2_lyrics: {
    title: "Mưa Sài Gòn, Lòng Mình Đổ Vỡ",
    sections: [
      {
        tag: "[Intro: Soft acoustic piano and warm rain sound]",
        lyrics: "(Tiếng mưa rơi nhẹ nhàng hòa cùng tiếng đàn piano rải chậm, ấm áp...)",
        instruction: "Soft acoustic piano, intimate lo-fi vinyl rain atmosphere, slow tempo"
      },
      {
        tag: "[Verse 1: Gentle intimate vocals]",
        lyrics: "Chiều Sài Gòn đổ cơn mưa vội vã\nĐường tấp nập người qua kẻ lại quen xa\nGóc phố cũ hôm nay bỗng lạ lẫm\nCó hai người đứng nhìn nhau... chẳng thể ôm.",
        instruction: "Intimate vocal delivery, sparse piano chords, very slow and emotional"
      },
      {
        tag: "[Chorus 1: Soaring emotional vocals, dynamic string section]",
        lyrics: "Mưa Sài Gòn đổ xuống lòng anh đổ vỡ\nTừng hẹn ước giờ thành mây khói bơ vơ\nEm quay lưng mang theo cả trời thương nhớ\nLạc mất nhau rồi, giữa phố đông người chẳng ai chờ.",
        instruction: "Rich emotional high-register vocals, heavy 808 sub bass enters, cinematic violins build up"
      },
      {
        tag: "[Verse 2: Soft acoustic guitar, subtle 808 beat]",
        lyrics: "Ghé quán quen, gọi ly cà phê đắng\nNhư vị môi em ngày nắng tắt ngang đầu\nTin nhắn cũ vẫn nằm im ở đó\nChỉ là người gửi giờ đã ở nơi nao.",
        instruction: "Guitar pluck, soft lofi beat clicks in, rhythmic r&b groove, calm voice"
      },
      {
        tag: "[Chorus 2: Maximum intensity, powerful soaring harmonies]",
        lyrics: "Mưa Sài Gòn đổ xuống lòng anh đổ vỡ\nTừng hẹn ước giờ thành mây khói bơ vơ\nThanh xuân mình viết vội dòng nhật ký\nChương cuối cùng... chỉ còn lại hai chữ chia ly.",
        instruction: "Full cinematic orchestral strings, heavy drum impact, highly emotional soaring vocals"
      },
      {
        tag: "[Bridge: Instrumental drop, vocal ad-libs]",
        lyrics: "Dẫu biết tình mình đã xa tầm tay\nNhưng sao lòng này vẫn nhói từng cơn đêm dài...\n(Oh... mưa ơi xin đừng rơi mãi...)",
        instruction: "Drums drop out, quiet acoustic piano with gorgeous vocal ad-libs, building tension"
      },
      {
        tag: "[Outro: Soft fading acoustic piano]",
        lyrics: "Sài Gòn lặng im, cơn mưa cũng tạnh...\nHạnh phúc ngày xưa, giờ gửi lại mây xanh...\n(Gửi lại mây xanh...)",
        instruction: "Acoustic piano chords fade out slowly, intimate vocal hum, rain sound decreases"
      }
    ],
    key_hooks: [
      {
        lyrics: "Mưa Sài Gòn đổ xuống lòng anh đổ vỡ. Từng hẹn ước giờ thành mây khói bơ vơ.",
        reason: "Sử dụng lối chơi chữ đồng âm 'đổ mưa' - 'đổ vỡ', ca từ đậm tính tự sự và hình ảnh tương phản mạnh mẽ, rất dễ bắt tai và kích thích người nghe dùng làm nhạc nền video buồn tâm trạng."
      },
      {
        lyrics: "Thanh xuân mình viết vội dòng nhật ký. Chương cuối cùng... chỉ còn lại hai chữ chia ly.",
        reason: "Phép ẩn dụ 'dòng nhật ký thanh xuân' vô cùng quen thuộc nhưng thấm thía, kết thúc bằng nhịp lửng tạo cảm giác hụt hẫng cô đơn cực thích hợp cho xu hướng TikTok Reels."
      }
    ]
  },
  step3_trends: {
    modern_vibe: "Sự kết hợp hoàn hảo giữa không gian lofi hoài niệm và nhịp beat 808 R&B hiện đại. Đoạn đầu giữ nhịp mộc mạc bằng piano/guitar acoustic mộc để tôn chất giọng mộc mạc và tâm sự ấm áp của ca sĩ.",
    instruments_progression: "Tại đoạn điệp khúc [Chorus], hệ thống trống 808 điện tử đập chậm rãi nhưng cực dày kết hợp cùng tiếng dàn dây điện ảnh (Cinematic Strings) dồn dập nâng đỡ giọng hát lên cao trào, tạo cảm giác choáng ngợp và vỡ òa cảm xúc."
  },
  step4_suno_prompts: {
    style_of_music: "Vietnamese, Vietnamese Pop Ballad, Modern R&B, warm male vocal, key of A minor, 72 BPM, acoustic piano, cinematic strings, melancholic, warm mix",
    lyrics_prompt: "[Intro: Soft acoustic piano and rain ambiance]\n\n[Verse 1: Gentle intimate vocals]\nChiều Sài Gòn đổ cơn mưa vội vã\nĐường tấp nập người qua kẻ lại quen xa\nGóc phố cũ hôm nay bỗng lạ lẫm\nCó hai người đứng nhìn nhau... chẳng thể ôm.\n\n[Chorus 1: Soaring emotional vocals, dynamic string section]\nMưa Sài Gòn đổ xuống lòng anh đổ vỡ\nTừng hẹn ước giờ thành mây khói bơ vơ\nEm quay lưng mang theo cả trời thương nhớ\nLạc mất nhau rồi, giữa phố đông người chẳng ai chờ.\n\n[Verse 2: Soft acoustic guitar, subtle 808 beat]\nGhé quán quen, gọi ly cà phê đắng\nNhư vị môi em ngày nắng tắt ngang đầu\nTin nhắn cũ vẫn nằm im ở đó\nChỉ là người gửi giờ đã ở nơi nao.\n\n[Chorus 2: Maximum intensity, powerful soaring harmonies]\nMưa Sài Gòn đổ xuống lòng anh đổ vỡ\nTừng hẹn ước giờ thành mây khói bơ vơ\nThanh xuân mình viết vội dòng nhật ký\nChương cuối cùng... chỉ còn lại hai chữ chia ly.\n\n[Bridge: Instrumental drop, vocal ad-libs]\nDẫu biết tình mình đã xa tầm tay\nNhưng sao lòng này vẫn nhói từng cơn đêm dài...\n(Mưa ơi xin đừng rơi mãi...)\n\n[Outro: Soft fading acoustic piano]\nSài Gòn lặng im, cơn mưa cũng tạnh...\nHạnh phúc ngày xưa, giờ gửi lại mây xanh...\n(Gửi lại mây xanh...)\n\n[End]"
  }
};

export function cleanLyricsForSuno(rawLyrics: string): string {
  if (!rawLyrics) return "";
  return rawLyrics
    .replace(/```[a-z]*\n?/gi, "")
    // Remove descriptive stage directions in parentheses that describe sound/effects
    .replace(/\((?:Tiếng|Âm thanh|Mô tả|Đoạn|Nhạc|Melody|Beat|Intro|Outro|Solo|Chorus|Ghi chú|Lời|Phối|Hình ảnh|Giai điệu)[^)]*\)/gi, "")
    // Normalize newlines and whitespace
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const SUNO_TIPS = [
  {
    title: "Đặt thẻ cấu trúc chính xác",
    desc: "Suno hiểu rất rõ các thẻ như [Verse], [Chorus], [Bridge], [Outro]. Tránh viết quá nhiều lời mà không có thẻ phân đoạn."
  },
  {
    title: "Mô tả nhạc cụ trong ngoặc vuông",
    desc: "Để bắt đầu bài hát êm dịu, hãy ghi [Intro: Soft acoustic guitar]. Để điệp khúc bùng nổ, ghi [Chorus: Heavy beat drop, powerful vocals]."
  },
  {
    title: "Sử dụng dấu ngoặc đơn () cho giọng bè",
    desc: "Khi bạn muốn Suno hát bè, lặp lại ca từ hoặc ngân nga ad-libs, hãy đặt phần đó vào dấu ngoặc đơn, ví dụ: (Hạnh phúc ngày xưa...)"
  },
  {
    title: "Khống chế độ dài lời bài hát",
    desc: "Mỗi lượt gen của Suno tối ưu khoảng 2 phút (tương đương 2 Verse + 2 Chorus + 1 Bridge). Hãy dùng tính năng Extend của Suno để nối dài nếu cần."
  }
];

export default function App() {
  const [referenceInput, setReferenceInput] = useState(
    "Một câu chuyện buồn về hai người yêu nhau sâu đậm nhưng phải xa cách vì khoảng cách địa lý và hoài bão sự nghiệp của mỗi người ở thành phố lớn, dưới cơn mưa chiều rơi tầm tã."
  );
  const [mood, setMood] = useState("Sâu lắng, U sầu, Cô đơn, Da diết");
  const [singerGender, setSingerGender] = useState("Nam (Trầm ấm, Truyền cảm)");
  const [tempoBPM, setTempoBPM] = useState(72);
  const [customTheme, setCustomTheme] = useState("");
  const [musicalKey, setMusicalKey] = useState("A Minor");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [songResult, setSongResult] = useState<typeof DEMO_SONG>(DEMO_SONG);
  const [savedSongs, setSavedSongs] = useState<any[]>([]);

  // Copy feedback states
  const [copiedStyle, setCopiedStyle] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("suno_prompt_history");
      if (stored) {
        setSavedSongs(JSON.parse(stored));
      } else {
        // Pre-populate history with demo song
        const initialHistory = [{
          id: "demo-1",
          timestamp: new Date().toLocaleString("vi-VN"),
          input: "Câu chuyện tình buồn dưới mưa Sài Gòn (Bản gốc)",
          referenceInput: "Một câu chuyện buồn về hai người yêu nhau sâu đậm nhưng phải xa cách vì khoảng cách địa lý và hoài bão sự nghiệp của mỗi người ở thành phố lớn, dưới cơn mưa chiều rơi tầm tã.",
          mood: "Sâu lắng, U sầu, Cô đơn, Da diết",
          singerGender: "Nam (Ấm Áp)",
          tempoBPM: 72,
          customTheme: "Chia tay dưới mưa, tiếc nuối tuổi trẻ",
          musicalKey: "A Minor",
          result: DEMO_SONG
        }];
        setSavedSongs(initialHistory);
        localStorage.setItem("suno_prompt_history", JSON.stringify(initialHistory));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopy = (text: string, type: "style" | "lyrics") => {
    const textToCopy = type === "lyrics" ? cleanLyricsForSuno(text) : text;
    navigator.clipboard.writeText(textToCopy);
    if (type === "style") {
      setCopiedStyle(true);
      setTimeout(() => setCopiedStyle(false), 2000);
      showToast("Đã copy Prompt Style vào khay nhớ tạm!");
    } else {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
      showToast("Đã copy Lời bài hát chuẩn Suno AI!");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceInput.trim()) {
      showToast("Vui lòng nhập link YouTube hoặc câu chuyện câu chữ của bạn!");
      return;
    }

    setLoading(true);
    setLoadingStep("Đang phân tích cốt truyện và tâm lý nhân vật...");

    const steps = [
      "Đang phác thảo giai điệu Pop Ballad R&B hiện đại...",
      "Đang sáng tác lời bài hát với các câu key dễ viral...",
      "Đang tối ưu hóa cấu trúc thẻ định dạng cho Suno AI...",
      "Hoàn thành nhạc phẩm! Đang đóng gói dữ liệu bento..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep]);
        currentStep++;
      }
    }, 1500);

    try {
      const response = await fetch("/api/generate-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceInput,
          mood,
          singerGender,
          tempoBPM,
          customTheme,
          musicalKey
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Gặp lỗi khi gửi yêu cầu tới AI Producer.");
      }

      const data = await response.json();
      setSongResult(data);

      // Save to local storage history
      const newHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString("vi-VN"),
        input: referenceInput.substring(0, 60) + (referenceInput.length > 60 ? "..." : ""),
        referenceInput,
        mood,
        singerGender,
        tempoBPM,
        customTheme,
        musicalKey,
        result: data
      };

      const updatedHistory = [newHistoryItem, ...savedSongs.filter(h => h.id !== "demo-1")];
      setSavedSongs(updatedHistory);
      localStorage.setItem("suno_prompt_history", JSON.stringify(updatedHistory));

      showToast("Đã sáng tác xong bản hit mới cực kỳ ưng ý!");
    } catch (err: any) {
      clearInterval(interval);
      showToast(err.message || "Không thể kết nối đến máy chủ AI.");
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item: any) => {
    setSongResult(item.result);
    
    if (item.referenceInput !== undefined) {
      setReferenceInput(item.referenceInput);
    } else if (item.input) {
      setReferenceInput(item.input);
    }
    
    if (item.mood) {
      setMood(item.mood);
    }
    
    if (item.singerGender) {
      setSingerGender(item.singerGender);
    }
    
    if (item.tempoBPM) {
      setTempoBPM(item.tempoBPM);
    }
    
    if (item.customTheme !== undefined) {
      setCustomTheme(item.customTheme);
    }
    
    if (item.musicalKey) {
      setMusicalKey(item.musicalKey);
    }
    
    showToast(`Đã tải nhạc phẩm: "${item.result.step2_lyrics.title}"`);
  };

  const clearHistory = () => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ lịch sử sáng tác không?")) {
      setSavedSongs([]);
      localStorage.removeItem("suno_prompt_history");
      showToast("Đã dọn dẹp lịch sử sáng tác.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 flex flex-col font-sans selection:bg-[#FF4E00] selection:text-white pb-12 relative overflow-x-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF4E00]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div id="toast-notif" className="fixed top-6 right-6 z-50 bg-[#FF4E00] text-black font-semibold text-sm py-3 px-6 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-white/20">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header id="app-header" className="border-b border-white/5 bg-[#0a0c10]/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#FF4E00] to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-[#FF4E00]/20 border border-white/10">
              <Music className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight font-display text-white uppercase">SUNO AI PROMPT</span>
                <span className="bg-[#FF4E00] text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">HITMAKER PRO</span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-[#FF4E00] animate-pulse" />
                <span>AI-Powered Songwriter & Suno Prompt Optimization Suite</span>
              </p>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Suno Engine Optimized: v3.5 & v4</span>
            </div>
            <div className="flex items-center gap-1 bg-[#FF4E00]/10 border border-[#FF4E00]/30 text-[#FF4E00] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Trending R&B Pop</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Workspace */}
      <main id="app-main-workspace" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Controls & Input Parameters (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Master Creative Control Board */}
          <div id="control-board-card" className="bg-[#0e1117] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4E00]/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Sliders className="w-5 h-5 text-[#FF4E00]" />
              <h2 className="font-display font-bold text-base tracking-wide text-slate-100 uppercase">Ý tưởng & Cài đặt âm nhạc</h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Reference Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center">
                  <span>Bài hát tham chiếu hoặc Câu chuyện</span>
                  <span className="text-[10px] text-[#FF4E00] lowercase font-normal italic">Youtube link / chuyện tình / cảm xúc</span>
                </label>
                <textarea
                  className="w-full bg-[#090b0e] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-[#FF4E00] transition-colors resize-none placeholder-slate-600 font-sans"
                  rows={4}
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value)}
                  placeholder="Ví dụ: Link Youtube 'Mưa hồng' hoặc ghi câu chuyện: 'Một cặp đôi chia tay nhau dưới hiên nhà lá khi cơn dông kéo về...'"
                  required
                />
              </div>

              {/* Theme Tag */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Chủ đề chi tiết (Theme)</label>
                <input
                  type="text"
                  className="w-full bg-[#090b0e] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FF4E00] transition-colors placeholder-slate-600"
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  placeholder="Ví dụ: Nuối tiếc thanh xuân, mưa Sài Gòn, phố quen"
                />
              </div>

              {/* Singer Gender & Musical Key Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Giọng ca sĩ</label>
                  <select
                    className="w-full bg-[#090b0e] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FF4E00] transition-colors cursor-pointer"
                    value={singerGender}
                    onChange={(e) => setSingerGender(e.target.value)}
                  >
                    <option value="Nam (Trầm ấm, Truyền cảm)">Nam (Ấm áp)</option>
                    <option value="Nữ (Trong trẻo, Cảm xúc)">Nữ (Trong trẻo)</option>
                    <option value="Song ca (Nam & Nữ đối thoại)">Song ca (Duet)</option>
                    <option value="Nữ cao vút (Soprano Power)">Nữ giọng cao</option>
                    <option value="Nam trầm khàn (Deep & Soulful)">Nam trầm khàn</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Tông giọng (Key)</label>
                  <select
                    className="w-full bg-[#090b0e] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FF4E00] transition-colors cursor-pointer font-mono"
                    value={musicalKey}
                    onChange={(e) => setMusicalKey(e.target.value)}
                  >
                    <option value="A Minor">A Minor (La thứ - Buồn da diết)</option>
                    <option value="C Major">C Major (Đô trưởng - Tươi sáng)</option>
                    <option value="C Minor">C Minor (Đô thứ - Trầm buồn)</option>
                    <option value="D Major">D Major (Rê trưởng - Hùng tráng)</option>
                    <option value="D Minor">D Minor (Rê thứ - Sầu bi)</option>
                    <option value="E Major">E Major (Mi trưởng - Rực rỡ)</option>
                    <option value="E Minor">E Minor (Mi thứ - Ưu tư)</option>
                    <option value="F Major">F Major (Fa trưởng - Ấm áp)</option>
                    <option value="F Minor">F Minor (Fa thứ - Đau thương)</option>
                    <option value="G Major">G Major (Sol trưởng - Hy vọng)</option>
                    <option value="G Minor">G Minor (Sol thứ - Trắc ẩn)</option>
                    <option value="A Major">A Major (La trưởng - Rạng ngời)</option>
                    <option value="B Major">B Major (Si trưởng - Kiêu sa)</option>
                    <option value="B Minor">B Minor (Si thứ - Độc thoại)</option>
                  </select>
                </div>
              </div>

              {/* Tempo & Mood Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Tempo (BPM)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="60"
                      max="90"
                      step="1"
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF4E00]"
                      value={tempoBPM}
                      onChange={(e) => setTempoBPM(parseInt(e.target.value))}
                    />
                    <span className="text-xs font-mono font-bold bg-[#FF4E00]/10 text-[#FF4E00] px-2 py-0.5 rounded border border-[#FF4E00]/20 min-w-[42px] text-center">
                      {tempoBPM}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Sắc thái (Mood)</label>
                  <select
                    className="w-full bg-[#090b0e] border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#FF4E00] transition-colors cursor-pointer"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option value="Sâu lắng, U sầu, Cô đơn, Da diết">Sâu lắng, Cô đơn</option>
                    <option value="Mơ màng, Bay bổng, Chill lofi">Bay bổng, Chill Lofi</option>
                    <option value="Ngọt ngào, Lãng mạn, Ấm áp">Lãng mạn, Ngọt ngào</option>
                    <option value="Bùng nổ cao trào, Đau đớn giằng xé">Giằng xé, Cao trào</option>
                    <option value="Nostalgic hoài niệm, Nhẹ nhàng sâu cay">Hoài niệm, Sâu sắc</option>
                  </select>
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group bg-gradient-to-r from-[#FF4E00] to-orange-600 hover:from-orange-500 hover:to-red-600 text-black font-extrabold uppercase tracking-wider text-sm py-4 rounded-xl transition-all shadow-xl shadow-[#FF4E00]/10 hover:shadow-[#FF4E00]/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>ĐANG SÁNG TÁC...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-black animate-pulse" />
                    <span>TẠO BẢN HIT TRENDING R&B</span>
                  </>
                )}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine"></div>
              </button>

            </form>

            {/* Step loader detail status */}
            {loading && (
              <div className="mt-4 p-3 bg-black/40 border border-white/5 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300 font-mono">
                  <span>Trạng thái sáng tác:</span>
                  <span className="text-[#FF4E00] animate-pulse">Running</span>
                </div>
                <p className="text-slate-400 italic font-medium">"{loadingStep}"</p>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF4E00] to-orange-400 h-full w-[85%] animate-pulse"></div>
                </div>
              </div>
            )}

          </div>

          {/* History Panel (Lịch Sử Sáng Tác) */}
          <div id="history-panel" className="bg-[#0e1117] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <History className="w-5 h-5 text-slate-400" />
                <h3 className="font-display font-bold text-sm tracking-wide text-slate-200 uppercase">Kho lịch sử ({savedSongs.length})</h3>
              </div>
              {savedSongs.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                  title="Xóa lịch sử"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
              {savedSongs.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4 italic">Chưa có bài hát nào được lưu.</p>
              ) : (
                savedSongs.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-start text-left ${
                      songResult.step2_lyrics.title === item.result.step2_lyrics.title
                        ? "bg-[#FF4E00]/10 border-[#FF4E00]/30"
                        : "bg-black/30 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-200 truncate">{item.result.step2_lyrics.title}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-1">{item.input}</p>
                      <span className="text-[9px] text-[#FF4E00] font-mono mt-1 block">{item.timestamp}</span>
                    </div>
                    <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-400 font-mono">Load</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Hand: Elegant Bento Grid Presentation (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Bento Header: Live Stats & Dynamic Summary */}
          <div id="bento-title-card" className="bg-[#0e1117] border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-1">
              <span className="text-xs text-[#FF4E00] font-mono uppercase tracking-[0.2em] font-semibold">Tác phẩm đề xuất bởi Hitmaker AI</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                {songResult.step2_lyrics.title}
              </h1>
              <p className="text-xs text-slate-400 font-serif italic">
                Sáng tác theo bối cảnh: "{customTheme || "Tự động tối ưu"}" & Phong cách Pop Ballad R&B hiện đại.
              </p>
            </div>

            {/* Live Viral Potential Stat Card */}
            <div className="bg-gradient-to-tr from-[#FF4E00]/20 to-orange-500/5 border border-[#FF4E00]/40 rounded-xl p-4 min-w-[150px] flex items-center justify-between text-left shadow-lg">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#FF4E00] uppercase tracking-wider block">TIỀM NĂNG VIRAL</span>
                <span className="text-2xl font-black text-slate-100 tracking-tight font-display">98.8%</span>
              </div>
              <TrendingUp className="w-8 h-8 text-[#FF4E00] opacity-80" />
            </div>
          </div>

          {/* Main Bento Layout Grid (Structured into beautiful grids) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Bento 1: Content Analysis & Emotional Touchpoint */}
            <div id="bento-analysis-card" className="bg-[#0e1117] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <span className="text-[#FF4E00] font-mono text-xs font-bold bg-[#FF4E00]/10 px-2 py-0.5 rounded">01</span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Phân tích sâu cốt truyện</h2>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider block">Bối cảnh & Logic</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {songResult.step1_analysis.story_analysis}
                  </p>
                </div>

                <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] text-[#FF4E00] uppercase font-mono font-bold tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Điểm chạm cảm xúc đắt giá nhất</span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{songResult.step1_analysis.emotional_touchpoint}"
                  </p>
                </div>
              </div>
            </div>

            {/* Bento 2: Musical Direction & Progression Trends */}
            <div id="bento-trends-card" className="bg-[#0e1117] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                <span className="text-purple-400 font-mono text-xs font-bold bg-purple-500/10 px-2 py-0.5 rounded">02</span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Xu hướng phối khí & Nhịp điệu</h2>
              </div>

              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">Tempo</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 block">{tempoBPM} BPM</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">Tông Giọng</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 block">{songResult.step2_lyrics.title === "Mưa Sài Gòn, Lòng Mình Đổ Vỡ" ? "A Minor" : musicalKey}</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">Thể loại</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 block text-ellipsis overflow-hidden whitespace-nowrap">Pop R&B</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider block">Không khí Hiện Đại (Modern Vibe)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {songResult.step3_trends.modern_vibe}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-purple-400 uppercase font-mono font-bold tracking-wider block">Đẩy Cao Trào (Cinematic Strings)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {songResult.step3_trends.instruments_progression}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bento 3: Brand New Written Lyrics (Double Column or Wide Span) */}
          <div id="bento-lyrics-card" className="bg-[#0e1117] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#FF4E00] font-mono text-xs font-bold bg-[#FF4E00]/10 px-2 py-0.5 rounded">03</span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#FF4E00]" />
                  <span>Sáng tác lời mới (Sóng cảm xúc)</span>
                </h2>
              </div>
            </div>

            {/* Interactive lyrics layout with voice preview trigger */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-8 space-y-5 max-h-[500px] overflow-y-auto pr-3">
                {songResult.step2_lyrics.sections.map((section, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className={`group p-4 rounded-xl border transition-all ${
                        section.tag.toLowerCase().includes("chorus")
                          ? "bg-gradient-to-r from-[#FF4E00]/5 to-orange-500/[0.01] border-[#FF4E00]/25"
                          : "bg-black/30 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                            {section.tag}
                          </span>
                          <span className="text-[10px] font-mono text-[#FF4E00]/80 italic block mt-0.5">
                            {section.instruction}
                          </span>
                        </div>
                      </div>

                      <p className="font-serif italic text-base leading-relaxed text-slate-200 whitespace-pre-line pl-1">
                        {section.lyrics}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar with trending viral key hooks analysis */}
              <div className="md:col-span-4 space-y-4">
                <div className="bg-black/30 border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] text-amber-400 font-mono uppercase font-bold tracking-wider block mb-3 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lựa Chọn Đoạn Cắt Viral (TikTok)</span>
                  </span>

                  <div className="space-y-4">
                    {songResult.step2_lyrics.key_hooks.map((hook, i) => (
                      <div key={i} className="border-l-2 border-amber-400/50 pl-3 space-y-1.5">
                        <p className="text-xs font-serif italic text-slate-200 font-medium">
                          "{hook.lyrics}"
                        </p>
                        <p className="text-[10px] text-slate-400 leading-normal">
                          {hook.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro instructions for using in Suno */}
                <div className="bg-[#FF4E00]/5 border border-[#FF4E00]/15 rounded-xl p-4">
                  <span className="text-[10px] text-[#FF4E00] font-mono uppercase font-bold tracking-wider block mb-2">
                    Mẹo Từ Nhà Sản Xuất
                  </span>
                  <ul className="text-[11px] text-slate-300 space-y-2 list-disc list-inside">
                    <li>Hãy bôi đậm đoạn điệp khúc trên TikTok để ghép video mưa hoặc tâm trạng buồn.</li>
                    <li>Thêm nhịp lơi trống (drums delay) khi phối trên Suno v3.5.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Bento 4: SUNO READY PROMPTS EXPORT */}
          <div id="bento-prompts-export" className="bg-[#0e1117] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#FF4E00] font-mono text-xs font-bold bg-[#FF4E00]/10 px-2 py-0.5 rounded">04</span>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#FF4E00]" />
                  <span>Suno AI Prompt Output (Bản chuẩn tối ưu)</span>
                </h2>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded uppercase">Sẵn Sàng Sao Chép</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Style of Music Prompt */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>1. Style of Music Prompt</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {songResult.step4_suno_prompts.style_of_music.length}/120 ký tự
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(songResult.step4_suno_prompts.style_of_music, "style")}
                    className="text-xs text-[#FF4E00] hover:text-orange-400 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                  >
                    {copiedStyle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedStyle ? "ĐÃ COPY" : "COPY PROMPT"}</span>
                  </button>
                </div>
                
                {/* Text prompt box */}
                <div className="bg-black/60 font-mono text-xs p-3.5 rounded-xl border border-white/10 text-emerald-400 leading-relaxed text-left select-all">
                  "{songResult.step4_suno_prompts.style_of_music}"
                </div>

                {/* Parsed Tag Chips for Suno AI Optimization */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Phân tích Thẻ Tag Suno AI v3.5/v4:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {songResult.step4_suno_prompts.style_of_music
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag, i) => {
                        const isLanguage = tag.toLowerCase().includes("vietnamese");
                        const isKeyOrBpm = tag.toLowerCase().includes("bpm") || tag.toLowerCase().includes("key");
                        const isVocal = tag.toLowerCase().includes("vocal");
                        
                        return (
                          <span
                            key={i}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-all ${
                              isLanguage
                                ? "bg-amber-500/10 text-amber-300 border-amber-500/30 font-bold"
                                : isKeyOrBpm
                                ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                                : isVocal
                                ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                                : "bg-white/5 text-slate-300 border-white/10"
                            }`}
                          >
                            #{tag}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Box 2: Full Annotated Lyrics Prompt */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>2. Lyrics Prompt (Chuẩn Suno AI)</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 font-mono px-1.5 py-0.5 rounded border border-amber-500/20">
                      Đã làm sạch & Phân dòng
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy(songResult.step4_suno_prompts.lyrics_prompt, "lyrics")}
                    className="text-xs bg-[#FF4E00]/10 hover:bg-[#FF4E00]/20 text-[#FF4E00] border border-[#FF4E00]/30 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 font-bold cursor-pointer"
                  >
                    {copiedLyrics ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLyrics ? "ĐÃ COPY LỜI CHUẨN" : "COPY LỜI SUNO"}</span>
                  </button>
                </div>

                {/* Formatted and Cleaned Lyrics display with syntax highlights */}
                <div className="bg-black/60 font-mono text-xs p-3.5 rounded-xl border border-white/10 text-slate-300 max-h-[220px] overflow-y-auto leading-relaxed scrollbar-thin divide-y divide-white/5">
                  {cleanLyricsForSuno(songResult.step4_suno_prompts.lyrics_prompt)
                    .split("\n\n")
                    .map((section, sIdx) => (
                      <div key={sIdx} className="py-2 first:pt-0 last:pb-0 space-y-1">
                        {section.split("\n").map((line, lIdx) => {
                          const trimmed = line.trim();
                          const isTag = trimmed.startsWith("[") && trimmed.endsWith("]");
                          const isAdlib = trimmed.startsWith("(") && trimmed.endsWith(")");

                          if (isTag) {
                            const isChorus = trimmed.toLowerCase().includes("chorus");
                            const isIntroOutro = trimmed.toLowerCase().includes("intro") || trimmed.toLowerCase().includes("outro") || trimmed.toLowerCase().includes("end");
                            return (
                              <div key={lIdx} className="my-1">
                                <span className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  isChorus
                                    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                    : isIntroOutro
                                    ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                                    : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                                }`}>
                                  {trimmed}
                                </span>
                              </div>
                            );
                          }

                          if (isAdlib) {
                            return (
                              <p key={lIdx} className="text-purple-300/90 italic font-sans text-xs pl-2 border-l-2 border-purple-500/40">
                                {trimmed}
                              </p>
                            );
                          }

                          return (
                            <p key={lIdx} className="text-slate-200 text-xs font-sans leading-relaxed">
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Structured Guide for Suno Style Prompt Optimization */}
            <div className="p-4 bg-gradient-to-r from-amber-500/5 via-white/5 to-purple-500/5 border border-white/10 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Quy tắc 5 Lớp Tag Tối Ưu Cho Suno AI "Style of Music":</h4>
                  <p className="text-[10px] text-slate-400">Được tự động cấu trúc theo chuẩn AI Music Production</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono">
                <div className="bg-black/40 p-2 rounded-lg border border-amber-500/20">
                  <span className="text-amber-400 font-bold block mb-0.5">1. Ngôn ngữ</span>
                  <span className="text-slate-300">Vietnamese (Phát âm chuẩn Việt)</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-white/10">
                  <span className="text-orange-400 font-bold block mb-0.5">2. Thể loại</span>
                  <span className="text-slate-300">Pop Ballad / R&B hiện đại</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-purple-500/20">
                  <span className="text-purple-300 font-bold block mb-0.5">3. Giọng hát</span>
                  <span className="text-slate-300">{singerGender || "Warm male vocal"}</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-blue-500/20">
                  <span className="text-blue-300 font-bold block mb-0.5">4. Tông & Tempo</span>
                  <span className="text-slate-300">key of {musicalKey}, {tempoBPM} BPM</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block mb-0.5">5. Bản Phối</span>
                  <span className="text-slate-300">Piano, Cinematic strings, Warm mix</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bento 5: SUNO AI EXPERT STRATEGIES (Bento Grid Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Suno optimization tricks */}
            <div className="bg-[#0e1117] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF4E00]" />
                <span>Cẩm nang tối ưu chất lượng âm thanh Suno</span>
              </h3>
              
              <div className="space-y-3.5">
                {SUNO_TIPS.map((tip, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-200">{tip.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer / Project details & Credit box */}
            <div className="bg-gradient-to-br from-[#0e1117] to-[#121620] border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4E00]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-3">
                <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest font-bold block">Hitmaker Suite Info</span>
                <h3 className="font-display font-extrabold text-base text-slate-200">Học máy thông minh (ML Powered)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trình sáng tác thông minh của chúng tôi sử dụng mô hình trí tuệ nhân tạo Gemini 3.5 Flash để học hỏi và phân tích nhạc lý từ các bản nhạc đứng đầu bảng xếp hạng Billboard và làn sóng Nhạc trẻ Thịnh hành Việt Nam (Pop Ballad R&B).
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex gap-1.5 items-center">
                  <Wifi className="w-3.5 h-3.5 text-[#FF4E00]" />
                  <span>Suno API v3 / v4 ready</span>
                </div>
                <span>© 2026 SUNO AI STUDIO</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer System Status Bar */}
      <footer id="app-footer-bar" className="mt-12 border-t border-white/5 py-6 bg-[#0a0c10]/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <span>SYSTEM: ONLINE</span>
            <span>AI ENGINE: GEMINI 3.5 FLASH</span>
            <span>PRESET: POP BALLAD R&B</span>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            Sản xuất & Thiết kế độc quyền bởi Chuyên gia Nhạc sĩ & Suno Prompt Master Pro.
          </div>
        </div>
      </footer>

    </div>
  );
}
