import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { MapPin, Mail, Instagram, Users, Shield, Scale, Sparkles } from "lucide-react";
import ambedkarPortrait from "@/assets/ambedkar-portrait.png";

const values = [
  {
    icon: Shield,
    title: "स्वातंत्र",
    description: "प्रत्येक व्यक्तीला स्वतःचे विचार मांडण्याचे आणि जगण्याचे पूर्ण स्वातंत्र्य.",
  },
  {
    icon: Scale,
    title: "समता",
    description: "जात, धर्म, वंश या पलीकडे जाऊन सर्वांना समान वागणूक आणि संधी.",
  },
  {
    icon: Users,
    title: "बंधुता",
    description: "मानवतेच्या नात्याने एकमेकांप्रती आदर, प्रेम आणि एकात्मता.",
  },
  {
    icon: Sparkles,
    title: "न्याय",
    description: "सामाजिक, आर्थिक आणि राजकीय क्षेत्रांत सर्वांना न्याय मिळवून देणे.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              आमच्याबद्दल
            </h1>
            <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
              स्वतंत्रता, समता, बंधुता, न्याय
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative mx-auto w-fit">
                <img
                  src={ambedkarPortrait}
                  alt="डॉ. बाबासाहेब आंबेडकर"
                  className="w-72 h-auto max-h-96 rounded-2xl object-cover shadow-2xl border-4 border-accent"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground px-4 py-3 rounded-lg text-sm leading-relaxed text-center font-bold">
                  <div>भारतीय</div>
                  <div>संविधानाचे</div>
                  <div>शिल्पकार</div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">
                  आमची ओळख
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  विचारमंच, लातूर
                </h2>
                <div className="h-1 w-24 bg-accent rounded-full mt-4" />
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                भारतरत्न डॉ. बाबासाहेब आंबेडकर विचारमंच बौद्ध नगर, लातूर ही एक विचारकेंद्रित
                सामाजिक चळवळ आहे. आम्ही मुख्यतः आंबेडकर जयंतीच्या निमित्ताने
                विविध वैचारिक, बौद्धिक, सामाजिक व सांस्कृतिक कार्यक्रमांचे आयोजन करतो.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                आमची संघटना ही व्यक्तिकेंद्रित नसून विचारकेंद्रित आहे. येथे कोणताही
                अध्यक्ष नाही, कोणताही एकमेव नेता नाही. सर्व निर्णय सामूहिकपणे घेतले जातात.
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-accent mt-1" size={20} />
                  <span className="text-foreground">
                    बौद्ध नगर, डॉ. बाबासाहेब आंबेडकर चौक, लातूर
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-accent" size={20} />
                  <a href="mailto:vicharmach1956@gmail.com" className="text-foreground hover:text-accent transition-colors">
                    vicharmach1956@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="text-accent" size={20} />
                  <a
                    href="https://instagram.com/dr.ambedkar_vicharmanch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    @dr.ambedkar_vicharmanch
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              आमची तत्त्वे
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              मूळ मूल्ये
            </h2>
            <div className="decorative-line mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-hover bg-card rounded-xl p-8 text-center border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
