"use client";

const services = [
  {
    title: "OTR Services",
    description: "Specializing in over-the-road transportation with a focus on safety, efficiency, and compliance. Our experienced drivers and modern fleet ensure your cargo arrives on time, every time.",
  },
  {
    title: "Contract Management",
    description: "Expert management of logistics contracts, ensuring compliance, optimizing costs, and maintaining service quality. Our team handles all aspects of contract negotiation, execution, and performance monitoring.",
  },
  {
    title: "Logistics Solutions",
    description: "Comprehensive logistics solutions tailored to your business needs. From route optimization to fleet management, we provide end-to-end support to streamline your operations and improve efficiency.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-xl text-foreground/90 max-w-3xl mx-auto">Tailored logistics solutions for your business needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card p-8 hover:ring-2 hover:ring-accent transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{service.description}</p>
              <div className="mt-6">
                <button className="btn bg-surface-alt text-accent hover:bg-surface/80 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
