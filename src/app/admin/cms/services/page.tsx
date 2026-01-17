'use client'

import { SERVICE_PACKAGES, type ServicePackage } from '@/data/pricing'
import { Eye, FileEdit, MoreVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/ui/dropdown-menu'
import { DeleteServiceDialog } from '@/components/organisms/admin/dialogs/delete-service-dialog'
import { ServiceCreateDialog } from '@/components/organisms/admin/dialogs/service-create-dialog'
import { ServiceDetailDialog } from '@/components/organisms/admin/dialogs/service-detail-dialog'
import { ServiceEditDialog } from '@/components/organisms/admin/dialogs/service-edit-dialog'

import { cn } from '@/utils/cn'

export default function ServicesPage() {
  const [services, setServices] = useState<ServicePackage[]>(SERVICE_PACKAGES)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'service' | 'tier'; name: string } | null>(null)

  const filteredServices = selectedCategory ? services.filter((pkg) => pkg.id === selectedCategory) : services

  const handleCreateService = (newService: ServicePackage) => {
    setServices([...services, newService])
    toast.success('Service package created successfully')
  }

  const handleDeleteService = () => {
    if (selectedService) {
      setServices(services.filter((s) => s.id !== selectedService.id))
      toast.success('Service package deleted successfully')
      setSelectedService(null)
    }
  }

  const handleDeleteTier = (serviceId: string, tierIndex: number) => {
    const service = services.find((s) => s.id === serviceId)
    if (!service) return

    const tierName = service.tiers[tierIndex].name
    setDeleteTarget({ type: 'tier', name: tierName })
    setSelectedService(service)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteTier = () => {
    if (selectedService) {
      const updatedService = {
        ...selectedService,
        tiers: selectedService.tiers.filter(
          (_, i) => i !== selectedService.tiers.findIndex((t) => t.name === deleteTarget?.name)
        )
      }
      setServices(services.map((s) => (s.id === selectedService.id ? updatedService : s)))
      toast.success('Pricing tier deleted successfully')
      setDeleteTarget(null)
    }
  }

  const handleSaveService = (updatedService: ServicePackage) => {
    setServices(services.map((s) => (s.id === updatedService.id ? updatedService : s)))
    toast.success('Service package updated successfully')
  }

  const openDeleteDialog = (service: ServicePackage) => {
    setSelectedService(service)
    setDeleteTarget({ type: 'service', name: service.title })
    setDeleteDialogOpen(true)
  }

  const openDetailDialog = (service: ServicePackage) => {
    setSelectedService(service)
    setDetailDialogOpen(true)
  }

  const openEditDialog = (service: ServicePackage) => {
    setSelectedService(service)
    setEditDialogOpen(true)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary sm:text-3xl">Services Management</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:mt-2">Kelola paket layanan yang ditampilkan di website</p>
        </div>
        <Button className="w-full gap-2 sm:w-fit" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add New Package
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
            !selectedCategory
              ? 'border-primary bg-primary text-white shadow-md'
              : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50'
          )}
        >
          All Services
        </button>
        {services.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedCategory(pkg.id)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
              selectedCategory === pkg.id
                ? 'border-primary bg-primary text-white shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50'
            )}
          >
            {pkg.title}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {filteredServices.map((service) => (
          <div key={service.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => openDetailDialog(service)}
                    className="text-lg font-semibold text-primary hover:underline sm:text-xl"
                  >
                    {service.title}
                  </button>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                    {service.id?.replaceAll('-', ' ')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
              </div>
              <div className="flex gap-2 sm:shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-sm sm:flex-initial"
                  onClick={() => openEditDialog(service)}
                >
                  <FileEdit className="h-4 w-4" />
                  <span className="sm:inline">Edit</span>
                </Button>
                <Button
                  variant="outline-red"
                  size="sm"
                  className="flex-1 text-sm sm:flex-initial"
                  onClick={() => openDeleteDialog(service)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sm:inline">Delete</span>
                </Button>
              </div>
            </div>

            {/* Card Layout - All Screens */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.tiers.map((tier, index) => (
                <div
                  key={index}
                  className="relative rounded-lg border border-gray-200 bg-gray-50 p-4 pb-12 transition-all hover:shadow-md"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    {tier.highlight && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-primary">{tier.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                    <span className="text-sm text-gray-600">{tier.features.length} features</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute right-3 bottom-3 rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
                        <MoreVertical className="h-5 w-5" />
                        <span className="sr-only">Actions</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetailDialog(service)}>
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditDialog(service)}>
                        <FileEdit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteTier(service.id, index)}
                        className="text-red-600 focus:bg-red-50 focus:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ServiceCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSave={handleCreateService} />

      <DeleteServiceDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        serviceName={deleteTarget?.name || ''}
        onConfirm={deleteTarget?.type === 'service' ? handleDeleteService : confirmDeleteTier}
        type={deleteTarget?.type || 'service'}
      />

      <ServiceDetailDialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen} service={selectedService} />

      <ServiceEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        service={selectedService}
        onSave={handleSaveService}
      />
    </div>
  )
}
