"use client";

const positions = [
  {
    title: "Professional Drivers",
    icon: "fas fa-truck",
    description: "We're seeking experienced, safety-conscious drivers to join our fleet. Competitive pay, benefits, and a supportive work environment.",
  },
  {
    title: "Operations Team",
    icon: "fas fa-users",
    description: "Join our logistics coordination team to help manage shipments, customer service, and warehouse operations.",
  },
];

const benefits = [
  {
    icon: "fas fa-dollar-sign",
    title: "Competitive Compensation",
    description: "We offer industry-leading pay and benefits packages.",
  },
  {
    icon: "fas fa-heartbeat",
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs.",
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Professional Development",
    description: "Ongoing training and career advancement opportunities.",
  },
];

export default function Careers() {
  return (
    <section id="careers" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Team</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">We're always looking for talented individuals to join the HSE Logistics family</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {positions.map((position, index) => (
            <div
              key={index}
              className="card p-8 hover:ring-2 hover:ring-accent transition duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center mr-6">
                  <i className={`${position.icon} text-accent text-2xl`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
              </div>
              <p className="text-foreground/80 mb-6">{position.description}</p>
              <button className="btn bg-accent hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Apply Now</button>
            </div>
          ))}
        </div>

        <div className="bg-surface-alt p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-foreground mb-4">Why Work With Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <i className={`${benefit.icon} text-accent mt-1 mr-3`} />
                <div>
                  <h4 className="font-medium text-foreground">{benefit.title}</h4>
                  <p className="text-foreground/80 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
