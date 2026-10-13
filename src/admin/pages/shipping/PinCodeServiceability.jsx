import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, XCircle, Save, AlertCircle } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { FormField } from '../../components/FormField';
import { useCmsStore } from '../../lib/cmsStore';

export const PinCodeServiceability = () => {
  const pincodes = useCmsStore((s) => s.pincodes);
  const updatePincodes = useCmsStore((s) => s.updatePincodes);

  const [mode, setMode] = useState(pincodes?.mode || 'all_india');
  const [whitelistInput, setWhitelistInput] = useState(
    pincodes?.serviceableList?.join(', ') || ''
  );
  const [blacklistInput, setBlacklistInput] = useState(
    pincodes?.blacklistedList?.join(', ') || ''
  );
  const [metroDays, setMetroDays] = useState(pincodes?.estimatedDays?.metro || '2-3 business days');
  const [nonMetroDays, setNonMetroDays] = useState(pincodes?.estimatedDays?.nonMetro || '4-6 business days');

  // Test field
  const [testPin, setTestPin] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      mode,
      serviceableList: whitelistInput.split(',').map((p) => p.trim()).filter(Boolean),
      blacklistedList: blacklistInput.split(',').map((p) => p.trim()).filter(Boolean),
      estimatedDays: {
        metro: metroDays,
        nonMetro: nonMetroDays,
      },
    };
    updatePincodes(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCheckPin = (e) => {
    e.preventDefault();
    const pin = testPin.trim();
    if (!pin || pin.length < 6) return;

    const blacklisted = blacklistInput.split(',').map((p) => p.trim());
    const whitelisted = whitelistInput.split(',').map((p) => p.trim());

    if (mode === 'blacklist' && blacklisted.includes(pin)) {
      setTestResult({ serviceable: false, reason: 'PIN code is currently on exclusion list' });
      return;
    }

    if (mode === 'whitelist' && !whitelisted.includes(pin)) {
      setTestResult({ serviceable: false, reason: 'PIN code not in active serviceable whitelist' });
      return;
    }

    const isMetro = ['400', '110', '560', '700', '600', '500'].some((prefix) =>
      pin.startsWith(prefix)
    );

    setTestResult({
      serviceable: true,
      timeline: isMetro ? metroDays : nonMetroDays,
      courier: isMetro ? 'BlueDart Air Express' : 'Delhivery Surface',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PageHeader
        title="Pin Code Serviceability"
        description="Manage serviceable delivery zones across India, courier routing exclusions, and expected delivery SLAs."
      >
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 bg-champagne hover:bg-champagne-hover text-espresso font-semibold text-xs uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Updated Live!' : 'Save PIN Rules'}</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Settings Form (8 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-8 bg-white border border-sand-border/80 rounded-[4px] p-6 shadow-subtle space-y-6">
          <div>
            <h3 className="font-serif text-base font-medium text-espresso pb-2 border-b border-sand-border/70">
              Serviceability Coverage Mode
            </h3>
            <p className="text-xs text-espresso/60 mb-3">
              Choose how customer postal codes are verified during checkout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3 border rounded cursor-pointer transition-all ${
                  mode === 'all_india'
                    ? 'border-champagne bg-champagne/10 ring-1 ring-champagne'
                    : 'border-sand-border hover:bg-ivory/50'
                }`}
              >
                <input
                  type="radio"
                  name="pinMode"
                  value="all_india"
                  checked={mode === 'all_india'}
                  onChange={() => setMode('all_india')}
                  className="hidden"
                />
                <span className="font-semibold text-xs text-espresso block">All India</span>
                <span className="text-[11px] text-espresso/60 mt-0.5 block">
                  Deliver to all valid 6-digit Indian PIN codes.
                </span>
              </label>

              <label
                className={`p-3 border rounded cursor-pointer transition-all ${
                  mode === 'whitelist'
                    ? 'border-champagne bg-champagne/10 ring-1 ring-champagne'
                    : 'border-sand-border hover:bg-ivory/50'
                }`}
              >
                <input
                  type="radio"
                  name="pinMode"
                  value="whitelist"
                  checked={mode === 'whitelist'}
                  onChange={() => setMode('whitelist')}
                  className="hidden"
                />
                <span className="font-semibold text-xs text-espresso block">Whitelist Only</span>
                <span className="text-[11px] text-espresso/60 mt-0.5 block">
                  Only deliver to explicitly listed PIN codes.
                </span>
              </label>

              <label
                className={`p-3 border rounded cursor-pointer transition-all ${
                  mode === 'blacklist'
                    ? 'border-champagne bg-champagne/10 ring-1 ring-champagne'
                    : 'border-sand-border hover:bg-ivory/50'
                }`}
              >
                <input
                  type="radio"
                  name="pinMode"
                  value="blacklist"
                  checked={mode === 'blacklist'}
                  onChange={() => setMode('blacklist')}
                  className="hidden"
                />
                <span className="font-semibold text-xs text-espresso block">Blacklist Exclusions</span>
                <span className="text-[11px] text-espresso/60 mt-0.5 block">
                  Deliver everywhere except excluded remote areas.
                </span>
              </label>
            </div>
          </div>

          {mode === 'whitelist' && (
            <FormField label="Serviceable PIN Codes (Comma Separated)" helperText="Paste or list all active delivery PIN codes">
              <textarea
                rows={3}
                value={whitelistInput}
                onChange={(e) => setWhitelistInput(e.target.value)}
                placeholder="400001, 400050, 110001, 560001"
                className="w-full p-2.5 border border-sand-border rounded text-xs font-mono outline-none"
              />
            </FormField>
          )}

          {mode === 'blacklist' && (
            <FormField label="Blacklisted PIN Codes (Comma Separated)" helperText="Excluded codes where couriers do not deliver insured valuables">
              <textarea
                rows={3}
                value={blacklistInput}
                onChange={(e) => setBlacklistInput(e.target.value)}
                placeholder="790001, 190001"
                className="w-full p-2.5 border border-sand-border rounded text-xs font-mono outline-none"
              />
            </FormField>
          )}

          <div className="pt-4 border-t border-sand-border/70 space-y-4">
            <h3 className="font-serif text-sm font-medium text-espresso">
              Estimated Delivery Timelines (SLAs)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Metro Cities (Mumbai, Delhi, Bengaluru, etc.)">
                <input
                  type="text"
                  value={metroDays}
                  onChange={(e) => setMetroDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                />
              </FormField>
              <FormField label="Rest of India / Non-Metro">
                <input
                  type="text"
                  value={nonMetroDays}
                  onChange={(e) => setNonMetroDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-sand-border rounded outline-none"
                />
              </FormField>
            </div>
          </div>
        </form>

        {/* Live Test Checker Card (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-sand-border/80 rounded-[4px] p-5 shadow-subtle space-y-4 text-xs">
          <div className="pb-2 border-b border-sand-border/70 flex items-center gap-2">
            <Search className="w-4 h-4 text-champagne-dark" />
            <h3 className="font-serif font-medium text-sm text-espresso">
              Test Postal Serviceability
            </h3>
          </div>
          <p className="text-espresso/60 text-[11px] leading-relaxed">
            Verify if a specific customer PIN code is serviceable and view the estimated transit window.
          </p>

          <form onSubmit={handleCheckPin} className="space-y-2">
            <input
              type="text"
              maxLength={6}
              value={testPin}
              onChange={(e) => setTestPin(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit PIN (e.g. 400050)"
              className="w-full px-3 py-2 border border-sand-border rounded font-mono text-xs outline-none focus:ring-1 focus:ring-champagne"
            />
            <button
              type="submit"
              className="w-full py-2 bg-espresso hover:bg-espresso-light text-ivory font-semibold text-xs uppercase tracking-wider rounded-[2px]"
            >
              Verify PIN Code
            </button>
          </form>

          {testResult && (
            <div
              className={`p-3 rounded border space-y-1.5 ${
                testResult.serviceable
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                {testResult.serviceable ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>Serviceable for Valuables Transit</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-700" />
                    <span>Non-Serviceable Postal Code</span>
                  </>
                )}
              </div>

              {testResult.serviceable ? (
                <div className="text-[11px] space-y-0.5 pt-1 border-t border-emerald-200/60">
                  <p>Transit SLA: <strong>{testResult.timeline}</strong></p>
                  <p>Partner: <strong>{testResult.courier}</strong></p>
                </div>
              ) : (
                <p className="text-[11px] pt-1">{testResult.reason}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
