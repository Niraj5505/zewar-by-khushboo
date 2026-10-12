import React, { useState } from 'react';
import { Ruler, Info, Check } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('rings'); // 'rings' | 'bracelets' | 'necklaces'

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      title="Jewellery Size & Fit Guide"
      description="Find your accurate dimensions for rings, bangles, and necklaces."
    >
      <div className="space-y-6 pt-2">
        {/* Navigation Tabs */}
        <div className="flex border-b border-espresso/15">
          {[
            { id: 'rings', label: 'Rings (IN / US / UK)' },
            { id: 'bracelets', label: 'Bangles & Bracelets' },
            { id: 'necklaces', label: 'Necklace Lengths' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 px-3 sm:px-4 text-xs uppercase tracking-wider font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-espresso font-bold'
                  : 'text-espresso/50 hover:text-espresso'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-champagne" />
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: RINGS */}
        {activeTab === 'rings' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-espresso/15">
                <thead className="bg-sand/40 font-semibold text-espresso uppercase">
                  <tr>
                    <th className="p-2.5 border-b border-espresso/15">Indian Size</th>
                    <th className="p-2.5 border-b border-espresso/15">Inside Diameter (mm)</th>
                    <th className="p-2.5 border-b border-espresso/15">US Size</th>
                    <th className="p-2.5 border-b border-espresso/15">UK Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-espresso/10 font-sans">
                  <tr>
                    <td className="p-2.5 font-semibold">10</td>
                    <td className="p-2.5">15.9 mm</td>
                    <td className="p-2.5">5.5</td>
                    <td className="p-2.5">K</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">12</td>
                    <td className="p-2.5">16.5 mm</td>
                    <td className="p-2.5">6</td>
                    <td className="p-2.5">M</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">14</td>
                    <td className="p-2.5">17.2 mm</td>
                    <td className="p-2.5">7</td>
                    <td className="p-2.5">O</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">16</td>
                    <td className="p-2.5">17.8 mm</td>
                    <td className="p-2.5">8</td>
                    <td className="p-2.5">Q</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">18</td>
                    <td className="p-2.5">18.5 mm</td>
                    <td className="p-2.5">9</td>
                    <td className="p-2.5">S</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-sand/20 border border-espresso/10 rounded-[2px] text-xs space-y-1 text-espresso/80">
              <p className="font-semibold text-espresso flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-champagne-dark" />
                <span>How to Measure Ring Size:</span>
              </p>
              <p>Wrap a thin strip of paper or string around the base of your finger. Mark where the ends meet, measure in millimeters with a ruler, and match with the inside circumference chart.</p>
            </div>
          </div>
        )}

        {/* TAB 2: BRACELETS */}
        {activeTab === 'bracelets' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-espresso/15">
                <thead className="bg-sand/40 font-semibold text-espresso uppercase">
                  <tr>
                    <th className="p-2.5 border-b border-espresso/15">Indian Bangle Size</th>
                    <th className="p-2.5 border-b border-espresso/15">Inner Diameter (Inches)</th>
                    <th className="p-2.5 border-b border-espresso/15">Inner Diameter (mm)</th>
                    <th className="p-2.5 border-b border-espresso/15">Fit Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-espresso/10 font-sans">
                  <tr>
                    <td className="p-2.5 font-semibold">2.4</td>
                    <td className="p-2.5">2.25 inches</td>
                    <td className="p-2.5">57.2 mm</td>
                    <td className="p-2.5">Petite / Small</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">2.6</td>
                    <td className="p-2.5">2.37 inches</td>
                    <td className="p-2.5">60.3 mm</td>
                    <td className="p-2.5">Standard / Medium</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">2.8</td>
                    <td className="p-2.5">2.50 inches</td>
                    <td className="p-2.5">63.5 mm</td>
                    <td className="p-2.5">Comfort / Large</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-espresso/70">
              *Note: Most Zewar by Khushboo handcrafted Kundan bracelets feature a discreet side hinge lock with safety screw, allowing comfortable wear across sizes 2.4 through 2.8.
            </p>
          </div>
        )}

        {/* TAB 3: NECKLACES */}
        {activeTab === 'necklaces' && (
          <div className="space-y-3 text-xs text-espresso/80">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-brandWhite border border-espresso/10 rounded-[2px] space-y-1">
                <strong className="text-espresso block font-serif text-sm">Choker (14–16")</strong>
                <p className="text-[11px] text-espresso/70">Sits snug at the collarbone. Perfect for sweetheart and high-neck festive blouses.</p>
              </div>
              <div className="p-3 bg-brandWhite border border-espresso/10 rounded-[2px] space-y-1">
                <strong className="text-espresso block font-serif text-sm">Princess (17–19")</strong>
                <p className="text-[11px] text-espresso/70">Sits just below the collarbone. Versatile for both ethnic and fusion sarees.</p>
              </div>
              <div className="p-3 bg-brandWhite border border-espresso/10 rounded-[2px] space-y-1">
                <strong className="text-espresso block font-serif text-sm">Rani Haar (24–30")</strong>
                <p className="text-[11px] text-espresso/70">Extended layered necklace ideal for bridal styling and layered choker pairings.</p>
              </div>
            </div>
            <p className="text-[11px] text-espresso/60 pt-2">
              All our handcrafted chokers come with an adjustable silk/zari cord (dori) that allows free personalization of length.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
