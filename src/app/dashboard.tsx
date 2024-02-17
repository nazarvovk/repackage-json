import { Dependencies, DependenciesSchema, PackageJSON } from '@/lib/utils'
import { DependencyTable } from './dependency-table'
import { ArchiveIcon } from '@radix-ui/react-icons'

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
    <div>
      <div className='mb-2 flex items-center justify-between gap-2'>
        <h2 className='flex items-center gap-2 text-2xl font-bold'>
          <ArchiveIcon className='inline-block size-8' />
          {packageJson.name ? (
            <span className='text-blue-500'>{packageJson.name}</span>
          ) : (
            <span className='rounded-md border border-dashed bg-rose-100 px-2 text-rose-700'>
              No &quot;name&quot; field in the file
            </span>
          )}
          {packageJson.version && (
            <span className='rounded-md border bg-zinc-100 px-2 py-1 text-xl text-zinc-700'>
              {packageJson.version}
            </span>
          )}
        </h2>
      </div>
      {packageJson.description && (
        <p className='mb-2 text-sm text-zinc-500'>{packageJson.description}</p>
      )}
      <hr className='mb-2' />

      <h3 className='mb-2 text-xl font-bold'>Dependencies:</h3>
      <div className='grid gap-4 md:grid-cols-2'>
        {Object.entries(dependencies).map(([key, deps]) => {
          return <DependencyTable key={key} label={`"${key}"`} dependencies={deps} />
        })}
      </div>
    </div>
  )
}
