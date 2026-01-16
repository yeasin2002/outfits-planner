import { ErrorView, Label, TextField } from "heroui-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledView = withUniwind(View);

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  className?: string;
  inputClassName?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isRequired = false,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  className,
  inputClassName = "bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-base text-gray-800",
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <StyledView className={className}>
          <Label isRequired={isRequired} isInvalid={!!error} className="mb-2">
            <Label.Text className="text-sm text-gray-700">{label}</Label.Text>
          </Label>
          <TextField isInvalid={!!error}>
            <TextField.Input
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              className={inputClassName}
              style={{ color: "#1F2937" }}
            />
          </TextField>
          {error && (
            <ErrorView isInvalid className="mt-1">
              {error.message}
            </ErrorView>
          )}
        </StyledView>
      )}
    />
  );
}
