import { useState } from "react";

export function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => { if (form.name && form.email) setSubmitted(true); };

  return (
    <div className="bg-[#131313] border border-[#2a2a35] rounded-sm overflow-hidden">
      <div className="px-7 pt-7 pb-6 border-b border-[#2a2a35]" style={{ background: "linear-gradient(135deg,#1a1508 0%,#13131a 100%)" }}>
        <p className="font-sans-dm text-[9px] tracking-[3px] uppercase text-primary mb-2">Enquire Now</p>
        <h3 className="text-[1.3rem] italic text-[#f0ede6] leading-[1.3]">Please fill in your details below to receive a callback.</h3>
        
      </div>
      <div className="p-6">
        {submitted ? (
          <div className="py-10 text-center">
            <div className="text-[2.5rem] text-[#c9a84c] mb-4">◈</div>
            <h4 className="text-[1.2rem] italic text-[#f0ede6] mb-2">We&apos;ll be in touch</h4>
            <p className="font-sans-dm text-[0.85rem] text-[#8a8578] font-light leading-[1.7]">
              Thank you, {form.name}. Our team will reach out within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
              { label: "Email Address", key: "email", type: "email", placeholder: "you@example.com" },
              { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="mb-4">
                <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#f0ede6] block mb-1.5">{label}</label>
                <input
                  type={type} placeholder={placeholder} value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-2 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)] placeholder-[#8a8578]/50"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="font-sans-dm text-[0.72rem] tracking-[1.5px] uppercase text-[#8a8578] block mb-1.5">Message (Optional)</label>
              <textarea
                placeholder="Any questions or goals you'd like us to know..."
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/[0.03] border border-[#2a2a35] rounded-[2px] text-[#f0ede6] font-sans-dm text-[0.88rem] outline-none transition-all duration-200 focus:border-[#c9a84c] focus:bg-[rgba(201,168,76,0.03)] placeholder-[#8a8578]/50 resize-y min-h-[90px]"
              />
            </div>
            <button onClick={handleSubmit} className="w-full py-4 bg-primary text-black font-sans-dm font-bold text-[0.82rem] tracking-[2px] uppercase border-0 rounded-[2px] cursor-pointer mt-2 transition-colors duration-200 hover:bg-[#e8c97a]">
              Send Enquiry
            </button>
          
          </>
        )}
      </div>
    </div>
  );
}

