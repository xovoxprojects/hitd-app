import { UploadCloud, CheckCircle2, AlertCircle, FileImage, FileVideo, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadArea({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [textMode, setTextMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 800 * 1024 * 1024) {
        setError("El archivo supera el límite de 800MB.");
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.size > 800 * 1024 * 1024) {
        setError("El archivo supera el límite de 800MB.");
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const calculateCost = () => {
    if (!file && !textContent) return 0;
    if (file) {
      if (file.type.startsWith("video/")) return 2;
      return 1;
    }
    return 1;
  };

  const analyze = async () => {
    if (!file && !textContent) {
      setError("Por favor, subí una imagen, video o pegá un texto para analizar.");
      return;
    }
    
    setAnalyzing(true);
    setError("");

    try {
      let fileUrl = "";

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('creatives')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('creatives')
          .getPublicUrl(filePath);
          
        fileUrl = data.publicUrl;
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileUrl,
          fileMimeType: file?.type,
          fileName: file?.name,
          text: textContent
        }),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Error al analizar");

      onAnalysisComplete(responseData);
      setFile(null);
      setTextContent("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
      
      {/* Decorative ambient gradient inside the card */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="flex justify-between items-center mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-4 tracking-tight">Nuevo Análisis</h2>
        <div className="bg-slate-100 rounded-xl p-1.5 flex shadow-inner border border-slate-200/60">
          <button 
            onClick={() => setTextMode(false)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${!textMode ? 'bg-white text-indigo-700 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 font-semibold'}`}
          >
            Creativo Visual
          </button>
          <button 
            onClick={() => setTextMode(true)}
            className={`px-6 py-2 text-sm rounded-lg transition-all duration-300 ${textMode ? 'bg-white text-indigo-700 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 font-semibold'}`}
          >
            Solo Copy
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-5 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-start gap-3 text-sm font-bold shadow-sm relative z-10">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="relative z-10">
        {!textMode ? (
          <div 
            className={`border-2 border-dashed ${file ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-100/50'} rounded-[2rem] p-16 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,video/*"
            />
            
            {file ? (
              <div className="animate-in zoom-in-95 duration-300 flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-indigo-100 flex items-center justify-center mb-6 relative">
                   <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                   </div>
                   {file.type.startsWith("video/") ? <FileVideo className="w-10 h-10 text-indigo-500" /> : <FileImage className="w-10 h-10 text-indigo-500" />}
                </div>
                <p className="font-bold text-slate-800 text-lg mb-1 tracking-tight">{file.name}</p>
                <p className="text-sm font-medium text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB • Listo para escanear</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <p className="font-bold text-slate-900 text-lg mb-2">Seleccioná un archivo o arrastralo aquí</p>
                <p className="text-sm font-medium text-slate-500">JPG, PNG, GIF, MP4 hasta 800MB</p>
              </div>
            )}
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-[2.2rem] blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
            <textarea 
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Pegá tu copy de anuncio aquí para escanear lenguaje agresivo, promesas engañosas o violaciones de política..."
              className="relative w-full h-56 bg-white border border-slate-200 rounded-[2rem] p-8 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none transition-colors shadow-inner"
            />
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-8 relative z-10">
        <div className="text-slate-500 text-sm font-bold flex items-center gap-2 mb-6 sm:mb-0">
          Costo estimado: <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-900 rounded-lg text-base"><Sparkles className="w-4 h-4 text-amber-500" /> {calculateCost()} crédito{calculateCost() !== 1 ? 's' : ''}</span>
        </div>
        
        <button 
          onClick={analyze}
          disabled={analyzing || (!file && !textContent)}
          className="relative w-full sm:w-auto overflow-hidden group/btn px-10 py-4 bg-slate-900 text-white font-bold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_8px_20px_rgb(0,0,0,0.15)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5"
        >
          {analyzing ? (
            <div className="flex items-center justify-center gap-3 relative z-10">
              <span className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-white animate-spin" />
              Escaneando con IA...
            </div>
          ) : (
            <>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">Ejecutar Análisis <Sparkles className="w-4 h-4"/></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
