/**
 * @fileoverview Visual Inspection Mastery Lesson Content - Beautiful, interactive lesson design
 */

'use client';

import { useState } from 'react';
import { Search, Eye, Camera, AlertTriangle, CheckCircle, Shield, Clock, Download } from 'lucide-react';

export function VisualInspectionContent() {
  const [selectedMoldType, setSelectedMoldType] = useState<string | null>(null);

  const moldTypes = [
    {
      id: 'black',
      name: 'Black Mold (Stachybotrys)',
      color: 'bg-gray-900',
      danger: 'high',
      description: 'Slimy, dark green or black appearance. Highly toxic.',
      locations: 'Drywall, wood, paper materials',
      warning: 'Extremely dangerous - evacuate immediately if found'
    },
    {
      id: 'green',
      name: 'Green Mold (Aspergillus)',
      color: 'bg-green-600',
      danger: 'medium',
      description: 'Fuzzy or powdery texture, blue-green color.',
      locations: 'Food, fabric, HVAC systems',
      warning: 'Can trigger severe allergic reactions'
    },
    {
      id: 'white',
      name: 'White Mold (Penicillium)',
      color: 'bg-gray-200',
      danger: 'medium',
      description: 'Fluffy white appearance, musty odor.',
      locations: 'Basements, attics, behind walls',
      warning: 'Often mistaken for efflorescence'
    },
    {
      id: 'yellow',
      name: 'Yellow Mold (Mucor)',
      color: 'bg-yellow-400',
      danger: 'medium',
      description: 'Yellow or golden appearance, fast-growing.',
      locations: 'HVAC systems, old food',
      warning: 'Can cause respiratory issues'
    }
  ];

  const inspectionSteps = [
    {
      icon: Search,
      title: 'Smell Test',
      description: 'Detect musty, earthy odors before visual inspection',
      color: 'bg-blue-500'
    },
    {
      icon: Eye,
      title: 'Visual Scan',
      description: 'Look for discoloration, staining, or fuzzy growth',
      color: 'bg-green-500'
    },
    {
      icon: Camera,
      title: 'Document',
      description: 'Photo evidence with proper lighting and scale',
      color: 'bg-purple-500'
    },
    {
      icon: AlertTriangle,
      title: 'Safety Check',
      description: 'Assess risk level and containment needs',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Eye className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Visual Inspection Mastery</h1>
            <p className="text-blue-100 text-lg">Learn to spot mold like a professional inspector</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Evidence Level</span>
            </div>
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">Solid Research</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Duration</span>
            </div>
            <span className="text-white">10 minutes</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Skill Level</span>
            </div>
            <span className="text-white">Beginner Friendly</span>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Visual Inspection Matters</h2>
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg mb-4">
          <p className="text-orange-800 font-semibold">70% of visible mold goes undetected by untrained eyes</p>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          Most people miss critical warning signs because they don't know what to look for. This lesson will train your eye to spot mold at every stage - from early growth to dangerous infestations. By the end, you'll inspect like a professional.
        </p>
      </div>

      {/* The STOP Technique */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">The STOP Technique</h2>
          <p className="text-indigo-100">Professional inspectors use this systematic approach</p>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspectionSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Mold Identification Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Interactive Mold Identification Chart</h2>
          <p className="text-green-100">Click on each mold type to learn more</p>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {moldTypes.map((mold) => (
              <button
                key={mold.id}
                onClick={() => setSelectedMoldType(mold.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  selectedMoldType === mold.id 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 ${mold.color} rounded-full mx-auto mb-3 border-2 border-white shadow-md`}></div>
                <h3 className="font-semibold text-sm text-center text-gray-900">{mold.name}</h3>
                <div className={`mt-2 px-2 py-1 rounded-full text-xs ${
                  mold.danger === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {mold.danger.toUpperCase()} RISK
                </div>
              </button>
            ))}
          </div>
          
          {selectedMoldType && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              {(() => {
                const mold = moldTypes.find(m => m.id === selectedMoldType);
                if (!mold) return null;
                
                return (
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-8 h-8 ${mold.color} rounded-full border-2 border-white shadow`}></div>
                      <h3 className="text-xl font-bold text-gray-900">{mold.name}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Appearance</h4>
                        <p className="text-gray-600 text-sm">{mold.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Common Locations</h4>
                        <p className="text-gray-600 text-sm">{mold.locations}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Health Warning</h4>
                        <div className={`p-3 rounded-lg ${
                          mold.danger === 'high' ? 'bg-red-100 border border-red-200' : 'bg-yellow-100 border border-yellow-200'
                        }`}>
                          <p className={`text-sm font-medium ${
                            mold.danger === 'high' ? 'text-red-800' : 'text-yellow-800'
                          }`}>
                            {mold.warning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-900 text-lg mb-2">⚠️ CRITICAL SAFETY WARNING</h3>
            <p className="text-red-800 mb-4 leading-relaxed">
              Never directly touch suspected mold with bare hands. Always wear gloves and avoid disturbing large areas without proper protective equipment. If you find black mold, leave the area immediately and contact professionals.
            </p>
            <p className="text-red-700 text-sm font-medium">
              Consult your healthcare provider before proceeding with any mold inspection in your living space.
            </p>
          </div>
        </div>
      </div>

      {/* Professional Tips */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Inspector Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">🔍 What to Look For</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Fuzzy or slimy textures on surfaces</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Discoloration or staining patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Musty, earthy, or rotting smells</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Water damage or persistent moisture</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">📱 Documentation Best Practices</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Use good lighting and include scale reference</span>
              </li>
              <li className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Take both wide shots and close-ups</span>
              </li>
              <li className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Note date, time, and exact location</span>
              </li>
              <li className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Upload to cloud storage immediately</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps Action Box */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🎯 Ready to Practice?</h2>
        <p className="text-green-100 mb-6 text-lg">
          Now that you know what to look for, it's time to put your new skills to work.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">Your Next Action</h3>
            <p className="text-green-100 mb-4">
              Choose one room in your home and perform a complete systematic inspection using the STOP technique.
            </p>
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Start Room Inspection
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">Download Resources</h3>
            <p className="text-green-100 mb-4">
              Get the printable mold identification chart and inspection checklist.
            </p>
            <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Chart
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Complete */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 inline-block">
          <h3 className="text-xl font-bold mb-2">🎉 Lesson Complete!</h3>
          <p className="text-blue-100">Continue to Lesson 2: Room-by-Room Audit</p>
        </div>
      </div>
    </div>
  );
}
