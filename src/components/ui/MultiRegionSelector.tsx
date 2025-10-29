import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Region {
    name: string;
    code: string;
}

interface RegionGroup {
    [key: string]: Region[];
}

interface MultiRegionSelectorProps {
    regionGroups: RegionGroup;
    selectedRegions: string[];
    onRegionsChange: (regions: string[]) => void;
    placeholder?: string;
    className?: string;
    error?: boolean;
}

const MultiRegionSelector: React.FC<MultiRegionSelectorProps> = ({
    regionGroups,
    selectedRegions,
    onRegionsChange,
    placeholder = "Select regions...",
    className = "",
    error = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Get all regions as a flat array
    const allRegions = Object.values(regionGroups).flat();

    // Filter regions based on search term
    const filteredRegions = allRegions.filter(region =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 0);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredRegions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredRegions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredRegions.length) {
                    handleRegionToggle(filteredRegions[highlightedIndex].code);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchTerm('');
                setHighlightedIndex(-1);
                break;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 0);
        }
    }, [isOpen]);

    const handleRegionToggle = (regionCode: string) => {
        const newRegions = selectedRegions.includes(regionCode)
            ? selectedRegions.filter(r => r !== regionCode)
            : [...selectedRegions, regionCode];

        onRegionsChange(newRegions);
    };

    const clearAllSelections = () => {
        onRegionsChange([]);
    };

    const getDisplayText = () => {
        if (selectedRegions.length === 0) return placeholder;
        if (selectedRegions.length === 1) {
            // Find the region name from code
            const region = allRegions.find(r => r.code === selectedRegions[0]);
            return region ? region.name : selectedRegions[0];
        }
        return `${selectedRegions.length} regions selected`;
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={`
          w-full px-4 py-3 text-left border rounded-xl
          hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500
          transition-all duration-200 flex items-center justify-between
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'}
          ${isOpen ? 'ring-2 ring-slate-500/20 border-slate-500' : ''}
          ${selectedRegions.length === 0 ? 'text-slate-500' : 'text-slate-900'}
        `}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{getDisplayText()}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {selectedRegions.length > 0 && (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                clearAllSelections();
                            }}
                            className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clearAllSelections();
                                }
                            }}
                            aria-label="Clear all selections"
                        >
                            <X className="w-3 h-3 text-slate-400" />
                        </div>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                </div>
            </button>

            {/* Selected Regions Pills */}
            {selectedRegions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedRegions.map(regionCode => {
                        const region = allRegions.find(r => r.code === regionCode);
                        const displayName = region ? region.name : regionCode;

                        return (
                            <motion.div
                                key={regionCode}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                            >
                                <span className="truncate max-w-[120px]">{displayName}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRegionToggle(regionCode)}
                                    className="hover:bg-slate-200 rounded-full p-0.5 transition-colors"
                                    aria-label={`Remove ${displayName}`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="p-3 border-b border-slate-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search regions..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setHighlightedIndex(-1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500"
                                />
                            </div>
                        </div>

                        {/* Regions List */}
                        <div className="max-h-64 overflow-y-auto">
                            {searchTerm ? (
                                // Filtered search results
                                <div className="p-2">
                                    {filteredRegions.map((region, index) => {
                                        const isSelected = selectedRegions.includes(region.code);
                                        const isHighlighted = index === highlightedIndex;

                                        return (
                                            <button
                                                key={region.code}
                                                type="button"
                                                onClick={() => handleRegionToggle(region.code)}
                                                className={`
                          w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 ease-in-out
                          flex items-center justify-between
                          ${isSelected
                                                        ? 'bg-slate-100 text-slate-700'
                                                        : isHighlighted
                                                            ? 'bg-slate-50 text-slate-900'
                                                            : 'text-slate-700 hover:bg-slate-50'
                                                    }
                        `}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-mono text-slate-600">
                                                        {region.code.split('-')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{region.name}</div>
                                                        <div className="text-xs text-slate-500">{region.code}</div>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <Check className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                // Grouped regions
                                Object.entries(regionGroups).map(([groupName, regions]) => (
                                    <div key={groupName}>
                                        <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                                            {groupName}
                                        </div>
                                        <div className="p-2">
                                            {regions.map(region => {
                                                const isSelected = selectedRegions.includes(region.code);

                                                return (
                                                    <button
                                                        key={region.code}
                                                        type="button"
                                                        onClick={() => handleRegionToggle(region.code)}
                                                        className={`
                              w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 ease-in-out
                              flex items-center justify-between
                              ${isSelected
                                                                ? 'bg-slate-100 text-slate-700'
                                                                : 'text-slate-700 hover:bg-slate-50'
                                                            }
                            `}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-6 bg-slate-100 rounded flex items-center justify-center text-xs font-mono text-slate-600">
                                                                {region.code.split('-')[0].toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{region.name}</div>
                                                                <div className="text-xs text-slate-500">{region.code}</div>
                                                            </div>
                                                        </div>
                                                        {isSelected && (
                                                            <Check className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            )}

                            {filteredRegions.length === 0 && (
                                <div className="px-4 py-8 text-center text-slate-500">
                                    <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm">No regions found</p>
                                    <p className="text-xs text-slate-400">Try adjusting your search</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MultiRegionSelector;