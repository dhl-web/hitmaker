import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  app.use(express.json({ limit: "10mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Endpoint: Sáng tác lời bài hát & Tạo Prompt Suno AI
  app.post("/api/generate-song", async (req, res) => {
    try {
      const { referenceInput, mood, singerGender, tempoBPM, customTheme, musicalKey } = req.body;

      if (!referenceInput) {
        return res.status(400).json({ error: "Tham chiếu (link YouTube hoặc câu chuyện) không được để trống." });
      }

      const client = getGeminiClient();

      const userPrompt = `
Hãy đóng vai là một Nhà sản xuất âm nhạc chuyên nghiệp, Nhạc sĩ tạo hit (Trending Songwriter) và là Chuyên gia tối ưu prompt cho Suno AI.
Nhiệm vụ của bạn là biến bài hát tham chiếu (qua link YouTube hoặc tên bài hát) hoặc câu chuyện/ý tưởng sau đây thành một bài hát mới theo phong cách Pop Ballad R&B hiện đại, dễ viral trên TikTok/Reels, đồng thời xuất ra bộ prompt chuẩn xác cho Suno AI.

DƯỚI ĐÂY LÀ THÔNG TIN ĐẦU VÀO CỦA NGƯỜI DÙNG:
1. Tham chiếu / Câu chuyện / Ý tưởng: "${referenceInput}"
2. Mood/Vibe yêu cầu: "${mood || "Sâu lắng, Da diết, Chậm rãi"}"
3. Giọng hát (Singer Gender): "${singerGender || "Nữ"}"
4. Nhịp điệu đề xuất (Tempo BPM): "${tempoBPM || 72} BPM"
5. Tông giọng yêu cầu (Musical Key): "${musicalKey || "A Minor"}"
6. Chủ đề tùy chọn thêm: "${customTheme || "Tự động phân tích và mở rộng"}"

HÃY THỰC HIỆN NGHIÊM NGẶT THEO QUY TRÌNH 4 BƯỚC VÀ TRẢ VỀ JSON:

### BƯỚC 1: Phân tích nội dung & Cốt truyện (Sử dụng Tiếng Việt)
- story_analysis: Phân tích sâu sắc cốt truyện, tâm tư nhân vật, thông điệp cốt lõi và tính logic trong bài hát tham chiếu hoặc câu chuyện người dùng gửi.
- emotional_touchpoint: Chỉ ra điểm chạm cảm xúc đắt giá nhất khiến bài hát/câu chuyện này có sức hút mãnh liệt với người nghe.

### BƯỚC 2: Sáng tác lời mới phong cách Pop Ballad R&B dễ Viral (Sử dụng Tiếng Việt)
- Viết một bài hát hoàn toàn mới dựa trên cốt truyện vừa phân tích. Hiện đại hóa bối cảnh và ca từ để hợp thị hiếu giới trẻ hiện nay.
- title: Đề xuất tên bài hát mới thật thu hút, bay bổng và hợp thời.
- sections: Phải chia bài hát thành các thẻ cấu trúc rõ ràng: [Verse 1], [Chorus 1], [Verse 2], [Chorus 2], [Bridge], [Outro].
  Mỗi phần có lời tiếng Việt giàu hình ảnh, nhịp điệu mượt mọc, đồng thời ghi kèm 'instruction' bằng tiếng Anh miêu tả nhạc cụ/nhịp độ (Ví dụ: "soft piano, gentle acoustic guitar", "drums drop in, emotional building", "cinematic soaring strings, high intensity, powerful vocal", "fading out, emotional soft hum").
- key_hooks: Hãy trích lọc 2-3 câu "key" cực kì sâu sắc, thấm thía từ bài hát mới này, phù hợp nhất để cắt làm nhạc nền TikTok/Facebook Reels, và lý giải tại sao nó dễ viral.

### BƯỚC 3: Áp dụng xu hướng âm nhạc thịnh hành (Sử dụng Tiếng Việt)
- modern_vibe: Mô tả chi tiết cách phối khí hiện đại cho bài này (Sự kết hợp giữa nhịp beat R&B/Lofi chậm rãi, tiếng Piano/Guitar mộc mạc ở đoạn đầu).
- instruments_progression: Mô tả chi tiết cách đẩy cao trào bằng tiếng đàn dây hoành tráng - Cinematic Strings ở điệp khúc, sự bùng nổ nhịp điệu, chuyển giao mượt mà giữa các đoạn để đạt độ viral tốt nhất.

### BƯỚC 4: Xuất Prompt chuẩn cho Suno AI
- style_of_music: Prompt thể loại nhạc bằng tiếng Anh để điền trực tiếp vào ô "Style of Music" của Suno AI (v3.5 & v4). BẮT BUỘC tuân thủ cấu trúc tag chuẩn tối ưu nhất phân tách bởi dấu phẩy, KHÔNG dùng câu văn dài hay từ nối thừa:
  Cấu trúc: [Vietnamese / Vietnamese Pop], [Core Genres (e.g. Modern Pop Ballad, R&B, Lofi)], [Vocal Profile (dựa trên ${singerGender})], [Key (key of ${musicalKey || "A Minor"})], [Tempo (${tempoBPM || 72} BPM)], [Instruments (e.g. acoustic piano, cinematic strings, soft 808 bass)], [Mood/Production (e.g. melancholic, emotional buildup, warm acoustic mix)].
  (Ví dụ hoàn chỉnh: "Vietnamese, Vietnamese Pop Ballad, Modern R&B, warm male vocal, key of ${musicalKey || "A Minor"}, ${tempoBPM || 72} BPM, acoustic piano, cinematic strings, melancholic, warm mix"). Tổng độ dài khoảng 100-120 ký tự để Suno AI nhận diện tốt nhất.
- lyrics_prompt: Toàn bộ lời bài hát mới viết ở Bước 2, được định dạng TỐI ƯU CỰC KỲ DỄ DÁN VÀO SUNO AI:
  1. Phân tách từng đoạn ([Intro], [Verse 1], [Chorus], [Bridge], [Outro], [End]) bằng đúng 1 dòng trống rõ ràng (\n\n).
  2. TUYỆT ĐỐI KHÔNG chứa các câu chú thích/diễn giải tiếng Việt không hát được trong ngoặc (như "(Tiếng mưa rơi...)", "(Tiếng đàn piano...)", "(Lời hát cất lên...)"). ngoặc đơn ( ) CHỈ dùng cho ca từ hát bè/ad-lib thực sự.
  3. Thẻ cấu trúc và chỉ dẫn nhạc cụ dùng tiếng Anh trong ngoặc vuông [ ] (Ví dụ: [Intro: Soft acoustic piano], [Verse 1: Gentle intimate vocals], [Chorus: Soaring emotional vocals], [Bridge: High emotional peak], [Outro: Fading piano], [End]).
  4. Trình bày sạch sẽ, đúng chính tả, xuống dòng rõ ràng giữa từng câu hát.

YÊU CẦU QUAN TRỌNG:
- Toàn bộ nội dung phân tích, lời bài hát, giải thích bắt buộc phải viết bằng TIẾNG VIỆT (trừ các từ khóa nhạc cụ/cấu trúc tiếng Anh cho Suno).
- Lời bài hát phải có nhịp điệu tốt, gieo vần tinh tế, có chiều sâu cảm xúc, tránh hời hợt sáo rỗng.
- Trả về đúng cấu trúc JSON đã được chỉ định.
`;

      // Models list following guidelines.
      // We list several high-quality models to gracefully handle high-demand/rate-limit/503 errors.
      const modelsToTry = [
        "gemini-3.5-flash",
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-1.5-flash",
        "gemini-flash-latest"
      ];
      const delays = [1000, 1500, 2000, 3000, 4000];
      let lastError: any = null;
      let response: any = null;

      for (let i = 0; i < modelsToTry.length; i++) {
        const currentModel = modelsToTry[i];
        try {
          console.log(`Đang cố gắng sáng tác nhạc với model: ${currentModel} (Lần thử ${i + 1}/${modelsToTry.length})...`);
          response = await client.models.generateContent({
            model: currentModel,
            contents: userPrompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  step1_analysis: {
                    type: Type.OBJECT,
                    properties: {
                      story_analysis: { type: Type.STRING, description: "Phân tích chi tiết cốt truyện, tâm tư và tính logic" },
                      emotional_touchpoint: { type: Type.STRING, description: "Điểm chạm cảm xúc đắt giá nhất của tác phẩm" }
                    },
                    required: ["story_analysis", "emotional_touchpoint"]
                  },
                  step2_lyrics: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING, description: "Tên bài hát mới đề xuất" },
                      sections: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            tag: { type: Type.STRING, description: "Tên thẻ cấu trúc, ví dụ: [Verse 1], [Chorus]" },
                            lyrics: { type: Type.STRING, description: "Lời bài hát tiếng Việt tương ứng" },
                            instruction: { type: Type.STRING, description: "Chỉ dẫn âm nhạc tiếng Anh cho Suno, ví dụ: soft piano, gentle acoustic guitar" }
                          },
                          required: ["tag", "lyrics", "instruction"]
                        }
                      },
                      key_hooks: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            lyrics: { type: Type.STRING, description: "Ca từ của câu key hook" },
                            reason: { type: Type.STRING, description: "Giải thích lý do dễ viral" }
                          },
                          required: ["lyrics", "reason"]
                        }
                      }
                    },
                    required: ["title", "sections", "key_hooks"]
                  },
                  step3_trends: {
                    type: Type.OBJECT,
                    properties: {
                      modern_vibe: { type: Type.STRING, description: "Cách áp dụng nhịp điệu R&B/Lofi chậm rãi" },
                      instruments_progression: { type: Type.STRING, description: "Cách chuyển đổi nhạc cụ và đẩy cao trào bằng Cinematic Strings" }
                    },
                    required: ["modern_vibe", "instruments_progression"]
                  },
                  step4_suno_prompts: {
                    type: Type.OBJECT,
                    properties: {
                      style_of_music: { type: Type.STRING, description: "Style of Music Prompt cho Suno (English, 120 chars max)" },
                      lyrics_prompt: { type: Type.STRING, description: "Toàn bộ lời bài hát có xen kẽ thẻ cấu trúc tiếng Anh [Tag: instruction] cho Suno" }
                    },
                    required: ["style_of_music", "lyrics_prompt"]
                  }
                },
                required: ["step1_analysis", "step2_lyrics", "step3_trends", "step4_suno_prompts"]
              }
            }
          });

          // Nếu thành công thì dừng vòng lặp
          if (response) {
            console.log(`Sáng tác thành công với model: ${currentModel}`);
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Thất bại với model ${currentModel}:`, err.message || err);
          if (i < modelsToTry.length - 1) {
            const delay = delays[i];
            console.log(`Đang chờ ${delay}ms trước khi đổi sang model tiếp theo...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      if (!response) {
        throw lastError || new Error("Đã xảy ra lỗi bất ngờ từ các mô hình AI.");
      }

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Không nhận được phản hồi từ Gemini API.");
      }

      const songData = JSON.parse(responseText.trim());
      res.json(songData);
    } catch (error: any) {
      console.error("Error generating song:", error);
      res.status(500).json({ error: error.message || "Đã xảy ra lỗi trong quá trình sáng tác nhạc phẩm." });
    }
  });

  // Endpoint: Text-To-Speech nghe thử ca từ giọng AI
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Văn bản để phát âm không được trống." });
      }

      const client = getGeminiClient();

      // Giọng hát/đọc prebuilt: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
      // Mặc định chọn Zephyr cho giọng ấm áp trầm bổng hoặc Kore cho giọng nữ trong trẻo
      const voiceName = voice || "Kore"; 

      const ttsPrompt = `Đọc diễn cảm, sâu lắng, chậm rãi và đầy cảm xúc bằng tiếng Việt câu ca từ sau (đọc đúng nhịp điệu trữ tình của ca khúc R&B): "${text}"`;

      const response = await client.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: ttsPrompt }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        throw new Error("Mẫu âm thanh phát ra trống từ mô hình Gemini TTS.");
      }

      res.json({ audio: base64Audio });
    } catch (error: any) {
      console.error("Error generating TTS:", error);
      res.status(500).json({ error: error.message || "Đã xảy ra lỗi khi tạo giọng nói thử nghiệm." });
    }
  });

  // Setup Vite Dev Server / Static Files
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
