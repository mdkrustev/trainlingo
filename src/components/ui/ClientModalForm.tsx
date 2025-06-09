"use client";

import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import { useTranslations } from "@/hooks/useTranslations";
import { Input, Select } from "antd";
import type { ChangeEvent } from "react";

type ModalType = "page" | "window";


export type NotificationType = 'success' | 'info' | 'warning' | 'error';


interface FieldConfig {
  label?: string;
  type?: string;
  value?: string | number | null;
  required?: boolean;
  placeholder?: string;
  data?: Array<{ value: string | number; label: string }>;
}

interface ModalFormProps {
  type: ModalType;
  fields: Record<string, FieldConfig>;
  url: string;
  open: boolean;
  onClose: () => void;
  title?: string,
  openNotificationWithIcon: (type: NotificationType, message: string, description?: string) => void
}

// Тип за стойности във формата
interface FormValues {
  [key: string]: string | number | null | undefined;
}

// Тип за грешки
interface FormErrors {
  [key: string]: string | null;
}

const ClientModalForm: React.FC<ModalFormProps> = ({
  type,
  fields,
  url,
  open,
  onClose,
  title,
  openNotificationWithIcon
}) => {
  const { t } = useTranslations();
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});



  // Инициализираме стойностите при отваряне на модала
  useEffect(() => {
    if (!open) return;

    const initialValues = Object.entries(fields).reduce((acc, [name, field]) => {
      acc[name] = field.value !== undefined ? field.value : "";
      return acc;
    }, {} as Record<string, string | number | null>);
    setFormValues(initialValues);
  }, [open, fields]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    Object.entries(fields).forEach(([name, field]) => {
      const value = formValues[name];

      if (field.required && (!value || (typeof value === "string" && value.trim() === ""))) {
        errors[name] = t.form.errors.required;
        isValid = false;
      }

      if (field.type === "email" && value && typeof value === "string" && !validateEmail(value)) {
        errors[name] = t.form.errors.email;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (name: string, value: string | number | null) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;



    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        openNotificationWithIcon('success', t.form.dataSent)
        onClose()
      } else {
        openNotificationWithIcon('error', t.form.errorSending)
      }
    } catch (error) {
      console.log(error)
      openNotificationWithIcon('error', t.form.errorOccurred)
      onClose()
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      {Object.entries(fields).map(([name, field]) => {
        const isSelect = !!(field.data && Array.isArray(field.data));
        const error = formErrors[name];

        return (
          <div key={name} className="flex flex-col gap-1">
            <label htmlFor={name} className="block mb-1 font-medium">
              {field.label || name}
            </label>

            {/* Select поле */}
            {isSelect && (
              <>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Избери..."
                  showSearch
                  filterOption={(input: string, option?: { value: string | number; label: React.ReactNode }) => {
                    const optionLabel = typeof option?.label === "string" ? option.label : "";
                    return optionLabel.toLowerCase().includes(input.toLowerCase());
                  }}
                  onChange={(value) => handleChange(name, value)}
                  value={formValues[name] ?? undefined}
                >
                  {!field.required && (
                    <Select.Option value="">{t.form.select}</Select.Option>
                  )}
                  {(field.data || []).map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </>
            )}

            {/* Input поле */}
            {!isSelect && (
              <>
                <Input
                  id={name}
                  name={name}
                  type={field.type || "text"}
                  value={formValues[name] ?? ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value)}
                  required={field.required || false}
                  placeholder={field.placeholder || ""}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </>
            )}
          </div>
        );
      })}

      {/* Бутони */}
      <div className="flex justify-end gap-2 mt-4">
        <CustomButton onClick={onClose} type="default" size={14}>
          {t.form.cancel}
        </CustomButton>
        <CustomButton type="primary" size={14} onClick={handleSave}>
          {t.form.save}
        </CustomButton>
      </div>
    </div>
  );

  // Модален прозорец
  if (type === "window") {
    if (!open) {
      return null;
    }
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
          {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
          {renderForm()}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
      </div>
    );
  }

  // В страницата
  return <div className="mb-6">{renderForm()}</div>;
};

export default ClientModalForm;