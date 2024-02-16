import path from 'path'

const snapshotResolver = {
  resolveSnapshotPath: (testPath: string, snapshotExtension: string) => {
    const testDirectory = path.dirname(testPath)
    return path.join(
      testDirectory,
      '__test__',
      '__snapshots__',
      path.basename(testPath) + snapshotExtension,
    )
  },
  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) => {
    const snapshotDirectory = path.dirname(snapshotFilePath)
    return path.join(
      snapshotDirectory,
      '../../',
      path.basename(snapshotFilePath, snapshotExtension),
    )
  },
  testPathForConsistencyCheck: path.join('some', '__test__', 'example.test.js'),
}

export default snapshotResolver
