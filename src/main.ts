import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const labels = github.context!.payload!.pull_request!.labels;

    enforceAnyLabels(labels);

  } catch (error: any) {
    core.setFailed(error.message);
  }
}

function enforceAnyLabels(labels: string[]) {
  const requiredLabelsAny: string = core.getInput('REQUIRED_LABELS_REGEX_ANY', {required: true});
  const requiredLabelsRegexAny = new RegExp(requiredLabelsAny);
  if (labels.length === 0) {
    core.setFailed(`PR must have at least a single label to match`);
  }
  if (!labels.some((l) => validateLabelAgainstRegex(l, requiredLabelsRegexAny))) {
    core.setFailed(`Please set one label for this PR which matches regex: ${requiredLabelsAny}`);
  }
}

function validateLabelAgainstRegex(label: string, re: RegExp): boolean {
  const match = re.test(label) 
  console.log(`Label ${label} matches against regex ${re.source}: ${match}`)
  return match
}

run();
