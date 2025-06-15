import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSales, addSale } from '../services/salesService'
import type { AxiosResponse } from 'axios'

interface SalesForm {
  date: string
  wasteType: string
  weight: number
  buyer: string
  price: number
  notes: string
}

export default function Sales() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SalesForm>()
  const queryClient = useQueryClient()

  const { data: sales, isLoading, isError } = useQuery<SalesForm[]>({
    queryKey: ['sales'],
    queryFn: getSales
  })

  const mutation = useMutation<AxiosResponse, Error, SalesForm>({
    mutationFn: addSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      reset()
    }
  })

  const onSubmit = (data: SalesForm) => {
    mutation.mutate(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales</h1>
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">New Sale Entry</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Date</label>
            <input type="date" className="input" {...register('date', { required: 'Date is required' })} />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>
          <div>
            <label className="form-label">Waste Type</label>
            <input type="text" className="input" {...register('wasteType', { required: 'Waste type is required' })} />
            {errors.wasteType && <p className="text-red-500 text-sm">{errors.wasteType.message}</p>}
          </div>
          <div>
            <label className="form-label">Weight (kg)</label>
            <input type="number" step="0.01" className="input" {...register('weight', { required: 'Weight is required' })} />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
          </div>
          <div>
            <label className="form-label">Buyer</label>
            <input type="text" className="input" {...register('buyer', { required: 'Buyer is required' })} />
            {errors.buyer && <p className="text-red-500 text-sm">{errors.buyer.message}</p>}
          </div>
          <div>
            <label className="form-label">Price (₹)</label>
            <input type="number" step="0.01" className="input" {...register('price', { required: 'Price is required' })} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="form-label">Notes</label>
            <textarea className="input" {...register('notes')} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>Submit</button>
          {mutation.isError && <p className="text-red-500 text-sm">Error submitting sale.</p>}
        </form>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Sales Entries</h2>
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Error loading sales.</p>
        ) : !sales ? (
          <p className="text-gray-500">No sales entries yet.</p>
        ) : sales.length === 0 ? (
          <p className="text-gray-500">No sales entries yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sales.map((sale: SalesForm, index: number) => (
              <li key={index} className="py-3">
                <div className="flex flex-wrap gap-2">
                  <span className="font-semibold">{sale.date}</span>
                  <span>–</span>
                  <span>{sale.wasteType} ({sale.weight} kg) – Buyer: {sale.buyer} – Price: ₹{sale.price}</span>
                  {sale.notes && <span className="text-gray-500">(“{sale.notes}”)</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 