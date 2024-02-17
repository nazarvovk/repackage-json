import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DependenciesSchema = z.record(z.string())

export type Dependencies = z.infer<typeof DependenciesSchema>

export const PackageJsonSchema = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  description: z.string().optional(),
  main: z.string().optional(),
  scripts: z.record(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  dependencies: DependenciesSchema.optional(),
  devDependencies: DependenciesSchema.optional(),
  peerDependencies: DependenciesSchema.optional(),
  optionalDependencies: DependenciesSchema.optional(),
})

export type PackageJSON = z.infer<typeof PackageJsonSchema>
