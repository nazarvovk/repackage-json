import { Dependencies, DependenciesSchema, PackageJSON, cn } from '@/lib/utils'
import { DependencyTable } from './dependency-table'
import { ArchiveIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

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

  const fullPackageId = packageJson.name
    ? packageJson.version
      ? `${packageJson.name}@${packageJson.version}`
      : `${packageJson.name}@latest`
    : null

  return (
    <TooltipProvider delayDuration={100}>
      <div className='space-y-2 rounded px-8 py-2 md:ring md:ring-ring'>
        <div className='mb-8 space-y-2'>
          <h2 className='flex items-center gap-2'>
            <Tooltip>
              <TooltipTrigger disabled={!fullPackageId} asChild>
                <Button
                  variant='ghost'
                  className='-mx-2 size-12 p-2'
                  onClick={() => {
                    if (!fullPackageId) return
                    navigator.clipboard.writeText(fullPackageId)
                  }}
                >
                  <ArchiveIcon className='size-full' />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='bg-background text-current shadow ring-1 ring-ring'>
                <p>
                  Copy &quot;<code className='text-blue-500'>{fullPackageId}</code>&quot; to
                  clipboard
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger disabled={!packageJson.name} asChild>
                <Button
                  variant='ghost'
                  className={cn([
                    'p-2 text-2xl font-bold',
                    packageJson.name ? 'text-blue-500' : 'text-rose-700',
                  ])}
                  onClick={() => {
                    if (!packageJson.name) return
                    navigator.clipboard.writeText(packageJson.name)
                  }}
                >
                  {packageJson.name ?? 'No "name" field in the file'}
                </Button>
              </TooltipTrigger>
              <TooltipContent className='bg-background text-current shadow ring-1 ring-ring'>
                <p>
                  Copy &quot;<code className='text-blue-500'>{packageJson.name}</code>&quot; to
                  clipboard
                </p>
              </TooltipContent>
            </Tooltip>
            {packageJson.version && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    className='p-2 text-lg font-bold'
                    onClick={() => {
                      if (!packageJson.version) return
                      navigator.clipboard.writeText(packageJson.version)
                    }}
                  >
                    {packageJson.version}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-background text-current shadow ring-1 ring-ring'>
                  <p>
                    Copy &quot;<code className='text-blue-500'>{packageJson.version}</code>&quot; to
                    clipboard
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </h2>
          {packageJson.description && (
            <p className='rounded px-2 py-0.5 text-sm font-semibold ring ring-ring'>
              {packageJson.description}
            </p>
          )}
        </div>

        <div className='rounded px-4 py-2 ring ring-ring'>
          <div className='flex items-center gap-2'>
            <h3 className='text-xl font-bold'>Dependencies</h3>
            <ul className='flex items-center gap-2'>
              {Object.entries(dependencies).map(([key, deps]) => (
                <li key={key} className='rounded bg-zinc-200 p-2 text-xs font-semibold'>
                  <span className='mr-1 rounded bg-zinc-300 p-1'>{Object.keys(deps).length}</span>
                  {key}
                </li>
              ))}
            </ul>
          </div>
          <hr className='my-2' />
          <div className='grid gap-4 md:grid-cols-2'>
            {Object.entries(dependencies).map(([key, deps]) => {
              return <DependencyTable key={key} label={`"${key}"`} dependencies={deps} />
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
