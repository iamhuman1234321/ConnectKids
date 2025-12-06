import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Loader2, Plus, AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function CreateOpportunity() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        // If user doesn't have user_type, redirect to complete profile
        if (!currentUser.user_type) {
          navigate(createPageUrl('CompleteProfile'));
        }
      } catch (error) {
        // Not logged in, redirect to login
        base44.auth.redirectToLogin(window.location.href);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: '',
    age_range: '9-11',
    interest: 'coding',
    description: '',
    link: '',
    organization: ''
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Opportunity.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      setSubmitted(true);
      setTimeout(() => {
        navigate(createPageUrl('Opportunities'));
      }, 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.link.trim()) {
      alert('Please complete all required fields');
      return;
    }

    createMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  // Check if user is an organizer
  if (user && user.user_type !== 'organizer') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Organizers Only
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Only organizer accounts can create opportunities. Your account is registered as a parent/guardian.
          </p>
          <Button
            onClick={() => navigate(createPageUrl('Opportunities'))}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Browse Opportunities Instead
          </Button>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Opportunity Created! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for contributing to our community
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to opportunities page...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <Plus className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Share an Opportunity</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Create an <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Opportunity</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share a free extracurricular offering so families can find and sign up. All submissions are reviewed before being published.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                Opportunity Title
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Intro to Python Programming"
                className="mt-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 py-6 text-lg"
                required
              />
            </div>

            {/* Age Range and Interest */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="age_range" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                  Target Age Range
                  <span className="text-red-500">*</span>
                </Label>
                <select
                  id="age_range"
                  value={formData.age_range}
                  onChange={(e) => handleChange('age_range', e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-lg"
                  required
                >
                  <option value="6-8">6-8 years</option>
                  <option value="9-11">9-11 years</option>
                  <option value="12-14">12-14 years</option>
                  <option value="15-18">15-18 years</option>
                </select>
              </div>

              <div>
                <Label htmlFor="interest" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                  Category
                  <span className="text-red-500">*</span>
                </Label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className="mt-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-lg"
                  required
                >
                  <option value="arts">Arts & Crafts</option>
                  <option value="music">Music</option>
                  <option value="stem">STEM</option>
                  <option value="sports">Sports & Fitness</option>
                  <option value="coding">Coding</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                Description
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Briefly describe the program, what children will learn, and what makes it special..."
                rows={5}
                className="mt-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 text-lg resize-none"
                required
              />
            </div>

            {/* Link */}
            <div>
              <Label htmlFor="link" className="text-sm font-bold text-gray-700 flex items-center gap-1">
                Program Website / Link
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="link"
 
