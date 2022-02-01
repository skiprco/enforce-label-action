import * as core from '@actions/core'

export function enforceAnyLabels(inputRegex: string, labels: any) {
  const requiredLabelsRegexAny = new RegExp(inputRegex)
  if (labels.length === 0) {
    core.setFailed(`PR must have at least a single label to match`)
  }
  if (
    !labels.some((l: any) =>
      validateLabelAgainstRegex(l.name, requiredLabelsRegexAny)
    )
  ) {
    core.setFailed(
      `Please set one label for this PR which matches regex: ${inputRegex}`
    )
  }
}

export function validateLabelAgainstRegex(label: string, re: RegExp): boolean {
  const match = re.test(label)
  console.log(`Label ${label} matches against regex ${re.source}: ${match}`)
  return match
}
