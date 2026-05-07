import { Globe, Search, AlertCircle, CheckCircle2 } from "lucide-react";

const SEOAnalyzer = ({ title, description, slug }) => {
  // Typical Google limits
  const isTitleLong = title?.length > 60;
  const isDescLong = description?.length > 160;
  const hasKeywords = description?.toLowerCase().includes(title?.toLowerCase().split(" ")[0]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Globe size={16} className="text-blue-500" /> Google Search Preview
        </h3>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Preview</span>
      </div>

      <div className="p-6">
        {/* Google Result Mockup */}
        <div className="max-w-[600px] mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">
              🌐
            </div>
            <div className="text-xs text-[#202124]">
              yourdomain.com <span className="text-gray-400">› {slug || "example-post"}</span>
            </div>
          </div>
          <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 line-clamp-1">
            {title || "Your Page Title Will Appear Here"}
          </h3>
          <p className="text-sm text-[#4d5156] line-clamp-2 leading-relaxed">
            {description || "Provide a meta description to see how this page will look in Google search results. Keep it between 120-160 characters for the best result."}
          </p>
        </div>

        {/* SEO Checklist */}
        <div className="space-y-3 pt-4 border-t border-gray-50">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">SEO Health Check</h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              {isTitleLong ? <AlertCircle size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
              Title Length ({title?.length || 0}/60)
            </span>
            <div className={`h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden`}>
               <div className={`h-full ${isTitleLong ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min((title?.length / 60) * 100, 100)}%` }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              {isDescLong ? <AlertCircle size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
              Meta Description ({description?.length || 0}/160)
            </span>
            <div className={`h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden`}>
               <div className={`h-full ${isDescLong ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min((description?.length / 160) * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 border-t border-blue-100">
        <p className="text-[11px] text-blue-700 leading-tight">
          <strong>Next.js Tip:</strong> Ensure you are using the <code>Metadata</code> object in your <code>layout.js</code> or <code>page.js</code> to map these database values to the actual HTML tags.
        </p>
      </div>
    </div>
  );
};

export default SEOAnalyzer;