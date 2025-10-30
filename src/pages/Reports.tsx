import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Calendar, 
  FileText, 
  Download, 
  Building2,
  Search,
  Check,
  X
} from 'lucide-react';
import { MOCK_ACCOUNTS } from '../constants/accounts';
import type { ReportFormData, ReportFormErrors, DropdownOption, CustomDropdownProps } from '../interfaces/forms/reportForm.interfaces';
import { validateReportForm, getMonthOptions, getYearOptions } from '../utils/validations/reportForm.validation';



const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  icon,
  searchable = false,
  error = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-3 text-left border rounded-xl
          hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500
          transition-all duration-300 flex items-center justify-between
          transform hover:scale-[1.01] hover:shadow-md
          ${error ? 'border-red-300 bg-red-50' : 'border-slate-300 bg-white'}
          ${isOpen ? 'ring-2 ring-slate-500/20 border-slate-500 shadow-lg' : ''}
          ${!selectedOption ? 'text-slate-500' : 'text-slate-900'}
        `}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-slate-400 flex-shrink-0">
            {icon}
          </div>
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden"
          >
            {searchable && (
              <div className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-500">
                  <div className="w-8 h-8 mx-auto mb-2 text-slate-300">
                    {icon}
                  </div>
                  <p className="text-sm">No options found</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full text-left px-3 py-3 rounded-lg transition-all duration-200
                        flex items-center justify-between group
                        ${value === option.value 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'text-slate-700 hover:bg-slate-50'
                        }
                      `}
                    >
                      <span className="font-medium">{option.label}</span>
                      {value === option.value && (
                        <Check className="w-4 h-4 text-slate-600 flex-shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Reports() {
  const [formData, setFormData] = useState<ReportFormData>({
    accountId: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<ReportFormErrors>({});

  // Generate account options from mock data
  const accountOptions: DropdownOption[] = [
    { value: 'all', label: 'All Accounts' },
    ...MOCK_ACCOUNTS.map(account => ({
      value: account.AccountID,
      label: `${account.AccountName} (${account.AccountID})`
    }))
  ];

  // Generate month and year options
  const monthOptions = getMonthOptions();
  const yearOptions = getYearOptions();

  const validateFormData = () => {
    const validationResult = validateReportForm(formData);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  const handleGenerateReport = async () => {
    if (!validateFormData()) {
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to generate the report
      console.log('Generating report with data:', formData);
      
      // Show success message or download file
      alert('Report generated successfully!');
      
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearForm = () => {
    setFormData({
      accountId: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: ''
    });
    setErrors({});
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Report Generation
                </h1>
                <p className="text-lg text-slate-600 mt-1">
                  Generate comprehensive usage and cost reports for your AWS accounts
                </p>
              </div>
            </div>
          </motion.div>

          {/* Report Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg"
          >
            <div className="space-y-6">
              {/* Form Title */}
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Report Parameters</h2>
                <p className="text-slate-600">Configure your report settings and date range</p>
              </div>

              {/* General Error Display */}
              {errors.dateRange && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                >
                  <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{errors.dateRange}</p>
                </motion.div>
              )}

              {/* Account Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Account Name or ID
                </label>
                <CustomDropdown
                  options={accountOptions}
                  value={formData.accountId}
                  onChange={(value) => setFormData(prev => ({ ...prev, accountId: value }))}
                  placeholder="Select an account..."
                  icon={<Building2 className="w-4 h-4" />}
                  searchable={true}
                  error={!!errors.accountId}
                />
                {errors.accountId && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center mt-2 text-red-600 text-sm"
                  >
                    <X className="w-4 h-4 mr-1" />
                    {errors.accountId}
                  </motion.div>
                )}
              </div>

              {/* Date Range Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Start Date */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Start Date
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Month
                      </label>
                      <CustomDropdown
                        options={monthOptions}
                        value={formData.startMonth}
                        onChange={(value) => setFormData(prev => ({ ...prev, startMonth: value }))}
                        placeholder="Select month..."
                        icon={<Calendar className="w-4 h-4" />}
                        error={!!errors.startMonth}
                      />
                      {errors.startMonth && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center mt-1 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3 mr-1" />
                          {errors.startMonth}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Year
                      </label>
                      <CustomDropdown
                        options={yearOptions}
                        value={formData.startYear}
                        onChange={(value) => setFormData(prev => ({ ...prev, startYear: value }))}
                        placeholder="Select year..."
                        icon={<Calendar className="w-4 h-4" />}
                        error={!!errors.startYear}
                      />
                      {errors.startYear && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center mt-1 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3 mr-1" />
                          {errors.startYear}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    End Date
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Month
                      </label>
                      <CustomDropdown
                        options={monthOptions}
                        value={formData.endMonth}
                        onChange={(value) => setFormData(prev => ({ ...prev, endMonth: value }))}
                        placeholder="Select month..."
                        icon={<Calendar className="w-4 h-4" />}
                        error={!!errors.endMonth}
                      />
                      {errors.endMonth && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center mt-1 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3 mr-1" />
                          {errors.endMonth}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Year
                      </label>
                      <CustomDropdown
                        options={yearOptions}
                        value={formData.endYear}
                        onChange={(value) => setFormData(prev => ({ ...prev, endYear: value }))}
                        placeholder="Select year..."
                        icon={<Calendar className="w-4 h-4" />}
                        error={!!errors.endYear}
                      />
                      {errors.endYear && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center mt-1 text-red-600 text-xs"
                        >
                          <X className="w-3 h-3 mr-1" />
                          {errors.endYear}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={clearForm}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium transform hover:scale-[1.01] hover:shadow-md"
                >
                  Clear Form
                </button>
                
                <motion.button
                  type="button"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center font-medium shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Generate Report
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Report Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl border border-slate-200 p-6 sm:p-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">About Reports</h3>
                <p className="text-slate-600 leading-relaxed">
                  Generate comprehensive reports that include usage metrics, cost analysis, and resource utilization 
                  across your selected AWS accounts and time periods. Reports are generated in PDF format and 
                  include detailed breakdowns by service, region, and cost categories.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Reports;


