import envalid, { str } from 'envalid'

export const env = envalid.cleanEnv(process.env, {
  SF_DESTINATION: str(),
  SF_SOURCE: str(),
  JSON_FILE_TO_SPLIT: str(),
  CHUNK_BY_X_RECORDS: str(),
  NAMESPACE: str(),
})
