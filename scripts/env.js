import envalid, { str, num } from 'envalid'

export const env = envalid.cleanEnv(process.env, {
  SF_DESTINATION: str(),
  SF_SOURCE: str(),
  SF_OBJECT: str(),
  CHUNK_BY_X_RECORDS: num(),
  NAMESPACE: str(),
})
