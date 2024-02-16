import { PackageJSON } from '@/lib/utils'

type DashboardProps = {
  packageJson: PackageJSON
}

export const Dashboard = (props: DashboardProps) => {
  const { packageJson } = props

  return <div className='rounded border px-8 py-6 shadow'>{JSON.stringify(packageJson)}</div>
}
