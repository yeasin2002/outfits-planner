import { ErrorView, Label, TextField } from "heroui-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledView = withUniwind(View);

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelStyle?: object;
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
  labelClassName,
  labelStyle,
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <StyledView className={className}>
          {label && (
            <Label isRequired={isRequired} isInvalid={!!error}>
              <Label.Text className={labelClassName || "text-sm text-gray-700"} style={labelStyle}>
                {label}
              </Label.Text>
            </Label>
          )}
          <TextField isInvalid={!!error}>
            <TextField.Input
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#828282"
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              className={inputClassName}
              style={{
                color: "#828282",
                fontFamily: "Lora_400Regular",
                fontSize: 12,
                lineHeight: 14.4,
              }}
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
