import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir:'./tests/e2e', timeout:60000, fullyParallel:false, workers:2,
  use:{baseURL:'http://127.0.0.1:5174',trace:'retain-on-failure'},
  projects:[
    {name:'desktop',use:{...devices['Desktop Chrome']}},
    {name:'tablet',grep:/@responsive/,use:{...devices['Desktop Chrome'],viewport:{width:834,height:1194},isMobile:true,hasTouch:true}},
    {name:'mobile',grep:/@responsive/,use:{...devices['Desktop Chrome'],viewport:{width:390,height:844},isMobile:true,hasTouch:true}},
  ],
})
