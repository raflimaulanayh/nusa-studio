'use client'

import type { PricingTier, ServicePackage } from '@/data/pricing'
import { Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'

interface ServiceEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: ServicePackage | null
  onSave: (updatedService: ServicePackage) => void
}

const ICON_OPTIONS = ['Camera', 'Smartphone', 'PenTool', 'Monitor']

export function ServiceEditDialog({ open, onOpenChange, service, onSave }: ServiceEditDialogProps) {
  const [formData, setFormData] = useState<ServicePackage | null>(null)

  useEffect(() => {
    if (service) {
      setFormData(JSON.parse(JSON.stringify(service)))
    }
  }, [service])

  if (!formData) return null

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  const updateTier = (index: number, updates: Partial<PricingTier>) => {
    const newTiers = [...formData.tiers]
    newTiers[index] = { ...newTiers[index], ...updates }
    setFormData({ ...formData, tiers: newTiers })
  }

  const addTier = () => {
    setFormData({
      ...formData,
      tiers: [
        ...formData.tiers,
        {
          name: '',
          price: '',
          features: [''],
          highlight: false
        }
      ]
    })
  }

  const removeTier = (index: number) => {
    const newTiers = formData.tiers.filter((_, i) => i !== index)
    setFormData({ ...formData, tiers: newTiers })
  }

  const addFeature = (tierIndex: number) => {
    const newTiers = [...formData.tiers]
    newTiers[tierIndex].features.push('')
    setFormData({ ...formData, tiers: newTiers })
  }

  const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
    const newTiers = [...formData.tiers]
    newTiers[tierIndex].features[featureIndex] = value
    setFormData({ ...formData, tiers: newTiers })
  }

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const newTiers = [...formData.tiers]
    newTiers[tierIndex].features = newTiers[tierIndex].features.filter((_, i) => i !== featureIndex)
    setFormData({ ...formData, tiers: newTiers })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Service Package</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Service Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase">Pricing Tiers</h3>
              <Button type="button" variant="outline" size="sm" onClick={addTier}>
                <Plus className="h-4 w-4" />
                Add Tier
              </Button>
            </div>

            <div className="space-y-4">
              {formData.tiers.map((tier, tierIndex) => (
                <div key={tierIndex} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-4 flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Tier {tierIndex + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTier(tierIndex)}
                      className="rounded p-1 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      title="Remove tier"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Package Name</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTier(tierIndex, { name: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => updateTier(tierIndex, { price: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`highlight-${tierIndex}`}
                        checked={tier.highlight || false}
                        onChange={(e) => updateTier(tierIndex, { highlight: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <label htmlFor={`highlight-${tierIndex}`} className="text-sm font-medium text-gray-700">
                        Mark as Recommended
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Features</label>
                      <button
                        type="button"
                        onClick={() => addFeature(tierIndex)}
                        className="text-xs text-primary hover:underline"
                      >
                        + Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(tierIndex, featureIndex, e.target.value)}
                            className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            placeholder="Feature description"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(tierIndex, featureIndex)}
                            className="rounded p-1 text-gray-600 hover:bg-red-50 hover:text-red-600"
                            title="Remove feature"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
