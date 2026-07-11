'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const sku = formData.get('sku') as string
  const category = formData.get('category') as string
  const quantityOnHand = Number(formData.get('quantityOnHand'))
  const lowStockThreshold = Number(formData.get('lowStockThreshold'))

  if (!name || !sku || !category) {
    throw new Error('Name, SKU, and category are required')
  }

  await prisma.product.create({
    data: {
      name,
      sku,
      category,
      quantityOnHand: quantityOnHand || 0,
      lowStockThreshold: lowStockThreshold || 10,
      userId: Number(session.user.id),
    },
  })

  redirect('/dashboard')
}

export async function updateProduct(id: number, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const sku = formData.get('sku') as string
  const category = formData.get('category') as string
  const quantityOnHand = Number(formData.get('quantityOnHand'))
  const lowStockThreshold = Number(formData.get('lowStockThreshold'))

  // Make sure this product actually belongs to the logged-in user
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product || product.userId !== Number(session.user.id)) {
    throw new Error('Not authorized')
  }

  await prisma.product.update({
    where: { id },
    data: { name, sku, category, quantityOnHand, lowStockThreshold },
  })

  redirect('/dashboard')
}

export async function deleteProduct(id: number) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const product = await prisma.product.findUnique({ where: { id } })
  if (!product || product.userId !== Number(session.user.id)) {
    throw new Error('Not authorized')
  }

  await prisma.product.delete({ where: { id } })

  redirect('/dashboard')
}