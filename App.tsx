
import React, { useState, useEffect } from 'react';
import { FAMILY_MEMBERS } from './constants';
import MemberCard from './components/MemberCard';
import { generateFamilyStory } from './services/geminiService';
import { FamilyStoryResponse } from './types';

const App: React.FC = () => {
  const [aiStory, setAiStory] = useState<FamilyStoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFamilyStory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const names = FAMILY_MEMBERS.map(m => m.name);
      const story = await generateFamilyStory(names);
      setAiStory(story);
    } catch (err) {
      console.error("Failed to fetch family story:", err);
      setError("無法生成家庭故事，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white pt-24 pb-48 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            李氏家族 <span className="text-indigo-200">・</span> 溫馨之家
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto leading-relaxed opacity-90">
            我是李秉翰，歡迎來到我們家。這裡記錄著爸爸李偉任、媽媽劉雅菱、哥哥李愷唯與我的共同回憶。
          </p>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 -mt-24">
        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {FAMILY_MEMBERS.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* AI Story Section */}
        <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">
            <i className="fa-solid fa-quote-right"></i>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">AI 解讀：我們的家庭之光</h2>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">正在透過 AI 撰寫溫馨故事...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex items-center gap-4">
                <i className="fa-solid fa-circle-exclamation text-2xl"></i>
                <p>{error}</p>
                <button 
                  onClick={fetchFamilyStory}
                  className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  重試
                </button>
              </div>
            ) : aiStory ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-seedling"></i> 家庭核心精神
                  </h3>
                  <p className="text-slate-600 text-xl leading-relaxed italic border-l-4 border-indigo-100 pl-6">
                    「{aiStory.familySpirit}」
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {aiStory.memberInsights.map((insight, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        {insight.name}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {insight.insight}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-sparkles"></i> 展望與祝福
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {aiStory.futureBlessing}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm mb-4">
            &copy; {new Date().getFullYear()} 李秉翰的溫馨家庭介紹頁面
          </p>
          <div className="flex justify-center gap-6 text-slate-300 text-xl">
            <i className="fa-solid fa-house-chimney"></i>
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-hands-holding"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
