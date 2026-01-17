import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { CheckedIcon } from '@/components/atoms/icons'
import { FormControl, FieldValue, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Hint } from '@/components/atoms/ui/hint'
import { Input as FormInput } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/utils'

interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  control?: Control<TFieldValues>
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  type?: string
  hint?: string | React.ReactNode
  isVerified?: boolean
  verifiedMessage?: string
  disabled?: boolean
  defaultValue?: string
}

export const Input = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  placeholder,
  label,
  required = false,
  className,
  hint,
  type,
  isVerified,
  verifiedMessage = 'Email verified success',
  defaultValue,
  disabled
}: InputProps<TFieldValues>) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <FieldValue
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn('space-y-2', className)}>
          <FormItem
            className={cn(
              'rounded-md border-2 pt-2',
              isFocus ? 'border-secondary' : 'border-gray-100',
              disabled ? 'bg-gray-50' : 'bg-white'
            )}
          >
            <Label className="block px-3">
              {label} {required && <span> *</span>}
            </Label>
            <FormControl>
              <FormInput
                type={type}
                placeholder={placeholder}
                {...field}
                onBlur={() => setIsFocus(false)}
                onFocus={(e) => {
                  setIsFocus(true)
                  if (type == 'number') {
                    e.target.addEventListener(
                      'wheel',
                      function (e) {
                        e.preventDefault()
                      },
                      { passive: false }
                    )
                  }
                }}
                defaultValue={defaultValue}
                disabled={disabled}
              />
            </FormControl>
          </FormItem>
          {isVerified && (
            <div className="flex items-center gap-1">
              <CheckedIcon />
              <p className="text-xs leading-tight text-green-600">{verifiedMessage}</p>
            </div>
          )}
          {hint && <Hint text={hint} />}
          <FormMessage />
        </div>
      )}
    />
  )
}
