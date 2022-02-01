import * as core from '@actions/core'
import * as github from '@actions/github'
import {enforceAnyLabels} from './labels'

async function run(): Promise<void> {
  try {
    const requiredLabelsAny: string = core.getInput('REQUIRED_LABELS_REGEX_ANY')
    const labels = github.context!.payload!.pull_request!.labels
    enforceAnyLabels(requiredLabelsAny, labels)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
