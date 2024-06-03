const env = process.env.ENVIRONMENT;

const DevEnv = {
  apiHost: "https://api.platform.dev.motiong.net",
  websiteHost: "http://cloud.motiong.dev-com"
}
const TestEnv = {
  apiHost: "https://api.platform.dev.motiong.net",
  websiteHost: "http://cloud.motiong.test-com"
}
const StagingEnv = {
  apiHost: "https://api.staging.motiong.net",
  websiteHost: "http://cloud.motiong.staging-com"
}
const UatEnv = {
  apiHost: "http://api.motiong.uat-com",
  websiteHost: "http://cloud.motiong.uat-com"
}
const PreEnv = {
  apiHost: "http://api.motiong.pre-com",
  websiteHost: "http://cloud.motiong.pre-com"
}
const ProdEnv = {
  apiHost: "https://api.motiong.com",
  websiteHost: "https://www.motiong.com"
}

let envConfig: typeof PreEnv
if (env === 'DEV') {
  envConfig = TestEnv
} else if (env === 'STAGING') {
  envConfig = StagingEnv
} else if (env === 'UAT') {
  envConfig = UatEnv
} else if (env === 'PRE') {
  envConfig = PreEnv
} else if (env === 'PROD') {
  envConfig = ProdEnv
} else {
  envConfig = DevEnv
}

export default envConfig