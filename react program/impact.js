import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function Impact() {
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!countersStarted) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [countersStarted, end, duration]);

    return <>{count.toLocaleString()}{suffix}</>;
  };

  const levels = [
    {
      level: 1,
      title: 'Awareness & Matching',
      description: 'Collect and surface free programs across the United States',
      target: 1000000,
      targetLabel: 'families reached',
      timeframe: 'Within 12 months',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      achievements: [
        'Build comprehensive program database',
        'Launch matching platform',
        'Partner with 100+ organizations',
        'Reach underserved communities'
      ]
    },
    {
      level: 2,
      title: 'Participation Boost',
      description: 'Reduce the number of children missing extracurriculars',
      target: 2260000,
      targetLabel: 'children engaged',
      timeframe: 'Within 2 years',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      achievements: [
        'Convert 10% of unmet demand',
        'Provide low-tech access options',
        'Streamline signup processes',
        'Offer ongoing support'
      ]
    },
    {
      level: 3,
      title: 'Skill & Opportunity Growth',
      description: 'Measurable gains in development and readiness',
      targetLabel: 'improved outcomes',
      timeframe: 'Over 5 years',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500',
      achievements: [
        'Track skill development',
        'Measure STEM interest growth',
        'Monitor college readiness',
        'Document success stories'
      ]
    },
    {
      level: 4,
      title: 'Systems Change',
      description: 'Embed free extracurricular access into public education',
      targetLabel: 'policy adoption',
      timeframe: 'Long-term vision',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      achievements: [
        'Partner with school districts',
        'Secure government funding',
        'Influence education policy',
        'Create sustainable model'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">Projected Growth</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Impact Scale</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This roadmap shows how ConnectKids can move the needle over time by increasing access, participation, and long-term outcomes for millions of children.
          </p>
        </motion.div>

        {/* Impact Levels */}
        <div ref={statsRef} className="space-y-8 mb-12">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Level Header */}
              <div className={`h-2 bg-gradient-to-r ${level.color}`} />
              
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center flex-shrink-0`}>
                    <level.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${level.color} text-white`}>
                        Level {level.level}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">{level.timeframe}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {level.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{level.description}</p>

                    {/* Target Metric */}
                    {level.target && (
                      <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className={`text-4xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                              {countersStarted ? <AnimatedCounter end={level.target} duration={2000} /> : '0'}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{level.targetLabel}</div>
                          </div>
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    )}

                    {!level.target && (
                      <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                          {level.targetLabel}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {level.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-r ${level.color} text-white rounded-full`} />
                          <span className="text-sm text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
        >
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-gray-900">Note:</span> These scales are conservative projections to show achievable milestones. Exact numbers will depend on funding, partnerships, and volunteer capacity. Our goal is to make a meaningful, measurable difference in children's lives.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Help Us Reach These Goals</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Every contribution, volunteer hour, and partnership brings us closer to these milestones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/Donate" className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
              Support Our Mission
            </a>
            <a href="/CreateOpportunity" className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-all">
              Create Opportunity
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
