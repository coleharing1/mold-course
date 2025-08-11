/**
 * @fileoverview Mold Identification Chart Component - Interactive visual guide
 * Helps users identify different types of mold by color, texture, and characteristics
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Info, 
  Eye, 
  Droplets,
  Wind,
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoldType {
  id: string;
  name: string;
  commonName?: string;
  color: string;
  texture: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  commonLocations: string[];
  characteristics: string[];
  healthRisks: string[];
  immediateAction: string;
  colorClass: string;
}

const moldTypes: MoldType[] = [
  {
    id: 'stachybotrys',
    name: 'Stachybotrys chartarum',
    commonName: 'Black Mold',
    color: 'Deep black to dark green',
    texture: 'Slimy when wet, powdery when dry',
    riskLevel: 'critical',
    commonLocations: ['Wet drywall', 'Wood surfaces', 'Paper products', 'Ceiling tiles'],
    characteristics: ['Musty odor', 'Grows in circular patterns', 'Leaves dark stains', 'Thrives in constant moisture'],
    healthRisks: ['Severe respiratory issues', 'Neurological symptoms', 'Immune system suppression', 'Bleeding in lungs'],
    immediateAction: 'Leave area immediately and contact professionals',
    colorClass: 'bg-gray-900'
  },
  {
    id: 'aspergillus-niger',
    name: 'Aspergillus niger',
    commonName: 'Black Aspergillus',
    color: 'Black with white or yellow edges',
    texture: 'Fuzzy, cotton-like',
    riskLevel: 'high',
    commonLocations: ['Air conditioning systems', 'Insulation', 'Dust', 'Soil'],
    characteristics: ['Rapid growth', 'White spores around edges', 'Sweet musty smell', 'Heat resistant'],
    healthRisks: ['Lung infections', 'Allergic reactions', 'Asthma attacks', 'Ear infections'],
    immediateAction: 'Avoid disturbance, improve ventilation, professional assessment',
    colorClass: 'bg-gray-800'
  },
  {
    id: 'aspergillus-fumigatus',
    name: 'Aspergillus fumigatus',
    commonName: 'Green Aspergillus',
    color: 'Blue-green to dark green',
    texture: 'Velvety, fuzzy surface',
    riskLevel: 'high',
    commonLocations: ['Compost', 'Decaying vegetation', 'HVAC systems', 'Mattresses'],
    characteristics: ['Thermophilic (heat-loving)', 'Distinctive blue-green color', 'Powdery spores', 'Musty odor'],
    healthRisks: ['Aspergillosis', 'Lung inflammation', 'Severe allergic reactions', 'Immune system compromise'],
    immediateAction: 'Do not disturb, wear N95 mask, professional remediation needed',
    colorClass: 'bg-green-700'
  },
  {
    id: 'penicillium',
    name: 'Penicillium',
    commonName: 'Blue-Green Mold',
    color: 'Blue-green, sometimes white edges',
    texture: 'Soft, fuzzy, brush-like',
    riskLevel: 'moderate',
    commonLocations: ['Food', 'Wallpaper', 'Fabrics', 'Insulation', 'Carpets'],
    characteristics: ['Circular growth pattern', 'Sweet musty odor', 'Fast spreading', 'Various shades of blue-green'],
    healthRisks: ['Allergic reactions', 'Asthma', 'Sinus infections', 'Eye irritation'],
    immediateAction: 'Remove contaminated materials, improve ventilation',
    colorClass: 'bg-blue-600'
  },
  {
    id: 'chaetomium',
    name: 'Chaetomium',
    commonName: 'White/Gray Mold',
    color: 'White to gray, darkens with age',
    texture: 'Cotton-like, becomes darker and harder',
    riskLevel: 'moderate',
    commonLocations: ['Water-damaged drywall', 'Wallpaper', 'Carpets', 'Wood'],
    characteristics: ['Distinctive musty odor', 'Changes color over time', 'Thrives in chronic moisture', 'Often mistaken for dirt'],
    healthRisks: ['Skin infections', 'Nail infections', 'Allergic reactions', 'Respiratory issues'],
    immediateAction: 'Address moisture source, remove contaminated materials',
    colorClass: 'bg-gray-400'
  },
  {
    id: 'fusarium',
    name: 'Fusarium',
    commonName: 'Pink/Red Mold',
    color: 'Pink to red, sometimes white',
    texture: 'Fuzzy, cotton-like',
    riskLevel: 'high',
    commonLocations: ['Water-damaged carpets', 'Wallpaper', 'Fabrics', 'Humidifiers'],
    characteristics: ['Rapid growth', 'Spreads quickly', 'Thrives in cool, wet conditions', 'Sweet smell'],
    healthRisks: ['Eye infections', 'Skin infections', 'Respiratory issues', 'Nail infections'],
    immediateAction: 'Remove water source, professional cleaning recommended',
    colorClass: 'bg-pink-500'
  },
  {
    id: 'aureobasidium',
    name: 'Aureobasidium pullulans',
    commonName: 'Black Yeast',
    color: 'Pink to black (changes over time)',
    texture: 'Slimy, yeast-like',
    riskLevel: 'moderate',
    commonLocations: ['Bathroom surfaces', 'Windows', 'Painted surfaces', 'Wood'],
    characteristics: ['Color progression from pink to black', 'Slimy texture', 'Common in bathrooms', 'Behind wallpaper'],
    healthRisks: ['Skin infections', 'Eye infections', 'Allergic reactions', 'Respiratory irritation'],
    immediateAction: 'Clean with antifungal cleaner, improve ventilation',
    colorClass: 'bg-purple-600'
  }
];

export function MoldIdentificationChart() {
  const [selectedMold, setSelectedMold] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredMolds = filterRisk === 'all' 
    ? moldTypes 
    : moldTypes.filter(mold => mold.riskLevel === filterRisk);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'critical' || risk === 'high') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <Info className="w-4 h-4" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 my-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Interactive Mold Identification Chart
        </h3>
        <p className="text-gray-600">
          Click on any mold type to learn about identification characteristics, health risks, and immediate actions.
        </p>
      </div>

      {/* Risk Level Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterRisk('all')}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              filterRisk === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterRisk('critical')}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              filterRisk === 'critical' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            )}
          >
            Critical Risk
          </button>
          <button
            onClick={() => setFilterRisk('high')}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              filterRisk === 'high' 
                ? 'bg-orange-600 text-white' 
                : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            )}
          >
            High Risk
          </button>
          <button
            onClick={() => setFilterRisk('moderate')}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              filterRisk === 'moderate' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
            )}
          >
            Moderate Risk
          </button>
        </div>
      </div>

      {/* Mold Type Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredMolds.map((mold) => (
          <motion.div
            key={mold.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
              'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
              selectedMold === mold.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => setSelectedMold(selectedMold === mold.id ? null : mold.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn('w-6 h-6 rounded-full border-2 border-white', mold.colorClass)} />
              <div className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border',
                getRiskColor(mold.riskLevel)
              )}>
                {getRiskIcon(mold.riskLevel)}
                {mold.riskLevel.toUpperCase()}
              </div>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-1">
              {mold.commonName || mold.name}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{mold.color}</p>
            <p className="text-xs text-gray-500">{mold.texture}</p>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">
                {mold.commonLocations.length} common locations
              </span>
              {selectedMold === mold.id ? (
                <ChevronUp className="w-4 h-4 text-blue-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Information Panel */}
      <AnimatePresence>
        {selectedMold && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-lg p-6 bg-gray-50"
          >
            {(() => {
              const mold = moldTypes.find(m => m.id === selectedMold);
              if (!mold) return null;

              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn('w-8 h-8 rounded-full border-2 border-white', mold.colorClass)} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {mold.commonName || mold.name}
                      </h3>
                      {mold.commonName && (
                        <p className="text-sm text-gray-600 italic">{mold.name}</p>
                      )}
                    </div>
                    <div className={cn(
                      'flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ml-auto',
                      getRiskColor(mold.riskLevel)
                    )}>
                      {getRiskIcon(mold.riskLevel)}
                      {mold.riskLevel.toUpperCase()} RISK
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Visual Characteristics */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Visual ID</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Color:</span>
                          <p className="text-gray-600">{mold.color}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Texture:</span>
                          <p className="text-gray-600">{mold.texture}</p>
                        </div>
                      </div>
                    </div>

                    {/* Common Locations */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Home className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">Found In</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {mold.commonLocations.map((location, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {location}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Characteristics */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wind className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-gray-900">Key Signs</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {mold.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Health Risks */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <h4 className="font-semibold text-gray-900">Health Risks</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {mold.healthRisks.map((risk, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Immediate Action */}
                  <div className={cn(
                    'mt-6 p-4 rounded-lg border-2',
                    mold.riskLevel === 'critical' ? 'bg-red-50 border-red-200' :
                    mold.riskLevel === 'high' ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  )}>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Immediate Action Required
                    </h4>
                    <p className="text-gray-700">{mold.immediateAction}</p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Reference */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Quick Safety Reminders</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Never touch mold</span>
              <p className="text-gray-600">Always wear gloves and avoid direct contact</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Wind className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Don't disturb large areas</span>
              <p className="text-gray-600">Can release dangerous amounts of spores</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Droplets className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Address moisture first</span>
              <p className="text-gray-600">Mold will return without fixing water source</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
