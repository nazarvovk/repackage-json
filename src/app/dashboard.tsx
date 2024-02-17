import { Dependencies, DependenciesSchema, PackageJSON } from '@/lib/utils'
import { DependencyTable } from './dependency-table'

type DashboardProps = {
  packageJson: PackageJSON
}

const getDependencies = (packageJson: PackageJSON) => {
  const dependenciesKeys = Object.keys(packageJson).filter(
    (key): key is `dependencies` | `${string}Dependencies` =>
      key === 'dependencies' || key.endsWith('Dependencies'),
  )

  return dependenciesKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: DependenciesSchema.parse(packageJson[key as keyof PackageJSON]),
    }),
    {} as Record<string, Dependencies>,
  )
}

export const Dashboard = (props: DashboardProps) => {
  const { packageJson } = props

  const dependencies = getDependencies(packageJson)

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {Object.entries(dependencies).map(([key, deps]) => {
        return <DependencyTable key={key} label={key} dependencies={deps} />
      })}
    </div>
  )
}
