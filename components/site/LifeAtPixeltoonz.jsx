import { Check } from "lucide-react";

export default function LifeAtPixeltoonz() {
  const features = [
    "24/7 studio access for students",
    "State-of-the-art equipment and software",
    "Working professionals as mentors",
    "Collaborative studio environment",
    "Real projects and real feedback",
    "Career support and placement assistance",
    "Lifetime access to learning materials",
  ];

  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden font-sans border-t border-gray-200">
      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-[#F09410]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#BC430D]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F09410] to-[#BC430D]">
              More Than Just Courses
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
            Pixeltoonz is a creative community. Studios, mentors, peers pushing each other, real projects, real feedback, and a culture that celebrates growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              A Culture of Collaboration
            </h3>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              You will learn alongside aspiring artists from diverse backgrounds. Peer-to-peer feedback, collaboration, creative juices flowing—that’s where true development lies. You’re not just getting to know the technology. You’re creating your professional and creative networks.
            </p>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">
                Campus & Culture Highlights
              </h4>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#F09410]/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#BC430D] font-bold" strokeWidth={3} />
                    </div>
                    <span className="text-[14px] font-medium text-gray-800 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Bento Box Photo Gallery */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
            {/* Image 1: Large Left */}
            <div className="col-span-1 row-span-2 relative rounded-[2rem] overflow-hidden group shadow-md">
              <img 
                src="/api/placeholder/400/600" 
                alt="Students collaborating on projects" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-semibold">Collaborative Studio</span>
              </div>
            </div>

            {/* Image 2: Top Right */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-md">
              <img 
                src="/api/placeholder/400/300" 
                alt="Mentoring session" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-semibold">Expert Mentorship</span>
              </div>
            </div>

            {/* Image 3: Bottom Right */}
            <div className="col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group shadow-md">
              <img 
                src="/api/placeholder/400/300" 
                alt="Students celebrating project completion" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-sm font-semibold">Creative Campus</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}