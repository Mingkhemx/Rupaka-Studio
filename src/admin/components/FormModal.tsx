import { motion, AnimatePresence } from 'motion/react';
import { X, Star } from 'lucide-react';
import { useState } from 'react';
import { FormFieldConfig } from '../types';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  fields: FormFieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function FormModal({
  isOpen,
  title,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  isLoading = false
}: FormModalProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is corrected
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = values[field.name];

      // Required validation
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Custom validation
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-line-grey px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-dark">{title}</h2>
              <button
                onClick={onCancel}
                className="p-2 hover:bg-soft-card rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {fields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange ${
                        errors[field.name]
                          ? 'border-red-500'
                          : 'border-line-grey focus:border-transparent'
                      }`}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange resize-none ${
                        errors[field.name]
                          ? 'border-red-500'
                          : 'border-line-grey focus:border-transparent'
                      }`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={values[field.name] || ''}
                      onChange={e => handleChange(field.name, e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange ${
                        errors[field.name]
                          ? 'border-red-500'
                          : 'border-line-grey focus:border-transparent'
                      }`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'rating' ? (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange(field.name, star)}
                          className="transition-colors"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (values[field.name] || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      name={field.name}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            handleChange(field.name, event.target?.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange ${
                        errors[field.name]
                          ? 'border-red-500'
                          : 'border-line-grey focus:border-transparent'
                      }`}
                    />
                  ) : field.type === 'array' ? (
                    <div className="space-y-2">
                      {(values[field.name] || []).map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={e => {
                              const newArray = [...(values[field.name] || [])];
                              newArray[idx] = e.target.value;
                              handleChange(field.name, newArray);
                            }}
                            className="flex-1 px-4 py-2.5 border border-line-grey rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newArray = (values[field.name] || []).filter((_: any, i: number) => i !== idx);
                              handleChange(field.name, newArray);
                            }}
                            className="px-3 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          handleChange(field.name, [...(values[field.name] || []), '']);
                        }}
                        className="w-full px-4 py-2.5 border border-dashed border-line-grey rounded-lg text-muted-grey hover:bg-soft-card transition-colors"
                      >
                        + Add Item
                      </button>
                    </div>
                  ) : null}

                  {errors[field.name] && (
                    <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-line-grey">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isSubmitting || isLoading}
                  className="flex-1 px-4 py-2.5 bg-soft-card hover:bg-line-grey text-text-dark rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 px-4 py-2.5 bg-accent-orange hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting || isLoading ? 'Saving...' : submitLabel}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
